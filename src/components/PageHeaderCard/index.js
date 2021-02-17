import React, {useState} from 'react'
import PropTypes from 'prop-types'

import classes from "./pageHeaderCard.module.scss"
import Card from '../Card'
import Time from '../../icons/Time'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import boltIcon from '../../assets/bolt.png';
import ReplaceIcon from '../../icons/Replace';
import PlusMinusIcon from '../../icons/PlusAndMinus';

function PageHeaderCard(props) {
    const { title = '' } = props || {}
    const [ howDoIWinModal, setHowDoIWinModal ] = useState(false);

    const onOpenModal = () => setHowDoIWinModal(true);
    const onCloseModal = () => setHowDoIWinModal(false);

    const renderHowDoIWinModal = () => {
        return (
            <div>
              <Modal 
                open={howDoIWinModal} 
                onClose={onCloseModal} 
                center 
                focusTrapped={false} 
                styles={{modal: {borderRadius: 12}}}>
                <h1 className={classes.__how_do_i_win_modal_title}>Chase The Ace</h1>
                
                <h3 className={classes.__how_do_i_win_modal_heading}>How Do I Win?</h3>
                <p className={classes.__how_do_i_win_modal_text}>
                    In this exciting multi-round contest, you must achieve five Aces in one hand in order to move on to the Chase the Ace round. Find the Ace of Spades in the Chase the Ace round and you win!
                </p>
                
                <h3 className={classes.__how_do_i_win_modal_heading}>How can I get five Aces?</h3>
                <p className={classes.__how_do_i_win_modal_text}>
                    The game is played with two full decks so it is possible to be dealt five Aces. We decided to make it more interesting by providing Powers to help you win! You will be dealt three hands per game.
                </p>
                
                <h3 className={classes.__how_do_i_win_modal_heading}>How do I use Powers?</h3>
                <p className={classes.__how_do_i_win_modal_text}>
                    If you get a card other than and Ace, you can use your Powers by clicking on the active card before the timer runs out. This will activate Powers for that card.
                </p>
                
                <h3 className={classes.__how_do_i_win_modal_heading}>What Powers do I have?</h3>
                <p className={classes.__how_do_i_win_modal_text}>Chase the Ace will have three Powers available:</p>
                
                <div className={classes.__how_do_i_win_modal_powers}>
                    <ReplaceIcon style={{ height: 'auto' }} width="26" height="26" />
                    <p className={classes.__how_do_i_win_modal_power_text}>
                        <b>New Card</b> - swap your current card for a random new card from the deck
                    </p>
                </div> 
 
                <div className={classes.__how_do_i_win_modal_powers}>
                    <PlusMinusIcon style={{ height: 'auto' }} width="26" height="26" />
                    <p className={classes.__how_do_i_win_modal_power_text}>
                        <b>Power Up/Down</b> - Use this power to increase the value of a card. If you get a deuce, use Power Down to make it an Ace!
                    </p>
                </div>

                <div className={classes.__how_do_i_win_modal_powers}>
                    <img src={boltIcon} width="26" height="26" />
                    <p className={classes.__how_do_i_win_modal_power_text}>
                        <b>Power Match</b> - The most powerful Power! Use this Power to turn and card into an Ace!
                    </p>
                </div>

                <h3 className={classes.__how_do_i_win_modal_heading}>What is the 'Chase the Ace' round?</h3>
                <p className={classes.__how_do_i_win_modal_text}>
                    If you make a hand of 5 aces, you will then move on to the Chase the Ace round. In this round you will be presented with a full deck of cards face down. Pick the Ace of Spades and you win! Pick any other card and it will remain visible. Your odds get better each time you make it in!
                </p>
              </Modal>
            </div>
          );
    }

    const { seconds = 12 } = props || {}
    return (
        <Card>
            <div className={classes.__card_header}>
                <small>Jackpot</small>
            </div>
            <div className={classes.__card_body}>               
                <div className={classes.__card_body_left}>
                    <div className={classes.__card_body_top}>
                        <h1>$2000</h1><span>CAD</span>
                    </div>
                    <p>
                        Odds of winning depend on <br />
                        <strong>Powerplay usage</strong>
                    </p>
                </div>
                <div className={classes.__divider} />
                <div className={classes.__card_body_right}>
                    {
                        title == "Chase The Ace"
                        ?
                        <span className={classes.__span} onClick={onOpenModal}>How do I win?</span>
                        :
                        <span>Live Draw in Progress</span>
                    } 
                    {
                        howDoIWinModal
                        &&
                        renderHowDoIWinModal()
                    } 
                    <div className={classes.__card_body_right_bottom}>
                        <Time size={25} style={{height: 'auto', marginRight: 10}} />
                        <p>
                        Pay attention, you will have <br />
                        {seconds} seconds to match each card.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    )
}

PageHeaderCard.propTypes = {
    seconds: PropTypes.number
}

export default PageHeaderCard
