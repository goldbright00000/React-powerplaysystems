import React, {useState, useEffect} from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {GetAceCardIndex, hasMaxAceCards, redirectTo} from '../../utility/shared'
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
import { IsAceCard, getRandomCard } from '../../utility/shared'
import { setCardState, resetCardState, cardGameInventory } from '../../actions/cardGameAction'
import classes from './cardGamePage.module.scss'

const TOTAL_ROUNDS = 5;
const TOTAL_CARDS = 5;
const MAX_ROUND_TIME = 5;
const MAX_RESET_BTN_COUNT_DOWN = 0;
const REPLACE_ALL_SPEED_TIME = 1;
let _round = 1;
let _currentCard = 0;
const cardsArr = []
const aceCardsArr = []
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
    const { collectedAceCards = [],
        inventory = {}
    } = useSelector(state => state.cardGame)

    const { replace = 0, replaceAll = 0, powerMatch = 0, increaseOrDecrease = 0 } = inventory || {}
    
    useEffect(() => { 
        dispatch(resetCardState())
        resetGameState()

        return () => resetGameState()
    }, [])

    useEffect(() => {
        let timeOut = gameStart();
        gameCompleted(timeOut);
        
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
                gameCompleted(timeOut)
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
                gameCompleted(timeOut)
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
                            resetList(aceCardsArr)
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
        resetList(aceCardsArr)

        resetAllBtnTime = MAX_RESET_BTN_COUNT_DOWN
        _currentCard = 0;
        setCardsState({})
        setCurrentCard(_currentCard)
        setCount(MAX_ROUND_TIME)
        setResetBtnCountDown(MAX_RESET_BTN_COUNT_DOWN)
        setResetTimerState(false)
        setIsReplaceAllState(false)
        dispatch(setCardState([]))
    }

    const updateCardState = () => {
        let card = getRandomCard()

        let isCardAceCompleted = updateAceCard(card)
        if (isCardAceCompleted) {
            //recursive call
            return updateCardState()
        }
        cardsArr.push(card)

        setCardsState({...cardsState, collectedCards: cardsArr, activeCard: card})
    }

    const updateAceCard = (card) => {
        if (IsAceCard(card)) {
            const _collectedAceCards = collectedAceCards;
            if (_collectedAceCards?.length && _collectedAceCards?.length > 0) {
                const _aceCardInfo = _collectedAceCards?.filter(_card => _card.suit === card.suit)[0]
                if (_aceCardInfo) {
                    const { suit = 0, aceCards = 0 } = _aceCardInfo || {}
                    let _aceCards = aceCards
                    if (_aceCards === CONSTANTS.MAX_ACE_PER_CARD) {
                        //ace cards for current suit is completed
                        //select random card
                        updateCardState()
                        return true;
                    } else {
                        _aceCards += 1;
                    }

                    const _aceCard = {
                        suit: suit,
                        aceCards: _aceCards,
                    }
                    let cardIndex = _collectedAceCards?.indexOf(_aceCardInfo)
                    aceCardsArr[cardIndex] = _aceCard
                    dispatch(setCardState(aceCardsArr))   
                } else {
                    const _aceCard = {
                        suit: card.suit,
                        aceCards: 1
                    }
    
                    aceCardsArr.push(_aceCard)
                    dispatch(setCardState(aceCardsArr))
                }
            } else {
                //no ace card is available in state
                //store new ace cards to state
                const _aceCard = {
                    suit: card.suit,
                    aceCards: 1
                }

                aceCardsArr.push(_aceCard)
                dispatch(setCardState(aceCardsArr))
            }
        }

        return false
    }

    const updateCards = (index, card) => {
        cardsArr[index] = card
        let isAceCompleted = updateAceCard(card)
        if (!isAceCompleted) {
            setCardsState({...cardsState, collectedCards: cardsArr, activeCard: card})
        }
    }

    const gameCompleted = (timeOut = setInterval(null, 0)) => {
        if (getAceCards() >= CONSTANTS.MAX_ACE_CARDS) {
            return clearTimeout(timeOut)
        }
    }

    const _redirectTo = (path = '/') => {
        redirectTo(props, {path})
    }

    const getAceCards = () => {
        let totalAces = 0;
        if (collectedAceCards.length) {
            totalAces = collectedAceCards?.reduce((c1, c2) => {
                return c1 + (c2['aceCards'] || 0)
            }, 0)
        }

        return totalAces;
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
            
            case CONSTANTS.CARD_POP_ACTIONS.REPLACE_ALL:
                _inventory.replaceAll = inventoryValue
                break;
        }

        dispatch(cardGameInventory(_inventory))
    }

    
    const onReplaceAll = () => {
        let _replaceAll = replaceAll
        
        if (_replaceAll <= 0) return

        _replaceAll -= 1
        updateInventory(_replaceAll, CONSTANTS.CARD_POP_ACTIONS.REPLACE_ALL)
        resetGameState()
        setIsReplaceAllState(true)
        setCount(REPLACE_ALL_SPEED_TIME)
        time = REPLACE_ALL_SPEED_TIME
    }

    const onIncrease = (cardIndex, card) => {
        const { suit = 0, rank = 0 } = card || {}
        let _rank = rank
        if (getMaxAceCardsForCardSuit(card) || increaseOrDecrease <= 0 || cardsState?.activeCard !== card) {
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

    const onReplace = (cardIndex, card) => {
        const { rank = 0 } = card || {}
        if (replace <= 0 || cardsState?.activeCard !== card)
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

    const onPowerMatch = (cardIndex, card) => {
        const { suit = 0 } = card || {}
        if (powerMatch <= 0 || getMaxAceCardsForCardSuit(card) || cardsState?.activeCard !== card) return

        let _powerMatch = powerMatch;
        _powerMatch -= 1;

        const _aceCard = {
            suit: suit,
            rank: GetAceCardIndex(),
        }

        updateCards(cardIndex, _aceCard)
        updateInventory(_powerMatch, CONSTANTS.CARD_POP_ACTIONS.POWER_MATCH)
    }

    const onDecrease = (cardIndex, card) => {
        const { suit = 0, rank = 0 } = card || {}
        let _rank = rank
        if (getMaxAceCardsForCardSuit(card) || increaseOrDecrease <= 0 || cardsState?.activeCard !== card) {
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

    const getMaxAceCardsForCardSuit = (card) => {
        const { suit = 0 } = card || {}
        const aceCard = collectedAceCards?.filter(_card => _card?.suit === suit)[0];
        const { aceCards = 0 } = aceCard || {}
        if (aceCards && hasMaxAceCards(aceCards)) {
            return true
        }

        return false
    }

    return (
        <>
            <Header/>
            <div className={classes.__card_game_content}>
                <div className={classes.__card_game_content_left}>
                    <PageHeader title="Chase The Ace"/>
                    <div className={classes._card_game_content_top}>
                        <div className={classes._card_game_content_header_text}>
                            <p>
                                Welcome to <span>Chase the Ace!</span> Your goal is to obtain 5 Aces in order to advance
                                to the next round! Find the Ace of Spades and win! User your <span>Powers</span> wisely!
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
                                    isCompleted={CONSTANTS.CARD_RANKS[cardsArr[0]?.rank] === "A"}
                                    card={cardsState?.collectedCards?.[0]}
                                    isSelected={cardsState?.collectedCards?.[0] && true}
                                    activeCard={cardsState?.activeCard}
                                    showPowerMatchPower={!getMaxAceCardsForCardSuit(cardsState?.collectedCards?.[0]) && powerMatch > 0}
                                    showReplacePower={replace > 0}
                                    showIncrementOrDecrementPower={increaseOrDecrease > 0}
                                    time={time}
                                    inventory={inventory}
                                    onIncrease={() => onIncrease(0, cardsState?.collectedCards?.[0])}
                                    onDecrease={() => onDecrease(0, cardsState?.collectedCards?.[0])}
                                    onPowerMatch={() => onPowerMatch(0, cardsState?.collectedCards?.[0])}
                                    onReplace={() => onReplace(0, cardsState?.collectedCards?.[0])}
                                />
                                <GameCard
                                    showCardPopup={!isReplaceAll && true}
                                    card={cardsState?.collectedCards?.[1]}
                                    isCompleted={CONSTANTS.CARD_RANKS[cardsArr[1]?.rank] === "A"}
                                    isSelected={cardsState?.collectedCards?.[1] && true}
                                    activeCard={cardsState?.activeCard}
                                    showPowerMatchPower={!getMaxAceCardsForCardSuit(cardsArr[1]) && powerMatch > 0}
                                    showReplacePower={replace > 0}
                                    showIncrementOrDecrementPower={increaseOrDecrease > 0}
                                    time={time}
                                    inventory={inventory}
                                    onIncrease={() => onIncrease(1, cardsState?.collectedCards?.[1])}
                                    onDecrease={() => onDecrease(1, cardsState?.collectedCards?.[1])}
                                    onPowerMatch={() => onPowerMatch(1, cardsState?.collectedCards?.[1])}
                                    onReplace={() => onReplace(1, cardsState?.collectedCards?.[1])}
                                />
                                <GameCard
                                    showCardPopup={!isReplaceAll && true}
                                    card={cardsState?.collectedCards?.[2]}
                                    isCompleted={CONSTANTS.CARD_RANKS[cardsArr[2]?.rank] === "A"}
                                    isSelected={cardsState?.collectedCards?.[2] && true}
                                    activeCard={cardsState?.activeCard}
                                    showPowerMatchPower={!getMaxAceCardsForCardSuit(cardsArr[2]) && powerMatch > 0}
                                    showReplacePower={replace > 0}
                                    showIncrementOrDecrementPower={increaseOrDecrease > 0}
                                    time={time}
                                    inventory={inventory}
                                    onIncrease={() => onIncrease(2, cardsState?.collectedCards?.[2])}
                                    onDecrease={() => onDecrease(2, cardsState?.collectedCards?.[2])}
                                    onPowerMatch={() => onPowerMatch(2, cardsState?.collectedCards?.[2])}
                                    onReplace={() => onReplace(2, cardsState?.collectedCards?.[2])}
                                />
                                <GameCard
                                    showCardPopup={!isReplaceAll && true}
                                    card={cardsState?.collectedCards?.[3]}
                                    isCompleted={CONSTANTS.CARD_RANKS[cardsArr[3]?.rank] === "A"}
                                    isSelected={cardsState?.collectedCards?.[3] && true}
                                    activeCard={cardsState?.activeCard}
                                    showPowerMatchPower={!getMaxAceCardsForCardSuit(cardsArr[3]) && powerMatch > 0}
                                    showReplacePower={replace > 0}
                                    showIncrementOrDecrementPower={increaseOrDecrease > 0}
                                    time={time}
                                    inventory={inventory}
                                    onIncrease={() => onIncrease(3, cardsState?.collectedCards?.[3])}
                                    onDecrease={() => onDecrease(3, cardsState?.collectedCards?.[3])}
                                    onPowerMatch={() => onPowerMatch(3, cardsState?.collectedCards?.[3])}
                                    onReplace={() => onReplace(3, cardsState?.collectedCards?.[3])}
                                />
                                <GameCard
                                    showCardPopup={!isReplaceAll && true}
                                    card={cardsState?.collectedCards?.[4]}
                                    isCompleted={CONSTANTS.CARD_RANKS[cardsArr[4]?.rank] === "A"}
                                    isSelected={cardsState?.collectedCards?.[4] && true}
                                    activeCard={cardsState?.activeCard}
                                    showPowerMatchPower={!getMaxAceCardsForCardSuit(cardsState?.activeCard) && powerMatch > 0}
                                    showReplacePower={replace > 0}
                                    showIncrementOrDecrementPower={increaseOrDecrease > 0}
                                    time={time}
                                    inventory={inventory}
                                    onIncrease={() => onIncrease(4, cardsState?.collectedCards?.[4])}
                                    onDecrease={() => onDecrease(4, cardsState?.collectedCards?.[4])}
                                    onPowerMatch={() => onPowerMatch(4, cardsState?.collectedCards?.[4])}
                                    onReplace={() => onReplace(4, cardsState?.collectedCards?.[4])}
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

                    <div className={classes.__card_game_content_footer}>
                        {
                            currentCard === 0 && time > 0 &&
                                <>
                                    <Alert renderMsg={() => <p>Get Ready! Your game is about start.</p>} primary />
                                </>
                        }
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
                    </div>
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

                        {/* <SidebarButton
                            success={replaceAll > 0 ? true : false}
                            primary={replaceAll <= 0 ? true : false}
                            title="Replace All"
                            toolText={`${replaceAll} left`}
                            icon={<div
                                className={classes.__sidebar_reload_btn}>
                                <Reload bgColor={"#0ff"} style={{height: 'auto'}}/>
                            </div>}
                        /> */}

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

