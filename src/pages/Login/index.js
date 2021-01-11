import React from 'react'

import classes from './index.module.scss'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import SignInImage from '../../assets/signin-background.png'
import Input from '../../components/Input'

function LoginPage() {

    const onLoginSubmit = (e) => {
        e?.preventDefault();

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
                        <form onSubmit={onLoginSubmit}>
                            <Input type="text" block rounded label="E-mail" />
                            <Input type="password" block rounded label="Password" />
                            <button className={`${'__btn __large-btn'} ${classes.login_btn}`} type="submit">Log in</button>
                        </form>
                    </div>

                    <p>
                    Don't have an account? Click here to Power-up!
                    </p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default LoginPage
