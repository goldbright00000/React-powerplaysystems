import React from 'react';

import classes from './card.module.scss'

function Card(props) {
    return (
        <div className={classes.__card}>
            {props.children}
        </div>
    )
}

export default Card

