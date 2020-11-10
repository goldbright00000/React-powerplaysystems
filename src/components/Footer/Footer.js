import './Footer.scss';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Footer = props => (
    <footer className='__footer'>
        <div className='__footer-links __container-2'>
            <img src={logo} alt='' className='__logo' />
            <div>Legal Privacy</div>
            <div>Company</div>
            <Link to='/terms'>Terms of use</Link>
            <Link to='/faqs'>FAQs</Link>
            <Link to='/my-account'>My Account</Link>
            <Link to='/privacy'>Privacy</Link>
            <Link to='/trust-and-safety'>Trust & Safety </Link>
            <Link to='/sponer-contest' >Sponsor a contest</Link>
            <Link to='/account-security'>Account Security</Link>
            <Link to='/about-us'>About Us</Link>
        </div>
    </footer>
)

export default Footer;