var express = require("express");
var app = express();
const cors = require('cors');
var request = require('request');
var router = express.Router();

var baseUrl = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20160913T074645Z.c94dd581a6014da9.c28247d7a5ade7a0e6d133568c58b33539a7888b&lang=en-ru&text=';

app.use(cors());

router.route("/translate/:word")
    .get(function(req, res) {
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