import AdImg from '../../assets/img.jpg';

export const dummyData = [
    {
        id: 1,
        title: 'Nathan McKinnen C',
        avgVal: 4,
        teamA: 'Toronto Mapple Leafs 10',
        teamB: 'Boston Bruins 2',
        time: '01:10 PM',
        date: '2020-09-28',
        stadium: 'Empower Field',
        injured: true,
        category: 'c1',
        live_data_steps: [
            {
                states: {
                    sog: 5,
                    g: 1,
                    a: 2,
                },
                points: 6,
                type: 'on Ice',
                value: 'DET - Shorthanded x1',
            },
            {
                step: [
                    { p1: 'P1: 19:59', type: 'goal', power: '2x', pts: 4 },
                    { p1: 'P2: 13:45', type: 'asset', power: '', pts: 2 },
                    { p1: 'P3: 00:01', type: 'goal', power: '3x', pts: 8 },
                    { p1: 'OT: 04:58', type: 'goal', power: '3x', pts: 9 },
                ],
                totalPoints: 27,
            }
        ],
        steps: [
            {
                titles: ['gp', 'g', 'a', 'pts', 'fppg'],
                step: [21, 18, 13, 31, 20.0]
            },
            {
                titles: ['gp', 'g', 'a', 'pts', 'sog', 'fppg'],
                step: [
                    {
                        title: 'last game',
                        values: [1, 0, 0, 0, 7, 14.8],
                    },
                    {
                        title: 'last 10 games',
                        values: [10, 8, 9, 17, 39, 18.8],
                    },
                    {
                        title: '2020-2021',
                        values: [1, 0, 0, 0, 7, 14.8],
                    }
                ]
            },
            {
                step: {
                    ad: AdImg
                }
            }
        ],
    },
    {
        id: 2,
        title: 'Conner McDavid',
        avgVal: 4,
        teamA: 'Toronto Mapple Leafs 10',
        teamB: 'Boston Bruins 2',
        time: '01:10 PM',
        date: '2020-09-28',
        stadium: 'Empower Field',
        isStarPlayer: true,
        category: 'c2',
        live_data_steps: [
            {
                states: {
                    sog: 5,
                    g: 1,
                    a: 2,
                },
                points: 6,
                type: '1st intermission',
                value: 'TOR - Shorthanded x2',
            },
            {
                step: [
                    { p1: 'P1: 19:59', type: 'goal', power: '2x', pts: 4 },
                    { p1: 'P2: 13:45', type: 'asset', power: '', pts: 2 },
                    { p1: 'P3: 00:01', type: 'goal', power: '3x', pts: 8 },
                    { p1: 'OT: 04:58', type: 'goal', power: '3x', pts: 9 },
                ],
                totalPoints: 27,
            }
        ],
        steps: [
            {
                titles: ['gp', 'g', 'a', 'pts', 'fppg'],
                step: [21, 18, 13, 31, 20.0]
            },
            {
                titles: ['gp', 'g', 'a', 'pts', 'sog', 'fppg'],
                step: [
                    {
                        title: 'last game',
                        values: [1, 0, 0, 0, 7, 14.8],
                    },
                    {
                        title: 'last 10 games',
                        values: [10, 8, 9, 17, 39, 18.8],
                    },
                    {
                        title: '2020-2021',
                        values: [1, 0, 0, 0, 7, 14.8],
                    }
                ]
            },
            {
                step: {
                    ad: AdImg
                }
            }
        ],
    },
    {
        id: 3,
        title: 'Sebastian Aho',
        avgVal: 4,
        teamA: 'Toronto Mapple Leafs 10',
        teamB: 'Boston Bruins 2',
        time: '01:10 PM',
        date: '2020-09-28',
        stadium: 'Empower Field',
        category: 'lw',
        live_data_steps: [
            {
                states: {
                    sog: 5,
                    g: 1,
                    a: 2,
                },
                points: 6,
                type: 'on Bench',
                value: 'TOR - Empty Net',
            },
            {
                step: [
                    { p1: 'P1: 19:59', type: 'goal', power: '2x', pts: 4 },
                    { p1: 'P2: 13:45', type: 'asset', power: '', pts: 2 },
                    { p1: 'P3: 00:01', type: 'goal', power: '3x', pts: 8 },
                    { p1: 'OT: 04:58', type: 'goal', power: '3x', pts: 9 },
                ],
                totalPoints: 27,
            }
        ],
        steps: [
            {
                titles: ['gp', 'g', 'a', 'pts', 'fppg'],
                step: [21, 18, 13, 31, 20.0]
            },
            {
                titles: ['gp', 'g', 'a', 'pts', 'sog', 'fppg'],
                step: [
                    {
                        title: 'last game',
                        values: [1, 0, 0, 0, 7, 14.8],
                    },
                    {
                        title: 'last 10 games',
                        values: [10, 8, 9, 17, 39, 18.8],
                    },
                    {
                        title: '2020-2021',
                        values: [1, 0, 0, 0, 7, 14.8],
                    }
                ]
            },
            {
                step: {
                    ad: AdImg
                }
            }
        ],
    },
    {
        id: 4,
        title: 'Sebastian Aho',
        avgVal: 4,
        teamA: 'Toronto Mapple Leafs 10',
        teamB: 'Boston Bruins 2',
        time: '01:10 PM',
        date: '2020-09-28',
        stadium: 'Empower Field',
        category: 'rw',
        live_data_steps: [
            {
                states: {
                    sog: 5,
                    g: 1,
                    a: 2,
                },
                points: 6,
                type: 'on Bench',
                value: 'TOR - Empty Net',
            },
            {
                step: [
                    { p1: 'P1: 19:59', type: 'goal', power: '2x', pts: 4 },
                    { p1: 'P2: 13:45', type: 'asset', power: '', pts: 2 },
                    { p1: 'P3: 00:01', type: 'goal', power: '3x', pts: 8 },
                    { p1: 'OT: 04:58', type: 'goal', power: '3x', pts: 9 },
                ],
                totalPoints: 27,
            }
        ],
        steps: [
            {
                titles: ['gp', 'g', 'a', 'pts', 'fppg'],
                step: [21, 18, 13, 31, 20.0]
            },
            {
                titles: ['gp', 'g', 'a', 'pts', 'sog', 'fppg'],
                step: [
                    {
                        title: 'last game',
                        values: [1, 0, 0, 0, 7, 14.8],
                    },
                    {
                        title: 'last 10 games',
                        values: [10, 8, 9, 17, 39, 18.8],
                    },
                    {
                        title: '2020-2021',
                        values: [1, 0, 0, 0, 7, 14.8],
                    }
                ]
            },
            {
                step: {
                    ad: AdImg
                }
            }
        ],
    },
    {
        id: 5,
        title: 'Sebastian Aho',
        avgVal: 4,
        teamA: 'Toronto Mapple Leafs 10',
        teamB: 'Boston Bruins 2',
        time: '01:10 PM',
        date: '2020-09-28',
        stadium: 'Empower Field',
        category: 'd1',
        live_data_steps: [
            {
                states: {
                    sog: 5,
                    g: 1,
                    a: 2,
                },
                points: 6,
                type: 'on Bench',
                value: 'TOR - Empty Net',
            },
            {
                step: [
                    { p1: 'P1: 19:59', type: 'goal', power: '2x', pts: 4 },
                    { p1: 'P2: 13:45', type: 'asset', power: '', pts: 2 },
                    { p1: 'P3: 00:01', type: 'goal', power: '3x', pts: 8 },
                    { p1: 'OT: 04:58', type: 'goal', power: '3x', pts: 9 },
                    { p1: 'OT: 04:59', type: 'goal', power: '3x', pts: 9 },
                ],
                totalPoints: 27,
            }
        ],
        steps: [
            {
                titles: ['gp', 'g', 'a', 'pts', 'fppg'],
                step: [21, 18, 13, 31, 20.0]
            },
            {
                titles: ['gp', 'g', 'a', 'pts', 'sog', 'fppg'],
                step: [
                    {
                        title: 'last game',
                        values: [1, 0, 0, 0, 7, 14.8],
                    },
                    {
                        title: 'last 10 games',
                        values: [10, 8, 9, 17, 39, 18.8],
                    },
                    {
                        title: '2020-2021',
                        values: [1, 0, 0, 0, 7, 14.8],
                    }
                ]
            },
            {
                step: {
                    ad: AdImg
                }
            }
        ],
    },
    {
        id: 6,
        title: 'Sebastian Aho',
        avgVal: 4,
        teamA: 'Toronto Mapple Leafs 10',
        teamB: 'Boston Bruins 2',
        time: '01:10 PM',
        date: '2020-09-28',
        stadium: 'Empower Field',
        category: 'd2',
        live_data_steps: [
            {
                states: {
                    sog: 5,
                    g: 1,
                    a: 2,
                },
                points: 6,
                type: 'on Bench',
                value: 'TOR - Empty Net',
            },
            {
                step: [
                    { p1: 'P1: 19:59', type: 'goal', power: '2x', pts: 4 },
                    { p1: 'P2: 13:45', type: 'asset', power: '', pts: 2 },
                    { p1: 'P3: 00:01', type: 'goal', power: '3x', pts: 8 },
                    { p1: 'OT: 04:58', type: 'goal', power: '3x', pts: 9 },
                ],
                totalPoints: 27,
            }
        ],
        steps: [
            {
                titles: ['gp', 'g', 'a', 'pts', 'fppg'],
                step: [21, 18, 13, 31, 20.0]
            },
            {
                titles: ['gp', 'g', 'a', 'pts', 'sog', 'fppg'],
                step: [
                    {
                        title: 'last game',
                        values: [1, 0, 0, 0, 7, 14.8],
                    },
                    {
                        title: 'last 10 games',
                        values: [10, 8, 9, 17, 39, 18.8],
                    },
                    {
                        title: '2020-2021',
                        values: [1, 0, 0, 0, 7, 14.8],
                    }
                ]
            },
            {
                step: {
                    ad: AdImg
                }
            }
        ],
    },
    {
        id: 7,
        title: 'Sebastian Aho',
        avgVal: 4,
        teamA: 'Toronto Mapple Leafs 10',
        teamB: 'Boston Bruins 2',
        time: '01:10 PM',
        date: '2020-09-28',
        stadium: 'Empower Field',
        category: 'g',
        live_data_steps: [
            {
                states: {
                    sog: 5,
                    g: 1,
                    a: 2,
                },
                points: 6,
                type: 'on Bench',
                value: 'TOR - Empty Net',
            },
            {
                step: [
                    { p1: 'P1: 19:59', type: 'goal', power: '2x', pts: 4 },
                    { p1: 'P2: 13:45', type: 'asset', power: '', pts: 2 },
                    { p1: 'P3: 00:01', type: 'goal', power: '3x', pts: 8 },
                    { p1: 'OT: 04:58', type: 'goal', power: '3x', pts: 9 },
                ],
                totalPoints: 27,
            }
        ],
        steps: [
            {
                titles: ['gp', 'g', 'a', 'pts', 'fppg'],
                step: [21, 18, 13, 31, 20.0]
            },
            {
                titles: ['gp', 'g', 'a', 'pts', 'sog', 'fppg'],
                step: [
                    {
                        title: 'last game',
                        values: [1, 0, 0, 0, 7, 14.8],
                    },
                    {
                        title: 'last 10 games',
                        values: [10, 8, 9, 17, 39, 18.8],
                    },
                    {
                        title: '2020-2021',
                        values: [1, 0, 0, 0, 7, 14.8],
                    }
                ]
            },
            {
                step: {
                    ad: AdImg
                }
            }
        ],
    },
    {
        id: 8,
        title: 'Sebastian Aho',
        avgVal: 4,
        teamA: 'Toronto Mapple Leafs 10',
        teamB: 'Boston Bruins 2',
        time: '01:10 PM',
        date: '2020-09-28',
        stadium: 'Empower Field',
        category: 'team d',
        live_data_steps: [
            {
                states: {
                    sog: 5,
                    g: 1,
                    a: 2,
                },
                points: 6,
                type: 'on Bench',
                value: 'TOR - Empty Net',
            },
            {
                step: [
                    { p1: 'P1: 19:59', type: 'goal', power: '2x', pts: 4 },
                    { p1: 'P2: 13:45', type: 'asset', power: '', pts: 2 },
                    { p1: 'P3: 00:01', type: 'goal', power: '3x', pts: 8 },
                    { p1: 'OT: 04:58', type: 'goal', power: '3x', pts: 9 },
                ],
                totalPoints: 27,
            }
        ],
        steps: [
            {
                titles: ['gp', 'g', 'a', 'pts', 'fppg'],
                step: [21, 18, 13, 31, 20.0]
            },
            {
                titles: ['gp', 'g', 'a', 'pts', 'sog', 'fppg'],
                step: [
                    {
                        title: 'last game',
                        values: [1, 0, 0, 0, 7, 14.8],
                    },
                    {
                        title: 'last 10 games',
                        values: [10, 8, 9, 17, 39, 18.8],
                    },
                    {
                        title: '2020-2021',
                        values: [1, 0, 0, 0, 7, 14.8],
                    }
                ]
            },
            {
                step: {
                    ad: AdImg
                }
            }
        ],
    }
]