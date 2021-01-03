import React, { useState } from 'react';
import './BingoGameBall.scss';
import ShuffleIcon from '../../assets/ShuffleIcon.png';
import ReplaceAllIcon from '../../assets/ReplaceAllIcon.png';
import PowerMatchIcon from '../../assets/PowerMatchIcon.png';
import IncreaseIcon from '../../assets/IncreaseIcon.png';
import DecreaseIcon from '../../assets/DecreaseIcon.png';

const BingoGameBall = props => {
    const [isActive, setActive] = useState(props.active || false)
    return (
        <div className={`__BingoGameBall __relative ${isActive ? 'active' : ''}`} onClick={() => setActive(old => !old)}>
            <div className='__ball-number'>{props.children}</div>
            <div className='__absolute __ball-actions-wrapper __primary-color'>
                <div className='__triangle __absolute'></div>
                <div className='__flex __ball-actions'>
                    <img alt='' src={ShuffleIcon} />
                    <img src={ReplaceAllIcon} alt='' />
                    <img src={PowerMatchIcon} alt='' />
                    <img src={IncreaseIcon} alt='' />
                </div>
            </div>
        </div>
    )
}

export default BingoGameBall;