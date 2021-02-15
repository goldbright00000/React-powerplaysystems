import React from 'react';
import PropTypes from 'prop-types';

import BingoGameBall from '..//BingoGameBall/BingoGameBall';
import './BingoGame.scss';

/**
 * 
 * @param {numbers} props,
 * numbers = [[], [], [], [], []] 
 */
const BingoGame = props => {
    const { targetNumbers = [], drawnNumbers = [] } = props || {};
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
                        return numbers?.map((number, key) => {
                            console.log(key, index);
                            
                            return (
                                key === 2 && index === 2 ? <BingoGameBall key={key + " - " + index} active>Free</BingoGameBall> : <BingoGameBall key={key + " - " + index}>{number}</BingoGameBall>
                            )
                        })
                    })
                }
                {/* <BingoGameBall>2</BingoGameBall>
                <BingoGameBall>17</BingoGameBall>
                <BingoGameBall>43</BingoGameBall>
                <BingoGameBall>46</BingoGameBall>
                <BingoGameBall>74</BingoGameBall>
                <BingoGameBall>7</BingoGameBall>
                <BingoGameBall>34</BingoGameBall>
                <BingoGameBall>19</BingoGameBall>
                <BingoGameBall>17</BingoGameBall>
                <BingoGameBall>59</BingoGameBall>
                <BingoGameBall>10</BingoGameBall>
                <BingoGameBall>26</BingoGameBall>
                <BingoGameBall active>Free</BingoGameBall>
                <BingoGameBall>28</BingoGameBall>
                <BingoGameBall>45</BingoGameBall>
                <BingoGameBall>9</BingoGameBall>
                <BingoGameBall>29</BingoGameBall>
                <BingoGameBall>20</BingoGameBall>
                <BingoGameBall>67</BingoGameBall>
                <BingoGameBall>22</BingoGameBall>
                <BingoGameBall>14</BingoGameBall>
                <BingoGameBall>33</BingoGameBall>
                <BingoGameBall>53</BingoGameBall>
                <BingoGameBall>72</BingoGameBall>
                <BingoGameBall>66</BingoGameBall> */}
            </div>
        </div>
    )
}

BingoGame.propTypes = {
    targetNumbers: PropTypes.array,
    drawnNumbers: PropTypes.object,
}

export default React.memo(BingoGame);