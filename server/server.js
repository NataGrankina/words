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
                id_token: jwtToken,
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

app.use('/', router);

app.listen(3000);
console.log("Listening to PORT 3000");