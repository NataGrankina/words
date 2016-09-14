import $ from 'jquery';
import {getToken} from './auth';

export default function getTranslations(word) {
    return makeAjaxRequest(
        'http://localhost:3000/translate/' + word,
        'GET',
        null,
        true);
}

function makeAjaxRequest(url, type, data, isAuthenticatedRequest) {
    return new Promise(function (resolve, reject) {
        const token = getToken();
        let config = {
            type: type,
            data: data,
            contentType: 'application/json',
            dataType: "json",
            url: url,
            success: function (response) {
                if (!response.error) {
                    resolve(response.data);
                }
                else {
                    reject(response.message);
                }
            },
            error: function (request, textStatus, errorThrown) {
                reject(errorThrown);
            }
        };
        if(isAuthenticatedRequest) {
            if(token) {
                config.headers = { 'Authorization': `Bearer ${token}` }
            } else {
                throw new Error("No token saved!")
            }
        }

        $.ajax(config);
    });
}