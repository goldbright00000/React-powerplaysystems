import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './SignInPage.scss';
import Input from '../../ui/Input/Input';

const SignInPage = props => {
    return (
        <div className='__SignInPage'>
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
                    <form className='__sign-in-form __container'>
                        <Input type='text' title='Username' id='username' />
                        <Input type='email' title='E-mail' id='email' />
                        <Input type='password' title='Create-a-password' id='password' />
                        <Input type='password' title='Confirm your password' id='confirmpassword' />
                        <button className='__btn __h4 __submit-btn __uppercase __block __h5-on-small'>Next</button>
                    </form>
                    <div className='__center __mt-4 __already-have-an-account'>Already have an account? <Link to='/' className='__login-link'>Log in!</Link></div>
                </div>
            </div>
            <Footer isBlack={true} />
        </div>
    )
}

export default SignInPage;