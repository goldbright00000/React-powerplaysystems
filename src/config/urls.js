export const URLS = {
  AUTH: {
    LOGIN: "/users/login",
    REGISTER: "/users/signup",
    ACCOUNT: "/users/account",
    VERIFY_EMAIL: "/users/verify-email",
    UPDATE_DETAILS: "/users",
    DELETE_USER_ACCOUNT: "/users/delete",
    CHANGE_PASSWORD: "/users/changepassword",
  },
  USER: {
    BALANCE: "/users/account/balance",
    SMALL_TOKEN: "users/account/balance/token",
    ZUM_BALANCE_TRANSACTION: "users/account/update-zum-balance",
    CONVERSION_MARKUP_VALUE: "users/conversion-rate",
    ACCOUNT_LIMITS: "/users/account/limit",
    COINBASE_LINK_GENERATE: "users/coinbase-link-generate",
    PERSONA_VERIFICATION: "users/verify-persona",
    SEND_EMAIL_CONFIRMATION: "users/send-nopass-verification",
    VERIFY_CONFIRMATION_CODE: "users/verify-nopass",
  },
  DFS: {
    MLB: "/dfs/mlb-selection",
    MLB_SAVE_PLAYERS: "/dfs/mlb-save-players",
    MLB_LIVE_PAGE_PLAYERS: "/dfs/mlb-live",
    MLB_USER_GAMES: "/dfs/user-games",
    MLB_EDIT_TEAM_PLAYER: "dfs/mlb-edit-team-player",
    CALCULATE_ADMIN_FEE: "admin/save-admin-fee",
    DEDUCT_USER_BALANCE: "admin/deduct-user-balance",
    SAVE_PRIZE_POOL: "admin/save-prize-pool",
    GET_USERS_POWERS: "/dfs/get-user-power",
    UPDATE_USERS_POWERS: "/dfs/update-user-power",
    GET_LIVE_STANDINGS: "/dfs/mlb-livestandings"
  },
  GAMES: {
    ALL_POWER_GAMES: "admin/games",
  },
};
