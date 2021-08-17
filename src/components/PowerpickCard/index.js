import React from 'react'
import PropTypes from 'prop-types'

import classes from './index.module.scss'

const PowerPickCard = props => {
    const { styles = {} } = props
    return (
        <div className={`${classes.card_wrapper} ${props?.shadow && classes.card_shadow} ${props?.className}`} style={styles}>
            {props.ranks ? (<div className={classes.myScoreDiv}>My Score: <span>{props.ranks.score}</span></div>) : ("") 
            }
            {props?.children}
        </div>
    )
}

PowerPickCard.propTypes = {
    shadow: PropTypes.bool,
    styles: PropTypes.object,
    className: PropTypes.any,
}

export default PowerPickCard
