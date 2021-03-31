import React from 'react';
import classes from './HomePage.module.scss';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import powerplayicon from '../../assets/powerplay-icon.png'
import powerplayLargeicon from '../../assets/powerplay-large-icon.png'
import HomePageContentHeader from '../../components/HomePageContentHeader';
import CellPhones from '../../assets/home_page_cell_phones.png';
import Tick from '../../assets/home_page_tick.png';
import NFL from '../../assets/home_page_nfl.png';
import PowerPlay from '../../assets/home_page_power_play.png';
import { redirectTo } from '../../utility/shared';

const HomePage = props => {

    const renderFirstSectionTicks = () => {
        return <img src={Tick} width="24" height="24" />;
    };

    const renderFirstSectionText = (title, description) => {
        return (
            <>
                <div className={classes.__home_page_first_section_body_data_title}>
                    {title}
                </div>
                <div className={classes.__home_page_first_section_body_data_description}>
                    {description}
                </div>
            </>
        );
    };

    const renderSecondSectionText = (title, description) => {
        return (
            <>
                <div className={classes.__home_page_second_section_body_data_title}>
                    {title}
                </div>
                <div className={classes.__home_page_second_section_body_data_description}>
                    {description}
                </div>
            </>
        );
    }

    const renderNumSquareBox = (num) => {
        return <p>{num}</p>;
    }

    return (
        <div className={classes.__home_page}>
            <Header />
            <HomePageContentHeader buttonTitle="Power Up!" redirectTo="/power-up" />
            <div className={classes.__home_page_first_section_bg}>
                <div className={classes.__home_page_first_section}>
                    <div className={classes.__home_page_first_section_main_heading}>
                        <span>PowerdFS </span>
                        Live-Play Fantasy Sports Platform
                    </div>
                    <div className={classes.__home_page_first_section_sub_heading_div}>
                        <p className={classes.__home_page_first_section_sub_heading}>
                            We are disrupting the ‘Pick and Wait’ Fantasy format with our patent pending live sports platform
                        </p>
                    </div>
                    <div className={classes.__home_page_first_section_main}>
                        <div className={classes.__home_page_first_section_cell_phones}>
                            <img src={CellPhones} />
                        </div>
                        <div className={classes.__home_page_first_section_body}>
                            <div className={classes.__home_page_first_section_body_data}>
                                <div className={classes.__home_page_first_section_body_data_img}>
                                    {renderFirstSectionTicks()}
                                </div>
                                <div className={classes.__home_page_first_section_body_data_text}>
                                    {renderFirstSectionText('Real-time Player Managemant', 'No longer will you shed tears if your QB is injured on the 1st drive of the game…  swap him out in real time!')}
                                </div>
                            </div>
                            <div className={classes.__home_page_first_section_body_data}>
                                <div className={classes.__home_page_first_section_body_data_img}>
                                    {renderFirstSectionTicks()}
                                </div>
                                <div className={classes.__home_page_first_section_body_data_text}>
                                    {renderFirstSectionText('Power-Up Your Team', 'Use progressive multipliers to power your team up the standings.')}
                                </div>
                            </div>
                            <div className={classes.__home_page_first_section_body_data}>
                                <div className={classes.__home_page_first_section_body_data_img}>
                                    {renderFirstSectionTicks()}
                                </div>
                                <div className={classes.__home_page_first_section_body_data_text}>
                                    {renderFirstSectionText('Live Game Action', 'Make live game decisions for a powerful fantasy experience.')}
                                </div>
                            </div>
                            <div className={classes.__home_page_first_section_body_data}>
                                <div className={classes.__home_page_first_section_body_data_img}>
                                    {renderFirstSectionTicks()}
                                </div>
                                <div className={classes.__home_page_first_section_body_data_text}>
                                    {renderFirstSectionText('Let’s go!', 'JOIN NOW! And experience the future of Fantasy Sports. Already a member? Log in.')}
                                </div>
                            </div>
                            <div className={classes.__home_page_first_section_body_explore_games}>
                                <div 
                                    className={classes.__home_page_first_section_body_explore_games_text}
                                    onClick={() => redirectTo(props, {path: '/power-center'})}>
                                    Explore Games
                                </div>
                                <div className={classes.__home_page_first_section_body_explore_games_arrow_forward}>
                                    {">"}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.__home_page_common_power_up_btn_div}>
                        <button 
                            className={classes.__home_page_common_power_up_btn} 
                            onClick={() => redirectTo(props, {path: '/power-up'})}>
                            Power Up!
                        </button>
                    </div>
                </div>
            </div>
            <div className={classes.__home_page_second_section_bg}>
                <div className={classes.__home_page_second_section}>
                    <div className={classes.__home_page_second_section_main_heading}>
                        It’s easy to play and win
                    </div>   
                    <div className={classes.__home_page_second_section_sub_heading_div}>
                        <p className={classes.__home_page_second_section_sub_heading}>
                            Our goal is to make Fantasy Sports Games super easy and exciting to play.
                        </p>  
                    </div>  
                    <div className={classes.__home_page_second_section_main}>
                        <div className={classes.__home_page_second_section_body}>
                            <div className={classes.__home_page_second_section_body_data}>
                                <div className={classes.__home_page_second_section_body_data_num_sqaure_box}>
                                    {renderNumSquareBox(1)}
                                </div>
                                <div className={classes.__home_page_second_section_body_data_text}>
                                    {renderSecondSectionText('Sign Up', 'Join today and get up to 20 Power Tokens!')}
                                </div>
                            </div>
                            <div className={classes.__home_page_second_section_body_data}>
                                <div className={classes.__home_page_second_section_body_data_num_sqaure_box}>
                                    {renderNumSquareBox(2)}
                                </div>
                                <div className={classes.__home_page_second_section_body_data_text}>
                                    {renderSecondSectionText('Enter a Contest', 'Choose a game from our active contest list.')}
                                </div>
                            </div>
                            <div className={classes.__home_page_second_section_body_data}>
                                <div className={classes.__home_page_second_section_body_data_num_sqaure_box}>
                                    {renderNumSquareBox(3)}
                                </div>
                                <div className={classes.__home_page_second_section_body_data_text}>
                                    {renderSecondSectionText('Pick Your Team', 'Pick the team you want without the salary math..We did say it would be easy!')}
                                </div>
                            </div>
                            <div className={classes.__home_page_second_section_body_data}>
                                <div className={classes.__home_page_second_section_body_data_num_sqaure_box}>
                                    {renderNumSquareBox(4)}
                                </div>
                                <div className={classes.__home_page_second_section_body_data_text}>
                                    {renderSecondSectionText('Play & Win', 'Tune in during the live game!')}
                                </div>
                            </div>
                        </div>
                        <div className={classes.__home_page_second_section_body_img}>
                            <img src={NFL} />
                        </div>
                    </div> 
                    <div className={classes.__home_page_common_power_up_btn_div}>
                        <button 
                            className={classes.__home_page_common_power_up_btn} 
                            onClick={() => redirectTo(props, {path: '/power-up'})}>
                            Power Up!
                        </button>
                    </div>          
                </div>
            </div>
            <div className={classes.__home_page_third_section_bg}>
                <div className={classes.__home_page_third_section}>
                    <div className={classes.__home_page_third_section_main_heading_div}>
                        <div className={classes.__home_page_third_section_main_heading}>
                            PowerPlay Games is crypto friendly!
                        </div>   
                    </div>  
                    <div className={classes.__home_page_third_section_main}>
                        <div className={classes.__home_page_third_section_power_play}>
                            <img src={PowerPlay} />
                        </div>
                        <div className={classes.__home_page_third_section_body}>
                            <div className={classes.__home_page_third_section_body_text_common}>
                                We accept Bitcoin and Ethereum as forms of deposit. We will even have some contests where you can win Bitcoin!
                            </div>
                            <div className={classes.__home_page_third_section_body_text_1}>
                                What are Power Tokens?
                            </div>
                            <div className={classes.__home_page_third_section_body_text_common}>
                                You can obtain tokens by 1. Entering contests 2. Win as prizes 3. Special Offers
                            </div>
                            <div className={classes.__home_page_third_section_body_text_2}>
                                We are giving Power to the People! Sign-up today and <span>get 20 tokens!</span>
                            </div>
                            <div className={classes.__home_page_third_section_body_text_common}>
                                Note - Power Tokens have no resale value at this time.
                            </div>
                        </div>
                    </div>  
                    <div className={classes.__home_page_third_section_power_up}>
                        <button 
                            className={classes.__home_page_third_section_power_up_btn}
                            onClick={() => redirectTo(props, {path: '/power-up'})}>
                            Power Up!
                        </button>
                    </div>        
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;