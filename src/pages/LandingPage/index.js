import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import classes from './index.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HomePageContentHeader from '../../components/HomePageContentHeader';
import PowerPickCard from '../../components/PowerpickCard';
import AmericanFootballTicket from '../../icons/AmericanFootballTicket';
import ShapeIcon from '../../icons/Shape';
import AmericanFootballCup from '../../icons/AmericanFootballCup';
import MegaPhone from '../../icons/MegaPhone';
import powerplayLargeicon from '../../assets/powerPlayIcon2.png'

const LandingPage = props => {
    const isMobileOrTablet = useMediaQuery({
        query: '(max-width: 540px)'
    })
    return (
        <div className={classes.wrapper}>
            <Header hasMenu={false} />
            <HomePageContentHeader
                buttonTitle="Notify me of launch!"
                footerTitle={<>Sign up to be notified and <span>receive 100 Power Tokens!</span></>} redirectTo="/power-up"
                showBtnBg
            />

            <div className={classes.landing_page_body}>
                <h2 className={classes.landing_page_body_title}>
                    Live-Play Promotional Contests
                </h2>
                <div className={classes.landing_page_content}>
                    <PowerPickCard styles={isMobileOrTablet ? { marginTop: '10px', backgroundColor: 'transparent', border: 'none'} : { margin: '20px'}}>
                        <div className={classes.landing_page_cards}>
                            <AmericanFootballTicket size={132} />
                            <p>
                                Our live-play sponsored contests are not only exciting, but also <span>free to play.</span>
                            </p>
                        </div>
                    </PowerPickCard>
                
                    <PowerPickCard styles={isMobileOrTablet ? { marginTop: '10px', backgroundColor: 'transparent', border: 'none'} : { margin: '20px'}}>
                        <div className={classes.landing_page_cards}>
                            <ShapeIcon />
                            <p className={classes.p_60}>
                                We have <span>a wide variety</span> of contests to choose from including sports based promotional contests.
                        </p>
                        </div>
                    </PowerPickCard>
                
                    <PowerPickCard styles={isMobileOrTablet ? { marginTop: '10px', backgroundColor: 'transparent', border: 'none'} : { margin: '20px'}}>
                        <div className={classes.landing_page_cards}>
                            <AmericanFootballCup />
                            <p className={classes.p_40}>
                                Enter for your chance to <span>win great prizes</span> from our sponsors.
                        </p>
                        </div>
                    </PowerPickCard>
                
                    <PowerPickCard styles={isMobileOrTablet ? { marginTop: '10px', backgroundColor: 'transparent', border: 'none'} : { margin: '20px'}}>
                        <div className={classes.landing_page_cards}>
                            <MegaPhone />
                            <p>
                                Register to <span>be notified</span> and be among the first to play when we launch!
                        </p>
                        </div>
                    </PowerPickCard>
                </div>

                <Link to="/power-up" className={classes.landing_page_btn}>
                            Notify me of launch!
                    </Link>

                <div className={classes.landing_page_footer}>
                    <h2 className={classes.landing_page_footer_title}>Earn Power Tokens!</h2>
                    <div className={classes.landing_page_footer_bottom}>
                        <div className={classes.landing_page_footer_left}>
                            <p>
                                By entering our contests, you can earn and win Power Tokens!
                            </p>
                            <h2>
                                What is the Power Token?
                            </h2>
                            <p className={classes.p1}>
                                The Power token (PWRS) is a registered crypt-currency coin on the Ethereum Network. We will be holding some contests where you can win Powers. <br /> It’s like we are giving you super powers!
                            </p>    

                            <h3>
                                We are giving Power to the People! Sign-up today and  <span>get 100 tokens!</span>
                            </h3>
                        </div>
                        {
                            !isMobileOrTablet &&
                                <img src={powerplayLargeicon} alt="power-games" width="397" height="397" className={classes.landing_page_footer_right} />

                        }
                    </div>

                    <Link to="/power-up" className={classes.landing_page_btn}>
                        Notify me of launch!
                    </Link>
                </div>
            </div>
            <Footer isBlack />
        </div>
    )
}

export default LandingPage;