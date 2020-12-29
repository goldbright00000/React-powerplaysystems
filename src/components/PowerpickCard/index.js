import React from 'react'
import PropTypes from 'prop-types'

import classes from './index.module.scss'

const PowerPickCard = props => {
    const { styles = {} } = props
    return (
        <div className={`${classes.card_wrapper} ${props?.shadow && classes.card_shadow}`} style={styles}>
            {props?.children}
        </div>
    )
}

PowerPickCard.propTypes = {
    shadow: PropTypes.bool,
    styles: PropTypes.object
}

export default PowerPickCard
