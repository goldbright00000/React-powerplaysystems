import axios from 'axios'
import { getLocalStorage } from '../utility/shared';

const apiUrl = 'http://localhost:4000/api/v1/'

const http = axios.create({
    baseURL: apiUrl,
    timeout: 60000, //60 seconds timeout
    timeoutErrorMessage: 'Request time out, please try again later',
    maxRedirects: 3
});


http.interceptors.request.use(
    config => {
        const { origin } = new URL(config.baseURL + '/' + config.url)
        const token = getLocalStorage('token');
        const allowedOrigin = ['http://localhost:4000/api/v1/'];
        if (allowedOrigin.includes(origin)) {
            config.headers.authorization = `Bearer ${token}`;
        }

        return config
    },
    err => Promise.reject(err)
)

export default http;