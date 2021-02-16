
export function getApi() {
    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:4000'
    }

    return 'your server api'
}