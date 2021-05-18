import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from '../Modal';
import CloseIconGrey from '../../assets/close-icon-grey.png';

import classes from "./index.module.scss";

function AccountInfo(props) {
  const { isMobile = false } = props || {};
  const { user = {} } = props || {};
  const [showDeleteAccountModal, setDeleteAccountModal] = useState(false);
  const [editItem, setEditItem] = useState(-1);

  console.log('USER', user);

  const deleteAccountModal = () => {
    return (
      <Modal visible={showDeleteAccountModal}>
        <div className={classes.__delete_account_modal}>
          <div className={classes.__close_icon}>
            <img src={CloseIconGrey} width="20px" height="20px" onClick={() => setDeleteAccountModal(false)} />
          </div>
          <div className={classes.__confirmation_message_div}>
              <div className={classes.__message}>
                Are you sure you want to delete your account? 
              </div>
          </div>
          <div className={classes.__confirmation_info_div}>
            <div className={classes.__info}>
              All your information will be deleted and cannot be recovered. Enter your password to proceed:
            </div>
          </div>
          <div className={classes.__input_and_btn}>
            <div>
              <input type="text" className={classes.__password_input} placeholder="Password" />
            </div>
            <div>
              <button className={classes.__delete_account_btn}>Delete my account</button>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  const renderItem = (id, title, value, buttonTitle, onButtonClick = () => {}) => {
    return (
      <div className={classes.list_item}>
        <span>{title}</span>
        <span>
          {
            buttonTitle == "Edit"
            &&
            <>
              {
                id == editItem
                ?
                <div className={classes.edit_input}>
                  {
                    value
                    &&
                    <span>{value}</span>
                  }
                <input type="text" />
                </div>
                :
                <span>{value}</span>
              } 
            </>
          }
          <button onClick={onButtonClick}>
            {id == editItem ? "Save" : buttonTitle}
          </button>
        </span>
      </div>
    );
  };

  return (
    <div className={classes.list_container}>
      {renderItem(1, "First Name", user.first_name, "Edit", () => setEditItem(1))}
      {renderItem(2, "Last Name", user.last_name, "Edit", () => setEditItem(2))}
      {renderItem(3, "Display Name", user.display_name, "Edit", () => setEditItem(3))}
      {renderItem(4, "Email", user.email, "Edit", () => setEditItem(4))}
      {renderItem(5, "Date of Birth", user.date_of_birth, "Edit", () => setEditItem(5))}
      {renderItem(6, "Country", user.country, "Edit", () => setEditItem(6))}
      {renderItem(7,
        isMobile ? "Province" : "Province/State/Territory",
        user.state_or_province, "Edit", () => setEditItem(7)
      )}
      {renderItem(8, "Change Password", "", "Change")}
      {renderItem(9, "Delete Account", "", "Delete", () => setDeleteAccountModal(true))}
      {
        showDeleteAccountModal
        &&
        deleteAccountModal()
      }
    </div>
  );
}

AccountInfo.propTypes = {
  isMobile: PropTypes.bool,
};

export default AccountInfo;
