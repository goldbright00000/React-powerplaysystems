import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import classes from "./index.module.scss";
import * as MLBActions from "../../actions/MLBActions";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Header4 from "../../components/Header4";
import BaseballImage from "../../assets/mlb_compress_header.jpg";
import Card from "../../components/PowerpickCard";
import Sidebar from "../../components/Sidebar";
import CashPowerBalance from "../../components/CashPowerBalance";
import XPIcon from "../../icons/XPIcon";
import LockIcon from "../../icons/Lock";
import TwitterIcon from "../../icons/TwitterIcon";
import FacebookIcon from "../../icons/FacebookIcon";
import ReplaceAllIcon from "../../icons/Replace";
import ShieldIcon from "../../icons/ShieldIcon";
import CamIcon from "../../icons/CamIcon";
import NHLLiveSportsHeader from "../../components/NHLLiveSportsHeader";
import FooterImage from "../../assets/NHL-live-footer.png";
import RankCard from "../../components/RankCard";
import { CONSTANTS } from "../../utility/constants";
import SingleView from "./SingleView/SingleView";
import LearnMoreModal from "../../components/PowerCenterCardDetails/LearnMoreModal";

import { dummyData } from "./dummyData";
import SportsLiveCard from "../../components/SportsLiveCard";

function MLBPowerdFsLive(props) {
  const _data = dummyData;
  const [compressedView, setCompressedView] = useState(false);
  const [selectedView, setSelectedView] = useState(CONSTANTS.NHL_VIEW.FV);
  const [learnMoreModal, setLearnMoreModal] = useState(false);

  const { live_data: selectedData = [] } = useSelector((state) => state.mlb);
  const dispatch = useDispatch();

  const onCloseModal = () => setLearnMoreModal(false);

  useEffect(() => {
    setData();
  }, []);

  const setData = () => {
    dispatch(MLBActions.mlbLiveData(_data));
  };

  const RenderPower = ({
    title = "",
    Icon = "",
    isSvgIcon = false,
    count = 0,
  }) => (
    <div className={classes.sidebar_content_p}>
      <div className={classes.sidebar_power_header}>
        {isSvgIcon ? (
          <Icon size={54} />
        ) : (
          <img src={Icon} width={54} height={54} />
        )}
        <div className={classes.sidebar_lock_icon}>
          <LockIcon />
        </div>
      </div>
      <p className={classes.power_title}>{title}</p>
      <div className={classes.power_footer}>
        {count <= 0 ? (
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
        ) : (
          <p className={classes.power_footer_count}>
            {count} <span>left</span>
          </p>
        )}
      </div>
    </div>
  );

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
  };

  const RenderView = () => {
    if (selectedView === CONSTANTS.NHL_VIEW.S) {
      return <SingleView data={selectedData} />;
    } else if (selectedData && selectedData?.length) {
      return selectedData?.map((item, index) => (
        <SportsLiveCard
          player={item}
          compressedView={compressedView}
          key={index + ""}
        />
      ));
    }
  };

  const RenderLiveState = ({ isLive = false }) =>
    isLive ? (
      <p className={classes.currentState}>
        <span className={classes.orb} /> Live Game In Progress
      </p>
    ) : (
      <p className={`${classes.currentState} ${classes.column}`}>
        5d 4h 15min
        <span className={classes.span_text}>Live Game Stars in</span>
      </p>
    );

  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        <Header4
          titleMain1="MLB 2021"
          titleMain2="PowerdFS"
          subHeader1="Introducing Live-Play Fantasy Baseball"
          subHeader2={
            <>
              Use your <span>Powers</span> during the live game to drive your
              team up the standings
            </>
          }
          contestBtnTitle="Contest Rules"
          prizeBtnTitle="Prize Grid"
          bgImageUri={BaseballImage}
          compressedView
          currentState={<RenderLiveState />}
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
              teamManagerLink="/mlb-live-powerdfs"
              scoreDetailLink="/mlb-live-powerdfs/my-score-details"
            />
            <Card>{RenderView()}</Card>
            <div className={classes.left_side_footer}>
              <img src={FooterImage} alt="" />
            </div>
          </div>

          <div className={classes.sidebar_container}>
            <Sidebar>
              <CashPowerBalance
                powerBalance={50000}
                cashBalance={200000}
                styles={{
                  width: "100%",
                  marginTop: "-40px",
                }}
                cashTitle="Prize Pool"
                powerTitle="Top Prize"
                centered
              />
              <RankCard currentWin={100000} {...props} />

              <div className={classes.sidebar_content}>
                <p>
                  <span>My</span> Powers
                </p>
                <div className={classes.sidebar_content_1}>
                  <RenderPower
                    title="Point Multiplier"
                    isSvgIcon
                    Icon={XPIcon}
                    count={1}
                  />
                  <RenderPower
                    title="Swap Player"
                    isSvgIcon
                    Icon={ReplaceAllIcon}
                    count={0}
                  />
                  <RenderPower
                    title="D-Wall"
                    isSvgIcon
                    Icon={ShieldIcon}
                    count={0}
                  />
                  <RenderPower
                    title="Video Review"
                    isSvgIcon
                    Icon={CamIcon}
                    count={4}
                  />
                </div>
                <button onClick={() => setLearnMoreModal(true)}>
                  Learn more
                </button>
              </div>
            </Sidebar>
          </div>
        </div>
      </div>
      <Footer isBlack={true} />
      <LearnMoreModal
        title="Point Multipler"
        learnMoreModal={learnMoreModal}
        onCloseModal={onCloseModal}
      />
    </>
  );
}

MLBPowerdFsLive.propTypes = {};

export default MLBPowerdFsLive;
