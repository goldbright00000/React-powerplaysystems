import React, {useState} from 'react'

import Headers from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer/Footer'
import PowerPickCard from '../../components/PowerpickCard'
import ButtonDropdown from '../../components/ButtonDropdown'
import classes from './index.module.scss'
import PowerPickInfoCard from '../../components/PowerPickInfoCard'

function PowerPicksPage() {
    const [selected, setSelected] = useState('')
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

                    <div className={classes.content_left}>
                        <div className={classes.content_header}>
                            <p className={classes.content_header_left}>Show Decimal Odds</p>

                            <div className={classes.content_header_right}>
                                <ButtonDropdown elements={[
                                    { title: 'NCAA', value: 'ncaa' },
                                ]} selected={selected} onChange={(e) => {
                                    setSelected(e?.target?.value)
                                    }} isActive />
                                
                                <ButtonDropdown elements={[
                                    { title: 'Basketball', value: 'basketball' },
                                ]} selected={selected} onChange={(e) => {
                                    setSelected(e?.target?.value)
                                    }} />
                                
                                <ButtonDropdown elements={[
                                    { title: 'Hockey', value: 'hockey' },
                                ]} selected={selected} onChange={(e) => {
                                    setSelected(e?.target?.value)
                                    }} />
                                
                                <ButtonDropdown elements={[
                                    { title: 'Baseball', value: 'baseball' },
                                ]} selected={selected} onChange={(e) => {
                                    setSelected(e?.target?.value)
                                }} />
                            </div>
                        </div>
                    
                        <div className={classes.content_body}>
                            <PowerPickCard>
                                <PowerPickInfoCard showHeader />
                                <PowerPickInfoCard />
                                <PowerPickInfoCard />
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
