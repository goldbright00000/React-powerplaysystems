import React, { useState } from 'react';
import Calender from '../../icons/Calender';
import Clock from '../../icons/Clock';
import Crown from '../../icons/Crown';
import './LiveGame.scss'

const LiveGame = ({ player1, player2, score }) => {
    return (
        <div className='__liveGame __flex'>
            <div className='__main __f1'>
                <div className='__flex __flex-start'>
                    <div className='__board __f1'>
                        <div className='__mediam __bold __title __inline-block'>{player1.name}</div>
                        <div className='__flex __mt-1 __mb-s'>
                            <div className='__keyname'>Point Spread</div>
                            <div>{player1.pointerSpeed}</div>
                        </div>
                        <div className='__flex'>
                            <div className='__keyname'>Money Line</div>
                            <div>{player1.moneyLine}</div>
                        </div>
                    </div>

                    <div className='__m-1 __mt-a __mb-a __mediam'><div className='__h3 __vs'>VS</div></div>

                    <div className='__board __f1'>
                        <div className='__mediam __bold __title __inline-block'>{player2.name}</div>
                        <div className='__flex __mt-1 __mb-s'>
                            <div className='__f1'>Point Spread</div>
                            <div>{player2.pointerSpeed}</div>
                        </div>
                        <div className='__flex'>
                            <div className='__f1'>Money Line</div>
                            <div>{player2.moneyLine}</div>
                        </div>
                        <div className='__wagar-badge-wrapper'>
                            <div className='__wagar __flex __sb __mt-2 __m-s'>Wagar <div>{player2.wagar}</div> </div>
                            <div className='__return __ml-1'>To Return {player2.return}</div>
                        </div>
                    </div>

                    <div className='__border __m-1'></div>

                    <div className='__board __f1'>
                        <div className='__mediam __bold __title __inline-block'>Score Total</div>
                        <div className='__flex __mt-1 __mb-s'>
                            <div className='__f1'>Over</div>
                            <div className='__f1 __center'>{score.over1}</div>
                            <div className='__f1 __right'>{score.over2}</div>
                        </div>
                        <div className='__flex'>
                            <div className='__f1'>Under</div>
                            <div className='__f1 __center'>{score.under1}</div>
                            <div className='__f1 __right'>{score.under2}</div>
                        </div>
                        <div className='__wagar-badge-wrapper'>
                            <div className='__wagar __flex __sb __mt-2 __m-s'>Wagar <div>{player1.wagar}</div> </div>
                            <div className='__return __ml-1'>To Return {player1.return}</div>
                        </div>
                    </div>

                </div>
                <div className='__flex __flex-center __LiveGame-footer __ml-4 __mr-4'>
                    <div className='__flex'><Clock className='__mr-s' />01:07 PM</div>
                    <div className='__flex __ml-2 __mr-2'><Calender className="__mr-s" />2020-09-28</div>
                    <div className='__flex'><Crown className='__mr-s' />Empower Field</div>
                </div>
            </div>
            <div className='__total-wagered __center __m-2'>
                Total Wagered
                <div className='__LiveGame-btn __bold __mt-s __mb-1'>$999,999</div>
                <div className='__LiveGame-btn'>To Return <b className='__bold'>$999,999</b></div>
            </div>
        </div>
    )
}

export default LiveGame;