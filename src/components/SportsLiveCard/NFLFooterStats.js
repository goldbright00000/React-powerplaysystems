import React from "react";
import PropTypes from "prop-types";

function NFLFooterStats(props) {
  const RenderState = ({ title, state }) => (
    <div>
      <p>{title}</p>
      <div>
        <p>{state}</p>
      </div>
    </div>
  );

  return (
    <div>
      <RenderState title="Yards to FD/EZ" state="10/55" />
      <RenderState title="Yards to FD/EZ" state="80%" />
      <RenderState title="Yards to FD/EZ" state="1/4" />
    </div>
  );
}

NFLFooterStats.propTypes = {};

export default NFLFooterStats;
