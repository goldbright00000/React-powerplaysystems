import './Footer.scss';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Footer = props => (
    <footer className={`__footer ${props.isBlack ? '__style-2' : ''}`}>
        <div className='__container-2'>
            <div className='__footer-links __center'>
                <img src={logo} alt='' className='__logo __hide-on-small' />
                <div className='__hide-on-small'>Legal Privacy</div>
                <div className='__hide-on-small'>Company</div>
                <Link to='/terms'>Terms of use</Link>
                <Link to='/faqs' className='elm-3'>FAQs</Link>
                <Link to='/my-account' className='elm-1'>My Account</Link>
                <Link to='/privacy'>Privacy</Link>
                <Link to='/trust-and-safety' className='elm-4'>Trust & Safety </Link>
                <Link to='/sponer-contest' className='elm-2 __add-border' >Sponsor a contest</Link>
                <Link to='/account-security' className='__add-border'>Account Security</Link>
                <Link to='/about-us' className='elm-5 __add-border'>About Us</Link>
            </div>
            <div className='__mediam __center __mt-3'>Copyright © 2021 PowerPlay Systems Inc. - All Rights Reserved</div>
        </div>
    </footer>
)

export default Footer;