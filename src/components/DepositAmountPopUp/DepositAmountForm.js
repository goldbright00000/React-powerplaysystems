import React, { Component } from "react";

import { createAlert } from "../../actions/notificationActions";
import ChooseItem from "../../ui/ChooseItem/ChooseItem";
import styles from "./styles.module.scss";
import PayPal from "../../assets/paypal.png";
import BitCoin from "../../assets/bitcoin.png";
import Coingate from "../../assets/coingate.png";
import CreditDebitCard from "../../assets/combined-shape.png";
import EFTCard from "../../assets/eft.svg";
import InteracCard from "../../assets/interac.png";
import VisaCard from "../../assets/visa.svg";
import ECheck from "../../assets/e-check.png";
import Ethereum from "../../assets/ethereum_small.png";
import CVVImg from "../../assets/cvv.png";
import { Link } from "react-router-dom";
import QRCode from "../../assets/QRCode.png";
import copyImage from "../../assets/copy.png";
import copyTextToClipBoard from "../../utility/copyTextToClipBoard";
import { getPersonaUserId } from "../../actions/personaActions";
import { checkAccountLimit } from "../../actions/userActions";

const paymentGateWay = 'MyUserPay';

const formatePrice = (price, currencyValue, isCad, noSign) =>
  noSign
    ? (price * currencyValue).toFixed(2)
    : `${isCad ? "CAD " : "$"}${(price * currencyValue).toFixed(2)}`;

class DepositAmountForm extends Component {

  state = {
    BTC: 58680,
    ETH: 2092,
    form: {
      currency: this.props.formCurrency,
      price: this.props.formCurrency === "USD" ? 25 : (this.props.formCurrency === "BTC" ? 0.0005 : 0.015),
      paymentMetod:
        this.props.country === "Canada" ? "EFT" : "Credit or Debit Card",
      walletAddress: "",
    },
    isOtherAmount: false,
    city: this.props.city,
    address: this.props.address,
    phoneNumber: this.props.phoneNumber,
    zip: this.props.zip,
    currency: this.props.currency ? this.props.currency : "USD",
    country: this.props.country,
    canadianVisible: this.props.country === "Canada",
    dispatch: this.props.dispatch
  };

  onCurrencyChange = (e) => {
    const { value } = e.target;
    const { values, paymentMetods } = this.prices[value];
    const newForm = { ...this.state.form };
    newForm.currency = value;
    newForm.price = values[0].value;
    newForm.paymentMetod = paymentMetods[0]?.value || null;
    this.setState({ form: newForm });
  };

  onPriceChange = (e) => {
    const { value, type } = e.target;
    const newForm = { ...this.state.form };
    newForm.price = +value;
    this.setState({ form: newForm, isOtherAmount: type === "number" });
  };

  onPaymentMethodChange = (e) => {
    const newForm = { ...this.state.form };
    newForm.paymentMetod = e.target.value;
    this.setState({ form: newForm });
  };

  prices = {
    USD: {
      title: (
        <>
          <b>$</b> USD
        </>
      ),
      values: [
        { value: 25, title: "$25" },
        { value: 100, title: "$100" },
        { value: 250, title: "$250" },
        { value: 500, title: "$500" },
      ],
      paymentMetods: [
        {
          value: "EFT",
          title: (
            <img src={EFTCard} alt="" className={styles.creditdebitcardImg} />
          ),
          helperText: "EFT",
          visible: this.state.canadianVisible,
        },
        {
          value: "INTERAC",
          title: (
            <img
              src={InteracCard}
              alt=""
              className={styles.creditdebitcardImg}
            />
          ),
          helperText: "INTERAC",
          visible: this.state.canadianVisible,
        },
        {
          value: "CREDIT",
          title: (
            <img
              src={CreditDebitCard}
              alt=""
              className={styles.creditdebitcardImg}
            />
          ),
          helperText: "CREDIT",
          visible: this.state.canadianVisible,
        },
        {
          value: "VISA",
          title: <img src={VisaCard} alt="" className={styles.visaCard} />,
          helperText: "VISA DEBIT",
          visible: this.state.canadianVisible,
        },
        {
          value: "Credit or Debit Card",
          title: (
            <img
              src={CreditDebitCard}
              alt=""
              className={styles.creditdebitcardImg}
            />
          ),
          helperText: "CREDIT or DEBIT",
          visible: !this.state.canadianVisible,
        },
        {
          value: "PayPal",
          title: <img src={PayPal} alt="" className={styles.PayPal} />,
          visible: !this.state.canadianVisible,
        },
        {
          value: "E-Check",
          title: <img src={ECheck} alt="" className={styles.ECheck} />,
          visible: !this.state.canadianVisible,
        },
      ],
    },
    BTC: {
      title: (
        <>
          <b>₿</b> BTC
        </>
      ),
      values: [
        {
          value: 0.0005,
          title: 0.0005,
          helperText: formatePrice(0.0005, this.state.BTC),
        },
        {
          value: 0.001,
          title: 0.001,
          helperText: formatePrice(0.001, this.state.BTC),
        },
        {
          value: 0.002,
          title: 0.002,
          helperText: formatePrice(0.002, this.state.BTC),
        },
        {
          value: 0.005,
          title: 0.005,
          helperText: formatePrice(0.005, this.state.BTC),
        },
      ],
      paymentMetods: [],
    },
    ETH: {
      title: (
        <>
          <img src={Ethereum} alt="" className={styles.EthereumImage} width={'15px'} height={'24px'} /> ETH
        </>
      ),
      values: [
        {
          value: 0.015,
          title: 0.015,
          helperText: formatePrice(0.015, this.state.ETH),
        },
        {
          value: 0.025,
          title: 0.025,
          helperText: formatePrice(0.025, this.state.ETH),
        },
        {
          value: 0.05,
          title: 0.05,
          helperText: formatePrice(0.05, this.state.ETH),
        },
        {
          value: 0.1,
          title: 0.1,
          helperText: formatePrice(0.1, this.state.ETH),
        },
      ],
      paymentMetods: [],
    },
  };

  onWalletAddressChange = (e) => {
    const newForm = { ...this.state.form };
    newForm.walletAddress = e.target.value;
    this.setState({ form: newForm });
  };

  onFieldChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const user_id = getPersonaUserId();

    const response = await this.state.dispatch(checkAccountLimit(user_id, this.state.form.currency));

    if (response?.daily?.exceeded) {
      this.state.dispatch(createAlert('This transaction exceeds the personal Daily limits which you have set on the Account Limits page.', "info"));
    } else if (response?.weekly?.exceeded) {
      this.state.dispatch(createAlert('This transaction exceeds the personal Weekly limits which you have set on the Account Limits page.', "info"));
    } else if (response?.montly?.exceeded) {
      this.state.dispatch(createAlert('This transaction exceeds the personal Monthly limits which you have set on the Account Limits page.', "info"));
    } else {
      if (this.state.form.currency === "USD") {
        if (!this.state.canadianVisible) {
          const object = {
            currency: this.state.currency,
            amount: this.state.form.price,
            city: this.state.city,
            address: this.state.address,
            zip: this.state.zip,
            phone_number: this.state.phoneNumber,
          };

          this.props.ipaySubmitted(object);
        } else {
          let { price, paymentMetod } = this.state.form;

          // price = parseFloat((price * this.props.cad).toFixed(2));

          this.props.myUserPaySubmitted({ amount: price, paymentMethod: paymentMetod })

          // To enable USD payment using zum - DO NOT REMOVE THIS LINE OF CODE!!

          // this.props.zumSubmitted({ amount: price, paymentMethod: paymentMetod });
        }
      }
      else {
        const { currency, price } = this.state.form;
        this.props.coinbaseSubmitted(price, currency);
      }
    }
  };

  render() {
    const { currency, price, paymentMetod, walletAddress } = this.state.form;
    const { isOtherAmount } = this.state;
    return (
      <>
        <form className={styles.form} onSubmit={this.onSubmit}>
          <section className={styles.formSection}>
            <h6>Select Currency</h6>
            <div className="row align-items-center">
              {Object.keys(this.prices).map((key, index) => (
                <div className="col-auto mx-0 my-2 px-1">
                  <ChooseItem
                    name="currency"
                    title={this.prices[key].title}
                    value={key}
                    key={index}
                    checked={currency === key}
                    onChange={this.onCurrencyChange}
                  />
                </div>
              ))}
            </div>
          </section>
          <section className={`${styles.formSection}`}>
            <h6>Select Amount ({currency})</h6>
            <div className="row align-items-center">
              {this.prices[currency].values.map((data, index) => (
                <div className="col-auto mx-0 my-2 px-1">
                  <ChooseItem
                    name="price"
                    key={index}
                    onChange={this.onPriceChange}
                    // helperText={
                    //   this.state.canadianVisible
                    //     ? formatePrice(data.value, this.props.cad, true)
                    //     : null
                    // }
                    {...data}
                    checked={!isOtherAmount && price === data.value}
                  />
                </div>
              ))}
              <div className="col-auto mx-0 my-2 px-1">
                <ChooseItem
                  name="price"
                  title="Other"
                  helperText="Your Amount"
                  type="number"
                  onChange={this.onPriceChange}
                  value={isOtherAmount ? price : ""}
                />
              </div>
            </div>
          </section>
          {currency === "USD" && paymentGateWay !== 'MyUserPay' ? (
            < section className={styles.formSection}>
              <h6>Add Payment Details</h6>
              <div className="row align-items-center">
                {this.prices[currency].paymentMetods.map(
                  (data, index) =>
                    data.visible && (
                      <div className="col-auto mx-0 my-2 px-1">
                        <ChooseItem
                          {...data}
                          key={index}
                          checked={paymentMetod === data.value}
                          onChange={this.onPaymentMethodChange}
                        />
                      </div>
                    )
                )}
              </div>
            </section>
          ) : (
            <section className={styles.formSection}>
              {/* <h6>
              Don’t own any {currency === "BTC" ? "Bitcoin" : "Ethereum"}? Buy
              at our Payment Partner{" "}
            </h6>
            <div>
              <img src={Coingate} alt="" className={styles.Coingate} />
              <button className={styles.buyCoinBtn} type="button">
                Buy {currency} at Coingate
              </button>
            </div> */}
            </section>
          )}
          {
            currency === "USD" && !this.state.canadianVisible && (
              <section className={styles.cardSectionn}>
                <div className={styles.cardDetails}>
                  <div>
                    {/* <label>City</label> */}
                    {/* <Link to="/add-card">+ Add New Card</Link> */}
                  </div>
                  <form>
                    <input
                      placeholder="City"
                      value={this.state.city}
                      name="city"
                      onChange={this.onFieldChangeHandler}
                    />
                    <input
                      placeholder="Address"
                      name="address"
                      onChange={this.onFieldChangeHandler}
                      value={this.state.address}
                    />
                    <input
                      placeholder="Phone Number"
                      type="phone"
                      name="phoneNumber"
                      onChange={this.onFieldChangeHandler}
                      value={this.state.phoneNumber}
                    />
                    <input
                      placeholder="Zip"
                      name="zip"
                      value={this.state.zip}
                      onChange={this.onFieldChangeHandler}
                    />
                    <select
                      onChange={this.onFieldChangeHandler}
                      value={this.state.currency}
                      name="currency"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </form>
                </div>
                {/* <div className="__mt-2 __flex __sb">
              <div>
                <p>Fred Smith</p>
                <p className="__mt-s __mb-s">123 Main St</p>
                <p>Toronto, ON. M1N 1N1</p>
              </div>
              <div className={styles.inputField}>
                <label htmlFor="CVV">CVV</label>
                <div className="__flex">
                  <input
                    type="text"
                    maxLength={3}
                    minLength={3}
                    className={styles.cvvInput}
                    id="CVV"
                  />
                  <img alt="" src={CVVImg} className={styles.cvvImage} />
                </div>
              </div>
            </div> */}
              </section>
            )}
            <div className={`${styles.card_wrp} w-100 d-block`}>
          <div className="row">
              <div className="col-md-12">
                <div className={`${styles.card_field} w-100 d-block`}>
                  <h6>Cardholder Name</h6>
                  <input type="text" name="cardname" placeholder="e.g. Mr J Smith"/>
                </div>
              </div>
              <div className="col-md-8">
                <div className={`${styles.card_field} w-100 d-block`}>
                  <h6>Card Number</h6>
                  <input type="number" name="cardno" placeholder="e.g. 1234 5678 1234 5678"/>
                </div>
              </div>
              <div className="col-md-2">
                <div className={`${styles.card_field} w-100 d-block`}>
                  <h6>Expiry Date</h6>
                  <input type="number" name="expirydate" placeholder="MM / YY"/>
                </div>
              </div>
              <div className="col-md-2">
                <div className={`${styles.card_field} w-100 d-block`}>
                  <h6>CVV</h6>
                  <input type="number" name="cvv" placeholder="e.g. 123"/>
                </div>
              </div>
              <div className="col-md-8">
                <div className={`${styles.card_field} w-100 d-block`}>
                  <h6>State / Province</h6>
                  <select>
                      <option>Select</option>
                      <option>Demo</option>
                      <option>Test Testing</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className={`${styles.card_field} w-100 d-block`}>
                  <h6>ZIP / Postal Code</h6>
                  <input type="number" name="zip" placeholder="e.g. 12345"/>
                </div>
              </div>
          </div>
          
        </div>
          {
            currency !== "USD" ? (
              // <section className={styles.QRCodeWrapper}>
              //   {/* <h6>Deposit Bitcoin Directly to Your Defy Games Account</h6> */}
              //   <div>
              //     {/* <img alt="" src={QRCode} className={styles.qrImage} />
              //     <div className={styles.inputField}>
              //       <label htmlFor="wallet-address">Wallet Address</label>
              //       <img
              //         src={copyImage}
              //         alt=""
              //         className={styles.copyImage}
              //         onClick={() => navigator.clipboard.writeText(walletAddress)}
              //       />
              //       <input
              //         type="text"
              //         id="wallet-address"
              //         value={walletAddress}
              //         onChange={this.onWalletAddressChange}
              //       />
              //     </div> */}

              //   </div>
              // </section>
              <button className={`${styles.submitbtn} w-100 d-block`}>
                Deposit • {currency === "$USD" && "$"}
                {price} {currency.replace("$", "")}
              </button>
            ) : (
              <button className={`${styles.submitbtn} w-100 d-block`}>
                Deposit • {currency === "$USD" && "$"}
                {price}
                {currency.replace("$", "")}
              </button>
            )
          }
          <p className={`${styles.submitbtnlabel} w-100 d-block`}>You will be charged $25.00 by PowerPlay Systems Inc.</p>
        </form>
      </>
    );
  }
}

export default DepositAmountForm;
