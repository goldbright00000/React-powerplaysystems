import React from 'react';
import './PowerPlays.scss';
import ShuffleIcon from '../../assets/ShuffleIcon.png';
import ReplaceAllIcon from '../../assets/ReplaceAllIcon.png';
import PowerMatchIcon from '../../assets/PowerMatchIcon.png';
import IncreaseIcon from '../../assets/IncreaseIcon.png';
import DecreaseIcon from '../../assets/DecreaseIcon.png';

const PowerPlays = props => {
    return (
        <div className='__Bing-PowerPlays'>
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
    )
}

export default PowerPlays;