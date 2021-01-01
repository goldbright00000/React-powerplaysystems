import React, {useState} from 'react'
import PropTypes from 'prop-types'

import Shuffle from '../../icons/Shuffle'
import Plus from '../../icons/Plus'
import Minus from '../../icons/Minus'
import ArrowDown from '../../icons/ArrowDown'
import ArrowUp from '../../icons/ArrowUp'
import flashImg from '../../assets/flash.png'
import Tick from '../../icons/Tick'
import classes from "./gameCard.module.scss"
import {CONSTANTS} from "../../utility/constants";

function GameCard(props) {

    const [showPopup, setPopupState] = useState(false)

    const {
        isSelected = false,
        showCardPopup = false,
        isCompleted = false,
        image = '',
        styles = {},
        onClick = () => {
        },
        card: {suit = '', rank = ''} = {}
    } = props || {}

    const renderCard = (suit, rank) => {
        let _rank = CONSTANTS.CARD_RANKS[rank]
        switch (suit) {
            case CONSTANTS.CARD_SUITS.DIAMOND:

                break;

            case CONSTANTS.CARD_SUITS.CLUB:

                break;

            case CONSTANTS.CARD_SUITS.HEART:

                break;

            case CONSTANTS.CARD_SUITS.SPADE:

                break;
        }
    }

    return (
        <div className={classes.__game_card_wrapper} style={styles} onClick={() => {
            if (showCardPopup) {
                setPopupState(!showPopup)
            }
            onClick()
        }} onBlur={() => {
            setPopupState(false)
        }}>
            {
                //14 = Ace
                rank === 12 &&
                <Tick style={{
                    height: "auto",
                    position: "absolute",
                    alignSelf: "center",
                    transform: `translate(25%, -25%)`
                }}/>
            }
            {
                isSelected
                    ?
                    <div className={classes.__game_card_selected}>
                        renderCard(suit, rank)
                    </div>
                    :
                    image ?
                        <div className={classes.__game_card_selected}>
                            <img src={image} style={{width: '100%', height: '100%'}}/>
                        </div>
                        :
                        <div className={classes.__game_card_container}>
                            <span>?</span>
                        </div>
            }
            {
                showPopup &&
                <div className={classes.__game_card_popup_container}>
                    <div className={classes.__game_card_popup}>
                        <button className={classes.__btn__} title="Decrease">
                            <Shuffle style={{height: 'auto'}} size={39}/>
                        </button>

                        <button className={classes.__btn__}>
                            <img src={flashImg} width={37} height={37}/>
                        </button>

                        <button className={classes.__btn__}>
                            <Plus style={{height: 'auto'}} size={39}/>
                        </button>

                        <button className={classes.__btn__}>
                            <Minus style={{height: 'auto'}} size={39}/>
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

GameCard.propTypes = {
    isSelected: PropTypes.bool,
    showCardPopup: PropTypes.bool,
    isCompleted: PropTypes.bool,
    image: PropTypes.string,
    styles: PropTypes.object,
    onClick: PropTypes.func,
    card: PropTypes.object,
}

export default GameCard
