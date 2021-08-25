import React from "react";
import PropTypes from "prop-types";
import classes from "./index.module.scss";
import Modal from "../Modal";
import PrizeModal from "../PrizeModal";
import CloseIcon from "../../icons/Close";
import bg from "../../assets/group-31.png";
import { urlencoded } from "body-parser";
import { redirectTo } from "../../utility/shared";
import _ from "underscore";
import moment from "moment";

import ReplaceIcon from "../../icons/Replace";
import XpIcon from "../../icons/XPIcon";
import ShieldIcon from "../../icons/ShieldIcon";
import Challenge from "../../icons/Challenge";
import ContestRulesPopUp from "../../components/ContestRulesPopUp";

function PromoModal(props) {
  console.log("props?.item", props?.item);
  const { visible = false, onClose = () => { } } =
    props || {};
  const [showPrizeModal, setPrizeModalState] = React.useState(false);
  const getLocalDateTime = (date, time) => {
    const localDateTime = moment(moment.utc(date + ' ' + time, 'YYYY-MM-DD hh:mm A').toDate()).format('YYYY-MM-DD=hh:mm A')
    const splitted = localDateTime.split("=");
    return {
      date: splitted[0],
      time: splitted[1]
    }
  }
  
  const redirectToUrl = () => {
    let item = props.item;
    
    return redirectTo(props.propss, {
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

  return (<>
    <Modal visible={visible}>
      <div className={classes.wrapper} style={{width: 780,height: 675, backgroundImage: `url(${bg})`}}>
        <div className={classes.modal_body}>
          <div className={classes.topButtons}>
            <div className={classes.leftButtons}>
              <button
                type="button"
                onClick={() => {
                  setPrizeModalState(true)
                }}
              ><span>Prize Grid</span></button>
              <button
                type="button"
              ><span>Game Rules</span></button>
              <ContestRulesPopUp
              points={[props?.item?.PrizePayouts]}
              powers={props?.item?.Powers}
              component={({ showPopUp }) => (
                <button
                type="button"
                onClick={showPopUp}
                ><span>Contest Rules</span></button>
              )}
              />
              
            </div>
            <div className={classes.closeButton}>
              <CloseIcon onClick={onClose} />
            </div>
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
                <XpIcon/>
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
          </div>
          <div className={classes.extraDesc}>
            <p>No purchase necessary. Contest closes at <span>11:59pm ET on February 7th, 2022.</span></p>
            <p>Open to residents of United States who are over the age of majority.</p>
          </div>
          <div className={classes.rules}>
            <ul>
              <li><div className={classes.Oval}></div>Five (5) prizes to be won. See full rules for complete details of all prizes.</li>
              <li><div className={classes.Oval}></div>One entry per person.</li>
              <li><div className={classes.Oval}></div>Odds of winning depend on the number of participants and use of Powers. </li>
            </ul>
          </div>
          <div className={classes.bottomButton}>
            <button onClick={redirectToUrl}>
              ${props?.item?.entry_fee?props?.item?.entry_fee:0}  •  Enter & unlock Powers!
            </button>
          </div>
          <span className={classes.freeEntry}>Free Entry</span>
        </div>
      </div>
    </Modal>
    <PrizeModal
        visible={showPrizeModal}
        sportsName="MLB"
        data={props?.item?.PrizePayouts}
        onClose={() => setPrizeModalState(false)}
      /></>
  );
}

PromoModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func
};

export default PromoModal;
