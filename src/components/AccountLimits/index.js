import React from 'react';
import classes from './index.module.scss';

const AccountLimits = (props) => {
    const renderLimitsAndAlerts = (info, alertFieldLabel, limitFieldLabel) => {
        return (
            <div className={classes.__deposit_limits_and_alerts_content}>
                <div className={classes.__info}>
                    {info}
                </div>
                <div className={classes.__input_field}>
                    <div>
                        <div>
                            {alertFieldLabel}
                        </div>
                        <input type="number" className={classes.__input} placeholder="No Limit" />
                    </div>
                </div>
                <div className={classes.__input_field}>
                    <div>
                        <div>
                            {limitFieldLabel}
                        </div>
                        <input type="number" className={classes.__input} placeholder="No Limit" />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={classes.__account_limits}>
            <div className={classes.__main_description}>
                <p>
                    Setting a personal user limit is a tool that can assist in managing your play in a healthy and responsible way. You can change your limits at any time but there'll be a 90 day restriction before you can increase your limit afterwards. 
                </p>
                <p>
                    Below you have the option to limit yourself in a variety of ways to make sure that you are spending your time on PowerPlay appropriately.
                </p>
            </div>
            <div className={classes.__main_title}>
                Deposit Limits and Alerts
            </div>
            {renderLimitsAndAlerts(
                [<span>Deposit alerts</span> ,' will trigger an email if the set threshold is exceeded. Alerts will not restrict future deposits that exceed the threshold.'],
                'Set Daily Alert',
                'Set Daily Limit'
            )}
            {renderLimitsAndAlerts(
                [<span>Deposit alerts</span> ,' Deposit limits will restrict the amount available for deposit over a given time period. Once a limit has been set, it cannot be changed for 90 calendar days.'],
                'Set Weekly Alert',
                'Set Weekly Limit'
            )}
            {renderLimitsAndAlerts(
                'Limitations will take effect at 12:01 AM on the following day.',
                'Set Monthly Alert',
                'Set Monthly Limit'
            )}
            <div className={classes.__apply_btn_div}>
                <button>Apply</button>
            </div>
            <div className={classes.__main_title}>
                Entry Fee Limit
            </div>
            <div className={classes.__entry_fee_limit}>
                <div className={classes.__info}>
                    Setting an entry fee limit prevents you from joining a contest that has an entry fee exceeding the limit you establish. Once you have set an limit you will be restricted from increasing your limit for 90 calendar days.
                </div>
                <div className={classes.__input_field}>
                    <div>
                        <div>
                            Entry Fee Limit
                        </div>
                        <input type="number" className={classes.__input} placeholder="No Limit" />
                    </div>
                </div>
            </div>
            <div className={classes.__apply_btn_div}>
                <button>Apply</button>
            </div>
        </div>
    );
};

export default AccountLimits;