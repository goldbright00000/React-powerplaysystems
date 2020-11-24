import React, { Fragment } from 'react';
import './PowerBetLive.scss'
import Header2 from '../../components/Header2/Header2';
import Document from '../../icons/Document';
import Trophy from '../../icons/Trophy';
import Munch from '../../icons/Munch';
import playerImage from '../../assets/bitmap@2x.png';
import CheckIcon from '../../icons/CheckIcon';
import Scrollbar from '../../utility/Scrollbar';
import LiveGame from '../../components/LiveGame/LiveGame';

const PowerBetLive = props => {
    return (
        <Fragment>
            <Header2></Header2>
            <div className='__PowerBetLive __flex-stretch'>
                <div className='__left __f1 __container-3'>
                    <div className='__center __introduction __column __ai'>
                        <div className='__mt-6 __mb-7'>
                            <div className='__h2 __bolder'>2020 NFL <span className='__primary-color'>PowerBet Contest</span></div>
                            <div className='__flex __m-a __intoduction-btns __mt-1 __mb-4'>
                                <button className='__btn __mediam __style-2 __f1 __white-color'><Document className='__mr-s' />Contest Rules</button>
                                <button className='__btn __style-2 __mediam __f1 __white-color'><Trophy className='__mr-s' />Prize Grid</button>
                                <button className='__btn __style-2 __mediam __f1 __white-color'><Munch className='__mr-s' />Prize Grid</button>
                            </div>
                        </div>
                        <img src={playerImage} alt='' className='__ml-a __mr-2 __mt-a __relative __player-image' />
                    </div>
                    <div className='__main'>
                        <div className='__flex __sb'>
                            <div className='__title __primary-color'>Live Game</div>
                            <div className='__Winning-Bets'>
                                <div className='__h5'>Winning Bets</div>
                                <div className='__flex __mt-1'>
                                    <span className='__bold __mr-1'>
                                        <span className='__h5 __primary-color'>3</span>
                                        <span className='__mediam'>/8</span>
                                    </span>
                                    <CheckIcon />
                                    <CheckIcon />
                                    <CheckIcon />
                                    <div className='__circle'></div>
                                    <div className='__circle'></div>
                                    <div className='__circle'></div>
                                    <div className='__circle'></div>
                                    <div className='__circle'></div>
                                    <div className='__circle'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Scrollbar className='__players-wrapper __relative'>
                        <LiveGame
                            player1={{
                                name: 'Denver Broncos',
                                pointerSpeed: "+11/-108",
                                moneyLine: '+360',
                                wagar: '$200',
                                return: '$999,999'
                            }}
                            player2={{
                                name: 'Buffalo Bills',
                                pointerSpeed: "+11/-108",
                                moneyLine: '+360',
                                wagar: '$0',
                                return: '$0'
                            }}
                            score={{
                                over1: '44.5',
                                over2: '1.90',
                                under1: '44.5',
                                under2: '1.90',
                                wagar: '$0',
                                return: '$0',
                            }}
                        />
                    </Scrollbar>

                </div>
                <div className='__powerbet-live-right'>

                </div>
            </div>
        </Fragment>
    )
}

export default PowerBetLive;