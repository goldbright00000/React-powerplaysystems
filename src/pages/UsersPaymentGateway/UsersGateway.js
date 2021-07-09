import React, { useEffect } from "react";

const UsersGateway = (props) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://api.myuser.com/js/checkout.js";
    // script.class = "myuserPay-button";
    // script["data-public_key"] = "pk_test_ec9f2b75856a42dfad48ed4e9e2481c1";
    // script["data-amount"] = "10000";
    // script["data-description"] = "description of item";
    // script["data-name"] = "Item name";
    // script["data-image"] = "Item or your picture,logo";
    // script["data-submit-ajax"] = "1";
    // script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <form action="your-server-side-code" method="post">
      <script
        // src="https://api.myuser.com/js/checkout.js"
        class="myuserPay-button"
        data-public_key="pk_live_d1d851bed345b8ff9256568ffd603fa9"
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
