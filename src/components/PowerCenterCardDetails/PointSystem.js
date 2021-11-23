import React from "react";
import classes from "./pointSystem.module.scss";
import _ from "underscore";

const PointSystem = (props) => {
  const { title = "", isMobile = false, PointsSystem = [] } = props || {};

  const groupedPoints = _.groupBy(PointsSystem, 'type');
  const typeOne = Object.keys(groupedPoints);

  return (
    <div className={`${classes.__point_system}`}>
      <>
        <p className={classes.__point_system_title}>Point System</p>
        {typeOne.map((d, i) => {
          return (
            <>
            <div className={classes.__point_system_heading}>{d}</div>
              <div className={classes.__points_grid_data2}>
                <div className={classes.__points_grid_data1}>
                {groupedPoints[d]?.map((item, index) => {
                    return (
                      <>
                          <div className={classes.__point_system_data}>
                            <div
                              className={`${classes.__point_system_data_title_div}`}
                            >
                              <p
                                className={`${classes.__point_system_data_title} mr-1`}
                              >
                                {item?.plays}
                              </p>
                            </div>
                            <div
                              className={`${classes.__point_system_data_value_div}`}
                            >
                              <p
                                className={`${classes.__point_system_data_value} ml-1`}
                              >
                                {item?.action} {item?.points} Pts
                              </p>
                            </div>
                          </div>
                      </>
                    );
                  })}
                </div>

                {/* <div className={classes.__points_grid_data1}>
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
                </div> */}
              </div>
            </>
           );
        })} 
      </>
    </div>
  );
};

export default PointSystem;
