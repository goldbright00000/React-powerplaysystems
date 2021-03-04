import React from 'react';
import PropTypes from 'prop-types';

import classes from './index.module.scss';

function SportsSidebarContent (props) {
    
    const { data = [] } = props || {};
    
    const SideBarSection = ({ title, value, SvgIcon, svgSize }) => (
        <div className={classes.sidebar_body_section}>
            <span className={value ? classes.active : ''}>{ title }</span>
            <div>
                { SvgIcon && <SvgIcon size={svgSize} /> } {value ? value : <span>Not Selected</span>}
            </div>
        </div>
    );

    return (
        <div className={classes.sidebar_body}>
            <p>1/8 Starting Players Selected</p>
            <div className={ classes.sidebar_body_1 }>
                {
                    data?.length ?
                        data?.map((item, index) => (<SideBarSection title={ item?.title } value={ item?.value } key={ index + "" } SvgIcon={ item?.icon } />))
                        :
                        <span>No data</span>
                }
                <div className={classes.sidebar_arrow_container}>
                    <span className={`${classes.arrow} ${classes.up}`} />
                </div>
            </div>
        </div>
    )
}

SportsSidebarContent.propTypes = {
    data: PropTypes.array,
}

export default SportsSidebarContent

