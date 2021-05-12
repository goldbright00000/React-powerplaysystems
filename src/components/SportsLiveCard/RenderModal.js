import React, { useState } from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import Modal from "../Modal";
import CloseIcon from "../../icons/Close";
import PowerPlayIcon from "../../assets/token.png";
import StarPlayer from "../StarPlayersCheck";
import Search from "../SearchInput";
import SportsSelectionCard3 from "../SportsSelectionCard3";

function RenderModal(props) {
  const [replaceData, setReplaceData] = useState([]);

  const {
    visible = false,
    player: currentPlayer = {},
    onClose = () => {},
    onSwap = (playerId, match_id) => {},
    playerList = {},
    starPlayerCount = 0,
  } = props || {};

  const { name: playerName = "", category = "" } = currentPlayer || {};
  const playerTeam = [
    { title: "Team A" },
    { title: "Team B" },
    { title: "Team C" },
    { title: "Team D" },
  ];

  return (
    <Modal visible={visible} scrollable={false}>
      <div className={classes.modal_container}>
        <div className={classes.modal_header}>
          <div className={classes.modal_header_top}>
            <CloseIcon size={16} onClick={onClose} />
          </div>
          <div className={classes.modal_header_bottom}>
            <p className={classes.modal_title}>
              Swap Your <span>{category}</span>
            </p>

            <div className={classes.modal_star_player_container}>
              <img src={PowerPlayIcon} />
              <div className={classes.star_player_right}>
                <p>My Star Players</p>
                <StarPlayer
                  totalStarPlayers={3}
                  selectedCount={starPlayerCount}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={classes.modal_body}>
          <div className={classes.modal_header}>
            <div className={classes.header_left}>
              <p>Choose player to replace</p>
              <p className={classes.header_player_name}>
                <img src={PowerPlayIcon} />
                {playerName}
              </p>
            </div>
            <Search dropDown={playerTeam} />
          </div>

          <div className={classes.modal_list}>
            {playerList?.players?.length &&
              playerList?.players?.map((player, ind) =>
                starPlayerCount >= 3 &&
                player?.isStarPlayer &&
                !currentPlayer?.isStarPlayer ? null : (
                  <SportsSelectionCard3
                    player={player}
                    btnTitle="Swap"
                    key={ind + "--"}
                    onSelectDeselect={(playerId, match_id) =>
                      onSwap(playerId, match_id)
                    }
                  />
                )
              )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

RenderModal.propTypes = {
  visible: PropTypes.bool,
  starPlayerCount: PropTypes.number,
  player: PropTypes.object,
  playerList: PropTypes.object,
  onSwap: PropTypes.func,
  onClose: PropTypes.func,
};

export default RenderModal;
