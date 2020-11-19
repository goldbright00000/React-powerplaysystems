import React, { useState } from 'react';
import Calender from '../../icons/Calender';
import Clock from '../../icons/Clock';
import Crown from '../../icons/Crown';
import './Contest.scss'

const Contest = ({ player1, player2 }) => {
    const [isFirstPointerChecked, setIsFirstPointerChecked] = useState(false);
    const [isFirstScoreChecked, setIsFirstScoreChecked] = useState(false);
    const [isSecPointerChecked, setIsSecPointerChecked] = useState(false);
    const [isSecScoreChecked, setIsSecScoreChecked] = useState(false);
    const [isOverChecked, setIsOverChecked] = useState(false);
    const [isUnderChecked, setIsUnderChecked] = useState(false);

    const onFirstPlayerPontChange = e => setIsFirstPointerChecked(e.target.checked);
    const onFirstScoreChange = e => setIsFirstScoreChecked(e.target.checked);
    const onSecPlayerPontChange = e => setIsSecPointerChecked(e.target.checked);
    const onSecScoreChange = e => setIsSecScoreChecked(e.target.checked);
    const onOverChange = e => setIsOverChecked(e.target.value);
    const onUnderChange = e => setIsUnderChecked(e.target.value);

    const placeTheBet = isFirstPointerChecked || isFirstScoreChecked || isSecPointerChecked || isSecScoreChecked;

    return (
        <div className='__contest __flex
        <div>$999,999</div>
        <div>To Return <span >$999,999</span></div>'>
            <div className={`__main ${placeTheBet ? '__active' : ''}`}>
                <div className='__flex'>

                    <div className={`__board ${isFirstPointerChecked || isFirstScoreChecked ? '__active' : ''}`}>
                        <div className='__mediam __bold __title __inline-block'>{player1.name}</div>
                        <label className='__flex __mt-1 __mb-s'>
                            <input type='checkbox' className='__checkbox __mr-1' checked={isFirstPointerChecked} onChange={onFirstPlayerPontChange} />
                            <div className='__keyname'>Point Spread</div>
                            <div>{player1.pointerSpeed}</div>
                        </label>
                        <label className='__flex'>
                            <input type='checkbox' className='__checkbox __mr-1' checked={isFirstScoreChecked} onChange={onFirstScoreChange} />
                            <div className='__keyname'>Money Line</div>
                            <div>{player1.moneyLine}</div>
                        </label>
                        <div className='__wagar-badge-wrapper'>
                            <div className='__wagar __flex __sb __mt-2 __mb-s'>Wagar <div>{player1.wagar}</div> </div>
                            <div className='__return __ml-1'>To Return {player1.return}</div>
                        </div>
                    </div>

                    <div className='__h3 __vs __m-a'>VS</div>

                    <div className={`__board ${isSecPointerChecked || isSecScoreChecked ? '__active' : ''}`}>
                        <div className='__mediam __bold __title __inline-block'>{player2.name}</div>
                        <label className='__flex __mt-1 __mb-s'>
                            <input type='checkbox' className='__checkbox __mr-1' checked={isSecPointerChecked} onChange={onSecPlayerPontChange} />
                            <div className='__keyname'>Point Spread</div>
                            <div>{player2.pointerSpeed}</div>
                        </label>
                        <label className='__flex'>
                            <input type='checkbox' className='__checkbox __mr-1' checked={isSecScoreChecked} onChange={onSecScoreChange} />
                            <div className='__keyname'>Money Line</div>
                            <div>{player2.moneyLine}</div>
                        </label>
                        <div className='__wagar-badge-wrapper'>
                            <div className='__wagar __flex __sb __mt-2 __mb-s'>Wagar <div>{player2.wagar}</div> </div>
                            <div className='__return __ml-1'>To Return {player2.return}</div>
                        </div>
                    </div>

                    <div className='__border'></div>

                    <div className={`__board __mr-1 ${isOverChecked || isUnderChecked ? '__active' : ''}`}>
                        <div className='__mediam __bold __title __inline-block'>Score Total</div>
                        <label className='__flex __mt-1 __mb-s'>
                            <input type='checkbox' className='__checkbox __mr-1' checked={isOverChecked} onChange={onOverChange} />
                            <div className='__keyname'>Point Spread</div>
                            <div>{player1.pointerSpeed}</div>
                        </label>
                        <label className='__flex'>
                            <input type='checkbox' className='__checkbox __mr-1' checked={isUnderChecked} onChange={onUnderChange} />
                            <div className='__keyname'>Money Line</div>
                            <div>{player1.moneyLine}</div>
                        </label>
                        <div className='__wagar-badge-wrapper'>
                            <div className='__wagar __flex __sb __mt-2 __mb-s'>Wagar <div>{player1.wagar}</div> </div>
                            <div className='__return __ml-1'>To Return {player1.return}</div>
                        </div>
                    </div>

                </div>
                <div className='__flex __flex-center __contest-footer __ml-4 __mr-4'>
                    <div className='__flex'><Clock className='__mr-s' />01:07 PM</div>
                    <div className='__flex __ml-2 __mr-2'><Calender className="__mr-s" />2020-09-28</div>
                    <div className='__flex'><Crown className='__mr-s' />Empower Field</div>
                </div>
            </div>
            <div className='__total-wagered __center __ml-3 __mr-3 __f1'>
                Total Wagered
                <div className='__contest-btn __bold __mt-s __mb-1'>$999,999</div>
                <div className='__contest-btn'>To Return <b className='__bold'>$999,999</b></div>
                {placeTheBet && <div className='__contest-btn __mt-4'>Place Bet</div>}
            </div>
        </div>
    )
}

export default Contest;