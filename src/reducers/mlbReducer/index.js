import * as Actions from "../../actions/MLBActions";
import { printLog } from "../../utility/shared";

const INITIAL_STATE = {
  data: [],
  live_data: [],
  savedPlayers: [],
  allData: [],
  isEdit: false,
  starPlayerCount: 0,
  sport_id: 0,
  game_id: 0,
  team_id: 0,
};

const mlbReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case Actions.MLB_DATA:
      return {
        ...state,
        data: actions.payload.filterdList,
        allData: actions.payload.allData,
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

    case Actions.MLB_EDIT_PLAYERS:
      return {
        ...state,
        savedPlayers: actions.payload.data,
        isEdit: actions.payload.isEdit,
        team_id: actions.payload.team_id
      };

    case Actions.MLB_USER_SAVED_GAMES:
      return {
        ...state,
        getUserSavedGames: actions.payload
      }

    default:
      return state;
  }
};

export default mlbReducer;
