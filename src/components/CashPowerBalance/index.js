import React from 'react';
import classes from './cashPowerBalance.module.scss';
import PointsCollectedIcon from '../../assets/points-collected.png';
import PowerBalanceIcon from '../../assets/power_balance_icon.png';

const CashPowerBalance = () => {
    return (
        <div className={classes.__sidebar_cash_power_balance}>
            <div className={classes.__sidebar_cash_power_balance_wrapper}>
                <div className={classes.__sidebar_cash_balance_wrapper}>
                    <img src={PointsCollectedIcon} width="40" height="30" />
                    <div className={classes.__sidebar_text_wrapper}>
                        <h1 className={classes.__sidebar_cash}>$36</h1>
                        <span className={classes.__sidebar_cash_balance_title}>Cash Balance</span>
                    </div>
                </div>
            </div>
            <div className={classes.__sidebar_cash_power_balance_wrapper}>
                <div className={classes.__sidebar_cash_balance_wrapper}>
                    <img src={PowerBalanceIcon} width="40" height="40" />
                    <div className={classes.__sidebar_text_wrapper}>
                        <h1 className={classes.__sidebar_cash}>15,000</h1>
                        <span className={classes.__sidebar_cash_balance_title}>Power Balance</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CashPowerBalance;