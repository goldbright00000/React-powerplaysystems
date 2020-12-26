import React from 'react'
import PropTypes from 'prop-types'

import Shuffle from '../../icons/Shuffle'
import Arrow from '../../icons/Arrow'
import ArrowDown from '../../icons/ArrowDown'
import ArrowUp from '../../icons/ArrowUp'
import flashImg from '../../assets/flash.png'
import Tick from '../../icons/Tick'
import "./gameCard.scss"

function GameCard(props) {

    const { isSelected = false, showPopup = false, isCompleted = false } = props || {}

    return (
        <div className="__game_card_wrapper">
            {
                isCompleted &&
                    <Tick style={{height: 'auto', position: 'absolute', alignSelf: 'center', transform: 'translate(25%, -25%)'}} />
            }
            <div className="__game_card_container">
                {
                    isSelected
                        ?
                        <p>show card</p>
                        :
                        <span>?</span>
                }
            </div>
            {
                showPopup &&
                    <div className="__game_card_popup_container">
                        <div className="__game_card_popup">
                            <button className="__btn__" title="Decrease">
                                <Shuffle style={{ height: 'auto' }} size={39} />
                            </button>

                            <button className="__btn__">
                            <img src={flashImg} width={37} height={37} />
                            </button>
                            
                            <button className="__btn__">
                                <ArrowUp style={{ height: 'auto' }} size={39} />
                            </button>

                            <button className="__btn__">
                                <ArrowDown style={{ height: 'auto' }} size={39} />
                            </button>
                        </div>
                    </div>
            }
        </div>
    )
}

GameCard.propTypes = {
    isSelected: PropTypes.bool, showPopup: PropTypes.bool, isCompleted: PropTypes.bool
}

export default GameCard
