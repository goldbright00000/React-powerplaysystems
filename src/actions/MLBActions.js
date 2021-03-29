export const MLB_DATA = "[MLB] GET_SET_DATA";

export function mlbData(payload) {
  return (dispatch) =>
    dispatch({
      type: MLB_DATA,
      payload,
    });
}
