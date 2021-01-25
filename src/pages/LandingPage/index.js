import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
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
import Modal from '../../components/Modal';

const LandingPage = props => {
    const [showModal, setModalState] = useState(false)
    const isMobileOrTablet = useMediaQuery({
        query: '(max-width: 540px)'
    })

    let scrollRef = useRef();

    useEffect(() => { 
        // const scrollBody = ReactDOM.findDOMNode(scrollRef.current);
        // scrollBody.addEventListener('scroll', onScroll);

        // return function cleanUp() {
        //     scrollBody.removeEventListener('scroll')
        // }
    }, [])
    
    useEffect(() => { 
        // if (showModal) {
        //     const scrollY = window.scrollY
        //     document.body.style.position = 'fixed';
        //     document.body.style.top = `-${window.scrollY}px`;
        //     console.log(scrollY)
        // } else if(!showModal) {
        //     // const scrollY = document.body.style.top;
        //     document.body.style.position = 'unset'
        //     // window.scrollTo(0, parseInt(scrollY || 0) * -1)
        // }
    }, [showModal])

    const onFormSubmit = (e) => {
        e.preventDefault();

        setModalState(false)
    }

    const onScroll = () => {
        console.log('aa',window.scrollY, scrollRef)
    }


    return (
        <div className={classes.wrapper} onScroll={onScroll} ref={scrollRef}>
            <Header hasMenu={false} />
            <HomePageContentHeader
                buttonTitle="Notify me of launch!"
                footerTitle={<>Sign up to be notified and <span>receive 100 Power Tokens!</span></>}
                redirectTo="/power-up"
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

                <Link to="#" onClick={() => setModalState(true)} className={classes.landing_page_btn}>
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
                                The Power token (PWRS) is a registered crypt-currency coin on the Ethereum Network.  <span>We will be holding some contests where you can win Powers. <br /> It’s like we are giving you super powers!</span>
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

                    <Link to="#" onClick={() => setModalState(true)} className={classes.landing_page_btn}>
                        Notify me of launch!
                    </Link>
                </div>
            </div>
            <Footer isBlack logoOnly={true} />
            <Modal visible={showModal}>
                <div className={classes.modal_body}>
                    <form className={classes.news_alert_form} onSubmit={onFormSubmit}>
                        <label>
                            I want in! Notify me!
                        </label>
                        <div className={classes.news_alert_form_input}>
                            <input type="email" placeholder="Your e-mail" required />
                            <button type="submit">NOTIFY ME</button>
                        </div>
                    </form>

                    <button className={classes.modal_close} onClick={() => setModalState(false)} />
                </div>
            </Modal>
        </div>
    )
}

export default LandingPage;