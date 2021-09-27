import React, { useEffect, useState } from "react";
import classes from "./teamPointsModal.module.scss";
import Modal from "../../components/Modal";
import CloseIcon from "../../assets/close-white-icon.png";
import Card from "../../components/PowerpickCard";
import { getMlbLivePlayPlayerTeamData } from "../../actions/MLBActions";
import { useDispatch } from "react-redux";
import _ from "lodash";
import SportsSavedPlayerCard from "../../components/SportsSavedPlayerCard";

const TeamPointsModal = (props) => {
  const dispatch = useDispatch();

  const { isVisible = false, onClose = () => {}, item = {} } = props || {};
  const [activeTab, setActiveTab] = useState(1);

  const [savedTeam, setSavedTeam] = useState([]);

  useEffect(() => {
    async function getData() {
      const teamData = await dispatch(
        getMlbLivePlayPlayerTeamData({
          user_id: item?.user_id,
          game_id: item?.game_id,
          sport_id: item?.power_dfs_games?.sports_id
            ? item?.power_dfs_games?.sports_id
            : item?.power_dfs_games?.league === "MLB"
            ? 1
            : 2,
        })
      );
      const tempStorage = await teamData;

      if (!_.isEmpty(tempStorage)) {
        setSavedTeam([...tempStorage.players, ...tempStorage.teamD]);
      }
    }
    getData();
  }, [item]);

  return (
    <Modal visible={isVisible}>
      <div className={classes.__team_points_modal}>
        <div className={classes.__team_points_modal_main_content}>
          <div className={classes.__team_points_modal_close_icon}>
            <img
              src={CloseIcon}
              width="16"
              height="16"
              onClick={() => onClose()}
              style={{ cursor: "pointer" }}
              alt=""
            />
          </div>
          <div className={classes.__team_points_modal_main_title}>
            Team Points for Display name:{" "}
            <span>{item?.users?.display_name}</span>
          </div>
          <hr />
          <div className={classes.__team_points_modal_nav_links}>
            <ul>
              <li>
                <a
                  href="javascript:0"
                  className={activeTab == 1 && classes.active}
                  onClick={() => setActiveTab(1)}
                >
                  Manage My Team
                </a>
              </li>
              {/* <li>
                                <a
                                    href="javascript:0"
                                    className={activeTab == 2 && classes.active}
                                    onClick={() => setActiveTab(2)}
                                >
                                    Score Details
                                </a>
                            </li> */}
            </ul>
            <div className={classes.__team_points_modal_total_points_text}>
              Total Points: <span>999</span>
            </div>
          </div>
          <div className={classes.__team_points_modal_card_div}>
            <Card>
              {savedTeam &&
                savedTeam.length > 0 &&
                savedTeam.map((item, index) => {
                  return (
                    <>
                      {item.team_d_mlb_team ? (
                        <></>
                      ) : (
                        // <SportsLiveCardTeamD
                        // data={item}
                        // compressedView={compressedView}
                        // key={index + "" + item?.team_d_mlb_team?.type}
                        // dwall={dwallCounts}
                        // challenge={challengeCounts}
                        // useDwall={useDwall}
                        // useChallenge={useChallenge}
                        // dataMain={selectedTeam}
                        // setPowers={setPowers}
                        // />
                        <SportsSavedPlayerCard
                          data={item}
                          // compressedView={compressedView}
                          // key={index + ""}
                          // onChangeXp={onChangeXp}
                          // updateReduxState={updateReduxState}
                          // starPlayerCount={starPlayerCount}
                          // gameInfo={selectedTeam}
                          // useSwap={useSwap}
                          // swapCount={swapCounts}
                          // dataMain={selectedTeam}
                          // setPowers={setPowers}
                          // pointXpCount={{
                          //     xp1: pointBooster15x,
                          //     xp2: pointBooster2x,
                          //     xp3: pointBooster3x,
                          // }}
                        />
                        //  <SportsSavedPlayerCard
                        //     item={item}
                        //     key={index + ""}
                        // />
                      )}
                    </>
                  );
                })}
            </Card>
            {/* <Card>
                            {
                                dummyData.map((item, index) => {
                                    return (
                                        <>
                                            {console.log('data item ---> ', item)}
                                            <SportsTeamSelectionCard
                                                item={item}
                                                key={index + ""}
                                            />
                                        </>
                                    );
                                })
                            }
                        </Card> */}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TeamPointsModal;
