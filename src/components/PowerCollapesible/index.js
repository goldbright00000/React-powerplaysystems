import React, { useState } from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import ReplaceIcon from "../../icons/Replace";
import XpIcon from "../../icons/XPIcon";
import VideoIcon from "../../icons/VideoIcon";
import ShieldIcon from "../../icons/ShieldIcon";

function PowerCollapesible(props) {
  const [collapsed, setCollapseState] = useState(true);

  const { styles = {} } = props || {};

  const RenderIcon = ({ title, count, Icon, iconSize = 24 }) => (
    <div className={classes.body_card}>
      <span>{count}</span>
      <Icon size={iconSize} />
      <p>{title}</p>
    </div>
  );

  return (
    <div className={classes.wrapper} styles={styles}>
      <div
        className={classes.header}
        onClick={() => setCollapseState(!collapsed)}
      >
        <p>
          <span>MY</span> POWERS
        </p>
        <span className={`${classes.arrow} ${!collapsed && classes.up}`} />
      </div>

      <div className={`${classes.body} ${collapsed && classes.collapse}`}>
        <RenderIcon
          title="Swap Player"
          Icon={ReplaceIcon}
          iconSize={54}
          count={2}
        />

        <RenderIcon
          title="Point Booster"
          Icon={XpIcon}
          iconSize={54}
          count={2}
        />

        <RenderIcon
          title="Video Review"
          Icon={VideoIcon}
          iconSize={54}
          count={0}
        />

        <RenderIcon title="D-Wall" Icon={ShieldIcon} iconSize={54} count={1} />
        <button>Learn more</button>
      </div>
    </div>
  );
}

PowerCollapesible.propTypes = {
  styles: PropTypes.any,
};

export default PowerCollapesible;
