import React, { useEffect } from "react";
import * as $ from "jquery";
import { useHistory } from "react-router-dom";

import { getLocalStorage, redirectTo } from "../../utility/shared";
import { CONSTANTS } from "../../utility/constants";
import { socket } from "../../config/server_connection";

import "./userGateway.css";

let _socket = null;

const PSiGateway = (props) => {
    const history = useHistory();
    const {
        location: { state },
    } = props;

    const user_id = getLocalStorage("PERSONA_USER_ID");
    const token = getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER);

    useEffect(() => {
        _socket = socket();
        return function cleanUp() {
            _socket = null;
        };
    }, []);

    useEffect(() => {
        _socket?.on(CONSTANTS.SOCKET_EVENTS.PAYMENT.SUCCESS, () => {
            redirectTo(
                { history },
                {
                    path: `${state.previousPath}`,
                }
            );
        });
    }, [_socket]);

    useEffect(() => {
        const script = document.createElement("script");

        script.src = "https://api.myuser.com/js/checkout.js";

        document.body.appendChild(script);

        setTimeout(async () => {
            $(".myuserPay-Paybutton").click();
        }, 1000);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            <form action='https://stagingcheckout.psigate.com/HTMLPost/HTMLMessenger' method="post">
                MerchantID: <input type="text" name="MerchantID" value="merchantcardcapture200024" /><br />
                CustomerRefNo: <input type="text" name="CustomerRefNo" value="32323232" /><br />
                PaymentType: <input type="text" name="PaymentType" value="DB" /><br />
                TestResult: <input type="text" name="TestResult" value="" /><br />
                OrderID: <input type="text" name="OrderID" value="" /><br />
                UserID: <input type="text" name="UserID" value="User1" /><br />
                CardAction: <input type="text" name="CardAction" value="0" /><br />
                CardNumber: <input type="text" name="CardNumber" value="2624970525726523" /><br />
                Email: <input type="text" name="Email" value="someone@somewhere.com" /><br />
                CardExpMonth: <input type="text" name="CardExpMonth" value="06" /><br />
                CardExpYear: <input type="text" name="CardExpYear" value="2022" /><br />
                Tax1: <input type="text" name="Tax1" value="5" /><br />
                ShippingTotal: <input type="text" name="ShippingTotal" value="6" /><br />
                SubTotal: <input type="text" name="SubTotal" value="8" /><br />

                <input type="hidden" name="ThanksURL" value={`${process.env.REACT_APP_API_URL}/api/v1/users/catch-thanks-url`} />
                <input type="hidden" name="NoThanksURL" value={`${process.env.REACT_APP_API_URL}/api/v1/users/catch-nothanks-url`} />

                {/* <input type="hidden" name="ThanksURL" value="https://stagingcheckout.psigate.com/HTMLPost/generic_nothankyou.jsp" />
        <input type="hidden" name="NoThanksURL" value="https://stagingcheckout.psigate.com/HTMLPost/generic_nothankyou.jsp" /> */}
                <input type="submit" value="Buy Now" />
            </form>

            <div className="loder">
                <span className="load"></span>
            </div>
        </>
    );
};

export default PSiGateway;
