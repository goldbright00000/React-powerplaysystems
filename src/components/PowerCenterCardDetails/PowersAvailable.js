import React, { useState } from "react";
import classes from "./powersAvailable.module.scss";
import PointMultipliers from "../../assets/point-multipliers.png";
import PlayerSwaps from "../../assets/player-swaps.png";
import VideoReview from "../../assets/video-review.png";
import DWall from "../../assets/d-wall.png";
import LearnMoreModal from "./LearnMoreModal";
import { isSymbol } from "lodash";

const data = [
  {
    id: 1,
    icon: PointMultipliers,
    count: 3,
    value: "Point Booster",
  },
  {
    id: 2,
    icon: PlayerSwaps,
    count: 2,
    value: "Swap Player",
  },
  {
    id: 3,
    icon: VideoReview,
    count: 2,
    value: "Video Review",
  },
  {
    id: 4,
    icon: DWall,
    count: 2,
    value: "D-Wall",
  },
];

const PowersAvailable = (props) => {
  const { title = "", isMobile = false, learnMore = () => {} } = props || {};

  const [learnMoreModal, setLearnMoreModal] = useState(false);

  const onOpenModal = () => setLearnMoreModal(true);
  const onCloseModal = () => setLearnMoreModal(false);

  return (
    <div className={classes.__powers_available}>
      {isMobile ? (
        <>
          {/* {learnMoreModal && (
            <LearnMoreModal
              title={title}
              learnMoreModal={learnMoreModal}
              onCloseModal={onCloseModal}
            />
          )} */}
          <div className={classes.__my_game_center_card_powerdfs}>
            <p className={classes.__my_game_center_card_powerdfs_title}>
              <span
                className={classes.__my_game_center_card_powerdfs_title_first}
              >
                {title}
              </span>{" "}
              PowerdFS{" "}
              <span className={classes.__my_game_center_card_powerdfs_subtitle}>
                Available Powers
              </span>
            </p>
          </div>

          {(() => {
            const itemsInaRow = 3;
            const numberOfRows = Math.ceil(data.length / itemsInaRow);
            const myGameCenterCardAvailablePowerView = Array(numberOfRows)
              .fill(undefined)
              .map((item, i) => {
                const start = (i + 1) * itemsInaRow - 3;
                const end = (i + 1) * itemsInaRow;
                const items = data.slice(start, end);

                return (
                  <div className={classes.__powers_available_data}>
                    {items.map((item, index) => {
                      return (
                        <div>
                          <div
                            className={classes.__powers_available_data_icon_div}
                            onClick={learnMore}
                          >
                            <img
                              src={item.icon}
                              width="28"
                              height="28"
                              className={classes.__powers_available_data_icon}
                            />
                            <div
                              className={
                                classes.__powers_available_data_power_count
                              }
                            >
                              {item.count}
                            </div>
                          </div>
                          <div
                            className={
                              classes.__powers_available_data_value_div
                            }
                          >
                            <p
                              className={classes.__powers_available_data_value}
                            >
                              {item.value}
                            </p>
                          </div>
                          {data.length == index + 1 && (
                            <div
                              className={
                                classes.__powers_available_learn_more_div
                              }
                              onClick={() => onOpenModal()}
                            >
                              <p
                                className={
                                  classes.__powers_available_learn_more_text
                                }
                              >
                                Learn more
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              });
            return myGameCenterCardAvailablePowerView;
          })()}
        </>
      ) : (
        <>
          <div className={classes.__powers_available_title_and_learn_more_div}>
            <div className={classes.__powers_available_title_div}>
              <p className={classes.__powers_available_title}>
                Powers Available
              </p>
            </div>
            {learnMoreModal && (
              <LearnMoreModal
                title={title}
                learnMoreModal={learnMoreModal}
                onCloseModal={onCloseModal}
              />
            )}
          </div>

          {data.map((item, index) => {
            return (
              <div className={classes.__powers_available_data}>
                <div className={classes.__powers_available_data_icon_div}>
                  <img
                    src={item.icon}
                    width="36"
                    height="36"
                    className={classes.__powers_available_data_icon}
                  />
                  <div className={classes.__powers_available_data_power_count}>
                    {item.count}
                  </div>
                </div>
                <div className={classes.__powers_available_data_value_div}>
                  <p className={classes.__powers_available_data_value}>
                    {item.value}
                  </p>
                </div>
                {data.length == index + 1 && (
                  <div
                    className={classes.__powers_available_learn_more_div}
                    onClick={() => onOpenModal()}
                  >
                    <p className={classes.__powers_available_learn_more_text}>
                      Learn more
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default PowersAvailable;
