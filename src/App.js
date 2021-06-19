import React, { Fragment, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";

import HomePage from "./pages/HomePage/HomePage";
import PowerPlaySponsorsPage from "./pages/PowerPlaySponsorsPage/PowerPlaySponsorsPage";
import SponserAContestPage from "./pages/SponserAContestPage/SponserAContestPage";
import PowerCenter from "./pages/PowerCenter/PowerCenter";
import Mobile from "./pages/Mobile/Mobile";
import LiveStanding from "./pages/Mobile/LiveStanding";
import SelectTeams from "./pages/SelectTeams/SelectTeams";
import PowerBetLive from "./pages/PowerBetLive/PowerBetLive";
import ScrollToTop from "./utility/ScrollToTop";
import BingoPreGame from "./pages/BingoPreGame/BingoPreGame";
import CardGame from "./pages/CardGame";
import PowerPicks from "./pages/PowerPicks";
import ChaseACard from "./pages/ChaseACard";
import TermsOfUse from "./pages/TermsOfUse";
import PowerUpPage from "./pages/PowerUpPage/PowerUpPage";
import GetUserInfoPage from "./pages/GetUserInfoPage/GetUserInfoPage";
import BingoInProgressGame from "./pages/BingoInProgressGame/BingoInProgressGame";
import Elite8 from "./pages/Elite8";
import Elite8Draw from "./pages/Elite8Draw";
import LoginPage from "./pages/Login";
import RoyalGame from "./pages/RoyalGame";
import PowerPoker from "./pages/PowerPoker";
import LandingPage from "./pages/LandingPage";
import AccountPage from "./pages/AccountPage";
import ProtectedRoute from "./components/ProtectedRoute";
import MyGameCenter from "./pages/MyGameCenter/MyGameCenter";
import MLBPowerdFs from "./pages/MLBpowerdFS";
import NFLPowerdFs from "./pages/NFLpowerdFS";
import NHLPowerdFs from "./pages/NHLpowerdFS";
import NBAPowerdFs from "./pages/NBApowerdFS";
import NHLPowerdFsLive from "./pages/NHLPowerdfsLive";
import MLBPowerdFsLive from "./pages/MLBPowerdfsLive";
import NHLLivePowerdFsScroeDetail from "./pages/NHLLivePowerdFsScroeDetail/NHLLivePowerdFsScroeDetail";
import MLBLivePowerdFsScroeDetail from "./pages/MLBLivePowerdFsScroeDetail/MLBLivePowerdFsScroeDetail";
import ContactUSPage from "./pages/ContactUSPage/ContactUSPage";
import { setupUser } from "./actions/authActions";
import ResponsibleGaming from "./pages/ResponsibleGaming";
import PrivacyPage from "./pages/PrivacyPage";
import AccountSecurityPage from "./pages/AccountSecurityPage";
import FAQsPage from "./pages/FAQsPage";
import TrustAndSafetyPage from "./pages/TrustAndSafetyPage";
import HowToPlayPage from "./pages/HowToPlayPage";
import PaymentFrame from "./components/ZumPayment/PaymentFrame";
import VerifyIdentityPage from "./pages/VerifyIdentityPage";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/DotLoader";
import MLBPowerLevels from "./pages/MLBPowerLevels";
import LivePlayPowerLevels from "./pages/LivePlayPowerLevels";

const App = (props) => {
  // Can be a string as well. Need to ensure each key-value pair ends with ;
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: "#fb6e00";
    color: "#fb6e00";
  `;

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const toastData = useSelector((state) => state.ui?.toastData);
  const loading = useSelector((state) => state.user?.loading);

  useEffect(() => {
    dispatch(setupUser());
  }, []);

  useEffect(() => {
    if (toastData !== null) {
      addToast(toastData.message, {
        appearance: toastData.appearance,
        autoDismiss: true,
      });
    }
  }, [toastData]);

  return (
    <Fragment>
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          exact
          path="/power-play-sponsors"
          component={PowerPlaySponsorsPage}
        />
        <Route
          exact
          path="/nhl-live-powerdfs/my-score-details"
          component={NHLLivePowerdFsScroeDetail}
        />
        <Route
          exact
          path="/mlb-live-powerdfs/my-score-details"
          component={MLBLivePowerdFsScroeDetail}
        />
        <Route
          path="/power-play-sponsors/sponsor-a-contest"
          component={SponserAContestPage}
        />
        <Route path="/power-center" component={PowerCenter} />
        <Route path="/select-teams" component={SelectTeams} />
        <Route path="/powerbet-live" component={PowerBetLive} />
        <Route path="/bingo-pre-game" component={BingoPreGame} />
        <Route path="/card-game" component={CardGame} />
        {/* <ProtectedRoute path='/card-game' component={CardGame} /> */}
        <Route path="/power-picks" component={PowerPicks} />
        <Route path="/chase-a-card" component={ChaseACard} />
        <Route path="/faqs" component={FAQsPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/trust-and-safety" component={TrustAndSafetyPage} />
        <Route path="/account-security" component={AccountSecurityPage} />
        <Route path="/terms" component={TermsOfUse} />
        <Route path="/power-up" component={PowerUpPage} />
        <Route path="/user-profile-info" component={GetUserInfoPage} />
        <ProtectedRoute path="/my-game-center" component={MyGameCenter} />
        <Route path="/bingo-in-progress" component={BingoInProgressGame} />
        <Route path="/login" component={LoginPage} />
        <Route path="/power-royals" component={RoyalGame} />
        <Route path="/power-poker" component={PowerPoker} />
        <Route path="/landing-page" component={LandingPage} />
        <ProtectedRoute path="/my-account" component={AccountPage} />
        <Route exact path="/elite8" component={Elite8} />
        <Route exact path="/elite8-draw" component={Elite8Draw} />
        <Route path="/mlb-powerdfs" component={MLBPowerdFs} />
        <Route path="/nfl-powerdfs" component={NFLPowerdFs} />
        <Route path="/nhl-powerdfs" component={NHLPowerdFs} />
        <Route path="/nba-powerdfs" component={NBAPowerdFs} />
        <Route path="/nhl-live-powerdfs" component={NHLPowerdFsLive} />
        <Route path="/contact-us" component={ContactUSPage} />
        <Route path="/mlb-live-powerdfs" component={MLBPowerdFsLive} />
        <Route path='/responsible-gaming' component={ResponsibleGaming} />
        <Route path='/how-to-play' component={HowToPlayPage} />
        <Route component={HomePage} />
      </Switch>
    </Fragment>
  );
};

export default App;
