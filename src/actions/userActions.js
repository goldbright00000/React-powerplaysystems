import { CONSTANTS } from "../utility/constants";
import { setLocalStorage } from "../utility/shared";
import { URLS } from "../config/urls";

import axios from "axios";
import http from "../config/http";

export const USER_BALANCE = "USER_BALANCE";

export function setUserBalance(payload) {
  setLocalStorage(
    CONSTANTS.LOCAL_STORAGE_KEYS.CASH_BALANCE,
    payload.cashBalance
  );
  setLocalStorage(
    CONSTANTS.LOCAL_STORAGE_KEYS.TOKEN_BALANCE,
    payload.tokenBalance
  );
  return {
    type: USER_BALANCE,
    payload,
  };
}

export async function payNow(data) {
  http.post(URLS.USER.SMALL_TOKEN).then((res) => {
    let token = res.data;
    console.log();

    const {
      first_name,
      last_name,
      address,
      zip,
      phone_number,
      city,
      amount,
      currency,
      country,
      state_or_province,
      email,
    } = data;

    const obj = {
      api_key:process.env.IPAY_API_KEY,
      method: "visa-mc",
      response_url: "?paid=true",
      first_name,
      last_name,
      address,
      country: country.substring(0, 2)?.toUpperCase(),
      state: state_or_province,
      city,
      zip,
      phone_no: phone_number,
      email,
      currency,
      amount,
      ip_address: "192.168.10.1",
      sulte_apt_no: token,      
      webhook_url: `${process.env.REACT_ENV_API}/api/v1/users/account/balance`,
    };

    axios
      .post("/api/hosted-pay/payment-request", obj)
      .then((res) => {
        console.log(res.data.payment_redirect_url);
        window.open(res.data.payment_redirect_url, "_blank");
      })
      .catch((er) => console.log(er));
  });
}
