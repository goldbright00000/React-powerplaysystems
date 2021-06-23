import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../config/http";
import { URLS } from "../../config/urls";
import {
  getCountries,
  getStates,
  getProvinces,
  redirectTo,
  printLog,
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
import HeroSection from "../../components/CreateAccountsHeroSection/HeroSection";
import formStyles from "../../scss/formstyles.module.scss";
import styles from "./styles.module.scss";

const INITIAL_STATE = {
  //from step 1
  username: "",
  email: "",
  password: "",

  firstName: "",
  lastName: "",

  country: "",
  stateOrProvince: "",
  dateOfBirth: "",

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
  const [user, setUser] = useState({
    ...INITIAL_STATE,
    username: props.location.state.username,
    email: props.location.state.email,
    password: props.location.state.password,
  });
  useEffect(() => {
    if (user.isSuccess || isEmpty(props.location.state.email)) {
      // redirectTo(props, { path: "login" });
      redirectTo(props, { path: "verify-your-identity" });
    }
  }, [user]);
  useEffect(() => {
    setUser({ ...user, stateOrProvince: "" });
  }, [user.country]);
  const getStatesOrProvinces = () => {
    if (user.country == "USA") {
      return getStates();
    } else if (user.country == "Canada") {
      return getProvinces();
    } else {
      return [];
    }
  };
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
    printLog("User", user);
    const {
      username = "",
      email = "",
      password = "",

      firstName = "",
      lastName = "",

      country = "",
      stateOrProvince = "",

      dateOfBirth = "",

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
      isEmpty(stateOrProvince)
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
      username,
      firstName,
      lastName,
      email,
      password,
      country,
      stateOrProvince,
      dateOfBirth,
      updatesCheck,
      promotionsCheck,
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
    props.history.replace("/verify-your-identity");
  };
  return (
    <>
      <Header isStick={true} />
      <HeroSection
        isBlack={true}
        title={
          <>
            Get Ready <br /> to Power-Up!
          </>
        }
        subTitle={
          <>
            Complete the fields below to create your PowerPlay Account. <br />{" "}
            As a bonus you can receive up to{" "}
            <span>
              20 <img src={powerplayicon} alt="" align="center" /> Powerplay
              tokens!
            </span>
          </>
        }
      />
      <main className={styles.root}>
        <div className={styles.titleWrappersForMobileOnly}>
          <h2>Receive 10 Powerplay tokens</h2>
          <h3>just for signing up!</h3>
        </div>
        <section className={styles.leftSection}>
          <div className={styles.titleWrapper}>
            <h3>10 Powerplay tokens</h3>
            <h4>will be added to your account!</h4>
          </div>
          <img alt="" src={img1} />
        </section>

        <form className={formStyles.root2} action={null} onSubmit={onSubmit}>
          <div className={formStyles.header}>
            <h2 className={styles.formTitle}>Receive 10 Powerplay tokens</h2>
            <h5 className={styles.formSubTitle}>just for signing up!</h5>
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
          <div className={formStyles.row}>
            <Select
              id="country"
              name="country"
              className="w-100"
              title="Country"
              value={user.country}
              onChange={addressChnageHandler}
            >
              <option hidden disabled value="">
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
              <option hidden disabled value="">
                State/Province
              </option>
              {getStatesOrProvinces().map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Input
              type="date"
              title="Date Of Birth"
              id="dateOfBirth"
              value={user.dateOfBirth}
              onChange={(e) => {
                setUser({ ...user, dateOfBirth: e?.target?.value });
              }}
              extraClass={styles.dob}
              extra={
                <div className={styles.bonus}>
                  <p>+ 5 bonus tokens</p>
                  <img src={powerplayicon} />
                </div>
              }
            />
          </div>
          <br />
          <CheckBox
            checked={user.ageCheck}
            onChange={handleCheckBox}
            name="ageCheck"
            title="I am over the age of majority in the state or province where currently reside."
          />
          <CheckBox
            checked={user.termsAndConditions}
            onChange={handleCheckBox}
            name="termsAndConditions"
            title={
              <>
                I have read agree to the
                <Link to="/"> terms and conditions </Link>for using this
                website.
              </>
            }
          />
          <CheckBox
            checked={user.updatesCheck}
            onChange={handleCheckBox}
            name="updatesCheck"
            title="I agree to receive email communications regarding status of games that I enter."
          />
          <CheckBox
            checked={user.promotionsCheck}
            onChange={handleCheckBox}
            name="promotionsCheck"
            title={
              <>
                I agree to receive marketing email communications from Powerplay
                Systems and or their partners.{" "}
                <span className={styles.blogSection}>
                  + 5 bonus tokens{" "}
                  <img src={powerplayicon} alt="" align="center" />
                </span>
              </>
            }
          />
          <button className={formStyles.button}>
            {user?.isLoading ? "LOADING..." : "NEXT"}
          </button>
        </form>
      </main>
      <Footer isBlack={true} />
    </>
  );
};

export default GetUserInfoPage;
