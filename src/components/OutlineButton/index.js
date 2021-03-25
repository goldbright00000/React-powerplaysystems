import React from 'react';
import classes from './outlineButton.module.scss';

const OutlineButton = (props) => {
    const {title = '', onClick = () => {}, styles = {}, icon = ''} = props || {};

    return (
        <button 
            className={classes.__outline_button} 
            onClick={onClick}
            style={styles}>
            {
                icon
                &&
                <span className={classes.__outline_button_icon}>
                    {icon}
                </span>
            }
            {title}
        </button>
    );
};

export default OutlineButton;