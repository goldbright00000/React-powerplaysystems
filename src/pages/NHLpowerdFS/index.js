import React, { useState, useCallback, useEffect } from "react";
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
import SelectionCard2 from "../../components/SportsSelectionCard2";
import EmployeeIcon from "../../icons/Employee";
import SportsFilters from "../../components/SportsFilters";
import { CONSTANTS } from "../../utility/constants";
import SportsContestRules from "../../components/SportsContestRules";
import { redirectTo } from "../../utility/shared";

import { dummyData } from "./dummyData";
import SearchInput from "../../components/SearchInput";
import StarPlayersCheck from "../../components/StarPlayersCheck";
import Header5 from "../../components/Header5";
import PowerCollapesible from "../../components/PowerCollapesible";
import ContestRulesIcon from "../../icons/ContestRules";
import RightArrow from "../../assets/right-arrow.png";
import Tick2 from "../../icons/Tick2";
import ContestRulesPopUp from "../../components/ContestRulesPopUp";

const INITIAL_PLAYER_LIST = [
  {
    title: "C1",
    value: "",
    filter: CONSTANTS.FILTERS.NHL.CENTER,
    playerId: "",
  },
  {
    title: "C2",
    value: "",
    filter: CONSTANTS.FILTERS.NHL.CENTER,
    playerId: "",
  },
  {
    title: "LW",
    value: "",
    filter: CONSTANTS.FILTERS.NHL.LW,
    playerId: "",
  },
  {
    title: "RW",
    value: "",
    filter: CONSTANTS.FILTERS.NHL.RW,
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
    remaining: 2,
  },
  {
    id: 2,
    title: CONSTANTS.FILTERS.NHL.LW,
    remaining: 1,
  },
  {
    id: 3,
    title: CONSTANTS.FILTERS.NHL.RW,
    remaining: 1,
  },
  {
    id: 4,
    title: CONSTANTS.FILTERS.NHL.D,
    remaining: 2,
  },
  {
    id: 5,
    title: CONSTANTS.FILTERS.NHL.G,
    remaining: 1,
  },
  {
    id: 6,
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

function NHLPowerdFs(props) {
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

  const { data = [] } = useSelector((state) => state.nhl);
  const { auth: { user: { token = '' } } = {} } = useSelector((state) => state);

  const dispatch = useDispatch();

  //reset the states
  useEffect(() => {
    starPlayerCount = 0;
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

  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        <Header5
          titleMain1="NHL 2021"
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
          bgImageUri={NHLBG}
          token={token}
        />

        <div className={classes.container}>
          <div className={classes.container_left}>
            <h2>Select your team</h2>
            <div className={classes.container_left_header_2}>
              <p>7 starters + 1 team D</p> <span className={classes.line} />
            </div>

            <div className={classes.container_top}>
              <p>Select Position</p>
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

            <div className={classes.container_body}>
              <Card>
                {filterdData && filterdData?.data?.length ? (
                  filterdData?.data?.map((item, index) =>
                    selectedFilter?.title === CONSTANTS.FILTERS.NHL.TD ? (
                      <SelectionCard2
                        title={item.title}
                        avgVal={item.avgVal}
                        teamA={item.teamA}
                        teamB={item.teamB}
                        time={item.time}
                        date={item.date}
                        stadium={item.stadium}
                        isSelected={!!selected.get(item.id)}
                        key={item.id}
                        onSelectDeselect={onSelectDeselect}
                        id={item.id}
                        steps={item?.steps && item?.steps}
                        isStarPlayer={item.isStarPlayer && item.isStarPlayer}
                        disabled={
                          item.isStarPlayer &&
                          item.isStarPlayer &&
                          starPlayerCount >= 3
                        }
                      />
                    ) : (
                      <SelectionCard
                        item={item}
                        isSelected={!!selected.get(item.id)}
                        key={item.id}
                        onSelectDeselect={onSelectDeselect}
                        disabled={
                          item.isStarPlayer &&
                          item.isStarPlayer &&
                          starPlayerCount >= 3
                        }
                      />
                    )
                  )
                ) : (
                  <>No Data</>
                )}
              </Card>
              <img src={AcceleRadar} className={classes.partner_logo} />
            </div>

            {/* <SportsContestRules
              img={NHLFooterImage}
              basicRules={basicRules}
              detailRules={detailRules}
            /> */}
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
                        <Tab className={`${activeTab === 0 && classes.active}`}>
                          Summary
                        </Tab>
                        <Tab className={`${activeTab === 1 && classes.active}`}>
                          Scoring
                        </Tab>
                        <Tab className={`${activeTab === 2 && classes.active}`}>
                          Powers Available
                        </Tab>
                      </TabList>

                      <div className={classes.tab_body}>
                        <TabPanel>
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
                                  Live-play <span>Powers</span> included with entry
                                  fee
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
                        </TabPanel>
                        <TabPanel>
                        
                        </TabPanel>
                        <TabPanel>
                          
                        </TabPanel>
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
          </div>
          <div className={classes.sidebar_container}>
            <Sidebar styles={{ padding: 20}}>
              <CashPowerBalance
                showIcons={false}
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
              <PowerCollapesible />
              <div className={classes.sidebar_header}>
                <h2>My Selections</h2>
                <div className={classes.sidebar_header_1}>
                  <img src={PowerPlayIcon} />
                  <p>0/3 Star Power Players Selected</p>
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
                onDelete={(playerId) => onDelete(playerId)}
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
    </>
  );
}

export default NHLPowerdFs;
