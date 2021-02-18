import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import * as Actions from '../../actions/bingoActions';
import BingoGameBall from '..//BingoGameBall/BingoGameBall';
import './BingoGame.scss';
import { checkRange } from '../../utility/shared';

/**
 * 
 * @param {numbers} props,
 * numbers = { [], [], ...}
 */

const matchNumbers = [];

const BingoGame = props => {
    const { targetNumbers = [], currentNumber = 0 } = props || {};
    const dispatch = useDispatch();

    const hasFound = useCallback((number, currentNumber) => { 
        let isAvaiable = matchNumbers.includes(number)
        if (!isAvaiable && currentNumber === number) {
            matchNumbers.push(number);
            dispatch(Actions.setMatchedNumbers(matchNumbers));
        }

        return matchNumbers.includes(number);
    }, [currentNumber]);

    const onPowerMatch = (row, column) => { 
        dispatch(Actions.onPowerMatch(() => {
            let inRangeB = checkRange(currentNumber, 1, 15);
            let inRangeI = checkRange(currentNumber, 16, 30);
            let inRangeN = checkRange(currentNumber, 31, 45);
            let inRangeG = checkRange(currentNumber, 46, 60);
            let inRangeO = checkRange(currentNumber, 61, 75);

            console.log(row, column);

            if (inRangeB && !matchNumbers.includes(currentNumber) && column === 0) {
                targetNumbers[column][row] = currentNumber;
                hasFound(targetNumbers[column][row], currentNumber)
            } 
            else if (inRangeI && !matchNumbers.includes(currentNumber) && column === 1) {
                targetNumbers[column][row] = currentNumber;
                hasFound(targetNumbers[column][row], currentNumber)
            } 
            else if (inRangeN  && !matchNumbers.includes(currentNumber) && column === 2) {
                targetNumbers[column][row] = currentNumber;
                hasFound(targetNumbers[column][row], currentNumber)
            } 
            else if (inRangeG  && !matchNumbers.includes(currentNumber) && column === 3) {
                targetNumbers[column][row] = currentNumber;
                hasFound(targetNumbers[column][row], currentNumber)
            } 
            else if (inRangeO  && !matchNumbers.includes(currentNumber) && column === 4) {
                targetNumbers[column][row] = currentNumber;
                hasFound(targetNumbers[column][row], currentNumber)
            }
        }))
    }

    return (
        <div className='__bingo-game-1 __center'>
            <div className='__game-wrapper'>
                <div>B</div>
                <div>I</div>
                <div>N</div>
                <div>G</div>
                <div>O</div>
                    {
                        targetNumbers && targetNumbers?.map((numbers, column) => {
                            return (
                                <div>
                                    {
                                        numbers?.map((number, row) => {
                                            return (
                                                <BingoGameBall keyVal={'column-' + column + " - " + row} active={hasFound(number, currentNumber) || (column == 2 && row == 2)} number={column == 2 && row == 2 ? 'Free' : number} onPowerMatch={onPowerMatch} column={column} row={row} />
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