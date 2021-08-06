import React from "react";
import classes from "./contest.module.scss";
import correctcopy from "../../assets/correct-copy-2.svg";
import ContestRulesPopUp from "../ContestRulesPopUp";
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

const ContestRules = (props) => {
  const { title = "", isMobile = false } = props || {};
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
    ];
    const d = new Date(props.game_set_start);
  return (
    <div className={classes.__contest_rules}>
      <p className={classes.__contest_rules_main_title}>Contest Rules</p>
      <ul>
          <li><span>${props.prize}</span> Prize Pool</li>
          <li>Live Play <span>Powers</span> included with entry fee</li>
          <li>Pick players from any teams scheduled to play on <span>{monthNames[d.getUTCMonth()]} {("0" + d.getUTCDate()).slice(-2)}, {d.getUTCFullYear()}</span></li>
      </ul>
      <ContestRulesPopUp
        points={[]}
        powers={[]}
        component={({ showPopUp }) => (
            <a
            onClick={showPopUp}
            href="#"
            >
                See Full Gameplay Rules
            </a>
        )}
        />
    </div>
  );
};

export default ContestRules;
