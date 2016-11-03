"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const request = require('request');
const jwt = require('express-jwt');
const router = express.Router();
const fs = require('fs');
const env = require('node-env-file');
const userModel = require('./models/user');
const translationModel = require('./models/translation');
const wordModel = require('./models/word');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/words');

if (fs.existsSync(__dirname + '/.env' )) {
    env(__dirname + '/.env')
}

const baseUrl = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${process.env.YANDEX_VOCABULARY_API_KEY}&lang=en-ru&text=`;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));
app.use(cors());

const authCheck = jwt({
    secret: new Buffer(process.env.AUTH0_SECRET, 'base64'),
    audience: process.env.AUTH0_CLIENT_ID
});

function getToken(req) {
    return req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'
        ? req.headers.authorization.split(' ')[1]
        : null;
}
function getAuth0User(jwtToken) {
    return new Promise((resolve, reject) => {
        request({
            url:'https://words.eu.auth0.com/tokeninfo',
            method: 'POST',
            json: {
                id_token: jwtToken
            }
        }, (error, response, body) => {
            if(error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    });
}
function extractUserFromRequest(req) {
  return new Promise((resolve, reject) => {
    getAuth0User(getToken(req))
      .then(user => {
        userModel.findOne({id: user.user_id}, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
  });
}
function extractOrCreateWord(word, language) {
  return new Promise((resolve, reject) => {
    wordModel.findOneAndUpdate(
      {word: word, language: language},
      {$setOnInsert: {word: word, language: language}},
      {upsert: true, new: true},
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
}
function extractOrCreateTranslation(wordId, language, translation) {
  return new Promise((resolve, reject) => {
    translationModel.findOneAndUpdate(
      {word: wordId, language, translation},
      {$setOnInsert: {word: wordId, language, translation}},
      {upsert: true, new: true},
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
}
function extractUserTranslations(user) {
  return new Promise((resolve, reject) => {
    if (!user.translations.length) {
      resolve([]);
    } else {
      userModel.findOne({id: user.id})
        .populate('translations')
        .exec((err, populatedUser) => {
          if (err) {
            reject(err);
          } else {
            resolve(populatedUser.translations);
          }
        });
    }
  });
}
function populateTranslationWords(translations) {
  return new Promise((resolve, reject) => {
    const promises = [];
    for (let i = 0; i < translations.length; i++) {
      promises.push(new Promise((res, rej) => {
          translationModel.findById(translations[i]._id)
            .populate('word')
            .exec((err, populatedTranslation) => {
              if (err) {
                rej(err);
                console.log(err);
              } else {
                res(populatedTranslation);
              }
            });
        }
      ));
    }
    Promise.all(promises)
      .then(resolve)
      .catch(reject);
  });
}

router.route("/authorize")
    .post(authCheck, (req, res) => {
        let response = {};
        getAuth0User(getToken(req))
            .then(user => {
                userModel.update(
                    {id: user.user_id},
                    {$setOnInsert: {id: user.user_id, email: user.email}},
                    {upsert: true},
                    err => {
                        if (err) {
                            response = {
                                "error": true,
                                "message": "Error authorizing user"
                            };
                        } else {
                            response = {
                                "error": false,
                                "message": "User is authorized"
                            }
                        }
                        res.json(response);
                    }
                );
            });
    });
router.route("/translate/:word")
    .get(authCheck, (req, res) => {
        let response = {};

        request(baseUrl + req.params.word, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                response = {
                    error : false,
                    data : data.def
                };
            } else {
                response = {
                    error: true,
                    message: error || body.message
                }
            }

            res.json(response);
        });
    });
router.route("/translations")
  .get(authCheck, (req, res) => {
    extractUserFromRequest(req)
      .then(extractUserTranslations)
      .then(populateTranslationWords)
      .then(translations => {
        res.json({
          error: false,
          translations
        });
      })
      .catch(error => {
        res.json({
          error: true,
          message: error
        });
      });
  })
  .post(authCheck, (req, res) => {
    let response = {};
    Promise.all(
      [extractOrCreateWord(req.body.word, req.body.languageFrom)
          .then(word => extractOrCreateTranslation(word._id, req.body.languageTo, req.body.translation)),
        extractUserFromRequest(req)
      ]).then(arr => {
        const transl = arr[0];
        const user = arr[1];
        user.translations.push(transl);
        user.save(err => {
          if (err) {
            response = {
              error: true,
              message: 'Error adding data'
            };
          } else {
            response = {
              error : false,
              data : transl
            };
          }
          res.json(response);
        });
      })
      .catch(err => res.json({error: true, message: err}));
  });

app.use('/', router);

app.listen(3000);
console.log("Listening to PORT 3000");