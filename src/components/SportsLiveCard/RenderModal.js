import React, { useState, useEffect } from "react";
import {useSelector} from 'react-redux';
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import classes from "./index.module.scss";
import Modal from "../Modal";
import CloseIcon from "../../icons/Close";
import PowerPlayIcon from "../../assets/star.svg";
import StarPlayer from "../StarPlayersCheck";
import Search from "../SearchInput";
import SportsSelectionCard3 from "../SportsSelectionCard3";
import MiniStar from "../../assets/mini_star.png";
import switch1 from "../../assets/switch.svg";
function RenderModal(props) {
  const [replaceData, setReplaceData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterString, setFilterString] = useState("");
  const {
    live_players = []
  } = useSelector(state => state.nhl)
  const {
    visible = false,
    player: currentPlayer = {},
    onClose = () => {},
    onSwap = (player, swapPlayer) => {},
    playerList = {},
    starPlayerCount = 0,
    loading = false,
    dataMain = {}
  } = props || {};
  const {
    players = []
  } = dataMain;
  useEffect(() => {
    if (loading) return;
    if(playerList){
      let old = playerList?.listData;
      if(old !== undefined) {
        old = playerList?.listData.filter(x => {
          if(live_players.findIndex(y => y.id == x.id) == -1)
          {
            return x;
          }
        });
        playerList['listData'] = old;
      }
      setSelectedData(playerList);
    }
  }, [loading, playerList]);

  // Similar to componentDidMount and componentDidUpdate:
  // useEffect(() => {
  //   if (filterString === "") {
  //     setSelectedData(playerList);
  //   } else {
  //     setSelectedData(filteredData);
  //   }
  // }, [filterString]);
  const {
    full_name: playerName = "",
    fantasyPlayerPosition = "",
    primary_position: type = "",
    type1 = "",
  } = currentPlayer || {};

  const onSearch = (e) => {
    const { value } = e.target;
    if (!isEmpty(value)) {
      setFilterString(value);
      const _filterdData = playerList?.listData?.filter((data) => {
        if (props?.pageType == "nhl") {
          return data?.full_name
            ?.toLocaleLowerCase()
            ?.startsWith(value?.toLocaleLowerCase());
        } else {
          return data?.playerName
            ?.toLocaleLowerCase()
            ?.startsWith(value?.toLocaleLowerCase());
        }
      });
      const _filterdDataHomeTeam = playerList?.listData?.filter((data) => {
        if (props?.pageType == "nhl") {
          return data?.match?.home?.name
            ?.toLocaleLowerCase()
            ?.startsWith(value?.toLocaleLowerCase());
        } else {
          return data?.homeTeam
            ?.toLocaleLowerCase()
            ?.startsWith(value?.toLocaleLowerCase());
        }
      });
      var tempObj = [];
      var tempIds = [];
      for (var i = 0; i < _filterdData.length; i++) {
        if (props?.pageType == "nhl") {
          var id = _filterdData[i].id;
        } else {
          var id = _filterdData[i].playerId;
        }
        if (tempIds.indexOf(id) == -1) {
          tempIds.push(id);
          tempObj.push(_filterdData[i]);
        }
      }
      for (var i = 0; i < _filterdDataHomeTeam.length; i++) {
        if (props?.pageType == "nhl") {
          var id = _filterdDataHomeTeam[i].id;
        } else {
          var id = _filterdDataHomeTeam[i].playerId;
        }
        if (tempIds.indexOf(id) == -1) {
          tempIds.push(id);
          tempObj.push(_filterdDataHomeTeam[i]);
        }
      }
      const _filterdDataObj = {
        type: playerList?.type,
        listData: tempObj,
      };
      setSelectedData(_filterdDataObj);
    } else {
      setFilterString("");
      setSelectedData(playerList);
    }
  };

  if (!visible) return <></>;

  return (
    <Modal visible={visible} scrollable={false}>
      <div className={classes.modal_container}>
        <div className={classes.modal_header}>
          <div className={classes.modal_header_top}>
            <CloseIcon size={16} onClick={onClose} />
          </div>
          <div className={classes.modal_header_bottom}>
              <div>
                <p className={classes.modal_title}>
                  Swap Your{" "}
                  <span>
                    {fantasyPlayerPosition ? fantasyPlayerPosition : type}
                  </span>
                </p>
                <p>Players only accumulate points for your team while they are on your team. Any points obtained before being added to your team will not count towards your My Score total </p>
            </div>
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
                {currentPlayer?.is_starPlayer && <img src={MiniStar} />}
                {typeof currentPlayer.name !== "undefined"
                  ? currentPlayer.name
                  : currentPlayer.full_name}
              </p>
            </div>
            <Search
              placeholder={"Search by player or team name..."}
              onSearch={onSearch}
              setStyle={{width: "auto"}}
            />
          </div>

          <div className={classes.modal_list}>
            {loading ? (
              <p
                style={{
                  alignSelf: "center",
                  justifyContent: "center",
                  display: "flex",
                  flex: 1,
                }}
              >
                Loading
              </p>
            ) : selectedData?.listData?.length ? (
              selectedData?.listData?.map((player, ind) =>
                starPlayerCount >= 3 &&
                player?.is_starPlayer &&
                !currentPlayer?.is_starPlayer ? null : (
                  players.findIndex(x => x.id == player.id) === -1 ?
                  <SportsSelectionCard3
                    player={player}
                    btnTitle="Swap"
                    key={ind + "--"}
                    onSelectDeselect={(swapPlayer) =>{
                      onSwap(currentPlayer, swapPlayer);
                      }
                    }
                    type={selectedData?.type}
                    pageType="nhl"
                    showArrow={false}
                    btnIcon={(<img src={switch1} />)}
                  /> : null
                )
              )
            ) : (
              <h2 style={{ margin: "40px auto" }}>
                No players available for Swap at this time.
              </h2>
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
  loading: PropTypes.bool,
};

export default RenderModal;
