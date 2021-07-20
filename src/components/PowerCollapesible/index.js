import React, { useState } from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import ReplaceIcon from "../../icons/Replace";
import XpIcon from "../../icons/XPIcon";
import VideoIcon from "../../icons/VideoIcon";
import ShieldIcon from "../../icons/ShieldIcon";
import RetroBoostIcon from "../../icons/RetroBoostIcon";
import ChallengeIcon from "../../icons/Challenge"

const getIcon = (powerName) => {
  if (powerName) {
    if (powerName.toLowerCase().match(/wall/g))
      return ShieldIcon;

    else if (powerName.toLowerCase().match(/video|review/g))
      return VideoIcon;

    else if (powerName.toLowerCase().match(/swap/g))
      return ReplaceIcon;

    else if (powerName.toLowerCase().match(/multi|boost|1.5|2.5/g))
      return XpIcon;

    else if (powerName.toLowerCase().match(/retro/g))
      return RetroBoostIcon;

    else if (powerName.toLowerCase().match(/challenge/g))
      return ChallengeIcon;
  }
}

function PowerCollapesible(props) {
  const [collapsed, setCollapseState] = useState(true);

  const { styles = {}, powers = [] } = props || {};

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
        {powers && powers.length > 0 && powers.map((item, index) => {
          return (
            <>
              {index < 3 && (
                <RenderIcon
                  title={item?.powerName}
                  Icon={getIcon(item?.powerName)}
                  iconSize={54}
                  count={2}
                />
              )}
            </>
          )
        })}
        <button>Learn more</button>
      </div>
    </div>
  );
}

PowerCollapesible.propTypes = {
  styles: PropTypes.any,
};

export default PowerCollapesible;
