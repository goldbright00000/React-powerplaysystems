import React, {useState} from 'react'
import PropTypes from 'prop-types'

import Shuffle from '../../icons/Shuffle'
import Plus from '../../icons/Plus'
import Minus from '../../icons/Minus'
import flashImg from '../../assets/flash.png'
import Tick from '../../icons/Tick'
import classes from "./gameCard.module.scss"
import {CONSTANTS} from "../../utility/constants";
import Cards from '../../icons/Cards/index'

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
        card = {}
    } = props || {}

    const { suit = '', rank = '' } = card || {}

    console.log(CONSTANTS.CARD_RANKS[rank] === "2" || CONSTANTS.CARD_RANKS[rank] === "3" || CONSTANTS.CARD_RANKS[rank] === "4" || CONSTANTS.CARD_RANKS[rank] === "5" || CONSTANTS.CARD_RANKS[rank] === "6" || CONSTANTS.CARD_RANKS[rank] === "7" || CONSTANTS.CARD_RANKS[rank] === "8" || CONSTANTS.CARD_RANKS[rank] === "9")

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
                //if rank === 12 => "A"
                CONSTANTS.CARD_RANKS[rank] === "2" || CONSTANTS.CARD_RANKS[rank] === "3" || CONSTANTS.CARD_RANKS[rank] === "4" || CONSTANTS.CARD_RANKS[rank] === "5" || CONSTANTS.CARD_RANKS[rank] === "6" || CONSTANTS.CARD_RANKS[rank] === "7" || CONSTANTS.CARD_RANKS[rank] === "8" || CONSTANTS.CARD_RANKS[rank] === "9" &&
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
                        <Cards card={card} />
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
