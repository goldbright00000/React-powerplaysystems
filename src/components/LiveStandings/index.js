import React, { useState } from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";

import classes from "./index.module.scss";
import Modal from "../Modal";
import { setNumberComma } from "../../utility/shared";
import SearchInput from "../SearchInput";
import CloseIcon from "../../icons/Close";

const dummyData = [
  {
    id: 1,
    title: "john house",
    points: 10,
    winnings: 20000,
  },
  {
    id: 2,
    title: "winnername",
    points: 10,
    winnings: 5000,
  },
  {
    id: 3,
    title: "dart_winner",
    points: 10,
    winnings: 1000,
  },
  {
    id: 4,
    title: "saymyname",
    points: 10,
    winnings: 40000,
  },
  {
    id: 5,
    title: "john_house",
    points: 10,
    winnings: 500,
  },
  {
    id: 6,
    title: "john_house",
    points: 10,
    winnings: 20000,
  },
  {
    id: 7,
    title: "winnername",
    points: 10,
    winnings: 5000,
  },
  {
    id: 8,
    title: "dart_winner",
    points: 10,
    winnings: 1000,
  },
  {
    id: 9,
    title: "saymyname",
    points: 10,
    winnings: 40000,
  },
  {
    id: 10,
    title: "john_house",
    points: 10,
    winnings: 500,
  },
];

function LiveStandings(props) {
  const { visible = false, onClose = () => {}, isMobile = false } = props || {};
  const getCurrentTime = () => {
    const dd = new Date();
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return (
      month[dd.getUTCMonth()] +
      " " +
      ("0" + dd.getUTCDate()).slice(-2) +
      ", " +
      dd.getUTCFullYear() +
      " | " +
      ("0" + dd.getUTCHours()).slice(-2) +
      ":" +
      ("0" + dd.getUTCMinutes()).slice(-2) +
      " ET"
    );
  };
  const [filteredData, setFilteredData] = useState(
    props?.liveStandingData || []
  );
  const [filteredString, setFilteredString] = useState("");

  const onSearch = (e) => {
    const { value } = e?.target || {};
    setFilteredString(value);
    if (!isEmpty(value)) {
      const result = props?.liveStandingData?.filter((data) => {
        const [firstName, lastName] = `${data?.team?.user?.display_name}`.split(
          " "
        );

        if (firstName && lastName) {
          return firstName?.startsWith(value) || lastName?.startsWith(value);
        }
        let aaa = data?.team?.user?.display_name;

        return aaa?.toLowerCase()?.startsWith(value);
      });
      setFilteredData(result);
    } else {
      setFilteredData([]);
    }
  };

  const Row = (item, ind) => (
    <div className={`${classes.table_row} ${ind == 0 && classes.active}`}>
      <span>{item?.ranking}</span>
      <span>{item?.team?.user?.display_name}</span>
      <span>{item?.score}</span>
      <span>${item?.winnings?.amount?setNumberComma(item?.winnings?.amount):0}</span>
      <span>
        {ind !== 0 && <button className={classes.button_btn}>{isMobile?"Team":"View Team"}</button>}
      </span>
    </div>
  );

  return (
    <Modal visible={visible} onClose={onClose} iconStyle={{ display: "none" }}>
      <div className={`${classes.container} ${
        isMobile ? classes.mobileContainer : ""
      }`}>
        <CloseIcon className={classes.svg} onClick={onClose} />
        <div className={classes.header}>
          <div className={classes.topHeadingLeft}>
            <p className={classes.header_p}>Live Standings</p>
            <span>{getCurrentTime()}</span>
          </div>

          <div className={classes.header_right}>
            <p className={classes.header_p}>
              ${setNumberComma(props.prizePool, 2)}
            </p>
            <span>Prize Pool</span>
          </div>
        </div>
        <div className={classes.divider} />

        <div className={classes.body}>
          <div className={classes.body_header}>
            <SearchInput
              placeholder="Search by Display name"
              onSearch={onSearch}
            />
          </div>

          <div className={classes.body_table}>
            <div className={classes.table_header}>
              <span>Place</span>
              <span>Name</span>
              <span>Points</span>
              <span>Winning</span>
              <span>Action</span>
            </div>

            <div className={classes.table_content}>
              {filteredData !== undefined && filteredString !== "" ? (
                filteredData?.length ? (
                  filteredData.map(Row)
                ) : (
                  <h2>No data found.</h2>
                )
              ) : props?.liveStandingData && props?.liveStandingData?.length ? (
                props?.liveStandingData.map(Row)
              ) : (
                <h2>No data found.</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

LiveStandings.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default LiveStandings;
