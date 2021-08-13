import React, { useEffect } from "react";
import * as $ from 'jquery';

const UsersGateway = (props) => {

  const { location: { state } } = props

  const user_id = localStorage.getItem('PERSONA_USER_ID')

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://api.myuser.com/js/checkout.js";

    document.body.appendChild(script);

    setTimeout(async () => {
      $('input[name="token"]').val("abc");
      $('.myuserPay-Paybutton').click();

    }, 1000);

    return () => {
      document.body.removeChild(script);
    };

  }, []);

  return (
    <form action={`http://localhost:4000/api/v1/users/account/update-myuserpay-balance/${user_id}/${state.amount}`} method="post">
      <input type="hidden" name="headers[Authorization]" value="Bearer 123" />
      <script
        class="myuserPay-button"
        data-public_key={process.env.REACT_APP_MYUSERPAY_PUBLIC_KEY}
        data-amount={state.amount * 100}
        data-description="description of item"
        data-name="Defy Games Demo"
        data-image="Item or your picture,logo"
        data-submit-ajax="1"
      ></script>
    </form>
  );
};

export default UsersGateway;
