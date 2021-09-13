import React from "react";
import classes from "./challengepage.module.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useHistory } from "react-router-dom";
import PrizeModal from "../../components/PrizeModal";

import bg from "../../assets/baseball-player-bg.png";
import { redirectTo } from "../../utility/shared";
import _ from "underscore";
import moment from "moment";
import moment1 from "moment-timezone";

import ReplaceIcon from "../../icons/Replace";
import XpIcon from "../../icons/XPIcon";
import ShieldIcon from "../../icons/ShieldIcon";
import Challenge from "../../icons/Challenge";
import ContestRulesPopUp from "../../components/ContestRulesPopUp";

const ChallengePage = (props) => {
  console.log("props", props);
  const history = useHistory();
  const [showPrizeModal, setPrizeModalState] = React.useState(false);
  const [showContestRulesModal, setContestRulesModalState] = React.useState(false);
  const {
    state = []
  } = props.location || {}

  const getLocalDateTime = (date, time) => {

    const offset = moment1?.tz("America/New_York")?.format("Z");
    const localDateTime = moment.utc(date + " " + time, 'YYYY-MM-DD hh:mm A').utcOffset(offset).format('YYYY-MM-DD=hh:mm A')

    const splitted = localDateTime.split("=");

    return {
      date: splitted[0],
      time: splitted[1]
    }

    // const localDateTime = moment(moment.utc(date + ' ' + time, 'YYYY-MM-DD hh:mm A').toDate()).format('YYYY-MM-DD=hh:mm A')
    // const splitted = localDateTime.split("=");
    // return {
    //   date: splitted[0],
    //   time: splitted[1]
    // }
  }

  const redirectToUrl = () => {
    let item = props.location.state;

    return redirectTo(props, {
      path: `/mlb-select-team`,
      state: {
        game_id: item?.game_id,
        sport_id: item?.sports_id,
        start_date: getLocalDateTime(item?.start_date, item?.start_time)?.date,
        game_set_start: getLocalDateTime(item?.game_set_start, item?.start_time)?.date,
        start_time: getLocalDateTime(item?.game_set_start, item?.start_time)?.time,
        end_date: item?.end_date,
        outOf: item?.target,
        enrolledUsers: item?.enrolled_users,
        prizePool: _.reduce(
          item?.PrizePayouts,
          function (memo, num) {
            return memo + parseInt(num.amount) * parseInt(num.prize);
          },
          0
        ),
        topPrize: parseFloat(
          _.max(item?.PrizePayouts, function (ele) {
            return ele.amount;
          }).amount
        ),
        PointsSystem: item?.PointsSystems,
        Power: item?.Powers,
        prizes: item?.PrizePayouts,
        paid_game: item?.is_game_paid,
        entry_fee: item?.entry_fee,
        currency: item?.currency,
      },
    });
  }

  const onBack = () => {
    history.push("/power-center");
  }

  const showPopUp = () => {
    setContestRulesModalState(true);
  }

  return (
    <div>
      <Header />
      <div className={classes.mainContent} style={{
        backgroundImage: `url(${bg})`,
        backgroundPosition: 'left',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className={classes.backButton} onClick={onBack}>
          <span>
            {"< Back"}
          </span>
        </div>
        <div className={classes.title}>
          NFL <span>PowerdFS</span> Promotional Contest
        </div>
        <div className={classes.gamePrize}>
          <span className={classes.prize}>$1,000</span>
          <span className={classes.giveaway}>Give Away</span>
        </div>
        <div className={classes.rectangle}>
          <span className={classes.youHaveThePower}>
            You have the Powers to win!
          </span>
          <div className={classes.powers}>
            <div className={classes.power}>
              <XpIcon />
              <span>Point Boosters </span>
              <span className={classes.orange}>x2</span>
            </div>
            <div className={classes.power}>
              <ReplaceIcon />
              <span>Power Swaps </span>
              <span className={classes.orange}>x2</span>
            </div>
          </div>
          <div className={`${classes.powers} ${classes.margin}`}>
            <div className={classes.power}>
              <Challenge />
              <span>Challenge </span>
              <span className={classes.orange}>x2</span>
            </div>
            <div className={classes.power}>
              <ShieldIcon />
              <span>D-Wall </span>
              <span className={classes.orange}>x2</span>
            </div>
          </div>

          <div className={classes.topButtons}>
            <div className={classes.leftButtons}>
              <button
                type="button"
                onClick={() => setPrizeModalState(true)}
              ><span>Prize Grid</span></button>
              <ContestRulesPopUp
                points={[state?.PrizePayout]}
                powers={state?.Power}
                component={({ showPopUp }) => (
                  <button
                    type="button"
                    onClick={showPopUp}
                  ><span>Game Rules</span></button>
                )}
              />
              <button
                type="button"
              ><span>Contest Rules</span></button>
            </div>
          </div>
        </div>
        <div className={classes.extraDesc}>
          <p>No purchase necessary. Contest closes at <span>11:59pm ET on February 7th, 2022.</span></p>
          <p>Open to residents of United States who are over the age of majority.</p>
        </div>
        <div className={classes.bottomButton}>
          <button onClick={redirectToUrl}>
            ${props?.location?.state?.entry_fee ? (props?.location?.state?.entry_fee) : 0}  •  Enter Now!
          </button>
        </div>
        <div className={classes.freeEntry}>Free Entry</div>
        <div className={classes.rules}>
          <ul>
            <li><div className={classes.Oval}></div><div className={classes.litext}>Five (5) prizes to be won. See full rules for complete details of all prizes.</div></li>
            <li><div className={classes.Oval}></div><div className={classes.litext}>One entry per person.</div></li>
            <li><div className={classes.Oval}></div><div className={classes.litext}>Odds of winning depend on the number of participants and use of Powers.</div> </li>
          </ul>
        </div>
      </div>
      <Footer />
      <PrizeModal
        visible={showPrizeModal}
        sportsName="MLB"
        data={state?.prizes}
        onClose={() => setPrizeModalState(false)}
      />
    </div>
  );
};

export default ChallengePage;
