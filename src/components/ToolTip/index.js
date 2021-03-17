import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactToolTip from 'react-tooltip';

import classes from './index.module.scss';

function ToolTip(props) {
    const [visible, setVisibleState] = useState(false);
    return (
        <div className={classes.wrapper}
            onClick={() => setVisibleState(!visible)}
        >
            <div className={classes.children}>
                {props?.children}
            </div>
            {
                visible &&
                <div className={classes.tool_tip} onMouseLeave={() => setVisibleState(false)}>
                    {props?.toolTipContent || 'No Content'}
                </div>
            }
        </div>
    )
}

ToolTip.propTypes = {
    toolTipContent: PropTypes.any
}

export default ToolTip

