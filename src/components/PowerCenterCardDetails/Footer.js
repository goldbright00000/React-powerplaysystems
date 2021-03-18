import React from 'react';
import classes from './footer.module.scss';

const Footer = (props) => {
    const {onBack = () => {}, onNext = () => {}} = props || {};
    return (
        <div className={classes.__power_center_card_details_footer}>
            <div className={classes.__power_center_card_details_footer_back}>
                <div className={classes.__power_center_card_details_back_arrow}>
                    {"<"}
                </div>
                <div className={classes.__power_center_card_details_footer_back_text} onClick={onBack}>
                    Back
                </div>
            </div>
            <div className={classes.__power_center_card_details_enter}>
                <button>Enter  •  $5</button>
            </div>
            <div className={classes.__power_center_card_details_footer_next}>
                <div className={classes.__power_center_card_details_footer_next_text} onClick={onNext}>
                    Next
                </div>
                <div className={classes.__power_center_card_details_footer_forward_arrow}>
                    {">"}
                </div>
            </div>
        </div>
    );
};

export default Footer;