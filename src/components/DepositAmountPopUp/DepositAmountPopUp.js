import React, { Component } from "react";
import CreatePopUpPortal from "../../utility/CreatePopUpPortal";
import DepositAmountForm from "./DepositAmountForm";
import styles from "./styles.module.scss";

class DepositAmountPopUp extends Component {
  render() {
    console.log(this.props);
    const { city, address, phone_number, zip, currency, country } =
      this.props?.user || {};
    console.log(this.props.user);
    return (
      <CreatePopUpPortal>
        <div className={styles.blur}></div>
        <div className={styles.root}>
          <section className={`${styles.contentWrapper} modal-animation`}>
            <header className={styles.header}>
              <h3 className={styles.mainTitle}>Deposit</h3>
              <div className={styles.crossicon} onClick={this.props.onClose}>
                <span></span>
              </div>
            </header>
            <main className={styles.main}>
              <DepositAmountForm
                city={city}
                address={address}
                phoneNumber={phone_number}
                zip={zip}
                currency={currency}
                submitted={this.props.formSubmitted}
                country={country}
              />
              <div className={styles.leftSection}>
                <div>
                  <h6 className={styles.title}>Current Balance</h6>
                  <h1 className={styles.currentBalanceTitle}>$3.50</h1>
                </div>
                <div className={styles.creditCardDetails}>
                  <h6 className={styles.title2}>
                    Credit / Debit / PayPal / eCheck
                  </h6>
                  <p className="__mt-1 __mb-sm">
                    Minimum Deposit: <b>No Minimum</b>
                  </p>
                  <p>
                    Maximum Deposit: <b>$1000.00 USD</b>
                  </p>
                </div>
                <div>
                  <h6 className={styles.title2}>BTC / ETH</h6>
                  <p className="__mt-1 __mb-sm">
                    Minimum Deposit: <b>No Minimum</b>
                  </p>
                  <p>
                    Maximum Deposit: <b>No Maximum</b>
                  </p>
                </div>
                <div className={styles.updateDepositSection}>
                  <h4 className="__mb-0 __mt-5 __primary-color ">
                    Update Deposit Limits
                  </h4>
                  <p className="__mt-1">
                    View more information about how to control your game play
                    settings on our{" "}
                    <b className="__primary-color">Responsible Gaming</b> page.
                  </p>
                </div>
              </div>
            </main>
          </section>
        </div>
      </CreatePopUpPortal>
    );
  }
}

export default DepositAmountPopUp;
