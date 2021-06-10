import React from "react";
import classes from "./teamRoster.module.scss";

const data = [
  {
    heading: "The 8 roster positions:",
    teamRoster: [
      {
        count: 1,
        title: "P",
        value: "(Pitcher)",
      },
      {
        count: 1,
        title: "C",
        value: "(Catcher)",
      },
      {
        count: 1,
        title: "SS",
        value: "(Shortstop)",
      },
      {
        count: 2,
        title: "xB",
        value: "(1B, 2B or 3B)",
      },
      {
        count: 2,
        title: "OF",
        value: "(Outfielders)",
      },
      {
        count: 1,
        title: "Team Defense",
        value: "",
      },
    ],
  },
];

const TeamRoster = (props) => {
  const { title = "", isMobile = false } = props || {};

  return (
    <div className={classes.__team_roster}>
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
              <span className={classes.__my_game_center_card_powerdfs_subtitle}>
                Team Roster
              </span>
            </p>
          </div>

          {data.map((d, i) => {
            return (
              <>
                <div className={classes.__team_roster_heading}>{d.heading}</div>
                <div className={classes.__team_roster_data2}>
                  <div className={classes.__team_roster_data1}>
                    {d.teamRoster.map((item, index) => {
                      return (
                        d.teamRoster.length / 2 <= index && (
                          <div className={classes.__team_roster_data}>
                            <div
                              className={classes.__team_roster_data_count_div}
                            >
                              <p className={classes.__team_roster_data_count}>
                                {item.count}
                              </p>
                            </div>
                            <div
                              className={classes.__team_roster_data_title_div}
                            >
                              <p className={classes.__team_roster_data_title}>
                                {item.title}
                              </p>
                            </div>
                            <div
                              className={classes.__team_roster_data_value_div}
                            >
                              <p className={classes.__team_roster_data_value}>
                                {item.value}
                              </p>
                            </div>
                          </div>
                        )
                      );
                    })}
                  </div>

                  <div className={classes.__team_roster_data1}>
                    {d.teamRoster.map((item, index) => {
                      return (
                        d.teamRoster.length / 2 > index && (
                          <div className={classes.__team_roster_data}>
                            <div
                              className={classes.__team_roster_data_count_div}
                            >
                              <p className={classes.__team_roster_data_count}>
                                {item.count}
                              </p>
                            </div>
                            <div
                              className={classes.__team_roster_data_title_div}
                            >
                              <p className={classes.__team_roster_data_title}>
                                {item.title}
                              </p>
                            </div>
                            <div
                              className={classes.__team_roster_data_value_div}
                            >
                              <p className={classes.__team_roster_data_value}>
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
            );
          })}
        </>
      ) : (
        <>
          <p className={classes.__team_roster_main_title}>Team Roster</p>
          {data.map((d, i) => {
            return (
              <>
                <div className={classes.__team_roster_heading}>{d.heading}</div>
                {d.teamRoster.map((item, index) => {
                  return (
                    <div className={classes.__team_roster_data}>
                      <div className={classes.__team_roster_data_count_div}>
                        <p className={classes.__team_roster_data_count}>
                          {item.count}
                        </p>
                      </div>
                      <div className={classes.__team_roster_data_title_div}>
                        <p className={classes.__team_roster_data_title}>
                          {item.title}
                        </p>
                      </div>
                      <div className={classes.__team_roster_data_value_div}>
                        <p className={classes.__team_roster_data_value}>
                          {item.value}
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

export default TeamRoster;
