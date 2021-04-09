import React, {useState} from 'react';
import { Link, NavLink, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import "./Header.scss";
import logo from "../../assets/new-logo.png";
import { resetAuth } from "../../actions/authActions";
import { setUserBalance } from "../../actions/userActions";
import { getLocalStorage, removeLocalStorage } from "../../utility/shared";
import { CONSTANTS } from "../../utility/constants";
import MyAccountMenu from "../MyAccountMenu";
import FilledArrow from '../FilledArrow';

const MY_ACCOUNT_MENU_OPTIONS = [
  {
    label: 'Account Info',
    value: '/my-account'
  },
  {
    label: 'Balance',
    value: '/balance'
  },
  {
    label: 'Results',
    value: '/results'
  },
  {
    label: 'History',
    value: '/history'
  },
  {
    label: 'Account Limits',
    value: '/account-limits'
  },
  {
    label: 'How to Play',
    value: '/how-to-play'
  },
  {
    label: 'Deposit',
    value: '/deposit'
  },
  {
    label: 'Contact Us',
    value: '/contact-us'
  },
  {
    label: 'FAQ',
    value: '/faqs'
  },
  {
    label: 'Log Out',
    value: '/log-out'
  },
];

const Header = (props) => {
  const {
    isStick = false,
    btnBorderStyle = false,
    hasMenu = true,
    headerLogo = null,
  } = props || {};

  const { user: { token = "" } = {} } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const [myAccountMenu, setMyAccountMenu] = useState(false);

  const onLogout = () => {
    removeLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER);
    dispatch(setUserBalance({}));
    return dispatch(resetAuth());
  };

  const onMyAccountMenuItemClick = (menuItem) => {
    setMyAccountMenu(false);
    if (menuItem == '/log-out') {
      onLogout();
    } else {
      history.push(menuItem);
    }
  };

  return (
    <nav
      className="__Header"
      style={{ position: isStick ? "sticky" : "fixed" }}
    >
      <div className="__container __flex __sb __f1 __light-bold">
        <Link to="/" className="__brand-logo">
          {headerLogo ? headerLogo : <img src={logo} alt="" />}
        </Link>
        {hasMenu ? (
          <>
            <button className="__menu-icon __hide-only-on-large __pointer">
              <span></span>
              <span></span>
              <span></span>
            </button>
            <ul className="__navlinks __flex">
              <li>
                <NavLink to="/power-center">Power Center</NavLink>
              </li>
              {/* <li><NavLink to='/power-picks'>Powerpicks</NavLink></li> */}
              {token || getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER) ? (
                <>
                  <li>
                    <NavLink to="/my-game-center">My Game Center</NavLink>
                  </li>
                  <li className="__my_account_li">
                    <NavLink 
                      to="#" 
                      onClick={() => setMyAccountMenu(!myAccountMenu)}>
                      My Account
                      {
                        !myAccountMenu
                        ?
                        <FilledArrow down={true} /> 
                        :
                        <FilledArrow up={true} />
                      }
                    </NavLink>
                    {
                      myAccountMenu
                      &&
                      <MyAccountMenu 
                        visible={myAccountMenu}
                        value={window.location.pathname}
                        options={MY_ACCOUNT_MENU_OPTIONS}
                        onClick={(menuItem) => onMyAccountMenuItemClick(menuItem)}
                      />
                    }
                    
                  </li>
                </>
              ) : (
                <>
                  {/* <li><NavLink to='/power-play-sponsors'>Sponsor a Contest</NavLink></li> */}
                  <li>
                    <NavLink to="/login">Log In</NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/power-up"
                      className={`__btn __header-btn ${
                        btnBorderStyle ? "__style-2 __primary-color" : ""
                      }`}
                    >
                      Power up!
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </>
        ) : (
          <div className="__landing-page_title __flex __f1">
            <strong>Coming Spring 2021</strong>
          </div>
        )}
      </div>
    </nav>
  );
};

Header.propTypes = {
  hasMenu: PropTypes.bool,
  isStick: PropTypes.bool,
  btnBorderStyle: PropTypes.bool,
  headerLogo: PropTypes.element,
};

export default Header;
