import React, { useState, useMemo } from 'react';
import styles from './styles.module.scss';
import CreatePopUpPortal from '../../utility/CreatePopUpPortal';
import ShieldIcon from '../../icons/ShieldIcon';
import ChallengePowerGreyIcon from '../../assets/challenge-power-grey.svg';
const DwallPopup = props => {
    const [showPopUp, setShowPopUp] = useState(false);
    const [popupMode, setPopupMode] = useState(0);
    const [timers, setTimers] = useState(0);
    return (
        <>
            {useMemo(() => props.component && props.component({ showPopUp: () => { setPopupMode(0);setShowPopUp(true); }}), [props])}
            {showPopUp && <CreatePopUpPortal>
                <div className={styles.popupWrapper}>
                    <div className={styles.blur} onClick={() => setShowPopUp(false)}></div>
                    <div className={styles.popupInnerDiv}>
                        <div className={`__title-6 modal-animation ${styles.popup}`}>
                            <>
                                <ShieldIcon size={100} />
                                <p>
                                    Use your <span className="orangeColor">D-Wall Power</span> to block any points against your Team D for this inning.
                                </p>
                                <div>
                                    <button className={styles.cancelButton} onClick={() => {
                                        setShowPopUp(false);
                                    }}>Cancel</button>
                                    <button className={styles.challengePlayButton} onClick={() => {
                                        if(props.dwall > 0)
                                        {
                                            props.useDwall(true);
                                        }
                                        else {
                                            alert("You cannot use this power");
                                        }
                                        setShowPopUp(false);
                                    }}>Activate D-Wall</button>
                                </div>
                            </>
                        </div>
                    </div>
                </div>   
            </CreatePopUpPortal>}
        </>
    );
};

export default DwallPopup;