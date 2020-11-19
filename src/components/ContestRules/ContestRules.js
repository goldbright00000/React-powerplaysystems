import React from 'react';
import book from '../../assets/gaming.svg';
import './ContestRules.scss';

const ContestRules = props => (
    <div className='__ContestRules'>
        <div className='__mediam __flex-stretch __image-wrapper'>
            <img src={book} className='__book' alt='' />
            <span className='__mt-s __ml-s'>Contest Rules</span>
        </div>
        <div className='__rules __m-1 __relative'>
            
        </div>
    </div>
)

export default ContestRules;