import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
import logo from '../../assets/logo.png';

const Header = props => (
    <nav className='__Header'>
        <div className='__container __flex __sb __f1'>
            <Link to='/'><img src={logo} alt='' /></Link>
            <ul className='__navlinks __flex'>
                <li><NavLink to='/contest-central'>Contest Central</NavLink></li>
                <li><NavLink to='/sponser-central'>Sponsor a Contest</NavLink></li>
                <li><NavLink to='/login'>Log In</NavLink></li>
                <li><NavLink to='/power-up' className='__btn'>Power up!</NavLink></li>
            </ul>
        </div>
    </nav>
)

export default Header;