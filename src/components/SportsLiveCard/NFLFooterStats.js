import React from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
function NFLFooterStats(props) {
  const RenderState = ({ title, state }) => (
    <div className={classes.nfl_stat}>
      <p className={classes.title_p}>{title}</p>
      <div className={classes.nfl_stat_value}>
        <p>{state}</p>
      </div>
    </div>
  );

  return (
    <div className={classes.nfl_footer_stat}>
      <RenderState title="Yards to FD/EZ" state="10/55" />
      <RenderState title="Yards to FD/EZ" state="80%" />
      <RenderState title="Yards to FD/EZ" state="1/4" />
    </div>
  );
}

NFLFooterStats.propTypes = {};

export default NFLFooterStats;
