import React from 'react';
import classes from './header.module.scss';

const Header = (props) => {
    const {title = ''} = props || {};
    return (
        <>
            <div className={classes.__power_center_card_details_header}>
                <span className={classes.__power_center_card_details_header_hr + ' ' + classes.__power_center_card_details_header_hr_left}></span>
                <p className={classes.__power_center_card_details_header_title}>
                    <span className={classes.__power_center_card_details_header_title_first}>{title}</span> PowerdFS
                </p>
                <span className={classes.__power_center_card_details_header_hr + ' ' + classes.__power_center_card_details_header_hr_right}></span>
            </div>
            <div className={classes.__power_center_card_details_header_date_time}>
                <p>03/05 9:00 PM EST</p>
            </div>
        </>
    );
};

export default Header;