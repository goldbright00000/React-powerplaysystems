import React from 'react';
import classes from './outlineButton.module.scss';

const OutlineButton = (props) => {
    const {title = '', onClick = () => {}, styles = {}} = props || {};

    return (
        <button 
            className={classes.__outline_button} 
            onClick={onClick}>
            {title}
        </button>
    );
};

export default OutlineButton;