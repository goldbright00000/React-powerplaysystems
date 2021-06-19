import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty, cloneDeep } from "lodash";

import * as NFLActions from "../../actions/NFLActions";

import classes from "./index.module.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import NFLBGImage from "../../assets/nfl-header-background.png";
import Tick2 from "../../icons/Tick2";
import ContestRulesIcon from "../../icons/ContestRules";
import RightArrow from "../../assets/right-arrow.png";
import NFLFooterImage from "../../assets/nfl.png";
import Card from "../../components/PowerpickCard";
import Sidebar from "../../components/Sidebar";
import CashPowerBalance from "../../components/CashPowerBalance";
import SportsSidebarContent from "../../components/SportsSidebarContent";
import SelectionCard3 from "../../components/SportsSelectionCard3";
import EmployeeIcon from "../../icons/Employee";
import SportsFilters from "../../components/SportsFilters";
import SportsTeamSelectionCard from "../../components/SportsTeamSelectionCard";
import Search from "../../components/SearchInput";
import PowerCollapesible from "../../components/PowerCollapesible";
import { dummyData } from "./dummyData";
import { CONSTANTS } from "../../utility/constants";
import AcceleRadar from "../../assets/partners/acceleradar.png";
import StarImg from "../../assets/star.png";
import ContestRulesPopUp from "../../components/ContestRulesPopUp";
import StarPlayersCheck from "../../components/StarPlayersCheck";
import { redirectTo } from "../../utility/shared";
import PrizeModal from "../../components/PrizeModal";
import Header5 from "../../components/Header5";
import { PAGE_TYPES } from "../../components/SportsSelectionCard3/PageTypes";

const { QB, RB, WR, TE, K, D } = CONSTANTS.FILTERS.NFL;

const INITIAL_PLAYER_LIST = [
  {
    title: QB,
    name: "",
    filter: QB,
    playerId: "",
  },
  {
    title: `${RB}1`,
    name: "",
    filter: RB,
    playerId: "",
  },
  {
    title: `${RB}2`,
    name: "",
    filter: RB,
    playerId: "",
  },
  {
    title: `${WR}1`,
    name: "",
    filter: WR,
    playerId: "",
  },
  {
    title: `${WR}2`,
    name: "",
    filter: WR,
    playerId: "",
  },
  {
    title: TE,
    name: "",
    filter: TE,
    playerId: "",
  },
  {
    title: K,
    name: "",
    filter: K,
    playerId: "",
  },
  {
    title: D,
    name: "",
    icon: EmployeeIcon,
    filter: D,
    playerId: "",
  },
];

const FILTERS_INITIAL_VALUES = [
  {
    id: 1,
    title: QB,
    remaining: 1,
  },
  {
    id: 2,
    title: RB,
    remaining: 2,
  },
  {
    id: 3,
    title: WR,
    remaining: 2,
  },
  {
    id: 4,
    title: TE,
    remaining: 1,
  },
  {
    id: 5,
    title: K,
    remaining: 1,
  },
  {
    id: 6,
    title: D,
    remaining: 1,
  },
];

const dropDown = [
  {
    team_id: "all",
    name: "All Teams",
  },
  {
    team_id: "a",
    name: "Team A",
  },
  {
    team_id: "b",
    name: "Team B",
  },
  {
    team_id: "c",
    name: "Team C",
  },
];

const contestScoring = {
  data1: [
    { title: "Passing TD", points: "+6 pts" },
    { title: "Receiving TD", points: "+6 pts" },
    { title: "Safety", points: "+2 pts" },
    { title: "Extra Pt", points: "+1 pts" },
    { title: "2-point convert", points: "+2 pt/10 yards" },
    { title: "Rushing Yards", points: "+1 pt/10 yards" },
    { title: "Passing Yards", points: "+1 pt/25 yards" },
    { title: "Receiving Yards", points: "+1 pt/10 yards" },
  ],
  data2: [
    { title: "FG 50+ Yards", points: "+5 pts" },
    { title: "FG 40-49 Yards", points: "+4 pts" },
    { title: "FG 39 yards or less", points: "+3 pts" },
  ],
};

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

let starPowerIndex = 0;
let selectedPlayerCount = 0;

function NFLPowerdFs(props) {
  const [selected, setSelected] = useState(new Map());
  const [selectedFilter, setSelectedFilter] = useState(
    FILTERS_INITIAL_VALUES[0]
  );
  const [playerList, setPlayerList] = useState(INITIAL_PLAYER_LIST);
  const [filters, setFilters] = useState(FILTERS_INITIAL_VALUES);
  const [selectedData, setSelectedData] = useState(dummyData[0]);
  const [filterdData, setFilterdData] = useState(dummyData[0]);
  const [selectedDropDown, setSelectedDropDown] = useState();
  const [showPrizeModal, setPrizeModalState] = useState(false);
  const [dropDownState, setDropDownTeam] = useState([]);

  const { data = [], starPlayerCount = 0 } = useSelector((state) => state.nfl);
  const { auth: { user: { token = "" } } = {} } = useSelector((state) => state);
  const dispatch = useDispatch();

  //reset the states
  useEffect(() => {
    dispatch(NFLActions.nflData(dummyData));
    dispatch(NFLActions.setStarPlayerCount(0));
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

      //set dropdown
      const _dropDownlist = data?.filter(
        (list) => list?.type === "d" || list?.type === "D"
      );
      const dropDownTeams = [
        {
          team_id: "all",
          name: "All Teams",
        },
        ..._dropDownlist?.[0]?.listData,
      ];
      setDropDownTeam(dropDownTeams);
    }
  }, [data]);

  const onSelectDeselect = useCallback(
    (id, matchId) => {
      const _data = filterdData?.listData?.filter((player) => {
        if (selectedData?.type === D) {
          return player?.playerId === id && matchId === player?.match_id;
        } else {
          return player?.playerId === id && matchId === player?.match_id;
        }
      });

      const playerOrTeam = _data?.[0] || [];

      const _selected = new Map(selected);
      let _starPlayerCount = starPlayerCount;

      //selected players
      const _playersList = [...playerList];

      if (!_selected.get(id)) {
        const [_player] = _playersList?.filter((player) => {
          if (selectedData?.type === D) {
            return (
              player?.filter === selectedData?.type && isEmpty(player.team)
            );
          } else {
            return (
              player?.filter === selectedData?.type && isEmpty(player.player)
            );
          }
        });
        if (!isEmpty(_player)) {
          let _playerOrTeam = {};
          if (selectedData?.type === D) {
            _playerOrTeam = _player?.team;
          } else {
            _playerOrTeam = _player?.player;
          }

          if (isEmpty(_playerOrTeam)) {
            const playerListIndex = _playersList?.indexOf(_player);
            const player = { ..._player };
            if (selectedData?.type === D) {
              player.team = playerOrTeam;
            } else {
              player.player = playerOrTeam;
            }

            player.matchId = playerOrTeam?.match_id;
            _playersList[playerListIndex] = player;

            _selected.set(id, !selected.get(id));
            //Star Power Player selection (sidebar)
            if (starPlayerCount < 3 && playerOrTeam?.isStarPlayer) {
              _starPlayerCount++;
            }
            selectedPlayerCount++;
          }
        }
      } else {
        let existingPlayerIndex = _playersList?.findIndex((obj) => {
          if (selectedData?.type === D) {
            return obj?.team?.playerId === playerOrTeam?.playerId;
          } else {
            return obj?.player?.playerId === playerOrTeam?.playerId;
          }
        });

        if (existingPlayerIndex !== -1) {
          _selected.set(id, !selected.get(id));
          if (
            starPlayerCount > 0 &&
            _playersList[existingPlayerIndex].isStarPlayer
          ) {
            _starPlayerCount--;
          }

          if (selectedData?.type === D) {
            _playersList[existingPlayerIndex].team = {};
          } else {
            _playersList[existingPlayerIndex].player = {};
          }
        }
        selectedPlayerCount--;
      }

      dispatch(NFLActions.setStarPlayerCount(_starPlayerCount));
      setSelected(_selected);
      setPlayerList(_playersList);
      activateFilter(playerOrTeam, selectedData?.type);
    },
    [selected, selectedFilter, selectedData]
  );

  const onSelectFilter = useCallback(
    (title) => {
      const [_selectedFilter] = filters?.filter(
        (filter) => filter.title === title
      );
      const [_selectedData] = dummyData?.filter(
        (data) => data?.type === _selectedFilter?.title
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
    let _remaining = _selectedFilter?.remaining;
    if (_remaining > 0) {
      if (!!!selected.get(player?.playerId)) _remaining -= 1;
      else if (_remaining < 2) _remaining += 1;
      if (_remaining <= 0) {
        _remaining = 0;
        setSelectedFilter(_selectedFilter);
      }
    } else if (!!selected.get(player?.playerId) && _remaining < 2) {
      _remaining++;
    } else {
      setSelectedFilter(_selectedFilter);
    }

    _selectedFilter.remaining = _remaining;
    const filterIndex = filters?.findIndex(
      (filter) => filter?.id === _selectedFilter?.id
    );
    const _filters = [...filters];
    _filters[filterIndex] = _selectedFilter;
    setFilters(_filters);
  };

  const onDelete = (playerId, match_id) => {
    onSelectDeselect(playerId, match_id);
  };

  const onSearch = (e) => {
    const { value } = e.target;
    if (!isEmpty(value)) {
      const _filterdData = selectedData?.listData?.filter((data) =>
        data?.title?.toLocaleLowerCase()?.includes(value?.toLocaleLowerCase())
      );
      const _filterdDataObj = {
        type: selectedData?.type,
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
          titleMain1="NFL 2021"
          titleMain2="PowerdFS"
          subHeader1="Introducing Live-Play Fantasy Football"
          subHeader2={
            <>
              Use your <span>Powers</span> during the live game to drive your
              team up the standings
            </>
          }
          contestBtnTitle="Contest Rules"
          prizeBtnTitle="Prize Grid"
          bgImageUri={NFLBGImage}
          onClickPrize={() => setPrizeModalState(true)}
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
                  selectedFilter={selectedFilter}
                />

                <Search
                  onSearch={onSearch}
                  onSelect={onSelectSearchDropDown}
                  dropDown={dropDown}
                  selected={selectedDropDown}
                />
              </div>
            </div>

            <div className={classes.container_body}>
              <Card>
                <div className={classes.card_header}>
                  <p>{headerText[selectedFilter?.id - 1]?.text}</p>
                </div>

                <div className={classes.card_body}>
                  {filterdData && filterdData?.listData?.length ? (
                    filterdData?.listData?.map((item, index) => (
                      <>
                        {selectedFilter?.title === D ? (
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
                            onSelectDeselect={onSelectDeselect}
                            pageType={PAGE_TYPES.NFL}
                            // disabled={
                            //   item.isStarPlayer &&
                            //   item.isStarPlayer &&
                            //   starPlayerCount >= 3
                            // }
                          />
                        )}
                      </>
                    ))
                  ) : (
                    <p>No Data</p>
                  )}
                </div>
              </Card>
              <img src={AcceleRadar} className={classes.partner_logo} />
            </div>

            <div className={classes.container_footer}>
              <div className={classes.container_footer_header}>
                <ContestRulesIcon />
                <div className={classes.container_footer_title}>
                  <h2>Contest Rules</h2>
                  <span className={classes.separator} />
                </div>
              </div>
              <div className={classes.container_footer_1}>
                <div className={classes.first_column}>
                  <ContestColumn title="Summary" widthClass={classes.width_200}>
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
                <div className={classes.second_column}>
                  <ContestColumn title="Scoring">
                    <div className={classes.contest_scoring_wrapper}>
                      <ContestScoringColumn
                        title=""
                        data={contestScoring.data1}
                      />
                    </div>
                  </ContestColumn>
                </div>
                <div className={classes.third_column}>
                  <ContestScoringColumn
                    title=""
                    data={contestScoring.data2}
                    styles={{ width: "235px", marginTop: 48 }}
                  />
                  <div className={classes.container_body_img_div}>
                    <img
                      src={NFLFooterImage}
                      className={classes.container_body_img}
                    />
                  </div>
                </div>
              </div>
            </div>
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
                className={classes.sidebar_button}
                onClick={() =>
                  redirectTo(props, { path: "/nfl-live-powerdfs" })
                }
              >
                Submit!
              </button>
            </Sidebar>
          </div>
        </div>
      </div>
      <Footer isBlack={true} />

      <PrizeModal
        visible={showPrizeModal}
        sportsName="MLB"
        data={prizeData}
        onClose={() => setPrizeModalState(false)}
      />
    </>
  );
}

export default NFLPowerdFs;
