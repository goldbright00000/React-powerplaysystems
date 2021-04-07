export const MLB_DATA = "[MLB] GET_SET_DATA";
export const MLB_LIVE_DATA = "[MLB] MLB_LIVE_DATA";
export const MLB_STAR_PLAYER_COUNT = "[MLB] STAR_PLAYER_COUNT";

export function mlbData(payload) {
  return (dispatch) =>
    dispatch({
      type: MLB_DATA,
      payload,
    });
}

export function mlbLiveData(payload) {
  return (dispatch) =>
    dispatch({
      type: MLB_LIVE_DATA,
      payload,
    });
}

export function setStarPlayerCount(payload) {
  return (dispatch) =>
    dispatch({
      type: MLB_STAR_PLAYER_COUNT,
      payload,
    });
}
