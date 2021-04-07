import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import classes from "./index.module.scss";
import Replace from "../../icons/Replace";
import XPIcon from "../../icons/XPIcon";
import StarPower from "../../assets/star_power.png";
import { hasText } from "../../utility/shared";
import RenderMLBPlayerStats from "./RenderMLBPlayerStats";
import SportsLiveCardFooter from "./SportsLiveCardFooter";
import XP1_5 from "../../icons/XP1_5";
import XP1_5_1 from "../../icons/XP1_5_1";
import XP2Icon from "../../icons/XP2";
import XP2Icon_1 from "../../icons/XP2_1";
import XP3 from "../../icons/XP3";
import XP3_1 from "../../icons/XP3_1";
import MiniStar from "../../assets/mini_star.png";
import Tooltip from "../ToolTip";
import { isEmpty } from "lodash";
import { CONSTANTS } from "../../utility/constants";
import RenderPointsSummary from "./RenderPointsSummary";

const MLBSummaryTitles = ["Inning", "Types", "Power", "Pts"];

function SportsLiveCard(props) {
  const [xp, setXp] = useState({});
  const [showSummary, setSummaryState] = useState(false);

  const {
    player = {},
    compressedView = false,
    largeView = false,
    singleView = false,
    active = false,
    onSelectCard = () => {},
  } = props || {};

  const {
    name: playerName = "",
    category = "",
    status = "",
    points = 0,
    teamA = "",
    teamB = "",
    stats = {},
    playerStats = {},
    pointsSummary = [],
    totalPts = 0,
    isStarPlayer = false,
    team = "",
  } = player || {};

  useEffect(() => {
    if (compressedView) setSummaryState(false);
  }, [compressedView]);

  const onSelectXp = (xp = "") => {
    const _selectedXp = {
      xp,
    };
    if (xp === CONSTANTS.XP.xp1_5) _selectedXp.xpVal = "1.5x";
    else if (xp === CONSTANTS.XP.xp2) _selectedXp.xpVal = "2x";
    else if (xp === CONSTANTS.XP.xp3) _selectedXp.xpVal = "3x";

    setXp(_selectedXp);
  };

  const renderSelectedXp = () => {
    let svgSize = largeView ? 28 : 24;
    if (xp?.xp === CONSTANTS.XP.xp1_5) return <XP1_5_1 size={svgSize} />;
    else if (xp?.xp === CONSTANTS.XP.xp2) return <XP2Icon_1 size={svgSize} />;
    else if (xp?.xp === CONSTANTS.XP.xp3) return <XP3_1 size={svgSize} />;

    return <XPIcon size={svgSize} />;
  };

  const RenderStarPower = ({}) =>
    isStarPlayer && (
      <img
        className={`${classes.star_power} ${singleView && classes.mini_star}`}
        src={singleView ? MiniStar : StarPower}
      />
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
            {stats?.val1}
          </p>
          <p className={`${classes.p} ${largeView && classes.large_view}`}>
            {stats?.val2}
          </p>
        </div>
      </div>

      <div className={classes.stat_points_container}>
        <p className={classes.stat_points_title}>{xp?.xpVal} Points</p>
        <div className={`${classes.points} ${largeView && classes.large_view}`}>
          <p className={`${classes.p} ${largeView && classes.large_view}`}>
            {points}
          </p>
          <div className={classes.stat_xp}>
            <Tooltip
              toolTipContent={
                <div className={classes.xp_icons}>
                  <XP1_5 onClick={() => onSelectXp(CONSTANTS.XP.xp1_5)} />
                  <XP2Icon onClick={() => onSelectXp(CONSTANTS.XP.xp2)} />
                  <XP3 onClick={() => onSelectXp(CONSTANTS.XP.xp3)} />
                </div>
              }
            >
              {renderSelectedXp()}
            </Tooltip>
          </div>
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
        ${success && classes.success} 
        ${danger && classes.danger}`}
      >
        {status}
      </span>
    </p>
  );

  const RenderHeader = () => (
    <div className={classes.card_header}>
      <p className={classes.card_header_title}>
        <span className={classes.border} />
        {category}
      </p>
      <div className={classes.header_teams}>
        <p>{teamA}</p> vs <span>{teamB}</span>
      </div>
    </div>
  );

  const RenderSingleViewStats = () => (
    <div className={classes.single_view_state}>
      <p className={classes.single_view_cat}>{category}</p>
      <div>
        <p>Pts: 30</p>
      </div>
      <p>
        Bot 1st
        <span className={classes.divider_1}>|</span>2 Out
      </p>
    </div>
  );

  const isTeamD = () => team === "d" || team === "defence";

  return (
    <div className={classes.card_wrapper} onClick={() => onSelectCard(player)}>
      {!singleView && <RenderHeader />}

      <div
        className={`${classes.card_container} ${
          !compressedView && !singleView && classes.height_284
        }
          ${largeView && !compressedView && classes.height_340}
          ${singleView && classes.single_view_hover}
          ${active && classes.active}
        `}
      >
        <RenderStarPower />
        <div className={classes.container_header}>
          <p
            className={`${classes.container_title} ${
              largeView && classes.large_view
            }`}
          >
            {playerName}
          </p>
          {!isTeamD() && <Replace size={22} />}
        </div>
        {!singleView && <div className={classes.divider} />}

        <div className={classes.container_body}>
          {!showSummary ? (
            <>
              {!singleView && <RenderStatPoints />}
              {!compressedView && (
                <>
                  {singleView && <RenderSingleViewStats />}
                  <RenderStatus
                    success={
                      hasText(status, "batting") ||
                      hasText(status, "pitching") ||
                      hasText(status, "hitting")
                    }
                    danger={hasText(status, "deck")}
                  />

                  {!isEmpty(playerStats) && !singleView && (
                    <RenderMLBPlayerStats
                      playerStats={playerStats}
                      {...props}
                    />
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <RenderPointsSummary
                titleList={MLBSummaryTitles}
                tableList={pointsSummary}
                totalPoints={totalPts}
              />
            </>
          )}
        </div>

        {!compressedView && !singleView && (
          <SportsLiveCardFooter
            showSummary={showSummary}
            onClickBack={() => setSummaryState(false)}
            onClickDetails={() => setSummaryState(true)}
            title="Bot 1st | 2 Out"
          />
        )}
      </div>
    </div>
  );
}

SportsLiveCard.propTypes = {
  player: PropTypes.object,
  compressedView: PropTypes.bool,
  largeView: PropTypes.bool,
  singleView: PropTypes.bool,
  active: PropTypes.bool,
  onSelectCard: PropTypes.func,
};

export default SportsLiveCard;
