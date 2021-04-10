import React from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";

function SportsLiveCardOverlay(props) {
  const { text = "", visible = false, onGotIt = () => {} } = props || {};

  if (!visible) return null;
  return (
    <div className={classes.overlay_container}>
      <p className={classes.overlay_text}>{text}</p>
      <button className={classes.overlay_btn} onClick={onGotIt}>
        Got it!
      </button>
    </div>
  );
}

SportsLiveCardOverlay.propTypes = {
  text: PropTypes.string,
  visible: PropTypes.bool,
  onGotIt: PropTypes.func,
};

export default SportsLiveCardOverlay;
