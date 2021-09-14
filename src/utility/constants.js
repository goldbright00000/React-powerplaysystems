export const CONSTANTS = {
  CARD_SUITS: {
    DIAMOND: 1,
    CLUB: 2,
    HEART: 3,
    SPADE: 4,
  },
  //9 = J, 10 = Queen, 11 = King, 12 = Ace
  CARD_RANKS: [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ],
  CARD_POP_ACTIONS: {
    INCREASE: "INCREASE",
    DECREASE: "DECREASE",
    REPLACE: "REPLACE",
    POWER_MATCH: "POWER_MATCH",
    REPLACE_ALL: "REPLACE_ALL",
    NEW_HAND: "NEW_HAND",
  },
  MAX_ACE_PER_CARD: 2,
  MAX_ACE_CARDS: 5,
  POWER_ROYALS: {
    TENS: "10",
    JACK: "J",
    QUEEN: "Q",
    KING: "K",
    ACE: "A",
  },
  CARD_RANKS_INDEXES: {
    TENS: 8,
    JACK: 9,
    QUEEN: 10,
    KING: 11,
    ACE: 12,
  },

  SOCKET_EVENTS: {
    AUTH: "auth",
    AUTH_STATUS: "auth_status",
    AUTH_TYPE: {
      LOGIN: "login",
      REGISTER: "register",
      RESET_PASSWORD: "reset_password",
    },
    LANDING_PAGE_EMAIL: {
      ON: "on_landing_page_email",
      EMIT: "emit_landing_page_email",
    },
    PAYMENT: {
      SUCCESS: "on_payment_success",
      FAILURE: "on_payment_failure",
    },
    MLB: {
      LIVE: {
        EMIT_ROOM: "ON_EMIT_LIVE_DATA",
        ON_ROOM_SUB: "POWER_DFS_LIVE_SUBSCRIBE",
        ON_ROOM_UN_SUB: "POWER_DFS_LIVE_UN_SUBSCRIBE",
        ON_POWER_APPLIED: "ON_POWER_APPLIED",
        ON_GLOBAL_RANKING_REQUEST: "ON_GLOBAL_RANKING_REQUEST",
        ON_FANTASY_LOGS_REQUEST: "ON_FANTASY_LOGS_REQUEST",
        GET_GLOBAL_RANKING: "GET_GLOBAL_RANKING",
        MATCH_UPDATE: "MATCH_UPDATE",
        GLOBAL_RANKING: "GLOBAL_RANKING",
        FANTASY_TEAM_UPDATE: "FANTASY_TEAM_UPDATE",
      },
    },
    NHL: {
      LIVE: {
        EMIT_ROOM: "ON_EMIT_LIVE_DATA",
        ON_ROOM_SUB: "POWER_DFS_LIVE_SUBSCRIBE",
        ON_ROOM_UN_SUB: "POWER_DFS_LIVE_UN_SUBSCRIBE",
        ON_POWER_APPLIED: "ON_POWER_APPLIED",
        ON_GLOBAL_RANKING_REQUEST: "ON_GLOBAL_RANKING_REQUEST",
        ON_FANTASY_LOGS_REQUEST: "ON_FANTASY_LOGS_REQUEST",
        GET_GLOBAL_RANKING: "GET_GLOBAL_RANKING",
        MATCH_UPDATE: "MATCH_UPDATE",
        GLOBAL_RANKING: "GLOBAL_RANKING",
        FANTASY_TEAM_UPDATE: "FANTASY_TEAM_UPDATE",
      },
    },
  },

  LOCAL_STORAGE_KEYS: {
    USER: "q3245fas45fa4w5#$rfa345__123@#42fadsfaw3424",
    CASH_BALANCE: "cash_balance",
    TOKEN_BALANCE: "token_balance",
    BTC_BALANCE: "btc_balance",
    ETH_BALANCE: "eth_balance",
    DISPLAY_BALANCE: "display_balance",
    MLB_LIVE_GAME: "mlb_live_game",
    NHL_LIVE_GAME: "nhl_live_game",
  },

  BUTTON_TYPE: {
    SUBMIT: "submit",
    BUTTON: "button",
    RESET: "reset",
  },

  BINGO_INVENTORY_STATE: {
    REPLACE_ALL: "replace_all",
    REPLACE: "replace",
    POWER_MATCH: "power_match",
    INCREASE_DECREASE: "increase_decrease",
  },

  FILTERS: {
    NHL: {
      CENTER: "c",
      XW: "xw",
      LW: "lw",
      RW: "rw",
      D: "d",
      G: "g",
      TD: "td",
    },
    MLB: {
      P: "p",
      C: "c",
      SS: "ss",
      XB: "xb",
      OF: "of",
      D: "d",
    },
    NBA: {
      C: "c",
      PG: "pg",
      SG: "sg",
      F: "f",
      D: "d",
    },
    NFL: {
      QB: "qb",
      RB: "rb",
      WR: "wr",
      TE: "te",
      K: "k",
      D: "d",
    },
    MLB_R: {
      SP: "qb",
      IF: "rb",
      OF: "wr",
      DH: "te",
      RP: "k",
      D: "d",
    },
  },

  NHL_VIEW: {
    FV: "fv",
    C: "c",
    S: "s",
  },

  XP: {
    xp1_5: "xp1.5",
    xp2: "xp2",
    xp3: "xp3",
  },
  PERSONA_USER_ID: "PERSONA_USER_ID",
  DATA_ENC_KEY:
    "33SD23lk(O*&3hjas234)(0234-0_2347asdfh234*(&r23l4asdfkO(&R937w4rlkHLO*AW#&4",
};
