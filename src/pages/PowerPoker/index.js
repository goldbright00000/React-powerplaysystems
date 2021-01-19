import React, {useState, useEffect} from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import {redirectTo, getRandomCard, royalFlush} from '../../utility/shared'
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
import {
    resetPowerPokersCardState,
    powerPokersGameInventory
} from '../../actions/powerPokerActions'
import { isEmpty, isEqual } from 'lodash'
import classes from './pokerHands.module.scss'

const INITIAL_STATE = {
    collectedCards: [{}, {}, {}, {}, {}],
    activeCard: {}
}
const TOTAL_ROUNDS = 3;
const TOTAL_CARDS = 5;
const MAX_ROUND_TIME = 5;
const MAX_RESET_BTN_COUNT_DOWN = 0;
const REPLACE_ALL_SPEED_TIME = 1;
let _round = 1;
let _currentCard = 0;
const cardsArr = [{}, {}, {}, {}, {}]
let time = MAX_ROUND_TIME;
let resetAllBtnTime = MAX_RESET_BTN_COUNT_DOWN;
let twoPairCount = 0;

function PowerRoyalsGame(props) {
    const [cardsState, setCardsState] = useState(INITIAL_STATE)
    const [count, setCount] = useState(MAX_ROUND_TIME)
    const [currentRound, setCurrentRound] = useState(_round)
    const [currentCard, setCurrentCard] = useState(_currentCard)
    const [resetBtnCountDown, setResetBtnCountDown] = useState(MAX_RESET_BTN_COUNT_DOWN)
    const [showResetTimer, setResetTimerState] = useState(false)
    const [isReplaceAll, setIsReplaceAllState] = useState(false)
    const [isGameCompleted, setGameCompleted] = useState(false)
    const [selectedRoundCard, setSelectedRoundCard] = useState()

    const dispatch = useDispatch();
    const {inventory = {}} = useSelector(state => state.powerPoker)

    const {
        replace = 0, replaceAll = 0, newHands = 0,
        powerMatch = 0, increaseOrDecrease = 0
    } = inventory || {}
    
    useEffect(() => {
        dispatch(resetPowerPokersCardState())
        resetGameState()

        return () => resetGameState()
    }, [])

    useEffect(() => {
        let timeOut = gameStart();
        
        return function cleanup() {
            return clearInterval(timeOut)
        }
    }, [currentCard, currentRound])

    const gameStart = () => {
        let timeOut = null
        if (_currentCard < TOTAL_CARDS) {
            if (!isReplaceAll)
                time = MAX_ROUND_TIME;
            else
                time = REPLACE_ALL_SPEED_TIME
            setResetTimerState(false)
            timeOut = setInterval(() => {
                if (time !== 0) {
                    time--;
                    setCount(time)
                } else {
                    if (!isReplaceAll)
                        time = MAX_ROUND_TIME;
                    else
                        time = REPLACE_ALL_SPEED_TIME
                    setCount(time)

                    _currentCard += 1;
                    setCurrentCard(_currentCard)
                    updateCardState()

                    if (currentCard >= TOTAL_CARDS) setIsReplaceAllState(false)
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

    const resetGameState = () => {
        for (let i = 0; i < 5; i++) {
            cardsArr[i] = {}
        }

        resetAllBtnTime = MAX_RESET_BTN_COUNT_DOWN
        _currentCard = 0;
        twoPairCount = 0;
        setCardsState(INITIAL_STATE)
        setCurrentCard(_currentCard)
        setCount(MAX_ROUND_TIME)
        setResetBtnCountDown(MAX_RESET_BTN_COUNT_DOWN)
        setResetTimerState(false)
        setSelectedRoundCard(null)
        setIsReplaceAllState(false)
    }

    const updateCardState = () => {
        let card = getRandomCard()

        if (isEmpty(selectedRoundCard) && _currentCard === 1) {
            setSelectedRoundCard(card)
        }

        cardsArr[currentCard] = card

        challengeCompleted(card)

        setCardsState({ ...cardsState, collectedCards: cardsArr, activeCard: card })
        gameCompleted(card)
    }

    const _redirectTo = (path = '/') => {
        redirectTo(props, {path})
    }

    const challengeCompleted = (card) => {
        if (isFlush(card)) {
            //fluch completed
        } else if (isRoyalFlush()) {
            //Royal flush completed
        } else if (isStraight()) {
            //Straight Completed
        } else if (isThreeOfAKind(card)) {
            //three of a kind compeleted
        } else if (isPair(card)) {
            //Pair completed
        } else if (isHighiest(card)) {
            //Highiest completed
        } else if (isFullHouse(card)) {
            //Full House Completed
        } else if (isAnyOfAKind(card)) {
            //Any of a kind completed
        } else if (isTwoPair()) {
            //Two Pair
            console.log('pair: ',isTwoPair())
        }
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

        dispatch(powerPokersGameInventory(_inventory))
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

    const onIncrease = (card, cardIndex) => {
        const { rank = 0, suit = 0 } = card || {}
        let _increaseOrDecrease = increaseOrDecrease

        if (increaseOrDecrease <= 0) {
            return
        }
        
        _increaseOrDecrease -= 1;

        let _rank = rank
        if(CONSTANTS.CARD_RANKS[_rank] !== "A") {
            _rank += 1;
        }
        
        const newCard = {
            suit: suit,
            rank: _rank
        }
        cardsArr[cardIndex] = newCard

        challengeCompleted(newCard)
        
        setCardsState({...cardsState, collectedCards: cardsArr, activeCard: newCard})
        updateInventory(_increaseOrDecrease, CONSTANTS.CARD_POP_ACTIONS.INCREASE)
        gameCompleted(newCard)
    }

    const onDecrease = (card, cardIndex) => {
        const { rank = 0, suit = 0 } = card || {}
        let _increaseOrDecrease = increaseOrDecrease

        if (increaseOrDecrease <= 0) {
            return
        }

        _increaseOrDecrease -= 1

        let _rank = rank
        if(CONSTANTS.CARD_RANKS[_rank] !== "2") {
            _rank -= 1;
        }
        
        const newCard = {
            suit: suit,
            rank: _rank
        }
        cardsArr[cardIndex] = newCard

        challengeCompleted(newCard)
        
        setCardsState({...cardsState, collectedCards: cardsArr, activeCard: newCard})
        updateInventory(_increaseOrDecrease, CONSTANTS.CARD_POP_ACTIONS.INCREASE)
        gameCompleted(newCard)
    }

    const onReplace = (card, cardIndex) => {
        let _replace = replace
        if (replace <= 0) {
            return
        }

        _replace -= 1

        let newCard = getRandomCard();
        
        if (currentCard === 1 && card === cardsState?.activeCard) {
            setSelectedRoundCard(newCard)
        }
        
        cardsArr[cardIndex] = newCard
        challengeCompleted(newCard)
        
        setCardsState({ ...cardsState, collectedCards: cardsArr, activeCard: newCard })
        updateInventory(_replace, CONSTANTS.CARD_POP_ACTIONS.REPLACE)
        gameCompleted(newCard)
    }

    const gameCompleted = (card) => {
        // if (hasCardAlreadyExistInArray(card)) return setGameCompleted(true)
        
        return setGameCompleted(false)
    }

    const hasCardAlreadyExistInArray = (card) => {
        const alreadyExistsCard = cardsArr?.filter(c => c?.rank === card?.rank);
        if (alreadyExistsCard?.length > 2) {
            return true
        }

        return false
    }

    const isRoyalFlush = () => {
        //A, K, Q, J, 10, all the same suit.
        const _royalFlush = royalFlush(selectedRoundCard ? selectedRoundCard?.suit : cardsArr[0]?.suit)
        if (isEqual(cardsArr, _royalFlush)) {
            return true;
        }
        return false
    }

    const isStraightFlush = () => {
        //Five cards in a sequence, but not of the same suit.
    }

    const isFullHouse = (card) => {
        //Three of a kind with a pair.
        const cards = cardsArr?.filter(c => c?.rank === card?.rank);
        if (cards?.length === 3) {
            return true
        }

        return false
    }

    const isFlush = (card) => {
        //Any five cards of the same suit, but not in a sequence.
        const cards = cardsArr?.filter(c => c?.suit === card?.suit);
        if (cards?.length === 5) {
            return true;
        }

        return false;
    }

    const isStraight = () => {
        //Five cards in a sequence, all in the same suit.
    }

    const isThreeOfAKind = (card) => {
        //Three cards of the same rank.
    }

    const isTwoPair = () => {
        const reduce = cardsArr?.reduce((preVal, currentVal) => {
            // console.log(preVal, currentVal)
            if (preVal !== undefined) {
                preVal[currentVal?.rank] = (preVal[currentVal?.rank] || 0) + 1
                return preVal
            }
        }, {})

        console.log(reduce)

        // Object.entries(reduce).forEach((val) => {
        //     console.log(val)
            // if (val % 2 === 0) {
            //     // console.log('Mod')
            //     twoPairCount++;
            // }
        // })
        return true
    }

    const isPair = (card) => {
        //Two cards of the same rank.
        const cardPair = cardsArr?.filter(c => c?.rank === card?.rank);
        if (cardPair?.length === 2) {
            return true
        }

        return false
    }

    const isHighiest = (card) => {
        const highiestValue = Math.max.apply(Math, cardsArr?.map(card => card?.rank));

        return highiestValue;
    }

    const isAnyOfAKind = (card) => {
        const cards = cardsArr?.filter(c => c?.rank === card?.rank)
        switch (cards?.length) {
            case 3:
                //Three cards of the same rank.
                return true
            
            case 4:
                //All four cards of the same rank.
                return true
        }

        return false
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
                                Welcome to <span>Power Poker!</span> If you can get a red card royal flush followed by a black card royal flush, you win!
                            </p>
                        </div>
                        <CardsSvg style={{display: 'flex', height: 'auto'}}/>
                        <p className={classes.__card_game_card_counter}>
                            Card <span>{currentCard}</span> of {TOTAL_CARDS}
                        </p>
                        <p className={classes.__card_game_round_counter}>
                            Hand <span>{currentRound}</span> of {TOTAL_ROUNDS}
                        </p>
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
                            <div className={`${classes.__card_game_content_cards}`}>
                                {cardsState?.collectedCards?.map((c, index) => (
                                    isEmpty(c) ?
                                        <GameCard key={index + ''}
                                            isCompleted={false}
                                            showCardPopu={false}
                                            isSelected={false}
                                            activeCard={null}
                                            showCardPopup={false}
                                            time={0}
                                            showIncrementOrDecrementPower={false}
                                            showPowerMatchPower={false}
                                            showReplacePower={false}
                                            onDecrease={() => { }}
                                            onReplace={() => { }}
                                            onPowerMatch={() => { }}
                                            onIncrease={() => { }}
                                        />
                                        :
                                        <GameCard
                                            key={index + ''}
                                            showCardPopup={!isReplaceAll && true}
                                            isCompleted={false}
                                            card={cardsState?.collectedCards?.[index]}
                                            isSelected={cardsState?.collectedCards?.[index] && true}
                                            activeCard={cardsState?.activeCard}
                                            time={time}
                                            inventory={inventory}
                                            showIncrementOrDecrementPower={increaseOrDecrease > 0}
                                            showPowerMatchPower={false}
                                            showReplacePower={replace > 0}
                                            onDecrease={() => onDecrease(cardsState?.collectedCards?.[index], index)}
                                            onReplace={() => onReplace(cardsState?.collectedCards?.[index], index)}
                                            onPowerMatch={() => { }}
                                            onIncrease={() => onIncrease(cardsState?.collectedCards?.[index], index)}
                                        /> 
                                    ))}
                            </div> 
                        </Card>

                        {
                            currentCard === 0 && time > 0 &&
                                <>
                                    <br />
                                    <Alert renderMsg={() => <p>Get Ready! Your game is about start.</p>} primary />
                                </>
                        }
                        
                        {
                            isGameCompleted &&
                                <>
                                    <br />
                                    <Alert renderMsg={() => <p>You won the game!</p>} success />
                                </>
                        }
                    </div>
                </div>

                <Sidebar>
                    <div className={classes.__sidebar_header}>
                        <span className={classes.__sidebar_header_title}>My Powers</span>
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
                            title="Power Up/Down"
                            toolText={`${increaseOrDecrease} left`}
                            icon={<PlusMinus style={{height: 'auto'}}/>}
                        />
                    </div>
                </Sidebar>
            </div>
            <Footer isBlack/>
        </>
    )
}

export default withRouter(PowerRoyalsGame)