import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import { hasText } from "../../utility/shared";
import RenderMLBPlayerStats from "./RenderMLBPlayerStats";
import SportsLiveCardFooter from "./SportsLiveCardFooter";
import VideoIcon from "../../icons/VideoIcon";
import ShieldIcon from "../../icons/ShieldIcon";
import { isEmpty } from "lodash";
import RenderPointsSummary from "./RenderPointsSummary";
import SportsLiveCardOverlay from "./SportsLiveCardOverlay";

const MLBSummaryTitles = ["Inning", "Types", "Power", "Pts"];

function SportsLiveCardTeamD(props) {
  const [showSummary, setSummaryState] = useState(false);
  const [showVideoOverlay, setVideoOverlayState] = useState(true);

  const {
    team = {},
    compressedView = false,
    largeView = false,
    singleView = false,
    active = false,
  } = props || {};

  const {
    name = "",
    type = "",
    status = "",
    points = 0,
    homeTeam = "",
    awayTeam = "",
    playerStats = {},
    pointsSummary = [],
    totalPts = 0,
    range = "",
    xp = {},
    mlb_team_stats = [],
  } = team || {};

  const {
    abbr = 0,
    average_runs_against = 0,
    loses = 0,
    season_id = 0,
    stats_id = 0,
    status: teamStatus = null,
    team_id,
    wins: teamWins = 0,
  } = mlb_team_stats[0] || {};

  useEffect(() => {
    if (compressedView) setSummaryState(false);
  }, [compressedView]);

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
            Avg Runs Against:{average_runs_against}
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
          className={`${classes.points} ${classes.team_d_width} ${
            largeView && classes.large_view_d
          }`}
        >
          <p className={`${classes.p} ${largeView && classes.large_view}`}>
            {points}
          </p>
        </div>
      </div>
      <div
        className={`${classes.team_d_icons} ${largeView && classes.large_view}`}
      >
        <VideoIcon size={largeView ? 28 : 24} />
        <ShieldIcon size={largeView ? 28 : 24} />
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
        {type}
      </p>
      <div className={classes.header_teams}>
        <p>{homeTeam}</p> vs <span>{awayTeam}</span>
      </div>
    </div>
  );

  const RenderSingleViewStats = () => (
    <div className={classes.single_view_state}>
      <p className={classes.single_view_cat}>{type}</p>
      <div>
        <p className={classes.single_view_pts}>
          Pts: <span className={xp && xp?.xp && classes.active}>30</span>
        </p>
      </div>
      <p>
        Bot 1st
        <span className={classes.divider_1}>|</span>2 Out
      </p>
    </div>
  );

  const RenderTeamDHeader = () =>
    !singleView && <span className={classes.teamd_range}>{range}</span>;

  const RenderHeaderIcons = () =>
    singleView && <VideoIcon size={singleView && 23} />;

  return (
    <>
      <div className={classes.card_wrapper}>
        {!singleView && <RenderHeader />}

        <div
          className={`${classes.card_container} ${
            !compressedView && !singleView && classes.height_284
          }
          ${largeView && !compressedView && classes.height_340}
          ${singleView && classes.single_view_hover}
          ${active && classes.active}
        `}
          onClick={() => {}}
        >
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
                  largeView={largeView}
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
              largeView={largeView}
            />
          )}

          <SportsLiveCardOverlay
            text="Video review is available now"
            visible={!singleView && showVideoOverlay}
            onGotIt={() => setVideoOverlayState(false)}
            largeView={largeView}
          />
        </div>
      </div>
    </>
  );
}

SportsLiveCardTeamD.propTypes = {
  team: PropTypes.object,
  compressedView: PropTypes.bool,
  largeView: PropTypes.bool,
  singleView: PropTypes.bool,
  active: PropTypes.bool,
};

export default SportsLiveCardTeamD;
