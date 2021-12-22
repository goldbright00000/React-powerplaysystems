import React,{useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import classes from "./pointSystem.module.scss";
import _ from "underscore";

const PointSystem = (props) => {
  const history = useHistory();
  const { title = "", isMobile = false, PointsSystem = [] } = props || {};
  const groupedPoints = _.groupBy(PointsSystem, 'type');
  const typeOne = Object.keys(groupedPoints);

  return (
    <div className={`${classes.__point_system}`}>
      <>
      {console.log("hhhhh",history.location.pathname)}
        <p className={classes.__point_system_title}>Point System</p>
        {history.location.pathname === "/power-center" ? 
        typeOne.map((d, i) => {
          return (
            <>
              <div className={classes.__point_system_heading}>{d}</div>
              <div className={classes.__points_grid_data2}>
                <div className={classes.__points_grid_data1}>
                  {groupedPoints[d].map(function (item, index) {
                    return (
                      <>
                        <div className={classes.__point_system_data}>
                          <div
                            className={`${classes.__point_system_data_title_div}`}
                          >
                            <p
                              className={`${classes.__point_system_data_title} mr-1`}
                            >
                              {item.plays}
                            </p>
                          </div>
                          <div
                            className={`${classes.__point_system_data_value_div}`}
                          >
                            <p
                              className={`${classes.__point_system_data_value} ml-1`}
                            >
                              {item.action + item.points}
                            </p>
                          </div>
                        </div>
                      </>
                    );
                  })}
                  
                  {/* {Object.entries(PointsSystem[d]).forEach((item, value) => {
                    return (
                      <>
                          <div className={classes.__point_system_data}>
                            <div
                              className={`${classes.__point_system_data_title_div}`}
                            >
                              <p
                                className={`${classes.__point_system_data_title} mr-1`}
                              >
                                {item[0]}
                              </p>
                            </div>
                            <div
                              className={`${classes.__point_system_data_value_div}`}
                            >
                              <p
                                className={`${classes.__point_system_data_value} ml-1`}
                              >
                                {item[1]}
                              </p>
                            </div>
                          </div>
                      </>
                    );
                  })} */}
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
        })
      :
      <>
       {/* skater */}
       <div  className={`${classes.__point_system_heading} ${classes.__point_game_handling}`}>
         {Object.keys(PointsSystem)[0]}
          <div className={classes.__points_grid_data2}>
              <div className={classes.__points_grid_data1}>
                <div className={classes.__point_system_data}>
                          <div
                            className={`${classes.__point_system_data_title_div}`}
                          >
                            <p
                              className={`${classes.__point_system_data_title} mr-1`}
                            >
                              {Object.keys(PointsSystem.skater)[1]}
                            </p>
                          </div>
                          <div
                            className={`${classes.__point_system_data_value_div}`}
                          >
                            <p
                              className={`${classes.__point_system_data_value} ml-1`}
                            >
                              
                              {PointsSystem.skater.shots}
                            </p>
                          </div>
                          </div>
                          <div className={classes.__point_system_data}>
                          <div
                            className={`${classes.__point_system_data_title_div}`}
                          >
                            <p
                              className={`${classes.__point_system_data_title} mr-1`}
                            >
                              {Object.keys(PointsSystem.skater)[4]}
                            </p>
                          </div>
                          <div
                            className={`${classes.__point_system_data_value_div}`}
                          >
                            <p
                              className={`${classes.__point_system_data_value} ml-1`}
                            >
                              
                              {PointsSystem.skater.OTGoal}
                            </p>
                          </div>
                        </div>
                        <div className={classes.__point_system_data}>
                          <div
                            className={`${classes.__point_system_data_title_div}`}
                          >
                            <p
                              className={`${classes.__point_system_data_title} mr-1`}
                            >
                              {Object.keys(PointsSystem.skater)[0]}
                            </p>
                          </div>
                          <div
                            className={`${classes.__point_system_data_value_div}`}
                          >
                            <p
                              className={`${classes.__point_system_data_value} ml-1`}
                            >
                              {PointsSystem.skater.goal}
                            </p>
                          </div>
                        </div>
                        <div className={classes.__point_system_data}>
                          <div
                            className={`${classes.__point_system_data_title_div}`}
                          >
                            <p
                              className={`${classes.__point_system_data_title} mr-1`}
                            >
                              {Object.keys(PointsSystem.skater)[3]}
                            </p>
                          </div>
                          <div
                            className={`${classes.__point_system_data_value_div}`}
                          >
                            <p
                              className={`${classes.__point_system_data_value} ml-1`}
                            >
                              {PointsSystem.skater.assists}
                            </p>
                          </div>
                      </div>
                </div>
          </div>
        </div>

        {/* goalie  */}
        <div className={`${classes.__point_system_heading} ${classes.__point_game_handling}`}>
          {Object.keys(PointsSystem)[1]}
          <div className={classes.__points_grid_data2}>
              <div className={classes.__points_grid_data1}>
                <div className={classes.__point_system_data}>
                          <div
                            className={`${classes.__point_system_data_title_div}`}
                          >
                            <p
                              className={`${classes.__point_system_data_title} mr-1`}
                            >
                              {Object.keys(PointsSystem.goalie)[0]}
                            </p>
                          </div>
                          <div
                            className={`${classes.__point_system_data_value_div}`}
                          >
                            <p
                              className={`${classes.__point_system_data_value} ml-1`}
                            >
                             {PointsSystem.goalie.goalsAgainst}
                            </p>
                          </div>
                          </div>
                          <div className={classes.__point_system_data}>
                          <div
                            className={`${classes.__point_system_data_title_div}`}
                          >
                            <p
                              className={`${classes.__point_system_data_title} mr-1`}
                            >
                              {Object.keys(PointsSystem.goalie)[1]}
                            </p>
                          </div>
                          <div
                            className={`${classes.__point_system_data_value_div}`}
                          >
                            <p
                              className={`${classes.__point_system_data_value} ml-1`}
                            >
                              {PointsSystem.goalie.save}
                            </p>
                          </div>
                        </div>
                </div>
          </div>
        </div>
        {/* Team -D  */}
        <div  className={`${classes.__point_system_heading} ${classes.__point_game_handling}`}>
          {Object.keys(PointsSystem)[2].split(/(?=.{1}$)/).join(' ')}
          <div className={classes.__points_grid_data2}>
              <div className={classes.__points_grid_data1}>
                <div className={classes.__point_system_data}>
                          <div
                            className={`${classes.__point_system_data_title_div}`}
                          >
                            <p
                              className={`${classes.__point_system_data_title} mr-1`}
                            >
                              {Object.keys(PointsSystem.teamD)[1]}
                            </p>
                          </div>
                          <div
                            className={`${classes.__point_system_data_value_div}`}
                          >
                            <p
                              className={`${classes.__point_system_data_value} ml-1`}
                            >
                              {PointsSystem.teamD.shotsAgainst}
                            </p>
                          </div>
                          </div>
                          <div className={classes.__point_system_data}>
                          <div
                            className={`${classes.__point_system_data_title_div}`}
                          >
                            <p
                              className={`${classes.__point_system_data_title} mr-1`}
                            >
                              {Object.keys(PointsSystem.teamD)[0]}
                            </p>
                          </div>
                          <div
                            className={`${classes.__point_system_data_value_div}`}
                          >
                            <p
                              className={`${classes.__point_system_data_value} ml-1`}
                            >
                              {PointsSystem.teamD.goalsAgainst}
                            </p>
                          </div>
                        </div>
                </div>
          </div>
        </div>
       </>
      }
      </>
    </div>
  );
};

export default PointSystem;
