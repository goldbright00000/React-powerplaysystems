import React from 'react'
import PropTypes from 'prop-types'

import "./button.scss"

function Button(props) {
    const { title = '', icon = '', isRounded = false, styles = {}, iconOnly = false,
            onClick = () => { } } = props || {}
    return (
        <button className={`${!iconOnly && '__btn'} ${isRounded && '__btn __btn__rounded'} ${iconOnly && '__btn__icon_only'}`} onClick={onClick} style={styles}>
            {
                !iconOnly
                    ?
                    <div className="__btn__">
                        {icon}
                        {title}
                    </div>
                    :
                    icon &&
                    {...icon}
            }
        </button>
    )
}

Button.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.any,
    isRounded: PropTypes.bool,
    styles: PropTypes.any,
    iconOnly: PropTypes.bool,
    onClick: PropTypes.func
}

export default Button

