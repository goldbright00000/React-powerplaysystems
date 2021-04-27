import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, isEqual } from "lodash";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Input from "../../ui/Input/Input";
import Alert from "../../components/Alert";
import { redirectTo } from "../../utility/shared";
import http from "../../config/http";
import { URLS } from "../../config/urls";
import styles from './styles.module.scss';
import HeroSection from "./HeroSection";
import formStyles from './formstyles.module.scss';

const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
  cPassword: "",
  isLoading: false,
  isSuccess: false,
  isFailed: false,
  errorMsg: "",
  message: "",
};

const PowerUpPage = (props) => {
  const [user, setUser] = useState(INITIAL_STATE);

  useEffect(() => {
    if (user.isSuccess) {
      redirectTo(props, { path: "login" });
    }
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const { username = "", email = "", password = "", cPassword = "" } =
      user || {};
    setUser({ ...user, isLoading: true });

    if (
      isEmpty(username) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(cPassword)
    ) {
      return setUser({
        ...user,
        isFailed: true,
        errorMsg: "All fields are required",
      });
    }

    if (!isEqual(password, cPassword)) {
      return setUser({
        ...user,
        isFailed: true,
        errorMsg: "Password did not match",
      });
    }

    const data = {
      email,
      password,
    };
    const response = await http.post(URLS.AUTH.VERIFY_EMAIL, data);
    if (response.data.status === false) {
      return setUser({
        ...user,
        isLoading: false,
        isFailed: true,
        errorMsg: response.data.message,
      });
    }

    redirectTo(props, { path: "user-profile-info", state: data });
  };

  return (
    <div className={styles.root}>
      <Header isStick={true} />
      <HeroSection title={<>Get Ready <br />to Power-Up!</>} subTitle={<>Start your new fantasy experience on our live-play platform <br /> where you have the Power to control your team's destiny!</>} />
      <div className={styles.container}>
          <form
            className={formStyles.root}
            action={null}
            onSubmit={onSubmit}
          >
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
              title="Username"
              id="username"
              value={user.username}
              onChange={(e) => {
                setUser({ ...user, username: e?.target?.value });
              }}
            />
            <Input
              type="email"
              title="E-mail"
              id="email"
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e?.target?.value });
              }}
            />
            <Input
              type="password"
              title="Create-a-password"
              id="password"
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e?.target?.value });
              }}
            />
            <Input
              type="password"
              title="Confirm your password"
              id="confirmpassword"
              value={user.cPassword}
              onChange={(e) => {
                setUser({ ...user, cPassword: e?.target?.value });
              }}
            />
            <button
              className={formStyles.button}
              disabled={user.isLoading}
            >
              {user.isLoading ? "Loading..." : "Next"}
            </button>
          </form>
          <p className={styles.blogSection}>
            Already have an account?{" "}
            <Link to="/login">
              Log in!
            </Link>
          </p>
      </div>
      <Footer isBlack={true} />
    </div>
  );
};

export default PowerUpPage;
