import React from 'react';
import classes from './index.module.scss';

const FilledArrows = (props) => {
    const {up = false, down = false } = props || {};
    return <i className={`${up && classes.__filled_up_arrow} ${down && classes.__filled_down_arrow}`}></i>;
};

export default FilledArrows;