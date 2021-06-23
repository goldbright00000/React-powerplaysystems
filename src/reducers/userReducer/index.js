import {
  USER_BALANCE,
  CURRENCY_EXCHANGE_RATES,
  SET_ZUM_TOKEN,
  REMOVE_ZUM_TOKEN,
  SET_ZUM_REDIRECT_URL,
  REMOVE_ZUM_REDIRECT_URL,
  SET_CONVERSION_MARKUP,
} from "../../actions/userActions";

const INITIAL_STATE = {
  userBalance: {},
  rate: 1,
  zumToken: null,
  zumRedirectUrl: null,
  conversionMarkup: 0,
  markedUpRate: 0,
};

const userReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case USER_BALANCE:
      return {
        ...state,
        userBalance: actions.payload,
      };
    case CURRENCY_EXCHANGE_RATES:
      let rate = actions.payload;
      let markedUpRate = rate + (rate / 100) * state.conversionMarkup;
      return {
        ...state,
        rate: actions.payload,
        markedUpRate,
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
    case SET_CONVERSION_MARKUP:
      let markedRate = state.rate + (state.rate / 100) * actions.payload;
      return {
        ...state,
        conversionMarkup: actions.payload,
        markedUpRate: markedRate,
      };
    default:
      return state;
  }
};

export default userReducer;
