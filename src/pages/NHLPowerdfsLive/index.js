import React, { useState } from 'react';
import PropTypes from 'prop-types';

import classes from './index.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Header3 from '../../components/Header3';
import HeaderBgUri from '../../assets/nhl-live.jpg';
import Card from '../../components/PowerpickCard';
import SportsLiveCardSelection from '../../components/SportsLiveCardSelection';
import Sidebar from '../../components/Sidebar';
import CashPowerBalance from '../../components/CashPowerBalance';
import { dummyData } from './dummyData';
import RankIcon from '../../icons/Rank';
import XPIcon from '../../icons/XPIcon';
import LockIcon from '../../icons/Lock';
import TwitterIcon from '../../icons/TwitterIcon';
import FacebookIcon from '../../icons/FacebookIcon';
import ReplaceAllIcon from '../../icons/Replace';
import ShieldIcon from '../../icons/ShieldIcon';
import CamIcon from '../../icons/CamIcon';
import NHLLiveSportsHeader from '../../components/NHLLiveSportsHeader';
import SidebarBtnIcon from '../../assets/nhl-sidebar-icon.png';
import FooterImage from '../../assets/NHL-live-footer.png';

function NHLPowerdFsLive(props) {
    const [selectedData, setSelectedData] = useState(dummyData);

    const RenderPower = ({ title = '', Icon = '', isSvgIcon = false, count = 0 }) => (
        <div className={classes.sidebar_content_p}>
            <div className={classes.sidebar_power_header}>
                {
                    isSvgIcon ?
                        <Icon size={54} />
                        :
                        <img src={Icon} width={54} height={54} />
                }
                <div className={classes.sidebar_lock_icon}>
                    <LockIcon />
                </div>
            </div>
            <p className={classes.power_title}>{title}</p>
            <div className={classes.power_footer}>
                {
                    count <= 0
                        ?
                        <>
                            <p>Share to unlock:</p>
                            <div>
                                <button>
                                    <FacebookIcon />
                                </button>
                                <button>
                                    <TwitterIcon />
                                </button>
                            </div>
                        </>
                        :
                        <p className={classes.power_footer_count}>{count} <span>left</span></p>
                }
            </div>
        </div>
    )

    return (
        <>
            <Header />
            <div className={classes.wrapper}>
                <Header3
                    titleMain1="NHL 2021"
                    titleMain2="PowerdFS"
                    contestBtnTitle="Contest Rules"
                    prizeBtnTitle="Prize Grid"
                    subHeader1="Introducing Live-Play Fantasy Hockey"
                    subHeader2="Play for your chance to win $1000!"
                    bgImageUri={HeaderBgUri}
                />

                <div className={classes.container}>
                    <div className={classes.container_left_side}>
                        <NHLLiveSportsHeader />
                        <Card>
                            {
                                selectedData && selectedData?.length &&
                                selectedData?.map(
                                    (item, index) => (
                                        <SportsLiveCardSelection
                                            category={item.category}
                                            title={item.title}
                                            teamA={item.teamA}
                                            teamB={item.teamB}
                                            date={item.date}
                                            time={item.time}
                                            stadium={item.stadium}
                                            steps={item.steps}
                                            id={item.id}
                                            isStarPower={item.isStarPower}
                                        />
                                    ))
                            }
                        </Card>

                        <div className={classes.left_side_footer}>
                            <img src={FooterImage} alt="" />
                        </div>
                    </div>

                    <div className={classes.sidebar_container}>
                        <Sidebar>
                            <CashPowerBalance />
                            <div className={classes.sidebar_header}>
                                <div className={classes.header_rank}>
                                    <p>
                                        <div className={classes.live_dot} /> Live Rank
                                        <div className={classes.separater} />
                                        <strong>23</strong>
                                    </p>
                                </div>

                                <div className={classes.sidebar_header_content}>
                                    <div>
                                        <div className={classes.sidebar_header_left}>
                                            <p>My Score:</p>
                                            <p className={classes.sidebar_header_p1}>Leader:</p>
                                        </div>
                                        <div className={classes.sidebar_header_right}>
                                            <p className={classes.sidebar_header_p2}>30</p>
                                            <p className={classes.sidebar_header_p1}>66</p>
                                        </div>
                                    </div>
                                    <RankIcon />
                                </div>

                                <button>
                                    <img src={SidebarBtnIcon} width={19} style={{ marginRight: '10px' }} /> See Full Standings
                                </button>
                            </div>

                            <div className={classes.sidebar_content}>
                                <p><span>My</span> Powers</p>
                                <div className={classes.sidebar_content_1}>
                                    <RenderPower title='Point Multiplier' isSvgIcon Icon={XPIcon} count={1} />
                                    <RenderPower title='Swap Player' isSvgIcon Icon={ReplaceAllIcon} count={0} />
                                    <RenderPower title='D-Wall' isSvgIcon Icon={ShieldIcon} count={0} />
                                    <RenderPower title='Video Review' isSvgIcon Icon={CamIcon} count={4} />
                                </div>
                            </div>
                        </Sidebar>
                    </div>
                </div>
            </div>
            <Footer isBlack={true} />
        </>
    )
}

NHLPowerdFsLive.propTypes = {

}

export default NHLPowerdFsLive

