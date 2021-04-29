import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Header3 from "../../components/Header3";
import HeaderBgUri from "../../assets/baseball.jpg";
import NHLLiveSportsHeader from "../../components/NHLLiveSportsHeader";
import Card from "../../components/PowerpickCard";
import SidebarBtnIcon from "../../assets/nhl-sidebar-icon.png";
import RankCard from "../../components/RankCard";
import SportsContestRules from "../../components/SportsContestRules";
import MLBFooterImage from "../../assets/NHL.png";
import NHLGear from "../../assets/nhl-gear.png";
import LiveStandings from "../../components/LiveStandings";
import XP2Icon from "../../icons/XP2";
import XP3Icon from "../../icons/XP3";
import XP1_5Icon from "../../icons/XP1_5";
import FooterImage from "../../assets/NHL-live-footer.png";

const basicRules = [
  "No purchase necessary.",
  "Open to residents of United States who are over the age of majority.",
  "Contest closes at 11:59pm ET - April 22, 2020.",
];

const detailRules = [
  "Five (5) prizes to be won. See full rules for complete details of all prizes.",
  "One entry per person.",
  "Odds of winning depend on player knowledge.",
  "Mathematical skill testing question must be correctly answered to win.",
];

function NHLLivePowerdFsScroeDetail(props) {
  const [showModal, setModalState] = useState(false);
  let tableRef = useRef();

  useEffect(() => {
    tableRef?.current?.scrollIntoView();
  }, [tableRef]);

  const toggleLiveStandingModal = () => {
    setModalState(!showModal);
  };

  const RenderXP = (xp) => {
    switch (xp) {
      case "1.5":
      case "1_5":
        return <XP1_5Icon />;

      case 2:
      case "2":
        return <XP2Icon />;

      case 3:
      case "3":
        return <XP3Icon />;

      default:
        return "-";
    }
  };

  const Row = ({
    position,
    name,
    time,
    plays,
    pts,
    totalPts,
    powers,
    score,
    runningTotal,
    rbi = {},
    runs = {},
  }) => (
    <div
      className={`${classes.card_row} ${classes.card_row_1} ${
        score < 0 ? classes.primary_bg : ""
      }`}
    >
      <span className={classes.child_1}>{position}</span>
      <span className={classes.child_2}>{name}</span>
      <span className={classes.child_3}>{time}</span>
      <div className={classes.card_combine_row}>
        <span>
          <p className={classes.primary}>{plays}</p>
        </span>
        <span>
          <p className={classes.secondary}> {pts}</p>
        </span>
      </div>

      <div className={classes.card_combine_row}>
        <span>
          <p className={classes.primary}>{runs?.rs}</p>
        </span>
        <span>
          <p className={classes.secondary}> {runs?.pts}</p>
        </span>
      </div>

      <div className={classes.card_combine_row}>
        <span>
          <p className={classes.primary}>{rbi?.rbi}</p>
        </span>
        <span>
          <p className={classes.secondary}> {rbi?.pts}</p>
        </span>
      </div>

      {/* <span className={`${classes.child_4} ${classes.center}`}><p className={classes.secondary}>{totalPts}</p></span> */}
      <span className={classes.center}>{RenderXP(powers)}</span>
      <span className={classes.center}>
        <p className={score < 0 ? classes.danger : classes.success}>
          {score < 0 ? `Reversed ${score}` : score}
        </p>
      </span>
      <span className={classes.center}>
        <p className={`${classes.primary} ${classes.border}`}>{runningTotal}</p>
      </span>
    </div>
  );

  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        <Header3
          titleMain1="MLB 2021"
          titleMain2="PowerdFS"
          contestBtnTitle="Contest Rules"
          prizeBtnTitle="Prize Grid"
          subHeader1="Introducing Live-Play Fantasy Hockey"
          bgImageUri={HeaderBgUri}
          isLive
        />

        <div className={classes.container}>
          <div className={classes.container_left_side} ref={tableRef}>
            <div className={classes.container_header}>
              <NHLLiveSportsHeader
                buttonTitle="Full Standings"
                buttonIcon={
                  <img
                    src={SidebarBtnIcon}
                    width={19}
                    style={{ marginRight: "5px" }}
                  />
                }
                onPress={toggleLiveStandingModal}
                singleBtn
                teamManagerLink="/mlb-live-powerdfs"
                scoreDetailLink="/mlb-live-powerdfs/my-score-details"
              />
              <div className={classes.card_rank}>
                <RankCard showButton={false} />
              </div>
            </div>
            <Card className={classes.card}>
              <div className={classes.card_header}>
                <div className={classes.card_row}>
                  <span className={classes.child_1}>Position</span>
                  <span className={classes.child_2}>Name</span>
                  <span className={classes.child_3}>Time</span>
                  <div className={classes.card_header_1}>
                    <p>Scoring Plays</p>
                    <div className={classes.card_combine_row}>
                      <span>Plays</span>
                      <span>Pts</span>
                    </div>
                  </div>
                  <div className={classes.card_header_1}>
                    <p>Runs</p>
                    <div className={classes.card_combine_row}>
                      <span>RS</span>
                      <span>Pts</span>
                    </div>
                  </div>
                  <div className={classes.card_header_1}>
                    <p>RBI</p>
                    <div className={classes.card_combine_row}>
                      <span>RBI</span>
                      <span>Pts</span>
                    </div>
                  </div>
                  {/* <span className={classes.child_4}>Total Pts</span> */}
                  <span className={classes.center}>Powers</span>
                  <span className={classes.center}>My Score</span>
                  <span className={classes.center}>Running Total</span>
                </div>
              </div>

              <div className={classes.card_body}>
                <Row
                  position="P1"
                  name="Joe Burrow"
                  time="P1 | 11:52"
                  plays="g"
                  pts="6"
                  totalPts="8"
                  powers="1.5"
                  score={16}
                  runningTotal="16"
                  runs={{
                    rs: 2,
                    pts: 4,
                  }}
                  rbi={{
                    rbi: 8,
                    pts: 1,
                  }}
                />

                <Row
                  position="P1"
                  name="Joe Burrow"
                  time="P1 | 11:52"
                  plays="g"
                  pts="6"
                  totalPts="8"
                  powers="2"
                  score={16}
                  runningTotal="16"
                  runs={{
                    rs: 2,
                    pts: 4,
                  }}
                  rbi={{
                    rbi: 8,
                    pts: 1,
                  }}
                />

                <Row
                  position="P1"
                  name="Joe Burrow"
                  time="P1 | 11:52"
                  plays="g"
                  pts="6"
                  totalPts="8"
                  powers="3"
                  score={16}
                  runningTotal="16"
                  runs={{
                    rs: 2,
                    pts: 4,
                  }}
                  rbi={{
                    rbi: 8,
                    pts: 1,
                  }}
                />

                <Row
                  position="P1"
                  name="Joe Burrow"
                  time="P1 | 11:52"
                  plays="g"
                  pts="6"
                  totalPts="8"
                  powers="2"
                  score={16}
                  runningTotal="16"
                  runs={{
                    rs: 2,
                    pts: 4,
                  }}
                  rbi={{
                    rbi: 8,
                    pts: 1,
                  }}
                />

                <Row
                  position="P1"
                  name="Joe Burrow"
                  time="P1 | 11:52"
                  plays="g"
                  pts="6"
                  totalPts="8"
                  powers="2"
                  score={-1}
                  runningTotal="16"
                  runs={{
                    rs: 2,
                    pts: 4,
                  }}
                  rbi={{
                    rbi: 8,
                    pts: 1,
                  }}
                />

                <Row
                  position="P1"
                  name="Joe Burrow"
                  time="P1 | 11:52"
                  plays="g"
                  pts="6"
                  totalPts="8"
                  powers="2"
                  score={16}
                  runningTotal="16"
                  runs={{
                    rs: 2,
                    pts: 4,
                  }}
                  rbi={{
                    rbi: 8,
                    pts: 1,
                  }}
                />
              </div>
            </Card>
          </div>
        </div>

        <div className={classes.footer_main}>
          <img src={FooterImage} className={classes.container_body_img} />
        </div>
      </div>
      <Footer isBlack={true} />

      <LiveStandings visible={showModal} onClose={toggleLiveStandingModal} />
    </>
  );
}

NHLLivePowerdFsScroeDetail.propTypes = {};

export default NHLLivePowerdFsScroeDetail;
