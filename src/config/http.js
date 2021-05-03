import axios from "axios";
import { getLocalStorage } from "../utility/shared";
import { CONSTANTS } from "../utility/constants";

const apiUrl = "http://api.powerplaysystems.com/ppgapi/api/v1";
//const apiUrl = "http://localhost:5000/api/v1";

const http = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/v1` || apiUrl,
  timeout: 60000, //60 seconds timeout
  timeoutErrorMessage: "Request time out, please try again later",
  maxRedirects: 3,
});

http.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.baseURL + "/" + config.url);

    const token = getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER);
    const allowedOrigin = [apiUrl];
    // if (allowedOrigin.includes(origin)) {
    //   config.headers.authorization = `Bearer ${token}`;
    // }
    config.headers.authorization = token;
    return config;
  },
  (err) => Promise.reject(err)
);

export default http;
