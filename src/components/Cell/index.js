import React from 'react'
import PropTypes from 'prop-types'

import CellHigh from '../../icons/CellHigh'
import CellMedium from '../../icons/CellMedium'
import CellLow from '../../icons/CellLow'
import CellVeryLow from '../../icons/CellVeryLow'
import classes from './index.module.scss'

const Cell = props => {
    const {high = false, medium = false, low = false, veryLow = false, text = ''} = props || {}
    return (
        <div className={`${classes.cell_container} ${high && classes.cell_high} ${medium && classes.cell_medium} ${low && classes.cell_low} ${veryLow && classes.cell_low}`}>
            <span>
                {text}
            </span>
            {
                high &&
                    <CellHigh style={{height: 'auto'}} />
            }

            {
                medium &&
                    <CellMedium style={{height: 'auto'}} />
            }

            {
                low &&
                    <CellLow style={{height: 'auto'}} />
            }

            {
                veryLow &&
                    <CellVeryLow style={{height: 'auto'}} />
            }
            
        </div>
    )
}

Cell.propTypes = {
    high: PropTypes.bool,
    medium: PropTypes.bool,
    low: PropTypes.bool,
    veryLow: PropTypes.bool,
    text: PropTypes.string
}

export default Cell
