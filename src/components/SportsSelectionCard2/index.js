import React, { useState } from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import ClockIcon from "../../icons/Clock2";
import CalenderIcon from "../../icons/Calendar2";
import StadiumIcon from "../../icons/Stadium2";
import Tick2 from "../../icons/Tick2";
import DeleteIcon from "../../assets/delete.png";
import PowerPlayIcon from "../../assets/token.png";
import StarIcon from "../../icons/Star";
import TDShirtImage from "../../assets/td.png";
import TDBadge from "../../assets/tdBadge.png";

function SportsSelectionCard2(props) {
  const {
    title = "",
    avgVal = 0,
    teamA = "",
    teamB = "",
    time = "",
    date = "",
    stadium = "",
    id = "",
    isSelected = false,
    isStarPlayer = false,
    steps = [],
    onSelectDeselect = () => {},
    disabled = false,
    inset = false,
  } = props || {};

  return (
    <div className={`${classes.container_body_card} ${inset && classes.inset}`}>
      <div className={classes.container_body_card_1}>
        <div className={classes.container_body_left}>
          <div className={classes.container_body_left_h}>
            {isStarPlayer && (
              <span
                className={`${classes.container_body_card_start_power} ${
                  inset && classes.inset
                }`}
              >
                {" "}
                {inset ? (
                  <StarIcon solidcolor="#000" />
                ) : (
                  <img src={PowerPlayIcon} />
                )}{" "}
                Star Power{" "}
              </span>
            )}
            <div className={classes.container_body_card_header}>
              <p
                className={`${classes.container_selected_p} ${
                  isSelected ? classes.active : ""
                }`}
              >
                {title}
              </p>
              {!isSelected ? (
                <button
                  onClick={() => onSelectDeselect(id)}
                  className={disabled && classes.disabled}
                  disabled={disabled}
                >
                  {" "}
                  + Select
                </button>
              ) : (
                <div className={classes.container_selected}>
                  <p className={classes.container_selected_p_1}>
                    <Tick2 /> Selected{" "}
                    <img
                      src={DeleteIcon}
                      onClick={() => onSelectDeselect(id)}
                    />
                  </p>
                </div>
              )}
            </div>
          </div>

          {steps?.[0] ? (
            <div
              className={`
                            ${classes.container_body_card_state} 
                            ${isSelected && classes.active} 
                            ${classes.border}`}
            >
              <div className={classes.card_state}>
                <div className={classes.card_state_title}>
                  {steps?.[0]?.titles?.map((title, ind) => (
                    <span key={ind.toString()}>{title}</span>
                  ))}
                </div>
                <div className={classes.card_state_values}>
                  {steps?.[0]?.step?.map((val, ind) => (
                    <span key={ind.toString()}>{val}</span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p>No Data</p>
          )}

          <div>
            <p>VS {teamB}</p>
          </div>
          <div className={classes.divider}></div>
        </div>

        <div className={classes.container_body_right}>
          <div className={classes.right_img}>
            <img src={TDShirtImage} />
          </div>
          <img src={TDBadge} className={classes.img_badge} />
          <p>Get Your Gear!</p>
        </div>
      </div>

      <div className={classes.container_card_footer_main}>
        <div className={classes.card_footer}>
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
      </div>
    </div>
  );
}

SportsSelectionCard2.propTypes = {
  title: PropTypes.string,
  avgVal: PropTypes.number,
  teamA: PropTypes.string,
  teamB: PropTypes.string,
  time: PropTypes.string,
  date: PropTypes.string,
  stadium: PropTypes.string,
  id: PropTypes.number,
  isSelected: PropTypes.bool,
  isStarPlayer: PropTypes.bool,
  disabled: PropTypes.bool,
  inset: PropTypes.bool,
  steps: PropTypes.array,
  onSelectDeselect: PropTypes.func,
};

export default SportsSelectionCard2;
