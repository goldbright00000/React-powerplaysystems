export const NHL_LIVE_DATA = "[NHL] NHL_LIVE_DATA";
export const NHL_DATA = "[NHL] NHL_DATA";
export const SINGLE_DATA = "[NHL] NHL_SINGLE_DATA";
export const NHL_STAR_PLAYER_COUNT = "[NHL] NHL_STAR_PLAYER_COUNT";
export const NHL_EDIT_PLAYERS = "[NHL] NHL_EDIT_PLAYERS";

export function setLiveNhlData(payload) {
  return (dispatch) => dispatch({ type: NHL_LIVE_DATA, payload });
}

export function setNhlData(payload) {
  return (dispatch) => dispatch({ type: NHL_DATA, payload });
}

export function getSingleData(payload) {
  return (dispatch, getState) => {
    const { live_data = [] } = getState()?.nhl || {};

    const { id: selectedDataId = "" } = payload || {};
    if (live_data?.length) {
      const [selectedData] = live_data?.filter(
        (_data) => _data?.id === selectedDataId
      );
      return selectedData;
    }
  };
}

export function starPlayerCount(payload) {
  return (dispatch) => dispatch({ type: NHL_STAR_PLAYER_COUNT, payload });
}

export function setEditPlayers(payload = { data: [], isEdit: false }) {
  return (dispatch) => {
    dispatch({
      type: NHL_EDIT_PLAYERS,
      payload: {
        data: payload?.data,
        isEdit: payload?.isEdit,
      },
    });
  };
}
