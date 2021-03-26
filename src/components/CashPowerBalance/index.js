import React from 'react';
import PropTypes from 'prop-types';

import classes from './cashPowerBalance.module.scss';
import PointsCollectedIcon from '../../assets/points-collected.png';
import PowerBalanceIcon from '../../assets/power_balance_icon.png';
import { setNumberComma } from '../../utility/shared';

const CashPowerBalance = (props) => {
    const { cashBalance = 0, powerBalance = 0, styles = {} } = props || {};
    return (
        <div className={classes.__sidebar_cash_power_balance} style={styles}>
            <div className={classes.__sidebar_cash_power_balance_wrapper}>
                <div className={classes.__sidebar_cash_balance_wrapper}>
                    <img src={PointsCollectedIcon} width="40" height="30" />
                    <div className={classes.__sidebar_text_wrapper}>
                        <div className={classes.__sidebar_cash_and_deposit_wrapper}>
                            <div>
                                <h1 className={classes.__sidebar_cash}>${cashBalance}</h1>
                            </div>
                            {
                                cashBalance == 0
                                &&
                                <div className={classes.__sidebar_deposit_wrapper}>
                                    <button>Deposit</button>
                                </div>
                            }
                        </div>
                        <span className={classes.__sidebar_cash_balance_title}>Cash Balance</span>
                    </div>
                </div>
            </div>
            <div className={classes.__sidebar_cash_power_balance_wrapper}>
                <div className={classes.__sidebar_cash_balance_wrapper}>
                    <img src={PowerBalanceIcon} width="40" height="40" />
                    <div className={classes.__sidebar_text_wrapper}>
                        <h1 className={classes.__sidebar_cash}>
                            {powerBalance && setNumberComma(powerBalance)}
                        </h1>
                        <span className={classes.__sidebar_cash_balance_title}>Power Balance</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

CashPowerBalance.propTypes = {
    cashBalance: PropTypes.number,
    powerBalance: PropTypes.number
}

export default CashPowerBalance;