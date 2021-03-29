import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";

import classes from "./index.module.scss";
import BackArrow from "../../icons/BackArrow";
import { CONSTANTS } from "../../utility/constants";

function NHLLiveSportsHeader(props) {
  const {
    selectedView = "",
    btnTitle1 = "",
    btnTitle2 = "",
    btnTitle3 = "",
    buttonTitle = "",
    singleBtn = false,
    buttonIcon = "",
    onPress = () => {},
    onFullView = () => {},
    onCompressedView = () => {},
    onSingleView = () => {},
    className = {},
  } = props || {};

  const renderActiveButton = () => (
    <div className={classes.right_menu}>
      <button
        className={`${classes.button} 
                ${selectedView === CONSTANTS.NHL_VIEW.FV && classes.active}`}
        onClick={onFullView}
      >
        {buttonIcon} {btnTitle1 || "Full View"}
      </button>

      <button
        className={`${classes.button} 
                    ${selectedView === CONSTANTS.NHL_VIEW.C && classes.active}`}
        onClick={onCompressedView}
      >
        {buttonIcon} {btnTitle2 || "Detailed Team View"}
      </button>

      <button
        className={`${classes.button} 
                    ${selectedView === CONSTANTS.NHL_VIEW.S && classes.active}`}
        onClick={onSingleView}
      >
        {buttonIcon} {btnTitle3 || "Full View"}
      </button>
    </div>
  );

  return (
    <div className={`${classes.container_header} ${className}`}>
      <button className={`${classes.button_back} ${classes.bg_transparent}`}>
        <BackArrow /> Go to My Game center
      </button>

      <div className={classes.container_nav}>
        <ul>
          <li>
            <NavLink
              exact
              to="/nhl-live-powerdfs"
              activeClassName={classes.active}
            >
              Team Manager
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/nhl-live-powerdfs/my-score-details"
              activeClassName={classes.active}
            >
              My Score Details
            </NavLink>
          </li>
        </ul>
        {!singleBtn ? (
          renderActiveButton()
        ) : (
          <button className={classes.btn_single} onClick={onPress}>
            {buttonIcon} {buttonTitle || "Detail View"}
          </button>
        )}
      </div>
    </div>
  );
}

NHLLiveSportsHeader.propTypes = {
  selectedView: PropTypes.string,
  btnTitle1: PropTypes.string,
  btnTitle2: PropTypes.string,
  btnTitle3: PropTypes.string,
  buttonTitle: PropTypes.string,
  singleBtn: PropTypes.bool,
  buttonIcon: PropTypes.any,
  className: PropTypes.object,
  onPress: PropTypes.func,
  onFullView: PropTypes.func,
  onCompressedView: PropTypes.func,
  onSingleView: PropTypes.func,
};

export default NHLLiveSportsHeader;
