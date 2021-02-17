import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './BingoGameBall.scss';
import Replace from '../../icons/Replace'
import Plus from '../../icons/Plus'
import Minus from '../../icons/Minus'
import BoltIcon from '../../assets/bolt.png';
import IncreaseIcon from '../../assets/IncreaseIcon.png';
import DecreaseIcon from '../../assets/DecreaseIcon.png';

const BingoGameBall = props => {
    const { active = false, number = 0, keyVal = '' } = props || {};
    const [isActive, setActive] = useState(active || false);

    useEffect(() => {
        setActive(active);
    }, [active]);

    const toggleActiveState = () => {
        if (isActive) return;

        setActive(old => !old)
    }

    return (
        <div className={`__BingoGameBall __relative __flex __flex-center __h5 __mediam-on-mediam ${isActive ? 'active' : ''}`} key={keyVal}>
            <div className='__ball-number __flex __flex-center __absolute' onClick={toggleActiveState}>{number}</div>
            {
                !isActive &&
                <>
                    <div className={`__triangle __absolute __primary-color`}></div>
                    <div className={`__flex __ball-actions __absolute __primary-color`}>
                        <Replace size={45} style={{height: 'auto'}} onClick={() => { console.log('clicked: ', number) }} />
                        <img alt='' src={BoltIcon} onClick={() => { console.log('clicked: ', number) }} />
                        <Plus size={45} style={{ height: 'auto' }} onClick={() => { console.log('clicked: ', number) }} />
                        <Minus size={45} style={{height: 'auto'}} onClick={() => { console.log('clicked: ', number) }} />
                        {/* <img alt='' src={DecreaseIcon} onClick={() => { console.log('clicked: ', number) }} /> */}
                    </div>
                </>
            }
        </div>
    )
}

BingoGameBall.propTypes = {
    active: PropTypes.bool,
    number: PropTypes.any,
    keyVal: PropTypes.string
}

export default BingoGameBall;