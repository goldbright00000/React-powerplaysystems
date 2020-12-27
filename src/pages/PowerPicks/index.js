import React from 'react'

import Headers from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer/Footer'
import classes from './index.module.scss'
import PowerPickCard from '../../components/PowerpickCard'

function PowerPicksPage() {
    return (
        <>
            <Headers />
            <div className={classes.wrapper}>
                <div className={classes.page_left}>
                    <div className={classes.header}>
                        <div className={classes.header_top}>
                            <h1><span className={classes.h1_orange}>Power</span><span>Picks</span></h1>
                            <p>Power up your sports bets with our proven winning system!</p>
                        </div>

                        <div className={classes.header_bottom}>
                            <PowerPickCard shadow>
                                <p>Spread</p>
                                <span>54%</span>
                            </PowerPickCard>

                            <PowerPickCard shadow>
                                <p>Winner</p>
                                <span>54%</span>
                            </PowerPickCard>

                            <PowerPickCard shadow>
                                <p>Over/Under</p>
                                <span>54%</span>
                            </PowerPickCard>
                        </div>
                    </div>
                </div>

                <Sidebar></Sidebar>
            </div>
            <Footer isBlack />
        </>
    )
}

export default PowerPicksPage
