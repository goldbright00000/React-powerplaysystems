import React, { Component } from "react";
import { connect } from 'react-redux'

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

import UsersGateway from "../../pages/UsersPaymentGateway/UsersGateway"

const paymentGateWay = 'MyUserPay';
const user_id = getPersonaUserId();

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
    cvv: this.props.cvv,
    cardno: this.props.cardno,
    expiredate: this.props.expiredate,
    cardname: this.props.cardname,
    canadianVisible: this.props.country === "Canada",
    dispatch: this.props.dispatch,
    currentAmount: 25,
    paymentInfo: this.props.paymentInfo
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
    this.setState({ form: newForm, isOtherAmount: type === "number", currentAmount: value });
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

  componentDidMount() {
    let { price, paymentMetod } = this.state.form;
    console.log("this.....",this.state.form)
    this.props.myUserPaySubmitted({ amount: price, paymentMethod: paymentMetod, isMyUser: false })
  }

  onPayment = async (e) => {
    localStorage.removeItem('currency');
    localStorage.removeItem('amount');
    localStorage.setItem('currency', this.state.form.currency);
    localStorage.setItem('amount', this.state.form.price);
  };

  onSubmit = async (e) => {
    e.preventDefault();
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
            cardno: this.state.cardno,
            cvv: this.state.cvv,
            cardname: this.state.cardname,
            expiremonth: this.state.expiremonth,
            expireyear: this.state.expireyear,
          };
          this.props.ipaySubmitted(object);
        } else {
          let { price, paymentMetod } = this.state.form;
          // price = parseFloat((price * this.props.cad).toFixed(2));
          this.setState({ paymentInfo: true })
          this.props.myUserPaySubmitted({ amount: price, paymentMethod: paymentMetod, isMyUser: true })

          // To enable USD payment using zum - DO NOT REMOVE THIS LINE OF CODE!!
          // this.props.zumSubmitted({ amount: price, paymentMethod: paymentMetod });
        }
      } else {
        const { currency, price } = this.state.form;
        this.props.coinbaseSubmitted(price, currency);
      }
    }
  };

  render() {
    const { currency, price, paymentMetod, walletAddress } = this.state.form;
    const { isOtherAmount, cardname, cardno, cvv, expiremonth, expireyear, paymentInfo } = this.state;
    const emailValue = this.props.auth.user.email;
    return (
      <>
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
            {price > 500 ?
              <div className={`${styles.errorMessage}`}>Maximum deposit amount is $500.00</div>
              : price === 100 &&
              <div className={`${styles.errorMessage}`}>You can't able to add $100.00</div>
            }
          </div>
        </section>
        {parseInt(this.props.monthlyAmount) + parseInt(this.state.currentAmount) < 5000 ?
          < form action='https://stagingcheckout.psigate.com/HTMLPost/HTMLMessenger' method="post" className={styles.form}>
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
            ) : (<></>)}
            {
              currency === "USD" && !this.state.canadianVisible && (
                <section className={styles.cardSectionn}>
                  <div className={styles.cardDetails}>
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
            {currency === "USD" && (<div className={`${styles.card_wrp} w-100 d-block`}>
              <div className="row">
                {/* <input TYPE="HIDDEN" NAME="StoreKey" VALUE="NEWSETUPhihWuZzxaSl021135" />StoreKey<br /> */}
                <input type="hidden" name="StoreKey" value="merchantcardcapture200024" />
                <input TYPE="HIDDEN" NAME="SubTotal" VALUE={price} />
                <div className="col-md-12">
                  <div className={`${styles.card_field} w-100 d-block`}>
                    <h6>Cardholder Name</h6>
                    <input
                      type="text"
                      name="cardname"
                      placeholder="e.g. Mr J Smith"
                      onChange={this.onFieldChangeHandler}
                      value={this.state.cardname}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={`${styles.card_field} w-100 d-block`}>
                    <h6>Card Number</h6>
                    <input
                      type="number"
                      name="cardno"
                      placeholder="e.g. 1234 5678 1234 5678"
                      onChange={this.onFieldChangeHandler}
                      value={this.state.cardno}
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <div className={`${styles.card_field} w-100 d-block`}>
                    <h6>Expiry Month</h6>
                    <input
                      type="number"
                      name="expiremonth"
                      placeholder="MM"
                      onChange={this.onFieldChangeHandler}
                      value={this.state.expiremonth}
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <div className={`${styles.card_field} w-100 d-block`}>
                    <h6>Expiry Year</h6>
                    <input
                      type="number"
                      name="expireyear"
                      placeholder="YY"
                      onChange={this.onFieldChangeHandler}
                      value={this.state.expireyear}
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <div className={`${styles.card_field} w-100 d-block`}>
                    <h6>CVV</h6>
                    <input
                      type="number"
                      name="cvv"
                      className={styles.cvvInput}
                      maxLength={3}
                      minLength={3}
                      name="cvv"
                      placeholder="e.g. 123"
                      onChange={this.onFieldChangeHandler}
                      value={this.state.cvv}
                    />
                  </div>
                </div>
                {/* <div className="col-md-8">
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
                </div> */}
              </div>

            </div>)}
            {
              currency !== "USD" ? (
                // <section className={styles.QRCodeWrapper}>
                //   {/* <h6>Deposit Bitcoin Directly to Your Defy Games Account</h6> * /}
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
              price < 500 &&
                <button className={`${styles.submitbtn} w-100 d-block`}
                  onClick={this.onPayment}
                  disabled={price === 100 || price > 500 || !cardname || !cardno || !cvv || !expiremonth || !expireyear ? true : false}
                >
                  Deposit • {currency === "$USD" && "$"}
                  {price}
                  {currency.replace("$", "")}
                </button>
              )
            }
            <input type="hidden" name="ThanksURL" value={`${process.env.REACT_APP_API_URL}/api/v1/users/catch-thanks-url?user_id=${user_id}`} />
            <input type="hidden" name="NoThanksURL" value={`${process.env.REACT_APP_API_URL}/api/v1/users/catch-nothanks-url`} />
            <p className={`${styles.submitbtnlabel} w-100 d-block`}>You will be charged ${price}.00 by PowerPlay Systems Inc.</p>
          </form> :
          <form className={styles.form} onSubmit={this.onSubmit}>
            {currency === "USD" && paymentGateWay !== 'MyUserPay' ? (
              <section className={styles.formSection}>
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
            ) : (<></>)}
            {currency === "USD" && !this.state.canadianVisible && (
              // <section className={styles.cardSectionn}>
              //   <div className={styles.cardDetails}>
              //     <form>
              //       <input
              //         placeholder="City"
              //         value={this.state.city}
              //         name="city"
              //         onChange={this.onFieldChangeHandler}
              //       />
              //       <input
              //         placeholder="Address"
              //         name="address"
              //         onChange={this.onFieldChangeHandler}
              //         value={this.state.address}
              //       />
              //       <input
              //         placeholder="Phone Number"
              //         type="phone"
              //         name="phoneNumber"
              //         onChange={this.onFieldChangeHandler}
              //         value={this.state.phoneNumber}
              //       />
              //       <input
              //         placeholder="Zip"
              //         name="zip"
              //         value={this.state.zip}
              //         onChange={this.onFieldChangeHandler}
              //       />
              //       <select
              //         onChange={this.onFieldChangeHandler}
              //         value={this.state.currency}
              //         name="currency"
              //       >
              //         <option value="USD">USD</option>
              //         <option value="EUR">EUR</option>
              //       </select>
              //     </form>
              //   </div>
              // </section>
              <></>
            )}
            {currency === "USD" && (
              <div className={`${styles.card_wrp} w-100 d-block`}>
                {/* <div className="row">
                  <div className="col-md-12">
                    <div className={`${styles.card_field} w-100 d-block`}>
                      <h6>Cardholder Name</h6>
                      <input
                        type="text"
                        name="cardname"
                        placeholder="e.g. Mr J Smith"
                        onChange={this.onFieldChangeHandler}
                        value={this.state.cardname}
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className={`${styles.card_field} w-100 d-block`}>
                      <h6>Card Number</h6>
                      <input
                        type="number"
                        name="cardno"
                        placeholder="e.g. 1234 5678 1234 5678"
                        onChange={this.onFieldChangeHandler}
                        value={this.state.cardno}
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className={`${styles.card_field} w-100 d-block`}>
                      <h6>Expiry Date</h6>
                      <input
                        type="number"
                        name="expiredate"
                        placeholder="MM / YY"
                        onChange={this.onFieldChangeHandler}
                        value={this.state.expiredate}
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className={`${styles.card_field} w-100 d-block`}>
                      <h6>CVV</h6>
                      <input
                        type="number"
                        className={styles.cvvInput}
                        maxLength={3}
                        minLength={3}
                        name="cvv"
                        placeholder="e.g. 123"
                        onChange={this.onFieldChangeHandler}
                        value={this.state.cvv}
                      />
                    </div>
                  </div>
                </div> */}

              </div>)}
            {currency !== "USD" ? (
              // <section className={styles.QRCodeWrapper}>
              //   {/* <h6>Deposit Bitcoin Directly to Your Defy Games Account</h6> * /}
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
              <button className={`${styles.submitbtn} w-100 d-block`}
                onClick={this.onSubmit}>
                Deposit • {currency === "$USD" && "$"}
                {price} {currency.replace("$", "")}
              </button>
            ) : (
              <button className={`${styles.submitbtn} w-100 d-block`}
                onClick={this.onSubmit}
              >
                Deposit • {currency === "$USD" && "$"}
                {price}
                {currency.replace("$", "")}
              </button>
            )
            }
            <p className={`${styles.submitbtnlabel} w-100 d-block`}>You will be charged ${price}.00 by PowerPlay Systems Inc.</p>
          </form>
        }
        {paymentInfo === true &&
          <UsersGateway amount={price} paymentMethod={paymentMetod} email={emailValue} />
        }
      </>
    );
  }
}


const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(DepositAmountForm)


