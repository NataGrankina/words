import callApi from './callApi';

export default function authorize() {
    return callApi(
        'http://localhost:3000/authorize',
        'POST',
        null,
        true);
}

