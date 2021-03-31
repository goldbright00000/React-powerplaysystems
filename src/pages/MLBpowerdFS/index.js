import React, { useState, useCallback } from "react";
import { isEmpty, isEqual } from "lodash";

import classes from "./index.module.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Header4 from "../../components/Header4";
import BaseballImage from "../../assets/baseball.jpg";
import Tick2 from "../../icons/Tick2";
import ContestRulesIcon from "../../icons/ContestRules";
import RightArrow from "../../assets/right-arrow.png";
import MLBFooterImage from "../../assets/MLB.png";
import PowerPlayIcon from "../../assets/token.png";
import Card from "../../components/PowerpickCard";
import Sidebar from "../../components/Sidebar";
import CashPowerBalance from "../../components/CashPowerBalance";
import Circle from "../../icons/CircleEmpty";
import SportsSidebarContent from "../../components/SportsSidebarContent";
import SelectionCard3 from "../../components/SportsSelectionCard3";
import EmployeeIcon from "../../icons/Employee";
import SportsFilters from "../../components/SportsFilters";
import CheckIcon from "../../icons/Check";
import SelectionCard2 from "../../components/SportsSelectionCard2";
import Search from "../../components/SearchInput";
import PowerCollapesible from "../../components/PowerCollapesible";
import { dummyData } from "./dummyData";
import { CONSTANTS } from "../../utility/constants";
import StarIcon from "../../icons/Star";

const { P, C, SS, XB, OF, D } = CONSTANTS.FILTERS.MLB;

const INITIAL_PLAYER_LIST = [
  {
    title: P,
    value: "",
    filter: P,
    playerId: "",
  },
  {
    title: C,
    value: "",
    filter: C,
    playerId: "",
  },
  {
    title: C,
    value: "",
    filter: C,
    playerId: "",
  },
  {
    title: SS,
    value: "",
    filter: SS,
    playerId: "",
  },
  {
    title: SS,
    value: "",
    filter: SS,
    playerId: "",
  },
  {
    title: XB,
    value: "",
    filter: XB,
    playerId: "",
  },
  {
    title: OF,
    value: "",
    filter: OF,
    playerId: "",
  },
  {
    title: D,
    value: "",
    icon: EmployeeIcon,
    filter: D,
    playerId: "",
  },
];

const FILTERS_INITIAL_VALUES = [
  {
    id: 1,
    title: P,
    remaining: 1,
  },
  {
    id: 2,
    title: C,
    remaining: 1,
  },
  {
    id: 3,
    title: SS,
    remaining: 1,
  },
  {
    id: 4,
    title: XB,
    remaining: 2,
  },
  {
    id: 5,
    title: OF,
    remaining: 2,
  },
  {
    id: 6,
    title: D,
    remaining: 1,
  },
];

let starPowerIndex = 0;

const dropDown = [
  { title: "Team A" },
  { title: "Team B" },
  { title: "Team C" },
  { title: "Team D" },
];

function MLBPowerdFs() {
  const [selected, setSelected] = useState(new Map());
  const [selectedFilter, setSelectedFilter] = useState(
    FILTERS_INITIAL_VALUES[0]
  );
  const [selectedStarPowers, setStarPowers] = useState([false, false, false]);
  const [playerList, setPlayerList] = useState(INITIAL_PLAYER_LIST);
  const [filters, setFilters] = useState(FILTERS_INITIAL_VALUES);
  const [selectedData, setSelectedData] = useState(dummyData[0]);
  const [filterdData, setFilterdData] = useState(dummyData[0]);
  const [selectedDropDown, setSelectedDropDown] = useState();

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
      const _selectedStarPowers = [...selectedStarPowers]; //starPower players

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
          if (starPowerIndex < 3 && data?.isStarPlayer) {
            _selectedStarPowers[starPowerIndex] = true;
            starPowerIndex++;
          }
        }
      } else {
        let existingPlayerIndex = _playersList?.findIndex((player) =>
          isEqual(player?.playerId, data?.id)
        );

        if (existingPlayerIndex !== -1) {
          _selected.set(id, !selected.get(id));
          if (
            starPowerIndex > 0 &&
            _playersList[existingPlayerIndex].isStarPlayer
          ) {
            starPowerIndex--;
            _selectedStarPowers[starPowerIndex] = false;
          }

          _playersList[existingPlayerIndex].value = "";
          _playersList[existingPlayerIndex].playerId = "";
          _playersList[existingPlayerIndex].isStarPlayer = false;
        }
      }

      setSelected(_selected);
      setStarPowers(_selectedStarPowers);
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
                  <p>
                    Select 1 Team Defense, Goals against result in negative
                    points for your team.
                  </p>
                </div>

                <div className={classes.card_body}>
                  {filterdData && filterdData?.data?.length ? (
                    filterdData?.data?.map((item, index) =>
                      selectedFilter?.title === D ? (
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
                            starPowerIndex >= 3
                          }
                        />
                      ) : (
                        <SelectionCard3
                          item={item}
                          isSelected={!!selected.get(item.id)}
                          key={item.id}
                          onSelectDeselect={onSelectDeselect}
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
              </Card>
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
                <div className={classes.container_footer_header_1}>
                  <p>
                    <Tick2 size={25} /> No purchase necessary.
                  </p>
                  <p>
                    <Tick2 size={25} /> Open to residents of United States who
                    are over the age of majority.
                  </p>
                  <p>
                    <Tick2 size={25} /> Contest closes at 11:59pm ET - April 22,
                    2020.
                  </p>
                </div>
                <div className={classes.container_footer_body}>
                  <p>
                    <span /> Five (5) prizes to be won. See full rules for
                    complete details of all prizes.
                  </p>
                  <p>
                    <span /> One entry per person.
                  </p>
                  <p>
                    <span /> Odds of winning depend on player knowledge.
                  </p>
                  <p>
                    <span /> Mathematical skill testing question must be
                    correctly answered to win.
                  </p>

                  <button>
                    See Full Rules <img src={RightArrow} />
                  </button>

                  <img
                    src={MLBFooterImage}
                    className={classes.container_body_img}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={classes.sidebar_container}>
            <Sidebar>
              <CashPowerBalance
                showIcons={false}
                powerBalance={50000}
                cashBalance={200000}
                styles={{
                  width: "100%",
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
                      <StarIcon size={16} />
                      Star Power
                    </span>{" "}
                    players selected
                  </p>
                </div>
                <div className={classes.sidebar_circles}>
                  {selectedStarPowers?.map((isSelected, index) =>
                    isSelected ? (
                      <CheckIcon />
                    ) : (
                      <Circle key={index.toString()} />
                    )
                  )}
                </div>
              </div>
              <SportsSidebarContent
                data={playerList}
                onDelete={(playerId) => onDelete(playerId)}
              />
              <button className={classes.sidebar_button}>Submit!</button>
            </Sidebar>
          </div>
        </div>
      </div>
      <Footer isBlack={true} />
    </>
  );
}

export default MLBPowerdFs;
