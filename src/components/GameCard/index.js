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
        onClick = () => {
        },
        card = {},
        updateCards = () => { },
        cardIndex = 0
    } = props || {}

    const onIncrease = () => {
        const { suit = 0, rank = 0, aces = 0 } = card || {}
        let _rank = rank;
        let _aces = aces;

        if (aces === CONSTANTS.MAX_ACE_PER_CARD) {
            return;
        }

        
        if (_rank !== GetAceCardIndex()) {
            _rank += 1;
            
            //if the card rank === "A" then cards ace will increase
            if (_rank === GetAceCardIndex()) {
                _aces += 1;
            }
        }
        
        console.log(_rank, GetAceCardIndex())
        const _card = {
            suit: suit,
            rank: _rank,
            aces: _aces,
        }

        //update the cards array in parent component
        updateCards(cardIndex, _card)
    }

    const onRetry = () => { }

    const onBolt = () => { }

    const onDecrease = () => { }
    
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
                                    <button className={classes.__btn__} onClick={onRetry}>
                                        <Replace style={{height: 'auto'}} size={39}/>
                                    </button>

                                    <button className={classes.__btn__} onClick={onBolt}>
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
    cardIndex: PropTypes.number
}

export default GameCard
