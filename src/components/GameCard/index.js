import React from 'react'
import PropTypes from 'prop-types'

import Shuffle from '../../icons/Shuffle'
import Arrow from '../../icons/Arrow'
import ArrowDown from '../../icons/ArrowDown'
import ArrowUp from '../../icons/ArrowUp'
import flashImg from '../../assets/flash.png'
import "./gameCard.scss"

function GameCard(props) {

    const { isSelected = false, showPopup = false } = props || {}

    return (
        <div className="__game_card_wrapper">
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
                        <Arrow size={15} color="#3b3c3e" style={{height: 'auto', padding: 0, marginBottom: -3.2}} />
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
    isSelected: PropTypes.bool, showPopup: PropTypes.bool
}

export default GameCard
