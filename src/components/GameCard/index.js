import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

import Replace from '../../icons/Replace'
import Plus from '../../icons/Plus'
import Minus from '../../icons/Minus'
import boltIcon from '../../assets/bolt.png'
import Tick from '../../icons/Tick'
import Cards from '../../icons/Cards/index'
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
        inventory: { replace = 0, powerMatch = 0, increaseOrDecrease = 0 } = {},
        activeCard = {},
        time = 0,
        width = 0,
        height = 0,
        hoverShadow = false,
        showPowerMatchPower = false,
        showReplacePower = false,
        showIncrementOrDecrementPower = false,
        onClick = () => { },
        onIncrease = () => { },
        onDecrease = () => { },
        onPowerMatch = () => { },
        onReplace = () => { }
    } = props || {}

    useEffect(() => {
        if (time <= 0) {
            setHasReplacedState(false)
            setPopupState(false)
        }
    }, [time])

    const _onReplace = () => { 
        setHasReplacedState(true)
    }

    return (
        <div className={`${classes.__game_card_wrapper} ${hoverShadow && classes.shadow}`} style={styles} {...props}>
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
                                        showReplacePower || showPowerMatchPower || showIncrementOrDecrementPower
                                            ?
                                            <>
                                                {
                                                    showReplacePower && !hasReplaced &&
                                                    <button className={classes.__btn__} onClick={() => {
                                                        onReplace()
                                                        _onReplace()
                                                    }}>
                                                        <Replace style={{height: 'auto'}} size={39}/>
                                                    </button>
                                                }    

                                                {
                                                    showPowerMatchPower &&
                                                    <button className={classes.__btn__} onClick={onPowerMatch}>
                                                        <img src={boltIcon} width={40} height={40}/>
                                                    </button>
                                                }

                                                {
                                                    showIncrementOrDecrementPower &&
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
    inventory: PropTypes.object,
    activeCard: PropTypes.object,
    showPowerMatchPower: PropTypes.bool,
    showReplacePower: PropTypes.bool,
    showIncrementOrDecrementPower: PropTypes.bool,
    time: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    hoverShadow: PropTypes.bool,
    onIncrease: PropTypes.func,
    onDecrease: PropTypes.func,
    onPowerMatch: PropTypes.func,
    onReplace: PropTypes.func
}

export default GameCard
