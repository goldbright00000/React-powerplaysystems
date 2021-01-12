import React, {useState, useEffect} from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {hasPowerRoyalsCard, redirectTo} from '../../utility/shared'
import Card from '../../components/Card'
import GameCard from '../../components/GameCard'
import Header from '../../components/Header/Header'
import PageHeader from '../../components/PageHeader'
import ProgressBar from '../../components/Progress'
import Footer from '../../components/Footer/Footer'
import Alert from '../../components/Alert'
import Reload from '../../icons/Reload'
import BoltIcon from '../../assets/bolt.png'
import CardsSvg from '../../icons/Cards'
import Sidebar from '../../components/Sidebar'
import SidebarButton from '../../components/SidebarButton'
import Replace from '../../icons/Replace'
import PlusMinus from '../../icons/PlusAndMinus'
import { CONSTANTS } from '../../utility/constants'
import { getRandomCard } from '../../utility/shared'
import { setPowerCardState, resetPowerRoyalsCardState, powerRoyalsGameInventory } from '../../actions/powerRoyalsActions'
import classes from './cardGamePage.module.scss'

const TOTAL_ROUNDS = 2;
const TOTAL_CARDS = 5;
const MAX_ROUND_TIME = 5;
const MAX_RESET_BTN_COUNT_DOWN = 0;
const REPLACE_ALL_SPEED_TIME = 1;
let _round = 1;
let _currentCard = 0;
const cardsArr = []
const powerCards = []
let time = MAX_ROUND_TIME;
let resetAllBtnTime = MAX_RESET_BTN_COUNT_DOWN;

function CardGame(props) {
    const [cardsState, setCardsState] = useState({})
    const [count, setCount] = useState(MAX_ROUND_TIME)
    const [currentRound, setCurrentRound] = useState(_round)
    const [currentCard, setCurrentCard] = useState(_currentCard)
    const [resetBtnCountDown, setResetBtnCountDown] = useState(MAX_RESET_BTN_COUNT_DOWN)
    const [showResetTimer, setResetTimerState] = useState(false)
    const [isReplaceAll, setIsReplaceAllState] = useState(false)

    const dispatch = useDispatch();
    const { collectedCards = [],
        inventory = {}
    } = useSelector(state => state.powerRoyals)

    const { replace = 0, replaceAll = 0, newHands = 0, powerMatch = 0, increaseOrDecrease = 0 } = inventory || {}
    
    useEffect(() => { 
        dispatch(resetPowerRoyalsCardState())
        resetGameState()

        return () => resetGameState()
    }, [])

    useEffect(() => {
        let timeOut = gameStart();
        
        return function clearnup() {
            return clearInterval(timeOut)
        }
    }, [currentCard, currentRound])

    const gameStart = () => {
        let timeOut = null
        if (_currentCard < TOTAL_CARDS) {
            if(!isReplaceAll)
                time = MAX_ROUND_TIME;
            else
                time = REPLACE_ALL_SPEED_TIME
            setResetTimerState(false)
            timeOut = setInterval(() => {
                if (time !== 0) {
                    time--;
                    setCount(time)
                } else {
                    if(!isReplaceAll)
                        time = MAX_ROUND_TIME;
                    else
                        time = REPLACE_ALL_SPEED_TIME
                    setCount(time)

                    _currentCard += 1;
                    setCurrentCard(_currentCard)
                    updateCardState()
                    if(currentCard >= TOTAL_CARDS) setIsReplaceAllState(false)
                }
            }, 1000)
        } else {
            resetAllBtnTime = MAX_RESET_BTN_COUNT_DOWN
            timeOut = setInterval(() => {
                setIsReplaceAllState(false)
                if (time !== 0) {
                    time--;
                    setCount(time)
                } else {
                    if (currentRound < TOTAL_ROUNDS) {
                        setResetTimerState(true)
                        if (resetAllBtnTime !== 0) {
                            resetAllBtnTime--;
                            setResetBtnCountDown(resetAllBtnTime)
                        } else {
                            _round += 1;
                            setCurrentRound(_round)
                            setCurrentCard(0)
                            resetGameState()
                            resetAllBtnTime = MAX_RESET_BTN_COUNT_DOWN
                            setResetBtnCountDown(resetAllBtnTime)
                            setResetTimerState(false)
                        }
                    } else {
                        setResetTimerState(false)
                        setIsReplaceAllState(false)
                        clearInterval(timeOut)
                    }
                }
            }, 1000)
        }

        return timeOut
    }

    const resetList = (list = []) => {
        while (list?.length > 0) {
            list.pop()
        }
    }

    const resetGameState = () => {
        resetList(cardsArr)
        resetList(powerCards)

        resetAllBtnTime = MAX_RESET_BTN_COUNT_DOWN
        _currentCard = 0;
        setCardsState({})
        setCurrentCard(_currentCard)
        setCount(MAX_ROUND_TIME)
        setResetBtnCountDown(MAX_RESET_BTN_COUNT_DOWN)
        setResetTimerState(false)
        setIsReplaceAllState(false)
        dispatch(setPowerCardState([]))
    }

    const updateCardState = () => {
        let card = getRandomCard()
        
        getTargetCard(card)
        cardsArr.push(card)

        setCardsState({...cardsState, collectedCards: cardsArr, activeCard: card})
    }

    const getTargetCard = (card) => {
        const { suit = 0 } = card || {}
        switch (suit) {
            case CONSTANTS.CARD_SUITS.HEART:
                if ( currentRound === 1 && hasPowerRoyalsCard(card, CONSTANTS.CARD_SUITS.HEART)) {
                    powerCards.push(card)
                    dispatch(setPowerCardState(powerCards))
                    return card;
                }
                break;
            
            case CONSTANTS.CARD_SUITS.SPADE:
                if (currentRound === 2 && hasPowerRoyalsCard(card, CONSTANTS.CARD_SUITS.SPADE)) {
                    powerCards.push(card)
                    dispatch(setPowerCardState(powerCards))
                    return card;
                }
                break;
        }

        return null
    }

    const _redirectTo = (path = '/') => {
        redirectTo(props, {path})
    }

    const updateInventory = (inventoryValue, actionType) => {
        const _inventory = inventory;

        switch (actionType) {
            case CONSTANTS.CARD_POP_ACTIONS.INCREASE:
                _inventory.increaseOrDecrease = inventoryValue
                break
            
            case CONSTANTS.CARD_POP_ACTIONS.POWER_MATCH:
                _inventory.powerMatch = inventoryValue
                break;
            
            case CONSTANTS.CARD_POP_ACTIONS.REPLACE:
                _inventory.replace = inventoryValue
                break;
            
            case CONSTANTS.CARD_POP_ACTIONS.NEW_HAND:
                _inventory.newHands = inventoryValue
                break;
        }

        dispatch(powerRoyalsGameInventory(_inventory))
    }

    
    const onReplaceAll = () => {
        let _newHands = newHands
        if (_newHands <= 0) return

        _newHands -= 1
        updateInventory(_newHands, CONSTANTS.CARD_POP_ACTIONS.NEW_HAND)
        resetGameState()
        setIsReplaceAllState(true)
        setCount(REPLACE_ALL_SPEED_TIME)
        time = REPLACE_ALL_SPEED_TIME
    }

    const isCardCompleted = (card) => {
        return (hasPowerRoyalsCard(card, currentRound === 1 ? CONSTANTS.CARD_SUITS.HEART : CONSTANTS.CARD_SUITS.SPADE)
        && card?.rank === CONSTANTS.POWER_ROYALS.TENS)
    }

    const hasCardCollected = (card) => {
        return collectedCards?.filter(c => c?.rank === card?.rank)[0]
    }

    const onIncrease = (card, cardIndex) => {
        const { rank = 0, suit = 0 } = card || {}
        let _increaseOrDecrease = increaseOrDecrease

        if (increaseOrDecrease <= 0) {
            return
        }

        switch (currentRound) {
            case 1:
                let _rank = rank
                if (CONSTANTS.CARD_RANKS[_rank] !== "A" && hasCardCollected(card)) {
                    _rank = hasCardCollected(card)?.rank
                    _rank += 1;
                } else if(CONSTANTS.CARD_RANKS[_rank] !== "A") {
                    _rank += 1;
                }

                const newCard = {
                    suit: suit,
                    rank: _rank
                }
                cardsArr[cardIndex] = newCard
                setCardsState({...cardsState, collectedCards: cardsArr, activeCard: newCard})
                
                // if (hasPowerRoyalsCard(card, CONSTANTS.CARD_SUITS.HEART)) {
                //     dispatch(setPowerCardState())
                // }
                break;
            
            case 2:
                if (hasPowerRoyalsCard(card, CONSTANTS.CARD_SUITS.SPADE)) {
                    const _collectedCards = [...cardsState?.collectedCards]
                    _collectedCards[cardIndex] = hasPowerRoyalsCard(card, CONSTANTS.CARD_SUITS.SPADE)
                    dispatch(setPowerCardState(_collectedCards))
                }
                break;
        }

        updateInventory(_increaseOrDecrease, CONSTANTS.CARD_POP_ACTIONS.INCREASE)
    }

    const onPowerMatch = (card, cardIndex) => {
        if (powerMatch <= 0) {
            return
        }

        const powerCard = {
            suit: currentRound === 1 ? CONSTANTS.CARD_SUITS.HEART : CONSTANTS.CARD_SUITS.SPADE,
            rank: card?.rank
        }

        if (powerCards?.length) {
            //cards exists in power royals array
            for (let i = 0; i < powerCards?.length - 1; i++) {
                if (hasCardCollected(powerCards[i])) {
                    let _powerCard = powerCards[i]
                    if (CONSTANTS.CARD_RANKS[_powerCard?.rank] === CONSTANTS.POWER_ROYALS.TENS) {
                        powerCard.rank = CONSTANTS.CARD_RANKS[CONSTANTS.CARD_RANKS_INDEXES.JACK]
                        break
                    }
                    if (CONSTANTS.CARD_RANKS[_powerCard?.rank] === CONSTANTS.POWER_ROYALS.JACK) {
                        powerCard.rank = CONSTANTS.CARD_RANKS[CONSTANTS.CARD_RANKS_INDEXES.QUEEN]
                        break
                    }
                    if (CONSTANTS.CARD_RANKS[_powerCard?.rank] === CONSTANTS.POWER_ROYALS.QUEEN) {
                        powerCard.rank = CONSTANTS.CARD_RANKS[CONSTANTS.CARD_RANKS_INDEXES.KING]
                        break
                    }
                    if (CONSTANTS.CARD_RANKS[_powerCard?.rank] === CONSTANTS.POWER_ROYALS.KING) {
                        powerCard.rank = CONSTANTS.CARD_RANKS[CONSTANTS.CARD_RANKS_INDEXES.ACE]
                        break
                    }
                } else {
                    powerCard.rank = CONSTANTS.CARD_RANKS[CONSTANTS.CARD_RANKS_INDEXES.TENS]
                    break
                }
            }
        } else {
            powerCard.rank = CONSTANTS.CARD_RANKS[CONSTANTS.CARD_RANKS_INDEXES.TENS]
        }

        console.log(powerCard)

    }

    const getPowerMatchCard = (newSuit, newRank, cardIndex) => {
        const newCard = {
            suit: newSuit,
            rank: newRank
        }
        cardsArr[cardIndex] = newCard
        powerCards.push(newCard)
        setCardsState({...cardsState, collectedCards: cardsArr, activeCard: newCard})
    }

    return (
        <>
            <Header/>
            <div className={classes.__card_game_content}>
                <div className={classes.__card_game_content_left}>
                    <PageHeader title="Power Royals" seconds={6}/>
                    <div className={classes._card_game_content_top}>
                        <div className={classes._card_game_content_header_text}>
                            <p>
                                Welcome to <span>Power Royals!</span> If you can get a red card royal flush followed by a black card royal flush, you win!
                            </p>
                        </div>
                        <CardsSvg style={{display: 'flex', height: 'auto'}}/>
                        <p className={classes.__card_game_card_counter}>Card <span>{currentCard}</span> of {TOTAL_CARDS}
                        </p>
                        <p className={classes.__card_game_round_counter}>Hand <span>{currentRound}</span> of { TOTAL_ROUNDS }</p>
                        <span className={classes.__card_divider} />
                        <p className={classes.__card_game_Next_card_drawn_in}>Next card drawn in</p>
                        <ProgressBar
                            progress={count}
                            maxProgress={5}
                            size={62}
                            strokeWidth={4}
                            circleOneStroke='grey'
                            circleTwoStroke='#fff'/>
                    </div>

                    <div className={classes.__card_game_content_body}>
                        <Card>
                            <div className={classes.__card_game_content_cards}>
                                <GameCard
                                    showCardPopup={!isReplaceAll && true}
                                    isCompleted={isCardCompleted(cardsState?.collectedCards?.[currentCard])}
                                    card={cardsState?.collectedCards?.[0]}
                                    isSelected={cardsState?.collectedCards?.[0] && true}
                                    activeCard={cardsState?.activeCard}
                                    time={time}
                                    inventory={inventory}
                                    showIncrementOrDecrementPower={increaseOrDecrease > 0}
                                    showPowerMatchPower={powerMatch > 0}
                                    onPowerMatch={() => onPowerMatch(cardsState?.collectedCards?.[currentCard], currentCard)}
                                    onIncrease={() => onIncrease(cardsState?.collectedCards?.[currentCard], currentCard)}
                                />
                                <GameCard
                                    showCardPopup={!isReplaceAll && true}
                                    card={cardsState?.collectedCards?.[1]}
                                    isCompleted={isCardCompleted(cardsState?.collectedCards?.[1])}
                                    isSelected={cardsState?.collectedCards?.[1] && true}
                                    activeCard={cardsState?.activeCard}
                                    time={time}
                                    inventory={inventory}
                                    showIncrementOrDecrementPower={increaseOrDecrease > 0}
                                    showPowerMatchPower={powerMatch > 0}
                                    onPowerMatch={() => onPowerMatch(cardsState?.collectedCards?.[currentCard], currentCard)}
                                    onIncrease={() => onIncrease(cardsState?.collectedCards?.[currentCard], currentCard)}
                                />
                                <GameCard
                                    showCardPopup={!isReplaceAll && true}
                                    card={cardsState?.collectedCards?.[2]}
                                    isCompleted={isCardCompleted(cardsState?.collectedCards?.[2])}
                                    isSelected={cardsState?.collectedCards?.[2] && true}
                                    activeCard={cardsState?.activeCard}
                                    time={time}
                                    inventory={inventory}
                                    showIncrementOrDecrementPower={increaseOrDecrease > 0}
                                    showPowerMatchPower={powerMatch > 0}
                                    onPowerMatch={() => onPowerMatch(cardsState?.collectedCards?.[currentCard], currentCard)}
                                    onIncrease={() => onIncrease(cardsState?.collectedCards?.[currentCard], currentCard)}
                                />
                                <GameCard
                                    showCardPopup={!isReplaceAll && true}
                                    card={cardsState?.collectedCards?.[3]}
                                    isCompleted={isCardCompleted(cardsState?.collectedCards?.[3])}
                                    isSelected={cardsState?.collectedCards?.[3] && true}
                                    activeCard={cardsState?.activeCard}
                                    time={time}
                                    inventory={inventory}
                                    showIncrementOrDecrementPower={increaseOrDecrease > 0}
                                    showPowerMatchPower={powerMatch > 0}
                                    onPowerMatch={() => onPowerMatch(cardsState?.collectedCards?.[currentCard], currentCard)}
                                    onIncrease={() => onIncrease(cardsState?.collectedCards?.[currentCard], currentCard)}
                                />
                                <GameCard
                                    showCardPopup={!isReplaceAll && true}
                                    card={cardsState?.collectedCards?.[4]}
                                    isCompleted={isCardCompleted(cardsState?.collectedCards?.[4])}
                                    isSelected={cardsState?.collectedCards?.[4] && true}
                                    activeCard={cardsState?.activeCard}
                                    time={time}
                                    inventory={inventory}
                                    showIncrementOrDecrementPower={increaseOrDecrease > 0}
                                    showPowerMatchPower={powerMatch > 0}
                                    onPowerMatch={() => onPowerMatch(cardsState?.collectedCards?.[currentCard], currentCard)}
                                    onIncrease={() => onIncrease(cardsState?.collectedCards?.[currentCard], currentCard)}
                                />
                            </div>
                            {/* <button className={`${classes.__reload_btn} ${showResetTimer && classes.active}`} onClick={onReplaceAll}
                                disabled={!showResetTimer}
                            >
                                {
                                    showResetTimer &&
                                    <span style={{ position: 'absolute', top: '-15px', left: '50%', color: '#fff', transform: 'translateX(-50%)' }}>{ resetBtnCountDown }</span>

                                }
                                <Reload size={48} className={classes.__reload_svg_icon}/>
                            </button> */}
                        </Card>
                    </div>

                    {/* <div className={classes.__card_game_content_footer}>
                        {
                            getAceCards() >= CONSTANTS.MAX_ACE_CARDS ?
                                <>
                                    <Alert success renderMsg={() => (<p>Congratulations on <strong>{ getAceCards() || 0 }</strong> Aces!</p>)} />
                                    <button className={`__btn ${classes.__card_game_footer_btn}`}
                                        onClick={() => _redirectTo('/chase-a-card')}>
                                        Chase The Ace!
                                    </button>
                                </>
                                :
                                currentRound === TOTAL_ROUNDS && time <= 0 && cardsArr.length >= CONSTANTS.MAX_ACE_CARDS
                                    ?
                                    <Alert danger renderMsg={() => (<p>Sorry, you did not get 5 Aces. The next draw will be tomorrow at 8:00PM</p>)} />
                                    :
                                    <Alert primary renderMsg={() => (<p>Round { currentRound } in Progress: Aces = <strong>{getAceCards() || 0}</strong></p>)} />
                        }
                    </div> */}
                </div>

                <Sidebar>
                    <div className={classes.__sidebar_header}>
                        <span className={classes.__sidebar_header_title}>My Powers</span>
                        <div className={classes.__sidebar_header_balance}>
                            <span>My Balance</span>
                            <span className={classes.__sidebar_balance_text}>$0.00</span>
                        </div>
                    </div>

                    <div className={classes.__sidebar_button_wrapper}>
                        <SidebarButton
                            success={replace > 0 ? true : false}
                            primary={replace <= 0 ? true : false}
                            title="Power Card"
                            toolText={`${replace} left`}
                            icon={<Replace style={{ height: 'auto' }} />}
                        />

                        <SidebarButton
                            success={newHands > 0 ? true : false}
                            primary={newHands <= 0 ? true : false}
                            title="Power Hand"
                            toolText={`${newHands} left`}
                            icon={<div
                                className={classes.__sidebar_reload_btn}>
                                <Reload bgColor={"#0ff"} style={{height: 'auto'}}/>
                            </div>}
                        />

                        <SidebarButton
                            success={powerMatch > 0 ? true : false}
                            primary={powerMatch <= 0 ? true : false}
                            title="Power Match"
                            toolText={`${powerMatch} left`}
                            icon={<img src={BoltIcon} width={53} height={53} alt={''}/>}
                        />

                        <SidebarButton
                            success={increaseOrDecrease > 0 ? true : false}
                            primary={increaseOrDecrease <= 0 ? true : false}
                            title="Power Move"
                            toolText={`${increaseOrDecrease} left`}
                            icon={<PlusMinus style={{height: 'auto'}}/>}
                        />

                        {/* <SidebarButton
                            primary
                            title="Decrease"
                            toolText="$.25"
                            icon={<ArrowDown style={{height: 'auto'}}/>}
                        /> */}
                    </div>
                </Sidebar>
            </div>
            <Footer isBlack/>
        </>
    )
}

CardGame.propTypes = {}

export default withRouter(CardGame)

