import React from 'react'
import PropTypes from 'prop-types'

import classes from './index.module.scss'

const PowerPickCard = props => {
    return (
        <div className={`${classes.card_wrapper} ${props?.shadow && classes.card_shadow}`}>
            {props?.children}
        </div>
    )
}

PowerPickCard.propTypes = {
    shadow: PropTypes.bool
}

export default PowerPickCard
