import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import CreatePopUpPortal from "../../utility/CreatePopUpPortal";
import DepositAmountForm from "./DepositAmountForm";
import styles from "./styles.module.scss";
import formStyles from "../../scss/formstyles.module.scss";

import { setRates } from "../../actions/userActions";
import ArrowLeft from "../../assets/icons/ArrowLeft";
import DepositAmountFormMobile from "./DepositAmountFormMobile";

const DepositAmountPopUp = (props) => {
  const { city, address, phone_number, zip, currency, country } =
    props?.user || {};
  const dispatch = useDispatch();
  const rate = useSelector((state) => state?.user?.markedUpRate);
  const formCurrency = useSelector((state) => state?.ui?.depositFormData);

  const [depositInfo, setDepositInfo] = useState(false);
  const [nextForm, setDepositForm] = useState(1);

  useEffect(() => {
    if (country === "Canada") {
      dispatch(setRates());
    }
  }, []);

  const handleDepositFormForMobile = () => {
    if (nextForm !== 3) {
      setDepositForm(nextForm + 1);
    }
  }

  return (
    <CreatePopUpPortal>
      <div className={`modal fade show d-block ${styles.blur}`}>
        <div className="modal-dialog modal-animation modal-dialog-centered modal-xl" role="document">
          {/* Display only on big screens */}
          <div className="modal-content d-none d-xl-block">
            <div className="modal-header px-4 bg-orange">
              <h5 className="modal-title">Deposit</h5>
              <div className={styles.crossicon} onClick={props.onClose}>
                <span></span>
              </div>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row align-items-center justify-content-between">
                  <div className="col-auto">
                    <DepositAmountForm
                      city={city}
                      address={address}
                      phoneNumber={phone_number}
                      zip={zip}
                      currency={currency}
                      country={country}
                      cad={rate}
                      ipaySubmitted={props.ipayFormSubmitted}
                      zumSubmitted={props.zumFormSubmitted}
                      myUserPaySubmitted={props.myUserPayFormSubmitted}
                      coinbaseSubmitted={props.coinbaseFormSubmitted}
                      formCurrency={formCurrency}
                    />
                  </div>
                  <div className="col-auto">
                    <div className={styles.leftSection}>
                      <div>
                        <h6 className={styles.title}>Current Balance</h6>
                        <h1 className={styles.currentBalanceTitle}>$3.50</h1>
                      </div>
                      <div className={styles.creditCardDetails}>
                        <h6 className={styles.title2}>
                          Credit / Debit / PayPal / eCheck
                        </h6>
                        <p className="__mt-1 __mb-sm text-dark">
                          Minimum Deposit: <b>No Minimum</b>
                        </p>
                        <p className=" text-dark">
                          Maximum Deposit: <b>$500.00 USD</b>
                        </p>
                      </div>
                      <div>
                        <h6 className={styles.title2}>BTC / ETH</h6>
                        <p className="__mt-1 __mb-sm  text-dark">
                          Minimum Deposit: <b>No Minimum</b>
                        </p>
                        <p className=" text-dark">
                          Maximum Deposit: <b>No Maximum</b>
                        </p>
                      </div>
                      <div className={styles.updateDepositSection}>
                        <h4 className="__mb-0 __mt-5 __primary-color ">
                          Update Deposit Limits
                        </h4>
                        <p className="__mt-1 text-dark">
                          View more information about how to control your game play
                          settings on our{" "}
                          <b className="__primary-color">Responsible Gaming</b> page.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Display only on small screens */}
          <div className="modal-content d-block d-xl-none bg-none">
            <div className={`${formStyles.root} pt-2 px-4 position-relative`}>
              {
                nextForm > 1 && nextForm <= 3 &&
                <div className={`d-block`}>
                  <button
                    onClick={() => setDepositForm(nextForm - 1)}
                    className={`btn btn-default ${styles.customizeBackBtn} ${styles.btnFlat}`}>
                    <span>
                      <ArrowLeft />
                    </span>
                    <span className={`ml-3`}> Back </span>
                  </button>
                </div>
              }
              <div className="modal-header px-1 py-0 border-0 mb-3">
                <h3 className="modal-title text-orange fw-bold">Deposit</h3>
                <div className={`${styles.crossicon} ${nextForm > 1 ? 'position-absolute' : ''}`} onClick={props.onClose} style={{
                  top: nextForm > 1 ? '3%' : '', right: nextForm > 1 ? '3%' : ''
                }}>
                  <span className={`${styles.customCloseIcon}`}></span>
                </div>
              </div>
              <div className="d-flex align-items-top justify-content-between mb-5">
                <div>
                  <h6 className={`${styles.title} fw-bold`} style={{ color: '#7f7f7f', fontSize: '16px' }}>Current Balance</h6>
                  <h1 className={styles.currentBalanceTitle}>$3.50</h1>
                </div>
                <div>
                  <span className="text-decoration-underline text-orange cursor-pointer" style={{ fontSize: '12px' }} onClick={() => setDepositInfo(true)}>See Deposit Limits</span>
                </div>
              </div>
              <DepositAmountFormMobile
                nextForm={nextForm}
                city={city}
                address={address}
                phoneNumber={phone_number}
                zip={zip}
                currency={currency}
                country={country}
                cad={rate}
                ipaySubmitted={props.ipayFormSubmitted}
                zumSubmitted={props.zumFormSubmitted}
                myUserPaySubmitted={props.myUserPayFormSubmitted}
                coinbaseSubmitted={props.coinbaseFormSubmitted}
                formCurrency={formCurrency} />

              <button className={formStyles.button} onClick={handleDepositFormForMobile} style={{
                display: nextForm === 3 ? 'none' : 'block'
              }}>
                {nextForm !== 3 ? 'Next' : 'Deposit'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {
        depositInfo &&
        <div className={`modal fade show d-block ${styles.blur}`}>
          <div className="modal-dialog modal-dialog-centered mb-0 mx-0" style={{ alignItems: 'flex-end' }} role="document">
            <div className="modal-content" style={{ backgroundColor: '#2d2f33', borderRadius: '12px' }}>
              <div className="modal-body">
                <div className={`${styles.crossicon} position-absolute`} onClick={() => setDepositInfo(false)} style={{
                  top: '3%', right: '3%'
                }}>
                  <span></span>
                </div>

                <div className="container-fluid">
                  <div className="row align-items-center justify-content-between">
                    <div className="col">
                      <p className={`h5 fw-bold text-orange`}>Cash</p>
                      <p style={{ color: '#f2f2f2', fontSize: '12px' }} className="fw-normal">Min Deposit:</p>
                      <p style={{ color: '#f2f2f2', fontSize: '14px', fontWeight: '600' }}>No Minimum</p>

                      <div className="my-3">
                        <p style={{ color: '#f2f2f2', fontSize: '12px' }} className="fw-normal">Max Deposit:</p>
                        <p style={{ color: '#f2f2f2', fontSize: '14px', fontWeight: '600' }}>$1000.00 USD</p>
                      </div>
                    </div>
                    <div className="col">
                      <p className={`h5 fw-bold text-orange`}>BTC / ETH</p>
                      <p style={{ color: '#f2f2f2', fontSize: '12px' }} className="fw-normal">Min Deposit:</p>
                      <p style={{ color: '#f2f2f2', fontSize: '14px', fontWeight: '600' }}>No Minimum</p>

                      <div className="my-3">
                        <p style={{ color: '#f2f2f2', fontSize: '12px' }} className="fw-normal">Max Deposit:</p>
                        <p style={{ color: '#f2f2f2', fontSize: '14px', fontWeight: '600' }}>No Maximum</p>
                      </div>
                    </div>
                    <div className="col-12">
                      <p className="fw-normal text-white">
                        View more information about how to control your game play settings on our <span className="text-orange">Responsible Gaming</span> page.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer border-0 text-center">
                <button className={`${styles.submitbtn} h-100 py-2 mx-auto`} onClick={() => setDepositInfo(false)}>
                  Got it!
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </CreatePopUpPortal>
  );
};

export default DepositAmountPopUp;
