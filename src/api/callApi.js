import $ from 'jquery';
import {getToken} from './auth0';

export default function callApi (url, type, data, isAuthenticatedRequest) {
    return new Promise(function (resolve, reject) {
        const token = getToken();
        let config = {
            type: type,
            data: data,
            contentType: 'application/json',
            dataType: "json",
            url: url,
            success: function (response) {
                if (!response.error ) {
                    resolve(response.data || response.message);
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
};