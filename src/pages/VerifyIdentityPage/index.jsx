import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import HeroSection from "../../components/CreateAccountsHeroSection/HeroSection";
import formStyles from "../../scss/formstyles.module.scss";
import styles from "./styles.module.scss";
import img1 from "../../assets/group-141.png";
import img2 from "../../assets/group-14.png";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import personaLogo from "../../assets/persona-logo.svg";
import { Link, useHistory } from "react-router-dom";
import { redirectTo } from "../../utility/shared";
import {
  getPersonaUserId,
  removePersonaUserId,
} from "../../actions/personaActions";
import { showToast } from "../../actions/uiActions";
import http from "../../config/http";
import { URLS } from "../../config/urls";
import ArrowLeft from "../../assets/icons/ArrowLeft";



const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}


const VerifyIdentityPage = (props) => {
  const history = useHistory();
  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());
  const dispatch = useDispatch();
  const onVerifyLater = () => {
    removePersonaUserId();
    return redirectTo(props, { path: "login?signup=true" });
  };


  const redirectToPerson = () => {
    let url =
      `https://withpersona.com/verify?template-id=${process.env.REACT_APP_PERSONA_TEMPLATE_ID}&`.concat(
        `environment=sandbox&redirect-uri=${process.env.REACT_APP_PERSONA_REDIRECT_URL}`
      );
    window.open(url);
  };

  useEffect(() => {
    let params = new URLSearchParams(props.location.search);
    let inquiryId = params.get("inquiry-id");
    if (inquiryId) {
      let personaUserId = getPersonaUserId();
      if (!personaUserId) {
        dispatch(
          showToast(
            "There's is some error during verification. Please try again.",
            "error"
          )
        );
      } else {
        console.log("You can go with the verification endpoint.");
        let obj = { user_id: personaUserId, inquiry_id: inquiryId };

        http
          .post(URLS.USER.PERSONA_VERIFICATION, obj)
          .then((res) => {
            if (res.data.status === true) {
              dispatch(showToast("Verification successfull. ", "success"));
              removePersonaUserId();
              redirectTo(props, { path: "login?signup=true" });
            } else {
              dispatch(showToast(res.data?.message, "error"));
            }
          })
          .catch((err) => {
            console.log(err.response);
            dispatch(
              showToast(
                err?.response?.data?.message ||
                "Verification failed. Please try again.",
                "error"
              )
            );
          });
      }
    }
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


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
            Take a moment to verify your identity and receive 100 Power Tokens!
          </>
        }
      />
      <main className={styles.root}>
        <section className={`${styles.leftSection}`}>
          <div className={styles.titleWrapper}>
            {
              windowDimensions.width <= 550 ?
                <h3 className="fw-bold mb-2" style={{ whiteSpace: 'nowrap' }}>100 bonus <br /> Power Tokens</h3> :
                <h3 className="fw-bold mb-2">100 bonus Power Tokens</h3>
            }
            <h4>will be added to your account</h4>
          </div>
          {
            windowDimensions.width <= 550 ? <img alt="" src={img1} /> : <img alt="" src={img2} />
          }
        </section>
        <section>
          <div className={formStyles.root2}>
            {/* <div className={`${formStyles.header} d-block`}> */}
              {/* <button className={styles.backButton}>Back</button> */}
              {/* <button className={`btn btn-default ${styles.customizeBackBtn} ${styles.btnFlat}`} onClick={handleBackBtn}>
                <span> <ArrowLeft /> </span>
                <span className={`ml-3`}> Back </span>
              </button>
            </div> */}
            <div className={styles.cardTitleWrapper}>
              <h2 className="text-dark">Verify your identity today and receive</h2>
              <h1>100 bonus Power Tokens!</h1>
              <img alt="" src={personaLogo} className={styles.personaLogo} />
            </div>
            <div className={styles.buttonWrappers}>
              <button
                className={styles.verifyIdentityButton}
                onClick={redirectToPerson}
              >
                Verify Your Identity
              </button>
              <button
                // styles.verifyLaterButton
                className={`border-0 bg-none text-decoration-underline`}
                onClick={onVerifyLater}>
                I will verify my identity later and forgo the bonus Power Token offer
              </button>
            </div>
          </div>
          <p className="mt-5 text-center">
            By continuing, you agree to Persona’s{" "}
            {windowDimensions.width <= 550 && <br />}
            <Link to="/privacy" className='text-orange'>Privacy Policy</Link>
          </p>
        </section>
      </main>

      <Footer isBlack={true} />
    </>
  );
};

export default VerifyIdentityPage;
