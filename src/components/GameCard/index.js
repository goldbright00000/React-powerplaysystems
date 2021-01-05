import React, {useState} from 'react'
import PropTypes from 'prop-types'

import Replace from '../../icons/Replace'
import Plus from '../../icons/Plus'
import Minus from '../../icons/Minus'
import boltIcon from '../../assets/bolt.png'
import Tick from '../../icons/Tick'
import classes from "./gameCard.module.scss"
import Cards from '../../icons/Cards/index'
import { CONSTANTS } from '../../utility/constants'
import { GetAceCardIndex } from '../../utility/shared'

function GameCard(props) {

    const [showPopup, setPopupState] = useState(false)

    const {
        isSelected = false,
        showCardPopup = false,
        isCompleted = false,
        image = '',
        styles = {},
        card = {},
        cardIndex = 0,
        collectedAceCards = [],
        inventory: { replace = 0, powerMatch = 0, increase = 0, decrease = 0 } = {},
        onClick = () => {},
        updateCards = () => { },
        updateInventory = () => { },
        getRandomCard = () => { },
    } = props || {}

    const { suit = 0, rank = 0 } = card || {}
    let _rank = rank;
    const aceCard = collectedAceCards?.filter(card => card.suit === suit)[0];
    const { aceCards = 0 } = aceCard || {}

    const onIncrease = () => {
        if (aceCards && aceCards === CONSTANTS.MAX_ACE_PER_CARD || increase <= 0) {
            return;
        }

        if (_rank !== GetAceCardIndex()) {
            _rank += 1;
        }
        
        const _card = {
            suit: suit,
            rank: _rank,
        }

        let _increase = increase;
        _increase -= 1;

        //update the cards array in parent component
        updateCards(cardIndex, _card)
        updateInventory(_increase, CONSTANTS.CARD_POP_ACTIONS.INCREASE)
    }

    const onReplace = () => { 
        if (replace <= 0)
        return;

        let _replace = replace;
        _replace -= 1;

        let newCard = getRandomCard();
        if (newCard?.rank === rank) {
            newCard = getRandomCard();
        }
        updateCards(cardIndex, newCard)
        updateInventory(_replace, CONSTANTS.CARD_POP_ACTIONS.REPLACE)
    }

    const onPowerMatch = () => {
        if (powerMatch <= 0 || aceCards && aceCards === CONSTANTS.MAX_ACE_PER_CARD) return

        let _powerMatch = powerMatch;
        _powerMatch -= 1;

        const aceCard = {
            suit: suit,
            rank: GetAceCardIndex(),
        }

        updateCards(cardIndex, aceCard)
        updateInventory(_powerMatch, CONSTANTS.CARD_POP_ACTIONS.POWER_MATCH)
    }

    const onDecrease = () => { 
        if (aceCards && aceCards === CONSTANTS.MAX_ACE_PER_CARD || decrease <= 0) {
            return;
        }

        if (_rank > 0) {
            _rank -= 1;
        } else {
            _rank = GetAceCardIndex()
        }
        
        const _card = {
            suit: suit,
            rank: _rank,
        }

        let _decrease = decrease;
        _decrease -= 1;

        //update the cards array in parent component
        updateCards(cardIndex, _card)
        updateInventory(_decrease, CONSTANTS.CARD_POP_ACTIONS.DECREASE)
    }
    
    return (
        <div className={classes.__game_card_wrapper} style={styles}>
            {
                //if rank === 12 => "A"
                isCompleted &&
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
                    <div className={classes.__game_card_selected} onClick={() => {
                        if (showCardPopup) {
                            setPopupState(!showPopup)
                        }
                        onClick()
                    }} onBlur={() => {
                        setPopupState(false)
                    }}>
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
                        {
                            isCompleted ?
                                <span>No action required</span>
                                :
                                <>             
                                    <button className={classes.__btn__} onClick={onReplace}>
                                        <Replace style={{height: 'auto'}} size={39}/>
                                    </button>

                                    <button className={classes.__btn__} onClick={onPowerMatch}>
                                        <img src={boltIcon} width={40} height={40}/>
                                    </button>

                                    <button className={classes.__btn__}>
                                        <Plus style={{height: 'auto'}} size={39} onClick={onIncrease}/>
                                    </button>

                                    <button className={classes.__btn__}>
                                        <Minus style={{height: 'auto'}} size={39} onClick={onDecrease}/>
                                    </button>
                                </>
                        }
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
    updateCards: PropTypes.func,
    cardIndex: PropTypes.number,
    collectedAceCards: PropTypes.array,
    inventory: PropTypes.object,
    updateInventory: PropTypes.func,
    getRandomCard: PropTypes.func,
}

export default GameCard
