import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
import logo from '../../assets/logo.png';

const Header = props => {
    return (
        <nav className='__Header' style={{ position: props.isStick ? 'sticky' : 'fixed' }}>
            <div className='__container __flex __sb __f1 __light-bold'>
                <Link to='/' className='__brand-logo'><img src={logo} alt='' /></Link>
                <button className='__menu-icon __hide-only-on-large __pointer'>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul className='__navlinks __flex'>
                    <li><NavLink to='/power-center'>Power Center</NavLink></li>
                    <li><NavLink to='/power-picks'>Powerpicks</NavLink></li>
                    <li><NavLink to='/power-play-sponsors'>Sponsor a Contest</NavLink></li>
                    <li><NavLink to='/login'>Log In</NavLink></li>
                    <li><NavLink to='/power-up' className={`__btn __header-btn ${props.btnBorderStyle ? '__style-2 __primary-color' : ''}`}>Power up!</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;