import AdImg from "../../assets/img.jpg";
import { CONSTANTS } from "../../utility/constants";

const { QB, RB, WR, TE, K, D } = CONSTANTS.FILTERS.NFL;

export const dummyData = [
  {
    cat: QB,
    data: [
      {
        id: 1,
        name: "Aaron Rodgers",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Dallas Cowboys",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        injured: false,
        position: "QB",
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
                values: [35, '7,744', 221.3, 46, 14.0],
              },
              {
                title: "Away Games",
                values: [26, '5,693', 219.0, 34, 13.8],
              },
              {
                title: "2021 Madden",
                values: [61, '13,437', 220.3, 80, 13.9],
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
        name: "Derek Carr",
        avgVal: 4,
        teamA: "Detroit Lions",
        teamB: "San Francisco 49ers",
        time: "01:97 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        isStarPlayer: true,
        position: "RB",
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
                values: [35, '7,744', 221.3, 46, 14.0],
              },
              {
                title: "Away Games",
                values: [26, '5,693', 219.0, 34, 13.8],
              },
              {
                title: "2021 Madden",
                values: [61, '13,437', 220.3, 80, 13.9],
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
        name: "Matt Ryan",
        avgVal: 4,
        teamA: "Chicago Bears",
        teamB: "Indianapolis Colts",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        position: "RB",
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
                title: "2021 Madden",
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
        name: "Josh Allen",
        avgVal: 4,
        teamA: "Philadelphia Eagles",
        teamB: "Los Angeles Rams",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        position: "wr",
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
                title: "2021 Madden",
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
        name: "Drew Lock",
        avgVal: 4,
        teamA: "Pittsburg Eagles",
        teamB: "Chicago Bears",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        position: "te",
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
                title: "2021 Madden",
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
        name: "Lamar Jackson",
        avgVal: 4,
        teamA: "Green Bay Packers",
        teamB: "Washinghton Football Team",
        time: "01:07 PM",
        date: "2020-09-28",
        stadium: "Citizens Bank Park",
        position: "k",
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
                title: "2021 Madden",
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
        id: 11,
        name: "Nathan McKinnen",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "c",
        steps: [
          {
            titles: ["avg", "hr", "rbi", "fppg"],
            step: [21, 18, 13, 20.0],
          },
          {
            titles: ["h", "2b", "hr", "rbi", "avg", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 1, 1, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 2, 1, 14.8],
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
        id: 22,
        name: "Conner McDavid",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        isStarPlayer: true,
        position: "c",
        steps: [
          {
            titles: ["avg", "hr", "rbi", "fppg"],
            step: [21, 18, 13, 20.0],
          },
          {
            titles: ["h", "2b", "hr", "rbi", "avg", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 1, 1, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 2, 1, 14.8],
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
        id: 33,
        name: "Sebastian Aho",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "c",
        steps: [
          {
            titles: ["avg", "hr", "rbi", "fppg"],
            step: [21, 18, 13, 20.0],
          },
          {
            titles: ["h", "2b", "hr", "rbi", "avg", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 1, 1, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 2, 1, 14.8],
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
        id: 44,
        name: "Chris Carpenter",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "c",
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
        id: 55,
        name: "Nathan McKinnen",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "ss",
        steps: [
          {
            titles: ["avg", "hr", "rbi", "fppg"],
            step: [21, 18, 13, 20.0],
          },
          {
            titles: ["h", "2b", "hr", "rbi", "avg", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 3, 1.4, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 0.9, 1, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 1, 2, 0, 14.8],
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
        id: 66,
        name: "Conner McDavid",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        isStarPlayer: true,
        position: "ss",
        steps: [
          {
            titles: ["avg", "hr", "rbi", "fppg"],
            step: [21, 18, 13, 20.0],
          },
          {
            titles: ["h", "2b", "hr", "rbi", "avg", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 3, 1.4, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 0.9, 1, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 1, 2, 0, 14.8],
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
        id: 77,
        name: "Sebastian Aho",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "ss",
        steps: [
          {
            titles: ["avg", "hr", "rbi", "fppg"],
            step: [21, 18, 13, 20.0],
          },
          {
            titles: ["h", "2b", "hr", "rbi", "avg", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 1, 1, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 2, 1, 14.8],
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
        id: 88,
        name: "Chris Carpenter",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "ss",
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
        id: 70,
        name: "Toronto Blue Jays",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "sp",
        steps: [
          {
            titles: ["w", "l", "ara", "fppg"],
            step: [21, 18, 13, -20],
          },
          {
            titles: ["h", "2b", "hr", "rbi", "avg", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 1, 1, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 2, 1, 14.8],
              },
            ],
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
        id: 71,
        name: "Tampa Bay Lightening",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        isStarPlayer: true,
        position: "of",
        steps: [
          {
            titles: ["w", "l", "ara", "fppg"],
            step: [21, 18, 13, -20],
          },
          {
            titles: ["h", "2b", "hr", "rbi", "avg", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 1, 1, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 2, 1, 14.8],
              },
            ],
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
        id: 72,
        name: "Columbus Blue Jackets",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "if",
        steps: [
          {
            titles: ["w", "l", "ara", "fppg"],
            step: [21, 18, 13, -20],
          },
          {
            titles: ["h", "2b", "hr", "rbi", "avg", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 1, 1, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 2, 1, 14.8],
              },
            ],
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
        id: 73,
        name: "Chris Carpenter",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
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
        id: 74,
        name: "Nathan McKinnen",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "cf",
        steps: [
          {
            titles: ["avg", "hr", "rbi", "fppg"],
            step: [21, 18, 13, 20.0],
          },
          {
            titles: ["h", "2b", "hr", "rbi", "avg", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 1, 1, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 2, 1, 14.8],
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
        id: 75,
        name: "Conner McDavid",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        isStarPlayer: true,
        position: "lf",
        steps: [
          {
            titles: ["ERA", "W-L", "k", "whip", "fppg"],
            step: [21, 18, 13, 31, 20.0],
          },
          {
            titles: ["h", "2b", "hr", "rbi", "avg", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 1, 1, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 2, 1, 14.8],
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
        id: 76,
        name: "Sebastian Aho",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "rf",
        steps: [
          {
            titles: ["ERA", "W-L", "k", "whip", "fppg"],
            step: [21, 18, 13, 31, 20.0],
          },
          {
            titles: ["h", "2b", "hr", "rbi", "avg", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 1, 1, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 2, 1, 14.8],
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
        id: 799,
        name: "Chris Carpenter",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "lf",
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
        id: 78,
        name: "Nathan McKinnen",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "1b",
        steps: [
          {
            titles: ["gp", "g", "a", "pts", "fppg"],
            step: [21, 18, 13, 31, 20.0],
          },
          {
            titles: ["h", "2b", "hr", "rbi", "avg", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 1, 1, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 2, 1, 14.8],
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
        id: 79,
        name: "Conner McDavid",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        isStarPlayer: true,
        position: "2b",
        steps: [
          {
            titles: ["gp", "g", "a", "pts", "fppg"],
            step: [21, 18, 13, 31, 20.0],
          },
          {
            titles: ["h", "2b", "hr", "rbi", "avg", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 1, 1, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 2, 1, 14.8],
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
        id: 80,
        name: "Conner McDavid",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "3b",
        steps: [
          {
            titles: ["gp", "g", "a", "pts", "fppg"],
            step: [21, 18, 13, 31, 20.0],
          },
          {
            titles: ["h", "2b", "hr", "rbi", "avg", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 1, 1, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 2, 1, 14.8],
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
        id: 81,
        name: "Sebastian Aho",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "2b",
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
