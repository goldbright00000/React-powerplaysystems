import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import * as Actions from '../../actions/bingoActions';
import BingoGameBall from '..//BingoGameBall/BingoGameBall';
import './BingoGame.scss';

/**
 * 
 * @param {numbers} props,
 * numbers = { [], [], ...}
 */

const matchNumbers = [];

const BingoGame = props => {
    const { targetNumbers = [], currentNumber = 0 } = props || {};
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log(currentNumber);
    }, [currentNumber]);

    const hasFound = useCallback((number, currentNumber) => { 
        let isAvaiable = matchNumbers.includes(number)
        if (!isAvaiable && currentNumber === number) {
            matchNumbers.push(number)
        }

        dispatch(Actions.setMatchedNumbers(matchNumbers));

        return matchNumbers.includes(number);
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
                                            return (
                                                 <BingoGameBall keyVal={'column-' + column + " - " + index} active={hasFound(number,  currentNumber) || (column == 2 && index == 2) } number={column == 2 && index == 2 ? 'Free' : number} />
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