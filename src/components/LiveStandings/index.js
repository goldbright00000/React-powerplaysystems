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
    winnings: 20000,
  },
  {
    id: 2,
    title: "winnername",
    winnings: 5000,
  },
  {
    id: 3,
    title: "dart_winner",
    winnings: 1000,
  },
  {
    id: 4,
    title: "saymyname",
    winnings: 40000,
  },
  {
    id: 5,
    title: "john_house",
    winnings: 500,
  },
  {
    id: 6,
    title: "john_house",
    winnings: 20000,
  },
  {
    id: 7,
    title: "winnername",
    winnings: 5000,
  },
  {
    id: 8,
    title: "dart_winner",
    winnings: 1000,
  },
  {
    id: 9,
    title: "saymyname",
    winnings: 40000,
  },
  {
    id: 10,
    title: "john_house",
    winnings: 500,
  },
];

function LiveStandings(props) {
  const [filteredData, setFilteredData] = useState(dummyData);

  const { visible = false, onClose = () => {} } = props || {};

  const onSearch = (e) => {
    const { value } = e?.target || {};
    if (!isEmpty(value)) {
      const result = dummyData?.filter((data) => {
        const [firstName, lastName] = `${data?.title}`.split(" ");
        if (firstName && lastName) {
          return firstName?.startsWith(value) || lastName?.startsWith(value);
        }

        return `${data?.title}`?.startsWith(value);
      });
      setFilteredData(result);
    } else {
      setFilteredData(dummyData);
    }
  };

  const Row = ({ index = 0, title = "", winings = 0, active = false }) => (
    <div className={`${classes.table_row} ${active && classes.active}`}>
      <span>{index}</span>
      <span>{title}</span>
      <span>${setNumberComma(winings)}</span>
      <span>
        <button className={classes.button_btn}>View Team</button>
      </span>
    </div>
  );

  return (
    <Modal visible={visible} onClose={onClose} iconStyle={{ display: "none" }}>
      <div className={classes.container}>
        <CloseIcon className={classes.svg} onClick={onClose} />
        <div className={classes.header}>
          <div>
            <p className={classes.header_p}>Live Standings</p>
            <span>Oct 24, 2020 | 8:00PM ET</span>
          </div>

          <div className={classes.header_right}>
            <p className={classes.header_p}>${setNumberComma(10000, 2)}</p>
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
              <span>Display name</span>
              <span>Currently Winning</span>
              <span>Action</span>
            </div>

            <div className={classes.table_content}>
              {filteredData &&
                filteredData?.map((item, ind) => (
                  <Row
                    index={ind + 1}
                    title={item?.title}
                    winings={item.winnings}
                    key={item?.id + "-"}
                  />
                ))}
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
