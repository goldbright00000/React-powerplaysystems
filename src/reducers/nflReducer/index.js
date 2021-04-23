import * as Actions from "../../actions/NFLActions";

const INITIAL_STATE = {
  data: [],
  live_data: [],
  starPlayerCount: 0,
};

const nflReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case Actions.NFL_DATA:
      return {
        ...state,
        data: actions.payload,
      };

    case Actions.NFL_LIVE_DATA:
      return {
        ...state,
        live_data: actions.payload,
      };

    case Actions.NFL_STAR_PLAYER_COUNT:
      return {
        ...state,
        starPlayerCount: actions.payload,
      };

    default:
      return state;
  }
};

export default nflReducer;
