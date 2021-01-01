import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 600000,
    timeoutErrorMessage: 'Request time out, please try again later',
    maxRedirects: 3
});

http.interceptors.request.use(
    res => {
        return res
    },
    err => Promise.reject(err)
)

export default http;