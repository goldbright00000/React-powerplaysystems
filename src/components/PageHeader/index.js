import React from 'react';
import ProptTypes from 'prop-types';

import classes from './pageHeader.module.scss';
import PageHeaderCard from '../PageHeaderCard'

function PageHeader(props) {
    const { title = '', reward = 0, seconds = 12 } = props || {}
    return (
        <div className={classes.__page_header}>
            <div className={classes.__page_header_leftside}>
                <h1>{title}</h1>
                <div className={classes.__page_header_leftside_sub}>    
                    <p>
                        Win <span>${reward}</span> <small>CAD</small>
                    </p>
                    <button className={`__btn ${classes.__page_header_btn}`}>See Contest Rules</button>
                </div>
            </div>
            <div className={classes.__page_header_rightside}>
                <PageHeaderCard seconds={seconds} />
            </div>
        </div>
    )
}

PageHeader.propTypes = {
    title: ProptTypes.string.isRequired,
    reward: ProptTypes.number.isRequired,
    seconds: ProptTypes.number,
}

PageHeader.defaultProps = {
    title: 'Page title',
    reward: 2000
}

export default PageHeader
