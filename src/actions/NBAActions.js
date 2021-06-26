export const NBA_DATA = "[NBA] GET_SET_DATA";
export const NBA_LIVE_DATA = "[NBA] NBA_LIVE_DATA";
export const NBA_STAR_PLAYER_COUNT = "[NBA] STAR_PLAYER_COUNT";

export function nflData(payload) {
  return (dispatch) =>
    dispatch({
      type: NBA_DATA,
      payload,
    });
}

export function nflLiveData(payload) {
  return (dispatch) =>
    dispatch({
      type: NBA_LIVE_DATA,
      payload,
    });
}

export function setStarPlayerCount(payload) {
  return (dispatch) =>
    dispatch({
      type: NBA_STAR_PLAYER_COUNT,
      payload,
    });
}
