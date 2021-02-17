import React from 'react';
import ProptTypes from 'prop-types';

import classes from './pageHeader.module.scss';
import PageHeaderCard from '../PageHeaderCard'

function PageHeader(props) {
    const { title = '', reward = 0 } = props || {}
    return (
        <div className={classes.__page_header}>
            <div className={classes.__page_header_leftside}>
                <h1>{title}</h1>
                <div className={classes.__page_header_leftside_sub}>    
                    <p>
                        Win <span>${reward}</span> <small>CAD</small>
                    </p>
                    {
                        title == "Chase The Ace"
                        ?
                        <button className={classes.__page_header_btn_new}>See Contest Rules</button>
                        :
                        <button className={`__btn ${classes.__page_header_btn}`}>See Contest Rules</button>
                    }
                </div>
            </div>
            <div className={classes.__page_header_rightside}>
                <PageHeaderCard title="Chase The Ace" />
            </div>
        </div>
    )
}

PageHeader.propTypes = {
    title: ProptTypes.string.isRequired,
    reward: ProptTypes.number.isRequired,
}

PageHeader.defaultProps = {
    title: 'Page title',
    reward: 2000
}

export default PageHeader
