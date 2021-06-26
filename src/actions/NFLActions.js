export const NFL_DATA = "[NFL] GET_SET_DATA";
export const NFL_LIVE_DATA = "[NFL] NFL_LIVE_DATA";
export const NFL_STAR_PLAYER_COUNT = "[NFL] STAR_PLAYER_COUNT";
export const NFL_EDIT_PLAYERS = "[NFL] NFL_EDIT_PLAYERS";

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

export function setEditPlayers(payload = { data: [], isEdit: false }) {
  return (dispatch) => {
    dispatch({
      type: NFL_EDIT_PLAYERS,
      payload: {
        data: payload?.data,
        isEdit: payload?.isEdit,
      },
    });
  };
}
