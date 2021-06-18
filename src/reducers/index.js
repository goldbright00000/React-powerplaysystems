import authReducer from "./authReducer";
import CardGameReducer from "./cardGameReducer";
import landingPageReducer from "./landingPageReducer";
import powerPokerReducer from "./powerPokerReducer";
import powerRoyalsReducer from "./powerRoyalsGameReducer";
import bingoReducer from "./bingoReducer";
import nhlReducer from "./nhlReducer";
import mlbReducer from "./mlbReducer";
import userReducer from "./userReducer";
import nflReducer from "./nflReducer";
import uiReducer from "./uiReducer";
import notificationReducer from "./notificationReducer";

export const reducers = {
  cardGame: CardGameReducer,
  powerRoyals: powerRoyalsReducer,
  powerPoker: powerPokerReducer,
  auth: authReducer,
  landingPage: landingPageReducer,
  bingoGame: bingoReducer,
  nhl: nhlReducer,
  mlb: mlbReducer,
  nfl: nflReducer,
  user: userReducer,
  ui: uiReducer,
  notifications: notificationReducer,
};
