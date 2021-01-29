import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { socket } from '../../config/server_connection';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './PowerUpPage.scss';
import Input from '../../ui/Input/Input';
import { isEmpty, isEqual } from 'lodash';
import Alert from '../../components/Alert';

let _socket = null

const PowerUpPage = props => {
    const [user, setUser] = useState({ username: '', email: '', password: '', cPassword: '', isLoading: false, isFailed: false, errorMsg: '' });

    useEffect(() => { 
        _socket = socket();
    }, []);


    const onSubmit = e => {
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
            type: 'register',
            user: {
                username,
                email,
                password
            }
        }

        _socket?.emit('register', data);
        // props.history.push('/user-profile-info')
    }

    _socket?.on('register_status', (user) => {
        console.log('UserInfo: ', user);
    })

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
                    {
                        user.isFailed &&
                        <Alert renderMsg={() => <p>{ user?.errorMsg }</p>} danger />
                    }
                    <form className='__sign-in-form __container' onSubmit={onSubmit}>
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