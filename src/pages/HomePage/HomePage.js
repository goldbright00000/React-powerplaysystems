import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './HomePage.scss';
import powerplayicon from '../../assets/powerplay-icon.png'

const HomePage = props => (
    <div className='__HomePage'>
        <div className='__viewport __sb __ai __viewport-1'>
            <Header />
            <div className='__center'>
                <div className='__viewport-title __primary'>Our Games Defy Reality<sup>TM</sup></div>
                <div className='__h4 __mt-1'>
                    Experience our ground-breaking live-play games <br /> where you have the Power to control your destiny. *
                </div>
                <Link to='/' className='__btn __style-2 __h5 __mb-4 __mt-4 __inline-block'>Power Up!</Link>
            </div>
        </div>
        <div className='__right __pt-1 __pb-1 __container __italic'>*International Patent Pending</div>
        <div className='__viewport __viewport-2 __flex-center'>
            <div className='__dark-white __style-2 __container'>
                <div className='__h2 __primary-color __center'>PowerdFS</div>
                <div className='__h3 __uppercase __center __mb-1'>Live-Play Fantasy Sports Platform</div>
                <div className='__h6'>
                    We are disrupting the ‘Pick and Wait’ Fantasy format with our patent <br />
                    pending live sports platform
                 </div>
                <ul className='__unordered-list __mediam'>
                    <li>No longer will you shed tears if your QB is injured on the 1st drive of the game…  <span className='__primary-color'>swap him out in real time!</span></li>
                    <li>Not only can you swap your players in real-time, but you can also boost your points live during the game using our <span className='__primary-color'>Point Boosting Powers.</span></li>
                    <li>Try one our live-play Parlay games like Chase the Ace to win <img alt='' src={powerplayicon} className='__relative __list-power-play-icon' /> Powers.</li>
                    <li>JOIN NOW! And experience the future of Fantasy Sports. Already a member? Log in.</li>
                </ul>
                <div className='__primary-color __h6'>Imagine actually being in control of your team… <br />Now that is Powerful!</div>
                <div className='__uppercase __h5 __mt-1'>
                    <Link to='/' className='__explore-games __chevron-right'>Explore Games</Link>
                </div>
                <div className='__center __h5 __mt-1'>
                    <Link to='/' className='__btn'>Power Up</Link>
                </div>
            </div>
        </div>
    </div>
)

export default HomePage;