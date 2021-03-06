import React, {useState, useCallback} from 'react';

import classes from './index.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Header3 from '../../components/Header3';
import BaseballImage from '../../assets/baseball.jpg';
import SearchIcon from '../../icons/SearchIcon';
import Tick2 from '../../icons/Tick2';
import ContestRulesIcon from '../../icons/ContestRules';
import RightArrow from '../../assets/right-arrow.png';
import MLBFooterImage from '../../assets/MLB.png';
import PowerPlayIcon from '../../assets/token.png';
import Card from '../../components/PowerpickCard';
import Sidebar from '../../components/Sidebar';
import CashPowerBalance from '../../components/CashPowerBalance';
import Circle from '../../icons/CircleEmpty';
import SportsSidebarContent from '../../components/SportsSidebarContent';
import SelectionCard from '../../components/SportsSelectionCard';
import EmployeeIcon from '../../icons/Employee';

const dummyData = [
    {
        id: 1,
        title: 'Chris Carpenter',
        avgVal: 4,
        teamA: 'Arizona Diamondbacks',
        teamB: 'Baltimore Orioles',
        time: '01:10 PM',
        date: '2020-09-28',
        stadium: 'Empower Field',
    },
    {
        id: 2,
        title: 'Chris Carpenter',
        avgVal: 4,
        teamA: 'Arizona Diamondbacks',
        teamB: 'Baltimore Orioles',
        time: '01:10 PM',
        date: '2020-09-28',
        stadium: 'Empower Field',
        isStartPower: true,
    },
    {
        id: 3,
        title: 'Chris Carpenter',
        avgVal: 4,
        teamA: 'Arizona Diamondbacks',
        teamB: 'Baltimore Orioles',
        time: '01:10 PM',
        date: '2020-09-28',
        stadium: 'Empower Field',
    },
    {
        id: 4,
        title: 'Chris Carpenter',
        avgVal: 4,
        teamA: 'Arizona Diamondbacks',
        teamB: 'Baltimore Orioles',
        time: '01:10 PM',
        date: '2020-09-28',
        stadium: 'Empower Field',
    },
]

const dummySidebar = [
    {
        title: 'sp',
        value: 'Chris Carpenter',
    },
    {
        title: 'IF',
        value: '',
    },
    {
        title: 'if',
        value: '',
    },
    {
        title: 'of',
        value: '',
    },
    {
        title: 'of',
        value: '',
    },
    {
        title: 'DH',
        value: '',
    },
    {
        title: 'RP',
        value: '',
    },
    {
        title: 'D',
        value: '',
        icon: EmployeeIcon,
    },
]

function MLBPowerdFs() {
    const [showTeamSelection, setTeamSelectionState] = useState(false);
    const [selected, setSelected] = useState(new Map());

    const onSelectDeselect = useCallback((id) => {
        const _selected = new Map(selected);
        _selected.set(id, !selected.get(id));
        
        setSelected(_selected);
    }, [selected]);

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
                                {
                                    dummyData.map((item, index) => <SelectionCard title={item.title} avgVal={item.avgVal} teamA={item.teamA} teamB={item.teamB} time={item.time} date={item.date} stadium={item.stadium} isSelected={!!selected.get(item.id)} key={item.id} onSelectDeselect={onSelectDeselect} id={item.id} isStartPower={item.isStartPower && item.isStartPower} />)
                                }
                            </Card>
                        </div>

                        <div className={classes.container_footer}>
                            <div className={classes.container_footer_header}>
                                <ContestRulesIcon />
                                <div className={classes.container_footer_title}>
                                    <h2>
                                        Contest Rules
                                    </h2>
                                    <span className={classes.separator} />
                                </div>
                            </div>
                            <div className={classes.container_footer_1}>
                                <div className={classes.container_footer_header_1}>
                                    <p><Tick2 size={25} /> No purchase necessary.</p>
                                    <p><Tick2 size={25} /> Open to residents of United States who are over the age of majority.</p>
                                    <p><Tick2 size={25} /> Contest closes at 11:59pm ET - April 22, 2020.</p>
                                </div>
                                <div className={classes.container_footer_body}>
                                    <p><span /> Five (5) prizes to be won. See full rules for complete details of all prizes.</p>
                                    <p><span /> One entry per person.</p>
                                    <p><span /> Odds of winning depend on player knowledge.</p>
                                    <p><span /> Mathematical skill testing question must be correctly answered to win.</p>

                                    <button>See Full Rules <img src={RightArrow} /></button>

                                    <img src={MLBFooterImage} className={classes.container_body_img} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={classes.sidebar_container}>
                        <Sidebar>
                            <CashPowerBalance />
                            <div className={classes.sidebar_header}>
                                <h2>My Selections</h2>
                                <div className={classes.sidebar_header_1}>
                                    <img src={PowerPlayIcon} />
                                    <p>0/3 Star Power Players Selected</p>
                                </div>
                                <div className={classes.sidebar_circles}>
                                    <Circle />
                                    <Circle />
                                    <Circle />
                                </div>
                            </div>
                            <SportsSidebarContent data={dummySidebar} onDelete={() => {console.log('Delete')}} />
                            <button className={classes.sidebar_button}>Submit!</button>
                        </Sidebar>
                    </div>
                </div>

            </div>
        <Footer isBlack={true} />
        </>
    )
}

export default MLBPowerdFs
