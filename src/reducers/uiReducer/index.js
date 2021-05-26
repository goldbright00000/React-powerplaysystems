import {
  SET_HIDE_DEPOSIT_FORM,
  SET_SHOW_DEPOSIT_FORM,
} from "../../actions/uiActions";

const INITIAL_STATE = {
  showDepositForm: false,
};

const uiReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case SET_HIDE_DEPOSIT_FORM:
      return {
        ...state,
        showDepositForm: false,
      };
    case SET_SHOW_DEPOSIT_FORM:
      return {
        ...state,
        showDepositForm: true,
      };
    default:
      return state;
  }
};

export default uiReducer;
