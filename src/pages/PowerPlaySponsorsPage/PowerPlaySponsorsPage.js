import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './PowerPlaySponsorsPage.scss';

const PowerPlaySponsorsPage = props => (
    <div className='__PowerPlaySponsorsPage __light-bold'>
        <div className='__viewport __ai __viewport-1'>
            <Header btnBorderStyle={true} />
            <div className='__center __mt-a'>
                <div className='__viewport-title __primary'>Our Games Defy Reality<sup>TM</sup></div>
                <div className='__mediam __mt-3 __m-a __viewport-subtitle'>
                    <div className='__mb-1'>Not only do our games defy reality, but they also build powerful customer engagement opportunities for your brand.</div>
                    <div>Whether you are a for-profit business or a not-for-profit charity or foundation, our games will meet your brand or fundraising goals.</div>
                </div>
                <div className='__italic __primary-color __h5 __mt-2 __mb-2'>Are you ready to defy reality?</div>
                <Link to='/power-play-sponsors//sponsor-a-contest' className='__btn __PowerPlaySponsorsPage-btn __h5 __mb-4 __inline-block'>Let's go!</Link>
            </div>
        </div>
        <div className='__background-2 __background  __dark-white-color'>
            <div className='__container-2 __mt-4'>
                <div className='__h3 __primary-color __center'>We offer a no cost, no risk solution <br /> for all our promotional contests. </div>
                <div className='__main __ml-a __mediam __dark-white-color'>
                    <div className='__mt-3 __mb-4'>
                        <div>With traditional promotional contests there is risk and uncertainty…</div>
                        <div className='__mt-2'>- Will the contest meet your brands goals?</div>
                        <div>- Will you raise enough funds to cover set-up expenses?</div>
                    </div>
                    <div>
                        <div>Sponsor a contest with us and we will remove the risk and uncertainty.</div>
                        <div className='__mt-2 __mb-2'>You choose the game type, provide prizes, and your contest can be launched in a matter of days.</div>
                        <div>We can also offer insured prizes <span className='__primary-color'>up to $100,000 USD</span> for some contests.</div>
                    </div>
                </div>
                <div className='__h5 __italic __ready-to-play-game __m-a __mt-3 __primary-color'>Are you ready to Power your brand with no-cost, no-risk promotional contest?</div>
                <div className='__center __h5 __mt-2 __mb-3'>
                    <Link to='/power-play-sponsors//sponsor-a-contest' className='__btn __PowerPlaySponsorsPage-btn'>Let's go</Link>
                </div>
            </div>
        </div>
        <div className='__background __background-3 __to-left'>
            <div className='__container-2 __mt-4'>
                <div className="__m-a __center">
                    <div className='__h3 __primary-color __mb-s'>Power-up Your Revenue</div>
                    <div className=''>Our promotional contests will result in amplified brand awareness, <br /> but in addition we provide revenue generating opportunities:</div>
                </div>
                <div className='__main __custom-bullets-wrapper __mt-1'>
                    <div>
                        <div>
                            <div className='__h4 __primary-color __mt-1'>Ad revenue</div>
                            <div>Google ads can be added to your game to generate revenue.</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className="__h4 __primary-color __mt-1">Powers revenue</div>
                            <div>Powers are live-game boosters that can be purchased by players.</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className='__h4 __primary-color __mt-1'>Subscription sign-ups</div>
                            <div>If you sell a monthly subscription, we can guide players to sign-up during game play.</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className='__h4 __primary-color __mt-1'>Pay-to-Play Revenue</div>
                            <div>You can even sponsor one of our pay-to-play games and the rake revenue is shared with you.</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className='__h4 __primary-color __mt-1'>Donation revenue</div>
                            <div>For charities, we push people to donate fund during the entry process and during live game-play.</div>
                        </div>
                    </div>
                </div>
                <div className='__center __h5 __italic __mt-2 __primary-color'>Are you ready to Power Up your brand?</div>
                <div className='__center __h5 __mt-2 __mb-3'>
                    <Link to='/power-play-sponsors//sponsor-a-contest' className='__btn __PowerPlaySponsorsPage-btn'>Let's go</Link>
                </div>
            </div>
        </div>
        <div className='__background __background-4'>
            <div className='__container-2 __mt-4'>
                <div className='__h4 __center __primary-color'>It's easy to sponsor a contest</div>
                <div className='__main __mt-1 __ml-a'>
                    <div>Our goal is to make launching a promotional contest super easy and rewarding for out clients</div>
                    <div className='__custom-bullets-wrapper __mt-1 __mb-4'>
                        <div>
                            <div>
                                <div className='__h4 __primary-color __mt-1'>Start by Reaching Out</div>
                                <div>Contact us to discuss your goals and review potential game types that tie into your brand</div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className='__h4 __primary-color __mt-1'>Preliminary Design</div>
                                <div>We will provide you with a free preliminary game design for your review and approval.</div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className='__h4 __primary-color __mt-1'>Launch Marketing</div>
                                <div>Launch the marketing campaign to drive people to your contest.</div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className='__h4 __primary-color __mt-1'>Contest Go-Live</div>
                                <div>Check results on our analytics page to see how your game is performing in terms of players, revenue, brand engagement, and much more.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='__h5 __center __primary-color __italic'>Are you ready to experience the power of our promotional contests?</div>
            </div>
            <div className='__center __h5 __mt-2 __mb-3'>
                <Link to='/power-play-sponsors//sponsor-a-contest' className='__btn __PowerPlaySponsorsPage-btn'>Let's go</Link>
            </div>
        </div>

        <Footer />
    </div>
)

export default PowerPlaySponsorsPage;