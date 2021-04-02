import React from "react";
import PropTypes from "prop-types";

import classes from "./cashPowerBalance.module.scss";
import PointsCollectedIcon from "../../assets/points-collected.png";
import PowerBalanceIcon from "../../assets/power_balance_icon.png";
import { setNumberComma } from "../../utility/shared";

const CashPowerBalance = (props) => {
  const {
    cashBalance = 0,
    powerBalance = 0,
    showIcons = true,
    cashTitle = "",
    powerTitle = "",
    centered = false,
    styles = {},
    onDepositClick = () => { },
  } = props || {};
  return (
    <div className={classes.__sidebar_cash_power_balance} style={styles}>
      <div className={classes.__sidebar_cash_power_balance_wrapper}>
        <div className={classes.__sidebar_cash_balance_wrapper}>
          {showIcons && (
            <img src={PointsCollectedIcon} width="40" height="30" />
          )}
          <div
            className={`${classes.__sidebar_text_wrapper} ${
              centered && classes.__centered
            }`}
          >
            <div className={classes.__sidebar_cash_and_deposit_wrapper}>
              <div>
                <h1 className={classes.__sidebar_cash}>
                  ${setNumberComma(cashBalance)}
                </h1>
              </div>
              {cashBalance == 0 && (
                <div className={classes.__sidebar_deposit_wrapper}>
                  <button onClick={onDepositClick}>Deposit</button>
                </div>
              )}
            </div>
            <span className={classes.__sidebar_cash_balance_title}>
              {cashTitle || "Cash Balance"}
            </span>
          </div>
        </div>
      </div>
      <div className={classes.__sidebar_cash_power_balance_wrapper}>
        <div className={classes.__sidebar_cash_balance_wrapper}>
          {showIcons && <img src={PowerBalanceIcon} width="40" height="40" />}
          <div
            className={`${classes.__sidebar_text_wrapper} ${
              centered && classes.__centered
            }`}
          >
            <h1 className={classes.__sidebar_cash}>
              {powerBalance && setNumberComma(powerBalance)}
            </h1>
            <span className={classes.__sidebar_cash_balance_title}>
              {powerTitle || "Power Balance"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

CashPowerBalance.propTypes = {
  cashBalance: PropTypes.number,
  powerBalance: PropTypes.number,
  showIcons: PropTypes.bool,
  styles: PropTypes.any,
  cashTitle: PropTypes.string,
  powerTitle: PropTypes.string,
  centered: PropTypes.bool,
};

export default CashPowerBalance;
