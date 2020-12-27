import React from 'react';

import classes from "./alert.module.scss"

function Alert({success = false, primary = false, danger = false}) {
    return (
        <div className={`${classes.__alert_container} ${success && classes.__alert_success}  ${primary && classes.__alert_primary}  ${danger && classes.__alert_danger}`}>
            <p>You have only <strong>1</strong> of 5 Aces</p>
        </div>
    )
}

export default Alert
