import React, {useEffect, useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import classes from './index.module.scss'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import SignInImage from '../../assets/signin-background.png'
import Input from '../../components/Input'
import { socket } from '../../config/server_connection';
import { CONSTANTS } from '../../utility/constants'
import { userAuthLoading, userAuthSuccess, userAuthFailed } from '../../actions/authActions';
import Alert from '../../components/Alert';
import { isEmpty } from 'lodash';
import { getLocalStorage, redirectTo, setLocalStorage } from '../../utility/shared';
import http from '../../config/http';

let _socket = null;

function LoginPage(props) {
    const [user, setUser] = useState({ email: '', password: '' });
    const [auth, setAuth] = useState({});

    const dispatch = useDispatch();
    const { loading, success, failed, user: { token = '' } = {} } = useSelector((state) => state.auth);
    
    useEffect(() => {
        _socket = socket();
    }, [])
    
    const onLoginSubmit = async (e) => {
        e?.preventDefault();
        
        if (isEmpty(user.email) || isEmpty(user.password)) {
            //error message
            return;
        }

        dispatch(userAuthLoading());
        const response = await http.post('/users/login', user);
        let responseData = response.data;
        if (responseData.status === false) {
            setAuth(responseData)
            return dispatch(userAuthFailed())
        }
        
        setLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER, JSON.stringify(responseData.user))
        dispatch(userAuthSuccess(responseData))
        return redirectTo(props, {path: '/my-game-center/contests'})
    }
    
    const redirect = () => {
        if (!isEmpty(token) || !isEmpty(getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER))) {
            const { location: { state = {} } = {} } = props || {}
            
            return <Redirect to={!isEmpty(state) ? state?.from : '/'} />
        }
    }

    return (
        <>
            <Header />
            <div className={classes.wrapper}>
                <div className={classes.back_drop} />
                <div className={classes.header}>
                    <img src={SignInImage} alt="" className={classes.header_image} />
                    
                    <div className={classes.header_content}>
                        <p className={classes.header_title}>Get ready to Power-up!</p>
                        <p className={classes.header_p}>
                        Let’s start your new experience our ground-breaking live-play games where you have the Power to control your destiny!
                        </p>
                    </div>
                </div>

                <div className={classes.content_wrapper}>
                    <div className={classes.content_top_skew} />
                    <div className={classes.content_card}>
                        {
                            failed &&
                            <>
                                <Alert renderMsg={() => <p>{auth?.message}</p>} danger />
                                <br />
                            </>
                        }
                        {
                            success &&
                            <>
                                <Alert renderMsg={() => <p>Login Success</p>} success />
                                <br />
                            </>
                        }
                        <form onSubmit={onLoginSubmit}>
                            <Input type="text" block rounded label="E-mail" required value={user.email} onChange={(e) => {
                                setUser({...user, email: e?.target?.value})
                            }} />
                            <Input type="password" block rounded label="Password" required value={user.password} onChange={(e) => {
                                setUser({...user, password: e?.target?.value})
                            }} />
                            <button className={`${'__btn __large-btn'} ${classes.login_btn}`} type="submit" disabled={loading || (isEmpty(user.email) || isEmpty(user.password))}>
                                {
                                    loading ?
                                        'Loading...'
                                        :
                                        'Log in'
                                }
                            </button>
                        </form>
                        <br />
                    </div>

                    <p className={classes.content_footer_p}>
                        Don't have an account? <Link to="/">Click here to Power-up!</Link>
                    </p>
                </div>
            </div>
            <Footer isBlack />
            {
                redirect()
            }
        </>
    )
}

export default LoginPage
