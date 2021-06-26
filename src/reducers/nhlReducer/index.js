import * as Actions from "../../actions/NHLActions";

const INITIAL_STATE = {
  data: [],
  live_data: [],
  savedPlayers: [],
  allData: [],
  isEdit: false,
  starPlayerCount: 0,
  sport_id: 0,
  game_id: 0,
};

const nhlReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case Actions.NHL_DATA:
      return {
        ...state,
        data: actions.payload.filterdList,
        allData: actions.payload.allData,
        game_id: actions.game_id,
        sport_id: actions.sport_id,
      };

    case Actions.NHL_LIVE_DATA:
      return {
        ...state,
        live_data: actions.payload,
      };

    case Actions.NHL_STAR_PLAYER_COUNT:
      return {
        ...state,
        starPlayerCount: actions.payload,
      };

    case Actions.NHL_EDIT_PLAYERS:
      return {
        ...state,
        savedPlayers: actions.payload.data,
        isEdit: actions.payload.isEdit,
      };

    default:
      return state;
  }
};

export default nhlReducer;
