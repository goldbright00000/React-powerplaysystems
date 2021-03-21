
export function getApi() {
    if (process.env.NODE_ENV === 'development') {
        return 'http://api.powerplaysystems.com'
    }

    return 'your server api'
}