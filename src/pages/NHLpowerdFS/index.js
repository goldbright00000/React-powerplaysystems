import React, { useState, useCallback, useEffect, useRef } from "react";
import { isEmpty, isEqual } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { cloneDeep } from "lodash";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import classes from "./index.module.scss";
import * as NHLActions from "../../actions/NHLActions";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import NHLBG from "../../assets/nhl-bg.png";
import NHLFooterImage from "../../assets/NHL.png";
import PowerPlayIcon from "../../assets/token.png";
import AcceleRadar from "../../assets/partners/acceleradar.png";
import Card from "../../components/PowerpickCard";
import Sidebar from "../../components/Sidebar";
import CashPowerBalance from "../../components/CashPowerBalance";
import SportsSidebarContent from "../../components/SportsSidebarContent";
import SelectionCard from "../../components/SportsSelectionCard";
import SelectionCard3 from "../../components/SportsSelectionCard3";
import SportsTeamSelectionCard from "../../components/SportsTeamSelectionCard";
import EmployeeIcon from "../../icons/Employee";
import SportsFilters from "../../components/SportsFilters";
import { CONSTANTS } from "../../utility/constants";
import SportsContestRules from "../../components/SportsContestRules";
import { redirectTo } from "../../utility/shared";
import PrizeModal from "../../components/PrizeModal";
import { PAGE_TYPES } from "../../components/SportsSelectionCard3/PageTypes";

import { dummyData } from "./dummyData";
import SearchInput from "../../components/SearchInput";
import StarPlayersCheck from "../../components/StarPlayersCheck";
import Header4 from "../../components/Header4";
import PowerCollapesible from "../../components/PowerCollapesible";
import ContestRulesIcon from "../../icons/ContestRules";
import RightArrow from "../../assets/right-arrow.png";
import Tick2 from "../../icons/Tick2";
import ContestRulesPopUp from "../../components/ContestRulesPopUp";

import StarImg from "../../assets/star.png";
import ContestRuleIcon from "../../assets/icons/contest-rules.png";
import PrizeCupIcon from "../../assets/icons/prize-cup.png";
import CloseIconGrey from "../../assets/close-icon-grey.png";
import MenuIcon from "../../assets/icons/menu.png";
import SwapPlayerIcon from "../../assets/swap-player-icon.png";
import PointMultiplierIcon from "../../assets/point-multiplier-icon.png";
import VideoReviewIcon from "../../assets/video-review-icon.png";
import DWallIcon from "../../assets/d-wall-icon.png";
import UndoIcon from "../../assets/undo-icon.png";
import RetroBoostIcon from "../../assets/retro-boost-icon.png";

import Button from "../../components/Button";
import ButtonFloating from "../../components/ButtonFloating";
import ModalBottom from "../../components/ModalBottom";
import { BottomSheet } from "react-spring-bottom-sheet";
import "./bottomSheetStyles.scss";

import { useMediaQuery } from "react-responsive";

const prizeData = [
  { place: "1st", payout: "$2,0000.00" },
  { place: "2nd", payout: "$750.00" },
  { place: "3rd", payout: "$350.00" },
  { place: "4th", payout: "$200.00" },
  { place: "5th", payout: "$150.00" },
  { place: "6th - 7th", payout: "$100.00" },
  { place: "8th - 10th", payout: "$80.00" },
  { place: "11th - 15th", payout: "$60.00" },
  { place: "16th - 20th", payout: "$50.00" },
  { place: "21st - 30th", payout: "$40.00" },
];

const INITIAL_PLAYER_LIST = [
  {
    title: "C",
    value: "",
    filter: CONSTANTS.FILTERS.NHL.CENTER,
    playerId: "",
  },
  {
    title: "XW1",
    value: "",
    filter: CONSTANTS.FILTERS.NHL.XW,
    playerId: "",
  },
  {
    title: "XW2",
    value: "",
    filter: CONSTANTS.FILTERS.NHL.XW,
    playerId: "",
  },
  {
    title: "XW3",
    value: "",
    filter: CONSTANTS.FILTERS.NHL.XW,
    playerId: "",
  },
  {
    title: "D1",
    value: "",
    filter: CONSTANTS.FILTERS.NHL.D,
    playerId: "",
  },
  {
    title: "D2",
    value: "",
    filter: CONSTANTS.FILTERS.NHL.D,
    playerId: "",
  },
  {
    title: "G",
    value: "",
    filter: CONSTANTS.FILTERS.NHL.G,
    playerId: "",
  },
  {
    title: "TD",
    value: "",
    icon: EmployeeIcon,
    filter: CONSTANTS.FILTERS.NHL.TD,
    playerId: "",
  },
];

const FILTERS_INITIAL_VALUES = [
  {
    id: 1,
    title: CONSTANTS.FILTERS.NHL.CENTER,
    remaining: 1,
  },
  {
    id: 2,
    title: CONSTANTS.FILTERS.NHL.XW,
    remaining: 3,
  },
  {
    id: 3,
    title: CONSTANTS.FILTERS.NHL.D,
    remaining: 2,
  },
  {
    id: 4,
    title: CONSTANTS.FILTERS.NHL.G,
    remaining: 1,
  },
  {
    id: 5,
    title: CONSTANTS.FILTERS.NHL.TD,
    remaining: 1,
  },
];

const basicRules = [
  "No purchase necessary.",
  "Open to residents of United States who are over the age of majority.",
  "Contest closes at 11:59pm ET - April 22, 2020.",
];

const detailRules = [
  "Five (5) prizes to be won. See full rules for complete details of all prizes.",
  "One entry per person.",
  "Odds of winning depend on player knowledge.",
  "Mathematical skill testing question must be correctly answered to win.",
];

let starPlayerCount = 0;
const dropDown = [
  { title: "Team A" },
  { title: "Team B" },
  { title: "Team C" },
  { title: "Team D" },
];

const headerText = [
  {
    id: 1,
    text: `Select 1 Team Defense, Goals against result in negative points for your team.`,
  },
  {
    id: 2,
    text: `Select 1 Catcher.`,
  },
  {
    id: 3,
    text: `Select 1 Shortstop.`,
  },
  {
    id: 4,
    text: `Select 2 players from the pool of players at First Base (1B), Second Base (2B), and Third Base (3B). You may only select one Star player from the XB pool.`,
  },
  {
    id: 5,
    text: `Select 2 Outfielders (OF) from the pool of players at Left Field (LF), Center Field (CF), and Right Field (RF). You may select only one Star player from the OF pool.`,
  },
  {
    id: 6,
    text: `Select 1 Team Defense, Goals against result in negative points for your team. You can see the Average Runs Against (ARA) for each team below. Click the Arrow icon to see starting Pitchers.`,
  },
];

let starPowerIndex = 0;
let selectedPlayerCount = 0;

function NHLPowerdFs(props) {
  const isMobile = useMediaQuery({ query: "(max-width: 414px)" });
  const [selected, setSelected] = useState(new Map());
  const [selectedFilter, setSelectedFilter] = useState(
    FILTERS_INITIAL_VALUES[0]
  );
  const [playerList, setPlayerList] = useState(cloneDeep(INITIAL_PLAYER_LIST));
  const [filters, setFilters] = useState(cloneDeep(FILTERS_INITIAL_VALUES));
  const [selectedData, setSelectedData] = useState();
  const [filterdData, setFilterdData] = useState();
  const [selectedDropDown, setSelectedDropDown] = useState();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPrizeModal, setPrizeModalState] = useState(false);

  const {
    data = [],
    starPlayerCount = 0,
    game_id,
    sport_id,
    isEdit = false,
    allData = [],
    savedPlayers = [],
  } = useSelector((state) => state.nhl);
  const { auth: { user: { token = "" } } = {} } = useSelector((state) => state);

  const dispatch = useDispatch();

  //reset the states
  useEffect(() => {
    dispatch(NHLActions.setNhlData(dummyData));
    dispatch(NHLActions.starPlayerCount(starPlayerCount));
    setPlayerList(cloneDeep(INITIAL_PLAYER_LIST));
    setSelected(new Map());
    setSelectedFilter(FILTERS_INITIAL_VALUES[0]);
    setFilters(cloneDeep(FILTERS_INITIAL_VALUES));
    setFilterdData(null);
    setSelectedData(null);
  }, []);

  useEffect(() => {
    if (data?.length) {
      setFilterdData(data[0]);
      setSelectedData(data[0]);
    }
  }, [data]);

  const onSelectDeselect = useCallback(
    (id) => {
      const _data = dummyData?.filter((d) =>
        d?.data?.find((c) => c?.id === id)
      );
      const { cat = "", data: _selectedData = [] } = _data?.[0] || [];

      const [data] = _selectedData?.filter((d) => d?.id === id);
      const _selected = new Map(selected);

      //selected players
      const _playersList = [...playerList];

      if (!_selected.get(id)) {
        const [_player] = _playersList?.filter(
          (player) =>
            player?.filter === selectedData?.cat && isEmpty(player.value)
        );
        if (!isEmpty(_player) && isEmpty(_player.value)) {
          const playerListIndex = _playersList?.findIndex(
            (player) => player?.filter === selectedData?.cat && isEmpty(player)
          );
          let player = _player;
          player.value = data?.title;
          player.playerId = data?.id;
          player.isStarPlayer = data?.isStarPlayer;
          _playersList[playerListIndex] = player;

          _selected.set(id, !selected.get(id));
          //Star Power Player selection (sidebar)
          if (starPlayerCount < 3 && data?.isStarPlayer) {
            starPlayerCount++;
          }
        }
      } else {
        let existingPlayerIndex = _playersList?.findIndex((player) =>
          isEqual(player?.playerId, data?.id)
        );

        if (existingPlayerIndex !== -1) {
          _selected.set(id, !selected.get(id));
          if (
            starPlayerCount > 0 &&
            _playersList[existingPlayerIndex].isStarPlayer
          ) {
            starPlayerCount--;
          }

          _playersList[existingPlayerIndex].value = "";
          _playersList[existingPlayerIndex].playerId = "";
          _playersList[existingPlayerIndex].isStarPlayer = false;
        }
      }

      dispatch(NHLActions.starPlayerCount(starPlayerCount));
      setSelected(_selected);
      setPlayerList(_playersList);
      activateFilter(data, cat);
    },
    [selected, selectedFilter, selectedData]
  );

  const onSelectFilter = useCallback(
    (id) => {
      const [_selectedFilter] = filters?.filter((filter) => filter.id === id);
      const [_selectedData] = dummyData?.filter(
        (data) => data?.cat === _selectedFilter?.title
      );

      setSelectedData(_selectedData);
      setSelectedFilter(_selectedFilter);
      setFilterdData(_selectedData);
    },
    [selectedFilter]
  );

  const activateFilter = (player, category) => {
    const [_selectedFilter] = filters?.filter(
      (filter) => filter?.title === category
    );
    const filter = _selectedFilter;
    let _remaining = filter?.remaining;
    if (_remaining > 0) {
      if (!!!selected.get(player?.id)) _remaining -= 1;
      else if (_remaining < 2) _remaining += 1;
      if (_remaining <= 0) {
        _remaining = 0;
        setSelectedFilter(filter);
      }
    } else if (!!selected.get(player?.id) && _remaining < 2) {
      _remaining++;
    } else {
      setSelectedFilter(_selectedFilter);
    }

    filter.remaining = _remaining;
    const filterIndex = filters?.findIndex(
      (filter) => filter?.id === _selectedFilter?.id
    );
    const _filters = [...filters];
    _filters[filterIndex] = filter;
    setFilters(_filters);
  };

  const onDelete = (playerId) => {
    onSelectDeselect(playerId);
  };

  const onSearch = (e) => {
    const { value } = e.target;
    if (!isEmpty(value)) {
      const _filterdData = selectedData?.data?.filter((data) =>
        data?.title?.toLocaleLowerCase()?.includes(value?.toLocaleLowerCase())
      );
      const _filterdDataObj = {
        cat: selectedData?.cat,
        data: _filterdData,
      };
      setFilterdData(_filterdDataObj);
    } else {
      setFilterdData(selectedData);
    }
  };

  const onSelectSearchDropDown = (item) => {
    if (item === selectedDropDown) return setSelectedDropDown(null);

    setSelectedDropDown(item);
  };

  const ContestScoringRow = ({ item = {}, width = {} }) => (
    <div className={classes.scoring_row}>
      <p>{item?.title}</p>{" "}
      <span className={width && width}>{item?.points}</span>
    </div>
  );

  const ContestScoringColumn = ({ title = "", data = [], styles = {} }) => (
    <div className={classes.scoring_column} style={styles}>
      <div className={classes.scoring_title}>
        <p>{title}</p>
      </div>
      <div className={classes.scoring_body}>
        {data &&
          data?.length &&
          data?.map((item, ind) => (
            <ContestScoringRow
              item={item}
              key={ind + "-"}
              width={title == "Pitchers" && classes.width_140}
            />
          ))}
      </div>
    </div>
  );

  const ContestSummaryRow = ({ text = <></> }) => (
    <div className={classes.column_row}>
      <Tick2 size={17} />
      {text}
    </div>
  );

  const ContestColumn = ({
    title = "",
    widthClass = {},
    styles = {},
    children = <></>,
  }) => (
    <div
      className={`${classes.footer_column} ${widthClass && widthClass}`}
      style={styles}
    >
      <div className={classes.column_title}>
        <p>{title}</p>
      </div>
      {children}
    </div>
  );

  const RenderIcon = ({ title, count, Icon, iconSize = 24 }) => (
    <div className={classes.body_card}>
      <span>{count}</span>
      <img src={Icon} />
      <p>{title}</p>
    </div>
  );

  const getBackgroundImageWithStyle = () => {
    let backgroundImageStyle = {
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "inherit",
      backgroundColor: "#17181a",
      backgroundImage: `url(${NHLFooterImage})`,
      backgroundSize: "cover",
      opacity: 0.6,
    };

    // backgroundImageStyle.backgroundPosition = "-16px -13px";

    return backgroundImageStyle;
  };

  const [showPowerInfoModal, setShowPowerInfoModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const focusRef = useRef();
  const sheetRef = useRef();

  const powerInfoModal = () => {
    return (
      <>
        <ModalBottom visible={showPowerInfoModal}>
          <div className={classes.__info_modal}>
            <div className={classes.__close_icon}>
              <img
                src={CloseIconGrey}
                width="20px"
                height="20px"
                onClick={() => setShowPowerInfoModal(false)}
              />
            </div>
            <div className={classes.__powerInfoModalTitle}>
              <span>MY</span> POWERS
            </div>
            <br />
            <div className={classes.__powers_available}>
              <RenderIcon
                title="Point Booster"
                Icon={PointMultiplierIcon}
                iconSize={54}
                count={2}
              />

              <RenderIcon
                title="Swap Player"
                Icon={SwapPlayerIcon}
                iconSize={54}
                count={2}
              />

              <RenderIcon
                title="Undo"
                Icon={UndoIcon}
                iconSize={54}
                count={2}
              />
            </div>
            <div className={classes.__powers_available}>
              <RenderIcon
                title="Retro Boost"
                Icon={RetroBoostIcon}
                iconSize={24}
                count={1}
              />

              <RenderIcon
                title="D-Wall"
                Icon={DWallIcon}
                iconSize={54}
                count={1}
              />

              <RenderIcon
                title="Video Review"
                Icon={VideoReviewIcon}
                iconSize={54}
                count={1}
              />
            </div>

            <div className={classes.__buttons_div}>
              <Button
                title={"Gameplay Rules"}
                icon={
                  <img src={ContestRuleIcon} width="18" height="18" alt="" />
                }
                styles={{
                  marginRight: "10px",
                  backgroundColor: "rgba(242, 242, 242, 0.1)",
                  border: "0px",
                }}
              />
              <Button
                title={"Prize Grid"}
                icon={<img src={PrizeCupIcon} width="18" height="18" alt="" />}
                styles={{
                  backgroundColor: "rgba(242, 242, 242, 0.1)",
                  border: "0px",
                }}
              />
            </div>
          </div>
        </ModalBottom>
      </>
    );
  };

  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        <Header4
          titleMain1="NHL 2021"
          titleMain2="PowerdFS"
          subHeader1="Introducing Live-Play Fantasy Baseball"
          subHeader2={
            <>
              Use your <span>Powers</span> during the live game to drive your
              team up the standings
            </>
          }
          contestBtnTitle="Gameplay Rules"
          prizeBtnTitle="Prize Grid"
          bgImageUri={NHLBG}
          token={token}
          onClickPrize={() => setPrizeModalState(true)}
          isMobile={isMobile}
        />

        <div className={classes.container}>
          <div className={classes.container_left}>
            {!isMobile && (
              <>
                <h2>
                  {loading
                    ? "Loading..."
                    : isEdit
                    ? "Edit your team"
                    : "Select your team"}
                </h2>
                <div className={classes.container_left_header_2}>
                  <p>7 starters + 1 team D</p> <span className={classes.line} />
                </div>
              </>
            )}

            <div className={classes.container_top}>
              {!isMobile && <p>Select Position</p>}
              <div className={classes.container_top_1}>
                <SportsFilters
                  data={filters}
                  onSelect={onSelectFilter}
                  // activeFilter={selectedFilter}
                  selectedFilter={selectedFilter}
                />

                <SearchInput
                  onSearch={onSearch}
                  onSelect={onSelectSearchDropDown}
                  dropDown={dropDown}
                  selected={selectedDropDown}
                />
              </div>
            </div>
            {isMobile && (
              <div className={classes.select_team_info}>
                Select 1 Team Defense, Goals against result in negative points
                for your team.
              </div>
            )}

            <div className={classes.container_body}>
              <Card>
                {loading ? (
                  <p className={classes.loading_view}>Loading...</p>
                ) : (
                  <>
                    {!isMobile && (
                      <div className={classes.card_header}>
                        <p>{headerText[selectedFilter?.id - 1]?.text}</p>
                      </div>
                    )}

                    <div className={classes.card_body}>
                      {filterdData && filterdData?.data?.length ? (
                        filterdData?.data?.map((item, index) =>
                          selectedFilter?.title === CONSTANTS.FILTERS.NHL.TD ? (
                            <SportsTeamSelectionCard
                              item={item}
                              isSelected={!!selected.get(item.team_id)}
                              key={item?.team_id + " - " + item?.match_id}
                              onSelectDeselect={onSelectDeselect}
                              disabled={
                                item.isStarPlayer &&
                                item.isStarPlayer &&
                                starPowerIndex >= 3
                              }
                              mlbCard
                            />
                          ) : (
                            <SelectionCard3
                              player={item}
                              isSelected={!!selected.get(item.playerId)}
                              key={item.playerId}
                              loading={loading}
                              onSelectDeselect={onSelectDeselect}
                              pageType={PAGE_TYPES.NHL}
                              // disabled={
                              //   item.isStarPlayer &&
                              //   item.isStarPlayer &&
                              //   starPlayerCount >= 3
                              // }
                            />
                          )
                        )
                      ) : (
                        <p>No Data</p>
                      )}
                    </div>
                  </>
                )}
              </Card>
              {!isMobile && (
                <img src={AcceleRadar} className={classes.partner_logo} />
              )}
            </div>

            {isMobile ? (
              <>
                <div className={classes.container_footer}>
                  <div className={classes.container_footer_header}>
                    <div className={classes.container_footer_title}>
                      <h2>Contest Rules</h2>
                      <span className={classes.separator} />
                    </div>
                  </div>

                  <div className={classes.__mobilefooter}>
                    <div
                      style={getBackgroundImageWithStyle()}
                      className={classes.__mobilefooterimage}
                    ></div>

                    <ContestColumn title="" widthClass={classes.width_200}>
                      <div className={classes.column_body}>
                        <ContestSummaryRow
                          text={
                            <p>
                              <span>$100,000</span> Prize Pool
                            </p>
                          }
                        />
                        <ContestSummaryRow
                          text={
                            <p>
                              Live-play <span>Powers</span> included with <br />
                              entry fee
                            </p>
                          }
                        />
                        <ContestSummaryRow
                          text={
                            <p>
                              Pick players from any teams scheduled to play on{" "}
                              <span>July 19, 2021</span>
                            </p>
                          }
                        />
                      </div>
                    </ContestColumn>

                    <div className={classes.__see_full_rules}>
                      <ContestRulesPopUp
                        component={({ showPopUp }) => (
                          <button
                            onClick={showPopUp}
                            className={classes.footer_full_rules}
                            href="#"
                          >
                            See Full Rules <img src={RightArrow} />
                          </button>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className={classes.container_footer}>
                <div className={classes.container_footer_header}>
                  <ContestRulesIcon />
                  <div className={classes.container_footer_title}>
                    <h2>Contest Rules</h2>
                    <span className={classes.separator} />
                  </div>
                </div>
                <div className={classes.container_footer_1}>
                  <div className={classes.container_footer_2}>
                    <div className={classes.container_tabs}>
                      <Tabs
                        selectedIndex={activeTab}
                        onSelect={(tabIndex) => {
                          setActiveTab(tabIndex);
                        }}
                      >
                        <TabList className={classes.tabs_header}>
                          <Tab
                            className={`${activeTab === 0 && classes.active}`}
                          >
                            Summary
                          </Tab>
                          <Tab
                            className={`${activeTab === 1 && classes.active}`}
                          >
                            Scoring
                          </Tab>
                          <Tab
                            className={`${activeTab === 2 && classes.active}`}
                          >
                            Powers Available
                          </Tab>
                        </TabList>

                        <div className={classes.tab_body}>
                          <TabPanel>
                            <ContestColumn
                              title=""
                              widthClass={classes.width_200}
                            >
                              <div className={classes.column_body}>
                                <ContestSummaryRow
                                  text={
                                    <p>
                                      <span>$100,000</span> Prize Pool
                                    </p>
                                  }
                                />
                                <ContestSummaryRow
                                  text={
                                    <p>
                                      Live-play <span>Powers</span> included
                                      with entry fee
                                    </p>
                                  }
                                />
                                <ContestSummaryRow
                                  text={
                                    <p>
                                      Pick players from any teams scheduled to
                                      play on <span>July 19, 2021</span>
                                    </p>
                                  }
                                />
                              </div>
                            </ContestColumn>
                          </TabPanel>
                          <TabPanel></TabPanel>
                          <TabPanel></TabPanel>
                        </div>
                      </Tabs>
                    </div>
                  </div>
                  <ContestRulesPopUp
                    component={({ showPopUp }) => (
                      <button
                        onClick={showPopUp}
                        className={classes.footer_full_rules}
                        href="#"
                      >
                        See Full Rules <img src={RightArrow} />
                      </button>
                    )}
                  />
                </div>
                <img
                  src={NHLFooterImage}
                  className={classes.container_body_img}
                />
              </div>
            )}
          </div>

          <div className={classes.sidebar_container}>
            <Sidebar styles={{ padding: 20 }}>
              <CashPowerBalance
                showIcons={false}
                powerBalance={50000}
                cashBalance={200000}
                styles={{
                  marginTop: "-40px",
                }}
                cashTitle="Prize Pool"
                powerTitle="Top Prize"
                centered
              />
              <PowerCollapesible />
              <div className={classes.sidebar_header}>
                <h2>My Selections</h2>
                <div className={classes.sidebar_header_1}>
                  <p>
                    <span>
                      <img src={StarImg} className={classes.smallImg} />
                      Star Power
                    </span>{" "}
                    players selected
                  </p>
                </div>
                <div className={classes.sidebar_circles}>
                  <StarPlayersCheck
                    totalStarPlayers={3}
                    selectedCount={starPlayerCount}
                  />
                </div>
              </div>
              <SportsSidebarContent
                data={playerList}
                onDelete={(playerId, matchId) => onDelete(playerId, matchId)}
                starIcon={StarImg}
                selectedPlayerCount={selectedPlayerCount}
              />
              <button
                onClick={() =>
                  redirectTo(props, { path: "/nhl-live-powerdfs" })
                }
                className={classes.sidebar_button}
              >
                Submit!
              </button>
            </Sidebar>
          </div>
        </div>
      </div>
      <Footer isBlack={true} />

      {isMobile && (
        <BottomSheet
          open
          skipInitialTransition
          ref={sheetRef}
          initialFocusRef={focusRef}
          defaultSnap={({ maxHeight }) => maxHeight / 2}
          snapPoints={({ maxHeight }) => [
            maxHeight - maxHeight / 10,
            maxHeight / 5.3,
            // maxHeight * 0.6,
          ]}
          blocking={false}
          expandOnContentDrag
          onSpringStart={async (event) => {
            console.log("Event Type: ", event.type);
            if (event.type === "SNAP") {
              setIsExpanded(!isExpanded);
            }
          }}
        >
          {/* <div className={classes.closeBottomSheet}>
            <span
              onClick={() =>
                sheetRef.current.snapTo(({ snapPoints }) =>
                  Math.min(...snapPoints)
                )
              }
            >
              X
            </span>
          </div> */}

          {/* {!isExpanded && (
            <div className={classes.sidebar_header}>
              <p>
                {selectedPlayerCount}/{data?.length} Starting Players Selected
              </p>
              <div className={classes.sidebar_header_1}>
                <p>
                  <span>
                    <img src={StarImg} className={classes.smallImg} />
                    Star Power
                  </span>{" "}
                  players selected
                  <div className={classes.sidebar_circles}>
                    <StarPlayersCheck
                      totalStarPlayers={3}
                      selectedCount={starPlayerCount}
                    />
                  </div>
                </p>
              </div>
            </div>
          )} */}

          <div className={classes.sidebar_header}>
            <h2>My Selections</h2>
            <div className={classes.sidebar_header_1}>
              <p>
                <span>
                  <img src={StarImg} className={classes.smallImg} />
                  Star Power
                </span>{" "}
                players selected
              </p>
            </div>
            <div className={classes.sidebar_circles}>
              <StarPlayersCheck
                totalStarPlayers={3}
                selectedCount={starPlayerCount}
              />
            </div>
          </div>

          <SportsSidebarContent
            data={playerList}
            onDelete={(id, matchId) => onDelete(id, matchId)}
            starIcon={StarImg}
            selectedPlayerCount={selectedPlayerCount}
          />

          <button
            className={classes.sidebar_button}
            onClick={() => redirectTo(props, { path: "/nfl-live-powerdfs" })}
          >
            Submit!
          </button>
        </BottomSheet>
      )}

      {isMobile && (
        <ButtonFloating
          isRounded
          transparent
          icon={<img src={MenuIcon} width="58" height="58" alt="" />}
          iconOnly={true}
          onClick={() => setShowPowerInfoModal(true)}
        />
      )}

      {showPowerInfoModal && powerInfoModal()}

      <PrizeModal
        visible={showPrizeModal}
        sportsName="NHL"
        data={prizeData}
        onClose={() => setPrizeModalState(false)}
      />
    </>
  );
}

export default NHLPowerdFs;
