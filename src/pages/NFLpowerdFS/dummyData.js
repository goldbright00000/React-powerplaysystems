import AdImg from "../../assets/img.jpg";
import { CONSTANTS } from "../../utility/constants";

const { QB, RB, WR, TE, K, D } = CONSTANTS.FILTERS.NFL;

export const dummyData = [
  {
    cat: QB,
    data: [
      {
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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
        id: 5,
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
        id: 6,
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
        steps: [
          {
            titles: ["P YDS/G", "R YDS/G", "P TD", "R TD", "FPPG"],
            step: [209.0, 13.2, 87, 13, 17.4],
          },
          {
            titles: ["G", "FGM", "40-49 FG", "50+ FG", "XPM", "FPPG"],
            step: [
              {
                title: "Home Games",
                values: [35, 35, 10, 4, 60, 5.2],
              },
              {
                title: "Away Games",
                values: [26, 24, 6, 0, 55, 5.1],
              },
              {
                title: "2021 Total",
                values: [61, 59, 16, 4, 115, 5.2],
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
    ],
  },
  {
    cat: RB,
    data: [
      {
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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
        id: 5,
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
        id: 6,
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
        steps: [
          {
            titles: ["P YDS/G", "R YDS/G", "P TD", "R TD", "FPPG"],
            step: [209.0, 13.2, 87, 13, 17.4],
          },
          {
            titles: ["G", "FGM", "40-49 FG", "50+ FG", "XPM", "FPPG"],
            step: [
              {
                title: "Home Games",
                values: [35, 35, 10, 4, 60, 5.2],
              },
              {
                title: "Away Games",
                values: [26, 24, 6, 0, 55, 5.1],
              },
              {
                title: "2021 Total",
                values: [61, 59, 16, 4, 115, 5.2],
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
    ],
  },
  {
    cat: WR,
    data: [
      {
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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
        id: 5,
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
        id: 6,
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
        steps: [
          {
            titles: ["P YDS/G", "R YDS/G", "P TD", "R TD", "FPPG"],
            step: [209.0, 13.2, 87, 13, 17.4],
          },
          {
            titles: ["G", "FGM", "40-49 FG", "50+ FG", "XPM", "FPPG"],
            step: [
              {
                title: "Home Games",
                values: [35, 35, 10, 4, 60, 5.2],
              },
              {
                title: "Away Games",
                values: [26, 24, 6, 0, 55, 5.1],
              },
              {
                title: "2021 Total",
                values: [61, 59, 16, 4, 115, 5.2],
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
    ],
  },
  {
    cat: TE,
    data: [
      {
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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
        id: 5,
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
        id: 6,
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
        steps: [
          {
            titles: ["P YDS/G", "R YDS/G", "P TD", "R TD", "FPPG"],
            step: [209.0, 13.2, 87, 13, 17.4],
          },
          {
            titles: ["G", "FGM", "40-49 FG", "50+ FG", "XPM", "FPPG"],
            step: [
              {
                title: "Home Games",
                values: [35, 35, 10, 4, 60, 5.2],
              },
              {
                title: "Away Games",
                values: [26, 24, 6, 0, 55, 5.1],
              },
              {
                title: "2021 Total",
                values: [61, 59, 16, 4, 115, 5.2],
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
    ],
  },
  {
    cat: K,
    data: [
      {
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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
        id: 5,
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
        id: 6,
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
        steps: [
          {
            titles: ["P YDS/G", "R YDS/G", "P TD", "R TD", "FPPG"],
            step: [209.0, 13.2, 87, 13, 17.4],
          },
          {
            titles: ["G", "FGM", "40-49 FG", "50+ FG", "XPM", "FPPG"],
            step: [
              {
                title: "Home Games",
                values: [35, 35, 10, 4, 60, 5.2],
              },
              {
                title: "Away Games",
                values: [26, 24, 6, 0, 55, 5.1],
              },
              {
                title: "2021 Total",
                values: [61, 59, 16, 4, 115, 5.2],
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
    ],
  },
  {
    cat: D,
    data: [
      {
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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
        id: 5,
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
        id: 6,
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
        steps: [
          {
            titles: ["P YDS/G", "R YDS/G", "P TD", "R TD", "FPPG"],
            step: [209.0, 13.2, 87, 13, 17.4],
          },
          {
            titles: ["G", "FGM", "40-49 FG", "50+ FG", "XPM", "FPPG"],
            step: [
              {
                title: "Home Games",
                values: [35, 35, 10, 4, 60, 5.2],
              },
              {
                title: "Away Games",
                values: [26, 24, 6, 0, 55, 5.1],
              },
              {
                title: "2021 Total",
                values: [61, 59, 16, 4, 115, 5.2],
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
    ],
  },
];
