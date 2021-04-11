import logo from '../../assets/new-logo.png';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';


const Footer = props => {
    return (
        <footer className={`${styles.root} ${props.className} ${props.isBlack ? styles.style_2 : ''}`}>
            <Link to='/'><img src={logo} alt='' className={styles.logoWrapper} /></Link>
            <div className={styles.linksWrapper}>
                <span>Essentials</span>
                <span>Legal Privacy</span>
                <span>Company</span>
                <Link to='/my-account'>My Account</Link>
                <Link to='/terms'>Terms of use</Link>
                <Link to='/faqs'>FAQs</Link>
                <Link to='/sponer-contest'>Sponsor a contest</Link>
                <Link to='/privacy'>Privacy</Link>
                <Link to='/trust-and-safety'>Trust & Safety </Link>
                <span></span>
                <Link to='/account-security'>Account Security</Link>
                <Link to='/about-us'>About Us</Link>
            </div>
            <p className={styles.copyWriteSection}>Copyright © 2021 PowerPlay Systems Inc. - All Rights Reserved <br />140 Yonge St., S.200, Toronto, ON, M5C 1X6 | info@powerplaysystems.com | 1-888-808-7697</p>
        </footer>
    );
}

export default Footer;