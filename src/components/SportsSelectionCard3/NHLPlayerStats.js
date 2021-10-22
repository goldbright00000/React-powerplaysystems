import React from "react";
import PropTypes from "prop-types";

import classes from "./playerStat.module.scss";
import { CONSTANTS } from "../../utility/constants";

const DEFAULT_TITLES = ["GP", "G", "A", "P", "Avg S"];
const G_TITLES = ["GP", "GAA", "SV%", "SO"];

const { G } = CONSTANTS.FILTERS.NHL;

function NHLPlayerStat(props) {
  const { active = false, playerStats = {}, position } = props || {};

  const { total = {}, average = {} } = playerStats || {};
  const { games_played = 0, goals = 0, assists = 0, points = 0 } = total || {};
  const { shots: average_shots = 0 } = average || {};

  const getTwoDecimal = (value) => {
    if (value) return parseFloat(value).toFixed(2);
    else return 0;
  };

  const RenderDefault = () => (
    <>
      <div className={classes.card_state_title}>
        {position === G ? (
          <>
            {G_TITLES?.map((title, index) => (
              <span
                key={index.toString()}
                className={classes.state_step_1_title}
              >
                {title}
              </span>
            ))}
          </>
        ) : (
          <>
            {DEFAULT_TITLES?.map((title, index) => (
              <span
                key={index.toString()}
                className={classes.state_step_1_title}
              >
                {title}
              </span>
            ))}
          </>
        )}
      </div>

      {position === G ? (
        <div className={classes.card_state_values}>
          <RenderItem value={games_played ? games_played : 0} />
          <RenderItem value={goals ? goals : 0} />
          <RenderItem value={assists ? assists : 0} />
          <RenderItem value={getTwoDecimal(points)} />
        </div>
      ) : (
        <div className={classes.card_state_values}>
          <RenderItem value={games_played ? games_played : 0} />
          <RenderItem value={goals ? goals : 0} />
          <RenderItem value={assists ? assists : 0} />
          <RenderItem value={getTwoDecimal(points)} />
          <RenderItem value={getTwoDecimal(average_shots)} />
        </div>
      )}
    </>
  );

  const RenderItem = ({ value }) => <span>{value}</span>;

  const RenderStats = () => {
    // if (`${position}`?.toLocaleLowerCase() === QB) {
    //   return <RenderQB />;
    // }

    // if (`${position}`?.toLocaleLowerCase() === K) {
    //   return <RenderK />;
    // }

    return <RenderDefault />;
  };

  return (
    <div className={`${classes.card_state} ${active && classes.active}`}>
      {RenderStats()}
    </div>
  );
}

NHLPlayerStat.propTypes = {
  playerStats: PropTypes.object,
  active: PropTypes.bool,
  position: PropTypes.string,
};

export default NHLPlayerStat;
