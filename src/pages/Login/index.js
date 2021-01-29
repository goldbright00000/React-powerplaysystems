import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
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

let _socket = null;

function LoginPage() {
    const [user, setUser] = useState({ email: '', password: '' });
    const [auth, setAuth] = useState({});
    
    const dispatch = useDispatch();
    const { loading, success, failed } = useSelector((state) => state.auth);
    
    useEffect(() => {
        _socket = socket();
    }, [])
    
    const onLoginSubmit = (e) => {
        e?.preventDefault();
        const data = {
            type: CONSTANTS.SOCKET_EVENTS.AUTH_TYPE.LOGIN,
            user
        }
        _socket.emit(CONSTANTS.SOCKET_EVENTS.AUTH, data)
        dispatch(userAuthLoading())
    }

    _socket?.on(CONSTANTS.SOCKET_EVENTS.AUTH_STATUS, (user) => {
        const { status = false, message = '' } = user || {}
        switch (status) {
            case true:
                dispatch(userAuthSuccess(user))
                setUser({email: '', password: ''})
                break;
            
            case false:
                setAuth(user)
                dispatch(userAuthFailed())
                setUser({email: '', password: ''})
                break;
        
            default:
                break;
        }
    })

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
                            <button className={`${'__btn __large-btn'} ${classes.login_btn}`} type="submit" disabled={loading}>Log in</button>
                        </form>
                        <br />
                    </div>

                    <p className={classes.content_footer_p}>
                        Don't have an account? <Link to="/">Click here to Power-up!</Link>
                    </p>
                </div>
            </div>
            <Footer isBlack />
        </>
    )
}

export default LoginPage
