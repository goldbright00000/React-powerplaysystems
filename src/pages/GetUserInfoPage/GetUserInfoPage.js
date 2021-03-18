import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { redirectTo } from "../../utility/shared";
import http from "../../config/http";
import { URLS } from "../../config/urls";
import {
  getMonthDays,
  getMonths,
  getYearsList,
  getCountries,
  getStates,
  getProvinces,
  redirectTo,
} from "../../utility/shared";
//store
import { useDispatch, useSelector } from "react-redux";
//lodash
import { isEmpty, isEqual } from "lodash";
//ui component imports
import Input from "../../ui/Input/Input";
import Select from "../../ui/Select/Select";
import CheckBox from "../../ui/CheckBox/CheckBox";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Alert from "../../components/Alert";
//imgs
import powerplayicon from "../../assets/powerplay-icon.png";
import img1 from "../../assets/group-14.png";
//css
import "./GetUserInfoPage.scss";
const INITIAL_STATE = {
  //from step 1
  username: "",
  email: "",
  passwod: "",

  firstName: "",
  lastName: "",

  country: "",
  stateOrProvince: "",

  day: "",
  month: "",
  year: "",

  termsAndConditions: true,
  promotionsCheck: false,
  updatesCheck: false,
  ageCheck: false,

  isLoading: false,
  isSuccess: false,
  isFailed: false,

  errorMsg: "",
  message: "",
};

const GetUserInfoPage = (props) => {
  const [user, setUser] = useState(INITIAL_STATE);

  useEffect(() => {
    console.log(props);
    if (user.isSuccess) {
      redirectTo(props, { path: "login" });
    }
  }, [user]);
  const addressChnageHandler = (e) => {
    const { target: { value = "", name = "" } = {} } = e || {};
    setUser({ ...user, [name]: value });
  };
  const dateOfBirthChangeHandler = (e) => {
    const { target: { value = "", name = "" } = {} } = e || {};
    setUser({ ...user, [name]: value });
  };
  const handleCheckBox = (e) => {
    const { target: { checked = false, name = "" } = {} } = e || {};

    setUser({ ...user, [name]: checked });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("User", user);
    const {
      username = "",
      email = "",
      passwod = "",

      firstName = "",
      lastName = "",

      country = "",
      stateOrProvince = "",

      day = "",
      month = "",
      year = "",

      termsAndConditions = false,
      promotionsCheck = false,
      updatesCheck = false,
      ageCheck = false,
    } = user || {};
    setUser({ ...user, isLoading: true });

    if (
      isEmpty(firstName) ||
      isEmpty(lastName) ||
      isEmpty(country) ||
      isEmpty(stateOrProvince) ||
      isEmpty(day) ||
      isEmpty(month) ||
      isEmpty(year)
    ) {
      return setUser({
        ...user,
        isFailed: true,
        errorMsg: "All fields are required",
      });
    }
    if (!ageCheck) {
      return setUser({
        ...user,
        isFailed: true,
        errorMsg: "Please Confirm that you are above the age of Majority",
      });
    }
    if (!termsAndConditions) {
      return setUser({
        ...user,
        isFailed: true,
        errorMsg: "Please agree to terms and conditions",
      });
    }

    const data = {
      firstName,
      lastName,
      country,
      stateOrProvince,
      dateOfBirth,
      checks,
    };

    const response = await http.post(URLS.AUTH.REGISTER, data);
    if (response.data.status === false) {
      return setUser({
        ...user,
        isLoading: false,
        isFailed: true,
        errorMsg: response.data.message,
      });
    }

    setUser({
      ...user,
      isLoading: false,
      isSuccess: true,
      errorMsg: response.data.message,
    });
    // props.history.push('/user-profile-info')
  };
  return (
    <div className="__GetUserInfoPage">
      <Header isStick={true} />
      <div className="__background-color">
        <div className="__center __mt-7 __sign-in-container">
          <div className="__inline-block">
            <div className="__viewport-title __ml-1 __mb-1 __mr-1 __primary __m-a __h3 __bold __p-s __h4-on-small">
              Get ready to Power-up!
            </div>
            <div className="__viewport-subtitle __h6 __mediam-on-small">
              Complete the fields below to create your PowerPlay Account.{" "}
              <br className="__hide-on-small" /> As a bonus you can receive up
              to 20 <img src={powerplayicon} alt="" align="center" /> Powerplay
              tokens!
            </div>
          </div>
        </div>
      </div>
      <div className="__form-section __mb-5">
        <div className="__form-wrapper __container-2 __flex __sb __block-on-mediam">
          <div className="__center">
            <div className="__primary-color __h3 __bolder __mt-4 __h6-on-mediam __form-title">
              <span className="__show-on-mediam">Receive </span>10 Powerplay
              tokens
            </div>
            <div className="__h5 __mt-s __mb-4 __hide-on-mediam">
              will be added to your account!
            </div>
            <div className="__show-on-mediam __small __mb-3">
              just for signing up!
            </div>
            <img
              alt=""
              src={img1}
              className="__block __powerplay-image __hide-on-mediam"
            />
          </div>
          <form className="__sign-in-form" action={null} onSubmit={onSubmit}>
            <div className="__primary-color __center __hide-on-mediam">
              <div className="__h4 __bold">Receive 10 Powerplay tokens</div>
              <div className="__small __light-bold">just for signing up!</div>
            </div>
            {!user?.isFailed && !isEmpty(user.errorMsg) && (
              <Alert renderMsg={() => <p>{user.errorMsg}</p>} danger />
            )}
            {user.isFailed && !isEmpty(user.errorMsg) && (
              <Alert renderMsg={() => <p>{user.errorMsg}</p>} danger />
            )}

            {user.isSuccess && !isEmpty(user.errorMsg) && (
              <Alert renderMsg={() => <p>{user.errorMsg}</p>} success />
            )}
            <div className="__flex __flex-end __inputs-wrapper __block-on-small">
              <Input
                type="text"
                title="First Name"
                id="firstName"
                value={user.firstName}
                onChange={(e) => {
                  setUser({ ...user, firstName: e?.target?.value });
                }}
              />
              <Input
                type="text"
                title="Last Name"
                id="lastName"
                value={user.lastName}
                onChange={(e) => {
                  setUser({ ...user, lastName: e?.target?.value });
                }}
              />
            </div>
            <div className="__flex __flex-end __inputs-wrapper">
              <Select
                id="country"
                name="country"
                className="w-100"
                title="Country"
                value={user.country}
                onChange={addressChnageHandler}
              >
                <option value="" selected disabled hidden>
                  Country
                </option>
                {getCountries().map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Select>
              <Select
                id="stateOrProvince"
                name="stateOrProvince"
                className="w-100"
                title="State/Province"
                value={user.stateOrProvince}
                onChange={addressChnageHandler}
              >
                <option value="" selected disabled hidden>
                  State/Province
                </option>
                {getStates().map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Select>
            </div>
            <div className="__flex __flex-end __inputs-wrapper __date-fields-wrapper __relative">
              <div className="__bonus-token __absolute __primary-color __flex">
                <span className="__mr-s">+ 5 bonus tokens</span>
                <img src={powerplayicon} alt="" />
              </div>
              <Select
                id="month"
                name="month"
                className="w-100"
                title="Date of birth"
                value={user.month}
                onChange={dateOfBirthChangeHandler}
              >
                <option value="" selected disabled hidden>
                  Month
                </option>
                {getMonths().map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Select>
              <Select
                id="day"
                name="day"
                className="w-100"
                title=""
                value={user.day}
                onChange={dateOfBirthChangeHandler}
              >
                <option value="" selected disabled hidden>
                  Day
                </option>
                {getMonthDays().map((opt) => (
                  <option value={opt.value}>{opt.name}</option>
                ))}
              </Select>
              <Select
                id="year"
                name="year"
                className="w-100"
                title=""
                value={user.year}
                onChange={dateOfBirthChangeHandler}
              >
                <option value="" selected disabled hidden>
                  Year
                </option>
                {getYearsList().map((opt) => (
                  <option value={opt.value}>{opt.name}</option>
                ))}
              </Select>
            </div>
            <label className="__flex __flex-start __checkbox-wrapper __mb-1 __mt-1">
              <CheckBox
                checked={user.ageCheck}
                onChange={handleCheckBox}
                name="ageCheck"
              />
              <span>
                I am over the age of majority in the state or province where I
                currently reside.
              </span>
            </label>
            <label className="__flex __flex-start __checkbox-wrapper __mb-1">
              <CheckBox
                checked={user.termsAndConditions}
                onChange={handleCheckBox}
                name="termsAndConditions"
              />
              <span>
                I have read agree to the{" "}
                <Link to="/" className="__light-bold __terms-conditions">
                  terms and conditions
                </Link>{" "}
                for using this website.
              </span>
            </label>
            <label className="__flex __flex-start __checkbox-wrapper __mb-1">
              <CheckBox
                checked={user.updatesCheck}
                onChange={handleCheckBox}
                name="updatesCheck"
              />
              <span>
                I agree to receive email communications regarding status of
                games that I enter.
              </span>
            </label>
            <label className="__flex __flex-start __checkbox-wrapper __mb-1 __relative">
              <CheckBox
                checked={user.promotionsCheck}
                onChange={handleCheckBox}
                name="promotionsCheck"
              />
              <span className="__f1">
                I agree to receive marketing email communications from Powerplay
                Systems and or their partners.
                <span className="__bonus-token __absolute">
                  <span className="__mr-s __primary-color">
                    + 5 bonus tokens
                  </span>
                  <img src={powerplayicon} alt="" align="center" />
                </span>
              </span>
            </label>
            <button
              className="__btn __h4 __submit-btn __uppercase __block __h5-on-small"
              disabled={user.isLoading}
            >
              {user.isLoading ? "Loading..." : "Power Up!"}
            </button>
          </form>
        </div>
      </div>
      <Footer isBlack={true} />
    </div>
  );
};

export default GetUserInfoPage;
