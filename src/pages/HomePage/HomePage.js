import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './HomePage.scss';
import powerplayicon from '../../assets/powerplay-icon.png'
import powerplayLargeicon from '../../assets/powerplay-large-icon.png'

const HomePage = props => (
    <div className='__HomePage'>
        <Header />
        <div className='__viewport __ai __viewport-1'>
            <div className='__center __mt-a __container'>
                <div className='__viewport-title __primary __m-a __inline-block __h4-on-mediam'>Our Games Defy Reality<sup>TM</sup></div>
                <div className='__h4 __mt-1 __viewport-subtitle __ml-a __mr-a __default-size-on-mediam'>
                    Experience our ground-breaking live-play games where you have the Power to control your destiny. *
                </div>
                <Link to='/' className='__btn __style-2 __primary-color __h5 __mb-3 __mt-2 __inline-block'>Power Up!</Link>
                <div className='__ml-a __italic __right __mb-2 __internation-patent-pending'>*International Patent Pending</div>
            </div>
        </div>
        <div className='__background-2 __background __dark-white-color'>
            <div className='__container-2 __mt-3'>
                <div className='__h2 __primary-color __center __bold __h5-on-mediam'>PowerdFS</div>
                <div className='__h3 __uppercase __center __bold __mediam-on-mediam'>Live-Play Fantasy Sports Platform</div>
                <div className='__h6 __mt-2 __center-on-mediam __default-size-on-mediam'>
                    We are disrupting the ‘Pick and Wait’ Fantasy format with our patent <br className='__hide-on-mediam' /> pending live sports platform
                    </div>
                <div className='__main'>
                    <ul className='__unordered-list __mediam __mt-2 __mb-2 __default-size-on-mediam'>
                        <li className='__hide-on-mediam'>No longer will you shed tears if your QB is injured on the 1st drive of the game…  <span className='__primary-color'>swap him out in real time!</span></li>
                        <li><span className='__hide-on-mediam'>Not only can you swap your players in real-time, but you can also</span> oost your points live during the game using our <span className='__primary-color'>Point Boosting Powers.</span></li>
                        <li>Try one our live-play Parlay games like Chase the Ace to win <img alt='' src={powerplayicon} align='center' /> Powers.</li>
                        <li>JOIN NOW! And experience the future of Fantasy Sports. <span className='__block-on-mediam'>Already a member? Log in.</span></li>
                    </ul>
                    <div className='__primary-color __h6 __mb-2 __hide-on-mediam'>Imagine actually being in control of your team… <br />Now that is Powerful!</div>
                    <div className='__uppercase __h5 __center-on-mediam __default-size-on-mediam'>
                        <Link to='/power-center' className='__explore-games __chevron __-right'>Explore Games</Link>
                    </div>
                </div>
                <div className='__center __h5 __mt-2 __mb-3 __power-up-btn'>
                    <Link to='/' className='__btn'>Power Up</Link>
                </div>
            </div>
        </div>
        <div className='__background __to-right __background-3'>
            <div className='__container-2'>
                <div className='__h3 __center __mb-2 __mt-2 __uppercase __h5-on-mediam'>Live-Play Promotional Contests</div>
                <div className='__ml-a __main'>
                    <ul className='__unordered-list __mediam __mt-3 __mb-3 __ml-a'>
                        <li>Our live-play sponsored contests are not only exciting, but also <span className='__primary-color'>free to play.</span></li>
                        <li>Enter <span className='__hide-on-small'>for your chance</span> to <span className='__primary-color'>win great prizes</span> from our sponsors.</li>
                        <li>We have a variety of games to choose from <span className='__hide-on-small'>including fantasy sports and PowerBingo</span>.</li>
                        <li>Join NOW! and experience live-play contests for yourself</li>
                    </ul>
                    <div className='__uppercase __h5 __primary-color __center-on-mediam __default-size-on-mediam'>
                        <Link to='/power-center/contests' className='__explore-games __chevron-right'>Explore Games</Link>
                    </div>
                </div>
                <div className='__center __h5 __mt-3 __mb-3 __power-up-btn'>
                    <Link to='/' className='__btn'>Power Up</Link>
                </div>
            </div>
        </div>
        <div className='__background-4 __light-black-color __background'>
            <div className='__socket-ball-boy-image'>
                <div className='__container-2'>
                    <div className='__h2 __center __mt-1 __h5-on-mediam __title'>It’s easy to play and win</div>
                    <div className="__center __mb-4 __m-0-on-small">Our <span className='__hide-on-small'>goal is to make</span> Fantasy Sports Games super easy and exciting to play.</div>
                    <div className='__mb-4 __instructions-step'>
                        <div>
                            <div className='__h4 __primary-color __mt-1 __bold __h6-on-mediam'>Sign Up</div>
                            <div>It's easy & free to join. <span className='__hide-on-small'>Once you're on board, we have free contests that you can play to win prizes and learn the ropes.</span></div>
                        </div>
                        <div>
                            <div className='__h4 __primary-color __mt-1 __bold __h6-on-mediam'>Enter a Contest</div>
                            <div>
                                <span className='__hide-on-small'>You won’t be overwhelmed with hundreds of contests. We create and post contests and try to keep the active games to 10 per sport so you won’t be overwhelmed by too many options.</span>
                                <span className='__show-on-small'>Choose a game from our active contest list.</span>
                            </div>
                        </div>
                        <div>
                            <div className='__h4 __primary-color __mt-1 __bold __h6-on-mediam'>Pick you team</div>
                            <div><span className='__hide-on-small'>We have traditional salary-based games but also free-for-all contests,</span> pick the team you want without restrictions. We did say it would be easy!</div>
                        </div>
                        <div>
                            <div className='__h4 __primary-color __mt-1 __bold __h6-on-mediam'>Play & Win</div>
                            <div>Tune in during the live game on your PC, <span className='__hide-on-small'>tablet, laptop or mobile device!</span></div>
                        </div>
                        <br className='__hide-on-small' />
                        <span className='__center-on-mediam __mt-4 __power-up-btn __block'>
                            <Link to='/' className="__btn __h5 __power-up">Power up!</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div className='__background __background-5 __relative'>
            <div className='__container-2'>
                <div className=' __mt-5 __background-5-main'>
                    <div className='__h2 __mb-1 __h5-on-mediam __center-on-mediam'>
                        <div className='__bold __primary-color __mb-s __m-0-on-mediam'>PowerPlay Games</div>
                        <div>is crypto friendly!</div>
                    </div>
                    <div className='__mb-3 __flex'>
                        <div className='__dark-white __mediam __default-size-on-mediam'>
                            We accept all forms of crypto currency to enter games.
                            Just send us your tokens and you’ll receive Power Tokens (PWRS) in your PowerPlay Account which can be used to enter contests.
                        </div>
                        <img src={powerplayLargeicon} alt='' className='__powerplay-large-icon __absolute' />
                    </div>
                    <div className='__mb-3'>
                        <div className='__italic __h4 __primary-color __bold __mb-1 __h6-on-mediam'>What is the Power Token?</div>
                        <div className='__dark-white __mediam __default-size-on-mediam'>
                            The Power token (PWRS) is a registered crypt-currency coin on the Ethereum Network. <span className='__hide-on-small'> We will be holding some contests where you can win Powers. <br />We think that is super!</span>
                        </div>
                    </div>
                </div>
                <div className='__h5 __italic __bold __default-size-on-mediam __center-on-mediam'>We are giving Power to the People! Sign-up today and  <span className='__primary-color'> get 100 tokens!</span></div>
                <div className='__center __mb-4 __mt-4'>
                    <Link to='/power-center/contests' className='__btn __style-2 __h5 __primary-color'>WIN Powers</Link>
                </div>
            </div>
        </div>
        <Footer />
    </div>
)

export default HomePage;