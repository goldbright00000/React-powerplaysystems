import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import "./stats.scss";
import HockeyIcon from "../../assets/icons/nhl/hockey.svg";
import ClockIcon from "../../assets/icons/nhl/clock.svg";
import SoccerIcon from "../../assets/icons/nhl/soccer.svg";
import SoccerJerseyIcon from "../../assets/icons/nhl/soccer-jersey.svg";

function NHLFooterStats(props) {
  const {
    player = {},
    onClickBack = () => {},
    onClickDetails = () => {},
    showSummary = false,
    largeView = false,
    title = "",
  } = props || {};

  const { match } = player || {};
  const { home, away } = match || {};

  const { live_clock = 0, live_period = 0 } = useSelector((state) => state.nhl);

  return (
    <div>
      <div className="footer_stats_row">
        <img src={HockeyIcon} alt="Hockey Icon" width={12} height={12} />
        <p>{away?.name} vs</p>
        <p className="bold_text"> {home?.name}</p>
      </div>
      <div className="footer_stats_row">
        <img src={SoccerIcon} alt="Hockey Icon" width={12} height={12} />
        <p>Opp. G: P. Roy .976</p>
      </div>
      <div className="footer_stats_row">
        <img src={ClockIcon} alt="Hockey Icon" width={12} height={12} />
        <p>
          P{live_period} | {live_clock}
        </p>
      </div>
      <div className="footer_stats_row">
        <img src={SoccerJerseyIcon} alt="Hockey Icon" width={12} height={12} />
        <p>DET - Shorthanded 5 on 4</p>
      </div>
    </div>
  );
}

NHLFooterStats.propTypes = {};

export default NHLFooterStats;
