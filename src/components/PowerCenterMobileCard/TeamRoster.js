import React from 'react';
import classes from './teamRoster.module.scss';

const data1 = [
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
];

const data2 = [
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
];

const TeamRoster = (props) => {

    const {
        title = '',
        game_set_start = '',
        start_time = '',
    } = props || {};
    return (
        <div className={classes.__team_roster}>
            <div className={classes.__team_roster_date_time}>
                {game_set_start} | {start_time} ET
            </div>
            <div className={classes.__my_game_center_card_powerdfs}>
                <p className={`text-left`} >
                    <span className={classes.__my_game_center_card_powerdfs_title_first} style={{ fontSize: '18px', color: 'white' }}>
                        {title}
                    </span>
                    <span className={classes.__my_game_center_card_powerdfs_title} style={{ fontSize: '18px' }}> PowerdFS </span>
                    <span className={`${classes.__my_game_center_card_powerdfs_subtitle}`} style={{ fontSize: '14px', opacity:0.6 }}>
                        Team Roaster
                    </span>
                </p>
            </div>
            <div className={classes.__team_roster_heading}>The 8 roster positions:</div>

            <div className={classes.__team_roster_data_container}>
                <div className={classes.__team_roster_data_content}>
                    {
                        data1.map((item, index) => {
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
                </div>
                <div className={classes.__team_roster_data_content}>
                    {
                        data2.map((item, index) => {
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
                </div>
            </div>
        </div>
    );
};

export default TeamRoster;