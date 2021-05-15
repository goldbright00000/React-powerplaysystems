import React from 'react';
import classes from './teamRoster.module.scss';

const data1 = [
    {
        heading: 'The 8 roster positions:',
        teamRoster: [
            {
                count: 1,
                title: 'P',
                value: '(Pitcher)'
            },
            {
                count: 1,
                title: 'C',
                value: '(Catcher)'
            },
            {
                count: 1,
                title: 'SS',
                value: '(Shortstop)'
            },
        ]
    }
];

const data2 = [
    {
        heading: '',
        teamRoster: [
            {
                count: 2,
                title: 'xB',
                value: '(1B, 2B or 3B)'
            },
            {
                count: 2,
                title: 'OF',
                value: '(Outfielders)'
            },
            {
                count: 1,
                title: 'Team Defense',
                value: ''
            },
        ]
    }
];

const TeamRoster = (props) => {
    const {title = ''} = props || {};
    return (
        <div className={classes.__team_roster}>
            <div className={classes.__team_roster_date_time}>
                Oct 24, 2020  |  8:00PM ET
            </div>
            <div className={classes.__team_roster_powerdfs}>
                <div>
                    <p className={classes.__team_roster_powerdfs_title}>
                        <span className={classes.__team_roster_powerdfs_title_first}>{title}</span> PowerdFS
                    </p>
                </div>
                <div className={classes.__team_roster_title}>
                    Team Roster
                </div>
            </div>
            <div className={classes.__team_roster_data_container}>
                <div className={classes.__team_roster_data_content}>
                    {
                        data1.map((d, i) => {
                            return (
                                <>
                                    <div className={classes.__team_roster_heading}>{d.heading}</div>
                                    {
                                        d.teamRoster.map((item, index) => {
                                            return (
                                                <div className={classes.__team_roster_data} key={index}>
                                                    <div className={classes.__team_roster_data_title_div}>
                                                        <p className={classes.__team_roster_data_title}>{item.title}</p>
                                                        <div className={classes.__team_roster_data_count_div}>
                                                            <p className={classes.__team_roster_data_count}>{item.count}</p>
                                                        </div>
                                                    </div>
                                                    <div className={classes.__team_roster_data_value_div}>
                                                        <p className={classes.__team_roster_data_value}>{item.value}</p>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </>
                            );
                        })
                    }
                </div>
                <div className={classes.__team_roster_data_content}>
                    {
                        data2.map((d, i) => {
                            return (
                                <>
                                    <div className={classes.__team_roster_heading}>{d.heading}</div>
                                    {
                                        d.teamRoster.map((item, index) => {
                                            return (
                                                <div className={classes.__team_roster_data} key={index}>
                                                    <div className={classes.__team_roster_data_title_div}>
                                                        <p className={classes.__team_roster_data_title}>{item.title}</p>
                                                        <div className={classes.__team_roster_data_count_div}>
                                                            <p className={classes.__team_roster_data_count}>{item.count}</p>
                                                        </div>
                                                    </div>
                                                    <div className={classes.__team_roster_data_value_div}>
                                                        <p className={classes.__team_roster_data_value}>{item.value}</p>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </>
                            );
                        })
                    }
                </div>
            </div>
            
        </div>
    );
};

export default TeamRoster;