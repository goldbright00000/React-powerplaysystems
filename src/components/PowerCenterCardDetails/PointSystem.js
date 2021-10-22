import React from "react";
import classes from "./pointSystem.module.scss";
import _ from "underscore";

const data = [
  {
    heading: "Skaters",
    points: [
      {
        title: "Goal",
        value: "10 Pts",
      },
      {
        title: "Short handed Goal",
        value: "12 Pts",
      },
      {
        title: "Assist",
        value: "5 Pts",
      },
      {
        title: "Short-handed Assist",
        value: "7 Pts",
      },
      {
        title: "Shot on Goal",
        value: "1 Pts",
      },
      {
        title: "Blocked Shot",
        value: "1 Pts",
      },
      {
        title: "Shootout Goal",
        value: "12 Pts",
      },
    ],
  },
  {
    heading: "Goalies",
    points: [
      {
        title: "Save",
        value: "1 Pts",
      },
    ],
  },
  {
    heading: "Hitters",
    points: [
      {
        title: "Single",
        value: "+ 3 Pts",
      },
      {
        title: "Double",
        value: "+ 5 Pts",
      },
      {
        title: "Tripple",
        value: "+ 8 Pts",
      },
      {
        title: "Home Run",
        value: "+ 10 Pts",
      },
      {
        title: "Run Batted in",
        value: "+ 2 Pts",
      },
      {
        title: "Run",
        value: "+ 2 Pts",
      },
      {
        title: "Base on Balls",
        value: "+ 2 Pts",
      },
      {
        title: "Hit by Pitch",
        value: "+ 2 Pts",
      },
      {
        title: "Stolen Base",
        value: "+ 5 Pts",
      },
    ],
  },
];

const PointSystem = (props) => {
  const { title = "", isMobile = false, PointsSystem = [] } = props || {};

  const groupedPoints = _.groupBy(PointsSystem, "type");
  let pointTypes = [];
  if (title === "NHL") {
    console.log("pointTypes", Object.keys(groupedPoints));
    if (Object.keys(groupedPoints).includes("Skater")) {
      pointTypes.push("Skater");
      if (groupedPoints["Skater"].length > 0) {
        groupedPoints["Skater"].map((item, index) => {
          if (item.plays === "Goal") {
            groupedPoints["Skater"].push(item);
            delete groupedPoints["Skater"][index];
          }
        });

        groupedPoints["Skater"].map((item, index) => {
          if (item.plays === "Primary Asst") {
            groupedPoints["Skater"].push(item);
            delete groupedPoints["Skater"][index];
          }
        });

        groupedPoints["Skater"].map((item, index) => {
          if (item.plays === "Secondary Asst") {
            groupedPoints["Skater"].push(item);
            delete groupedPoints["Skater"][index];
          }
        });

        groupedPoints["Skater"].map((item, index) => {
          if (item.plays === "Short-handed Goal") {
            groupedPoints["Skater"].push(item);
            delete groupedPoints["Skater"][index];
          }
        });

        groupedPoints["Skater"].map((item, index) => {
          if (item.plays === "OT Goal") {
            groupedPoints["Skater"].push(item);
            delete groupedPoints["Skater"][index];
          }
        });
      }
    }
    if (Object.keys(groupedPoints).includes("Goalie")) {
      pointTypes.push("Goalie");
    }
    if (Object.keys(groupedPoints).includes("Team-D")) {
      pointTypes.push("Team-D");
    }
  } else {
    pointTypes = Object.keys(groupedPoints);
  }

  return (
    <div className={`${classes.__point_system}`}>
      {isMobile ? (
        <>
          <div className={classes.__my_game_center_card_powerdfs}>
            <p className={`text-left`}>
              <span
                className={classes.__my_game_center_card_powerdfs_title_first}
                style={{ fontSize: "18px", color: "white" }}
              >
                {title}
              </span>
              <span
                className={classes.__my_game_center_card_powerdfs_title}
                style={{ fontSize: "18px" }}
              >
                {" "}
                PowerdFS{" "}
              </span>
              <span
                className={`${classes.__my_game_center_card_powerdfs_subtitle}`}
                style={{ fontSize: "14px" }}
              >
                Point System
              </span>
            </p>
          </div>

          {data.map((d, i) => {
            if (title !== "NLB" && d.heading === "Hitters") {
              return (
                <>
                  <div className={classes.__point_system_heading}>
                    {d.heading}
                  </div>
                  <div className={classes.__points_grid_data2}>
                    <div className={classes.__points_grid_data1}>
                      {d.points.map((item, index) => {
                        return (
                          <>
                            {index < d.points.length / 2 && (
                              <div className={classes.__point_system_data}>
                                <div
                                  className={`${classes.__point_system_data_title_div}`}
                                >
                                  <p
                                    className={`${classes.__point_system_data_title} mr-1`}
                                  >
                                    {item.title}
                                  </p>
                                </div>
                                <div
                                  className={`${classes.__point_system_data_value_div}`}
                                >
                                  <p
                                    className={`${classes.__point_system_data_value} ml-1`}
                                  >
                                    {item.value}
                                  </p>
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>

                    <div className={classes.__points_grid_data1}>
                      {d.points.map((item, index) => {
                        return (
                          <>
                            {index >= d.points.length / 2 && (
                              <div className={classes.__point_system_data}>
                                <div
                                  className={
                                    classes.__point_system_data_title_div
                                  }
                                >
                                  <p
                                    className={
                                      classes.__point_system_data_title
                                    }
                                  >
                                    {item.title}
                                  </p>
                                </div>
                                <div
                                  className={
                                    classes.__point_system_data_value_div
                                  }
                                >
                                  <p
                                    className={
                                      classes.__point_system_data_value
                                    }
                                  >
                                    {item.value}
                                  </p>
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>
                  </div>
                </>
              );
            } else if (title === "NLB" && d.heading !== "Hitters") {
              return (
                <>
                  <div className={classes.__point_system_heading}>
                    {d.heading}
                  </div>

                  <div className={classes.__points_grid_data2}>
                    <div className={classes.__points_grid_data1}>
                      {d.points.map((item, index) => {
                        return (
                          <>
                            {index < d.points.length / 2 && (
                              <div className={classes.__point_system_data}>
                                <div
                                  className={
                                    classes.__point_system_data_title_div
                                  }
                                >
                                  <p
                                    className={
                                      classes.__point_system_data_title
                                    }
                                  >
                                    {item.title}
                                  </p>
                                </div>
                                <div
                                  className={
                                    classes.__point_system_data_value_div
                                  }
                                >
                                  <p
                                    className={
                                      classes.__point_system_data_value
                                    }
                                  >
                                    {item.value}
                                  </p>
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>

                    <div className={classes.__points_grid_data1}>
                      {d.points.map((item, index) => {
                        return (
                          <>
                            {index >= d.points.length / 2 && (
                              <div className={classes.__point_system_data}>
                                <div
                                  className={
                                    classes.__point_system_data_title_div
                                  }
                                >
                                  <p
                                    className={
                                      classes.__point_system_data_title
                                    }
                                  >
                                    {item.title}
                                  </p>
                                </div>
                                <div
                                  className={
                                    classes.__point_system_data_value_div
                                  }
                                >
                                  <p
                                    className={
                                      classes.__point_system_data_value
                                    }
                                  >
                                    {item.value}
                                  </p>
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>
                  </div>
                </>
              );
            } else return;
          })}
        </>
      ) : (
        <>
          <p className={classes.__point_system_title}>Point System</p>
          {pointTypes.map((d, i) => {
            return (
              <>
                <div className={classes.__point_system_heading}>
                  {pointTypes[i]}
                </div>
                {groupedPoints[pointTypes[i]].map((item, index) => {
                  return (
                    <div className={classes.__point_system_data}>
                      <div className={classes.__point_system_data_title_div}>
                        <p className={classes.__point_system_data_title}>
                          {item?.plays}
                        </p>
                      </div>
                      <div className={classes.__point_system_data_value_div}>
                        <p className={classes.__point_system_data_value}>
                          {item?.action}
                          {item?.points} Pts
                        </p>
                      </div>
                    </div>
                  );
                })}
              </>
            );
          })}
        </>
      )}
    </div>
  );
};

export default PointSystem;
