export const SET_SHOW_DEPOSIT_FORM = "SHOW_DEPOSIT_FORM";
export const SET_HIDE_DEPOSIT_FORM = "SET_HIDE_DEPOSIT_FORM";

export const showDepositForm = () => {
  return (dispatch) => dispatch({ type: SET_SHOW_DEPOSIT_FORM });
};

export const hideDepositForm = () => {
  return (dispatch) => dispatch({ type: SET_HIDE_DEPOSIT_FORM });
};
