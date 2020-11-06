import './Footer.scss';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Footer = props => (
    <footer className='__footer'>
        <div className='__container-2 __flex __sb'>
            <img src={logo} alt='' />
            <div className='__footer-links __f1'>
                <Link to='/'>Terms and Conditions</Link>
                <Link to='/'>Responsible Gaming</Link>
                <Link to='/'>About Us</Link>
                <Link to='/'>Privacy Policy</Link>
                <Link to='/'>Trust and Safety</Link>
                <Link to='/'>FAQ</Link>
            </div>
        </div>
    </footer>
)

export default Footer;