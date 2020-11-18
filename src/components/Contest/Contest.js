import React, { useState } from 'react';
import './Contest.scss'

const Contest = ({ player1, player2 }) => {
    const [isFirstPointerChecked, setIsFirstPointerChecked] = useState(false);
    const [isFirstScoreChecked, setIsFirstScoreChecked] = useState(false);

    const [isSecPointerChecked, setIsSecPointerChecked] = useState(false);
    const [isSecScoreChecked, setIsSecScoreChecked] = useState(false);

    const onFirstPlayerPontChange = e => {
        setIsFirstPointerChecked(e.target.checked);
    }
    const onFirstScoreChange = e => {
        setIsFirstScoreChecked(e.target.checked);
    }
    const onSecPlayerPontChange = e => {
        setIsSecPointerChecked(e.target.checked);
    }
    const onSecScoreChange = e => {
        setIsSecScoreChecked(e.target.checked);
    }
    return (
        <div className='__contest'>
            <div className={`__main ${isFirstPointerChecked || isFirstScoreChecked || isSecPointerChecked || isSecScoreChecked ? '__active' : ''}`}>
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

                    <div className='__h3 __vs'>VS</div>

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

                    <div className={`__board ${isSecPointerChecked || isSecScoreChecked ? '__active' : ''}`}>
                        <div className='__mediam __bold __title __inline-block'>{player1.name}</div>
                        <label className='__flex __mt-1 __mb-s'>
                            <input type='checkbox' className='__checkbox __mr-1' checked={isSecPointerChecked} onChange={onSecPlayerPontChange} />
                            <div className='__keyname'>Point Spread</div>
                            <div>{player1.pointerSpeed}</div>
                        </label>
                        <label className='__flex'>
                            <input type='checkbox' className='__checkbox __mr-1' checked={isSecScoreChecked} onChange={onSecScoreChange} />
                            <div className='__keyname'>Money Line</div>
                            <div>{player1.moneyLine}</div>
                        </label>
                        <div className='__wagar-badge-wrapper'>
                            <div className='__wagar __flex __sb __mt-2 __mb-s'>Wagar <div>{player1.wagar}</div> </div>
                            <div className='__return __ml-1'>To Return {player1.return}</div>
                        </div>
                    </div>

                </div>
                <div className='__flex __flex-center'>
                    <div className='__flex'>01:07 PM</div>
                </div>
            </div>
        </div>
    )
}

export default Contest;