import React from "react";
import PropTypes from "prop-types";

import classes from "./playerStat.module.scss";
import { CONSTANTS } from "../../utility/constants";

const DEFAULT_TITLES = ["YDS/G", "Rush TD", "Rec TD", "FPPG"];
const QB_TITLES = ["P YDS/G", "R YDS/G", "P TD", "R TD", "FFPG"];
const K_TITLES = ["FGA", "FGM", "PCT", "LNG", "FFPG"];

const { QB, K } = CONSTANTS.FILTERS.NFL;

function MLBPlayerStat(props) {
  const { active = false, playerStats = {}, position } = props || {};

  const {
    pydsg = 0,
    rydsg = 0,
    ydsg = 0,
    ptd = 0,
    rtd = 0,
    fga = 0,
    fgm = 0,
    pct = 0,
    lng = 0,
  } = playerStats || {};

  const getTwoDecimal = (value) => {
    if (value !== 0) return parseFloat(value).toFixed(2);

    return value;
  };

  const RenderQB = () => (
    <>
      <div className={classes.card_state_title}>
        {QB_TITLES?.map((title, index) => (
          <span key={index.toString()} className={classes.state_step_1_title}>
            {title}
          </span>
        ))}
      </div>

      <div className={classes.card_state_values}>
        <RenderItem value={getTwoDecimal(pydsg)} />
        <RenderItem value={rydsg} />
        <RenderItem value={ptd} />
        <RenderItem value={rtd} />
        <RenderItem value={0} />
      </div>
    </>
  );

  const RenderK = () => (
    <>
      <div className={classes.card_state_title}>
        {K_TITLES?.map((title, index) => (
          <span key={index.toString()} className={classes.state_step_1_title}>
            {title}
          </span>
        ))}
      </div>

      <div className={classes.card_state_values}>
        <RenderItem value={getTwoDecimal(fga)} />
        <RenderItem value={fgm} />
        <RenderItem value={pct} />
        <RenderItem value={lng} />
        <RenderItem value={0} />
      </div>
    </>
  );

  const RenderDefault = () => (
    <>
      <div className={classes.card_state_title}>
        {DEFAULT_TITLES?.map((title, index) => (
          <span key={index.toString()} className={classes.state_step_1_title}>
            {title}
          </span>
        ))}
      </div>

      <div className={classes.card_state_values}>
        <RenderItem value={getTwoDecimal(ydsg)} />
        <RenderItem value={ptd} />
        <RenderItem value={rtd} />
        <RenderItem value={0} />
      </div>
    </>
  );

  const RenderItem = ({ value }) => <span>{value}</span>;

  const RenderStats = () => {
    if (`${position}`?.toLocaleLowerCase() === QB) {
      return <RenderQB />;
    }

    if (`${position}`?.toLocaleLowerCase() === K) {
      return <RenderK />;
    }

    return <RenderDefault />;
  };

  return (
    <div className={`${classes.card_state} ${active && classes.active}`}>
      {RenderStats()}
    </div>
  );
}

MLBPlayerStat.propTypes = {
  playerStats: PropTypes.object,
  active: PropTypes.bool,
  position: PropTypes.string,
};

export default MLBPlayerStat;
