import React from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import DeleteIcon from "../../icons/Delete2";
import PowerIcon from "../../assets/power_balance_icon.png";

function SportsSidebarContent(props) {
  const {
    data = [],
    onDelete = () => {},
    starIcon = "",
    selectedPlayerCount = 0,
  } = props || {};

  const SideBarSection = ({
    title,
    value,
    playerId,
    isStarPlayer,
    SvgIcon,
    svgSize,
    onDelete,
    keyVal,
  }) => (
    <div className={classes.sidebar_body_section} key={playerId}>
      <span className={value ? classes.active : ""}>{title}</span>
      <div>
        {isStarPlayer && <img src={starIcon ? starIcon : PowerIcon} />}
        {SvgIcon && <SvgIcon size={svgSize} />}
        {value ? (
          <div className={classes.sidebar_body_value}>
            {value}{" "}
            <span onClick={() => onDelete(playerId)}>
              <DeleteIcon />
            </span>
          </div>
        ) : (
          <span>Not Selected</span>
        )}
      </div>
    </div>
  );

  return (
    <div className={classes.sidebar_body}>
      <p>
        {selectedPlayerCount}/{data?.length} Starting Players Selected
      </p>
      <div className={classes.sidebar_body_1}>
        {data?.length ? (
          data?.map((item, index) => (
            <SideBarSection
              title={item?.title}
              value={item?.value}
              playerId={item?.playerId}
              keyVal={item?.playerId}
              SvgIcon={item?.icon}
              onDelete={onDelete}
              key={index.toString()}
              isStarPlayer={item?.isStarPlayer}
            />
          ))
        ) : (
          <span>No data</span>
        )}
        <div className={classes.sidebar_arrow_container}>
          <span className={`${classes.arrow} ${classes.up}`} />
        </div>
      </div>
    </div>
  );
}

SportsSidebarContent.propTypes = {
  data: PropTypes.array,
  onDelete: PropTypes.func,
  starIcon: PropTypes.string,
  selectedPlayerCount: PropTypes.number,
};

export default SportsSidebarContent;
