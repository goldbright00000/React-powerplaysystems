import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  REMOVE_ZUM_REDIRECT_URL,
  sendZumTransaction,
} from "../../actions/userActions";
import { showToast } from "../../actions/uiActions";

const PaymentFrame = (props) => {
  const dispatch = useDispatch();
  const [previousPath] = useState(props.location?.state?.previousPath);

  console.log(props);

  window.addEventListener("message", function (e) {
    var data = e.data;
    if (data && data.origin && data.origin === "ZUM_RAILS") {
      // call action for pushing the transaction to backend
      const { transactionId } = data;

      dispatch({ type: REMOVE_ZUM_REDIRECT_URL });
      if (transactionId) {
        dispatch(sendZumTransaction(transactionId, markupRate));
        dispatch(
          showToast(
            "Payment succesfull. Your balance will be updated soon.",
            "success"
          )
        );
      } else {
        dispatch(
          showToast("Some error occured during the transaction.", "error")
        );
      }
    }
  });
  const frameUrl = useSelector((state) => state.user?.zumRedirectUrl);
  const markupRate = useSelector((state) => state.user?.markedUpRate);
  if (!frameUrl) {
    props.history.push(previousPath ? previousPath : "/");
  }

  return (
    <iframe
      src={frameUrl}
      width="100%"
      style={{
        minHeight: "100vh",
        display: "block",
        overflow: "hidden",
        border: "0",
      }}
      title="Payment Frame"
    />
  );
};

export default PaymentFrame;
