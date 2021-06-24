import React from "react";
import { Link, useHistory } from "react-router-dom";
import { isEmpty, isEqual } from "lodash";

import Input from "../../ui/Input/Input";
import Alert from "../../components/Alert";
import { redirectTo } from "../../utility/shared";
import http from "../../config/http";
import { URLS } from "../../config/urls";
import styles from "./styles.module.scss";
import formStyles from "../../scss/formstyles.module.scss";

const CreateAccount = (props) => {

    const history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault();
        const {
            username = "",
            email = "",
            password = "",
            cPassword = "",
        } = props.user || {};
        props.setUser({ ...props.user, isLoading: true });

        if (
            isEmpty(username) ||
            isEmpty(email) ||
            isEmpty(password) ||
            isEmpty(cPassword)
        ) {
            return props.setUser({
                ...props.user,
                isFailed: true,
                errorMsg: "All fields are required",
            });
        }

        if (!isEqual(password, cPassword)) {
            return props.setUser({
                ...props.user,
                isFailed: true,
                errorMsg: "Password did not match",
            });
        }

        const data = {
            email,
            password,
            username,
        };
        const response = await http.post(URLS.AUTH.VERIFY_EMAIL, data);
        if (response.data.status === false) {
            return props.setUser({
                ...props.user,
                isLoading: false,
                isFailed: true,
                errorMsg: response.data.message,
            });
        }

        redirectTo({history}, { path: "email-verification", state: data });
    };

    return (
        <div className={styles.container}>
            <form className={formStyles.root} action={null} onSubmit={onSubmit}>
                {!props.user?.isFailed && !isEmpty(props.user.errorMsg) && (
                    <Alert renderMsg={() => <p>{props.user.errorMsg}</p>} danger />
                )}
                {props.user.isFailed && !isEmpty(props.user.errorMsg) && (
                    <Alert renderMsg={() => <p>{props.user.errorMsg}</p>} danger />
                )}

                {props.user.isSuccess && !isEmpty(props.user.errorMsg) && (
                    <Alert renderMsg={() => <p>{props.user.errorMsg}</p>} success />
                )}

                <Input
                    type="text"
                    title="Display Name"
                    id="username"
                    value={props.user.username}
                    onChange={(e) => {
                        props.setUser({ ...props.user, username: e?.target?.value });
                    }}
                />
                <Input
                    type="email"
                    title="E-mail"
                    id="email"
                    value={props.user.email}
                    onChange={(e) => {
                        props.setUser({ ...props.user, email: e?.target?.value });
                    }}
                />
                <Input
                    type="password"
                    title="Create-a-password"
                    id="password"
                    value={props.user.password}
                    onChange={(e) => {
                        props.setUser({ ...props.user, password: e?.target?.value });
                    }}
                />
                <Input
                    type="password"
                    title="Confirm your password"
                    id="confirmpassword"
                    value={props.user.cPassword}
                    onChange={(e) => {
                        props.setUser({ ...props.user, cPassword: e?.target?.value });
                    }}
                />
                <button className={formStyles.button} disabled={props.user.isLoading}>
                    {props.user.isLoading ? "Loading..." : "Next"}
                </button>
            </form>
            <p className={styles.blogSection}>
                Already have an account? <Link to="/login">Log in!</Link>
            </p>
        </div>
    );
};

export default CreateAccount;