import React, {useState} from 'react';

import classes from './index.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Header3 from '../../components/Header3';
import BaseballImage from '../../assets/baseball.jpg';
import SearchIcon from '../../icons/SearchIcon';
import Tick2 from '../../icons/Tick2';
import ClockIcon from '../../icons/Clock2';
import CalenderIcon from '../../icons/Calendar2';
import StadiumIcon from '../../icons/Stadium2';
import Card from '../../components/PowerpickCard';

function Baseball() {
    const [showTeamSelection, setTeamSelectionState] = useState(false);

    const SelectionCard = ({title, avgVal, teamA, teamB, time, date, stadium, isSelected}) => (
        <div className={classes.container_body_card}>
            <div className={classes.container_body_card_header}>
                <h2 className={classes.active}>{title}</h2>
                {
                    !isSelected ?
                    <button> + Select</button>
                    :
                    <>
                    </>
                }
            </div>

            <p>Avg. Pts/Game <span>{avgVal}</span></p>

            <p><span>{teamA}</span> VS {teamB}</p>

            <span className={classes.separator} />
            <p> <ClockIcon /> {time}  <CalenderIcon /> {date} <StadiumIcon /> {stadium}</p>
        </div>
    )

    return (
        <>
        <Header />
            <div className={classes.wrapper}>
               <Header3 titleMain1="MLB 2021" titleMain2="PowerdFS" subHeader1="Introducing Live-Play Fantasy Baseball" subHeader2="Play for your chance to win $1000!" contestBtnTitle="Contest Rules" prizeBtnTitle="Prize Grid" bgImageUri={BaseballImage} />

                <div className={classes.container}>
                    <div className={classes.container_left}>
                        <h2>Select your team</h2>
                        <div className={classes.container_left_header_2}>
                            <p>7 starters + 1 team D</p> <span className={classes.line} />
                        </div>

                        <div className={classes.container_top}>
                            <p>Select Position</p>
                            <div className={classes.container_top_1}>
                                <div className={classes.container_top_2}>
                                    <button className={classes.active}>SP <span>2 Left</span> <div className={classes.tick}><Tick2 /></div> </button>
                                    <button>IF <span>2 Left</span> <div className={classes.tick}><Tick2 /></div> </button>
                                    <button>OF <span>2 Left</span> <div className={classes.tick}><Tick2 /></div> </button>
                                    <button>DH <span>2 Left</span> <div className={classes.tick}><Tick2 /></div> </button>
                                    <button>RP <span>2 Left</span> <div className={classes.tick}><Tick2 /></div> </button>
                                    <button>D <span>2 Left</span> <div className={classes.tick}><Tick2 /></div> </button>
                                </div>

                                <form className={classes.search_form}>
                                    <span>
                                        <SearchIcon />
                                        <input placeholder="Search by Player name ..." name="playerSearch" required />
                                    </span>

                                    <div className={classes.search_dropdown} onClick={() => setTeamSelectionState(!showTeamSelection)}>
                                        All Team <span className={`${classes.arrow} ${showTeamSelection ? classes.up : classes.down}`} />
                                        {
                                            showTeamSelection &&
                                            <div className={classes.search_dropdown_menu} onMouseLeave={() => setTeamSelectionState(false)}>
                                                <span>Team A</span>
                                                <span className={classes.active}>Team A</span>
                                                <span>Team A</span>
                                                <span>Team A</span>
                                            </div>
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    
                        <div className={classes.container_body}>
                            <Card>
                                <SelectionCard title="Chris Carpenter" avgVal={4} teamA="Arizona Diamondbacks" teamB="Baltimore Orioles" time="01:10 PM" date="2020-09-28" stadium="Empower Field" isSelected={false} />
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        <Footer isBlack={true} />
        </>
    )
}

export default Baseball
