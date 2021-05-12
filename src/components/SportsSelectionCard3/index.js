import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import ClockIcon from "../../icons/Clock2";
import CalenderIcon from "../../icons/Calendar2";
import StadiumIcon from "../../icons/Stadium2";
import Tick2 from "../../icons/Tick2";
import DeleteIcon from "../../assets/delete.png";
import StarIcon from "../../icons/Star";
import ForwardArrow from "../../icons/ForwardArrow";
import AidIcon from "../../icons/AidIcon";
import MLBPlayerStat from "./MLBPlayerStat";
import NFLPlayerStat from "./NLFPlayerStats";
import { PAGE_TYPES } from "./PageTypes";
import MLBDetailStats from "./MLBDetailStats";
import AdImage from "../../assets/img.jpg";

function SportsSelectionCard3(props) {
  const [currentStep, setCurrentStep] = useState(0);

  const {
    player = {},
    loading = false,
    onSelectDeselect = (playerId, matchId) => {},
    disabled = false,
    isSelected = false,
    btnTitle = "+ Select",
    btnIcon = "",
    pageType = PAGE_TYPES.MLB,
  } = props || {};

  const {
    playerName: name = "",
    avgVal = 0,
    homeTeam = "",
    awayTeam = "",
    date = "",
    time = "",
    stadium = "",
    playerId = "",
    isStarPlayer = false,
    steps = [],
    playerStats = {},
    injured = false,
    position = "",
    match_id,
    currentPosition = "",
  } = player || {};

  const nextStep = () => {
    let _currentStep = currentStep;
    if (currentStep !== 2) {
      _currentStep++;
    } else {
      _currentStep = 0;
    }

    setCurrentStep(_currentStep);
  };

  const renderStats = () => {
    switch (pageType) {
      case PAGE_TYPES.MLB:
        return <MLBPlayerStat playerStats={playerStats} active={isSelected} />;

      case PAGE_TYPES.NFL:
        return (
          <NFLPlayerStat
            playerStats={playerStats}
            active={isSelected}
            position={position}
          />
        );

      default:
        return <MLBPlayerStat playerStats={playerStats} active={isSelected} />;
    }
  };

  return (
    <div className={classes.container_body_card}>
      {isStarPlayer && (
        <span className={classes.container_body_card_start_power}>
          <StarIcon solidcolor="#000" /> <p>Star Power</p>
        </span>
      )}
      <div className={classes.container_body_card_header}>
        <p
          className={`${classes.container_selected_p} ${
            isSelected ? classes.active : ""
          }`}
        >
          <span>{currentPosition}</span>
          {name}
        </p>
        {injured && (
          <div className={classes.injured}>
            <AidIcon />
            <span>Injured</span>
          </div>
        )}
        {!isSelected ? (
          <button
            onClick={() => onSelectDeselect(playerId, match_id)}
            className={disabled && classes.disabled}
            disabled={disabled}
          >
            {btnIcon && btnIcon} {btnTitle || "+ Select"}
          </button>
        ) : (
          <div className={classes.container_selected}>
            <p className={classes.container_selected_p_1}>
              <Tick2 /> Selected{" "}
              <img
                src={DeleteIcon}
                onClick={() => onSelectDeselect(playerId, match_id)}
              />
            </p>
          </div>
        )}
      </div>

      <div className={classes.card_state_main_container}>
        {currentStep === 0 ? (
          renderStats()
        ) : currentStep === 1 ? (
          <MLBDetailStats position={currentPosition} />
        ) : (
          <img src={AdImage} />
        )}
      </div>

      <div className={classes.container_card_footer_main}>
        {currentStep === 0 && (
          <div className={classes.card_footer_left}>
            <p>
              <span className={classes.teamA}>{homeTeam}</span> VS{" "}
              <span className={classes.teamB}>{awayTeam}</span>
            </p>

            <div className={classes.divider}></div>
            <p className={classes.container_body_footer}>
              <span>
                <ClockIcon /> {time}
              </span>
              <span>
                <CalenderIcon /> {date}
              </span>
              <span>
                <StadiumIcon /> {stadium}
              </span>
            </p>
          </div>
        )}

        <div className={classes.card_footer_right} onClick={nextStep}>
          <ForwardArrow color={"#fb6e00"} />
        </div>
      </div>
    </div>
  );
}

SportsSelectionCard3.propTypes = {
  item: PropTypes.object,
  isSelected: PropTypes.bool,
  disabled: PropTypes.bool,
  btnTitle: PropTypes.string,
  btnIcon: PropTypes.element,
  onSelectDeselect: PropTypes.func,
  loading: PropTypes.bool,
  pageType: PropTypes.string,
};

export default React.memo(SportsSelectionCard3);
