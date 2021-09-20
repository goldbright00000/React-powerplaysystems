export function getApi() {
  if (process.env.NODE_ENV === "development") {
    // return "https://api.powerplaysystems.com";
    return "http://localhost:4000";
  }

  return "http://localhost:4000";
  // return "https://api.powerplaysystems.com";
}
