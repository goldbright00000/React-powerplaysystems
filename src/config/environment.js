export function getApi() {
  if (process.env.NODE_ENV === "development") {
    return "https://api.powerplaysystems.com";
    // return "http://localhost:4000";
  }

  return "https://api.powerplaysystems.com";
}

export function getApiNHL() {
  if (process.env.NODE_ENV === "development") {
    return "https://nhl.powerplaysystems.com";
    // return "http://localhost:4000";
  }
  // return "http://localhost:4000";
  return "https://nhl.powerplaysystems.com";
}

export function getNhlSocket(){
  if(process.env.NODE_ENV === "development"){
    return "https://ppg-websocket-35nzxdmika-uc.a.run.app";
  }
  return "https://ppg-websocket-35nzxdmika-uc.a.run.app";
}