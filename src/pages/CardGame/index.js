import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import { redirectTo } from '../../utility/shared'
import Card from '../../components/Card'
import GameCard from '../../components/GameCard'
import Header from '../../components/Header/Header'
import PageHeader from '../../components/PageHeader'
import ProgressBar from '../../components/Progress'
import Footer from '../../components/Footer/Footer'
import Alert from '../../components/Alert'
import Reload from '../../icons/Reload'
import CardsSvg from '../../icons/Cards'
import Sidebar from '../../components/Sidebar'
import Shuffle from '../../icons/Shuffle'
import SidebarButton from '../../components/SidebarButton'
import PowerMatchImg from '../../assets/flash.png'
import ArrowUp from '../../icons/ArrowUp'
import ArrowDown from '../../icons/ArrowDown'
import classes from './cardGamePage.module.scss'

function CardGame(props) {
    const [count, setCount] = useState(5);
    useEffect(() => { 
        let time = 5;
        const timeOut = setInterval(() => {
            if (time !== 0) {
                time--
                setCount(time)
            } else {
                time = 5;
                setCount(5)
            }
        }, 1000)

        return () => clearInterval(timeOut)
    }, [])

    const _redirectTo = (path = '/') => {
        redirectTo(props, { path })
    }

    return (
        <>
            <Header />
            <div className={classes.__card_game_content}>
                <div className={classes.__card_game_content_left}>
                    <PageHeader title="Chase The Ace" />
                    <div className={classes._card_game_content_top}>
                            <CardsSvg style={{display: 'flex', height: 'auto'}} />
                        <p className={classes.__card_game_card_counter}>Card <span>2</span> of 5</p>
                        <p className={classes.__card_game_round_counter}>Round <span>2</span> of 5</p>
                        <span className={classes.__card_divider}></span>
                        <p className={classes.__card_game_Next_card_drawn_in}>Next card drawn in</p>
                        <ProgressBar
                            progress={count}
                            maxProgress={5}
                            size={62}
                            strokeWidth={4}
                            circleOneStroke='grey'
                            circleTwoStroke='#fff' />
                    </div>

                    <div className={classes.__card_game_content_body}>
                        <Card>
                            <div className={classes.__card_game_content_cards}>
                                <GameCard isCompleted />
                                <GameCard showPopup />
                                <GameCard />
                                <GameCard />
                                <GameCard />
                            </div>
                            <button className={classes.__reload_btn}>
                                <Reload size={48} className={classes.__reload_svg_icon} />
                            </button>
                        </Card>
                    </div>

                    <div className={classes.__card_game_content_footer}>
                        <Alert primary />
                        
                        <button className={`__btn ${classes.__card_game_footer_btn}`} onClick={() => _redirectTo('/chase-a-card')}>Chace The Ace!</button>
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
                        success
                        title="Replace"
                        toolText="1 left"
                        icon={<Shuffle style={{ height: 'auto' }} />}
                    />

                    <SidebarButton
                        primary
                        title="Replace All"
                        toolText="$.25"
                        icon={<div className={classes.__sidebar_reload_btn}><Reload bgColor={"#0ff"} style={{ height: 'auto' }} /></div>}
                    />

                    <SidebarButton
                        primary
                        title="Power Match"
                        toolText="$.25"
                        icon={<img src={PowerMatchImg} width={48} height={48} />}
                    />

                    <SidebarButton
                        primary
                        title="Increase"
                        toolText="$.25"
                        icon={<ArrowUp style={{ height: 'auto' }} />}
                    />

                    <SidebarButton
                        primary
                        title="Decrease"
                        toolText="$.25"
                        icon={<ArrowDown style={{ height: 'auto' }} />}
                    />
                </div>
                </Sidebar>
            </div>
            <Footer isBlack />
        </>
    )
}

CardGame.propTypes = {

}

export default withRouter(CardGame)

