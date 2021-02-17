import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import './Header.scss';
import logo from '../../assets/logo.png';
import { resetAuth } from '../../actions/authActions';
import { getLocalStorage, removeLocalStorage } from '../../utility/shared';
import { CONSTANTS } from '../../utility/constants';

const Header = props => {
    const { isStick = false, btnBorderStyle = false, hasMenu = true } = props || {}
    
    const { user: { token = '' } = {} } = useSelector((state) => state?.auth);
    const dispatch = useDispatch();

    const onLogout = () => {
        removeLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER);
        return dispatch(resetAuth())
    }
    
    return (
        <nav className='__Header' style={{ position: isStick ? 'sticky' : 'fixed' }}>
            <div className='__container __flex __sb __f1 __light-bold'>
                <Link to='/' className='__brand-logo'><img src={logo} alt='' /></Link>
                {
                    hasMenu ?
                    <>
                        <button className='__menu-icon __hide-only-on-large __pointer'>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <ul className='__navlinks __flex'>
                            <li><NavLink to='/power-center'>Power Center</NavLink></li>
                                <li><NavLink to='/power-picks'>Powerpicks</NavLink></li>
                                {
                                    token || getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER) ? 
                                    <>
                                        <li><NavLink to='/my-game-center'>My Game Center</NavLink></li> 
                                        <li><NavLink to='/my-account'>My Account</NavLink></li> 
                                        <li><NavLink to='#' onClick={onLogout}>Logout</NavLink></li> 
                                    </>
                                    :
                                    <>
                                        <li><NavLink to='/power-play-sponsors'>Sponsor a Contest</NavLink></li>
                                        <li><NavLink to='/login'>Log In</NavLink></li>
                                        <li><NavLink to='/power-up' className={`__btn __header-btn ${btnBorderStyle ? '__style-2 __primary-color' : ''}`}>Power up!</NavLink></li>
                                    </>
                                }
                        </ul>
                        </>
                        :
                        <div className="__landing-page_title __flex __f1">
                            <strong>Coming Spring 2021</strong>
                        </div>
                }
            </div>
        </nav>
    )
}

Header.propTypes = {
    hasMenu: PropTypes.bool,
    isStick: PropTypes.bool,
    btnBorderStyle: PropTypes.bool,
}

export default Header;