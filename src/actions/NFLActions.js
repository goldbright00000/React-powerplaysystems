export const NFL_DATA = "[NFL] GET_SET_DATA";
export const NFL_LIVE_DATA = "[NFL] NFL_LIVE_DATA";
export const NFL_STAR_PLAYER_COUNT = "[NFL] STAR_PLAYER_COUNT";

export function nflData(payload) {
  return (dispatch) =>
    dispatch({
      type: NFL_DATA,
      payload,
    });
}

export function nflLiveData(payload) {
  return (dispatch) =>
    dispatch({
      type: NFL_LIVE_DATA,
      payload,
    });
}

export function setStarPlayerCount(payload) {
  return (dispatch) =>
    dispatch({
      type: NFL_STAR_PLAYER_COUNT,
      payload,
    });
}
