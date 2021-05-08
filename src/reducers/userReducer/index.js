import {
  USER_BALANCE,
  CURRENCY_EXCHANGE_RATES,
  SET_ZUM_TOKEN,
  REMOVE_ZUM_TOKEN,
  SET_ZUM_REDIRECT_URL,
  REMOVE_ZUM_REDIRECT_URL,
} from "../../actions/userActions";

const INITIAL_STATE = {
  userBalance: {},
  rate: 1,
  zumToken: null,
  zumRedirectUrl: null,
};

const userReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case USER_BALANCE:
      return {
        ...state,
        userBalance: actions.payload,
      };
    case CURRENCY_EXCHANGE_RATES:
      return {
        ...state,
        rate: actions.payload,
      };
    case SET_ZUM_TOKEN:
      return {
        ...state,
        zumToken: actions.payload,
      };
    case REMOVE_ZUM_TOKEN:
      return {
        ...state,
        zumToken: null,
      };
    case SET_ZUM_REDIRECT_URL:
      return {
        ...state,
        zumRedirectUrl: actions.payload,
      };
    case REMOVE_ZUM_REDIRECT_URL:
      return {
        ...state,
        zumRedirectUrl: null,
      };
    default:
      return state;
  }
};

export default userReducer;
