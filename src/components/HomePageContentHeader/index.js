import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import classes from "./index.module.scss"

function HomePageContentHeader(props) {
    const { buttonTitle = '', footerTitle = '', redirectTo = '', showBtnBg = false } = props || {}
    const isMobileOrTablet = useMediaQuery({
        query: '(max-device-width: 540px)'
    })

    const renderHeaderFooter = () => {
        if (isMobileOrTablet) {
            return (
                <>
                    {
                        footerTitle &&
                        <p className={classes.p2}>{ footerTitle }</p>
                    }
                    {
                        buttonTitle &&
                        <Link to={redirectTo} className={`${classes.header_btn} ${showBtnBg && classes.header_btn_bg}`}>{ buttonTitle }</Link>
                    }
                </>
            )
        }

        return (
            <>
                {
                    buttonTitle &&
                    <Link to={redirectTo} className={`${classes.header_btn} ${showBtnBg && classes.header_btn_bg}`}>{ buttonTitle }</Link>
                }
                {
                    footerTitle &&
                    <p className={classes.p2}>{ footerTitle }</p>
                }
            </>
        )
    }
    return (
        <div className={classes.header_wrapper}>
            <div className={classes.header_main}>
                <div className={classes.header_title}>
                    Our Contests Defy Reality <sup>TM</sup>
                </div>

                <div className={classes.header_body}>
                    <p className={classes.p1}>Experience our ground-breaking live-play contests where you have the Power to control your destiny. *</p>
                    {
                        renderHeaderFooter()
                    }
                </div>

                <p className={classes.p3}>*International Patent Pending</p>
            </div>
        </div>
    )
}

HomePageContentHeader.propTypes = {
    buttonTitle: PropTypes.string,
    redirectTo: PropTypes.string,
    footerTitle: PropTypes.string,
    showBtnBg: PropTypes.bool
}

export default HomePageContentHeader

