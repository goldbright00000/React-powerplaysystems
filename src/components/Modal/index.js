import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import classes from './index.module.scss'

function Modal(props) {
    const { visible = false, style = {} } = props || {}

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [visible]);

    return (
        visible &&
        <div className={classes.wrapper} style={style}>
            {
                props?.children
            }
        </div>
    )
}

Modal.propTypes = {
    visible: PropTypes.bool,
    style: PropTypes.object
}

export default Modal

