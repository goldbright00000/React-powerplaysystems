import AdImg from "../../assets/img.jpg";
import { CONSTANTS } from "../../utility/constants";

const { QB, RB, WR, TE, K, D } = CONSTANTS.FILTERS.NFL;

export const dummyData = [
  {
    type: QB,
    listData: [
      {
        playerId: 1,
        playerName: "Aaron Rodgers",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Dallas Cowboys",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        injured: false,
        position: "QB",
        isStarPlayer: false,
        playerStats: {
          hits: 0,
          doubles: 0,
          triples: 0,
          home_runs: 0,
          stolen_bases: 0,
          runs_batted_in: 0,
          batting_average: 0,
          wins: 0,
          losses: 0,
          innings_pitched: 0,
          strike_outs: 0,
          earned_runs_average: 0,
          base_on_balls: 0,
          walks_hits_per_innings_pitched: 0,
        },
        injured: false,
        match_id: 11,
        primary_position: "",
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
      {
        playerId: 2,
        match_id: 12,
        playerName: "Derek Carr",
        avgVal: 4,
        homeTeam: "Detroit Lions",
        awayTeam: "San Francisco 49ers",
        time: "01:97 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        isStarPlayer: true,
        position: "QB",
        playerStats: {
          pydsg: 209.9,
          rydsg: 13.2,
          ptd: 87,
          rtd: 13,
        },
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
      {
        playerId: 3,
        match_id: 13,
        playerName: "Matt Ryan",
        avgVal: 4,
        homeTeam: "Chicago Bears",
        awayTeam: "Indianapolis Colts",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        position: "RB",
        playerStats: {
          ydsg: 13.2,
          ptd: 87,
          rtd: 13,
        },
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
      {
        playerId: 4,
        match_id: 14,
        playerName: "Josh Allen",
        avgVal: 4,
        homeTeam: "Philadelphia Eagles",
        awayTeam: "Los Angeles Rams",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        position: "wr",
        playerStats: {
          ydsg: 13.2,
          ptd: 87,
          rtd: 13,
        },
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
      {
        playerId: 5,
        match_id: 15,
        playerName: "Drew Lock",
        avgVal: 4,
        homeTeam: "Pittsburg Eagles",
        awayTeam: "Chicago Bears",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        position: "te",
        playerStats: {
          ydsg: 13.2,
          ptd: 87,
          rtd: 13,
        },
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
      {
        playerId: 6,
        match_id: 15,
        playerName: "Lamar Jackson",
        avgVal: 4,
        homeTeam: "Green Bay Packers",
        awayTeam: "Washinghton Football Team",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        position: "k",
        playerStats: {
          fga: 209.9,
          fgm: 13.2,
          pct: 87,
          lng: 13,
        },
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
    ],
  },
  {
    type: RB,
    listData: [
      {
        playerId: 1,
        match_id: 16,
        playerName: "Aaron Rodgers",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Dallas Cowboys",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        injured: false,
        position: "QB",
        playerStats: {
          pydsg: 209.9,
          rydsg: 13.2,
          ptd: 87,
          rtd: 13,
        },
        steps: [
          {
            titles: ["P YDS/G", "R YDS/G", "P TD", "R TD", "FPPG"],
            step: [209.0, 13.2, 87, 13, 17.4],
          },
          {
            titles: ["G", "YDS", "YDS/G", "TD", "FPPG"],
            step: [
              {
                title: "Home Games",
                values: [35, "7,744", 221.3, 46, 14.0],
              },
              {
                title: "Away Games",
                values: [26, "5,693", 219.0, 34, 13.8],
              },
              {
                title: "2021 Total",
                values: [61, "13,437", 220.3, 80, 13.9],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
      {
        playerId: 2,
        match_id: 17,
        playerName: "Derek Carr",
        avgVal: 4,
        homeTeam: "Detroit Lions",
        awayTeam: "San Francisco 49ers",
        time: "01:97 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        isStarPlayer: true,
        position: "QB",
        playerStats: {
          pydsg: 209.9,
          rydsg: 13.2,
          ptd: 87,
          rtd: 13,
        },
        steps: [
          {
            titles: ["P YDS/G", "R YDS/G", "P TD", "R TD", "FPPG"],
            step: [209.0, 13.2, 87, 13, 17.4],
          },
          {
            titles: ["G", "YDS", "YDS/G", "TD", "FPPG"],
            step: [
              {
                title: "Home Games",
                values: [35, "7,744", 221.3, 46, 14.0],
              },
              {
                title: "Away Games",
                values: [26, "5,693", 219.0, 34, 13.8],
              },
              {
                title: "2021 Total",
                values: [61, "13,437", 220.3, 80, 13.9],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
      {
        playerId: 3,
        match_id: 18,
        playerName: "Matt Ryan",
        avgVal: 4,
        homeTeam: "Chicago Bears",
        awayTeam: "Indianapolis Colts",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        position: "RB",
        playerStats: {
          ydsg: 13.2,
          ptd: 87,
          rtd: 13,
        },
        steps: [
          {
            titles: ["P YDS/G", "R YDS/G", "P TD", "R TD", "FPPG"],
            step: [209.0, 13.2, 87, 13, 17.4],
          },
          {
            titles: ["G", "YDS/G", "TD", "REC", "YDS/G", "TD", "FPPG"],
            step: [
              {
                title: "Home Games",
                values: [40, 60.0, 35, 163, 32.5, 7, 19.9],
              },
              {
                title: "Away Games",
                values: [31, 52.6, 17, 113, 25.8, 3, 15.6],
              },
              {
                title: "2021 Total",
                values: [71, 56.8, 52, 276, 29.5, 10, 18.0],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
      {
        playerId: 4,
        match_id: 19,
        playerName: "Josh Allen",
        avgVal: 4,
        homeTeam: "Philadelphia Eagles",
        awayTeam: "Los Angeles Rams",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        position: "wr",
        playerStats: {
          ydsg: 13.2,
          ptd: 87,
          rtd: 13,
        },
        steps: [
          {
            titles: ["P YDS/G", "R YDS/G", "P TD", "R TD", "FPPG"],
            step: [209.0, 13.2, 87, 13, 17.4],
          },
          {
            titles: ["G", "REC", "YDS", "YDS/G", "TD", "FPPG"],
            step: [
              {
                title: "Home Games",
                values: [15, 29, 189, 12.6, 1, 1],
              },
              {
                title: "Away Games",
                values: [7, 9, 102, 14.6, 1, 3.6],
              },
              {
                title: "2021 Total",
                values: [22, 29, 291, 13.2, 2, 3.1],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
      {
        playerId: 5,
        match_id: 1,
        playerName: "Drew Lock",
        avgVal: 4,
        homeTeam: "Pittsburg Eagles",
        awayTeam: "Chicago Bears",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        position: "te",
        playerStats: {
          ydsg: 13.2,
          ptd: 87,
          rtd: 13,
        },
        steps: [
          {
            titles: ["P YDS/G", "R YDS/G", "P TD", "R TD", "FPPG"],
            step: [209.0, 13.2, 87, 13, 17.4],
          },
          {
            titles: ["G", "REC", "YDS", "YDS/G", "TD", "FPPG"],
            step: [
              {
                title: "Home Games",
                values: [15, 29, 189, 12.6, 1, 1],
              },
              {
                title: "Away Games",
                values: [7, 9, 102, 14.6, 1, 3.6],
              },
              {
                title: "2021 Total",
                values: [22, 29, 291, 13.2, 2, 3.1],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
      {
        playerId: 6,
        match_id: 6,
        playerName: "Lamar Jackson",
        avgVal: 4,
        homeTeam: "Green Bay Packers",
        awayTeam: "Washinghton Football Team",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        position: "k",
        playerStats: {
          fga: 209.9,
          fgm: 13.2,
          pct: 87,
          lng: 13,
        },
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
    ],
  },
  {
    type: WR,
    listData: [
      {
        playerId: 1,
        match_id: 2,
        playerName: "Aaron Rodgers",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Dallas Cowboys",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        injured: false,
        position: "QB",
        playerStats: {
          pydsg: 209.9,
          rydsg: 13.2,
          ptd: 87,
          rtd: 13,
        },
        steps: [
          {
            titles: ["P YDS/G", "R YDS/G", "P TD", "R TD", "FPPG"],
            step: [209.0, 13.2, 87, 13, 17.4],
          },
          {
            titles: ["G", "YDS", "YDS/G", "TD", "FPPG"],
            step: [
              {
                title: "Home Games",
                values: [35, "7,744", 221.3, 46, 14.0],
              },
              {
                title: "Away Games",
                values: [26, "5,693", 219.0, 34, 13.8],
              },
              {
                title: "2021 Total",
                values: [61, "13,437", 220.3, 80, 13.9],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
      {
        playerId: 2,
        match_id: 3,
        playerName: "Derek Carr",
        avgVal: 4,
        homeTeam: "Detroit Lions",
        awayTeam: "San Francisco 49ers",
        time: "01:97 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        isStarPlayer: true,
        position: "QB",
        playerStats: {
          pydsg: 209.9,
          rydsg: 13.2,
          ptd: 87,
          rtd: 13,
        },
        steps: [
          {
            titles: ["P YDS/G", "R YDS/G", "P TD", "R TD", "FPPG"],
            step: [209.0, 13.2, 87, 13, 17.4],
          },
          {
            titles: ["G", "YDS", "YDS/G", "TD", "FPPG"],
            step: [
              {
                title: "Home Games",
                values: [35, "7,744", 221.3, 46, 14.0],
              },
              {
                title: "Away Games",
                values: [26, "5,693", 219.0, 34, 13.8],
              },
              {
                title: "2021 Total",
                values: [61, "13,437", 220.3, 80, 13.9],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
      {
        playerId: 3,
        match_id: 5,
        playerName: "Matt Ryan",
        avgVal: 4,
        homeTeam: "Chicago Bears",
        awayTeam: "Indianapolis Colts",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        position: "RB",
        playerStats: {
          ydsg: 13.2,
          ptd: 87,
          rtd: 13,
        },
        steps: [
          {
            titles: ["P YDS/G", "R YDS/G", "P TD", "R TD", "FPPG"],
            step: [209.0, 13.2, 87, 13, 17.4],
          },
          {
            titles: ["G", "YDS/G", "TD", "REC", "YDS/G", "TD", "FPPG"],
            step: [
              {
                title: "Home Games",
                values: [40, 60.0, 35, 163, 32.5, 7, 19.9],
              },
              {
                title: "Away Games",
                values: [31, 52.6, 17, 113, 25.8, 3, 15.6],
              },
              {
                title: "2021 Total",
                values: [71, 56.8, 52, 276, 29.5, 10, 18.0],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
      {
        playerId: 4,
        match_id: 7,
        playerName: "Josh Allen",
        avgVal: 4,
        homeTeam: "Philadelphia Eagles",
        awayTeam: "Los Angeles Rams",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        position: "wr",
        playerStats: {
          ydsg: 13.2,
          ptd: 87,
          rtd: 13,
        },
        steps: [
          {
            titles: ["P YDS/G", "R YDS/G", "P TD", "R TD", "FPPG"],
            step: [209.0, 13.2, 87, 13, 17.4],
          },
          {
            titles: ["G", "REC", "YDS", "YDS/G", "TD", "FPPG"],
            step: [
              {
                title: "Home Games",
                values: [15, 29, 189, 12.6, 1, 1],
              },
              {
                title: "Away Games",
                values: [7, 9, 102, 14.6, 1, 3.6],
              },
              {
                title: "2021 Total",
                values: [22, 29, 291, 13.2, 2, 3.1],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
      {
        playerId: 5,
        match_id: 8,
        playerName: "Drew Lock",
        avgVal: 4,
        homeTeam: "Pittsburg Eagles",
        awayTeam: "Chicago Bears",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        position: "te",
        playerStats: {
          ydsg: 13.2,
          ptd: 87,
          rtd: 13,
        },
        steps: [
          {
            titles: ["P YDS/G", "R YDS/G", "P TD", "R TD", "FPPG"],
            step: [209.0, 13.2, 87, 13, 17.4],
          },
          {
            titles: ["G", "REC", "YDS", "YDS/G", "TD", "FPPG"],
            step: [
              {
                title: "Home Games",
                values: [15, 29, 189, 12.6, 1, 1],
              },
              {
                title: "Away Games",
                values: [7, 9, 102, 14.6, 1, 3.6],
              },
              {
                title: "2021 Total",
                values: [22, 29, 291, 13.2, 2, 3.1],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
      {
        playerId: 6,
        match_id: 9,
        playerName: "Lamar Jackson",
        avgVal: 4,
        homeTeam: "Green Bay Packers",
        awayTeam: "Washinghton Football Team",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        position: "k",
        playerStats: {
          fga: 209.9,
          fgm: 13.2,
          pct: 87,
          lng: 13,
        },
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
    ],
  },
  {
    type: TE,
    listData: [
      {
        playerId: 1,
        match_id: 10,
        playerName: "Aaron Rodgers",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Dallas Cowboys",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        injured: false,
        position: "QB",
        playerStats: {
          pydsg: 209.9,
          rydsg: 13.2,
          ptd: 87,
          rtd: 13,
        },
        steps: [
          {
            titles: ["P YDS/G", "R YDS/G", "P TD", "R TD", "FPPG"],
            step: [209.0, 13.2, 87, 13, 17.4],
          },
          {
            titles: ["G", "YDS", "YDS/G", "TD", "FPPG"],
            step: [
              {
                title: "Home Games",
                values: [35, "7,744", 221.3, 46, 14.0],
              },
              {
                title: "Away Games",
                values: [26, "5,693", 219.0, 34, 13.8],
              },
              {
                title: "2021 Total",
                values: [61, "13,437", 220.3, 80, 13.9],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
      {
        playerId: 2,
        match_id: 20,
        playerName: "Derek Carr",
        avgVal: 4,
        homeTeam: "Detroit Lions",
        awayTeam: "San Francisco 49ers",
        time: "01:97 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        isStarPlayer: true,
        position: "QB",
        playerStats: {
          pydsg: 209.9,
          rydsg: 13.2,
          ptd: 87,
          rtd: 13,
        },
        steps: [
          {
            titles: ["P YDS/G", "R YDS/G", "P TD", "R TD", "FPPG"],
            step: [209.0, 13.2, 87, 13, 17.4],
          },
          {
            titles: ["G", "YDS", "YDS/G", "TD", "FPPG"],
            step: [
              {
                title: "Home Games",
                values: [35, "7,744", 221.3, 46, 14.0],
              },
              {
                title: "Away Games",
                values: [26, "5,693", 219.0, 34, 13.8],
              },
              {
                title: "2021 Total",
                values: [61, "13,437", 220.3, 80, 13.9],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
      {
        playerId: 3,
        match_id: 21,
        playerName: "Matt Ryan",
        avgVal: 4,
        homeTeam: "Chicago Bears",
        awayTeam: "Indianapolis Colts",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        position: "RB",
        playerStats: {
          ydsg: 13.2,
          ptd: 87,
          rtd: 13,
        },
        steps: [
          {
            titles: ["P YDS/G", "R YDS/G", "P TD", "R TD", "FPPG"],
            step: [209.0, 13.2, 87, 13, 17.4],
          },
          {
            titles: ["G", "YDS/G", "TD", "REC", "YDS/G", "TD", "FPPG"],
            step: [
              {
                title: "Home Games",
                values: [40, 60.0, 35, 163, 32.5, 7, 19.9],
              },
              {
                title: "Away Games",
                values: [31, 52.6, 17, 113, 25.8, 3, 15.6],
              },
              {
                title: "2021 Total",
                values: [71, 56.8, 52, 276, 29.5, 10, 18.0],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
      {
        playerId: 4,
        match_id: 22,
        playerName: "Josh Allen",
        avgVal: 4,
        homeTeam: "Philadelphia Eagles",
        awayTeam: "Los Angeles Rams",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        position: "wr",
        playerStats: {
          ydsg: 13.2,
          ptd: 87,
          rtd: 13,
        },
        steps: [
          {
            titles: ["P YDS/G", "R YDS/G", "P TD", "R TD", "FPPG"],
            step: [209.0, 13.2, 87, 13, 17.4],
          },
          {
            titles: ["G", "REC", "YDS", "YDS/G", "TD", "FPPG"],
            step: [
              {
                title: "Home Games",
                values: [15, 29, 189, 12.6, 1, 1],
              },
              {
                title: "Away Games",
                values: [7, 9, 102, 14.6, 1, 3.6],
              },
              {
                title: "2021 Total",
                values: [22, 29, 291, 13.2, 2, 3.1],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
      {
        playerId: 5,
        match_id: 23,
        playerName: "Drew Lock",
        avgVal: 4,
        homeTeam: "Pittsburg Eagles",
        awayTeam: "Chicago Bears",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        position: "te",
        playerStats: {
          ydsg: 13.2,
          ptd: 87,
          rtd: 13,
        },
        steps: [
          {
            titles: ["P YDS/G", "R YDS/G", "P TD", "R TD", "FPPG"],
            step: [209.0, 13.2, 87, 13, 17.4],
          },
          {
            titles: ["G", "REC", "YDS", "YDS/G", "TD", "FPPG"],
            step: [
              {
                title: "Home Games",
                values: [15, 29, 189, 12.6, 1, 1],
              },
              {
                title: "Away Games",
                values: [7, 9, 102, 14.6, 1, 3.6],
              },
              {
                title: "2021 Total",
                values: [22, 29, 291, 13.2, 2, 3.1],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
      {
        playerId: 6,
        match_id: 24,
        playerName: "Lamar Jackson",
        avgVal: 4,
        homeTeam: "Green Bay Packers",
        awayTeam: "Washinghton Football Team",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        position: "k",
        playerStats: {
          fga: 209.9,
          fgm: 13.2,
          pct: 87,
          lng: 13,
        },
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
    ],
  },
  {
    type: K,
    listData: [
      {
        playerId: 1,
        match_id: 25,
        playerName: "Aaron Rodgers",
        avgVal: 4,
        homeTeam: "Arizona Diamondbacks",
        awayTeam: "Dallas Cowboys",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        injured: false,
        position: "QB",
        playerStats: {
          pydsg: 209.9,
          rydsg: 13.2,
          ptd: 87,
          rtd: 13,
        },
        steps: [
          {
            titles: ["P YDS/G", "R YDS/G", "P TD", "R TD", "FPPG"],
            step: [209.0, 13.2, 87, 13, 17.4],
          },
          {
            titles: ["G", "YDS", "YDS/G", "TD", "FPPG"],
            step: [
              {
                title: "Home Games",
                values: [35, "7,744", 221.3, 46, 14.0],
              },
              {
                title: "Away Games",
                values: [26, "5,693", 219.0, 34, 13.8],
              },
              {
                title: "2021 Total",
                values: [61, "13,437", 220.3, 80, 13.9],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
      {
        playerId: 2,
        match_id: 26,
        playerName: "Derek Carr",
        avgVal: 4,
        homeTeam: "Detroit Lions",
        awayTeam: "San Francisco 49ers",
        time: "01:97 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        isStarPlayer: true,
        position: "QB",
        playerStats: {
          pydsg: 209.9,
          rydsg: 13.2,
          ptd: 87,
          rtd: 13,
        },
        steps: [
          {
            titles: ["P YDS/G", "R YDS/G", "P TD", "R TD", "FPPG"],
            step: [209.0, 13.2, 87, 13, 17.4],
          },
          {
            titles: ["G", "YDS", "YDS/G", "TD", "FPPG"],
            step: [
              {
                title: "Home Games",
                values: [35, "7,744", 221.3, 46, 14.0],
              },
              {
                title: "Away Games",
                values: [26, "5,693", 219.0, 34, 13.8],
              },
              {
                title: "2021 Total",
                values: [61, "13,437", 220.3, 80, 13.9],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
      {
        playerId: 3,
        match_id: 27,
        playerName: "Matt Ryan",
        avgVal: 4,
        homeTeam: "Chicago Bears",
        awayTeam: "Indianapolis Colts",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        position: "RB",
        playerStats: {
          ydsg: 13.2,
          ptd: 87,
          rtd: 13,
        },
        steps: [
          {
            titles: ["P YDS/G", "R YDS/G", "P TD", "R TD", "FPPG"],
            step: [209.0, 13.2, 87, 13, 17.4],
          },
          {
            titles: ["G", "YDS/G", "TD", "REC", "YDS/G", "TD", "FPPG"],
            step: [
              {
                title: "Home Games",
                values: [40, 60.0, 35, 163, 32.5, 7, 19.9],
              },
              {
                title: "Away Games",
                values: [31, 52.6, 17, 113, 25.8, 3, 15.6],
              },
              {
                title: "2021 Total",
                values: [71, 56.8, 52, 276, 29.5, 10, 18.0],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
      {
        playerId: 4,
        match_id: 28,
        playerName: "Josh Allen",
        avgVal: 4,
        homeTeam: "Philadelphia Eagles",
        awayTeam: "Los Angeles Rams",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        position: "wr",
        playerStats: {
          ydsg: 13.2,
          ptd: 87,
          rtd: 13,
        },
        steps: [
          {
            titles: ["P YDS/G", "R YDS/G", "P TD", "R TD", "FPPG"],
            step: [209.0, 13.2, 87, 13, 17.4],
          },
          {
            titles: ["G", "REC", "YDS", "YDS/G", "TD", "FPPG"],
            step: [
              {
                title: "Home Games",
                values: [15, 29, 189, 12.6, 1, 1],
              },
              {
                title: "Away Games",
                values: [7, 9, 102, 14.6, 1, 3.6],
              },
              {
                title: "2021 Total",
                values: [22, 29, 291, 13.2, 2, 3.1],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
      {
        playerId: 5,
        match_id: 29,
        playerName: "Drew Lock",
        avgVal: 4,
        homeTeam: "Pittsburg Eagles",
        awayTeam: "Chicago Bears",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        position: "te",
        playerStats: {
          ydsg: 13.2,
          ptd: 87,
          rtd: 13,
        },
        steps: [
          {
            titles: ["P YDS/G", "R YDS/G", "P TD", "R TD", "FPPG"],
            step: [209.0, 13.2, 87, 13, 17.4],
          },
          {
            titles: ["G", "REC", "YDS", "YDS/G", "TD", "FPPG"],
            step: [
              {
                title: "Home Games",
                values: [15, 29, 189, 12.6, 1, 1],
              },
              {
                title: "Away Games",
                values: [7, 9, 102, 14.6, 1, 3.6],
              },
              {
                title: "2021 Total",
                values: [22, 29, 291, 13.2, 2, 3.1],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
      {
        playerId: 6,
        match_id: 30,
        playerName: "Lamar Jackson",
        avgVal: 4,
        homeTeam: "Green Bay Packers",
        awayTeam: "Washinghton Football Team",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        position: "k",
        playerStats: {
          fga: 209.9,
          fgm: 13.2,
          pct: 87,
          lng: 13,
        },
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
    ],
  },
  {
    type: D,
    listData: [
      {
        team_id: 70,
        match_id: 71,
        name: "Toronto Blue Jays",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "sp",
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        statHistory: {
          last_game: {
            hits: 0,
            doubles: 0,
            triples: 0,
            home_runs: 0,
            stolen_bases: 0,
            runs_batted_in: 0,
            batting_average: 0,
            wins: 0,
            losses: 1,
            innings_pitched: 146,
            strike_outs: 89,
            earned_runs_average: 5,
            base_on_balls: 1,
            walks_hits_per_innings_pitched: 1.3333,
          },
          last_10_game: {
            hits: 0,
            doubles: 0,
            triples: 0,
            home_runs: 0,
            stolen_bases: 0,
            runs_batted_in: 0,
            batting_average: 0,
            wins: 0,
            losses: 1,
            innings_pitched: 146,
            strike_outs: 89,
            earned_runs_average: 5,
            base_on_balls: 1,
            walks_hits_per_innings_pitched: 1.3333,
          },
          2020_2021: {
            hits: 0,
            doubles: 0,
            triples: 0,
            home_runs: 0,
            stolen_bases: 0,
            runs_batted_in: 0,
            batting_average: 0,
            wins: 0,
            losses: 1,
            innings_pitched: 146,
            strike_outs: 89,
            earned_runs_average: 5,
            base_on_balls: 1,
            walks_hits_per_innings_pitched: 1.3333,
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
      {
        team_id: 71,
        match_id: 72,
        name: "Tampa Bay Lightening",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        isStarPlayer: true,
        position: "of",
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        statHistory: {
          last_game: {
            hits: 0,
            doubles: 0,
            triples: 0,
            home_runs: 0,
            stolen_bases: 0,
            runs_batted_in: 0,
            batting_average: 0,
            wins: 0,
            losses: 1,
            innings_pitched: 146,
            strike_outs: 89,
            earned_runs_average: 5,
            base_on_balls: 1,
            walks_hits_per_innings_pitched: 1.3333,
          },
          last_10_game: {
            hits: 0,
            doubles: 0,
            triples: 0,
            home_runs: 0,
            stolen_bases: 0,
            runs_batted_in: 0,
            batting_average: 0,
            wins: 0,
            losses: 1,
            innings_pitched: 146,
            strike_outs: 89,
            earned_runs_average: 5,
            base_on_balls: 1,
            walks_hits_per_innings_pitched: 1.3333,
          },
          2020_2021: {
            hits: 0,
            doubles: 0,
            triples: 0,
            home_runs: 0,
            stolen_bases: 0,
            runs_batted_in: 0,
            batting_average: 0,
            wins: 0,
            losses: 1,
            innings_pitched: 146,
            strike_outs: 89,
            earned_runs_average: 5,
            base_on_balls: 1,
            walks_hits_per_innings_pitched: 1.3333,
          },
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
      {
        team_id: 72,
        match_id: 73,
        name: "Columbus Blue Jackets",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "if",
        statHistory: {
          last_game: {
            hits: 0,
            doubles: 0,
            triples: 0,
            home_runs: 0,
            stolen_bases: 0,
            runs_batted_in: 0,
            batting_average: 0,
            wins: 0,
            losses: 1,
            innings_pitched: 146,
            strike_outs: 89,
            earned_runs_average: 5,
            base_on_balls: 1,
            walks_hits_per_innings_pitched: 1.3333,
          },
          last_10_game: {
            hits: 0,
            doubles: 0,
            triples: 0,
            home_runs: 0,
            stolen_bases: 0,
            runs_batted_in: 0,
            batting_average: 0,
            wins: 0,
            losses: 1,
            innings_pitched: 146,
            strike_outs: 89,
            earned_runs_average: 5,
            base_on_balls: 1,
            walks_hits_per_innings_pitched: 1.3333,
          },
          2020_2021: {
            hits: 0,
            doubles: 0,
            triples: 0,
            home_runs: 0,
            stolen_bases: 0,
            runs_batted_in: 0,
            batting_average: 0,
            wins: 0,
            losses: 1,
            innings_pitched: 146,
            strike_outs: 89,
            earned_runs_average: 5,
            base_on_balls: 1,
            walks_hits_per_innings_pitched: 1.3333,
          },
        },
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
      {
        team_id: 73,
        match_id: 72,
        name: "Chris Carpenter",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamBName: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "of",
        stats: {
          val1: "ip:3.1 | pc:34",
          val2: "k:4 | w:3",
        },
        points: 6,
        status: "batting",
        playerStats: {
          battingPlayer: {
            playerName: "J. Rogers",
            stats: ".280 | 1/3 | s:0 | b:3",
          },
        },
        statHistory: {
          last_game: {
            hits: 0,
            doubles: 0,
            triples: 0,
            home_runs: 0,
            stolen_bases: 0,
            runs_batted_in: 0,
            batting_average: 0,
            wins: 0,
            losses: 1,
            innings_pitched: 146,
            strike_outs: 89,
            earned_runs_average: 5,
            base_on_balls: 1,
            walks_hits_per_innings_pitched: 1.3333,
          },
          last_10_game: {
            hits: 0,
            doubles: 0,
            triples: 0,
            home_runs: 0,
            stolen_bases: 0,
            runs_batted_in: 0,
            batting_average: 0,
            wins: 0,
            losses: 1,
            innings_pitched: 146,
            strike_outs: 89,
            earned_runs_average: 5,
            base_on_balls: 1,
            walks_hits_per_innings_pitched: 1.3333,
          },
          2020_2021: {
            hits: 0,
            doubles: 0,
            triples: 0,
            home_runs: 0,
            stolen_bases: 0,
            runs_batted_in: 0,
            batting_average: 0,
            wins: 0,
            losses: 1,
            innings_pitched: 146,
            strike_outs: 89,
            earned_runs_average: 5,
            base_on_balls: 1,
            walks_hits_per_innings_pitched: 1.3333,
          },
        },
        pointsSummary: [
          { status: "p1: 19:59", type: "hr", power: "2x", pts: 4 },
          { status: "p2: 13:45", type: "triple", power: "", pts: 2 },
          { status: "p3: 00:01", type: "single", power: "3x", pts: 0 },
          { status: "ot: 04:58", type: "double", power: "1x", pts: 1 },
          { status: "p1: 19:59", type: "walk", power: "4x", pts: 9 },
        ],
        totalPts: 27,
      },
    ],
  },
];
