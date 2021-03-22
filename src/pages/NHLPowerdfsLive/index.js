import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import classes from './index.module.scss';
import * as NHLActions from '../../actions/NHLActions';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Header3 from '../../components/Header3';
import HeaderBgUri from '../../assets/nhl-live.jpg';
import Card from '../../components/PowerpickCard';
import SportsLiveCardSelection from '../../components/SportsLiveCardSelection';
import Sidebar from '../../components/Sidebar';
import CashPowerBalance from '../../components/CashPowerBalance';
import { dummyData } from './dummyData';
import XPIcon from '../../icons/XPIcon';
import LockIcon from '../../icons/Lock';
import TwitterIcon from '../../icons/TwitterIcon';
import FacebookIcon from '../../icons/FacebookIcon';
import ReplaceAllIcon from '../../icons/Replace';
import ShieldIcon from '../../icons/ShieldIcon';
import CamIcon from '../../icons/CamIcon';
import NHLLiveSportsHeader from '../../components/NHLLiveSportsHeader';
import FooterImage from '../../assets/NHL-live-footer.png';
import RankCard from '../../components/RankCard';
import { CONSTANTS } from '../../utility/constants';
import SingleView from './SingleView/SingleView';

function NHLPowerdFsLive(props) {
    const _data = dummyData;
    const [compressedView, setCompressedView] = useState(false);
    const [selectedView, setSelectedView] = useState(CONSTANTS.NHL_VIEW.FV);

    const { data: selectedData = [] } = useSelector(state => state.nhl);
    const dispatch = useDispatch();

    useEffect(() => {
        setData();
    }, []);

    const setData = () => {
        dispatch(NHLActions.setData(_data));
    }

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

    const setView = (viewType = CONSTANTS.NHL_VIEW.FV) => {
        switch (viewType) {
            case CONSTANTS.NHL_VIEW.FV:
                setCompressedView(false);
                break;

            case CONSTANTS.NHL_VIEW.C:
                setCompressedView(true);
                break;

            case CONSTANTS.NHL_VIEW.S:

                break;
        }
        setSelectedView(viewType);
    }

    const RenderView = () => {
        if (selectedView === CONSTANTS.NHL_VIEW.S) {
            return <SingleView data={selectedData} />
        } else if (selectedData && selectedData?.length) {
            return (
                selectedData?.map(
                    (item, index) => (
                        <SportsLiveCardSelection
                            item={item}
                            compressed={compressedView}
                            key={index + ''}
                        />
                    ))
            )
        }
    }

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
                        <NHLLiveSportsHeader
                            btnTitle1="Full View"
                            btnTitle2="Compressed"
                            btnTitle3="Single"
                            selectedView={selectedView}
                            onFullView={() => setView(CONSTANTS.NHL_VIEW.FV)}
                            onCompressedView={() => setView(CONSTANTS.NHL_VIEW.C)}
                            onSingleView={() => setView(CONSTANTS.NHL_VIEW.S)}
                        />
                        <Card>
                            {RenderView()}
                        </Card>
                        <div className={classes.left_side_footer}>
                            <img src={FooterImage} alt="" />
                        </div>
                    </div>

                    <div className={classes.sidebar_container}>
                        <Sidebar>
                            <CashPowerBalance styles={{ marginTop: -40, width: '100%' }} />
                            <RankCard />

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