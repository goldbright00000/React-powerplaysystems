import React from 'react'
import PropTypes from 'prop-types'

import Clock2 from '../../icons/Clock2'
import Calendar2 from '../../icons/Calendar2'
import Stadium from '../../icons/Stadium2'
import Pinnacle from '../../icons/Pinnacle'
import Cell from '../../components/Cell'
import classes from './index.module.scss'

function PowerPickInfoCard(props) {
    const {showHeader = false} = props || {}
    return (
        <div className={classes.content_card_grid_wrapper}>
            {
                showHeader &&
                <div className={classes.content_card_grid_header}>
                <div className={classes.content_card_grid_header_left}>
                    <span>
                        HOME
                    </span>

                    <span>
                        VISITOR
                    </span>
                </div>

                <div className={classes.content_card_grid_header_right}>
                    <div className={classes.content_card_grid_header_right_sub}>
                        SPREAD
                    </div>

                    <div className={classes.content_card_grid_header_right_sub}>
                        WINNER
                    </div>

                    <div className={classes.content_card_grid_header_right_sub}>
                        OVER/UNDER
                    </div>
                </div>
            </div>
            }
            <div className={classes.content_card_grid_container}>
                <div className={classes.content_card_body}>
                    <div className={classes.content_card_body_left}>
                        <div className={classes.content_card_body_top}>
                            <div className={classes.content_card_body_left_sub}>
                                <h2>
                                    New Orleans Saints
                                </h2>

                                <div className={classes.content_card_body_info}>
                                    <span>
                                        10-7-0
                                    </span>

                                    <span>
                                        Win%.600
                                    </span>

                                    <span>
                                        Avg Pts:
                                    </span>

                                    <span>
                                        F 26.5/A 15.4
                                    </span>
                                </div>
                            </div>

                            <h1>VS</h1>

                            <div className={classes.content_card_body_left_sub}>
                                <h2>
                                    Cincinnati Bengals
                                </h2>
                                
                                <div className={classes.content_card_body_info}>
                                    <span>
                                        10-7-0
                                    </span>

                                    <span>
                                        Win%.600
                                    </span>

                                    <span>
                                        Avg Pts:
                                    </span>

                                    <span>
                                        F 26.5/A 15.4
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={classes.content_card_body_left_footer} >
                            <div className={classes.content_card_body_left_footer_info}>
                                <Clock2 style={{height: 'auto'}} />
                                <span>01:07 PM ET</span>
                            </div>

                            <div className={classes.content_card_body_left_footer_info}>
                                <Calendar2 style={{height: 'auto'}} />
                                <span>November, 22 2020</span>
                            </div>

                            <div className={classes.content_card_body_left_footer_info}>
                                <Stadium style={{height: 'auto'}} />
                                <span>Empower Field - Open</span>
                            </div>
                        </div>
                    </div>


                    <div className={classes.content_card_body_right}>
                        <div className={classes.content_card_body_right_grid}>
                            <Cell high text="Bengals +3.5" />
                        </div>

                        <div className={classes.content_card_body_right_grid}>
                            <Cell medium text="Saints to Win" />
                        </div>

                        <div className={classes.content_card_body_right_grid}>
                            <Cell veryLow text="U 45.5" />
                        </div>
                    </div>
                </div>

                <div className={classes.content_card_footer}>
                    <div className={classes.content_card_footer_left}>
                        <span>Bet with</span> <Pinnacle style={{ height: 'auto'}} />
                    </div>

                    <div className={classes.content_card_footer_right}>
                        <span>
                            -103
                        </span>

                        <span>
                            +116
                        </span>

                        <span>
                            -115
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

PowerPickInfoCard.propTypes = {
    showHeader: PropTypes.bool
}

export default PowerPickInfoCard

