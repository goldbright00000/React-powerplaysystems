import React from 'react';
import ProptTypes from 'prop-types';

import './pageHeader.scss';
import PageHeaderCard from '../PageHeaderCard'

function PageHeader(props) {
    const { title = '', reward = 0 } = props || {}
    return (
        <div className='__page_header'>
            <div className='__page_header_leftside'>
                <h1>{title}</h1>
                <div className='__page_header_leftside_sub'>    
                    <p>
                        Win <span>${reward}</span> <small>CAD</small>
                    </p>
                    <button className={`__btn __page_header_btn`}>See Contest Rules</button>
                </div>
            </div>
            <div className='__page_header_rightside'>
                <PageHeaderCard />
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
