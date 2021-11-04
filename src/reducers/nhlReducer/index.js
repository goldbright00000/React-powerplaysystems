import * as Actions from "../../actions/NHLActions";

const INITIAL_STATE = {
  data: [],
  live_data: [],
  savedPlayers: [],
  allData: [],
  gameLogs: [],
  isEdit: false,
  starPlayerCount: 0,
  sport_id: 0,
  game_id: 0,
  team_id: 0,
  is_loading: false,
  selectedTeam: {},

  // Live States
  gameID: 0,
  live_players: [],
  live_teamD: {},
  live_home: {},
  live_away: {},
  live_period: 0,
  live_clock: 0,
  live_totalTeamPts: 0,
  live_all_team_logs: [],
  live_team_logs: [],
  live_score_details: [],
  powersApplied: [],
  powersAvailable: "",
};

const nhlReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case Actions.NHL_UPDATE_STATE:
      return {
        ...state,
        ...actions.payload,
      };

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

    case Actions.NHL_LIVE_DATA_UPDATE:
      return {
        ...state,
        ...actions.payload,
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
        team_id: actions.payload.team_id,
      };

    case Actions.NHL_USER_SAVED_GAMES:
      return {
        ...state,
        getUserSavedGames: actions.payload,
      };

    case Actions.SET_GAME_LOGS:
      return {
        ...state,
        gameLogs: actions.payload,
      };

    case Actions.SET_SELECTED_TEAM:
      return {
        ...state,
        selectedTeam: actions.payload,
      };

    default:
      return state;
  }
};

export default nhlReducer;
