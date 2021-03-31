import * as Actions from "../../actions/MLBActions";

const INITIAL_STATE = {
  data: [],
  starPlayerCount: 0,
};

const mlbReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case Actions.MLB_DATA:
      return {
        ...state,
        data: actions.payload,
      };

    default:
      return state;
  }
};

export default mlbReducer;
