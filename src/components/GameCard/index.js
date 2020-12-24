import React from 'react'

import "./gameCard.scss"

function GameCard(props) {

    const { isSelected = false } = props || {}

    return (
        <div className="__game_card_container">
            {
                isSelected
                    ?
                    <p>show card</p>
                    :
                    <span>?</span>
            }
            <div>
                
            </div>
        </div>
    )
}

export default GameCard
