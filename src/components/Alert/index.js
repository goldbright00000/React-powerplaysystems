import React from 'react';

import "./alert.scss"

function Alert({success = false, primary = false, danger = false}) {
    return (
        <div className={`__alert_container ${success && '__alert_success'}  ${primary && '__alert_primary'}  ${danger && '__alert_danger'}`}>
            <p>You have only <strong>1</strong> of 5 Aces</p>
        </div>
    )
}

export default Alert
