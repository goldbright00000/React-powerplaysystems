import React, { useEffect } from "react";

const UsersGateway = (props) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://api.myuser.com/js/checkout.js";

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <form action="http://localhost:4000/api/v1/users/account/update-myuserpay-balance" method="post">
      <script
        class="myuserPay-button"
        data-public_key="pk_test_ec9f2b75856a42dfad48ed4e9e2481c1"
        data-amount="100"
        data-description="description of item"
        data-name="Defy Games Demo"
        data-image="Item or your picture,logo"
        data-submit-ajax="1"
      ></script>
    </form>
  );
};

export default UsersGateway;
