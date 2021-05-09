import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles.module.scss'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import SignInImage from '../../assets/signin-background.png'
import Input from "../../ui/Input/Input";
import { CONSTANTS } from '../../utility/constants'
import { authenticate } from '../../actions/authActions';
import Alert from '../../components/Alert';
import { isEmpty } from 'lodash';
import { getLocalStorage, redirectTo } from '../../utility/shared';
import formStyles from '../../scss/formstyles.module.scss';
import HeroSection from "../../components/CreateAccountsHeroSection/HeroSection";

function LoginPage(props) {
    const [user, setUser] = useState({ email: '', password: '' });

    const dispatch = useDispatch();
    const { loading = false, user: authUser = {} } = useSelector((state) => state.auth);
    const { token = '', status: loggedIn = false, message = '' } = authUser || {}

    useEffect(() => {
        if (loggedIn === true && !isEmpty(authUser)) {
            redirectTo(props, { path: '/my-game-center' })
        }
    }, [loggedIn, authUser])

    const onLoginSubmit = async (e) => {
        e?.preventDefault();

        if (isEmpty(user.email) || isEmpty(user.password)) {
            //error message
            return;
        }

        dispatch(authenticate(user));
    }

    const redirect = () => {
        if (!isEmpty(token) || !isEmpty(getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER))) {
            const { location: { state = {} } = {} } = props || {}

            return <Redirect to={!isEmpty(state) ? state?.from : '/'} />
        }
    }

    return (
        <div className={styles.root}>
            <Header isStick={true} />
            <HeroSection title={<>Get Ready <br /> to Power-Up!</>} subTitle={<>Let’s start your new experience our ground-breaking live-play <br /> games where you have the Power to control your destiny!</>} />
            <div className={styles.container}>
                <form onSubmit={onLoginSubmit} className={formStyles.root}>
                    {
                        !isEmpty(authUser) && !loggedIn &&
                        <>
                            <Alert renderMsg={() => <p>{message}</p>} danger />
                            <br />
                        </>
                    }
                    {
                        !isEmpty(authUser) && loggedIn &&
                        <>
                            <Alert renderMsg={() => <p>Login Success</p>} success />
                            <br />
                        </>
                    }
                    <Input type="text" title="E-mail" required value={user.email} onChange={(e) => setUser({ ...user, email: e?.target?.value })} />
                    <Input type="password" title="Password" required value={user.password} onChange={(e) => setUser({ ...user, password: e?.target?.value })} />
                    <button className={formStyles.button} type="submit" disabled={loading || (isEmpty(user.email) || isEmpty(user.password))}>
                        {
                            loading ?
                                'Loading...'
                                :
                                'Log in'
                        }
                    </button>
                </form>
                <p className={`${styles.blogSection}`}>Don't have an account? <Link to="/power-up">Click here to Power-up!</Link></p>
            </div>
            <Footer isBlack />
            {redirect()}
        </div>
    )
}

export default LoginPage
