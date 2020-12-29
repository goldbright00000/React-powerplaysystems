import React from 'react'
import PropTypes from 'prop-types'

import classes from './index.module.scss'

function ButtonDropdown(props) {
    const { elements = [], selected = '', onChange = () => { }, isActive = false } = props || {}
    return (
        <div className={`${classes.select_container} ${isActive && classes.selected}`}>
            <select value={selected} onChange={onChange}>
                {
                    elements.length &&
                    elements.map((itm, index) => <option
                        key={itm.title + index.toString()}
                        value={itm?.value}>{itm?.title}
                    </option>)
                }
            </select>
        </div>
    )
}

ButtonDropdown.propTypes = {
    elements: PropTypes.array,
    selected: PropTypes.string,
    isActive: PropTypes.bool,
    onChange: PropTypes.func
}

export default ButtonDropdown

