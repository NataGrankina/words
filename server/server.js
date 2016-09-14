const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const request = require('request');
const jwt = require('express-jwt');
const router = express.Router();
const fs = require('fs');
const env = require('node-env-file');

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

router.route("/translate/:word")
    .get(authCheck, function(req, res) {
        var response = {};

        request(baseUrl + req.params.word, function (error, response, body) {
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