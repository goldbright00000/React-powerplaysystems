import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { VerificationInput as Input } from "../../ui/Input/Input";
import styles from "./styles.module.scss";

import formStyles from "../../scss/formstyles.module.scss";
import ArrowLeft from "../../assets/icons/ArrowLeft";
import Timer from "../../ui/Timer/Timer";
import http from "../../config/http";
import { URLS } from "../../config/urls";
import { redirectTo } from "../../utility/shared";

const Verification = (props) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (error) {
      history.replace("power-up");
    }

    try {
      const response = await http.post(URLS.USER.VERIFY_CONFIRMATION_CODE, {
        email: props?.data?.email,
        code,
      });
      if (response.status) {
        redirectTo(
          { history },
          { path: "user-profile-info", state: props.data }
        );
      } else {
        setCode("");
      }
    } catch (error) {
      setCode("");
    }
  };

  return (
    <div className={styles.container}>
      <form className={`${formStyles.root}`} action={null} onSubmit={onSubmit}>
        <div className={formStyles.header}>
          {/* <button className={styles.backButton}>Back</button> */}
          <button
            className={`btn btn-default ${styles.customizeBackBtn} ${styles.btnFlat}`}
          >
            <span>
              <ArrowLeft />
            </span>
            <span className={`ml-3`}> Back </span>
          </button>
        </div>

        <div className="text-center">
          <img
            src={require("../../assets/images/358-paper-plane.svg").default}
            className={`${styles.paperPlane}`}
            alt="Paper Plane"
          />
        </div>

        <div className="text-center" style={{ fontWeight: 500 }}>
          <p className="h6 text-dark">
            We sent a verification code to the email address you provided:
          </p>
          <p className="h6 card-link text-primary">{props.data?.email}</p>
          <p className="h6 text-dark mt-4">
            Please enter it below within 5 minutes.
          </p>
        </div>

        <Timer minutes={5} seconds={0} setError={setError} />

        {!error && (
          <Input
            type="text"
            title="Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        )}

        <button
          className={formStyles.button}
          disabled={!code}
          style={{
            backgroundColor: !code ? "#874008" : "#fb6e00",
          }}
        >
          {error ? "Start Over" : "Next"}
        </button>
      </form>
      <p className={styles.blogSection}>
        Didn't get any email? <Link to="/power-up">Resend Email!</Link>
      </p>
    </div>
  );
};

export default Verification;
