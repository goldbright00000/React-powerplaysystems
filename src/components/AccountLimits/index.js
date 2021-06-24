import React, { useState } from "react";
import classes from "./index.module.scss";
import { setAccountLimit } from "../../actions/userActions";
import { useDispatch } from "react-redux";
import CloseIconGrey from "../../assets/close-icon-grey.png";
import InfoIconOrange from "../../assets/icons/info-icon.png";

const AccountLimits = (props) => {
  const { isMobile = false } = props || {};
  const dispatch = useDispatch();
  let { accountLimit = {} } = props || {};

  let handleLimitChanges = (e) => {
    if (e.target.value === "") accountLimit[e.target.name] = null;
    else accountLimit[e.target.name] = e.target.value;
  };

  let handleApplyLimitChanges = () => {
    dispatch(setAccountLimit(accountLimit));
  };

  const renderLimitsAndAlerts = (
    key,
    info,
    alertFieldLabel,
    limitFieldLabel,
    fieldType
  ) => {
    return (
      <div className={classes.__deposit_limits_and_alerts_content} key={key}>
        {isMobile ? null : <div className={classes.__info}>{info}</div>}
        <div className={classes.__input_field}>
          <div>
            <div>{alertFieldLabel}</div>
            <input
              defaultValue={accountLimit?.[`${fieldType}Alert`]}
              name={`${fieldType}Alert`}
              type="number"
              className={classes.__input}
              placeholder="No Limit"
              onChange={handleLimitChanges}
            />
          </div>
        </div>
        <div className={classes.__input_field}>
          <div className="mx-2">
            <div>{limitFieldLabel}</div>
            <input
              defaultValue={accountLimit?.[`${fieldType}Limit`]}
              name={`${fieldType}Limit`}
              type="number"
              className={classes.__input}
              placeholder="No Limit"
              onChange={handleLimitChanges}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderMobileInputs = (key, fieldLabel, fieldType) => {
    return (
      <div className={classes.__input_field} key={key}>
        <div>
          <div>{fieldLabel}</div>
          <input
            defaultValue={accountLimit?.[`${fieldType}`]}
            name={`${fieldType}`}
            type="number"
            className={`${classes.__input} w-100`}
            placeholder="No Limit"
            onChange={handleLimitChanges}
          />
        </div>
      </div>
    );
  };

  let [infoType, setInfoType] = useState("DepostAlert");
  const [showInfoModal, setInfoModal] = useState(false);
  const infoModal = () => {
    let info = [];
    if (infoType === "DepositAlert") {
      info = [
        <span>Deposit Alerts</span>,
        <br />,
        "Deposit Alerts will trigger an email if the set threshold is exceeded. Alerts will not restrict future deposits that exceed the threshold.",
        <br />,
        <br />,
        "Limitations will take effect at 12:01 AM on the following day.",
      ];
    } else if (infoType === "DepositLimit") {
      info = [
        <span>Deposit Limits</span>,
        <br />,
        "Deposit Limits will restrict the amount available for deposit over a given time period. Once a limit has been set, it cannot be changed for 90 calendar days.",
        <br />,
        <br />,
        "Limitations will take effect at 12:01 AM on the following day.",
      ];
    } else if (infoType === "EntryFeeLimit") {
      info = [
        <span>Entry Fee Limit</span>,
        <br />,
        "Setting an entry fee limit prevents you from joining a contest that has an entry fee exceeding the limit you establish. Once you have set an limit you will be restricted from increasing your limit for 90 calendar days.",
        <br />,
      ];
    }

    return (
      <>
        {showInfoModal && (
          <div className={classes.wrapper}>
            <div className={classes.__info_modal}>
              <div className={classes.__close_icon}>
                <img
                  src={CloseIconGrey}
                  width="20px"
                  height="20px"
                  onClick={() => setInfoModal(false)}
                />
              </div>
              <br />
              <div className={classes.__info}>{info}</div>
              <br />
              <br />
              <div className={classes.__apply_btn_div}>
                <button onClick={() => setInfoModal(false)}>Got it!</button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div className={classes.__account_limits}>
        {isMobile ? null : (
          <>
            <div className={classes.__main_description}>
              <p>
                Setting a personal user limit is a tool that can assist in
                managing your play in a healthy and responsible way. You can
                change your limits at any time but there'll be a 90 day
                restriction before you can increase your limit afterwards.
              </p>
              <p>
                Below you have the option to limit yourself in a variety of ways
                to make sure that you are spending your time on PowerPlay
                appropriately.
              </p>
            </div>

            <div className={classes.__main_title}>
              Deposit Limits and Alerts{" "}
              {isMobile ? (
                <img
                  style={{ alignSelf: "center" }}
                  src={InfoIconOrange}
                  width="20px"
                  height="20px"
                  onClick={() => {
                    setInfoModal(true);
                    setInfoType("DepositAlert");
                  }}
                />
              ) : null}
            </div>
            {renderLimitsAndAlerts(
              1,
              [
                <span>Deposit alerts</span>,
                " will trigger an email if the set threshold is exceeded. Alerts will not restrict future deposits that exceed the threshold.",
              ],
              "Set Daily Alert",
              "Set Daily Limit",
              "daily"
            )}
            {renderLimitsAndAlerts(
              2,
              [
                <span>Deposit limits</span>,
                " will restrict the amount available for deposit over a given time period. Once a limit has been set, it cannot be changed for 90 calendar days.",
              ],
              "Set Weekly Alert",
              "Set Weekly Limit",
              "weekly"
            )}
            {renderLimitsAndAlerts(
              3,
              "Limitations will take effect at 12:01 AM on the following day.",
              "Set Monthly Alert",
              "Set Monthly Limit",
              "monthly"
            )}
          </>
        )}
        {isMobile ? (
          <div className="container-fluid">
            <div className={classes.__main_title}>
              Deposit Alerts{" "}
              <img
                style={{ alignSelf: "center" }}
                src={InfoIconOrange}
                width="20px"
                height="20px"
                onClick={() => {
                  setInfoModal(true);
                  setInfoType("DepositAlert");
                }}
              />
            </div>

            <div className={`${classes.__input_field_div} row`}>
              <div className="col my-1">
                {renderMobileInputs(1, "Set Daily Alert", "dailyAlert")}
              </div>
              <div className="col my-1">
                {renderMobileInputs(1, "Set Weekly Alert", "weeklyAlert")}
              </div>
              <div className="col-auto my-1">
                {renderMobileInputs(1, "Set Monthly Alert", "monthlyAlert")}
              </div>
            </div>

            <div className={classes.__main_title}>
              Deposit Limits{" "}
              <img
                style={{ alignSelf: "center" }}
                src={InfoIconOrange}
                width="20px"
                height="20px"
                onClick={() => {
                  setInfoModal(true);
                  setInfoType("DepositLimit");
                }}
              />
            </div>

            <div className={`${classes.__input_field_div} row`}>
              <div className="col my-1">
                {renderMobileInputs(1, "Set Daily Limit", "dailyLimit")}
              </div>
              <div className="col my-1">
                {renderMobileInputs(1, "Set Weekly Limit", "weeklyLimit")}
              </div>
              <div className="col-auto my-1">
                {renderMobileInputs(1, "Set Monthly Limit", "monthlyLimit")}
              </div>
            </div>
            <br />
          </div>
        ) : null}
        <div className={classes.__apply_btn_div}>
          <button onClick={handleApplyLimitChanges}>Apply</button>
        </div>
        <div className={`${classes.__main_title} container-fluid`}>
          Entry Fee Limit{" "}
          {isMobile ? (
            <img
              style={{ alignSelf: "center" }}
              src={InfoIconOrange}
              width="20px"
              height="20px"
              onClick={() => {
                setInfoModal(true);
                setInfoType("EntryFeeLimit");
              }}
            />
          ) : null}
        </div>
        <div className={`${classes.__entry_fee_limit}`}>
          {isMobile ? null : (
            <div className={classes.__info}>
              Setting an entry fee limit prevents you from joining a contest
              that has an entry fee exceeding the limit you establish. Once you
              have set an limit you will be restricted from increasing your
              limit for 90 calendar days.
            </div>
          )}
          <div className={`${classes.__input_field} container-fluid`}>
            <div>
              <div>Entry Fee Limit </div>
              <input
                defaultValue={accountLimit?.entryFeeLimit}
                name="entryFeeLimit"
                type="number"
                className={`${classes.__input} w-100`}
                placeholder="No Limit"
                onChange={handleLimitChanges}
              />
            </div>
          </div>
        </div>
        <div className={classes.__apply_btn_div}>
          <button onClick={handleApplyLimitChanges}>Apply</button>
        </div>
        {isMobile ? (
          <div className={classes.__main_description}>
            <p>
              Setting a personal user limit is a tool that can assist in
              managing your play in a healthy and responsible way. You can
              change your limits at any time but there'll be a 90 day
              restriction before you can increase your limit afterwards.
            </p>
            <p>
              Below you have the option to limit yourself in a variety of ways
              to make sure that you are spending your time on PowerPlay
              appropriately.
            </p>
          </div>
        ) : null}
      </div>
      {showInfoModal && infoModal()}
    </>
  );
};

export default AccountLimits;
