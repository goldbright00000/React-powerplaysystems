import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Link } from "react-router-dom";

import classes from "./index.module.scss";
import Button from "../Button";
import Ticket from "../../icons/Ticket";
import Token from "../../assets/token.png";
import Money from "../../icons/Money";
import ListItem from "./ListItem";
import Modal from "../Modal";
import Input from "../Input";
import Checkbox from "../Checkbox";
import Select from "../Select";
import { getDays, getMonthDays, getYearsList } from "../../utility/shared";
import { CONSTANTS } from "../../utility/constants";

const ListTitle = (Icon, isSvg, title) => (
  <span className={classes.list_left_side_1}>
    {Icon && isSvg ? (
      <Icon />
    ) : (
      Icon && !isSvg && <img src={Icon} width={34} height={34} />
    )}
    <span>{title}</span>
  </span>
);

const ListHeader = (
  title,
  balance,
  btnTitle,
  onClick,
  Icon,
  isSvg,
  balanceType
) => {
  return (
    <div className={classes.list_container}>
      <div className={classes.list_left_side}>
        {ListTitle(Icon, isSvg, title)}
        <span className={classes.span}>
          {balanceType == "cash" ? "$" : ""}
          {balance}
        </span>
      </div>

      <div className={classes.list_right_side}>
        <Button title={btnTitle} onClick={onClick} />
        <span>Min. Amount: $100</span>
      </div>
    </div>
  );
};

function BalanceInfoComponent(props) {
  const [form, setForm] = useState({});
  const [showModal, setModalState] = useState(false);
  const [activeForm, setActiveForm] = useState(0);

  const { isMobile = false } = props || {};
  const { balance = {} } = props || {};

  useEffect(() => {
    console.log(balance);
  }, []);
  const changeInputHandler = (e) => {
    const { target: { value = "", name = "" } = {} } = e || {};

    setForm({ ...form, [name]: value });
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
    }

    console.log("withdraw");
  };

  const handleBack = () => {
    if (activeForm > 0) {
      let _active = activeForm;
      setActiveForm(_active - 1);
    }
  };

  return (
    <>
      <div className={classes.list_header_wrapper}>
        {ListHeader(
          "My Cash Balance",
          balance.cashBalance,
          "Withdraw",
          changeModalState,
          Money,
          true,
          "cash"
        )}
        {ListHeader(
          "My Token Balance",
          balance.tokenBalance,
          "Transfer to Wallet",
          () => {},
          Token,
          false,
          "token"
        )}
      </div>
      <div className={classes.list_body}>
        {ListTitle(Ticket, true, "My non-cash prizes")}
        <ListItem title="3 nights stay at Fairmont Banff Springs" />
        <ListItem title="10 free meals at Macdonald’s" claimed={false} />
        <ListItem title="3 nights stay at Fairmont Banff Springs" />
      </div>

      <Modal visible={showModal}>
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
                className={`${
                  isMobile && activeForm === 0 ? "" : classes.hidden
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
                      Withdrawal amount <span>(min $100)</span>
                    </label>
                    <Input
                      type="number"
                      value={form?.amount}
                      name="amount"
                      onChange={changeInputHandler}
                      icon="$"
                      white
                      bordered
                      required
                    />
                  </div>

                  <div
                    className={`${classes.form_Input_50} ${classes.margin_l_40}`}
                  >
                    <label>Send funds to</label>
                    <Input
                      type="email"
                      placeholder="Enter your paypal email here"
                      value={form?.funds}
                      name="funds"
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
                className={`${
                  isMobile && activeForm === 1 ? "" : classes.hidden
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
                    <CountryDropdown
                      classes={`${classes.form_dropdown_main} ${classes.form_dropdown}`}
                      value={form?.country}
                      onChange={(val) =>
                        handleCountryRegion({ name: "country", value: val })
                      }
                      required
                      name="country"
                      valueType="short"
                    />
                  </div>

                  <div className={`${classes.margin_l_40}`}>
                    <label>Provinence</label>
                    <RegionDropdown
                      classes={`${classes.form_dropdown_main} ${classes.form_dropdown}`}
                      country={form?.country}
                      value={form?.region}
                      onChange={(val) =>
                        handleCountryRegion({ name: "region", value: val })
                      }
                      required
                      name="region"
                    />
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
                  <div className={classes.form_Input_50}>
                    <Select
                      data={getDays()}
                      value={form?.day}
                      name="day"
                      onChange={changeInputHandler}
                      label="Day"
                      white
                      required
                    />
                  </div>

                  <div
                    className={`${classes.form_Input_50} ${classes.margin_l_40}`}
                  >
                    <Select
                      data={getMonthDays()}
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
                      data={getYearsList()}
                      value={form?.year}
                      name="year"
                      onChange={changeInputHandler}
                      label="Year"
                      white
                      required
                    />
                  </div>
                </div>
                <div
                  className={`${classes.form_control} ${classes.margin_t_10}`}
                >
                  <Checkbox
                    checked={form?.termsAndConditions}
                    onChange={handleCheckBox}
                    name="termsAndConditions"
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
