import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";

function AccountInfo(props) {
  const { isMobile = false } = props || {};
  const { user = {} } = props || {};
  useEffect(() => {
    console.log(props);
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
      {renderItem("Full Name", user.firstName)}

      {renderItem("Display Name", "My Full Name")}

      {renderItem("Email", "abc@email.com")}
      {renderItem("Date of Birth", "January 1, 1990")}

      {renderItem("Country", "Pakistan")}

      {renderItem(
        isMobile ? "Province" : "Province/State/Territory",
        "Islamabad"
      )}

      {renderItem("Change Password", "", "Change")}
    </div>
  );
}

AccountInfo.propTypes = {
  isMobile: PropTypes.bool,
};

export default AccountInfo;
