import React from 'react';
import './BingoPreGame.scss';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';
import clockimage from '../../assets/StopWatchIcon@2x.png';
import TimerClock from '../../components/TimerClock/TimerClock';
import lotteryImage from '../../assets/lotteryImg@2x.png';
import ShuffleIcon from '../../assets/ShuffleIcon.png';
import ReplaceAllIcon from '../../assets/ReplaceAllIcon.png';
import PowerMatchIcon from '../../assets/PowerMatchIcon.png';
import IncreaseIcon from '../../assets/IncreaseIcon.png';
import DecreaseIcon from '../../assets/DecreaseIcon.png';
import Timer from '../../components/Timer/Timer';

const BingoPreGame = props => {
    return (
        <div className='__BingoPreGame'>
            <Header isStick={true} />
            <div className='__flex-stretch __main'>
                <div className='__main-left __mt-5 __ml-5'>
                    <div className='__title __bold'>Bingo</div>
                    <div className='__mt-1'><span className='__h3'>Win <span className='__primary-color'>$2000 </span></span><span className='__h6'>CAD</span></div>
                    <Link to='/' className='__uppercase __primary-color __see-contesy-rules __inline-block __mt-1 __mb-6 __light-bold'>SEE CONTEST RULES</Link>
                    <div className='__h4'>In Play</div>
                    <div className='__primary __progress-bar __mb-2' style={{ width: '26%' }}></div>
                    <div className='__timer __relative'>
                        <Timer />
                        {/* <div className='__absolute __center'>
                            <img src={clockimage} alt='' className='__clock-image' />
                            <div className='__dark-white-color __smaller __mt-1 __mb-s'>Live draw begins in</div>
                            <TimerClock days={1} hours={23} mins={2} secs={50} />
                        </div> */}
                    </div>
                </div>
                <div className='__main-center __mt-6 __ml-a __mr-a'>
                    <div className='__header __flex-stretch __relative'>
                        <div>
                            <div className='__light-bold'>Jackpot</div>
                            <div><span className='__h2 __bolder __primary-color'>$2000</span> <span>CAD</span></div>
                            <div className='__smaller'>
                                Odds of winning depend on
                                <div className='__light-bold'>Powerplay usage</div>
                            </div>
                        </div>
                        <div className='__border'></div>
                        <div>
                            <div>Next draw starts in</div>
                            <div className='__inline-block'><TimerClock days={1} hours={23} mins={2} secs={50} /></div>
                            <div>Draw date <span className='__light-bold'>Sept 5th, 2020 , 8:00 pm EST</span></div>
                        </div>
                        <img alt='' src={lotteryImage} className='__absolute __lottery-image' />
                    </div>
                    <div className='__bingo-game __center'>
                        <div className='__inline-block __game-wrapper'>
                            <div className='__game'>
                                <div>B</div>
                                <div>I</div>
                                <div>N</div>
                                <div>G</div>
                                <div>O</div>
                                <div><div>2</div></div>
                                <div><div>17</div></div>
                                <div><div>43</div></div>
                                <div><div>46</div></div>
                                <div><div>74</div></div>
                                <div><div>7</div></div>
                                <div><div>34</div></div>
                                <div><div>19</div></div>
                                <div><div>17</div></div>
                                <div><div>59</div></div>
                                <div><div>10</div></div>
                                <div><div>26</div></div>
                                <div className='active'><div>Free</div></div>
                                <div><div>28</div></div>
                                <div><div>45</div></div>
                                <div><div>9</div></div>
                                <div><div>29</div></div>
                                <div><div>20</div></div>
                                <div><div>67</div></div>
                                <div><div>22</div></div>
                                <div><div>14</div></div>
                                <div><div>33</div></div>
                                <div><div>53</div></div>
                                <div><div>72</div></div>
                                <div><div>66</div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='__main-right'>
                    <div className='__mt-6 __ml-2 __mr-2 __center'>
                        <div className='__h4'>My Powerplays</div>
                        <div className="__mediam __my-balance __mt-1">My Balance <span className='__primary-color __bold    '>$0.00</span></div>
                        <div className='__m-3'>
                            <div className='__relative __mediam'>
                                <div className='__absolute __bingo-badge'>1 Left</div>
                                <img alt='' src={ShuffleIcon} />
                                <div className='__bold'>Replace</div>
                            </div>
                        </div>
                        <div className='__m-3'>
                            <div className='__relative __mediam'>
                                <div className='__absolute __primary-color __bingo-badge'>$.25</div>
                                <img src={ReplaceAllIcon} alt='' />
                                <div className='__bold'>Replace All</div>
                            </div>
                        </div>
                        <div className='__m-3'>
                            <div className='__relative __mediam'>
                                <div className='__absolute __primary-color __bingo-badge'>$.25</div>
                                <img src={PowerMatchIcon} alt='' />
                                <div className='__bold'>Power Match</div>
                            </div>
                        </div>
                        <div className='__m-3'>
                            <div className='__relative __mediam'>
                                <div className='__absolute __primary-color __bingo-badge'>$.25</div>
                                <img src={IncreaseIcon} alt='' />
                                <div className='__bold'>Increase</div>
                            </div>
                        </div>
                        <div className='__m-3'>
                            <div className='__relative __mediam'>
                                <div className='__absolute __primary-color __bingo-badge'>$.25</div>
                                <img src={DecreaseIcon} alt='' />
                                <div className='__bold'>Decrease</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='__container __bingo-game-2 __primary-color __h2'>
                <div className='__bold'>B</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>

                <div className='__bold'>I</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>

                <div className='__bold'>N</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>

                <div className='__bold'>G</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>

                <div className='__bold'>O</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
            </div>
            <Footer isBlack={true} />
        </div>
    )
}

export default BingoPreGame;