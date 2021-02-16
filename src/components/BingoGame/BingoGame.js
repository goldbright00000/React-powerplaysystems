import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import BingoGameBall from '..//BingoGameBall/BingoGameBall';
import './BingoGame.scss';

/**
 * 
 * @param {numbers} props,
 * numbers = [[], [], [], [], []] 
 */
const BingoGame = props => {
    const { targetNumbers = [], currentNumber = 0 } = props || {};

    useEffect(() => {
        console.log(currentNumber);
     }, [currentNumber]);

    return (
        <div className='__bingo-game-1 __center'>
            <div className='__game-wrapper'>
                <div>B</div>
                <div>I</div>
                <div>N</div>
                <div>G</div>
                <div>O</div>
                    {
                        targetNumbers && targetNumbers?.map((numbers, index) => {
                            return (
                                <div>
                                    {
                                        numbers?.map((number, column) => {
                                            // console.log(number === currentNumber)
                                            return (
                                                column === 2 && index === 2 ? <BingoGameBall key={column + " - " + index} active>Free</BingoGameBall> : <BingoGameBall key={column + " - " + index} active={number === currentNumber ? true : false}>{number}</BingoGameBall>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                
            </div>
        </div>
    )
}

BingoGame.propTypes = {
    targetNumbers: PropTypes.array,
    currentNumber: PropTypes.number,
}

export default React.memo(BingoGame);