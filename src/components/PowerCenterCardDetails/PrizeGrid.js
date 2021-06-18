import React from "react";
import classes from "./prizeGrid.module.scss";

const PrizeGrid = (props) => {
  const { isMobile = false, title = "" } = props || {};

  const data = [
    {
      title: "1st",
      value: "$2,000.00",
    },
    {
      title: "2nd",
      value: "$750.00",
    },
    {
      title: "3rd",
      value: "$350.00",
    },
    {
      title: "4th",
      value: "$200.00",
    },
    {
      title: "5th",
      value: "$150.00",
    },
    {
      title: "6th - 7th",
      value: "$100.00",
    },
    {
      title: "8th - 10th",
      value: "$80.00",
    },
    {
      title: "11th - 15th",
      value: "$60.00",
    },
    {
      title: "16th - 20th",
      value: "$50.00",
    },
    {
      title: "21st - 30th",
      value: "$40.00",
    },
  ];

  return (
    <div className={classes.__prize_grid}>
      {isMobile ? (
        <>
          <div className={classes.__my_game_center_card_powerdfs}>
            <p className={classes.__my_game_center_card_powerdfs_title}>
              <span
                className={classes.__my_game_center_card_powerdfs_title_first}
              >
                {title}
              </span>{" "}
              PowerdFS{" "}
              <span className={classes.__prize_grid_title}>Prize Grid</span>
            </p>
          </div>

          <div className={classes.__prize_grid_data2}>
            <div
              className={classes.__prize_grid_data1}
              style={{ marginRight: "20px" }}
            >
              {data.map((item, index) => {
                return (
                  index < 5 && (
                    <div className={classes.__prize_grid_data}>
                      <div className={classes.__prize_grid_data_title_div}>
                        <p className={classes.__prize_grid_data_title}>
                          {item.title}
                        </p>
                      </div>
                      <div className={classes.__prize_grid_data_value_div}>
                        <p className={classes.__prize_grid_data_value}>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  )
                );
              })}
            </div>

            <div className={classes.__prize_grid_data1}>
              {data.map((item, index) => {
                return (
                  index >= 5 && (
                    <div className={classes.__prize_grid_data}>
                      <div className={classes.__prize_grid_data_title_div}>
                        <p className={classes.__prize_grid_data_title}>
                          {item.title}
                        </p>
                      </div>
                      <div className={classes.__prize_grid_data_value_div}>
                        <p className={classes.__prize_grid_data_value}>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <p className={classes.__prize_grid_title}>Prize Grid</p>
          {data.map((item, index) => {
            return (
              <div className={classes.__prize_grid_data}>
                <div className={classes.__prize_grid_data_title_div}>
                  <p className={classes.__prize_grid_data_title}>
                    {item.title}
                  </p>
                </div>
                <div className={classes.__prize_grid_data_value_div}>
                  <p className={classes.__prize_grid_data_value}>
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default PrizeGrid;
