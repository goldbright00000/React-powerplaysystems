import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";

function AccountInfo(props) {
  const { isMobile = false } = props || {};
  const { user = {} } = props || {};
  useEffect(() => {
    console.log(user);
  }, []);
  const renderItem = (title, value, buttonTitle) => {
    const onButtonClick = () => {};
    return (
      <div className={classes.list_item}>
        <span>{title}</span>
        <span>
          <span>{value}</span>
          <button onClick={onButtonClick}>
            {buttonTitle ? buttonTitle : "Edit"}
          </button>
        </span>
      </div>
    );
  };
  return (
    <div className={classes.list_container}>
      {renderItem("Full Name", user.first_name + " " + user.last_name)}
      {renderItem("Display Name", user.display_name)}
      {renderItem("Email", user.email)}
      {renderItem("Date of Birth", user.date_of_birth)}
      {renderItem("Country", user.country)}
      {renderItem(
        isMobile ? "Province" : "Province/State/Territory",
        user.state_or_province
      )}
      {renderItem("Change Password", "", "Change")}
    </div>
  );
}

AccountInfo.propTypes = {
  isMobile: PropTypes.bool,
};

export default AccountInfo;
