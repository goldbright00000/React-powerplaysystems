export const URLS = {
  AUTH: {
    LOGIN: "/users/login",
    REGISTER: "/users/signup",
    ACCOUNT: "/users/account",
    VERIFY_EMAIL: "/users/verify-email",
    UPDATE_DETAILS: "/users",
    DELETE_USER_ACCOUNT: "/users/delete",
    CHANGE_PASSWORD: "/users/changepassword",
    VERIFY_REGISTERED_EMAIL: "api/v1/users/verify-registered-email",
    RESET_PASSWORD: 'users/reset-password',
    RESEND_VERIFICATION_EMAIL: 'users/resend-verification-email',
  },
  USER: {
    BALANCE: "/users/account/balance",
    WITHDRAW_REQUEST: "users/balance-withdraw",
    SMALL_TOKEN: "users/account/balance/token",
    ZUM_BALANCE_TRANSACTION: "users/account/update-zum-balance",
    CONVERSION_MARKUP_VALUE: "users/conversion-rate",
    ACCOUNT_LIMITS: "/users/account/limit",
    COINBASE_LINK_GENERATE: "users/coinbase-link-generate",
    PERSONA_VERIFICATION: "users/verify-persona",
    SEND_EMAIL_CONFIRMATION: "users/send-nopass-verification",
    VERIFY_CONFIRMATION_CODE: "users/verify-nopass",
    CONTACT_US: "users/contact-us",
    GET_USER_WINNINGS: "users/get-user-winnigs",
    GET_COUNTRIES: "users/countries",
    TEAM_LIST: 'api/v1/users/account/get-all-team',
    CHECK_LIMIT: "users/account/check-limit",
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
    NFL: "/dfs/nfl-selection",
    NFL_SAVE_PLAYERS: "/dfs/nfl-save-players",
    NFL_EDIT_TEAM_PLAYER: "dfs/nfl-edit-team-player",
    NFL_LIVE_PAGE_PLAYERS: "/dfs/nfl-live",
    GET_LIVE_STANDINGS: "/dfs/mlb-livestandings",

    //NHL
    NHL: "/dfs/nhl-selection",
    NHL_SAVE_PLAYERS: "/dfs/nhl-save-players",
    NHL_EDIT_TEAM_PLAYER: "dfs/nhl-edit-team-player",
    NHL_LIVE_PAGE_PLAYERS: "/dfs/nhl-live",
  },
  GAMES: {
    ALL_POWER_GAMES: "api/v1/users/games",
    LEAVE_GAME: "admin/leave-game",
    GET_FINAL_STANDINGS: 'api/v1/dfs/get-game-standing'
  },
  PAYMENT: {
    GET_PSIGATE_MONTHLY_TRANSACTION: "api/v1/users/get-monthly-transaction"
  }
};
