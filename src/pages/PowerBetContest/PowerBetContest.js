import React from 'react';
import Header2 from '../../components/Header2/Header2';
import './PowerBetContest.scss';
import Document from '../../icons/Document';
import Trophy from '../../icons/Trophy';
import PowerplayIcon from '../../assets/powerplay-icon.png'
import Search from '../../icons/Search';
import Contest from '../../components/Contest/Contest';
import Scrollbar from '../../utility/Scrollbar';
import ContestRules from '../../components/ContestRules/ContestRules';

const PowerBetContest = props => (
    <div className='__PowerBetContest'>
        <Header2 />
        <div className='__intoduction __background __center'>
            <div className='__mt-6 __mb-7'>
                <div className='__viewport-title __bolder'>2020 NFL <span className='__primary-color'>PowerBet Contest</span></div>
                <div className='__h5 __light'>Pick 8 Teams & use Powerplays to win!</div>
                <div className='__flex __m-a __flex-btns __mt-2 __mb-4'>
                    <button className='__btn __mediam __style-2 __f1 __white-color'><Document />Contest Rules</button>
                    <button className='__btn __style-2 __mediam __f1 __white-color'><Trophy />Prize Grid</button>
                </div>
                <div className='__winner-prize'>Turn $2,000 into $10,000 and win<span className='__badge __light-bold __ml-s'>$1000 cash</span></div>
                <div className='__h5 __mt-2'>
                    Start with <span className='__primary-color'>$1,000 Powerplay money</span>, whoever turns
                    <div className='__mt-s'>the highest return, <span className='__primary-color'>will win $2,000 Real Money!</span></div>
                </div>
            </div>
        </div>
        <div className='__main __flex-stretch'>
            <div className='__container-3 __mt-7 __mb-7 __f1'>
                <div className='__flex __sb'>
                    <div>
                        <div className='__h3'>Select your teams</div>
                        <div className='__h6 __flex __mb-2'>
                            <div>Select between 5 and 10 teams</div>
                            <div className='__small-border __ml-s'></div>
                        </div>
                    </div>
                    <div className='__h5 __flex'>Your <img className='__mr-s __ml-s __small' src={PowerplayIcon} alt='' /> Balance: $800</div>
                </div>
                <div className='__h5'>Search & Filter for your teams</div>
                <div className='__flex __mt-1'>
                    <label className='__f1 __relative __search-container'>
                        <Search />
                        <input type='text' placeholder='Search...' className='__input-field' />
                    </label>
                    <div className='__flex __outline-badges-wrapper __h6 __ml-1'>
                        <div className='__outline-badge __active'>AFC East</div>
                        <div className='__outline-badge'>AFC West</div>
                        <div className='__outline-badge'>NFC East</div>
                        <div className='__outline-badge'>NFC West</div>
                    </div>
                </div>
                <Scrollbar className='__players-wrapper __mt-2 __mb-6'>

                    <Contest
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
                            over: '44.5',
                            over2: '1.90',
                            under: '44.50',
                            under2: '1.90',
                            wagar: '$0',
                            return: '$0',
                        }}
                    />
                    <Contest
                        player1={{
                            name: 'Washinghton Redskins',
                            pointerSpeed: "+11/-108",
                            moneyLine: '+360',
                            wagar: '$200',
                            return: '$999,999'
                        }}
                        player2={{
                            name: 'Arizona Cardinals',
                            pointerSpeed: "+11/-108",
                            moneyLine: '+360',
                            wagar: '$0',
                            return: '$0'
                        }}
                        score={{
                            over: '44.5',
                            over2: '1.90',
                            under: '44.50',
                            under2: '1.90',
                            wagar: '$0',
                            return: '$0',
                        }}
                    />
                    <Contest
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
                            over: '44.5',
                            over2: '1.90',
                            under: '44.50',
                            under2: '1.90',
                            wagar: '$0',
                            return: '$0',
                        }}
                    />
                    <Contest
                        player1={{
                            name: 'Washinghton Redskins',
                            pointerSpeed: "+11/-108",
                            moneyLine: '+360',
                            wagar: '$200',
                            return: '$999,999'
                        }}
                        player2={{
                            name: 'Arizona Cardinals',
                            pointerSpeed: "+11/-108",
                            moneyLine: '+360',
                            wagar: '$0',
                            return: '$0'
                        }}
                        score={{
                            over: '44.5',
                            over2: '1.90',
                            under: '44.50',
                            under2: '1.90',
                            wagar: '$0',
                            return: '$0',
                        }}
                    />
                </Scrollbar>
                <ContestRules />
            </div>
            <div className='__right-panel'>

            </div>
        </div>
    </div>
)

export default PowerBetContest;