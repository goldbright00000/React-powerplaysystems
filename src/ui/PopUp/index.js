import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import './styles.scss';
import ReactDOM from 'react-dom';

const PopUpWrapper = ({ children, className, onClose }) => {
    const popupRef = useRef(null);
    useEffect(() => {
        if (!popupRef) return;
        const { offsetHeight, classList } = popupRef.current;
        console.log(offsetHeight < window.innerHeight)
        classList.add(offsetHeight < window.innerHeight ? 'popup-with-fixed' : 'popup-with-absolute');
    }, [])
    return (
        <>
            <div className={styles.root} ref={popupRef}>
                <div className={styles.blur} onClick={onClose}></div>
                <div className={`${styles.popup} ${className} popup-wrapper`}>
                    <div className={styles.crossicon} onClick={onClose}><span></span></div>
                    {children}
                </div>
            </div>
        </>
    )
}

const PopUp = props => {
    const [showPopUp, setShowPopUp] = useState(false)
    return (
        <>
            {props.component && props.component({ showPopUp: () => setShowPopUp(true) })}
            {showPopUp && ReactDOM.createPortal(<PopUpWrapper {...props} onClose={() => setShowPopUp(false)} />, document.getElementById('popup'))}
        </>
    )
}
export default PopUp;