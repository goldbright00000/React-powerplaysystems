import { CONSTANTS } from "../utility/constants";
import { setLocalStorage } from "../utility/shared";
import { URLS } from "../config/urls";

import axios from "axios";
import http from "../config/http";

export const USER_BALANCE = "USER_BALANCE";
export const CURRENCY_EXCHANGE_RATES = "CURRENCY_EXCHANGE_RATES";
export const SET_ZUM_TOKEN = "SET_ZUM_TOKEN";
export const REMOVE_ZUM_TOKEN = "REMOVE_ZUM_TOKEN";

export const SET_ZUM_REDIRECT_URL = "ZUM_REDIRECT_URL";
export const REMOVE_ZUM_REDIRECT_URL = "REMOVE_ZUM_REDIRECT_URL";
export const SEND_ZUM_TRANSACTION = "SEND_ZUM_TRANSACTION";
export const SET_CONVERSION_MARKUP = "SET_CONVERSION_MARKUP";

export function setUserBalance(payload) {
  setLocalStorage(
    CONSTANTS.LOCAL_STORAGE_KEYS.CASH_BALANCE,
    payload.cashBalance
  );
  setLocalStorage(
    CONSTANTS.LOCAL_STORAGE_KEYS.TOKEN_BALANCE,
    payload.tokenBalance
  );
  setLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.BTC_BALANCE, payload.btcBalance);
  setLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.ETH_BALANCE, payload.ethBalance);
  return {
    type: USER_BALANCE,
    payload,
  };
}

export async function payNowWithIpay(data) {
  http.post(URLS.USER.SMALL_TOKEN).then((res) => {
    let token = res.data;

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
      api_key: process.env.REACT_APP_IPAY_API_KEY,
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
      webhook_url: `${process.env.REACT_APP_IPAY_WEBHOOK_URL}/api/v1/users/account/balance`,
    };

    axios
      .post("/api/hosted-pay/payment-request", obj)
      .then((res) => {
        window.open(res.data.payment_redirect_url, "_blank");
      })
      .catch((er) => console.log(er));
  });
}

export const PAYMENT_METHODS = {
  EFT: "EFT",
  INTERAC: "INTERAC",
  CREDIT_CARD: "CREDIT",
  VISA_DIRECT: "VISA",
};

export function payWithZum(data, push) {
  const { amount, email, zumToken, paymentMethod } = data;
  let walletId = null;
  switch (paymentMethod) {
    case PAYMENT_METHODS.EFT:
      walletId = process.env.REACT_APP_BANK_EFT_WALLET;
      break;
    case PAYMENT_METHODS.INTERAC:
      walletId = process.env.REACT_APP_BANK_EFT_WALLET;
      break;
    case PAYMENT_METHODS.VISA_DIRECT:
      walletId = process.env.REACT_APP_VISA_DIRECT_WALLET;
      break;
    case PAYMENT_METHODS.CREDIT_CARD:
      walletId = process.env.REACT_APP_CREDIT_CARD_WALLET;
      break;
    default:
  }

  const obj = {
    Type: "Request",
    Amount: amount,
    WalletId: walletId,
    AmountType: "Fixed",
    AllowMoreThanOneTransaction: false,
    IsRecurrent: false,
    DisplayRecurrencyQuantityInConnect: true,
    Email: email,
    SendEmailNotification: true,
  };

  return (dispatch) =>
    axios
      .post(`${process.env.REACT_APP_ZUM_API}/api/requestfunds`, obj, {
        headers: { Authorization: `Bearer ${zumToken}` },
      })
      .then((res) => {
        dispatch({
          type: SET_ZUM_REDIRECT_URL,
          payload: res.data.result.ConnectUrl,
        });
        push("/paymentFrame");
      })
      .catch((er) => console.log(er));
}

export function setRates() {
  return (dispatch) => {
    axios
      .get(
        "http://data.fixer.io/api/latest?access_key=fa3628fdfda5d5a96c1b5279ff862d37"
      )
      .then((res) => {
        let rates = res.data.rates;
        let rate = rates["CAD"] / rates["USD"];
        return dispatch({
          type: CURRENCY_EXCHANGE_RATES,
          payload: rate,
        });
      })
      .catch((er) => {
        console.log(er);
      });
  };
}

export function setZumToken() {
  const obj = {
    Username: process.env.REACT_APP_ZUM_USERNAME,
    Password: process.env.REACT_APP_ZUM_PASSWORD,
  };
  return (dispatch) => {
    dispatch(setConversionMarkup());
    axios
      .post(`${process.env.REACT_APP_ZUM_API}/api/authorize`, obj)
      .then((res) => {
        // it will remove the token from state after one hour as it gets expired.
        setTimeout(() => {
          dispatch({ type: REMOVE_ZUM_TOKEN });
        }, 3600 * 1000);

        return dispatch({
          type: SET_ZUM_TOKEN,
          payload: res.data.result.Token,
        });
      })
      .catch((er) => {
        console.log(er);
      });
  };
}

export function sendZumTransaction(transactionId) {
  const request = http.post(URLS.USER.ZUM_BALANCE_TRANSACTION, {
    transactionId,
  });

  return (dispatch) => {
    return request.then((response) => {
      console.log(response);
      if (response.data.status === true) {
        dispatch({ type: SEND_ZUM_TRANSACTION });
      }
    });
  };
}

export function setConversionMarkup() {
  const request = http.get(URLS.USER.CONVERSION_MARKUP_VALUE);

  return (dispatch) => {
    return request.then((response) => {
      if (response.data.status === true) {
        dispatch({
          type: SET_CONVERSION_MARKUP,
          payload: parseFloat(response.data.data.data_value),
        });
      }
    });
  };
}
