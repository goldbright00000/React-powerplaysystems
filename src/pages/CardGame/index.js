import React, {useState, useEffect} from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {redirectTo} from '../../utility/shared'
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
import { IsAceCard } from '../../utility/shared'
import { setCardState, resetCardState, cardGameInventory } from '../../actions/cardGameAction'
import classes from './cardGamePage.module.scss'

const TOTAL_ROUNDS = 5;
const TOTAL_CARDS = 5;
const MAX_ROUND_TIME = 5;
const MAX_RESET_BTN_COUNT_DOWN = 5;
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

    const { replace = 0, replaceAll = 0, powerMatch = 0, increaseOrDecrease = 0, decrease = 0 } = inventory || {}
    
    useEffect(() => { 
        dispatch(resetCardState())
        resetGameState()
    }, [])

    useEffect(() => {
        let timeOut = countDownTimer();
        gameCompleted(timeOut);
        
        return () => clearInterval(timeOut)
    }, [currentCard, currentRound])

    const countDownTimer = () => {
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
        while (cardsArr?.length > 0) {
            cardsArr.pop();
        }

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

    const getRandomCard = () => {
        let card = {};
        let _cardSuit = Math.floor(Math.random() * (5 - 2) + 2)
        let _cardRankIndex = Math.floor(Math.random() * (13 - 2) + 2)
        
        card.suit = _cardSuit;
        card.rank = _cardRankIndex;

        return card
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

    return (
        <>
            <Header/>
            <div className={classes.__card_game_content}>
                <div className={classes.__card_game_content_left}>
                    <PageHeader title="Chase The Ace"/>
                    <div className={classes._card_game_content_top}>
                        <CardsSvg style={{display: 'flex', height: 'auto'}}/>
                        <p className={classes.__card_game_card_counter}>Card <span>{currentCard}</span> of {TOTAL_CARDS}
                        </p>
                        <p className={classes.__card_game_round_counter}>Round <span>{currentRound}</span> of { TOTAL_ROUNDS }</p>
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
                                    isSelected={cardsArr[0] && true}
                                    activeCard={cardsState?.activeCard}
                                    cardIndex={0}
                                    collectedAceCards={collectedAceCards}
                                    time={time}
                                    inventory={inventory}
                                    updateCards={updateCards}
                                    updateInventory={updateInventory}
                                    getRandomCard={getRandomCard}
                                />
                                <GameCard
                                    showCardPopup={!isReplaceAll && true}
                                    card={cardsState?.collectedCards?.[1]}
                                    isCompleted={CONSTANTS.CARD_RANKS[cardsArr[1]?.rank] === "A"}
                                    isSelected={cardsArr[1] && true}
                                    cardIndex={1}
                                    activeCard={cardsState?.activeCard}
                                    collectedAceCards={collectedAceCards}
                                    time={time}
                                    inventory={inventory}
                                    updateCards={updateCards}
                                    updateInventory={updateInventory}
                                    getRandomCard={getRandomCard}
                                />
                                <GameCard
                                    showCardPopup={!isReplaceAll && true}
                                    card={cardsState?.collectedCards?.[2]}
                                    isCompleted={CONSTANTS.CARD_RANKS[cardsArr[2]?.rank] === "A"}
                                    isSelected={cardsArr[2] && true}
                                    cardIndex={2}activeCard={cardsState?.activeCard}
                                    activeCard={cardsState?.activeCard}
                                    collectedAceCards={collectedAceCards}
                                    time={time}
                                    inventory={inventory}
                                    updateCards={updateCards}
                                    updateInventory={updateInventory}
                                    getRandomCard={getRandomCard}
                                />
                                <GameCard
                                    showCardPopup={!isReplaceAll && true}
                                    card={cardsState?.collectedCards?.[3]}
                                    isCompleted={CONSTANTS.CARD_RANKS[cardsArr[3]?.rank] === "A"}
                                    isSelected={cardsArr[3] && true}
                                    cardIndex={3}
                                    activeCard={cardsState?.activeCard}
                                    collectedAceCards={collectedAceCards}
                                    time={time}
                                    inventory={inventory}
                                    updateCards={updateCards}
                                    updateInventory={updateInventory}
                                    getRandomCard={getRandomCard}
                                />
                                <GameCard
                                    showCardPopup={!isReplaceAll && true}
                                    card={cardsState?.collectedCards?.[4]}
                                    isCompleted={CONSTANTS.CARD_RANKS[cardsArr[4]?.rank] === "A"}
                                    isSelected={cardsArr[4] && true}
                                    cardIndex={4}
                                    activeCard={cardsState?.activeCard}
                                    collectedAceCards={collectedAceCards}
                                    time={time}
                                    inventory={inventory}
                                    updateCards={updateCards}
                                    updateInventory={updateInventory}
                                    getRandomCard={getRandomCard}
                                />
                            </div>
                            <button className={`${classes.__reload_btn} ${showResetTimer && classes.active}`} onClick={onReplaceAll}
                                disabled={!showResetTimer}
                            >
                                {
                                    showResetTimer &&
                                    <span style={{ position: 'absolute', top: '-15px', left: '50%', color: '#fff', transform: 'translateX(-50%)' }}>{ resetBtnCountDown }</span>

                                }
                                <Reload size={48} className={classes.__reload_svg_icon}/>
                            </button>
                        </Card>
                    </div>

                    <div className={classes.__card_game_content_footer}>
                        {
                            getAceCards() >= CONSTANTS.MAX_ACE_CARDS ?
                                <>
                                    <Alert success collectedAce={getAceCards() || 0} />
                                    <button className={`__btn ${classes.__card_game_footer_btn}`}
                                        onClick={() => _redirectTo('/chase-a-card')}>
                                        Chase The Ace!
                                    </button>
                                </>
                                :
                                currentRound === TOTAL_ROUNDS && time <= 0 && cardsArr.length >= CONSTANTS.MAX_ACE_CARDS
                                    ?
                                    <Alert danger collectedAce={getAceCards() || 0} />
                                    :
                                    <Alert primary collectedAce={getAceCards() || 0} />
                        }
                    </div>
                </div>

                <Sidebar>
                    <div className={classes.__sidebar_header}>
                        <span className={classes.__sidebar_header_title}>My Powerplays</span>
                        <div className={classes.__sidebar_header_balance}>
                            <span>My Balance</span>
                            <span className={classes.__sidebar_balance_text}>$0.00</span>
                        </div>
                    </div>

                    <div className={classes.__sidebar_button_wrapper}>
                        <SidebarButton
                            success={replace > 0 ? true : false}
                            primary={replace <= 0 ? true : false}
                            title="Replace"
                            toolText={`${replace} left`}
                            icon={<Replace style={{height: 'auto'}}/>}
                        />

                        <SidebarButton
                            success={replaceAll > 0 ? true : false}
                            primary={replaceAll <= 0 ? true : false}
                            title="Replace All"
                            toolText={`${replaceAll} left`}
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
                            title="Increase"
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

