export function getApi() {
  if (process.env.NODE_ENV === "development") {
    return "https://api.powerplaysystems.com";
  }

  return "https://api.powerplaysystems.com";
}
