import React, { useState } from "react";
import "./App.css";
import Banner from "../../components/mobilecomponents/Banner";
import Header from "../../components/Header/Header";
import LiveMatch from "../../components/mobilecomponents/LiveMatch/LiveMatch";
import Tabs from "../../components/mobilecomponents/Tabs/Tabs";
import ThreeBoxes from "../../components/mobilecomponents/ThreeBoxes";

import "./mainStyle.scss";
import ScoreDetails from "./views/ScoreDetails";
import TeamManager from "./views/TeamManager";
import { useDispatch } from "react-redux";
import * as MLBActions from '../../actions/MLBActions';

function App(props) {
  const { data = [], ranks = {} } = props || {};

  const [state, setState] = useState(1);
  const [swap, setSwap] = useState(false);
  const [secondModal, setSecondModal] = useState(false);
  const [rankss, setRanks] = useState({});
  const [liveStandingData, setLiveStandingData] = useState([]);
  const [currentWinnings, setCurrentWinnings] = useState(0);
  const [leader, setLeader] = useState(0);
  const [currentRank, setCurrentRank] = useState(0);
  const dispatch = useDispatch();

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
        console.log("liveStandingsData", liveStandingsData);
        if(typeof liveStandingsData !== "undefined")
        {
          console.log("liveStandingsData2");
          if(liveStandingsData.payload.error == false)
          {
            console.log("liveStandingsData3");
            if(
              JSON.stringify(liveStandingsData.payload.data) !== JSON.stringify(liveStandingData)
            ) {
              console.log("liveStandingsData4");
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
  const boostModal = (value) => {
    setSecondModal(!secondModal);
  };

  const swapModal = (value) => {
    setSwap(!swap);
  };
  const changeComponent = (state) => {
    console.log(ranks);
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
      />
    </section>
  );
}

export default App;
