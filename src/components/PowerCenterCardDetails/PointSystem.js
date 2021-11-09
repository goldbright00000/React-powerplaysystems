import React from "react";
import classes from "./pointSystem.module.scss";
import _ from "underscore";

const PointSystem = (props) => {
  const { title = "", isMobile = false, PointsSystem = [] } = props || {};

  const dataList = [];
  for (var item in PointsSystem) {
    var object = {
      heading: item.charAt(0).toUpperCase() + item.slice(1),
      points: [],
    };
    for (var points in PointsSystem[item]) {
      var value =
        PointsSystem[item][points] <= 0
          ? `${PointsSystem[item][points]} Pts`
          : `+ ${PointsSystem[item][points]} Pts`;
      object.points.push({
        title: points.charAt(0).toUpperCase() + points.slice(1),
        value,
      });
    }
    dataList.push({ ...object });
  }

  return (
    <div className={`${classes.__point_system}`}>
      <>
        <p className={classes.__point_system_title}>Point System</p>

        {dataList.map((d, i) => {
          return (
            <>
              <div className={classes.__point_system_heading}>{d.heading}</div>
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
                              className={classes.__point_system_data_title_div}
                            >
                              <p className={classes.__point_system_data_title}>
                                {item.title}
                              </p>
                            </div>
                            <div
                              className={classes.__point_system_data_value_div}
                            >
                              <p className={classes.__point_system_data_value}>
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
        })}
      </>
    </div>
  );
};

export default PointSystem;
