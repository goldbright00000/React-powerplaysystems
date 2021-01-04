import React from 'react';
import BingoGameBall from '..//BingoGameBall/BingoGameBall';
import './BingoGame.scss';

const BingoGame = props => {
    return (
        <div className='__bingo-game-1 __center'>
            <div className='__inline-block __game-wrapper'>
                <div className='__game'>
                    <div>B</div>
                    <div>I</div>
                    <div>N</div>
                    <div>G</div>
                    <div>O</div>
                    <BingoGameBall>2</BingoGameBall>
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
                    <BingoGameBall>66</BingoGameBall>
                </div>
            </div>
        </div>
    )
}

export default BingoGame;