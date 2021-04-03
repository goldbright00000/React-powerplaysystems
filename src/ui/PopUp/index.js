import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './styles.module.scss';
import './styles.scss';
import ReactDOM from 'react-dom';

const PopUpWrapper = ({ children, className, onClose }) => {
    const popupRef = useRef(null);
    useEffect(() => {
        if (!popupRef) return;
        const { offsetHeight, classList } = popupRef.current;
        offsetHeight < window.innerHeight && classList.add('popup-with-fixed');
    }, [])
    return (
        <>
            <div className={styles.root} ref={popupRef}>
                <div className='blur' onClick={onClose}></div>
                <div className={`${styles.popup} ${className} popup-wrapper`}>
                    {children}
                </div>
            </div>
        </>
    )
}

const PopUp = props => ReactDOM.createPortal(<PopUpWrapper {...props} />, document.getElementById('popup'))
export default PopUp;