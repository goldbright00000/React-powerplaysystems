const env = 'development';


export function getApi() {
    if (env === 'development') {
        return 'http://localhost:4000'
    }

    return 'your server api'
}