import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import classes from "./index.module.scss"

function HomePageContentHeader(props) {
    const { buttonTitle = '', footerTitle = '', redirectTo = '' } = props || {}
    return (
        <>
            <div className={`__viewport __ai __viewport-1 ${footerTitle && classes.__max_height}`}>
            <div className='__center __mt-a __container'>
                <div className='__viewport-title __primary __m-a __inline-block __h4-on-mediam'>
                    Our Games Defy Reality<sup>TM</sup>
                </div>
                <div className='__h4 __mt-1 __viewport-subtitle __ml-a __mr-a __default-size-on-mediam'>
                        Experience our ground-breaking live-play games where you have the Power to control your destiny. *
                </div>
                {
                    buttonTitle &&
                        <Link to={redirectTo} className={`__btn __style-2 __primary-color __h5 __mb-3 __mt-2 __inline-block ${footerTitle && classes.__btn_bg}`}>
                        {buttonTitle}            
                    </Link>
                }

                {
                    footerTitle &&
                    <div className={`__h6 ${classes.__header_bottom} ${classes.__max_width}`}>
                        {footerTitle}
                    </div>
                } 
                <div className='__ml-a __italic __right __mb-2 __internation-patent-pending'>*International Patent  Pending
                </div>
            </div>
        </div>
        </>
    )
}

HomePageContentHeader.propTypes = {
    buttonTitle: PropTypes.string,
    redirectTo: PropTypes.string,
    footerTitle: PropTypes.string
}

export default HomePageContentHeader

