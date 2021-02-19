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
import PointsCollectedIcon from '../../assets/points-collected.png'
import PowerPlaySideBarIcon from '../../assets/token.png'
import CardsSvg from '../../icons/Cards'
import Sidebar from '../../components/Sidebar'
import SidebarButton from '../../components/SidebarButton'
import SidebarLockItem from '../../components/SidebarLockItem'
import Replace from '../../icons/Replace'
import PlusMinus from '../../icons/PlusAndMinus'
import NewCardLiteIcon from '../../assets/new_card_lite.png'
import BoltLiteIcon from '../../assets/bolt_lite.png'
import PlusMinusLiteIcon from '../../assets/plus_minus_lite.png'
import LockIcon from '../../assets/lock.png'
import FaceBookIcon from '../../assets/facebook_icon.png'
import TwitterIcon from '../../assets/twitter_icon.png'
import { CONSTANTS } from '../../utility/constants'
import { IsAceCard, getRandomCard } from '../../utility/shared'
import { setCardState, resetCardState, cardGameInventory } from '../../actions/cardGameAction'
import Button from '../../components/Button'
import Link from '../../components/Link'
import ShareButton from '../../components/ShareButton'
import PinnacleIcon from '../../assets/pinnacle.png'
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
    const [myPowers, setMyPowers] = useState(false);
    const [shareOptions, setShareOptions] = useState(false);
    const [unLockOptions, setUnlockOptions] = useState(true);
    const [start, setStart] = useState(false);

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
        if (start) {
            let timeOut = gameStart();
            gameCompleted(timeOut);
            
            return function clearnup() {
                return clearInterval(timeOut)
            }
        }
    }, [currentCard, currentRound, start])

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
                        setResetTimerState(false)
                        setIsReplaceAllState(false)
                        clearInterval(timeOut)
                        setStart(false);
                        resetGameState()
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

    // Hide/Show Sidebar Options
    const hideShowSideBarOptions = (myPower, shareOption, unLockOption) => {
        setMyPowers(myPower);
        setShareOptions(shareOption);
        setUnlockOptions(unLockOption);
    }

    const renderSideBarMyPowersSection = () => {
        return (
            <>
            <span className={classes.__sidebar_my_powers_title}>My Powers</span>
                <SidebarButton
                    success={replace > 0 ? true : false}
                    primary={replace <= 0 ? true : false}
                    title="New Card"
                    toolText={`5 left`}
                    icon={<Replace style={{ height: 'auto' }} />}
                />
                <SidebarButton
                    success={powerMatch > 0 ? true : false}
                    primary={powerMatch <= 0 ? true : false}
                    title="Power Match"
                    toolText={`5 left`}
                    icon={<img src={BoltIcon} width={53} height={53} alt={''}/>}
                />
                <SidebarButton
                    success={increaseOrDecrease > 0 ? true : false}
                    primary={increaseOrDecrease <= 0 ? true : false}
                    title="Increase/Decrease"
                    toolText={`5 left`}
                    icon={<PlusMinus style={{height: 'auto'}}/>}
                />
            </>
        );
    }

    const renderSideBarShareSection = () => {
        return (
            <>
                <span className={classes.__sidebar_power_title}>Power <span className={classes.__sidebar_up_title}>- Up!</span></span>
                <p className={classes.__sidebar_unlock_power_text}>
                    To unlock your Powers for this game, please select one of the following options:
                </p>
                <ShareButton 
                    title="Share on Facebook"
                    icon={<img src={FaceBookIcon} width={50} height={51} alt="" />}
                    styles={{"backgroundImage":"linear-gradient(to bottom, #4e70a9, #4a6da5)"}}
                    onClick={() => hideShowSideBarOptions(true, false, false)}
                />
                <ShareButton 
                    title="Share on Twitter"
                    icon={<img src={TwitterIcon} width={50} height={51} alt="" />}
                    styles={{"backgroundImage":"linear-gradient(to bottom, #2cc3e6, #25bde6)"}}
                    onClick={() => hideShowSideBarOptions(true, false, false)}
                />
                <Button 
                    title="x10" 
                    icon={<img src={PowerPlaySideBarIcon} width="20" height="20" alt="" />}
                    onClick={() => console.log('hi')} 
                    styles={{"width":"100%","height":"51px","borderRadius":"12px","backgroundImage":"linear-gradient(to bottom, #ffffff, #ababab)", "color": "#17181a" }} 
                    onClick={() => hideShowSideBarOptions(true, false, false)}
                />
                <Button 
                    title="$1 • Purchase Now" 
                    onClick={() => console.log('hi')} 
                    styles={{"width":"100%","height":"51px","margin-top":"20px", "borderRadius":"12px","boxShadow":"0 0 34px 0 rgba(251, 110, 0, 0.2)","backgroundImage":"linear-gradient(to bottom, #fb9700, #fb6e00)", "color":"#111", "font-size": "14"}} 
                    onClick={() => hideShowSideBarOptions(true, false, false)}
                />
                <Link 
                    title="Go Powerless" 
                    onClick={() => hideShowSideBarOptions(false, false, true)} 
                    styles={{"margin-top":"10px"}}     
                />
            </>               
        );
    }

    const renderSideBarPurchaseSection = () => {
        return (
            <>
                <span className={classes.__sidebar_power_title}>Power <span className={classes.__sidebar_up_title}>- Up!</span></span>
                <SidebarLockItem
                    title="x2"
                    lockIcon={<img src={LockIcon} width={53} height={53} alt={''}/>}
                    icon={<img src={NewCardLiteIcon} width={53} height={53} alt={''}/>}
                />
                <SidebarLockItem
                    title="x1"
                    lockIcon={<img src={LockIcon} width={53} height={53} alt={''}/>}
                    icon={<img src={BoltLiteIcon} width={53} height={53} alt={''}/>}
                />
                <SidebarLockItem
                    title="x4"
                    lockIcon={<img src={LockIcon} width={53} height={53} alt={''}/>}
                    icon={<img src={PlusMinusLiteIcon} width={53} height={53} alt={''}/>}
                />
                <p className={classes.__sidebar_purchase_powers_text}>Purchase Powers</p>
                <p className={classes.__sidebar_to_power_up}>to Power-up</p>
                <p className={classes.__sidebar_purchase_powers_text}>your game!</p>
                <Button 
                    title="$1 • Purchase Now" 
                    onClick={() => hideShowSideBarOptions(true, false, false)} 
                    styles={{"width":"190px","height":"51px","margin":"20px 0 20px","borderRadius":"12px","boxShadow":"0 0 34px 0 rgba(251, 110, 0, 0.2)","backgroundImage":"linear-gradient(to bottom, #fb9700, #fb6e00)","fontFamily":"Poppins","fontSize":"16px","fontWeight":"500","fontStretch":"normal","fontStyle":"normal","lineHeight":"normal","letterSpacing":"normal","textAlign":"center","color":"#111111"}} 
                />
                <Link 
                    title="Other Unlock Options" 
                    onClick={() => hideShowSideBarOptions(false, true, false)} 
                />
            </>
        );
    }

    const renderSideBarPinnacleSection = () => {
        return (
            <>
                <span className={classes.__sidebar_power_title}>Power <span className={classes.__sidebar_up_title}>- Up!</span></span>
                <SidebarLockItem
                    title="x2"
                    lockIcon={<img src={LockIcon} width={53} height={53} alt={''}/>}
                    icon={<img src={NewCardLiteIcon} width={53} height={53} alt={''}/>}
                />
                <SidebarLockItem
                    title="x1"
                    lockIcon={<img src={LockIcon} width={53} height={53} alt={''}/>}
                    icon={<img src={BoltLiteIcon} width={53} height={53} alt={''}/>}
                />
                <SidebarLockItem
                    title="x4"
                    lockIcon={<img src={LockIcon} width={53} height={53} alt={''}/>}
                    icon={<img src={PlusMinusLiteIcon} width={53} height={53} alt={''}/>}
                />   

                <span className={classes.__sidebar_power_up_your_game}>Power - Up <span className={classes.__sidebar_power_up_your_game_with}>Your Game with</span></span>
                <img src={PinnacleIcon} width="100" height="50" alt="" />
                <p className={classes.__sidebar_open_an_account}>Open an account to unlock your Powers</p>
                <Button 
                    title="Open Your Account" 
                    onClick={() => console.log('hi')} 
                    styles={{"width":"100%","height":"51px", "margin-bottom":"5px", "borderRadius":"12px","boxShadow":"0 0 34px 0 rgba(251, 110, 0, 0.2)","backgroundImage":"linear-gradient(to bottom, #fb9700, #fb6e00)", "color":"#111", "font-size": "14"}} 
                />
                <Link title="Other Unlock Options" onClick={() => console.log('hi')} />
            </>
        );
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
                        <CardsSvg style={{display: 'flex', height: 'auto'}}/>
                        <p className={classes.__card_game_card_counter}>Card <span>{currentCard}</span> of {TOTAL_CARDS}
                        </p>
                        <span className={classes.__card_divider} />
                    </div>

                    <div className={classes.__card_game_content_body}>
                        <div className={classes.__card_game_content_btns}>
                            <button className={classes.__card_game_content_practice_btn}>Try a Practice game</button>
                        </div>

  
                        <Card styles={{boxShadow: "inset 0 1px 24px 0 rgba(0, 0, 0, 0.5)"}}>
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
                                    updateCards={updateCards}
                                    updateInventory={updateInventory}
                                    currentCard={currentCard}
                                    cardIndex={0}
                                    onStart={() => setStart(true)}
                                    start={start}
                                    onIncrease={() => onIncrease(0, cardsState?.collectedCards?.[0])}
                                    onDecrease={() => onDecrease(0, cardsState?.collectedCards?.[0])}
                                    onPowerMatch={() => onPowerMatch(0, cardsState?.collectedCards?.[0])}
                                    onReplace={() => onReplace(0, cardsState?.collectedCards?.[0])}
                                    myPowers={myPowers}
                                    showTimer={true}
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
                                    updateCards={updateCards}
                                    updateInventory={updateInventory}
                                    currentCard={currentCard}
                                    cardIndex={1}
                                    start={start}
                                    onIncrease={() => onIncrease(1, cardsState?.collectedCards?.[1])}
                                    onDecrease={() => onDecrease(1, cardsState?.collectedCards?.[1])}
                                    onPowerMatch={() => onPowerMatch(1, cardsState?.collectedCards?.[1])}
                                    onReplace={() => onReplace(1, cardsState?.collectedCards?.[1])}
                                    myPowers={myPowers}
                                    showTimer={true}
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
                                    updateCards={updateCards}
                                    updateInventory={updateInventory}
                                    currentCard={currentCard}
                                    cardIndex={2}
                                    start={start}
                                    onIncrease={() => onIncrease(2, cardsState?.collectedCards?.[2])}
                                    onDecrease={() => onDecrease(2, cardsState?.collectedCards?.[2])}
                                    onPowerMatch={() => onPowerMatch(2, cardsState?.collectedCards?.[2])}
                                    onReplace={() => onReplace(2, cardsState?.collectedCards?.[2])}
                                    myPowers={myPowers}
                                    showTimer={true}
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
                                    updateCards={updateCards}
                                    updateInventory={updateInventory}
                                    currentCard={currentCard}
                                    cardIndex={3}
                                    start={start}
                                    onIncrease={() => onIncrease(3, cardsState?.collectedCards?.[3])}
                                    onDecrease={() => onDecrease(3, cardsState?.collectedCards?.[3])}
                                    onPowerMatch={() => onPowerMatch(3, cardsState?.collectedCards?.[3])}
                                    onReplace={() => onReplace(3, cardsState?.collectedCards?.[3])}
                                    myPowers={myPowers}
                                    showTimer={true}
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
                                    updateCards={updateCards}
                                    updateInventory={updateInventory}
                                    currentCard={currentCard}
                                    cardIndex={4}
                                    start={start}
                                    onIncrease={() => onIncrease(4, cardsState?.collectedCards?.[4])}
                                    onDecrease={() => onDecrease(4, cardsState?.collectedCards?.[4])}
                                    onPowerMatch={() => onPowerMatch(4, cardsState?.collectedCards?.[4])}
                                    onReplace={() => onReplace(4, cardsState?.collectedCards?.[4])}
                                    myPowers={myPowers}
                                    showTimer={true}
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
                            <p className={classes.__powers_not_active}>Powers not active. <span className={classes.__powers_not_active + ' ' + classes.__power_up}>Power-Up</span> before you start!</p>
                        </Card>
                    </div>

                    <div className={classes.__card_game_content_footer}>
                        {
                            !start ?
                                <Alert renderMsg={() => <p>Get Ready! Your game is about start.</p>} primary />
                                :
                                cardsArr.length < CONSTANTS.MAX_ACE_CARDS 
                                &&
                                <Alert primary renderMsg={() => (<p>{CONSTANTS.MAX_ACE_CARDS - getAceCards()} {getAceCards() == 4 ? 'Ace' : 'Aces'} to go</p>)} />
                        }
                        {
                            getAceCards() >= CONSTANTS.MAX_ACE_CARDS ?
                                <>
                                    <Alert success renderMsg={() => (<p>WOW! You have 5 of 5 Aces</p>)} />
                                    <button className={`__btn ${classes.__card_game_footer_btn}`}
                                        onClick={() => _redirectTo('/chase-a-card')}>
                                        Chase The Ace!
                                    </button>
                                </>
                                :
                                cardsArr.length >= CONSTANTS.MAX_ACE_CARDS
                                &&
                                <Alert danger renderMsg={() => (<p>You have only { getAceCards() || 0 } of { CONSTANTS.MAX_ACE_CARDS} Aces</p>)} />   
                        }
                    </div>
                </div>

                <Sidebar>
                    <div className={classes.__sidebar_cash_power_balance}>
                        <div className={classes.__sidebar_cash_power_balance_wrapper}>
                            <div className={classes.__sidebar_cash_balance_wrapper}>
                                <img src={PointsCollectedIcon} width="40" height="30" />
                                <div className={classes.__sidebar_text_wrapper}>
                                    <h1 className={classes.__sidebar_cash}>$36</h1>
                                    <span className={classes.__sidebar_cash_balance_title}>Cash Balance</span>
                                </div>
                            </div>
                        </div>
                        <div className={classes.__sidebar_cash_power_balance_wrapper}>
                            <div className={classes.__sidebar_cash_balance_wrapper}>
                                <img src={PowerPlaySideBarIcon} width="40" height="30" />
                                <div className={classes.__sidebar_text_wrapper}>
                                    <h1 className={classes.__sidebar_cash}>15,000</h1>
                                    <span className={classes.__sidebar_cash_balance_title}>Power Balance</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.__sidebar_my_powers_wrapper}>
                        <div className={classes.__sidebar_button_wrapper}>
                            {
                                myPowers
                                &&
                                renderSideBarMyPowersSection()
                            }
                            {
                                shareOptions
                                &&
                                renderSideBarShareSection()
                            }
                            {
                                unLockOptions
                                &&
                                renderSideBarPurchaseSection()
                            }

                            {/* {renderSideBarPinnacleSection()} */}
                            
                        </div>
                    </div>
                </Sidebar>
            </div>
            <Footer isBlack/>
        </>
    )
}

CardGame.propTypes = {}

export default withRouter(CardGame)

