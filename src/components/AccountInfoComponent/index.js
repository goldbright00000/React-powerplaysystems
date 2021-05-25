import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../Modal";
import CloseIconGrey from "../../assets/close-icon-grey.png";
import classes from "./index.module.scss";
import {
  updateUser,
  deleteUserAccount,
  changeAccountPassword,
} from "../../actions/authActions";
import { useDispatch } from "react-redux";

function AccountInfo(props) {
  const { isMobile = false } = props || {};
  let { user = {} } = props || {};
  const [showDeleteAccountModal, setDeleteAccountModal] = useState(false);
  const [showChangePasswordModal, setChangePasswordModal] = useState(false);
  const [editItem, setEditItem] = useState(-1);

  const dispatch = useDispatch();

  let [password, setPassword] = useState();
  let deleteAccount = () => {
    setDeleteAccountModal(false);
    return dispatch(deleteUserAccount({ password }));
  };

  const deleteAccountModal = () => {
    return (
      <Modal visible={showDeleteAccountModal}>
        <div className={classes.__delete_account_modal}>
          <div className={classes.__close_icon}>
            <img
              src={CloseIconGrey}
              width="20px"
              height="20px"
              onClick={() => setDeleteAccountModal(false)}
            />
          </div>
          <div className={classes.__confirmation_message_div}>
            <div className={classes.__message}>
              Are you sure you want to delete your account?
            </div>
          </div>
          <div className={classes.__confirmation_info_div}>
            <div className={classes.__info}>
              All your information will be deleted and cannot be recovered.
              Enter your password to proceed:
            </div>
          </div>
          <div className={classes.__input_and_btn}>
            <div>
              <input
                type="password"
                className={classes.__password_input}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                className={classes.__delete_account_btn}
                onClick={deleteAccount}
              >
                Delete my account
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  let [oldPassword, setOldPassword] = useState();
  let [newPassword, setNewPassword] = useState();
  let [confirmNewPassword, setConfirmNewPassword] = useState();

  let [msg, setMsg] = useState();

  let changePassword = () => {
    if (newPassword === confirmNewPassword && newPassword) {
      setChangePasswordModal(false);
      return dispatch(changeAccountPassword(oldPassword, newPassword));
    } else {
      setMsg("New Password and Confirm Password does not match");
      setTimeout(() => {
        setMsg();
      }, 2000);
    }
  };

  const changePasswordModal = () => {
    return (
      <Modal visible={showChangePasswordModal}>
        <div className={classes.__change_password_modal}>
          <div className={classes.__close_icon}>
            <img
              src={CloseIconGrey}
              width="20px"
              height="20px"
              onClick={() => setChangePasswordModal(false)}
            />
          </div>
          <div className={classes.__confirmation_message_div}>
            <div className={classes.__message}>Change Password</div>
          </div>

          <div className={classes.__input_and_btn}>
            <div className={classes.__info}>Old Password</div>
            <div>
              <input
                type="password"
                className={classes.__password_input}
                placeholder="Password"
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
          </div>

          <div className={classes.__input_and_btn}>
            <div className={classes.__info}>New Password</div>
            <div>
              <input
                type="password"
                className={classes.__password_input}
                placeholder="Password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>

          <div className={classes.__input_and_btn}>
            <div className={classes.__info}>Confirm New Password</div>
            <div>
              <input
                type="password"
                className={classes.__password_input}
                placeholder="Password"
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
          </div>

          <div className={classes.__input_and_btn}>
            <div>
              <button
                className={classes.__delete_account_btn}
                onClick={changePassword}
              >
                Change Password
              </button>
            </div>
          </div>
          <br />
        </div>
      </Modal>
    );
  };

  let [editedValue, setEditedValue] = useState();
  const renderItem = (
    id,
    title,
    value,
    buttonTitle,
    onButtonClick = () => {}
  ) => {
    return (
      <div className={classes.list_item}>
        <span>{title}</span>
        <span>
          {buttonTitle == "Edit" && (
            <>
              {id == editItem ? (
                <div className={classes.edit_input}>
                  {value && <span>{value}</span>}
                  <input
                    type="text"
                    onChange={(e) => setEditedValue(e.target.value)}
                  />
                </div>
              ) : (
                <span>{value}</span>
              )}
            </>
          )}
          <button
            onClick={() => {
              if (id === editItem) {
                if (editedValue) {
                  if (id === 1) onSave("first_name");
                  if (id === 2) onSave("last_name");
                  if (id === 3) onSave("display_name");
                  if (id === 4) onSave("email");
                  if (id === 5) onSave("date_of_birth");
                  if (id === 6) onSave("country");
                  if (id === 7) onSave("state_or_province");
                } else {
                  setEditItem(-1);
                }
              } else onButtonClick();
            }}
          >
            {id == editItem ? "Save" : buttonTitle}
          </button>
        </span>
      </div>
    );
  };

  const onSave = (field) => {
    let data = { ...user };
    data[field] = editedValue;
    dispatch(updateUser(data));
    setEditItem(-1);
    setEditedValue();
  };
  return (
    <div className={classes.list_container}>
      {renderItem(1, "First Name", user.first_name, "Edit", () =>
        setEditItem(1)
      )}
      {renderItem(2, "Last Name", user.last_name, "Edit", () => setEditItem(2))}
      {renderItem(3, "Display Name", user.display_name, "Edit", () =>
        setEditItem(3)
      )}
      {renderItem(4, "Email", user.email, "Edit", () => setEditItem(4))}
      {renderItem(5, "Date of Birth", user.date_of_birth, "Edit", () =>
        setEditItem(5)
      )}
      {renderItem(6, "Country", user.country, "Edit", () => setEditItem(6))}
      {renderItem(
        7,
        isMobile ? "Province" : "Province/State/Territory",
        user.state_or_province,
        "Edit",
        () => setEditItem(7)
      )}
      {renderItem(8, "Change Password", "", "Change", () =>
        setChangePasswordModal(true)
      )}
      {renderItem(9, "Delete Account", "", "Delete", () =>
        setDeleteAccountModal(true)
      )}
      {showDeleteAccountModal && deleteAccountModal()}
      {showChangePasswordModal && changePasswordModal()}
    </div>
  );
}

AccountInfo.propTypes = {
  isMobile: PropTypes.bool,
};

export default AccountInfo;
