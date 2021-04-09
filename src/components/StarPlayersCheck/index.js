import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import classes from "./index.module.scss";
import CheckIcon from "../../icons/Check";
import Circle from "../../icons/CircleEmpty";

function StarPlayersCheck(props) {
  const [starPlayers, setStarPlayers] = useState([]);

  const { totalStarPlayers = 0, selectedCount = 0 } = props || {};

  useEffect(() => {
    const _starPlayers = [];
    //set array length
    for (let i = 0; i < totalStarPlayers; i++) {
      _starPlayers.push(false);
    }

    //set the check to true if star player exists
    for (let i = 0; i < selectedCount; i++) {
      if (_starPlayers?.length >= selectedCount) {
        _starPlayers[i] = true;
      }
    }
    setStarPlayers(_starPlayers);
  }, [totalStarPlayers, selectedCount]);

  return (
    <div className={classes.wrapper}>
      {starPlayers?.map((isSelected, index) =>
        isSelected ? <CheckIcon /> : <Circle key={index.toString()} />
      )}
    </div>
  );
}

StarPlayersCheck.propTypes = {
  totalStarPlayers: PropTypes.number,
  selectedCount: PropTypes.number,
};

export default StarPlayersCheck;
