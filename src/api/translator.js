import $ from 'jquery';

export default function getTranslations(word) {
    return makeAjaxRequest(
        'http://localhost:3000/translate/' + word,
        'GET',
        null);
}

function makeAjaxRequest(url, type, data) {
    return new Promise(function (resolve, reject) {
        $.ajax({
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
        });
    });
}