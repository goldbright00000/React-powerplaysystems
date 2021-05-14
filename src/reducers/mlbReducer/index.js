import * as Actions from "../../actions/MLBActions";

const INITIAL_STATE = {
  data: [],
  live_data: [],
  starPlayerCount: 0,
  sport_id: 0,
  game_id: 0,
};

const mlbReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case Actions.MLB_DATA:
      return {
        ...state,
        data: actions.payload,
        game_id: actions.game_id,
        sport_id: actions.sport_id,
      };

    case Actions.MLB_LIVE_DATA:
      return {
        ...state,
        live_data: actions.payload,
      };

    case Actions.MLB_STAR_PLAYER_COUNT:
      return {
        ...state,
        starPlayerCount: actions.payload,
      };

    default:
      return state;
  }
};

export default mlbReducer;
