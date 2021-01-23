import { Link } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './LandingPage.scss';
import HomePageContentHeader from '../../components/HomePageContentHeader';
import PowerPickCard from '../../components/PowerpickCard';
import AmericanFootballTicket from '../../icons/AmericanFootballTicket';
import ShapeIcon from '../../icons/Shape';
import Trophy from '../../icons/Trophy';
import AmericanFootballCup from '../../icons/AmericanFootballCup';
import MegaPhone from '../../icons/MegaPhone';
import powerplayLargeicon from '../../assets/powerPlayIcon2.png'

const LandingPage = props => (
    <div className={'__HomePage'}>
        <Header hasMenu={false} />
        <HomePageContentHeader
            buttonTitle="Notify me of launch!"
            footerTitle="Sign up to be notified and receive 100 Power Tokens!" redirectTo="/power-up"
        />

        <div className='__landing-page-content-bgImg __landing-page-content'>
            <h2>
                Live-Play Promotional Contests
            </h2>
            <div className="__landing-page-content-body">
                <PowerPickCard styles={{margin: '20px'}}>
                    <div className="__landing-page-cards">
                        <AmericanFootballTicket size={132} />
                        <p>
                            Our live-play sponsored contests are not only exciting, but also <span>free to play.</span>
                        </p>
                    </div>
                </PowerPickCard>
                
                <PowerPickCard  styles={{margin: '20px'}}>
                    <div className="__landing-page-cards">
                        <ShapeIcon />
                        <p>
                            Our live-play sponsored contests are not only exciting, but also <span>free to play.</span>
                        </p>
                    </div>
                </PowerPickCard>
                
                <PowerPickCard styles={{margin: '20px'}}>
                    <div className="__landing-page-cards">
                        <AmericanFootballCup />
                        <p>
                            Our live-play sponsored contests are not only exciting, but also <span>free to play.</span>
                        </p>
                    </div>
                </PowerPickCard>
                
                <PowerPickCard styles={{ margin: '20px' }}>
                    <div className="__landing-page-cards">
                    <MegaPhone />
                        <p>
                            Our live-play sponsored contests are not only exciting, but also <span>free to play.</span>
                        </p>
                    </div>
                </PowerPickCard>
            </div>

            <div className="__landing-page-footer">
                <div className="__landing-page-footer-top">
                    <Link to="/power-up" className={`__btn __style-2 __primary-color __h5 __mb-3 __mt-2 __inline-block __btn-bg`}>
                        Notify me of launch!            
                    </Link>
                </div>

                <h2>Earn Power Tokens!</h2>
                <div className="__landing-page-footer-bottom">
                    <div className="__landing-page-footer-left">
                        <p>
                            By entering our contests, you can earn and win Power Tokens!
                        </p>
                        
                        <h2>
                            What is the Power Token?
                        </h2>
                        <p className={'__p2'}>
                         The Power token (PWRS) is a registered crypt-currency coin on the Ethereum Network. We will be holding some contests where you can win Powers. <br /> It’s like we are giving you super powers!
                        </p>

                        <h3>
                        We are giving Power to the People! Sign-up today and  <span>get 100 tokens!</span>
                        </h3>
                    </div>

                    <div className="__landing-page-footer-right">
                        <img src={powerplayLargeicon} alt="power-games" width="397" height="397" />
                    </div>
                </div>

                <div className="__landing-page-footer-top">
                    <Link to="/power-up" className={`__btn __style-2 __primary-color __h5 __mt-2 __inline-block __btn-bg`}>
                        Notify me of launch!            
                    </Link>
                </div>
            </div>
        </div>
        <Footer isBlack  />
    </div>
)

export default LandingPage;