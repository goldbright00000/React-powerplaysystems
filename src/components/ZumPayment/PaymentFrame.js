import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MyUserPay from 'myuserpay';

import styles from "./paymentFrame.module.scss";

import {
  fetchUserBalance,
  REMOVE_ZUM_REDIRECT_URL,
  sendZumTransaction,
} from "../../actions/userActions";
import { showToast } from "../../actions/uiActions";

const PaymentFrame = (props) => {
  const dispatch = useDispatch();
  const [previousPath] = useState(props.location?.state?.previousPath);

  window.addEventListener("message", function (e) {
    var data = e.data;
    if (data && data.origin && data.origin === "ZUM_RAILS") {
      // call action for pushing the transaction to backend
      const { transactionId } = data;

      if (transactionId) {
        dispatch(sendZumTransaction(transactionId, markupRate));
      }
    }
  });
  const frameUrl = useSelector((state) => state.user?.zumRedirectUrl);
  const markupRate = useSelector((state) => state.user?.markedUpRate);
  if (!frameUrl) {
    props.history.push(previousPath ? previousPath : "/");
  }

  const handleClick = (e) => {

  }

  useEffect(() => {
    console.log('handleClick');
    const script = document.createElement("script");

    script.src = "https://api.myuser.com/js/checkout.js";
    script.async = true;
    script.type = "text/javascript";

    MyUserPay.setKey('pk_test_ec9f2b75856a42dfad48ed4e9e2481c1');
    var element_num = MyUserPay.createElement(styles["checkout-form"], { style: styles, amount: 100 });

    console.log('element-num', element_num);

    document.body.appendChild(script);
  })

  return (
    <>
      {/* <form action="your-server-side-code" method="post">
        <script
          src="https://api.myuser.com/js/checkout.js"
          class="myuserPay-button"
          data-public_key="pk_test_ec9f2b75856a42dfad48ed4e9e2481c1"
          data-amount="10000"
          data-description="description of item"
          data-name="Item name"
          data-image="Item or your picture,logo"
          data-submit-ajax="1">
        </script>
      </form> */}

      {/* <script type="text/javascript" src="https://api.myuser.com/js/checkout.js" ></script> */}

      {/* <form onSubmit={handleClick} method="post">
        <button data-amount="100"
          class="myuserPay-button"
          data-button-text="Button 1"></button>
      </form>
      <form action="your-server-side-code" method="post">
        <button data-amount="200"
          class="myuserPay-button"
          data-button-text="Button 2"></button>
      </form>
      <script src="https://api.myuser.com/js/checkout.js"
        data-public_key="pk_test_ec9f2b75856a42dfad48ed4e9e2481c1"
        data-description="description of item"
        data-name="Company Name"
        data-image="Your logo url"
        data-submit-ajax="1" >
      </script> */}
      {/* <script>{myUY.render_buttons()}</script> */}

      {/* <iframe
        src={frameUrl}
        width="100%"
        style={{
          minHeight: "100vh",
          display: "block",
          overflow: "hidden",
          border: "0",
        }}
        title="Payment Frame"
      /> */}

      {/* <script src="https://api.myuser.com/js/checkout.js"></script>
      <script type="text/javascript"> */}

      <form>
        <div id={styles["checkout-form"]}></div>
        <button id="example_submit_button"
          onclick={(e) => {
            console.log('onClick');
            handleClick(e);
          }}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default PaymentFrame;
