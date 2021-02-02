import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, isEqual } from 'lodash';

import { socket } from '../../config/server_connection';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './PowerUpPage.scss';
import Input from '../../ui/Input/Input';
import Alert from '../../components/Alert';
import { CONSTANTS } from '../../utility/constants';
import { userAuthSuccess, userAuthFailed } from '../../actions/authActions';
import http from '../../config/http';
import { setLocalStorage } from '../../utility/shared';

let _socket = null
const INITIAL_STATE = { username: '', email: '', password: '', cPassword: '', isLoading: false, isFailed: false, errorMsg: '', message: '' }

const PowerUpPage = props => {
    const [user, setUser] = useState(INITIAL_STATE);
    const { success } = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    useEffect(() => { 
        // _socket = socket();
    }, []);


    const onSubmit = async e => {
        e.preventDefault();
        const { username = '', email = '', password = '', cPassword = '' } = user || {}
        setUser({...user, isLoading: true})
        
        if (isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(cPassword)) {
            return setUser({...user, isLoading: false, isFailed: true, errorMsg: 'All fields are required'})
        }

        if (!isEqual(password, cPassword)) {
            return setUser({...user, isLoading: false, isFailed: true, errorMsg: 'Password did not match'})
        }

        const data = {
            // type: 'register',
            // user: {
                username,
                email,
                password
            // }
        }

        const response = await http.post('/users/signup', data);
        let responseData = response.data;
        if (responseData.status === false) {
            setUser({...user, isLoading: false})
            return dispatch(userAuthFailed())
        }
        
        setUser({...user, isLoading: false})
        setLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.USER, JSON.stringify(responseData.user))
        return dispatch(userAuthSuccess(responseData))

        // _socket?.emit(CONSTANTS.SOCKET_EVENTS.AUTH, data);
        // props.history.push('/user-profile-info')
    }

    // _socket?.on(CONSTANTS.SOCKET_EVENTS.AUTH_TYPE.REGISTER, (userInfo) => {
    //     const { message = '', userExists = false } = userInfo || {};
    //     setUser({ ...user, message: message, isFailed: userExists, isLoading: false })
    //     if (!userExists) {
    //         return dispatch(userAuthSuccess(userInfo))
    //     }
    // })

    return (
        <div className='__PowerUpPage'>
            <Header isStick={true} />
            <div className='__background-section'>
                <div className='__background-color'>
                    <div className='__center __mt-7 __sign-in-container'>
                        <div className='__inline-block'>
                            <div className='__viewport-title __ml-1 __mb-1 __mr-1 __primary __m-a __h3 __bold __p-s __h4-on-small'>Get ready to Power-up!</div>
                            <div className='__viewport-subtitle __h6 __mediam-on-small'>Let’s start your new experience our ground-breaking live-play <br className='__hide-on-small' /> games where you have the Power to control your destiny!</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='__sign-in-section __form-section'>
                <div className='__form-wrapper __sign-in-container'>
                    <form className='__sign-in-form __container' onSubmit={onSubmit}>
                        {
                            user.isFailed && isEmpty(user.message) &&
                            <Alert renderMsg={() => <p>{ user.errorMsg }</p>} danger />
                        }
                        {
                            user.isFailed && !isEmpty(user.message) &&
                            <Alert renderMsg={() => <p>{ user.message }</p>} danger />
                        }

                        {
                            success && !isEmpty(user.message) &&
                            <Alert renderMsg={() => <p>{ user.message }</p>} success />
                        }
                        
                        <Input type='text' title='Username' id='username' value={user.username} onChange={(e) => {
                            setUser({ ...user, username: e?.target?.value })
                        }} />
                        <Input type='email' title='E-mail' id='email' value={user.email} onChange={(e) => {
                            setUser({ ...user, email: e?.target?.value })
                        }} />
                        <Input type='password' title='Create-a-password' id='password' value={user.password} onChange={(e) => {
                            setUser({ ...user, password: e?.target?.value })
                        }} />
                        <Input type='password' title='Confirm your password' id='confirmpassword' value={user.cPassword} onChange={(e) => { setUser({ ...user, cPassword: e?.target?.value }) }} />
                        <button className='__btn __h4 __submit-btn __uppercase __block __h5-on-small' disabled={user?.isLoading}>
                            {
                                user?.isLoading
                                    ?
                                    'Loading...'
                                    :
                                    'Next'
                            }
                        </button>
                    </form>
                    <div className='__center __mt-4 __already-have-an-account'>Already have an account? <Link to='/' className='__login-link'>Log in!</Link></div>
                </div>
            </div>
            <Footer isBlack={true} />
        </div>
    )
}

export default PowerUpPage;