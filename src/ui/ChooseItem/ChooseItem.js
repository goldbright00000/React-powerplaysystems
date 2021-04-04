import React from 'react';
import styles from './styles.module.scss';

const ChooseItem = props => {
    const newProps = { ...props };
    const { title, helperText, selectedValue, value } = newProps;

    delete newProps.title;
    delete newProps.helperText;
    delete newProps.selectedValue;
    return (
        <label className={styles.root}>
            <span className={styles.title}>{title}</span>
            {helperText && <span className={styles.helperText}>{helperText}</span>}
            <input type='radio' {...newProps} checked={selectedValue == value} />
            <span className={styles.underLine}></span>
        </label>
    )
}

export default ChooseItem;