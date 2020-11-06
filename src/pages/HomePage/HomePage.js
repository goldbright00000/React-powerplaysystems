import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './HomePage.scss';

const HomePage = props => (
    <div className='__HomePage'>
        <div className='__viewport __sb __ai '>
            <Header />
            <div className='__center'>
                <h1 className='__viewport-title __primary'>Our Games Defy Reality<sup>TM</sup></h1>
                <div className='__h3'>
                    Experience our ground-breaking live-play games <br /> where you have the Power to control your destiny. *
                </div>
                <Link to='/' className='__btn __style-2 __h4 __mb-4 __mt-4 __inline-block'>Power Up!</Link>
            </div>
        </div>
    </div>
)

export default HomePage;