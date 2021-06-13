import React from "react";
import HeroSection from "../../components/CreateAccountsHeroSection/HeroSection";
import formStyles from "../../scss/formstyles.module.scss";
import styles from "./styles.module.scss";
import img1 from "../../assets/group-14.png";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import personaLogo from "../../assets/persona-logo.svg";
import { Link } from "react-router-dom";
import { redirectTo } from "../../utility/shared";

const VerifyIdentityPage = (props) => {
  const onVerifyLater = () => {
    return redirectTo(props, { path: "login" });
  };
  // send it to backend and verify the inquiry there.
  // http://localhost:3000/verify-your-identity?inquiry-id=inq_9XBzrr32E5mET1LSFZ74LrJh

  const redirectToPerson = () =>{
    let url = `https://withpersona.com/verify?template-id=${process.env.REACT_APP_PERSONA_TEMPLATE_ID}&`
    .concat(`environment=sandbox&redirect-uri=${process.env.REACT_APP_PERSONA_REDIRECT_URL}`)
    window.open(url, "_blank")
  }

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
            Start your new fantasy experience on our live-play platform <br />{" "}
            where you have the Power to control your team's destiny!
          </>
        }
      />
      <main className={styles.root}>
        <section className={styles.leftSection}>
          <div className={styles.titleWrapper}>
            <h3>10 Powerplay tokens</h3>
            <h4>will be added to your account!</h4>
          </div>
          <img alt="" src={img1} />
        </section>
        <section className={formStyles.root2}>
          <div className={formStyles.header}>
            <button className={styles.backButton}>Back</button>
          </div>
          <div className={styles.cardTitleWrapper}>
            <h2>Verify your identity today and receive</h2>
            <h1>100 bonus Power Tokens!</h1>
            <img alt="" src={personaLogo} className={styles.personaLogo} />
          </div>
          <div className={styles.buttonWrappers}>
            <button className={styles.verifyIdentityButton} onClick={redirectToPerson}>
              Verify Your Identity
            </button>
            <button
              className={styles.verifyLaterButton}
              onClick={onVerifyLater}
            >
              I will verify my identity later and forgo the bonus Power Token
              offer
            </button>
          </div>
          <p className={styles.privacyBlog}>
            By continuing, you agree to Persona’s{" "}
            <Link to="/privacy">privacy policy</Link>
          </p>
        </section>
      </main>
      <Footer isBlack={true} />
    </>
  );
};

export default VerifyIdentityPage;
