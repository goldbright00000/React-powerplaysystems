import React from 'react'
import PropTypes from 'prop-types'

import classes from './index.module.scss'

function Input(props) {
    const {
        type = 'text',
        onChange = (e) => { },
        label = '',
        placeholder = '',
        block = false,
        rounded = false,
        required = false,
    } = props || {}
    return (
        <div className={classes.input_container}>
            <label>{label}</label>
            <input
                type={type || 'text'}
                onChange={onChange}
                placeholder={placeholder}
                className={`${block && classes.block} ${rounded && classes.rounded}`}
                required={required}
            />
        </div>
    )
}

Input.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    block: PropTypes.bool,
    rounded: PropTypes.bool,
    required: PropTypes.bool
}

export default Input

