import React from 'react'
import PropTypes from 'prop-types'

import Shuffle from '../../icons/Shuffle'
import ArrowDown from '../../icons/ArrowDown'
import ArrowUp from '../../icons/ArrowUp'
import flashImg from '../../assets/flash.png'
import Tick from '../../icons/Tick'
import classes from "./gameCard.module.scss"

function GameCard(props) {

    const { isSelected = false,
        showPopup = false,
        isCompleted = false,
        image = '',
        styles = {},
        onClick = () => { }
    } = props || {}

    return (
        <div className={classes.__game_card_wrapper} style={styles} onClick={onClick}>
            {
                isCompleted &&
                <Tick style={{height: "auto",
                position: "absolute",
                alignSelf: "center",
                transform: `translate(25%, -25%)`}} />
            }
            {
            isSelected
                ?
                <div className={classes.__game_card_selected}>
                    <img src={image} style={{width: '100%', height: '100%'}} />
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
                                <Shuffle style={{ height: 'auto' }} size={39} />
                            </button>

                            <button className={classes.__btn__}>
                            <img src={flashImg} width={37} height={37} />
                            </button>
                            
                            <button className={classes.__btn__}>
                                <ArrowUp style={{ height: 'auto' }} size={39} />
                            </button>

                            <button className={classes.__btn__}>
                                <ArrowDown style={{ height: 'auto' }} size={39} />
                            </button>
                        </div>
                    </div>
            }
        </div>
    )
}

GameCard.propTypes = {
    isSelected: PropTypes.bool,
    showPopup: PropTypes.bool,
    isCompleted: PropTypes.bool,
    image: PropTypes.string,
    styles: PropTypes.object,
    onClick: PropTypes.func
}

export default GameCard
