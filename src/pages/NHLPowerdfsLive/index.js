import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, union } from "lodash";
import * as CryptoJS from "crypto-js";

import classes from "./index.module.scss";
import * as NHLActions from "../../actions/NHLActions";
import _ from "underscore";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Header4 from "../../components/Header4";
import BaseballImage from "../../assets/hockey1.png";
import Card from "../../components/PowerpickCard";
import Sidebar from "../../components/Sidebar";
import CashPowerBalance from "../../components/CashPowerBalance";
import XPIcon from "../../icons/XPIcon";
import LockIcon from "../../icons/Lock";
import TwitterIcon from "../../icons/TwitterIcon";
import FacebookIcon from "../../icons/FacebookIcon";
import PowerSidebar from "../../components/PowerCollapesible";
import NHLLiveSportsHeader from "../../components/NHLLiveSportsHeader";
import FooterImage from "../../assets/NHL-live-footer.png";
import RankCard from "../../components/RankCard";
import { CONSTANTS } from "../../utility/constants";
import SingleView from "./SingleView/SingleView";
import SportsLiveCard from "../../components/SportsLiveCard";
import { getLocalStorage, printLog, redirectTo } from "../../utility/shared";
import { socket, socketNHL } from "../../config/server_connection";
import SportsLiveCardTeamD from "../../components/SportsLiveCard/TeamD";
import Mobile from "../../pages/Mobile/Mobile";
import PrizeModal from "../../components/PrizeModal";

import LiveStandings from "../../components/LiveStandings";
import MyScoreCard from "./MyScoreCard";
import TeamManager from "./TeamManager";

const { CENTER, XW, D, G, TD } = CONSTANTS.FILTERS.NHL;
const {
  NHL_CONNECT_MATCH_ROOM,
  NHL_GET_MATCH_ROOM_UPDATES,
  ALL_UPDATES,
  ON_ROOM_SUB,
  ON_ROOM_UN_SUB,
  EMIT_ROOM,
  ON_POWER_APPLIED,
  ON_GLOBAL_RANKING_REQUEST,
  ON_FANTASY_LOGS_REQUEST,
  GET_GLOBAL_RANKING,
  MATCH_UPDATE,
  GLOBAL_RANKING,
  FANTASY_TEAM_UPDATE,
} = CONSTANTS.SOCKET_EVENTS.NHL.LIVE;

// let _socket = null;
let _socket = socketNHL();
let isMatchUpdate = false;

const POWER_IDs = {
  SWAP_POWER: 4,
  D_WALL: 5,
  CHALLENGE: 6,
  RETRO_BOOST: 10,
  POINT_BOOSTER_1_5X: 11,
  POINT_BOOSTER_2X: 12,
  POINT_BOOSTER_3X: 13,
};

function NHLPowerdFsLive(props) {
  const [loading, setLoading] = useState(false);
  const [updatesLoaded, setUpdatesLoading] = useState(false);
  const [screenSize, setScreenSize] = useState(window.screen.width);

  const [compressedView, setCompressedView] = useState(false);
  const [selectedView, setSelectedView] = useState(CONSTANTS.NHL_VIEW.FV);
  const [learnMoreModal, setLearnMoreModal] = useState(false);
  const [points, setPoints] = useState(0);

  const [playerIds, setPlayerIds] = useState([]);
  const [matchUpdateData, setMatchUpdateData] = useState({});
  const [ranks, setRanks] = useState({
    ranking: 0,
    score: 0,
    game_id: 0,
    team_id: 0,
  });
  const [powersInventory, setPowersInventory] = useState({
    swap: 2,
    point_multiplier: 0,
    d_wall: 1,
    challenge: 1,
  });
  const [playerToSwap, setPlayerToSwap] = useState({});

  const [swapCounts, setSwapCounts] = useState(0);
  const [dwallCounts, setDwallCounts] = useState(0);
  const [challengeCounts, setChallengeCounts] = useState(0);
  const [pointMultiplierCounts, setPointMultiplierCounts] = useState(0);
  const [pointBooster15x, setPointBooster15xCounts] = useState(0);
  const [pointBooster2x, setPointBooster2xCounts] = useState(0);
  const [pointBooster3x, setPointBooster3xCounts] = useState(0);
  const [retroBoostCounts, setRetroBoostCounts] = useState(0);
  const [powerUpCounts, setPowerUpCounts] = useState(0);
  const [showGameLogs, setGameLogsPageState] = useState(false);
  const [showPrizeModal, setPrizeModalState] = useState(false);
  const [prizes, setPrizes] = useState([]);
  const dispatch = useDispatch();
  const selectedTeam = getTeamFromLocalStorage();

  function getGameIDFromLocalStorage() {
    const gameID = getLocalStorage(
      CONSTANTS.LOCAL_STORAGE_KEYS.NHL_LIVE_GAME_ID
    );
    if (gameID) {
      dispatch({
        type: NHLActions.NHL_UPDATE_STATE,
        payload: { gameID },
      });
    }
    return gameID;
  }

  const {
    live_data = [
      {
        _id: "6151cee50676e7bcd619f83f",
        id: "053ce05a-4ae2-4a9f-a1bd-59dcd4fd3452",
        abbr_name: "J.Finley",
        birth_place: "Kelowna, BC, CAN",
        birthdate: "2002-09-02",
        created_date: "2021-09-27 14:01:57",
        draft: {
          team_id: "4417d3cb-0f24-11e2-8525-18a905767e44",
          year: 2020,
          round: "2",
          pick: "57",
        },
        first_name: "Jack",
        full_name: "Jack Finley",
        handedness: "R",
        height: 78,
        jersey_number: "62",
        last_name: "Finley",
        last_updated: "2021-09-27 14:33:29",
        league: {
          id: "fd560107-a85b-4388-ab0d-655ad022aff7",
          name: "NHL",
          alias: "NHL",
        },
        position: "F",
        primary_position: "C",
        sr_id: "sr:player:2079231",
        status: "ACT",
        team: {
          id: "4417d3cb-0f24-11e2-8525-18a905767e44",
          name: "Lightning",
          market: "Tampa Bay",
          alias: "TB",
          sr_id: "sr:team:3694",
          reference: "14",
        },
        updated: "2021-09-24T04:05:58+00:00",
        weight: 221,
        fantasyPlayerPosition: "C",
        type: "C",
        match: {
          _id: "6151bbde0676e7bcd6ff2d66",
          id: "6c0c3325-bd98-469d-879b-16378ac5f051",
          away: {
            id: "44153da1-0f24-11e2-8525-18a905767e44",
            name: "Arizona Coyotes",
            alias: "ARI",
            sr_id: "sr:team:3698",
            reference: "53",
          },
          coverage: "full",
          created_date: "2021-09-27 12:41:00",
          home: {
            id: "4417d3cb-0f24-11e2-8525-18a905767e44",
            name: "Tampa Bay Lightning",
            alias: "TB",
            sr_id: "sr:team:3694",
            reference: "14",
          },
          last_updated: "2021-09-28 09:34:12",
          reference: "20102",
          scheduled: "2021-10-28T23:00:00+00:00",
          status: "scheduled",
          venue: {
            id: "05aa49b2-f72d-4d42-ab30-f219d32ed97b",
            name: "Amalie Arena",
            capacity: 19092,
            address: "401 Channelside Drive",
            city: "Tampa",
            state: "FL",
            zip: "33602",
            country: "USA",
            time_zone: "US/Eastern",
            sr_id: "sr:venue:6036",
          },
        },
        match_id: 1,
        positionID: 1,
      },
      {
        _id: "6151ced50676e7bcd619d7f1",
        id: "4c7dc8da-7b5d-4eb2-a2b8-301f74edf88f",
        abbr_name: "B.Katchouk",
        birth_place: "Waterloo, ON, CAN",
        birthdate: "1998-06-18",
        created_date: "2021-09-27 14:01:56",
        draft: {
          team_id: "4417d3cb-0f24-11e2-8525-18a905767e44",
          year: 2016,
          round: "2",
          pick: "44",
        },
        experience: "0",
        first_name: "Boris",
        full_name: "Boris Katchouk",
        handedness: "L",
        height: 74,
        jersey_number: "13",
        last_name: "Katchouk",
        last_updated: "2021-09-27 14:33:29",
        league: {
          id: "fd560107-a85b-4388-ab0d-655ad022aff7",
          name: "NHL",
          alias: "NHL",
        },
        position: "F",
        primary_position: "LW",
        reference: "8479383",
        seasons: [
          {
            id: "906a801f-c326-4232-b687-08304f752e64",
            year: 2020,
            type: "PST",
            teams: [
              {
                id: "4417d3cb-0f24-11e2-8525-18a905767e44",
                name: "Lightning",
                market: "Tampa Bay",
                alias: "TB",
                sr_id: "sr:team:3694",
                reference: "14",
                statistics: {
                  total: {
                    games_played: 0,
                    goals: 0,
                    assists: 0,
                    penalties: 0,
                    penalty_minutes: 0,
                    shots: 0,
                    blocked_att: 0,
                    missed_shots: 0,
                    hits: 0,
                    giveaways: 0,
                    takeaways: 0,
                    blocked_shots: 0,
                    faceoffs_won: 0,
                    faceoffs_lost: 0,
                    winning_goals: 0,
                    plus_minus: 0,
                    games_scratched: 23,
                    games_started: 0,
                    shooting_pct: 0,
                    faceoff_win_pct: 0,
                    faceoffs: 0,
                    points: 0,
                    overtime_goals: 0,
                    overtime_assists: 0,
                    overtime_shots: 0,
                    penalties_major: 0,
                    penalties_minor: 0,
                    penalties_misconduct: 0,
                    emptynet_goals: 0,
                  },
                  powerplay: {
                    shots: 0,
                    goals: 0,
                    missed_shots: 0,
                    assists: 0,
                    faceoffs_won: 0,
                    faceoffs: 0,
                    faceoffs_lost: 0,
                    faceoff_win_pct: 0,
                  },
                  shorthanded: {
                    shots: 0,
                    goals: 0,
                    missed_shots: 0,
                    assists: 0,
                    faceoffs_won: 0,
                    faceoffs: 0,
                    faceoffs_lost: 0,
                    faceoff_win_pct: 0,
                  },
                  evenstrength: {
                    shots: 0,
                    goals: 0,
                    missed_shots: 0,
                    assists: 0,
                    faceoffs_won: 0,
                    faceoffs: 0,
                    faceoffs_lost: 0,
                    faceoff_win_pct: 0,
                  },
                  penalty: {
                    shots: 0,
                    goals: 0,
                    missed_shots: 0,
                  },
                  shootout: {
                    shots: 0,
                    goals: 0,
                    missed_shots: 0,
                  },
                  average: {
                    assists: 0,
                    blocked_shots: 0,
                    points: 0,
                    blocked_att: 0,
                    penalties: 0,
                    missed_shots: 0,
                    hits: 0,
                    shots: 0,
                    takeaways: 0,
                    giveaways: 0,
                    goals: 0,
                    penalty_minutes: 0,
                  },
                },
              },
            ],
          },
        ],
        sr_id: "sr:player:983657",
        status: "ACT",
        team: {
          id: "4417d3cb-0f24-11e2-8525-18a905767e44",
          name: "Lightning",
          market: "Tampa Bay",
          alias: "TB",
          sr_id: "sr:team:3694",
          reference: "14",
        },
        updated: "2021-09-23T16:06:21+00:00",
        weight: 206,
        fantasyPlayerPosition: "XW",
        type: "xw",
        match: {
          _id: "6151bbde0676e7bcd6ff2d66",
          id: "6c0c3325-bd98-469d-879b-16378ac5f051",
          away: {
            id: "44153da1-0f24-11e2-8525-18a905767e44",
            name: "Arizona Coyotes",
            alias: "ARI",
            sr_id: "sr:team:3698",
            reference: "53",
          },
          coverage: "full",
          created_date: "2021-09-27 12:41:00",
          home: {
            id: "4417d3cb-0f24-11e2-8525-18a905767e44",
            name: "Tampa Bay Lightning",
            alias: "TB",
            sr_id: "sr:team:3694",
            reference: "14",
          },
          last_updated: "2021-09-28 09:34:12",
          reference: "20102",
          scheduled: "2021-10-28T23:00:00+00:00",
          status: "scheduled",
          venue: {
            id: "05aa49b2-f72d-4d42-ab30-f219d32ed97b",
            name: "Amalie Arena",
            capacity: 19092,
            address: "401 Channelside Drive",
            city: "Tampa",
            state: "FL",
            zip: "33602",
            country: "USA",
            time_zone: "US/Eastern",
            sr_id: "sr:venue:6036",
          },
        },
        match_id: 1,
        positionID: 1,
      },
      {
        _id: "6151ceda0676e7bcd619dea3",
        id: "23a80fff-26fe-4db0-8007-dc032e876c59",
        abbr_name: "R.Colton",
        birth_place: "Robbinsville, NJ, USA",
        birthdate: "1996-09-11",
        college: "Vermont",
        created_date: "2021-09-27 14:01:56",
        draft: {
          team_id: "4417d3cb-0f24-11e2-8525-18a905767e44",
          year: 2016,
          round: "4",
          pick: "118",
        },
        experience: "1",
        first_name: "Ross",
        full_name: "Ross Colton",
        handedness: "L",
        height: 72,
        jersey_number: "79",
        last_name: "Colton",
        last_updated: "2021-09-27 14:33:29",
        league: {
          id: "fd560107-a85b-4388-ab0d-655ad022aff7",
          name: "NHL",
          alias: "NHL",
        },
        position: "F",
        primary_position: "LW",
        reference: "8479525",
        rookie_year: 2020,
        seasons: [
          {
            id: "906a801f-c326-4232-b687-08304f752e64",
            year: 2020,
            type: "PST",
            teams: [
              {
                id: "4417d3cb-0f24-11e2-8525-18a905767e44",
                name: "Lightning",
                market: "Tampa Bay",
                alias: "TB",
                sr_id: "sr:team:3694",
                reference: "14",
                statistics: {
                  total: {
                    games_played: 23,
                    goals: 4,
                    assists: 2,
                    penalties: 2,
                    penalty_minutes: 12,
                    shots: 32,
                    blocked_att: 9,
                    missed_shots: 14,
                    hits: 46,
                    giveaways: 6,
                    takeaways: 3,
                    blocked_shots: 12,
                    faceoffs_won: 22,
                    faceoffs_lost: 23,
                    winning_goals: 1,
                    plus_minus: 4,
                    games_scratched: 0,
                    games_started: 1,
                    shooting_pct: 12.5,
                    faceoff_win_pct: 48.9,
                    faceoffs: 45,
                    points: 6,
                    overtime_goals: 0,
                    overtime_assists: 0,
                    overtime_shots: 2,
                    penalties_major: 0,
                    penalties_minor: 1,
                    penalties_misconduct: 1,
                    emptynet_goals: 0,
                  },
                  powerplay: {
                    shots: 1,
                    goals: 0,
                    missed_shots: 0,
                    assists: 0,
                    faceoffs_won: 1,
                    faceoffs: 1,
                    faceoffs_lost: 0,
                    faceoff_win_pct: 100,
                  },
                  shorthanded: {
                    shots: 0,
                    goals: 0,
                    missed_shots: 0,
                    assists: 0,
                    faceoffs_won: 1,
                    faceoffs: 1,
                    faceoffs_lost: 0,
                    faceoff_win_pct: 100,
                  },
                  evenstrength: {
                    shots: 31,
                    goals: 4,
                    missed_shots: 14,
                    assists: 2,
                    faceoffs_won: 20,
                    faceoffs: 43,
                    faceoffs_lost: 23,
                    faceoff_win_pct: 46.5,
                  },
                  penalty: {
                    shots: 0,
                    goals: 0,
                    missed_shots: 0,
                  },
                  shootout: {
                    shots: 0,
                    goals: 0,
                    missed_shots: 0,
                  },
                  average: {
                    assists: 0.09,
                    blocked_shots: 0.52,
                    points: 0.26,
                    blocked_att: 0.39,
                    penalties: 0.09,
                    missed_shots: 0.61,
                    hits: 2,
                    shots: 1.39,
                    takeaways: 0.13,
                    giveaways: 0.26,
                    goals: 0.17,
                    penalty_minutes: 0.52,
                  },
                },
                time_on_ice: {
                  total: {
                    shifts: 338,
                    total: "235:20",
                    overtime: "2:19",
                    powerplay: "1:17",
                    shorthanded: "2:14",
                    evenstrength: "231:49",
                  },
                  average: {
                    shifts: 14.7,
                    total: "10:14",
                    overtime: "00:35",
                    powerplay: "00:03",
                    shorthanded: "00:06",
                    evenstrength: "10:05",
                  },
                },
              },
            ],
          },
          {
            id: "d8f9b71d-eb0e-42a0-8373-748aeace6d27",
            year: 2020,
            type: "REG",
            teams: [
              {
                id: "4417d3cb-0f24-11e2-8525-18a905767e44",
                name: "Lightning",
                market: "Tampa Bay",
                alias: "TB",
                sr_id: "sr:team:3694",
                reference: "14",
                statistics: {
                  total: {
                    games_played: 30,
                    goals: 9,
                    assists: 3,
                    penalties: 4,
                    penalty_minutes: 16,
                    shots: 46,
                    blocked_att: 14,
                    missed_shots: 14,
                    hits: 36,
                    giveaways: 4,
                    takeaways: 5,
                    blocked_shots: 6,
                    faceoffs_won: 101,
                    faceoffs_lost: 107,
                    winning_goals: 4,
                    plus_minus: 3,
                    games_scratched: 0,
                    games_started: 8,
                    shooting_pct: 19.6,
                    faceoff_win_pct: 48.6,
                    faceoffs: 208,
                    points: 12,
                    overtime_goals: 0,
                    overtime_assists: 0,
                    overtime_shots: 0,
                    penalties_major: 0,
                    penalties_minor: 3,
                    penalties_misconduct: 1,
                    emptynet_goals: 1,
                  },
                  powerplay: {
                    shots: 4,
                    goals: 0,
                    missed_shots: 0,
                    assists: 0,
                    faceoffs_won: 2,
                    faceoffs: 7,
                    faceoffs_lost: 5,
                    faceoff_win_pct: 28.6,
                  },
                  shorthanded: {
                    shots: 0,
                    goals: 0,
                    missed_shots: 0,
                    assists: 0,
                    faceoffs_won: 0,
                    faceoffs: 0,
                    faceoffs_lost: 0,
                    faceoff_win_pct: 0,
                  },
                  evenstrength: {
                    shots: 42,
                    goals: 9,
                    missed_shots: 14,
                    assists: 3,
                    faceoffs_won: 99,
                    faceoffs: 201,
                    faceoffs_lost: 102,
                    faceoff_win_pct: 49.3,
                  },
                  penalty: {
                    shots: 0,
                    goals: 0,
                    missed_shots: 0,
                  },
                  shootout: {
                    shots: 2,
                    goals: 2,
                    missed_shots: 0,
                  },
                  average: {
                    assists: 0.1,
                    blocked_shots: 0.2,
                    points: 0.4,
                    blocked_att: 0.47,
                    penalties: 0.13,
                    missed_shots: 0.47,
                    hits: 1.2,
                    shots: 1.53,
                    takeaways: 0.17,
                    giveaways: 0.13,
                    goals: 0.3,
                    penalty_minutes: 0.53,
                  },
                },
                time_on_ice: {
                  total: {
                    shifts: 441,
                    total: "316:56",
                    overtime: "00:00",
                    powerplay: "20:27",
                    shorthanded: "00:00",
                    evenstrength: "296:29",
                  },
                  average: {
                    shifts: 14.7,
                    total: "10:34",
                    overtime: "00:00",
                    powerplay: "00:41",
                    shorthanded: "00:00",
                    evenstrength: "9:53",
                  },
                },
              },
            ],
          },
        ],
        sr_id: "sr:player:1004591",
        status: "ACT",
        team: {
          id: "4417d3cb-0f24-11e2-8525-18a905767e44",
          name: "Lightning",
          market: "Tampa Bay",
          alias: "TB",
          sr_id: "sr:team:3694",
          reference: "14",
        },
        updated: "2021-09-24T03:54:29+00:00",
        weight: 191,
        fantasyPlayerPosition: "XW",
        type: "xw",
        match: {
          _id: "6151bbde0676e7bcd6ff2d66",
          id: "6c0c3325-bd98-469d-879b-16378ac5f051",
          away: {
            id: "44153da1-0f24-11e2-8525-18a905767e44",
            name: "Arizona Coyotes",
            alias: "ARI",
            sr_id: "sr:team:3698",
            reference: "53",
          },
          coverage: "full",
          created_date: "2021-09-27 12:41:00",
          home: {
            id: "4417d3cb-0f24-11e2-8525-18a905767e44",
            name: "Tampa Bay Lightning",
            alias: "TB",
            sr_id: "sr:team:3694",
            reference: "14",
          },
          last_updated: "2021-09-28 09:34:12",
          reference: "20102",
          scheduled: "2021-10-28T23:00:00+00:00",
          status: "scheduled",
          venue: {
            id: "05aa49b2-f72d-4d42-ab30-f219d32ed97b",
            name: "Amalie Arena",
            capacity: 19092,
            address: "401 Channelside Drive",
            city: "Tampa",
            state: "FL",
            zip: "33602",
            country: "USA",
            time_zone: "US/Eastern",
            sr_id: "sr:venue:6036",
          },
        },
        match_id: 1,
        positionID: 2,
      },
      {
        _id: "6151cedd0676e7bcd619e772",
        id: "2fc50ed6-3626-45c9-bb74-ac86446a7f7c",
        abbr_name: "D.Walcott",
        birth_place: "Ile Perrot, QC, CAN",
        birthdate: "1994-02-19",
        created_date: "2021-09-27 14:01:56",
        draft: {
          team_id: "441781b9-0f24-11e2-8525-18a905767e44",
          year: 2014,
          round: "5",
          pick: "140",
        },
        experience: "1",
        first_name: "Daniel",
        full_name: "Daniel Walcott",
        handedness: "L",
        height: 73,
        jersey_number: "85",
        last_name: "Walcott",
        last_updated: "2021-09-27 14:33:29",
        league: {
          id: "fd560107-a85b-4388-ab0d-655ad022aff7",
          name: "NHL",
          alias: "NHL",
        },
        position: "F",
        primary_position: "LW",
        reference: "8478069",
        rookie_year: 2020,
        seasons: [
          {
            id: "906a801f-c326-4232-b687-08304f752e64",
            year: 2020,
            type: "PST",
            teams: [
              {
                id: "4417d3cb-0f24-11e2-8525-18a905767e44",
                name: "Lightning",
                market: "Tampa Bay",
                alias: "TB",
                sr_id: "sr:team:3694",
                reference: "14",
                statistics: {
                  total: {
                    games_played: 0,
                    goals: 0,
                    assists: 0,
                    penalties: 0,
                    penalty_minutes: 0,
                    shots: 0,
                    blocked_att: 0,
                    missed_shots: 0,
                    hits: 0,
                    giveaways: 0,
                    takeaways: 0,
                    blocked_shots: 0,
                    faceoffs_won: 0,
                    faceoffs_lost: 0,
                    winning_goals: 0,
                    plus_minus: 0,
                    games_scratched: 23,
                    games_started: 0,
                    shooting_pct: 0,
                    faceoff_win_pct: 0,
                    faceoffs: 0,
                    points: 0,
                    overtime_goals: 0,
                    overtime_assists: 0,
                    overtime_shots: 0,
                    penalties_major: 0,
                    penalties_minor: 0,
                    penalties_misconduct: 0,
                    emptynet_goals: 0,
                  },
                  powerplay: {
                    shots: 0,
                    goals: 0,
                    missed_shots: 0,
                    assists: 0,
                    faceoffs_won: 0,
                    faceoffs: 0,
                    faceoffs_lost: 0,
                    faceoff_win_pct: 0,
                  },
                  shorthanded: {
                    shots: 0,
                    goals: 0,
                    missed_shots: 0,
                    assists: 0,
                    faceoffs_won: 0,
                    faceoffs: 0,
                    faceoffs_lost: 0,
                    faceoff_win_pct: 0,
                  },
                  evenstrength: {
                    shots: 0,
                    goals: 0,
                    missed_shots: 0,
                    assists: 0,
                    faceoffs_won: 0,
                    faceoffs: 0,
                    faceoffs_lost: 0,
                    faceoff_win_pct: 0,
                  },
                  penalty: {
                    shots: 0,
                    goals: 0,
                    missed_shots: 0,
                  },
                  shootout: {
                    shots: 0,
                    goals: 0,
                    missed_shots: 0,
                  },
                  average: {
                    assists: 0,
                    blocked_shots: 0,
                    points: 0,
                    blocked_att: 0,
                    penalties: 0,
                    missed_shots: 0,
                    hits: 0,
                    shots: 0,
                    takeaways: 0,
                    giveaways: 0,
                    goals: 0,
                    penalty_minutes: 0,
                  },
                },
              },
            ],
          },
          {
            id: "d8f9b71d-eb0e-42a0-8373-748aeace6d27",
            year: 2020,
            type: "REG",
            teams: [
              {
                id: "4417d3cb-0f24-11e2-8525-18a905767e44",
                name: "Lightning",
                market: "Tampa Bay",
                alias: "TB",
                sr_id: "sr:team:3694",
                reference: "14",
                statistics: {
                  total: {
                    games_played: 1,
                    goals: 0,
                    assists: 0,
                    penalties: 1,
                    penalty_minutes: 5,
                    shots: 1,
                    blocked_att: 0,
                    missed_shots: 0,
                    hits: 7,
                    giveaways: 0,
                    takeaways: 1,
                    blocked_shots: 0,
                    faceoffs_won: 0,
                    faceoffs_lost: 1,
                    winning_goals: 0,
                    plus_minus: -1,
                    games_scratched: 0,
                    games_started: 1,
                    shooting_pct: 0,
                    faceoff_win_pct: 0,
                    faceoffs: 1,
                    points: 0,
                    overtime_goals: 0,
                    overtime_assists: 0,
                    overtime_shots: 0,
                    penalties_major: 1,
                    penalties_minor: 0,
                    penalties_misconduct: 0,
                    emptynet_goals: 0,
                  },
                  powerplay: {
                    shots: 0,
                    goals: 0,
                    missed_shots: 0,
                    assists: 0,
                    faceoffs_won: 0,
                    faceoffs: 0,
                    faceoffs_lost: 0,
                    faceoff_win_pct: 0,
                  },
                  shorthanded: {
                    shots: 0,
                    goals: 0,
                    missed_shots: 0,
                    assists: 0,
                    faceoffs_won: 0,
                    faceoffs: 0,
                    faceoffs_lost: 0,
                    faceoff_win_pct: 0,
                  },
                  evenstrength: {
                    shots: 1,
                    goals: 0,
                    missed_shots: 0,
                    assists: 0,
                    faceoffs_won: 0,
                    faceoffs: 1,
                    faceoffs_lost: 1,
                    faceoff_win_pct: 0,
                  },
                  penalty: {
                    shots: 0,
                    goals: 0,
                    missed_shots: 0,
                  },
                  shootout: {
                    shots: 0,
                    goals: 0,
                    missed_shots: 0,
                  },
                  average: {
                    assists: 0,
                    blocked_shots: 0,
                    points: 0,
                    blocked_att: 0,
                    penalties: 1,
                    missed_shots: 0,
                    hits: 7,
                    shots: 1,
                    takeaways: 1,
                    giveaways: 0,
                    goals: 0,
                    penalty_minutes: 5,
                  },
                },
                time_on_ice: {
                  total: {
                    shifts: 15,
                    total: "10:03",
                    overtime: "00:00",
                    powerplay: "00:11",
                    shorthanded: "00:00",
                    evenstrength: "9:52",
                  },
                  average: {
                    shifts: 15,
                    total: "10:03",
                    overtime: "00:00",
                    powerplay: "00:11",
                    shorthanded: "00:00",
                    evenstrength: "9:52",
                  },
                },
              },
            ],
          },
        ],
        sr_id: "sr:player:844859",
        status: "ACT",
        team: {
          id: "4417d3cb-0f24-11e2-8525-18a905767e44",
          name: "Lightning",
          market: "Tampa Bay",
          alias: "TB",
          sr_id: "sr:team:3694",
          reference: "14",
        },
        updated: "2021-09-24T04:37:15+00:00",
        weight: 175,
        fantasyPlayerPosition: "XW",
        type: "xw",
        match: {
          _id: "6151bbde0676e7bcd6ff2d66",
          id: "6c0c3325-bd98-469d-879b-16378ac5f051",
          away: {
            id: "44153da1-0f24-11e2-8525-18a905767e44",
            name: "Arizona Coyotes",
            alias: "ARI",
            sr_id: "sr:team:3698",
            reference: "53",
          },
          coverage: "full",
          created_date: "2021-09-27 12:41:00",
          home: {
            id: "4417d3cb-0f24-11e2-8525-18a905767e44",
            name: "Tampa Bay Lightning",
            alias: "TB",
            sr_id: "sr:team:3694",
            reference: "14",
          },
          last_updated: "2021-09-28 09:34:12",
          reference: "20102",
          scheduled: "2021-10-28T23:00:00+00:00",
          status: "scheduled",
          venue: {
            id: "05aa49b2-f72d-4d42-ab30-f219d32ed97b",
            name: "Amalie Arena",
            capacity: 19092,
            address: "401 Channelside Drive",
            city: "Tampa",
            state: "FL",
            zip: "33602",
            country: "USA",
            time_zone: "US/Eastern",
            sr_id: "sr:venue:6036",
          },
        },
        match_id: 1,
        positionID: 3,
      },
      {
        _id: "6151ceda0676e7bcd619de98",
        id: "3bf81e26-c3d9-46e3-905f-e4e19de0de95",
        abbr_name: "D.Semykin",
        birth_place: "Moscow,, RUS",
        birthdate: "2000-02-24",
        created_date: "2021-09-27 14:01:56",
        draft: {
          team_id: "4417d3cb-0f24-11e2-8525-18a905767e44",
          year: 2018,
          round: "3",
          pick: "90",
        },
        experience: "0",
        first_name: "Dmitri",
        full_name: "Dmitri Semykin",
        handedness: "R",
        height: 75,
        jersey_number: "78",
        last_name: "Semykin",
        last_updated: "2021-09-27 14:33:29",
        league: {
          id: "fd560107-a85b-4388-ab0d-655ad022aff7",
          name: "NHL",
          alias: "NHL",
        },
        position: "D",
        primary_position: "D",
        sr_id: "sr:player:1403213",
        status: "ACT",
        team: {
          id: "4417d3cb-0f24-11e2-8525-18a905767e44",
          name: "Lightning",
          market: "Tampa Bay",
          alias: "TB",
          sr_id: "sr:team:3694",
          reference: "14",
        },
        updated: "2021-09-24T04:44:04+00:00",
        weight: 212,
        fantasyPlayerPosition: "D",
        type: "D",
        match: {
          _id: "6151bbde0676e7bcd6ff2d66",
          id: "6c0c3325-bd98-469d-879b-16378ac5f051",
          away: {
            id: "44153da1-0f24-11e2-8525-18a905767e44",
            name: "Arizona Coyotes",
            alias: "ARI",
            sr_id: "sr:team:3698",
            reference: "53",
          },
          coverage: "full",
          created_date: "2021-09-27 12:41:00",
          home: {
            id: "4417d3cb-0f24-11e2-8525-18a905767e44",
            name: "Tampa Bay Lightning",
            alias: "TB",
            sr_id: "sr:team:3694",
            reference: "14",
          },
          last_updated: "2021-09-28 09:34:12",
          reference: "20102",
          scheduled: "2021-10-28T23:00:00+00:00",
          status: "scheduled",
          venue: {
            id: "05aa49b2-f72d-4d42-ab30-f219d32ed97b",
            name: "Amalie Arena",
            capacity: 19092,
            address: "401 Channelside Drive",
            city: "Tampa",
            state: "FL",
            zip: "33602",
            country: "USA",
            time_zone: "US/Eastern",
            sr_id: "sr:venue:6036",
          },
        },
        match_id: 1,
        positionID: 1,
      },
      {
        _id: "6151cedd0676e7bcd619e77c",
        id: "147faf4f-64e4-4bca-99ff-c4d6a9506d31",
        abbr_name: "R.Schmidt",
        birth_place: "Midland, MI, USA",
        birthdate: "2003-02-27",
        created_date: "2021-09-27 14:01:56",
        draft: {
          year: 2021,
        },
        first_name: "Roman",
        full_name: "Roman Schmidt",
        handedness: "R",
        height: 77,
        jersey_number: "76",
        last_name: "Schmidt",
        last_updated: "2021-09-27 14:33:29",
        league: {
          id: "fd560107-a85b-4388-ab0d-655ad022aff7",
          name: "NHL",
          alias: "NHL",
        },
        position: "D",
        primary_position: "D",
        sr_id: "sr:player:2174350",
        status: "ACT",
        team: {
          id: "4417d3cb-0f24-11e2-8525-18a905767e44",
          name: "Lightning",
          market: "Tampa Bay",
          alias: "TB",
          sr_id: "sr:team:3694",
          reference: "14",
        },
        updated: "2021-09-24T04:43:15+00:00",
        weight: 211,
        fantasyPlayerPosition: "D",
        type: "D",
        match: {
          _id: "6151bbde0676e7bcd6ff2d66",
          id: "6c0c3325-bd98-469d-879b-16378ac5f051",
          away: {
            id: "44153da1-0f24-11e2-8525-18a905767e44",
            name: "Arizona Coyotes",
            alias: "ARI",
            sr_id: "sr:team:3698",
            reference: "53",
          },
          coverage: "full",
          created_date: "2021-09-27 12:41:00",
          home: {
            id: "4417d3cb-0f24-11e2-8525-18a905767e44",
            name: "Tampa Bay Lightning",
            alias: "TB",
            sr_id: "sr:team:3694",
            reference: "14",
          },
          last_updated: "2021-09-28 09:34:12",
          reference: "20102",
          scheduled: "2021-10-28T23:00:00+00:00",
          status: "scheduled",
          venue: {
            id: "05aa49b2-f72d-4d42-ab30-f219d32ed97b",
            name: "Amalie Arena",
            capacity: 19092,
            address: "401 Channelside Drive",
            city: "Tampa",
            state: "FL",
            zip: "33602",
            country: "USA",
            time_zone: "US/Eastern",
            sr_id: "sr:venue:6036",
          },
        },
        match_id: 1,
        positionID: 2,
      },
      {
        _id: "6151cf350676e7bcd61a7d07",
        id: "38fd5dbf-31cb-4faa-8fe1-60c4c2706550",
        abbr_name: "H.Alnefelt",
        birth_place: "Danderyd,, SWE",
        birthdate: "2001-06-04",
        created_date: "2021-09-27 14:03:12",
        draft: {
          team_id: "4417d3cb-0f24-11e2-8525-18a905767e44",
          year: 2019,
          round: "3",
          pick: "71",
        },
        first_name: "Hugo",
        full_name: "Hugo Alnefelt",
        handedness: "L",
        height: 74,
        jersey_number: "60",
        last_name: "Alnefelt",
        last_updated: "2021-09-27 14:33:29",
        league: {
          id: "fd560107-a85b-4388-ab0d-655ad022aff7",
          name: "NHL",
          alias: "NHL",
        },
        position: "G",
        primary_position: "G",
        sr_id: "sr:player:1425637",
        status: "ACT",
        team: {
          id: "4417d3cb-0f24-11e2-8525-18a905767e44",
          name: "Lightning",
          market: "Tampa Bay",
          alias: "TB",
          sr_id: "sr:team:3694",
          reference: "14",
        },
        updated: "2021-09-24T04:47:10+00:00",
        weight: 185,
        fantasyPlayerPosition: "G",
        type: "G",
        match: {
          _id: "6151bbde0676e7bcd6ff2d66",
          id: "6c0c3325-bd98-469d-879b-16378ac5f051",
          away: {
            id: "44153da1-0f24-11e2-8525-18a905767e44",
            name: "Arizona Coyotes",
            alias: "ARI",
            sr_id: "sr:team:3698",
            reference: "53",
          },
          coverage: "full",
          created_date: "2021-09-27 12:41:00",
          home: {
            id: "4417d3cb-0f24-11e2-8525-18a905767e44",
            name: "Tampa Bay Lightning",
            alias: "TB",
            sr_id: "sr:team:3694",
            reference: "14",
          },
          last_updated: "2021-09-28 09:34:12",
          reference: "20102",
          scheduled: "2021-10-28T23:00:00+00:00",
          status: "scheduled",
          venue: {
            id: "05aa49b2-f72d-4d42-ab30-f219d32ed97b",
            name: "Amalie Arena",
            capacity: 19092,
            address: "401 Channelside Drive",
            city: "Tampa",
            state: "FL",
            zip: "33602",
            country: "USA",
            time_zone: "US/Eastern",
            sr_id: "sr:venue:6036",
          },
        },
        match_id: 1,
        positionID: 1,
      },
    ],
    starPlayerCount = 0,
    sport_id = 0,
    game_id = 0,
  } = useSelector((state) => state.nhl);

  let {
    gameID = 0,
    live_players = [],
    live_totalTeamPts = 0,
    live_teamD = {},
    live_home = {},
    live_away = {},
    period = 0,
    powersApplied = [],
    powersAvailable = "",
  } = useSelector((state) => state.nhl);

  const { user = {} } = useSelector((state) => state.auth);
  const { token = "", user_id } = user || {};

  const getFantasyTeam = async () => {
    setLoading(true);
    let payload = {
      gameID: getGameIDFromLocalStorage(),
      userID: user_id,
    };
    // NHLActions.getFantasyTeam(payload);
    await dispatch(NHLActions.getFantasyTeam(payload));

    setLoading(false);
  };
  useEffect(() => {
    if (user_id) {
      getFantasyTeam();
    }
  }, [user_id]);

  const {
    game_id: gameId = "",
    user_id: userId = "",
    team_id: teamId = "",
    sport_id: sportId = "",
    game = {},
    Prizes = [],
  } = selectedTeam || {};



  let prizePool,
    topPrize = 0,
    entry_fee = 0,
    currency;

  prizePool = _.reduce(
    game?.PrizePayouts,
    function (memo, num) {
      return memo + parseInt(num.amount) * parseInt(num.prize);
    },
    0
  );
  topPrize = parseFloat(
    _.max(game?.PrizePayouts, function (ele) {
      return ele.amount;
    }).amount
  );
  entry_fee = game?.entry_fee;
  currency = game?.currency;

  async function setPowers() {
    let a = await dispatch(NHLActions.getUserRemainingPowers(gameId, userId));
    if (a === undefined) {
      return;
    }

    let remainingPowers = a.payload;
    let challenge = 0;
    let swap = 0;
    let point_booster = 0;
    let p15 = 0;
    let p2 = 0;
    let p3 = 0;
    let dwall = 0;
    let retro_boost = 0;
    let power_up = 0;
    for (let i = 0; i < remainingPowers.length; i++) {
      let rec = remainingPowers[i].fantasy_powers;
      if (rec !== undefined && rec !== null) {
        if (rec.name === "D-Wall") {
          dwall = remainingPowers[i].remaining_amount;
        } else if (rec.name === "Challenge") {
          challenge = remainingPowers[i].remaining_amount;
        } else if (rec.name === "1.5x Point Booster") {
          p15 = remainingPowers[i].remaining_amount;
          point_booster =
            point_booster + parseInt(remainingPowers[i].remaining_amount);
        } else if (rec.name === "2x Point Booster") {
          p2 = remainingPowers[i].remaining_amount;
          point_booster =
            point_booster + parseInt(remainingPowers[i].remaining_amount);
        } else if (rec.name === "3x Point Booster") {
          p3 = remainingPowers[i].remaining_amount;
          point_booster =
            point_booster + parseInt(remainingPowers[i].remaining_amount);
        } else if (rec.name === "Swap") {
          swap = remainingPowers[i].remaining_amount;
        } else if (rec.name === "Retro Boost") {
          retro_boost = remainingPowers[i].remaining_amount;
        } else if (rec.name === "Power-Up") {
          power_up = remainingPowers[i].remaining_amount;
        }
      }
    }
    setChallengeCounts(challenge);
    setSwapCounts(swap);
    setDwallCounts(dwall);
    setPointMultiplierCounts(point_booster);
    setRetroBoostCounts(retro_boost);
    setPowerUpCounts(power_up);
    setPointBooster15xCounts(p15);
    setPointBooster2xCounts(p2);
    setPointBooster3xCounts(p3);
  }

  async function useSwap(action) {
    if (action) {
      const current_match_id = selectedTeam.players[0].match_id;
      let requests = await dispatch(
        NHLActions.updateUserRemainingPowers(gameId, userId, 4)
      );
      if (requests.payload) {
        setPowers();
        onPowerApplied({
          fantasyTeamId: selectedTeam.team_id,
          matchId: current_match_id,
          powerId: 4,
          userId: userId,
          gameId: game_id,
        });
      } else {
        alert(
          "We are experiencing technical issues with the Power functionality. Please try again shortly."
        );
      }
    }
  }

  async function useDwall(action) {
    if (action) {
      const current_match_id = selectedTeam.players[0].match_id;
      let requests = await dispatch(
        NHLActions.updateUserRemainingPowers(gameId, userId, 5)
      );
      if (requests.payload) {
        setPowers();
        onPowerApplied({
          fantasyTeamId: selectedTeam.team_id,
          matchId: current_match_id,
          powerId: 5,
          userId: userId,
          gameId: gameId,
        });
      } else {
        alert(
          "We are experiencing technical issues with the Power functionality. Please try again shortly."
        );
      }
    }
  }

  async function useChallenge(action) {
    if (action) {
      const current_match_id = selectedTeam.players[0].match_id;
      let requests = await dispatch(
        NHLActions.updateUserRemainingPowers(gameId, userId, 6)
      );
      if (requests.payload) {
        setPowers();
        onPowerApplied({
          fantasyTeamId: selectedTeam.team_id,
          matchId: current_match_id,
          powerId: 6,
          userId: userId,
          gameId: gameId,
        });
      } else {
        alert(
          "We are experiencing technical issues with the Power functionality. Please try again shortly."
        );
      }
    }
  }

  function getTeamFromLocalStorage() {
    const encData = getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.NHL_LIVE_GAME);
    const byteData = CryptoJS.AES.decrypt(encData, CONSTANTS.DATA_ENC_KEY);
    const decSelectedTeamData = JSON.parse(
      byteData.toString(CryptoJS.enc.Utf8)
    );

    return decSelectedTeamData;
  }

  useEffect(async () => {
    setPowers();
  }, []);

  useEffect(() => {
    // if (live_players?.length > 0) {
    _socket.on("disconnect", () => {
      console.log("Socket Disconnected");
    });

    _socket.on("connected", () => {
      console.log("Event Came here");
      _socket.emit("NHL_CONNECT_MATCH_ROOM", {
        gameID: 894,
      });
    });

    _socket.on("ROOM_CONNECTED", (data) => {
      console.log("ON ROOM CONNECTED: ", data);
    });

    _socket.on(`NHL-GAME-894-112`, (data) => {
      console.log("THIS IS TEAM LOGS", data);

      if (Array.isArray(data)) {
        data.forEach((item, index) => {
          console.log(item);

          let { fantasyLog, period, clock, totalTeamPts } = item;

          let { type, player, playerPts, goal, assists } = fantasyLog || {};
          console.log("Fantasy Player: ", player.id + " " + player.name);
          let lp = [...live_players];

          lp.forEach((playr) => {
            if (playr.id === player.id) {
              console.log("Its a match");
              console.log("Player: ", playr.id + " " + playr.name);
              // if (type === "shot") {
              if (!Array.isArray(playr.events)) {
                playr.events = [];
              }

              playr.events.push(fantasyLog);
              if (playr?.stats?.points) {
                playr.stats.points = playr.stats.points + playerPts;
              } else {
                playr.stats = {};
                playr.stats.points = playerPts;
              }

              if (goal) {
                if (playr?.stats?.goals) {
                  playr.stats.goals = playr.stats.goals + 1;
                } else {
                  playr.stats = {};
                  playr.stats.goals = 1;
                }
              }

              if (assists) {
                if (playr?.stats?.assists) {
                  playr.stats.assists = playr.stats.assists + 1;
                } else {
                  playr.stats = {};
                  playr.stats.assists = 1;
                }
              }

              // }
            }
          });

          console.log(`lp ${index}: `, lp);

          dispatch({
            type: NHLActions.NHL_UPDATE_STATE,
            payload: {
              live_period: period,
              live_clock: clock,
              live_totalTeamPts: totalTeamPts,
              live_players: lp,
            },
          });
        });
      }
    });

    console.log(`NHL-GAME-894-112`);

    _socket.on("ROOM_DATA", (data) => {
      console.log("ROOM DATA: ", data);
    });
    // }
  }, [_socket]);

  useEffect(() => {
    setPlayerToSwap({});
  }, [_socket]);

  const setMatchUpdates = () => {
    const { match_id } = matchUpdateData?.data || {};
    const dataToUpdate = live_data?.filter(
      (match) => match?.match_id === match_id
    );

    if (dataToUpdate.length) {
      for (let i = 0; i < dataToUpdate.length; i++) {
        const { match = {} } = dataToUpdate[i] || {};
        const updateMatch = {
          ...match,
          boxscore: [{ ...match?.boxscore[0], ...matchUpdateData?.data }],
        };

        delete dataToUpdate[i].match;
        dataToUpdate[i].match = updateMatch;
      }

      const liveData = union(live_data, dataToUpdate);

      dispatch(NHLActions.nhlLiveData(liveData));
    }
  };

  const onFantasyTeamUpdate = (res) => {
    const { log = {}, updated_player = {} } = res?.data || {};

    const { fantasy_points_after = 0 } = log || {};
    setPoints(fantasy_points_after);
    if (!live_data?.length) return;

    const liveData = [...live_data];
    if (!isEmpty(playerToSwap)) {
      const updatedPlayerIndex = liveData?.indexOf(playerToSwap);
      if (updatedPlayerIndex !== -1) {
        liveData[updatedPlayerIndex] = updated_player;
      }

      dispatch(NHLActions.nhlLiveData(liveData));
    }
  };

  const onFantasyScoreUpdate = (fantasyScores) => {
    fantasyScores.forEach((item) => {
      console.log(item);
    });
  };

  const onEventDataUpdate = (res) => {
    const { eventData, away, home } = res?.data || {};
    const { on_ice } = eventData || {};

    const team1 = on_ice[0];
    const team2 = on_ice[1];

    let awayTeam = {},
      homeTeam = {};

    if (team1 && team2 && away && home) {
      if (team1.id === away.id) {
        awayTeam = team1;
        homeTeam = team2;
      } else if (team2.id === away.id) {
        awayTeam = team2;
        homeTeam = team1;
      }
    }
  };

  const onChangeXp = async (xp, player) => {
    const _selectedXp = {
      xp,
    };
    const current_match_id = selectedTeam.players[0].match_id;
    if (xp === CONSTANTS.XP.xp1_5) _selectedXp.xpVal = "1.5x";
    else if (xp === CONSTANTS.XP.xp2) _selectedXp.xpVal = "2x";
    else if (xp === CONSTANTS.XP.xp3) _selectedXp.xpVal = "3x";
    let indexOfPlayer = -1;
    indexOfPlayer = live_data?.indexOf(player);
    if (indexOfPlayer !== -1) {
      player.xp = _selectedXp;

      live_data[indexOfPlayer] = player;
      let power = 0;
      if (_selectedXp.xpVal === "1.5x") {
        power = 1;
      } else if (_selectedXp.xpVal === "2x") {
        power = 2;
      } else if (_selectedXp.xpVal === "3x") {
        power = 3;
      }
      let requests = await dispatch(
        NHLActions.updateUserRemainingPowers(gameId, userId, power)
      );
      // throw new Error("FOUND");
      if (requests.payload) {
        setPowers();
        onPowerApplied({
          fantasyTeamId: selectedTeam.team_id,
          powerId: power,
          multiplier: _selectedXp.xpVal,
          playerId: player.player_id,
          matchId: current_match_id,
          userId: userId,
          gameId: gameId,
        });
      } else {
        alert(
          "We are experiencing technical issues with the Power functionality. Please try again shortly."
        );
      }
      return dispatch(NHLActions.nhlLiveData(live_data));
    }
  };

  const onPowerApplied = (data) => {
    _socket.emit(ON_POWER_APPLIED, data);
  };

  const onClickStandings = () => {};

  const updateReduxState = (currentPlayer, newPlayer) => {
    if (!currentPlayer || !newPlayer) return;
    const { team_id, user_id, game_id } = selectedTeam || {};
    setPlayerToSwap(currentPlayer);
    onPowerApplied({
      fantasyTeamId: team_id,
      matchId: currentPlayer.match_id,
      playerId: currentPlayer.player_id,
      playerId2: newPlayer.playerId,
      matchIdP2: newPlayer.match_id,
      powerId: POWER_IDs.SWAP_POWER,
      userId: user_id,
      gameId: game_id,
    });
  };

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

  window.onresize = () => {
    setScreenSize(window.screen.width);
  };

  const [activeTab, setActiveTab] = useState(0);
  const handleChangeTab = () => {
    setActiveTab(activeTab === 0 ? 1 : 0);
  };
  const [showModal, setModalState] = useState(false);
  const toggleLiveStandingModal = () => {
    setModalState(!showModal);
  };

  return (
    <>
      {screenSize > 550 ? (
        <>
          <Header />
          <div className="teamManagerDiv">
            <div className={classes.wrapper}>
              <Header4
                // outof={outOf}
                // enrolledUsers={enrolledUsers}
                outof={1000}
                enrolledUsers={10}
                titleMain1="NHL"
                titleMain2="PowerdFS"
                subHeader1="Introducing Live-Play Fantasy Baseball"
                subHeader2={
                  <>
                    Use your <span>Powers</span> during the live game to drive
                    your team up the standings
                  </>
                }
                contestBtnTitle="Gameplay Rules"
                prizeBtnTitle="Prize Grid"
                bgImageUri={BaseballImage}
                compressedView
                currentState={<RenderLiveState isLive />}
                onClickPrize={() => setPrizeModalState(true)}
                selectedTeam={selectedTeam}
                token={token}
                livePage={true}
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
                    activeTab={activeTab}
                    handleChangeTab={handleChangeTab}
                    // teamManagerLink="/nhl-live-powerdfs"
                    // scoreDetailLink="/nhl-live-powerdfs/my-score-details"
                    onGoBack={() => {
                      redirectTo(props, { path: "/my-game-center" });
                    }}
                    state={selectedTeam}
                    {...props}
                  />

                  <Card ranks={{ score: live_totalTeamPts }}>
                    {activeTab === 0 ? (
                      <TeamManager
                        compressedView={compressedView}
                        selectedView={selectedView}
                        loading={loading}
                        swapCounts={swapCounts}
                        dwallCounts={dwallCounts}
                        challengeCounts={challengeCounts}
                        pointMultiplierCounts={pointMultiplierCounts}
                        pointBooster15x={pointBooster15x}
                        pointBooster2x={pointBooster2x}
                        pointBooster3x={pointBooster3x}
                        retroBoostCounts={retroBoostCounts}
                        powerUpCounts={powerUpCounts}
                        setPlayerToSwap={setPlayerToSwap}
                        onPowerApplied={onPowerApplied}
                        POWER_IDs={POWER_IDs}
                        setPowers={setPowers}
                      />
                    ) : (
                      <MyScoreCard />
                    )}
                  </Card>
                  <div
                    className={classes.left_side_footer}
                    style={{ position: "relative" }}
                  >
                    {/* <img src={FooterImage} alt="" /> */}
                    <a
                      href="https://fanatics.93n6tx.net/c/2068372/1126094/9663"
                      target="_blank"
                      id="1126094"
                    >
                      <img
                        src="https://a.impactradius-go.com/display-ad/9663-1126094"
                        border="0"
                        alt=""
                        width="1000"
                        height="640"
                      />
                    </a>
                    <div style={{ position: "absolute", bottom: 0, right: 5 }}>
                      {selectedTeam.game_id}
                    </div>
                  </div>
                </div>

                <div className={classes.sidebar_container}>
                  <Sidebar>
                    <CashPowerBalance
                      entryFee={entry_fee}
                      currency={currency}
                      powerBalance={topPrize}
                      cashBalance={prizePool}
                      styles={{
                        width: "100%",
                        marginTop: "-40px",
                      }}
                      entryTitle="Entry Fee"
                      cashTitle="Prize Pool"
                      powerTitle="Top Prize"
                      entryTitle="Entry Fee"
                      centered
                      showIcons={false}
                      entryFee={selectedTeam?.game?.entry_fee}
                      currency={"USD"}
                    />
                    <RankCard
                      ranks={ranks}
                      currentWin={100000}
                      onClickStandings={onClickStandings}
                      game_id={selectedTeam.game_id}
                      prizePool={prizePool}
                      {...props}
                    />
                    <PowerSidebar
                      collapse={false}
                      swapCounts={swapCounts}
                      dwallCounts={dwallCounts}
                      challengeCounts={challengeCounts}
                      pointMultiplierCounts={pointMultiplierCounts}
                      pointBooster15x={pointBooster15x}
                      pointBooster2x={pointBooster2x}
                      pointBooster3x={pointBooster3x}
                      retroBoostCounts={retroBoostCounts}
                      powerUpCounts={powerUpCounts}
                      game={game}
                      powers={props?.location?.state?.game?.Powers}
                    />
                  </Sidebar>
                </div>
              </div>
            </div>
          </div>
          <Footer isBlack={true} />
          <PrizeModal
            visible={showPrizeModal}
            sportsName="NHL"
            data={selectedTeam?.game?.PrizePayouts}
            onClose={() => setPrizeModalState(false)}
          />
        </>
      ) : (
        <>
          <Mobile
            data={live_data}
            ranks={ranks}
            counts={{
              swapCounts,
              dwallCounts,
              challengeCounts,
              retroBoostCounts,
              powerUpCounts,
              pointMultiplierCounts,
            }}
            loading={loading}
            swapCounts={swapCounts}
            dwallCounts={dwallCounts}
            challengeCounts={challengeCounts}
            pointMultiplierCounts={pointMultiplierCounts}
            pointBooster15x={pointBooster15x}
            pointBooster2x={pointBooster2x}
            pointBooster3x={pointBooster3x}
            retroBoostCounts={retroBoostCounts}
            powerUpCounts={powerUpCounts}
            setPlayerToSwap={setPlayerToSwap}
            onPowerApplied={onPowerApplied}
            POWER_IDs={POWER_IDs}
            setPowers={setPowers}
            cardType="nhl"
          />
        </>
      )}
      <LiveStandings visible={showModal} onClose={toggleLiveStandingModal} />
    </>
  );
}

NHLPowerdFsLive.propTypes = {};

export default NHLPowerdFsLive;
