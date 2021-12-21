import React, { useEffect, useState } from "react";
import classes from "./teamPointsModal.module.scss";
import Modal from "../../components/Modal";
import CloseIcon from "../../assets/close-white-icon.png";
import Card from "../../components/PowerpickCard";
import { getMlbLivePlayPlayerTeamData } from "../../actions/MLBActions";
import { useDispatch } from "react-redux";
import _ from "lodash";
import SportsSavedPlayerCard from "../../components/SportsSavedPlayerCard";
import { getSavedTeamPlayers } from "../../actions/NHLActions";

const TeamPointsModal = (props) => {
  const dispatch = useDispatch();
console.log("props==>",props);
  const { isVisible = false, onClose = () => {}, item = {} } = props || {};
  const [activeTab, setActiveTab] = useState(1);

  const [savedTeam, setSavedTeam] = useState([]);
  const [tempStorageData, setTempStorageData] = useState([]);

  useEffect(() => {
    async function getData() {
      let teamData;
      if (item._id) {
        teamData = await dispatch(
          getSavedTeamPlayers({
            user_id: item?._id?.userID,
            game_id: item?._id?.gameID,
            sport_id: item?.power_dfs_games?.sports_id
              ? item?.power_dfs_games?.sports_id
              : item?.power_dfs_games?.league === "MLB"
              ? 1
              : 2,
          })
        );
      } else {
        teamData = await dispatch(
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
      }
      const tempStorage = await teamData;
      if (_.isEmpty(tempStorageData)) {
        setTempStorageData(tempStorage);
      }
      console.log("tempStorage===>", !_.isEmpty(tempStorage));
      if (!_.isEmpty(tempStorage)) {
        setSavedTeam([tempStorage.players, tempStorage.teamD]);
      }
    }
    getData();
  }, [item]);
  console.log(" savedTeam.length > 0=>", item);

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
            Results of Display Name:{" "}
            <span>
              {item._id
                ? item?._id?.user_display_name
                : item?.users?.display_name}
            </span>
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
                  Team Manager
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
          <Card>
            <div className={classes.__team_points_modal_card_div}>
              {console.log("tempStorageData", tempStorageData)}
              {tempStorageData &&
                console.log(" savedTeam.length > 0=>", savedTeam)}
              <div className={classes.game__card__scroll}>
              <div className={`${classes.cardWrap} ${"row"}`}>
                {savedTeam &&
                  savedTeam.length > 0 &&
                  savedTeam.map((items, index) => {
                    return (
                      <>
                        {items.team_d_mlb_team ? (
                          <></>
                        ) : (
                          <>
                          {!item?._id?(
                            /* {item?.league?.name!=="NHL"? (
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
                        */
                        
                            <SportsSavedPlayerCard
                          data={items}
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
                            /* //  <SportsSavedPlayerCard
                        //     item={item}
                        //     key={index + ""}
                        // />
                        ):(  */
                          ):(
                            index===0 && 
                            <div className="col-md-3">
                              <div className={classes.game__card}>
                                <div className={classes.line__game__card}></div>
                               
                                <div className={classes.card__header}>
                                  <div className={classes.card__number}>{items[0]?.type}:</div>
                                  <div className={classes.card__pts}>
                                    14 Pts
                                  </div>
                                </div>
                                <div className={classes.card__main__box}>
                                  <div className={classes.card__main__idea}>
                                    <div className={classes.main__table__box}>
                                      <div className={classes.card__left}>
                                        <h6>Player</h6>
                                      </div>
                                      <div className={classes.card__right}>
                                        <h6>Points</h6>
                                      </div>
                                    </div>
                                   

                                    <div
                                      className={classes.main__table__header}
                                    >
                                      <div className={classes.left__side}>
                                       {items[0].full_name}
                                      </div>
                                      <div className={classes.right__side}>
                                       {items[0].grandTotal}
                                      </div>
                                    </div>
                                    

                                  </div>
                                </div>
                              </div>
                            </div>
                            )}
                            {/* )} */}
                          </>
                        )}
                      </>
                    );
                  })}
              </div>
              </div>
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
          </Card>
        </div>
      </div>
    </Modal>
  );
};

export default TeamPointsModal;
