import Auth0Lock from 'auth0-lock';
import jwtDecode from 'jwt-decode';

export function auth0login() {
    return new Promise((resolve, reject) => {
        const lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN);
        lock.show((err, profile, token, at) => {
            if(err) {
                reject(err);
            }
            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', token);
            resolve({token, profile});
        });
    });
}

export function auth0logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
}

export function checkTokenExpiry() {
    const jwt = getToken();
    if (jwt) {
        let jwtExp = jwtDecode(jwt).exp;
        let expiryDate = new Date(0);
        expiryDate.setUTCSeconds(jwtExp);

        if(new Date() < expiryDate) {
            return true;
        }
    }
    return false;
}

export function getToken() {
    return localStorage.getItem('id_token');
}

export function getProfile() {
    return JSON.parse(localStorage.getItem('profile'));
}


