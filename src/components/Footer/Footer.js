import classes from './Footer.module.scss';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

import {useMediaQuery} from 'react-responsive';


const Footer = props => {
    const isMobile = useMediaQuery({query: '(max-width: 414px)'});
    const isTablet = useMediaQuery({query: '(max-width: 768px)'});
    const isBigScreenTablet = useMediaQuery({query: '(max-width: 1024px)'});
    
    return (
        <footer className={`${classes.__footer} ${props?.isBlack && classes.__style_2}`}>
            <div className={classes.__container_2}>
                {
                    props?.logoOnly ?
                    <div className={classes.__logo_center}>
                        <img src={logo} alt='' className={`${classes.__logo}`} />
                    </div>
                    :
                    <>
                        <div className={`${classes.__footer_links} __center`}>
                            <img src={logo} alt='' className={`${classes.__logo} __center`} />
                            {/* <img src={logo} alt='' className={`${classes.__logo} __hide-on-small`} /> */}
                            {
                                !isMobile && !isTablet && !isBigScreenTablet
                                ?
                                <>
                                    <div className='__hide-on-small'>Legal Privacy</div>
                                    <div className='__hide-on-small'>Company</div>
                                    <Link to='/terms'>Terms of use</Link>
                                    <Link to='/faqs' className={classes.elm_3}>FAQs</Link>
                                    <Link to='/my-account' className={classes.elm_1}>My Account</Link>
                                    <Link to='/privacy'>Privacy</Link>
                                    <Link to='/trust-and-safety' className={classes.elm_4}>Trust & Safety </Link>
                                    <Link to='/sponer-contest' className={[classes.elm_2, classes.__add_border]} >Sponsor a contest</Link>
                                    <Link to='/account-security' className={classes.__add_border}>Account Security</Link>
                                    <Link to='/about-us' className={[classes.elm_5, classes.__add_border]}>About Us</Link>
                                </>
                                :
                                <>
                                    <Link to='/my-account' className={classes.elm_1}>My Account</Link>
                                    <Link to='/sponer-contest' className={[classes.elm_2, classes.__add_border]} >Sponsor a contest</Link>
                                    <hr className={classes.__hr} />
                                    <Link to='/faqs' className={classes.elm_3}>FAQs</Link>
                                    <Link to='/trust-and-safety' className={classes.elm_4}>Trust & Safety </Link>
                                    <Link to='/about-us' className={[classes.elm_5, classes.__add_border]}>About Us</Link>
                                    <hr className={classes.__hr} />
                                    <Link to='/terms'>Terms of use</Link>
                                    <Link to='/privacy'>Privacy</Link>
                                    <Link to='/account-security' className={classes.__add_border}>Account Security</Link>
                                    <hr className={classes.__hr} />
                                </>
                            }
                        </div>
                        <div className={`${classes.__mediam} __center __mt-3`}>
                            Copyright © 2021 PowerPlay Systems Inc. - All Rights Reserved
                        </div>
                    </>
                }
                
            </div>
        </footer>
    );
}           

export default Footer;