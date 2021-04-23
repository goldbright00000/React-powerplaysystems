import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import "./Header.scss";
import logo from "../../assets/new-logo.png";
import { resetAuth, updateUser } from "../../actions/authActions";
import { setUserBalance, payNow } from "../../actions/userActions";
import { getLocalStorage, removeLocalStorage } from "../../utility/shared";
import { CONSTANTS } from "../../utility/constants";
import MyAccountMenu from "../MyAccountMenu";
import FilledArrow from "../FilledArrow";
import DepositAmountPopUp from "../DepositAmountPopUp/DepositAmountPopUp";

const MY_ACCOUNT_MENU_OPTIONS = [
  {
    label: "Account Info",
    value: "/my-account",
  },
  {
    label: "How to Play",
    value: "/how-to-play",
  },
  {
    label: "Deposit",
    value: "/deposit",
  },
  {
    label: "Contact Us",
    value: "/contact-us",
  },
  {
    label: "FAQ",
    value: "/faqs",
  },
  {
    label: "Log Out",
    value: "/log-out",
  },
];

const Header = (props) => {
  const {
    isStick = false,
    btnBorderStyle = false,
    hasMenu = true,
    headerLogo = null,
  } = props || {};

  const { user = {} } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const myAccountMenuRef = useRef(null);

  const [myAccountMenu, setMyAccountMenu] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);

  const onLogout = () => {
    removeLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER);
    dispatch(setUserBalance({}));
    return dispatch(resetAuth());
  };

  const onMyAccountMenuItemClick = (menuItem) => {
    setMyAccountMenu(false);
    if (menuItem == "/log-out") {
      onLogout();
    } else if (menuItem == "/deposit") {
      setShowDepositModal(true);
    } else {
      history.push(menuItem);
    }
  };

  const onUpdateUserDetails = (details) => {
    if (
      !details.currency ||
      !details.city ||
      !details.address ||
      !details.zip ||
      !details.phone_number
    ) {
      alert("You can't pay until required fields are filled.");
    } else {
      let obj = { ...user, ...details };
      dispatch(updateUser(obj));

      payNow(obj);
      setShowDepositModal(false);
    }
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (
      myAccountMenuRef.current &&
      !myAccountMenuRef.current.contains(e.target)
    ) {
      setMyAccountMenu(false);
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
              {user?.token ||
              getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER) ? (
                <>
                  <li>
                    <NavLink to="/my-game-center">My Game Center</NavLink>
                  </li>
                  <li className="__my_account_li" ref={myAccountMenuRef}>
                    <NavLink
                      to="#"
                      onClick={() => setMyAccountMenu(!myAccountMenu)}
                    >
                      My Account
                      {!myAccountMenu ? (
                        <FilledArrow down={true} />
                      ) : (
                        <FilledArrow up={true} />
                      )}
                    </NavLink>
                    {myAccountMenu && (
                      <MyAccountMenu
                        visible={myAccountMenu}
                        value={window.location.pathname}
                        options={MY_ACCOUNT_MENU_OPTIONS}
                        onClick={(menuItem) =>
                          onMyAccountMenuItemClick(menuItem)
                        }
                      />
                    )}
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
            {showDepositModal && (
              <DepositAmountPopUp
                onClose={() => setShowDepositModal(false)}
                user={user}
                formSubmitted={onUpdateUserDetails}
              />
            )}
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
