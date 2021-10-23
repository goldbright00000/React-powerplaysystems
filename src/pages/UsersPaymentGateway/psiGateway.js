import React, { useEffect } from "react";
import * as $ from "jquery";
import { useHistory } from "react-router-dom";

import { getLocalStorage, redirectTo } from "../../utility/shared";
import { CONSTANTS } from "../../utility/constants";
import { socket } from "../../config/server_connection";

import "./psiGateway.css";

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
            <form action='https://stagingcheckout.psigate.com/HTMLPost/HTMLMessenger' method="post" className="main-form">
                {/* <div className="form-input">
                    <p>MerchantID:</p><input type="text" name="MerchantID" value="merchantcardcapture200024" />
                </div>
                <div className="form-input">
                    <p>CustomerRefNo:</p> <input type="text" name="CustomerRefNo" value="32323232" /><br />
                </div>
                <div className="form-input">
                    <p>PaymentType:</p> <input type="text" name="PaymentType" value="DB" /><br />
                </div>
                <div className="form-input">
                    <p>TestResult:</p> <input type="text" name="TestResult" value="" /><br />
                </div>
                <div className="form-input">
                    <p>OrderID:</p> <input type="text" name="OrderID" value="" /><br />
                </div>
                <div className="form-input">
                    <p>UserID:</p> <input type="text" name="UserID" value="User1" /><br />
                </div>
                <div className="form-input">
                    <p>CardAction:</p> <input type="text" name="CardAction" value="0" /><br />
                </div> */}
                <div className="form-input">
                    <p>CardNumber:</p> <input type="text" name="CardNumber" value="2624970525726523" /><br />
                </div>
                <div className="form-input">
                    <p>Email:</p> <input type="text" name="Email" value="someone@somewhere.com" /><br />
                </div>
                <div className="form-input">
                    <p>CardExpMonth:</p> <input type="text" name="CardExpMonth" value="06" /><br />
                </div>
                <div className="form-input">
                    <p>CardExpYear:</p> <input type="text" name="CardExpYear" value="2022" /><br />
                </div>
                <div className="form-input">
                    <p>Tax1:</p> <input type="text" name="Tax1" value="5" /><br />
                </div>
                <div className="form-input">
                    <p>ShippingTotal:</p> <input type="text" name="ShippingTotal" value="6" /><br />
                </div>
                <div className="form-input">
                    <p>SubTotal:</p> <input type="text" name="SubTotal" value="8" /><br />
                </div>

                <input type="hidden" name="ThanksURL" value={`${process.env.REACT_APP_API_URL}/api/v1/users/catch-thanks-url`} />
                <input type="hidden" name="NoThanksURL" value={`${process.env.REACT_APP_API_URL}/api/v1/users/catch-nothanks-url`} />

                {/* <input type="hidden" name="ThanksURL" value="https://stagingcheckout.psigate.com/HTMLPost/generic_nothankyou.jsp" />
                <input type="hidden" name="NoThanksURL" value="https://stagingcheckout.psigate.com/HTMLPost/generic_nothankyou.jsp" /> */}
                <div className="form-btn">
                    <input type="submit" value="Buy Now" />
                </div>
            </form>
        </>
    );
};

export default PSiGateway;
