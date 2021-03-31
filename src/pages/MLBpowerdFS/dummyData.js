import AdImg from "../../assets/img.jpg";
import { CONSTANTS } from "../../utility/constants";

const { P, C, SS, XB, OF, D } = CONSTANTS.FILTERS.MLB;

export const dummyData = [
  {
    cat: P,
    data: [
      {
        id: 1,
        title: "Nathan McKinnen C",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        injured: true,
        position: "sp",
        steps: [
          {
            titles: ["ERA", "W-L", "k", "whip", "fppg"],
            step: [21, "8-4", 13, 31, 20.0],
          },
          {
            titles: ["W", "L", "IP", "K", "ERA", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 7, 14.8, 8.9],
              },
              {
                title: "last 10 games",
                values: [10, 8, 17, 39, 18.8, 23.3],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 7, 14.8, 23.4],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        id: 2,
        title: "Conner McDavid",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        isStarPlayer: true,
        position: "if",
        steps: [
          {
            titles: ["ERA", "W-L", "k", "whip", "fppg"],
            step: [21, 18, 13, 31, 20.0],
          },
          {
            titles: ["ERA", "W-L", "k", "whip", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 7, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 17, 39, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 7, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        id: 3,
        title: "Sebastian Aho",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "if",
        steps: [
          {
            titles: ["ERA", "W-L", "k", "whip", "fppg"],
            step: [21, 18, 13, 31, 20.0],
          },
          {
            titles: ["ERA", "W-L", "k", "whip", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 7, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 17, 39, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 7, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        id: 4,
        title: "Chris Carpenter",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "of",
      },
    ],
  },
  {
    cat: C,
    data: [
      {
        id: 11,
        title: "Nathan McKinnen LW",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "sp",
        steps: [
          {
            titles: ["avg", "hr", "rbi", "fppg"],
            step: [21, 18, 13, 20.0],
          },
          {
            titles: ["gp", "g", "a", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        id: 22,
        title: "Conner McDavid",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        isStarPlayer: true,
        position: "if",
        steps: [
          {
            titles: ["avg", "hr", "rbi", "fppg"],
            step: [21, 18, 13, 20.0],
          },
          {
            titles: ["gp", "g", "a", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        id: 33,
        title: "Sebastian Aho",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "of",
        steps: [
          {
            titles: ["avg", "hr", "rbi", "fppg"],
            step: [21, 18, 13, 20.0],
          },
          {
            titles: ["gp", "g", "a", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        id: 44,
        title: "Chris Carpenter",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "c",
      },
    ],
  },
  {
    cat: SS,
    data: [
      {
        id: 55,
        title: "Nathan McKinnen RW",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "sp",
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
      },
      {
        id: 66,
        title: "Conner McDavid",
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
      },
      {
        id: 77,
        title: "Sebastian Aho",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "if",
        steps: [
          {
            titles: ["avg", "hr", "rbi", "fppg"],
            step: [21, 18, 13, 20.0],
          },
          {
            titles: ["gp", "g", "a", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        id: 88,
        title: "Chris Carpenter",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "of",
      },
    ],
  },
  {
    cat: D,
    data: [
      {
        id: 70,
        title: "Nathan McKinnen D",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "sp",
        steps: [
          {
            titles: ["avg", "hr", "rbi", "fppg"],
            step: [21, 18, 13, 20.0],
          },
          {
            titles: ["gp", "g", "a", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        id: 71,
        title: "Conner McDavid",
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
            titles: ["avg", "hr", "rbi", "fppg"],
            step: [21, 18, 13, 20.0],
          },
          {
            titles: ["gp", "g", "a", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        id: 72,
        title: "Sebastian Aho",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "if",
        steps: [
          {
            titles: ["avg", "hr", "rbi", "fppg"],
            step: [21, 18, 13, 20.0],
          },
          {
            titles: ["gp", "g", "a", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 9, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        id: 73,
        title: "Chris Carpenter",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "of",
      },
    ],
  },
  {
    cat: OF,
    data: [
      {
        id: 74,
        title: "Nathan McKinnen G",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "d",
        steps: [
          {
            titles: ["avg", "hr", "rbi", "fppg"],
            step: [21, 18, 13, 20.0],
          },
          {
            titles: ["ERA", "W-L", "k", "whip", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 7, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 9, 39, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 7, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        id: 75,
        title: "Conner McDavid",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        isStarPlayer: true,
        position: "sp",
        steps: [
          {
            titles: ["ERA", "W-L", "k", "whip", "fppg"],
            step: [21, 18, 13, 31, 20.0],
          },
          {
            titles: ["ERA", "W-L", "k", "whip", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 7, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 9, 39, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 7, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        id: 76,
        title: "Sebastian Aho",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "if",
        steps: [
          {
            titles: ["ERA", "W-L", "k", "whip", "fppg"],
            step: [21, 18, 13, 31, 20.0],
          },
          {
            titles: ["ERA", "W-L", "k", "whip", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 7, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 9, 39, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 7, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        id: 799,
        title: "Chris Carpenter",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "of",
      },
    ],
  },
  {
    cat: XB,
    data: [
      {
        id: 78,
        title: "Nathan McKinnen TD",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "sp",
        steps: [
          {
            titles: ["gp", "g", "a", "pts", "fppg"],
            step: [21, 18, 13, 31, 20.0],
          },
          {
            titles: ["gp", "g", "a", "pts", "sog", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 0, 7, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 9, 17, 39, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 0, 7, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        id: 79,
        title: "Conner McDavid",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        isStarPlayer: true,
        position: "if",
        steps: [
          {
            titles: ["gp", "g", "a", "pts", "fppg"],
            step: [21, 18, 13, 31, 20.0],
          },
          {
            titles: ["gp", "g", "a", "pts", "sog", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 0, 7, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 9, 17, 39, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 0, 7, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        id: 80,
        title: "Tampa Bay Lightening",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "of",
        steps: [
          {
            titles: ["gp", "g", "a", "pts", "fppg"],
            step: [21, 18, 13, 31, 20.0],
          },
          {
            titles: ["gp", "g", "a", "pts", "sog", "fppg"],
            step: [
              {
                title: "last game",
                values: [1, 0, 0, 0, 7, 14.8],
              },
              {
                title: "last 10 games",
                values: [10, 8, 9, 17, 39, 18.8],
              },
              {
                title: "2020-2021",
                values: [1, 0, 0, 0, 7, 14.8],
              },
            ],
          },
          {
            step: {
              ad: AdImg,
            },
          },
        ],
      },
      {
        id: 81,
        title: "Columbus Blue Jackets",
        avgVal: 4,
        teamA: "Arizona Diamondbacks",
        teamB: "Baltimore Orioles",
        time: "01:10 PM",
        date: "2020-09-28",
        stadium: "Empower Field",
        position: "d",
      },
    ],
  },
];
