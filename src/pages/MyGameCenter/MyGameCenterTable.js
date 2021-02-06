import React, { useState, useEffect, Fragment } from 'react';
import { Line } from 'rc-progress';

import classes from './MyGameCenter.module.scss';
import Billards from '../../icons/Billards';
import CasinoChips from '../../icons/CasinoChips';
import Stadium from '../../icons/Stadium';
import PowerPlayIcon from '../../assets/powerplay-icon.png';
import './table.scss';
import { Link } from 'react-router-dom';
import Info from '../../icons/Info';
import SuperBall from '../../icons/SuperBall';
import Ball from '../../icons/Ball';
import Lineprogress from '../../icons/Lineprogress';
import MyGameCenterTableRow from './MyGameCenterTableRow';

const MyGameCenterTable = props => {
    const [isMobileDevice, setMobileDevice] = useState(false);
    const responsiveHandler = maxWidth => setMobileDevice(maxWidth.matches);
    useEffect(() => {
        const maxWidth = window.matchMedia("(max-width: 1200px)");
        responsiveHandler(maxWidth);
        maxWidth.addEventListener('change', responsiveHandler);
        return () => maxWidth.removeEventListener('change', responsiveHandler);
    }, [])
    return (
        <div className='__table-wrapper __mb-6'>
            <div className='__flex'>
                <div className='__badges-wrapper __live-power-play-badges-wrapper __ml-a __text-in-one-line __mediam'>
                    <Link to='/' className='__outline-badge __active __f1'><Stadium />Live sports</Link>
                    <Link to='/' className='__outline-badge __f1'><Billards />Power Match</Link>
                    <Link to='/' className='__outline-badge __f1'><CasinoChips />Parlay Games</Link>
                    <Link to='/' className='__outline-badge __f1'>Show All</Link>
                </div>
            </div>

            <div className={`__h6 __mt-2 __mb-1 ${classes.__header}`}>
                My Entries
                <div>
                    <Link>
                        In Progress
                    </Link>

                    <Link className={classes.active}>
                        Upcoming
                    </Link>

                    <Link>
                        Completed Games
                    </Link>
                </div>
            </div>
            
            <div className={classes.table}>
                <div className={classes.table_main}>
                    <div className={classes.table_header}>
                        <div>Type</div>
                        <div>Contest</div>
                        <div>Entries (min)</div>
                        <div>Total Prizes</div>
                        <div className={classes.row_small}>Free Paid</div>
                        <div className={classes.row_small}>Status</div>
                        <div className={classes.row_small}>Action</div>
                    </div>
                    <div className={classes.table_body}>
                        <MyGameCenterTableRow
                            type={{ typeTitle: 'MLB Chase The Ace', typeDateTime: 'Oct 24, 2020 | 8:00PM ET', Icon: <Ball /> }}
                            contest='CTA $15k WTA '
                            entries={{ entriesTitle: <p>58,589 <span>of 200,000</span></p>, entiresValue: 40 }}
                            totalPrizes={{ totalPrize: 800, firstPlacePrize: 500 }}
                            freePaid={1000}
                            status={{statusTitle: 'Starts in:', statusTime: '3:00:04'}}
                        />

                        <MyGameCenterTableRow
                            type={{ typeTitle: 'MLB Chase The Ace', typeDateTime: 'Oct 24, 2020 | 8:00PM ET', Icon: <Ball /> }}
                            contest='CTA $15k WTA '
                            entries={{ entriesTitle: <p>58,589 <span>of 200,000</span></p>, entiresValue: 40 }}
                            totalPrizes={{ totalPrize: 800, firstPlacePrize: 500 }}
                            freePaid={1000}
                            status={{statusTitle: 'Starts in:', statusTime: '3:00:04'}}
                        />

                        <MyGameCenterTableRow
                            type={{ typeTitle: 'MLB Chase The Ace', typeDateTime: 'Oct 24, 2020 | 8:00PM ET', Icon: <Ball /> }}
                            contest='CTA $15k WTA '
                            entries={{ entriesTitle: <p>58,589 <span>of 200,000</span></p>, entiresValue: 40 }}
                            totalPrizes={{ totalPrize: 800, firstPlacePrize: 500 }}
                            freePaid={1000}
                            status={{statusTitle: 'Starts in:', statusTime: '3:00:04'}}
                        />

                        <MyGameCenterTableRow
                            type={{ typeTitle: 'MLB Chase The Ace', typeDateTime: 'Oct 24, 2020 | 8:00PM ET', Icon: <Ball /> }}
                            contest='CTA $15k WTA '
                            entries={{ entriesTitle: <p>58,589 <span>of 200,000</span></p>, entiresValue: 40 }}
                            totalPrizes={{ totalPrize: 800, firstPlacePrize: 500 }}
                            freePaid={1000}
                            status={{statusTitle: 'Starts in:', statusTime: '3:00:04'}}
                        />

                        <MyGameCenterTableRow
                            type={{ typeTitle: 'MLB Chase The Ace', typeDateTime: 'Oct 24, 2020 | 8:00PM ET', Icon: <Ball /> }}
                            contest='CTA $15k WTA '
                            entries={{ entriesTitle: <p>58,589 <span>of 200,000</span></p>, entiresValue: 40 }}
                            totalPrizes={{ totalPrize: 800, firstPlacePrize: 500 }}
                            freePaid={1000}
                            status={{statusTitle: 'Starts in:', statusTime: '3:00:04'}}
                        />

                        <MyGameCenterTableRow
                            type={{ typeTitle: 'MLB Chase The Ace', typeDateTime: 'Oct 24, 2020 | 8:00PM ET', Icon: <Ball /> }}
                            contest='CTA $15k WTA '
                            entries={{ entriesTitle: <p>58,589 <span>of 200,000</span></p>, entiresValue: 40 }}
                            totalPrizes={{ totalPrize: 800, firstPlacePrize: 500 }}
                            freePaid={1000}
                            status={{statusTitle: 'Starts in:', statusTime: '3:00:04'}}
                        />

                        <MyGameCenterTableRow
                            type={{ typeTitle: 'MLB Chase The Ace', typeDateTime: 'Oct 24, 2020 | 8:00PM ET', Icon: <Ball /> }}
                            contest='CTA $15k WTA '
                            entries={{ entriesTitle: <p>58,589 <span>of 200,000</span></p>, entiresValue: 40 }}
                            totalPrizes={{ totalPrize: 800, firstPlacePrize: 500 }}
                            freePaid={1000}
                            status={{statusTitle: 'Starts in:', statusTime: '3:00:04'}}
                        />
                        <MyGameCenterTableRow
                            type={{ typeTitle: 'MLB Chase The Ace', typeDateTime: 'Oct 24, 2020 | 8:00PM ET', Icon: <Ball /> }}
                            contest='CTA $15k WTA '
                            entries={{ entriesTitle: <p>58,589 <span>of 200,000</span></p>, entiresValue: 40 }}
                            totalPrizes={{ totalPrize: 800, firstPlacePrize: 500 }}
                            freePaid={1000}
                            status={{statusTitle: 'Starts in:', statusTime: '3:00:04'}}
                        />

                        <MyGameCenterTableRow
                            type={{ typeTitle: 'MLB Chase The Ace', typeDateTime: 'Oct 24, 2020 | 8:00PM ET', Icon: <Ball /> }}
                            contest='CTA $15k WTA '
                            entries={{ entriesTitle: <p>58,589 <span>of 200,000</span></p>, entiresValue: 40 }}
                            totalPrizes={{ totalPrize: 800, firstPlacePrize: 500 }}
                            freePaid={1000}
                            status={{statusTitle: 'Starts in:', statusTime: '3:00:04'}}
                        />

                        <MyGameCenterTableRow
                            type={{ typeTitle: 'MLB Chase The Ace', typeDateTime: 'Oct 24, 2020 | 8:00PM ET', Icon: <Ball /> }}
                            contest='CTA $15k WTA '
                            entries={{ entriesTitle: <p>58,589 <span>of 200,000</span></p>, entiresValue: 40 }}
                            totalPrizes={{ totalPrize: 800, firstPlacePrize: 500 }}
                            freePaid={1000}
                            status={{statusTitle: 'Starts in:', statusTime: '3:00:04'}}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MyGameCenterTable;