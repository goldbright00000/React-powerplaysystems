import React from 'react'
import PropTypes from 'prop-types'

import "./sidebarButton.scss"

function SidebarButton(props) {
    const { icon = '', title = '', toolText = '', success = false, primary = false } = props || {}
    return (
        <button className="__sidebar_btn__container">
            <span className={`__sidebar_span_toolText ${success && '__sidebar_span_toolText_success'} ${primary && '__sidebar_span_toolText_primary'}`}>{toolText}</span>
            <div className="__sidebar_btn__icon">
                {icon}
            </div>
            <span className="__sidebar_btn_text">{ title }</span>
        </button>
    )
}

SidebarButton.propTypes = {
    icon: PropTypes.any,
    title: PropTypes.string,
    toolText: PropTypes.string,
    success: PropTypes.bool,
    primary: PropTypes.bool
}

export default SidebarButton

