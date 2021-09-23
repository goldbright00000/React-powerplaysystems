import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import * as mlbActions from "../../actions/MLBActions";
import classes from "./index.module.scss";
import Replace from "../../icons/Replace";
import XPIcon from "../../icons/XPIcon";
import StarPower from "../../assets/star_power.png";
import {
  getNumberSuffix,
  hasText,
  printLog,
  removeZeroBeforeDecimalPoint,
} from "../../utility/shared";
import RenderMLBPlayerStats from "./RenderMLBPlayerStats";
import SportsLiveCardFooter from "./SportsLiveCardFooter";
import XP1_5 from "../../icons/XP1_5";
import XP1_5_1 from "../../icons/XP1_5_1";
import XP2Icon from "../../icons/XP2";
import XP2Icon_1 from "../../icons/XP2_1";
import XP3 from "../../icons/XP3";
import XP3_1 from "../../icons/XP3_1";
import VideoIcon from "../../icons/VideoIcon";
import ShieldIcon from "../../icons/ShieldIcon";
import MiniStar from "../../assets/mini_star.png";
import Tooltip from "../ToolTip";
import { isEmpty } from "lodash";
import { CONSTANTS } from "../../utility/constants";
import RenderPointsSummary from "./RenderPointsSummary";
import SportsLiveCardOverlay from "./SportsLiveCardOverlay";
import RenderModal from "./RenderModal";
import { CardType } from "./CardType";
import HomeRun from "./HomeRun";
import ActivatedBoost from "./ActivatedBoost";
import NHLFooterStats from "./NHLFooterStats";
import BaseballStick from "../../icons/BaseballStick";
import Baseball from "../../icons/Baseball";
import TwitterIcon from "../../icons/TwitterIcon";
import FacebookIcon from "../../icons/FacebookIcon";
import ClockIcon from "../../assets/icons/nhl/clock.svg";

const MLBSummaryTitles = ["Inning", "Types", "Power", "Pts"];
const NHLSummaryTitles = ["Time", "Type", "Power", "Pts"];

function SportsLiveCard(props) {
  const [showSummary, setSummaryState] = useState(false);
  const [showReplaceModal, setReplaceModalState] = useState(false);
  const [showVideoOverlay, setVideoOverlayState] = useState(true);
  const [playerList, setPlayerList] = useState({});
  const [loadingPlayerList, setLoadingPlayerList] = useState(false);
  const [isMatchOver, setIsMatchOver] = useState(false);

  const dispatch = useDispatch();
  const { data: mlbData = [] } = useSelector((state) => state.mlb);

  const {
    data = {},
    // playerList = [],
    compressedView = false,
    largeView = false,
    singleView = false,
    active = false,
    starPlayerCount = 0,
    onSelectCard = () => {},
    onChangeXp = (xp, player) => {},
    updateReduxState = (currentPlayer, newPlayer) => {},
    cardType = CardType.NHL,
    isHomeRun = false,
    gameInfo = {},
    pointXpCount = {},
    currentPlayerList = [],
  } = props || {};

  const {
    game: { game_id: gameId } = {},
    userId,
    teamId,
    sportId,
  } = gameInfo || {};

  const { player = {}, match = {}, xp = {}, score = 0 } = data || {};

  const { xp1 = 0, xp2 = 1, xp3 = 2 } = pointXpCount || {};

  console.log("PLAYER: ", player);

  const {
    name = "",
    primary_position: type = "",
    type1 = "",
    // points = 0,
    homeTeam = "",
    awayTeam = "",
    stats = {},
    playerStats = {},
    pointsSummary = [
      {
        status: "P1: 19:59",
        type: "Goal",
        power: "2x",
        pts: "4",
      },
      {
        status: "P2: 13:45",
        type: "Assist",
        power: "",
        pts: "2",
      },
      {
        status: "P3: 00:01",
        type: "Goal",
        power: "3x",
        pts: "8",
      },
      {
        status: "OT: 04:58",
        type: "Goal",
        power: "3x",
        pts: "9",
      },
    ],
    totalPts = 23,
    isStarPlayer = false,
    range = "",
    id = "",
    nhl_player_season_stats = [],
    boost = {},
    current_team = "",
    player_id = "",
    match_stats = [],
  } = player || {};

  const {
    games_played = 0,
    goals = 0,
    assists = 0,
    points = 0,
    average_shots = 0,
    base_on_balls = 0,
    batting_average = 0,
    doubles = 0,
    earned_runs_average = 0,
    home_runs = 0,
    losses = 0,
    ops = 0,
    // player_id = 0,
    // runs_batted_in = 0,
    season_id = 1,
    stats_id = 0,
    stolen_bases = 0,
    triples = 0,
    type: playerStatType = "",
    walks_hits_per_innings_pitched = 0,
    wins = 0,
  } = nhl_player_season_stats[0] || {};

  const {
    data_id = 0,
    match_id = 0,
    pitch_count = 0,
    walks = 0,
    hits = 0,
    runs = 0,
    runs_batted_in = 0,
    innings_pitched = 0,
    strike_outs = 0,
    plate_appearances = 0,
    // batting_average = 0,
    // earned_runs_average = 0,
  } = match_stats?.[0] || {};

  const {
    away_team = {},
    home_team = {},
    status = "",
    boxscore = [],
    date_time = "",
  } = match || {};

  const {
    // hits = 0,
    // doubles = 0,
    // triples = 0,
    // home_runs = 0,
    // stolen_bases = 0,
    // runs_batted_in = 0,
    // batting_average = 0,
    // wins = 0,
    // losses = 0,
    // innings_pitched = 0,
    strikes = 0,
    balls = 0,
    // earned_runs_average = 0,
    // base_on_balls = 0,
    // walks_hits_per_innings_pitched = 0,
    hitter = {},
    pitcher = {},
    outs = 0,
    home_team_runs = 0,
    away_team_runs = 0,
    baserunner_1 = null,
    baserunner_2 = null,
    baserunner_3 = null,
    baserunner_4 = null,
    current_inning = 0,
    current_inning_half = null,
  } = boxscore[0] || {};

  useEffect(() => {
    if (boxscore?.length) {
      setIsMatchOver(false);
    } else {
      setIsMatchOver(true);
    }
  }, [boxscore]);

  // if (type === "P") {
  //   console.log(boxscore[0]);
  // }

  const text = process.env.REACT_APP_POST_SHARING_TEXT;

  useEffect(() => {
    if (compressedView) setSummaryState(false);
  }, [compressedView]);

  const footerTitle = () => {
    if (isEmpty(current_inning_half)) {
      return ``;
    }

    const currentInningHalf = `${current_inning_half}`.toLocaleLowerCase();
    if (currentInningHalf === "b") {
      return `Bot ${current_inning} | ${outs} outs`;
    }

    return `Top ${current_inning} | ${outs} outs`;
  };

  const showMidThird = () => {
    return outs === 3 && `${current_inning_half}`.toLocaleLowerCase() === "t";
  };

  const showEndThird = () => {
    return outs === 3 && `${current_inning_half}`.toLocaleLowerCase() === "b";
  };

  const toggleReplaceModal = useCallback(async () => {
    if (cardType === CardType.NHL) {
      setLoadingPlayerList(true);
      setReplaceModalState(!showReplaceModal);
      const response = await dispatch(mlbActions.mlbData(gameId));

      if (response?.filterdList && response?.filterdList?.length) {
        // const _mlbData = [...mlbData];
        const _mlbData = [...response?.filterdList];
        const [swapablePlayerData] = _mlbData?.filter(
          (data) => data?.type === `${type}`?.toLocaleLowerCase()
        );

        if (
          swapablePlayerData &&
          swapablePlayerData?.listData &&
          swapablePlayerData?.listData?.length
        ) {
          const _time = moment(date_time).clone().format("h:mm A");
          const newListData = swapablePlayerData?.listData?.filter(
            (data, index) =>
              `${data?.time}` === _time &&
              data?.playerId !== player_id &&
              currentPlayerList[index]?.player_id !== player_id
          );

          const _dataToRender = {
            type: swapablePlayerData.type,
            listData: newListData,
          };

          setPlayerList(_dataToRender);
        }
      }
      setLoadingPlayerList(false);
    }
  }, [mlbData]);

  function isPowerAvailable(type) {
    let powerss = props.dataMain?.game?.Powers;

    if (!powerss || powerss === undefined) {
      return;
    }

    let available = 0;
    if (type === "Swap Player") {
      type = "Swap";
    }
    for (var i = 0; i < powerss.length; i++) {
      if (type === "Point Booster") {
        if (
          powerss[i].powerName === "1.5x Point Booster" ||
          powerss[i].powerName === "2x Point Booster" ||
          powerss[i].powerName === "3x Point Booster"
        ) {
          available = 1;
          break;
        }
      } else {
        if (powerss[i].powerName === type) {
          available = 1;
          break;
        }
      }
    }
    return available;
  }
  function isPowerLocked(type) {
    let powerss = props.dataMain?.game?.Powers;

    if (!powerss || powerss === undefined) {
      return;
    }

    let locked = 0;
    if (type === "Swap Player") {
      type = "Swap";
    }
    for (var i = 0; i < powerss.length; i++) {
      if (powerss[i].powerName === type) {
        if (
          powerss[i].SocialMediaUnlock == true ||
          powerss[i].SocialMediaUnlock == "true"
        ) {
          locked = 1;
        }
        break;
      }
    }
    return locked;
  }

  const onSwap = (playerId, match_id) => {
    // console.log("props.swapCount", props.swapCount);
    if (props.swapCount === 0) {
      alert("You cannot swap the players.");
      return;
    }
    const [swapablePlayer] =
      !isEmpty(playerList) &&
      playerList?.listData?.length &&
      playerList?.listData?.filter(
        (player) =>
          player?.playerId === playerId && player?.match_id === match_id
      );

    if (swapablePlayer) {
      updateReduxState(data, swapablePlayer);
      toggleReplaceModal();
      props.useSwap(true);
    }
  };

  const isPitching = () => {
    if ((type === "P" || type === "p") && player_id === pitcher?.player_id)
      return true;
    else if (
      (type === "P" || type === "p") &&
      player_id !== pitcher?.player_id &&
      home_team.team_id === pitcher?.current_team
    )
      return true;
  };

  const getStatus = () => {
    if (`${status}`?.toLocaleLowerCase() === "scheduled") {
      return `${moment(date_time).format("MMM Do")} - ${moment(
        date_time
      ).format("hh:mm A")}`;
    } else if (
      `${status}`?.toLocaleLowerCase() === "closed" ||
      `${status}`?.toLocaleLowerCase() === "completed"
    ) {
      return "Game Over";
    } else if (
      (!showEndThird() || !showMidThird()) &&
      (type === "P" || type === "p") &&
      player_id === pitcher?.player_id
    ) {
      return "Pitching";
    } else if (
      (!showEndThird() || !showMidThird()) &&
      (type === "P" || type === "p") &&
      !isPitching()
    ) {
      return "Dugout";
    } else if (
      (!showEndThird() || !showMidThird()) &&
      player_id === hitter?.player_id &&
      hitter
    ) {
      return "Hitting";
    } else if (
      (showEndThird() || showMidThird()) &&
      `${status}`.toLocaleUpperCase() === "inprogress"
    )
      return "In Progress";
    else if (status === "inprogress") return "In Progress";

    return status;
  };

  const isGameOverOrNotStarted = () => {
    return (
      `${status}`?.toLocaleLowerCase() === "scheduled" ||
      getStatus() === "Game Over"
    );
  };

  const getCurrentInningHalf = () => {
    if (isEmpty(current_inning_half)) return null;

    return `${current_inning_half}`.toLocaleLowerCase();
  };

  const showFooterStats = () => {
    if (showMidThird()) {
      return (
        <div className={classes.third_text}>
          <p>Mid {getNumberSuffix(current_inning)}</p>
        </div>
      );
    } else if (showEndThird()) {
      return (
        <div className={classes.third_text}>
          <p>End {getNumberSuffix(current_inning)}</p>
        </div>
      );
    }

    if (type === "P" || (type === "p" && isPitching())) {
      return (
        <RenderMLBPlayerStats
          hitter={hitter}
          pitcher={pitcher}
          type={type}
          baserunner_1={baserunner_1}
          baserunner_2={baserunner_2}
          baserunner_3={baserunner_3}
          baserunner_4={baserunner_4}
          strikes={strikes}
          balls={balls}
          largeView={compressedView || !compressedView}
          batting_average={removeZeroBeforeDecimalPoint(batting_average)}
          showImage={true}
          isPitching={isPitching()}
          // {...props}
        />
      );
    } else if (type !== "P" || type !== "p") {
      return (
        <RenderMLBPlayerStats
          hitter={hitter}
          pitcher={pitcher}
          type={type}
          baserunner_1={baserunner_1}
          baserunner_2={baserunner_2}
          baserunner_3={baserunner_3}
          baserunner_4={baserunner_4}
          strikes={strikes}
          balls={balls}
          largeView={compressedView || !compressedView}
          batting_average={removeZeroBeforeDecimalPoint(batting_average)}
          // {...props}
        />
      );
    }
  };

  const renderXp = () => {
    let svgSize = singleView ? 14 : largeView ? 28 : 24;
    if (xp && xp?.xp === CONSTANTS.XP.xp1_5)
      return <XP1_5_1 className={classes.xp_svg} size={svgSize} />;
    else if (xp && xp?.xp === CONSTANTS.XP.xp2)
      return <XP2Icon_1 className={classes.xp_svg} size={svgSize} />;
    else if (xp && xp?.xp === CONSTANTS.XP.xp3)
      return <XP3_1 className={classes.xp_svg} size={svgSize} />;

    if (!singleView) {
      return <XPIcon size={svgSize} />;
    }

    return null;
  };

  const checkIfIsStarPlayer = () => {
    if (type == "p" || type == "P") {
      if (earned_runs_average < 3.5) {
        return true;
      }
    } else {
      if (batting_average > 0.29 || home_runs > 30) {
        return true;
      }
    }
    return false;
  };

  const RenderStarPower = ({}) =>
    checkIfIsStarPlayer() && (
      <img
        className={`${classes.star_power} ${singleView && classes.mini_star}`}
        src={singleView ? MiniStar : StarPower}
        alt=""
      />
    );

  const RenderXpToolTip = () => (
    <div className={classes.stat_xp}>
      {cardType === CardType.MLBR ? (
        <div
          className={classes.stat_xp_mlbr}
          onClick={() => onChangeXp(0, data)}
        >
          <XPIcon
            className={{ opacity: 0.1 }}
            size={singleView ? 14 : largeView ? 28 : 24}
          />
        </div>
      ) : (
        <>
          {xp?.xp == CONSTANTS.XP.xp1_5 ||
          xp?.xp == CONSTANTS.XP.xp2 ||
          xp?.xp == CONSTANTS.XP.xp3 ? (
            renderXp()
          ) : (
            <Tooltip
              disabled={isGameOverOrNotStarted()}
              toolTipContent={
                <div className={classes.xp_icons}>
                  {isPowerAvailable("Point Booster") === 0 ? (
                    <div>Not Available</div>
                  ) : isPowerLocked("Point Booster") === 1 ? (
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <p
                        style={{
                          paddingTop: "1px",
                          paddingRight: "2px",
                          paddingLeft: "5px",
                        }}
                      >
                        Share to unlock:
                      </p>
                      <div>
                        <button
                          onClick={() => {
                            var left = window.screen.width / 2 - 600 / 2,
                              top = window.screen.height / 2 - 600 / 2;
                            window.open(
                              `https://www.facebook.com/dialog/share?app_id=${process.env.REACT_APP_FACEBOOK_APP_ID}&display=popup&href=http://defygames.io&quote=${process.env.REACT_APP_POST_SHARING_TEXT}&redirect_uri=http://defygames.io`,
                              "targetWindow",
                              "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600,left=" +
                                left +
                                ",top=" +
                                top
                            );
                          }}
                        >
                          <FacebookIcon />
                        </button>

                        <button
                          onClick={() => {
                            var left = window.screen.width / 2 - 600 / 2,
                              top = window.screen.height / 2 - 600 / 2;
                            window.open(
                              `https://twitter.com/intent/tweet?text=${process.env.REACT_APP_POST_SHARING_TEXT}`,
                              "targetWindow",
                              "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600,left=" +
                                left +
                                ",top=" +
                                top
                            );
                          }}
                        >
                          <TwitterIcon />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div
                        className={`${classes.xp_block} ${
                          xp1 <= 0 && classes.disabled
                        }`}
                      >
                        <XP1_5
                          onClick={() => onChangeXp(CONSTANTS.XP.xp1_5, data)}
                        />
                        <p>
                          <span>{xp1}</span> left
                        </p>
                      </div>
                      <div
                        className={`${classes.xp_block} ${
                          xp2 <= 0 && classes.disabled
                        }`}
                      >
                        <XP2Icon
                          onClick={() => onChangeXp(CONSTANTS.XP.xp2, data)}
                        />
                        <p>
                          <span>{xp2}</span> left
                        </p>
                      </div>
                      <div
                        className={`${classes.xp_block} ${
                          xp3 <= 0 && classes.disabled
                        }`}
                      >
                        <XP3
                          onClick={() => onChangeXp(CONSTANTS.XP.xp3, data)}
                        />
                        <p>
                          <span>{xp3}</span> left
                        </p>
                      </div>
                    </>
                  )}
                </div>
              }
            >
              {renderXp()}
            </Tooltip>
          )}
        </>
      )}
    </div>
  );

  const RenderStatPoints = ({}) => (
    <div className={classes.stat_points}>
      <div className={classes.stat_points_container}>
        <p
          className={`${classes.stat_points_title} ${
            largeView && classes.large_view
          }`}
        >
          Stats
        </p>
        <div className={`${classes.stat} ${largeView && classes.large_view}`}>
          <p className={`${classes.p} ${largeView && classes.large_view}`}>
            G: {goals} | A: {assists}
          </p>
          <p className={`${classes.p} ${largeView && classes.large_view}`}>
            SOG:
          </p>
        </div>
      </div>

      <div className={classes.stat_points_container}>
        <p
          className={`${classes.stat_points_title} ${
            largeView && classes.large_view
          }`}
        >
          {xp?.xpVal} Points
        </p>
        <div
          className={`${classes.points} ${largeView && classes.large_view} ${
            largeView && classes.large_view_d
          }`}
        >
          <p className={`${classes.p} ${largeView && classes.large_view}`}>
            {points}
          </p>
          {xp1 == 0 && xp2 == 0 && xp3 == 0 ? (
            <div style={{ opacity: 0.5 }}>{renderXp()}</div>
          ) : (
            <RenderXpToolTip />
          )}
        </div>
      </div>
    </div>
  );

  const RenderStatus = ({ success = false, danger = false }) => (
    <p
      className={`${classes.container_status} ${
        singleView ? classes.margin_top_bottom_8 : classes.margin_top_bottom_16
      } ${largeView && classes.large_view}`}
    >
      <span
        className={`
        ${largeView && classes.large_view}
        ${
          success || getStatus() === "Pitching" || getStatus() === "Hitting"
            ? classes.success
            : ""
        } 
        ${danger && classes.danger}`}
      >
        {getStatus()}
      </span>
    </p>
  );

  const RenderMlbRechargeStatus = () => {
    if (isHomeRun) {
      return <HomeRun largeView={largeView} />;
    }

    if (!isEmpty(boost)) {
      return <ActivatedBoost largeView={largeView} boost={boost} />;
    }

    return (
      <RenderStatus
        success={
          hasText(status, "batting") ||
          hasText(status, "pitching") ||
          hasText(status, "hitting")
        }
        danger={hasText(status, "deck")}
      />
    );
  };

  const RenderHeader = () => (
    <div className={classes.card_header}>
      <p className={classes.card_header_title}>
        <span className={classes.border} />
        {console.log("TYPE------------------- ", type)}
        <span>
          {type === "XW" || type === "D" ? type1 : type}:{" "}
          <span className={classes.card_header_points}>14 Pts</span>
        </span>
      </p>
      {/* <div className={classes.header_teams}>
        <p
          className={current_team === away_team.team_id && classes.current_team}
        >
          {getCurrentInningHalf() === "b" ? (
            <Baseball style={{ marginRight: "5px" }} />
          ) : (
            getCurrentInningHalf() === "t" && (
              <BaseballStick style={{ marginRight: "5px" }} />
            )
          )}
          {away_team?.name} {away_team_runs}
        </p>{" "}
        vs{" "}
        <span
          className={current_team === home_team.team_id && classes.current_team}
        >
          {home_team?.name} {home_team_runs}
        </span>
      </div> */}
    </div>
  );

  const RenderSingleViewStats = () => (
    <div className={classes.single_view_state}>
      <p className={classes.single_view_cat}>
        {type === "XW" || type === "D" ? type1 : type}
      </p>
      <div>
        <p className={classes.single_view_pts}>
          Pts: <span className={xp && xp?.xp && classes.active}>30</span>
          {renderXp()}
        </p>
      </div>
      <p>
        <img src={ClockIcon} alt="Hockey Icon" width={12} height={12} /> P1
        <span className={classes.divider_1}>|</span>12:59
      </p>
    </div>
  );

  const RenderTeamDHeader = () =>
    !singleView && <span className={classes.teamd_range}>{range}</span>;

  const RenderHeaderIcons = () => (
    <>
      {
        //   isPowerAvailable("Swap") === 0 || isPowerLocked("Swap") === 1 ? (
        //   <Tooltip
        //   toolTipContent={
        //     <div className={classes.xp_icons}>
        //       {isPowerAvailable("Swap") === 0 ? (
        //         <div>Not Available</div>
        //       ) : (
        //         isPowerLocked("Swap") === 1 ? (
        //           <div style={{display:"flex",width:"100%",justifyContent:"space-evenly"}}>
        //             <p>Share to unlock:</p>
        //             <div>
        //               <a
        //                 href={`https://www.facebook.com/dialog/share?app_id=${process.env.REACT_APP_FACEBOOK_APP_ID}&display=popup&href=http://defygames.io&quote=${text}&redirect_uri=http://defygames.io`}
        //               >
        //                 <button>
        //                   <FacebookIcon />
        //                 </button>
        //               </a>
        //               <a
        //                 href={`https://twitter.com/intent/tweet?text=${text}`}
        //                 target="_blank"
        //               >
        //                 <button>
        //                   <TwitterIcon />
        //                 </button>
        //               </a>
        //             </div>
        //           </div>
        //         ) : (
        //           ""
        //         )
        //       )}
        //     </div>
        //   }
        // >
        //   <Replace size={singleView ? 23 : 22} />
        // </Tooltip>
        // ) : (
        props.swapCount == 0 ? (
          <div style={{ opacity: 0.5 }}>
            <Replace size={singleView ? 23 : 22} />
          </div>
        ) : (
          <Replace
            size={singleView ? 23 : 22}
            onClick={toggleReplaceModal}
            className={isGameOverOrNotStarted() && classes.disabled}
          />
        )

        // )
      }
    </>
  );

  return (
    <>
      <div
        className={`${classes.card_wrapper} ${
          singleView ? classes.singleViewCardWrapper : ""
        }`}
      >
        {!singleView && <RenderHeader />}

        <div
          className={`${classes.card_container} ${
            !compressedView && !singleView && classes.height_284
          }
          ${largeView && !compressedView && classes.height_340}
          ${singleView && classes.single_view_hover}
          ${active && classes.active}
        `}
          onClick={() => onSelectCard(data)}
        >
          <RenderStarPower />
          <div className={classes.container_header}>
            <p
              className={`${classes.container_title} ${
                largeView && classes.large_view
              }`}
            >
              {name} <RenderTeamDHeader />
            </p>
            <RenderHeaderIcons />
          </div>
          {!singleView && <div className={classes.divider} />}

          <div className={classes.container_body}>
            {!showSummary ? (
              <>
                {!singleView && <RenderStatPoints />}
                {!compressedView && (
                  <>
                    {singleView && <RenderSingleViewStats />}
                    {cardType === CardType.MLBR ? (
                      <RenderMlbRechargeStatus />
                    ) : (
                      <RenderStatus
                        success={
                          hasText(status, "batting") ||
                          hasText(status, "pitching") ||
                          hasText(status, "hitting")
                        }
                        danger={hasText(status, "deck")}
                      />
                    )}

                    {/* {isGameOverOrNotStarted() ? (
                      <>
                        <button className={classes.card_footer_btn}>
                          See your {!isEmpty(type1) ? type1 : type} scoring
                          details
                        </button>
                      </>
                    ) : */}
                    {getStatus() !== "Game Over" &&
                    cardType === CardType.NHL &&
                    !singleView ? (
                      <NHLFooterStats />
                    ) : null}
                  </>
                )}
              </>
            ) : (
              <>
                {cardType === CardType.NHL ? (
                  <RenderPointsSummary
                    titleList={NHLSummaryTitles}
                    tableList={pointsSummary}
                    totalPoints={totalPts}
                    largeView={largeView}
                  />
                ) : (
                  <RenderPointsSummary
                    titleList={MLBSummaryTitles}
                    tableList={pointsSummary}
                    totalPoints={totalPts}
                    largeView={largeView}
                  />
                )}
              </>
            )}
          </div>

          {!compressedView &&
            !singleView &&
            getStatus() !== "Game Over" &&
            !showEndThird() &&
            !showMidThird() && (
              <SportsLiveCardFooter
                showSummary={showSummary}
                onClickBack={() => setSummaryState(false)}
                onClickDetails={() => setSummaryState(true)}
                title={footerTitle()}
                largeView={largeView}
              />
            )}
        </div>
      </div>
      <RenderModal
        player={player}
        visible={showReplaceModal}
        onClose={toggleReplaceModal}
        onSwap={onSwap}
        playerList={playerList}
        starPlayerCount={starPlayerCount}
        loading={loadingPlayerList}
      />
    </>
  );
}

SportsLiveCard.propTypes = {
  data: PropTypes.object,
  compressedView: PropTypes.bool,
  largeView: PropTypes.bool,
  singleView: PropTypes.bool,
  isHomeRun: PropTypes.bool,
  boost: PropTypes.object,
  cardType: PropTypes.string,
  starPlayerCount: PropTypes.number,
  playerList: PropTypes.array,
  active: PropTypes.bool,
  onSelectCard: PropTypes.func,
  onChangeXp: PropTypes.func,
  updateReduxState: PropTypes.func,
  gameInfo: PropTypes.object,
  pointXpCount: PropTypes.object,
  currentPlayerList: PropTypes.array,
};

export default SportsLiveCard;