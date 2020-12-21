import React from 'react';
import './BingoPreGame.scss';
import Footer from '../../components/Footer/Footer';
import Header2 from '../../components/Header2/Header2';
import { Link } from 'react-router-dom';
import clockimage from '../../assets/StopWatchIcon@2x.png';
import TimerClock from './TimerClock';

const BingoPreGame = props => {
    return (
        <div className='__BingoPreGame'>
            <Header2 />
            <div className='__flex __main'>
                <div className='__left __f1'>
                    <div className='__title __bold'>Bingo</div>
                    <div><span className='__h3'>Win <span className='__primary-color'>$2000 </span></span> CAD</div>
                    <Link to='/' className='__uppercase __primary-color __see-contesy-rules __inline-block __mt-1 __mb-7'>SEE CONTEST RULES</Link>
                    <div className='__h4'>In Play</div>
                    <div className='__primary __progress-bar __mb-2' style={{ width: '15%' }}></div>
                    <div className='__timer __relative'>
                        <div className='__absolute __center'>
                            <img src={clockimage} alt='' className='__clock-image' />
                            <div className='__dark-white-color __small __mt-1 __mb-s'>Live draw begins in</div>
                            <TimerClock days={1} hours={23} mins={2} secs={50} />
                        </div>
                    </div>
                </div>
                <div className='__center __f2'>
                    
                </div>
                <div className='__right __f1'></div>
            </div>
            <Footer isBlack={true} />
        </div>
    )
}

export default BingoPreGame;