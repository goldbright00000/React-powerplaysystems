import React from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";

const PowerPickCard = (props) => {
  const { styles = {}, ranks } = props;

  return (
    <div
      className={`${classes.card_wrapper} ${
        props?.shadow && classes.card_shadow
      } ${props?.className}`}
      style={styles}
    >
      {props.ranks ? (
        <div className={classes.myScoreDiv}>
          <p className={classes.scoreTitle}>My Score:</p>{" "}
          <p className={classes.scoreText}>{props.ranks.score}</p>
        </div>
      ) : (
        ""
      )}
      {props?.children}
    </div>
  );
};

PowerPickCard.propTypes = {
  shadow: PropTypes.bool,
  styles: PropTypes.object,
  className: PropTypes.any,
};

export default PowerPickCard;
