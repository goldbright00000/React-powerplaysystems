import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './SponserContestPage.scss';
import powerplayicon from '../../assets/powerplay-icon.png'

const SponserContestPage = props => (
    <div className='__SponserContestPage'>
        <div className='__viewport __ai __viewport-1'>
            <Header btnBorderStyle={true} />
            <div className='__center __mt-a'>
                <div className='__viewport-title __primary __inline-block'>Our Games Defy Reality<sup>TM</sup></div>
                <div className='__h6 __mt-3 __m-a __viewport-subtitle'>
                    <div className='__mb-2'>Not only do our games defy reality, but they also build powerful customer engagement opportunities for your brand.</div>
                    <div>Whether you are a for-profit business or a not-for-profit charity or foundation, our games will meet your brand or fundraising goals.</div>
                </div>
                <Link to='/' className='__btn __h5 __mb-4 __mt-4 __inline-block'>partner with us</Link>
            </div>
        </div>
        <div className='__right __pt-1 __pb-1 __container __italic'>*International Patent Pending</div>
        <div className='__background-2 __background  __dark-white-color'>
            <div className='__container-2 __mt-3'>
                <div className='__h2 __primary-color __center'>We offer a no cost, no risk solution <br /> for all our promotional contests. </div>
                <div className='__main'>
                    <div className='__h6 __mt-2'>
                        We are disrupting the ‘Pick and Wait’ Fantasy format with our patent <br />
                        pending live sports platform
                    </div>
                    <ul className='__unordered-list __mediam __mt-2 __mb-2'>
                        <li>No longer will you shed tears if your QB is injured on the 1st drive of the game…  <span className='__primary-color'>swap him out in real time!</span></li>
                        <li>Not only can you swap your players in real-time, but you can also boost your points live during the game using our <span className='__primary-color'>Point Boosting Powers.</span></li>
                        <li>Try one our live-play Parlay games like Chase the Ace to win <img alt='' src={powerplayicon} className='__relative __list-power-play-icon' /> Powers.</li>
                        <li>JOIN NOW! And experience the future of Fantasy Sports. Already a member? Log in.</li>
                    </ul>
                    <div className='__primary-color __h6 __mb-2'>Imagine actually being in control of your team… <br />Now that is Powerful!</div>
                    <div className='__uppercase __h5 '>
                        <Link to='/' className='__explore-games __chevron-right'>Explore Games</Link>
                    </div>
                </div>
                <div className='__center __h5 __mt-3 __mb-3'>
                    <Link to='/' className='__btn'>Power Up</Link>
                </div>
            </div>
        </div>
        <div className='__background __background-3'>
            <div className='__container-2'>
                <div className='__h3 __center __mb-2 __mt-2 __uppercase'>Live-Play Promotional Contests</div>
                <div className='__ml-a __main'>
                    <ul className='__unordered-list __mediam __mt-3 __mb-3 __ml-a'>
                        <li>Our live-play sponsored contests are not only exciting, but also <span className='__primary-color'>free to play.</span></li>
                        <li>Enter for your chance to <span className='__primary-color'>win great prizes</span> from our sponsors.</li>
                        <li>We have a variety of games to choose from including fantasy sports and PowerBingo.</li>
                        <li>Join NOW! and experience live-play contests for yourself</li>
                    </ul>
                    <div className='__uppercase __h5 __primary-color'>
                        <Link to='/' className='__explore-games __chevron-right'>Explore Games</Link>
                    </div>
                </div>
                <div className='__center __h5 __mt-4 __mb-3'>
                    <Link to='/' className='__btn'>Power Up</Link>
                </div>
            </div>
        </div>
        <div className='__background-4 __light-black-color __background'>
            <div className='__socket-ball-boy-image'>
                <div className='__container-2'>
                    <div className='__h2 __center __mt-1'>It’s easy to play and win</div>
                    <div className="__center __mb-4">Our goal is to make Fantasy Sports Games super easy and exciting to play.</div>
                    <div className='__mb-4 __instructions-step'>
                        <div>
                            <div className='__h4 __primary-color __mt-1 __bold'>Sign Up</div>
                            <div>It's easy & free to join. Once you're on board, we have free contests that you can play to win prizes and learn the ropes.</div>
                        </div>
                        <div>
                            <div className='__h4 __primary-color __mt-1 __bold'>Enter a Contest</div>
                            <div>You won’t be overwhelmed with hundreds of contests. We create and post contests and try to keep the active games to 10 per sport so you won’t be overwhelmed by too many options.</div>
                        </div>
                        <div>
                            <div className='__h4 __primary-color __mt-1 __bold'>Pick you team</div>
                            <div>We have traditional salary-based games but also free-for-all contests, pick the team you want without restrictions. We did say it would be easy!</div>
                        </div>
                        <div>
                            <div className='__h4 __primary-color __mt-1 __bold'>Play & Win</div>
                            <div>Tune in during the live game on your PC, tablet, laptop or mobile device!</div>
                        </div>
                        <br />
                        <Link to='/' className="__btn __h5 __mt-4">Power up!</Link>
                    </div>
                </div>
            </div>
        </div>
        <div className='__background __background-5'>
            <div className='__container-2'>
                <div className=' __mt-4 __background-5-main'>
                    <div className='__mb-3'>
                        <div className='__h2 __mb-1'>
                            <div className='__bold __primary-color'>PowerPlay Games</div>
                            <div>is crypto friendly!</div>
                        </div>
                        <div className='__dark-white __mediam'>
                            We accept all forms of crypto currency to enter games.
                            Just send us your tokens and you’ll receive Power Tokens (PWRS) in your PowerPlay Account which can be used to enter contests.
                        </div>
                    </div>
                    <div className='__mb-3'>
                        <div className='__italic __h4 __primary-color __bold __mb-1'>What is the Power Token?</div>
                        <div className='__dark-white __mediam'>
                            The Power token (PWRS) is a registered crypt-currency coin on the Ethereum Network. We will be holding some contests where you can win Powers.
                            <br />We think that is super!
                        </div>
                    </div>
                </div>
                <div className='__h5 __italic __bold'>We are giving Power to the People! Sign-up today and  <span className='__primary-color'> get 100 tokens!</span></div>
                <div className='__center __mb-4 __mt-4'>
                    <Link to='/' className='__btn __style-2 __h5'>WIN Powers</Link>
                </div>
            </div>
        </div>
        <Footer />
    </div>
)

export default SponserContestPage;