import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import * as Actions from '../../actions/bingoActions';
import BingoGameBall from '..//BingoGameBall/BingoGameBall';
import './BingoGame.scss';
import { checkRange, getRandomNumberBetween, isExistsInList } from '../../utility/shared';

/**
 * 
 * @param {numbers} props,
 * numbers = { [], [], ...}
 */

const matchNumbers = [];

const BingoGame = props => {
    const { targetNumbers = [], currentNumber = 0 } = props || {};
    const dispatch = useDispatch();
    const { hasBingoUpdated = false } = useSelector((state) => state.bingoGame);

    // useEffect(() => { }, [hasBingoUpdated]);

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
            if (checkInRange(currentNumber).inRangeB && !isExistsInList(matchNumbers, currentNumber) && column === 0) {
                targetNumbers[column][row] = currentNumber;
                hasFound(targetNumbers[column][row], currentNumber)
            } 
            else if (checkInRange(currentNumber).inRangeI && !isExistsInList(matchNumbers, currentNumber) && column === 1) {
                targetNumbers[column][row] = currentNumber;
                hasFound(targetNumbers[column][row], currentNumber)
            } 
            else if (checkInRange(currentNumber).inRangeN  && !isExistsInList(matchNumbers, currentNumber) && column === 2) {
                targetNumbers[column][row] = currentNumber;
                hasFound(targetNumbers[column][row], currentNumber)
            } 
            else if (checkInRange(currentNumber).inRangeG  && !isExistsInList(matchNumbers, currentNumber) && column === 3) {
                targetNumbers[column][row] = currentNumber;
                hasFound(targetNumbers[column][row], currentNumber)
            } 
            else if (checkInRange(currentNumber).inRangeO  && !isExistsInList(matchNumbers, currentNumber) && column === 4) {
                targetNumbers[column][row] = currentNumber;
                hasFound(targetNumbers[column][row], currentNumber)
            }
        }))
    }

    const onReplacePower = (row, column) => {
        dispatch(Actions.onReplacePower(() => {
            let newNumber = generateRandomNumberOnReplace(column)

            targetNumbers[column][row] = newNumber;
            hasFound(newNumber, currentNumber)
            dispatch(Actions.updateTargetNumbers(targetNumbers));
        }))
    }

    const generateRandomNumberOnReplace = (column) => {
        let startNumber = column * 15 + 1;
        let endNumber = (column + 1) * 15;
        let newNumber = getRandomNumberBetween(startNumber, endNumber);

        if (isExistsInList(targetNumbers[column], newNumber)) {
            newNumber = getRandomNumberBetween(startNumber, endNumber);
        }

        return newNumber;
    }

    const onIncrease = (number, row, column) => {
        dispatch(Actions.onIncreaseDecrease(() => {
            let _numb = number;
            if (number !== 15 && column === 0) {
                number++;
                if (!isExistsInList(targetNumbers[column], number)) {
                    
                }
                if (isExistsInList(targetNumbers[column], number) && number !== 14) {
                    number += 2;
                } else {
                    number++;
                }
            } else if (number !== 30 && column === 1) {
                if (isExistsInList(targetNumbers[column], number) && number !== 28) {
                    number += 2;
                } else {
                    number++;
                }
            } else if (number !== 45 && column === 2) {
                if (isExistsInList(targetNumbers[column], number) && number !== 43) {
                    number += 2;
                } else {
                    number++;
                }
            } else if (number !== 60 && column === 3) {
                if (isExistsInList(targetNumbers[column], number) && number !== 58) {
                    number += 2;
                } else {
                    number++;
                }
            } else if (number !== 75 && column === 4) {
                if (isExistsInList(targetNumbers[column], number) && number !== 73) {
                    number += 2;
                } else {
                    number++;
                }
            }
    
            targetNumbers[column][row] = number;
            hasFound(number, currentNumber);
        }))
    }

    const onDecrease = (number, row, column) => {
        dispatch(Actions.onIncreaseDecrease(() => {
            let _numb = number;
            if (number !== 1 && column === 0) {
                number--;
                if(!isExistsInList(targetNumbers[column], number)) {
                    number--;
                } else if (isExistsInList(targetNumbers[column], number) && number !== 1) {
                    number -= 2;
                } else {
                    number = _numb;
                }

            } else if (number !== 16 && column === 1) {
                number--;
            } else if (number !== 31 && column === 2) {
                number--;
            } else if (number !== 46 && column === 3) {
                number--;
            } else if (number !== 61 && column === 4) {
                number--;
            }
    
            targetNumbers[column][row] = number;
            hasFound(number, currentNumber);
        }))
    }

    const checkInRange = (number) => {
        let inRangeB = checkRange(number, 1, 15);
        let inRangeI = checkRange(number, 16, 30);
        let inRangeN = checkRange(number, 31, 45);
        let inRangeG = checkRange(number, 46, 60);
        let inRangeO = checkRange(number, 61, 75);

        return {
            inRangeB,
            inRangeI,
            inRangeN,
            inRangeG,
            inRangeO,
        }
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
                                                <BingoGameBall keyVal={'column-' + column + " - " + row} active={hasFound(number, currentNumber) || (column == 2 && row == 2)} number={column == 2 && row == 2 ? 'Free' : number} onPowerMatch={onPowerMatch} onReplace={onReplacePower} onIncrease={onIncrease} onDecrease={onDecrease} column={column} row={row} inRangeB={checkInRange(currentNumber).inRangeB} inRangeI={checkInRange(currentNumber).inRangeI} inRangeN={checkInRange(currentNumber).inRangeN} inRangeG={checkInRange(currentNumber).inRangeG} inRangeO={checkInRange(currentNumber).inRangeO} />
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