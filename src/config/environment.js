export function getApi() {
  if (process.env.NODE_ENV === "development") {
    return "http://api.powerplaysystems.com";
  }

  return "https://api.powerplaysystems.com";
}
