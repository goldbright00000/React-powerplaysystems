import React from 'react';
import classes from './index.module.scss';

const MyAccountMenu = (props) => {
    const { value = '', options = [{}], onClick = () => { }, visible = false } = props || {};

    return (
        <div className={classes.__my_account_menu}>
            {
                visible
                &&
                <div className={classes.__list}>
                    {
                        options.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={
                                        `${classes.__list_item}
                                         ${item.value === value && classes.__list_item_selected}
                                         ${index == 0 && classes.__list_item_border_radius_top}
                                         ${options.length - 1 == index && classes.__list_item_border_radius_bottom}
                                        `}
                                    onClick={() => {
                                        onClick(item.value);
                                    }}>
                                    {item.label}
                                </div>
                            );
                        })
                    }
                </div>
            }
        </div>
    );
};

export default MyAccountMenu;