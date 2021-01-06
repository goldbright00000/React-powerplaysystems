import React, { useState } from 'react';
import './BingoGameBall.scss';
import ShuffleIcon from '../../assets/ShuffleIcon.png';
import PowerMatchIcon from '../../assets/PowerMatchIcon.png';
import IncreaseIcon from '../../assets/IncreaseIcon.png';
import DecreaseIcon from '../../assets/DecreaseIcon.png';

const BingoGameBall = props => {
    const [isActive, setActive] = useState(props.active || false)
    return (
        <div className={`__BingoGameBall __relative __flex __flex-center __h5 __mediam-on-mediam ${isActive ? 'active' : ''}`} onClick={() => setActive(old => !old)}>
            <div className='__ball-number __flex __flex-center __absolute'>{props.children}</div>
            <div className='__triangle __absolute __primary-color'></div>
            <div className='__flex __ball-actions __absolute __primary-color'>
                <img alt='' src={ShuffleIcon} />
                <img src={PowerMatchIcon} alt='' />
                <img src={IncreaseIcon} alt='' />
                <img src={DecreaseIcon} alt='' />
            </div>
        </div>
    )
}

export default BingoGameBall;