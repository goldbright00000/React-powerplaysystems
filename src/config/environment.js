export function getApi() {
  if (process.env.NODE_ENV === "development") {
    // return 'http://api.powerplaysystems.com'
    return "http://localhost:4000";
  }

  return "your server api";
}
