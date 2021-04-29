import React, { Component } from "react";

import ChooseItem from "../../ui/ChooseItem/ChooseItem";
import styles from "./styles.module.scss";
import PayPal from "../../assets/paypal.png";
import BitCoin from "../../assets/bitcoin.png";
import Coingate from "../../assets/coingate.png";
import CreditDebitCard from "../../assets/combined-shape.png";
import ECheck from "../../assets/e-check.png";
import Ethereum from "../../assets/ethereum.png";
import CVVImg from "../../assets/cvv.png";
import { Link } from "react-router-dom";
import QRCode from "../../assets/QRCode.png";
import copyImage from "../../assets/copy.png";
import copyTextToClipBoard from "../../utility/copyTextToClipBoard";

const formatePrice = (price, currencyValue) =>
  `$${(price * currencyValue).toFixed(2)}`;

class DepositAmountForm extends Component {
  state = {
    BTC: 58680,
    ETH: 2092,
    form: {
      currency: "USD",
      price: 25,
      paymentMetod: "Credit or Debit Card",
      walletAddress: "",
    },
    isOtherAmount: false,
    city: this.props.city,
    address: this.props.address,
    phoneNumber: this.props.phoneNumber,
    zip: this.props.zip,
    currency: this.props.currency,
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
          value: "Credit or Debit Card",
          title: (
            <img
              src={CreditDebitCard}
              alt=""
              className={styles.creditdebitcardImg}
            />
          ),
          helperText: "CREDIT or DEBIT",
        },
        {
          value: "PayPal",
          title: <img src={PayPal} alt="" className={styles.PayPal} />,
        },
        {
          value: "E-Check",
          title: <img src={ECheck} alt="" className={styles.ECheck} />,
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
          <img src={Ethereum} alt="" className={styles.EthereumImage} /> ETH
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

  onSubmit = (e) => {
    e.preventDefault();

    const object = {
      currency: this.state.currency,
      amount: this.state.form.price,
      city: this.state.city,
      address: this.state.address,
      zip: this.state.zip,
      phone_number: this.state.phoneNumber,
    };

    this.props.submitted(object);
  };

  render() {
    const { currency, price, paymentMetod, walletAddress } = this.state.form;
    const { isOtherAmount } = this.state;
    return (
      <form className={styles.form} onSubmit={this.onSubmit}>
        <section className={styles.formSection}>
          <h6>Select Currency</h6>
          <div>
            {Object.keys(this.prices).map((key, index) => (
              <ChooseItem
                name="currency"
                title={this.prices[key].title}
                value={key}
                key={index}
                checked={currency === key}
                onChange={this.onCurrencyChange}
              />
            ))}
          </div>
        </section>
        <section className={styles.formSection}>
          <h6>Select Amount ({currency})</h6>
          <div>
            {this.prices[currency].values.map((data, index) => (
              <ChooseItem
                name="price"
                key={index}
                onChange={this.onPriceChange}
                {...data}
                checked={!isOtherAmount && price === data.value}
              />
            ))}
            <ChooseItem
              name="price"
              title="Other"
              helperText="Your Amount"
              type="number"
              onChange={this.onPriceChange}
              value={isOtherAmount ? price : ""}
            />
          </div>
        </section>
        {currency === "USD" ? (
          <section className={styles.formSection}>
            <h6>Add Payment Details</h6>
            <div>
              {this.prices[currency].paymentMetods.map((data, index) => (
                <ChooseItem
                  {...data}
                  key={index}
                  checked={paymentMetod === data.value}
                  onChange={this.onPaymentMethodChange}
                />
              ))}
            </div>
          </section>
        ) : (
          <section className={styles.formSection}>
            <h6>
              Don’t own any {currency === "BTC" ? "Bitcoin" : "Ethereum"}? Buy
              at our Payment Partner{" "}
            </h6>
            <div>
              <img src={Coingate} alt="" className={styles.Coingate} />
              <button className={styles.buyCoinBtn} type="button">
                Buy {currency} at Coingate
              </button>
            </div>
          </section>
        )}
        {currency === "USD" && (
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
        {currency !== "USD" ? (
          <section className={styles.QRCodeWrapper}>
            <h6>Deposit Bitcoin Directly to Your Defy Games Account</h6>
            <div>
              <img alt="" src={QRCode} className={styles.qrImage} />
              <div className={styles.inputField}>
                <label htmlFor="wallet-address">Wallet Address</label>
                <img
                  src={copyImage}
                  alt=""
                  className={styles.copyImage}
                  onClick={() => navigator.clipboard.writeText(walletAddress)}
                />
                <input
                  type="text"
                  id="wallet-address"
                  value={walletAddress}
                  onChange={this.onWalletAddressChange}
                />
              </div>
              <button className={styles.submitbtn}>
                Deposit • {currency === "$USD" && "$"}
                {price} {currency.replace("$", "")}
              </button>
            </div>
          </section>
        ) : (
          <button className={styles.submitbtn}>
            Deposit • {currency === "$USD" && "$"}
            {price} {currency.replace("$", "")}
          </button>
        )}
      </form>
    );
  }
}

export default DepositAmountForm;
