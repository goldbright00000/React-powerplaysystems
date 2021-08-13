import React, { useState } from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import ReplaceIcon from "../../icons/Replace";
import XpIcon from "../../icons/XPIcon";
import VideoIcon from "../../icons/VideoIcon";
import ShieldIcon from "../../icons/ShieldIcon";
import RetroBoostIcon from "../../icons/RetroBoost";
import ChallengeIcon from "../../icons/Challenge"
import PowerUpIcon from "../../icons/PowerUp";
import LockIcon from "../../icons/Lock";
import TwitterIcon from "../../icons/TwitterIcon";
import FacebookIcon from "../../icons/FacebookIcon";

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

    else if (powerName.toLowerCase().match(/power-up/g))
      return PowerUpIcon;
  }
}

function PowerCollapesible(props) {
  const [collapsed, setCollapseState] = useState(true);

  const [swapCounts, setSwapCounts] = useState(0);
  const [dwallCounts, setDwallCounts] = useState(0);
  const [challengeCounts, setChallengeCounts] = useState(0);
  const [pointMultiplierCounts, setPointMultiplierCounts] = useState(0);
  const [pointBooster15x, setPointBooster15xCounts] = useState(0);
  const [pointBooster2x, setPointBooster2xCounts] = useState(0);
  const [pointBooster3x, setPointBooster3xCounts] = useState(0);
  const [retroBoostCounts, setRetroBoostCounts] = useState(0);
  const [powerUpCounts, setPowerUpCounts] = useState(0);

  const text = process.env.REACT_APP_POST_SHARING_TEXT;

  const { styles = {}, powers = [] } = props || {};

  const setPowers = () => {
    let remainingPowers = powers;
    let challenge = 0;
    let swap = 0;
    let point_booster = 0;
    let p15 = 0;
    let p2 = 0;
    let p3 = 0;
    let dwall = 0;
    let retro_boost = 0;
    let power_up = 0;
    for (let i = 0; i < remainingPowers.length; i++) {
      let rec = remainingPowers[i];
      if (rec.powerName === "D-Wall") {
        dwall = remainingPowers[i].amount;
      } else if (rec.powerName === "Challenge") {
        challenge = remainingPowers[i].amount;
      } else if (
        rec.powerName === "1.5x Point Booster"
      ) {
        p15 = remainingPowers[i].amount;
        point_booster =
          point_booster + parseInt(remainingPowers[i].amount);
      } else if (
        rec.powerName === "2x Point Booster"
      ) {
        p2 = remainingPowers[i].amount;
        point_booster =
          point_booster + parseInt(remainingPowers[i].amount);
      } else if (
        rec.powerName === "3x Point Booster"
      ) {
        p3 = remainingPowers[i].amount;
        point_booster =
          point_booster + parseInt(remainingPowers[i].amount);
      }else if (rec.powerName === "Swap") {
        swap = remainingPowers[i].amount;
      } else if (rec.powerName === "Retro Boost") {
        retro_boost = remainingPowers[i].amount;
      } else if (rec.powerName === "Power-Up") {
        power_up = remainingPowers[i].amount;
      }
    }
    setChallengeCounts(challenge);
    setSwapCounts(10 || swap);
    setDwallCounts(10 || dwall);
    setPointMultiplierCounts(point_booster);
    setRetroBoostCounts(retro_boost);
    setPowerUpCounts(power_up);
    setPointBooster15xCounts(p15);
    setPointBooster2xCounts(p2);
    setPointBooster3xCounts(p3);
  }

  const isPowerAvailable = (type) => {
    let powerss = powers;
    let available = 0;
    if (type === "Swap Player") {
      type = "Swap";
    }
    if (type === "Power Up") {
      type = "Power-Up";
    }
    if(typeof powerss == "undefined")
    {
      return;
    }
    for (var i = 0; i < powerss.length; i++) {
      if (type === "Point Booster") {
        if (
          powerss[i].powerName === "1.5x Point Booster" ||
          powerss[i].powerName === "2x Point Booster" ||
          powerss[i].powerName === "3x Point Booster"
        ) {
          available = 1;
          break;
        }
      } else {
        if (powerss[i].powerName === type) {
          available = 1;
          break;
        }
      }
    }
    return available;
  }

  function isPowerLocked(type) {
    let powerss = powers;
    if(typeof powerss == "undefined")
    {
      return;
    }
    let locked = 0;
    if (type === "Swap Player") {
      type = "Swap";
    }
    if (type === "Power Up") {
      type = "Power-Up";
    }
    for (var i = 0; i < powerss.length; i++) {
      if (type === "Point Booster") {
        if (
          powerss[i].powerName === "1.5x Point Booster" ||
          powerss[i].powerName === "2x Point Booster" ||
          powerss[i].powerName === "3x Point Booster"
        ) {
          if (powerss[i].SocialMediaUnlock == true || powerss[i].SocialMediaUnlock == "true") {
            locked = 1;
          }
          break;
        }
      } else {
        if (powerss[i].powerName === type) {
          if (powerss[i].SocialMediaUnlock == true || powerss[i].SocialMediaUnlock == "true") {
            locked = 1;
          }
          break;
        }
      }
    }
    return locked;
  }

  React.useEffect(() => {
    setPowers();
  },[]);

  

  const RenderPower = ({
    title = "",
    Icon = "",
    isSvgIcon = false,
    count = 0,
  }) => {
    const text = process.env.REACT_APP_POST_SHARING_TEXT;
    return (
      <div className={classes.sidebar_content_p}>
        <div className={classes.sidebar_power_header}>
          {isSvgIcon ? (
            <Icon size={54} />
          ) : (
            <img src={Icon} width={54} height={54} />
          )}
          {isPowerAvailable(title) === 1 && isPowerLocked(title) === 1 && (
            <div className={classes.sidebar_lock_icon}>
              <LockIcon />
            </div>
          )}
        </div>
        <p className={classes.power_title}>{title}</p>
        {isPowerAvailable(title) === 0 ? (
          <div style={{ opacity: 0.6, fontSize: "0.9rem" }}>Not Available</div>
        ) : (
          <div className={classes.power_footer}>
            {isPowerLocked(title) === 1 ? (
              <>
                <p>Share to unlock:</p>
                <div>
                
                    <button onClick={() => {
                      var left = (window.screen.width / 2) - (600 / 2),
                      top = (window.screen.height / 2) - (600 / 2);
                    window.open(`https://www.facebook.com/dialog/share?app_id=${process.env.REACT_APP_FACEBOOK_APP_ID}&display=popup&href=http://defygames.io&quote=${process.env.REACT_APP_POST_SHARING_TEXT}&redirect_uri=http://defygames.io`,'targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600,left='+left+',top='+top);
                  }}>
                    <FacebookIcon />
                  </button>
                
                
                  <button onClick={() => {
                    var left = (window.screen.width / 2) - (600 / 2),
                    top = (window.screen.height / 2) - (600 / 2);
                    window.open(`https://twitter.com/intent/tweet?text=${process.env.REACT_APP_POST_SHARING_TEXT}`,'targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600,left='+left+',top='+top);
                  }}>
                    <TwitterIcon />
                  </button>
                  
                </div>
              </>
            ) : (
              <p className={classes.power_footer_count}>
                {count}
              </p>
            )}
          </div>
        )}
      </div>
    );
  };


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
        <RenderPower
          title="Point Booster"
          isSvgIcon
          Icon={XpIcon}
          count={pointMultiplierCounts}
        />
        <RenderPower
          title="Swap Player"
          isSvgIcon
          Icon={ReplaceIcon}
          count={swapCounts}
        />
        <RenderPower
          title="D-Wall"
          isSvgIcon
          Icon={ShieldIcon}
          count={dwallCounts}
        />
        <RenderPower
          title="Challenge"
          isSvgIcon
          Icon={ChallengeIcon}
          count={challengeCounts}
        />
        <RenderPower
          title="Retro Boost"
          isSvgIcon
          Icon={RetroBoostIcon}
          count={retroBoostCounts}
        />
        <RenderPower
          title="Power Up"
          isSvgIcon
          Icon={PowerUpIcon}
          count={powerUpCounts}
        />
        <button>Learn more</button>
      </div>
    </div>
  );
}

PowerCollapesible.propTypes = {
  styles: PropTypes.any,
};

export default PowerCollapesible;
