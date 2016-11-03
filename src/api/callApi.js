import $ from 'jquery';
import { getToken } from './auth0';

export default function callApi(url, type, data, isAuthenticatedRequest) {
  return new Promise((resolve, reject) => {
    const token = getToken();
    const config = {
      type,
      data,
      contentType: 'application/json',
      dataType: 'json',
      url,
      success: response => {
        if (!response.error) {
          resolve(response.data || response.message);
        } else {
          reject(response.message);
        }
      },
      error: (request, textStatus, errorThrown) => {
        reject(errorThrown);
      }
    };
    if (isAuthenticatedRequest) {
      if (token) {
        config.headers = { Authorization: `Bearer ${token}` };
      } else {
        throw new Error('No token saved!');
      }
    }

    $.ajax(config);
  });
}
