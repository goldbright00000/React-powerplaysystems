import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

import Replace from '../../icons/Replace'
import Plus from '../../icons/Plus'
import Minus from '../../icons/Minus'
import boltIcon from '../../assets/bolt.png'
import Tick from '../../icons/Tick'
import Cards from '../../icons/Cards/index'
import { CONSTANTS } from '../../utility/constants'
import { GetAceCardIndex, getRandomCard, hasMaxAceCards } from '../../utility/shared'
import classes from "./gameCard.module.scss"

function GameCard(props) {

    const [showPopup, setPopupState] = useState(false)
    const [hasReplaced, setHasReplacedState] = useState(false)

    const {
        isSelected = false,
        showCardPopup = false,
        isCompleted = false,
        image = '',
        styles = {},
        card = {},
        cardIndex = 0,
        collectedAceCards = [],
        inventory: { replace = 0, powerMatch = 0, increaseOrDecrease = 0, decrease = 0 } = {},
        activeCard = {},
        time = 0,
        onClick = () => {},
        updateCards = () => { },
        updateInventory = () => { },
        width = 0,
        height = 0,
        hoverShadow = false
    } = props || {}

    const { suit = 0, rank = 0 } = card || {}
    let _rank = rank;
    const aceCard = collectedAceCards?.filter(card => card.suit === suit)[0];
    const { aceCards = 0 } = aceCard || {}

    useEffect(() => {
        if (time <= 0) {
            setHasReplacedState(false)
            setPopupState(false)
        }
    }, [time])

    const onIncrease = () => {
        if (aceCards && aceCards && hasMaxAceCards(aceCards) || increaseOrDecrease <= 0 || activeCard !== card) {
            return;
        }

        if (_rank !== GetAceCardIndex()) {
            _rank += 1;
        }
        
        const _card = {
            suit: suit,
            rank: _rank,
        }

        let _increase = increaseOrDecrease;
        _increase -= 1;

        //update the cards array in parent component
        updateCards(cardIndex, _card)
        updateInventory(_increase, CONSTANTS.CARD_POP_ACTIONS.INCREASE)
    }

    const onReplace = () => { 
        if (replace <= 0 || activeCard !== card)
        return;

        let _replace = replace;
        _replace -= 1;

        let newCard = getRandomCard();
        if (newCard?.rank === rank) {
            newCard = getRandomCard();
        }
        setHasReplacedState(true)
        updateCards(cardIndex, newCard)
        updateInventory(_replace, CONSTANTS.CARD_POP_ACTIONS.REPLACE)
    }

    const onPowerMatch = () => {
        if (powerMatch <= 0 || aceCards && hasMaxAceCards(aceCards) || activeCard !== card) return

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
        if (aceCards && hasMaxAceCards(aceCards) || increaseOrDecrease <= 0 || activeCard !== card) {
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

        let _decrease = increaseOrDecrease;
        _decrease -= 1;

        //update the cards array in parent component
        updateCards(cardIndex, _card)
        updateInventory(_decrease, CONSTANTS.CARD_POP_ACTIONS.INCREASE)
    }
    
    return (
        <div className={`${classes.__game_card_wrapper} ${hoverShadow && classes.shadow}`} style={styles}>
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
                        {
                            image ?
                                <div className={classes.__game_card_selected}>
                                    <img src={image} style={{width: '100%', height: '100%'}}/>
                                </div>
                                :
                                <Cards card={card} width={width || 130} height={height || 195} />
                        }
                    </div>
                    :
                    <div className={classes.__game_card_container}>
                        <span>?</span>
                    </div>
            }
            {
                showPopup && activeCard === card && time > 0 &&
                <div className={classes.__game_card_popup_container}>
                    <div className={classes.__game_card_popup}>
                        {
                            isCompleted ?
                                <span>No action required</span>
                                :
                                <>
                                    {
                                        replace > 0 || powerMatch > 0 || increaseOrDecrease > 0 
                                            ?
                                            <>
                                                {
                                                    replace > 0 && !hasReplaced &&
                                                    <button className={classes.__btn__} onClick={onReplace}>
                                                        <Replace style={{height: 'auto'}} size={39}/>
                                                    </button>
                                                }    

                                                {
                                                    powerMatch > 0 && !hasMaxAceCards(aceCards) &&
                                                    <button className={classes.__btn__} onClick={onPowerMatch}>
                                                        <img src={boltIcon} width={40} height={40}/>
                                                    </button>
                                                }

                                                {
                                                    increaseOrDecrease > 0 &&
                                                    <>
                                                        <button className={classes.__btn__}>
                                                            <Plus style={{height: 'auto'}} size={39} onClick={onIncrease}/>
                                                        </button>

                                                        <button className={classes.__btn__}>
                                                            <Minus style={{height: 'auto'}} size={39} onClick={onDecrease}/>
                                                        </button>
                                                    </>
                                                }
                                            </>
                                            :
                                            <span>All your Powers have been used</span>
                                    }
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
    activeCard: PropTypes.object,
    time: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    hoverShadow: PropTypes.bool
}

export default GameCard
