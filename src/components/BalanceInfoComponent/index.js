import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import classes from "./index.module.scss";
import Button from "../Button";
import Ticket from "../../icons/Ticket";
import CashBalance from "../../assets/points-collected.png";
import Token from "../../assets/token.png";
import Bitcoin from "../../assets/bitcoin.png";
import Ethereum from "../../assets/ethereum.png";
import Money from "../../icons/Money";
import ListItem from "./ListItem";
import Modal from "../Modal";
import Input from "../Input";
import Checkbox from "../Checkbox";
import Select from "../Select";
import { getCountries, getStates, getProvinces, getLocalStorage } from "../../utility/shared";
import {
  getDays,
  getMonths,
  getMonthDays,
  getYearsList,
  printLog,
} from "../../utility/shared";
import {
  getPersonaUserId,
} from "../../actions/personaActions";
import { CONSTANTS } from "../../utility/constants";
import DepositAmountPopUp from "../DepositAmountPopUp/DepositAmountPopUp";
import { requestBalanceWithdraw } from "../../actions/userActions";

const ListTitle = (Icon, isSvg, title) => {
  let width = 34,
    height = 34;

  if (title === "My Cash Balance") {
    width = 35;
    height = 26;
  } else if (title === "Power Token Balance") {
    width = 34;
    height = 34;
  } else if (title === "BTC Balance") {
    width = 26;
    height = 26;
  } else if (title === "ETH Balance") {
    width = 23;
    height = 36;
  }

  return (
    <>
      <span className={classes.list_left_side_2}>
        {Icon && isSvg ? (
          <Icon />
        ) : (
          Icon && !isSvg && <img src={Icon} width={width} height={height} alt="" />
        )}
      </span>
      <span className={classes.list_left_side_1}>{title}</span>
    </>
  );
};

const ListHeader = (
  title,
  balance,
  firstBtnTitle,
  firstBtnOnClick,
  btnTitle,
  onClick,
  Icon,
  isSvg,
  balanceType,
  minAmount
) => {
  return (
    <div className={`${classes.list_container} mx-0`}>
      <div className={`${classes.list_left_side} d-flex align-items-center justify-content-between`}>
        {ListTitle(Icon, isSvg, title)}
        <span className={classes.span}>
          {balanceType == "cash" ? "$" : ""}
          {balance}
        </span>
      </div>

      <div className={classes.list_right_side}>
        <div className={`d-flex align-items-center justify-content-around w-100`}>
          <Button title={firstBtnTitle} onClick={firstBtnOnClick} className="mx-1 h-100" />
          <Button
            className="mx-1 h-100"
            title={btnTitle}
            onClick={balance != 0 && onClick}
            styles={{ opacity: balance == 0 ? 0.5 : 1.0 }}
          />
        </div>
        <div className={`${classes.list_right_side_text} w-100 my-2`}>
          <span>{minAmount}</span>
        </div>
      </div>
    </div >
  );
};

function BalanceInfoComponent(props) {
  const [form, setForm] = useState({
    balance_amount: 25,
    send_to: '',
    addr1: '',
    addr2: '',
    country: '',
    region: '',
    postCode: '',
    fname: '',
    lanme: '',
    day: 10,
    month: 10,
    year: 1998,
  });

  const dispatch = useDispatch();

  const [showModal, setModalState] = useState(false);
  const [activeForm, setActiveForm] = useState(0);
  const [isInvalid, setInvalid] = useState(false);

  const { isMobile = false } = props || {};
  const { balance = {} } = props || {};

  useEffect(() => {
    printLog(balance);
  }, []);

  const changeInputHandler = (e) => {
    const { target: { value = "", name = "", min, max } = {} } = e || {};

    if (name === 'balance_amount') {
      if (parseInt(value) >= parseInt(min) && parseInt(value) <= parseInt(max)) {
        setForm({ ...form, [name]: value })
        setInvalid(false);
      } else {
        setInvalid(true);
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleCheckBox = (e) => {
    const { target: { checked = false, name = "" } = {} } = e || {};
    setForm({ ...form, [name]: checked });
  };

  const handleCountryRegion = (e) => {
    const { name = "", value } = e || {};
    setForm({ ...form, [name]: value });
  };

  const changeModalState = () => {
    setModalState(!showModal);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isMobile && activeForm !== 2) {
      let _active = activeForm;
      setActiveForm(_active + 1);
      return;
    } else if (!isMobile || (isMobile && activeForm === 2)) {
      const user_id = getPersonaUserId()
      dispatch(requestBalanceWithdraw({ ...form, user_id }));
    }
  };

  const handleBack = () => {
    if (activeForm > 0) {
      let _active = activeForm;
      setActiveForm(_active - 1);
    }
  };

  const getStatesOrProvinces = () => {
    if (form?.country === "USA") {
      return getStates();
    } else if (form?.country === "Canada") {
      return getProvinces();
    } else {
      return [];
    }
  };

  return (
    <>
      {/* {props.openDepositModal && (
        <DepositAmountPopUp onClose={() => props.setOpenDepositModal(false)} />
      )} */}
      <div className={`${classes.list_header_wrapper}`}>
        {ListHeader(
          "My Cash Balance",
          balance.cashBalance?.toFixed(2),
          "Deposit",
          () => props.openDepositModal(),
          "Withdraw",
          changeModalState,
          CashBalance,
          false,
          "cash",
          "Min. Amount: $25"
        )}
        {ListHeader(
          "Power Token Balance",
          balance.tokenBalance,
          "Deposit",
          () => { },
          "Transfer",
          () => { },
          Token,
          false,
          "token",
          ""
        )}
        {ListHeader(
          "BTC Balance",
          balance.btcBalance?.toFixed(4),
          "Deposit",
          () => props.openDepositModal("BTC"),
          "Transfer",
          () => { },
          Bitcoin,
          false,
          "token",
          ""
        )}
        {ListHeader(
          "ETH Balance",
          balance.ethBalance?.toFixed(4),
          "Deposit",
          () => props.openDepositModal("ETH"),
          "Transfer",
          () => { },
          Ethereum,
          false,
          "token",
          ""
        )}
      </div>
      {/* <div className={classes.list_body}>
        {ListTitle(Ticket, true, "My non-cash prizes")}
        <ListItem title="3 nights stay at Fairmont Banff Springs" />
        <ListItem title="10 free meals at Macdonald’s" claimed={false} />
        <ListItem title="3 nights stay at Fairmont Banff Springs" />
      </div> */}


      <Modal visible={showModal} iconStyle={{ display: "none" }}>
        <div className={classes.modal_container}>
          <div className={classes.modal_header}>
            <p>Withdraw Cash</p>
            <i
              className={classes.modal_close_icon}
              onClick={changeModalState}
            ></i>
          </div>

          <div className={classes.modal_body}>
            <form onSubmit={handleFormSubmit}>
              <div
                className={`${isMobile && activeForm === 0 ? "" : classes.hidden
                  }`}
              >
                <p className={`${classes.body_header} ${classes.margin_t_10}`}>
                  Withdrawal Info
                </p>
                <div
                  className={`${classes.form_control} ${classes.margin_t_10}`}
                >
                  <div className={classes.form_amountInput}>
                    <label>
                      Withdrawal amount <span>(min $25)</span>
                    </label>
                    <Input
                      type="number"
                      value={form?.balance_amount}
                      name="balance_amount"
                      onChange={changeInputHandler}
                      icon="$"
                      white
                      bordered
                      required
                      min={25}
                      max={500}
                      is_invalid={isInvalid}
                    />
                  </div>

                  <div
                    className={`${classes.form_Input_50} ${classes.margin_l_40}`}
                  >
                    <label>Send funds to</label>
                    <Input
                      type="email"
                      placeholder="Enter your paypal email here"
                      value={form?.send_to}
                      name="send_to"
                      onChange={changeInputHandler}
                      rounded
                      white
                      block
                      bordered
                      required
                    />
                  </div>
                </div>
              </div>

              <div
                className={`${isMobile && activeForm === 1 ? "" : classes.hidden
                  }`}
              >
                <p className={`${classes.body_header} ${classes.margin_t_10}`}>
                  Billing Info
                </p>
                <div
                  className={`${classes.form_control} ${classes.margin_t_10}`}
                >
                  <div className={classes.form_Input_50}>
                    <label>Address line 1</label>
                    <Input
                      type="text"
                      placeholder="Enter address here"
                      value={form?.addr1}
                      name="addr1"
                      onChange={changeInputHandler}
                      rounded
                      white
                      block
                      bordered
                      required
                    />
                  </div>

                  <div
                    className={`${classes.form_Input_50} ${classes.margin_l_40}`}
                  >
                    <label>Address line 2</label>
                    <Input
                      type="text"
                      placeholder="Enter address here"
                      value={form?.addr2}
                      name="addr2"
                      onChange={changeInputHandler}
                      rounded
                      white
                      block
                      bordered
                      required
                    />
                  </div>
                </div>

                <div
                  className={`${classes.form_control} ${classes.margin_t_10}`}
                >
                  <div>
                    <label>Country</label>
                    <select
                      id="country"
                      name="country"
                      className={`${classes.form_dropdown_main} ${classes.form_dropdown}`}
                      title="Country"
                      value={form?.country}
                      onChange={(e) =>
                        handleCountryRegion({ name: "country", value: e.target.value })
                      }
                    >
                      <option hidden disabled value="">
                        Country
                      </option>
                      {getCountries().map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>

                    {/* <CountryDropdown
                      classes={`${classes.form_dropdown_main} ${classes.form_dropdown}`}
                      value={form?.country}
                      onChange={(val) =>
                        handleCountryRegion({ name: "country", value: val })
                      }
                      required
                      name="country"
                      valueType="short"
                    /> */}
                  </div>

                  <div className={`${classes.margin_l_40}`}>
                    <label>Provinence/State</label>
                    <select
                      className={`${classes.form_dropdown_main} ${classes.form_dropdown}`}
                      id="region"
                      name="region"
                      title="State/Province"
                      value={form?.region}
                      onChange={(e) =>
                        handleCountryRegion({ name: "region", value: e.target.value })
                      }
                    >
                      <option hidden disabled value="">
                        Provinence/State
                      </option>
                      {getStatesOrProvinces().map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {/* <RegionDropdown
                      classes={`${classes.form_dropdown_main} ${classes.form_dropdown}`}
                      country={form?.country}
                      value={form?.region}
                      onChange={(val) =>
                        handleCountryRegion({ name: "region", value: val })
                      }
                      required
                      name="region"
                    /> */}
                  </div>

                  <div className={`${classes.margin_l_40}`}>
                    <label>Postal Code</label>
                    <Input
                      type="number"
                      placeholder="Postal Code"
                      value={form?.postCode}
                      name="postCode"
                      onChange={changeInputHandler}
                      rounded
                      white
                      block
                      bordered
                      required
                    />
                  </div>
                </div>
              </div>

              <div
                className={isMobile && activeForm === 2 ? "" : classes.hidden}
              >
                <p
                  className={`${classes.body_header} ${classes.margin_t_10} ${classes.body_header_primary}`}
                >
                  Personal Info
                </p>
                <div
                  className={`${classes.form_control} ${classes.margin_t_10}`}
                >
                  <div className={classes.form_Input_50}>
                    <label>First Name</label>
                    <Input
                      type="text"
                      placeholder="First Name"
                      value={form?.fname}
                      name="fname"
                      onChange={changeInputHandler}
                      rounded
                      white
                      block
                      bordered
                      required
                    />
                  </div>

                  <div
                    className={`${classes.form_Input_50} ${classes.margin_l_40}`}
                  >
                    <label>Last Name</label>
                    <Input
                      type="text"
                      placeholder="Last Name"
                      value={form?.lname}
                      name="lname"
                      onChange={changeInputHandler}
                      rounded
                      white
                      block
                      bordered
                      required
                    />
                  </div>
                </div>

                <div
                  className={`${classes.form_control} ${classes.margin_t_10}`}
                >
                  <div
                    className={classes.form_Input_50}
                  >
                    <Select
                      data={getYearsList()}
                      value={form?.year}
                      name="year"
                      onChange={changeInputHandler}
                      label="Year"
                      white
                      required
                    />
                  </div>

                  <div
                    className={`${classes.form_Input_50} ${classes.margin_l_40}`}
                  >
                    <Select
                      data={getMonths()}
                      value={form?.month}
                      name="month"
                      onChange={changeInputHandler}
                      label="Month"
                      white
                      required
                    />
                  </div>
                  <div
                    className={`${classes.form_Input_50} ${classes.margin_l_40}`}
                  >
                    <Select
                      data={getMonthDays(`${form?.year}-${form?.month}`)}
                      value={form?.day}
                      name="day"
                      onChange={changeInputHandler}
                      label="Day"
                      white
                      required
                    />
                  </div>


                </div>
                <div className={`${classes.form_control} ${classes.margin_t_10}`}>
                  <Checkbox
                    checked={form?.termsAndConditions}
                    onChange={handleCheckBox}
                    name="termsAndConditions"
                    styles={{ color: 'black' }}
                    label={
                      <>
                        I agree to PowerPlay Systems{" "}
                        <Link to="#">Terms and Conditions</Link>
                      </>
                    }
                    required
                  />
                </div>
              </div>

              <div
                className={`${classes.form_control} ${classes.margin_t_10} ${classes.form_control_center}`}
              >
                {isMobile && activeForm !== 0 && (
                  <Button title="Back" block onClick={handleBack} bordered />
                )}
                <div className={classes.button}>
                  <Button
                    title={
                      isMobile && activeForm !== 2 ? "Next" : "Withdraw Cash"
                    }
                    // styles={{ opacity: form?.termsAndConditions ? 1 : 0.5 }}
                    block
                    type={CONSTANTS.BUTTON_TYPE.SUBMIT}
                    onClick={handleFormSubmit}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

BalanceInfoComponent.propTypes = {
  isMobile: PropTypes.bool,
};

export default BalanceInfoComponent;
