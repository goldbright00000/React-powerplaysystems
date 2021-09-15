import React, { useCallback, useState } from "react";
import "./App.css";
import Banner from "../../components/mobilecomponents/Banner";
import Header from "../../components/Header/Header";
import LiveMatch from "../../components/mobilecomponents/LiveMatch/LiveMatch";
import Tabs from "../../components/mobilecomponents/Tabs/Tabs";
import ThreeBoxes from "../../components/mobilecomponents/ThreeBoxes";
import SwapStarter from "../../components/mobilecomponents/SwapStarter/SwapStarter";
import "./mainStyle.scss";
import ScoreDetails from "./views/ScoreDetails";
import TeamManager from "./views/TeamManager";
import { useDispatch, useSelector } from "react-redux";
import * as MLBActions from '../../actions/MLBActions';
import { CardType } from "../../components/SportsLiveCard/CardType";
import moment from "moment";
import { truncate, isEmpty } from "lodash";

function App(props) {
  const { data = [], ranks = {}, onChangeXp = (xp, player) => {}  } = props || {};
  const [state, setState] = useState(1);
  const [swap, setSwap] = useState(false);
  const [secondModal, setSecondModal] = useState(false);
  const [rankss, setRanks] = useState({});
  const [liveStandingData, setLiveStandingData] = useState([]);
  const [currentWinnings, setCurrentWinnings] = useState(0);
  const [leader, setLeader] = useState(0);
  const [currentRank, setCurrentRank] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState({});
  const [loadingPlayerList, setLoadingPlayerList] = useState(false);
  const [swapPlayerList, setPlayerList] = useState({});
  const [filteredPlayerList, setFilteredPlayerList] = useState({});
  const dispatch = useDispatch();
  const { data: mlbData = [] } = useSelector((state) => state.mlb);

  const { match = {} } = data || {};

  const {
    date_time = "",
  } = match || {};
  const {
    cardType = CardType.MLB
  } = {};
  React.useEffect(async () => {
    if(JSON.stringify(rankss) !== JSON.stringify(props?.ranks))
    {
      if(
        props?.ranks?.ranking !== 0 && 
        props?.ranks?.game_id !== 0 && 
        props?.score?.ranking !== 0 && 
        props?.team_id?.ranking !== 0
      )
      setRanks(props.ranks);
      if(props?.ranks?.game_id !== 0) {
        let liveStandingsData = await dispatch(MLBActions.getLiveStandings(props?.ranks?.game_id));
        if(typeof liveStandingsData !== "undefined")
        {
          if(liveStandingsData.payload.error == false)
          {
            if(
              JSON.stringify(liveStandingsData.payload.data) !== JSON.stringify(liveStandingData)
            ) {
              var finalArr = [];
              var res = liveStandingsData.payload.data.powerDFSRanking;
              
              var user_id = parseInt(localStorage.PERSONA_USER_ID);
              var userRec = "";
              var leaderScore = 0;
              for(var i = 0; i < res.length; i++)
              {
                if(res[i].ranking == 1)
                {
                  setLeader(res[i].score);
                }
                
                if(res[i].team.user.user_id == user_id)
                {
                  
                  userRec = res[i];
                  setCurrentRank(userRec.ranking);
                  setCurrentWinnings(userRec?.winnings?.amount);
                }
                else {
                  finalArr.push(res[i]);
                }
              }
              if(userRec !== "")
              {
                finalArr.unshift(userRec);
              }
              if(JSON.stringify(liveStandingData) !== JSON.stringify(finalArr))
                setLiveStandingData(finalArr);
            }
            //setModalState(!showModal);
          }
          else {
            // alert("We are experiencing technical issues with the Power functionality. Please try again shortly.");
          }
        }
      }
    }
  },[ranks]);
  const boostModal = (value, player = {}) => {
    if(value)
    {
      setSelectedPlayer(player);
    }
    else {
      setSelectedPlayer({});
    }
    setSecondModal(!secondModal);
  };
  const toggleReplaceModal = useCallback(async (player) => {
    if (cardType === CardType.MLB) {
      setLoadingPlayerList(true);
      setSwap(true)
      const response = await dispatch(MLBActions.mlbData(props?.gameInfo?.game_id));
      if (response?.filterdList && response?.filterdList?.length) {
        const _mlbData = [...response?.filterdList];
        const [swapablePlayerData] = _mlbData?.filter(
          (data) => data?.type === `${player?.player?.type}`?.toLocaleLowerCase()
        );
        if (
          swapablePlayerData &&
          swapablePlayerData?.listData &&
          swapablePlayerData?.listData?.length
        ) {
          const _time = moment(player?.match?.date_time).clone().format("h:mm A");
          const newListData = swapablePlayerData?.listData?.filter(
            (data, index) =>
              `${data?.time}` === _time &&
              data?.playerId !== player?.player_id &&
              data[index]?.player_id !== player?.player_id
          );
          const _dataToRender = {
            type: swapablePlayerData.type,
            listData: newListData,
          };
          setPlayerList(_dataToRender);
          setFilteredPlayerList(_dataToRender);
          //setSwap(true)
        }
      }
      setLoadingPlayerList(false);
    }
  }, [mlbData]);
  const onSwap = (playerId, match_id) => {
    if (props.counts.swapCounts === 0) {
      alert("You cannot swap the players.");
      return;
    }
    const [swapablePlayer] =
      !isEmpty(data) &&
      swapPlayerList?.listData?.length &&
      swapPlayerList?.listData?.filter(
        (player) =>
          player?.playerId === playerId && player?.match_id === match_id
      );
    if (swapablePlayer) {
      props.updateReduxState(data, swapablePlayer);
      toggleReplaceModal();
      setSwap(false);
      props.useSwap(true);
    }
  };
  const swapModal = (value, player = {}) => {
    if(value)
    {
      setSelectedPlayer(player);
    }
    else {
      setSelectedPlayer({});
    }
    toggleReplaceModal(player);
    //setSwap(!swap);
  };
  const searchPlayerList = (searchTerm) => {
    let searchText = searchTerm;
    if(searchText == "")
    {
      setFilteredPlayerList(swapPlayerList);
      return;
    }
    let listData = filteredPlayerList?.listData;
    let filteredSearch = listData.filter(x => {
      let splittedName = x.playerName.split(" ");
      let found = 0;
      if(splittedName.length > 0)
      {
        for(let i = 0; i < splittedName.length; i++)
        {
          if(splittedName[i].startsWith(searchText))
          {
            found = 1;
          }
        }
      }
      if(x.homeTeam.startsWith(searchText))
      {
        found = 1;
      }
      if(found)
      {
        return x;
      }
    });
    let oldFilteredList = {
      type: swapPlayerList.type,
      listData: filteredSearch
    };
    if(JSON.stringify(oldFilteredList) !== JSON.stringify(filteredPlayerList))
      setFilteredPlayerList(oldFilteredList);
  }
  const changeComponent = (state) => {
    switch (state) {
      case 1:
        return (
          <TeamManager
            state={state}
            setState={setState}
            swap={setSwap}
            boostModal={boostModal}
            swapModal={swapModal}
            data={data}
            ranks={ranks}
            counts={props.counts}
          />
        );
      case 2:
        return <ScoreDetails state={state} setState={setState} />;
      default:
        return <TeamManager state={state} setState={setState} data={data} />;
    }
  };

  return (
    <section className="main">
      <Header />
      <Banner />
      <ThreeBoxes state={state} showTime={true} data={data}/>
      <Tabs state={state} setState={setState} />
      {changeComponent(state)}
      <LiveMatch
        swap={swap}
        setSwap={setSwap}
        secondModal={secondModal}
        setSecondModal={setSecondModal}
        boostModal={boostModal}
        swapModal={swapModal}
        ranks={rankss}
        currentWinnings={currentWinnings}
        currentRank={currentRank}
        leader={leader}
        counts={props.counts}
        onChangeXp={onChangeXp}
        data={data}
        selectedPlayer={selectedPlayer}
        gameInfo={props?.gameInfo}
      />
      <SwapStarter swap={swap} swapModal={setSwap} selectedPlayer={selectedPlayer} swapPlayerList={filteredPlayerList} onSwap={onSwap} loadingPlayerList={loadingPlayerList} searchPlayerList={searchPlayerList}/>
    </section>
    
  );
}

export default App;
