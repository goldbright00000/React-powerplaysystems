import React from 'react';

import classes from "./alert.module.scss"

function Alert({success = false, primary = false, danger = false, totalAce = 5, collectedAce = 0}) {
    return (
        <div className={`${classes.__alert_container} ${success && classes.__alert_success}  ${primary && classes.__alert_primary}  ${danger && classes.__alert_danger}`}>
            <p>You have only <strong>{collectedAce}</strong> of { totalAce } Aces</p>
        </div>
    )
}

export default Alert
