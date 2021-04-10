import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';

const SideBar = () => {
    return (
        <ul className='terms-sidebar-section'>
                <li><NavLink to='/terms' exact>Definitions</NavLink></li>
                <li><NavLink to='/terms/user-agreements'>User agreement</NavLink></li>
                <li><NavLink to='/terms/consideration'>Consideration</NavLink></li>
                <li><NavLink to='/terms/eligibility'>Eligibility</NavLink></li>
                <li><NavLink to='/terms/game-entry'>Game entry</NavLink></li>
                {/* <li><NavLink to='/terms'>PowerPlay tokens (pwrs)</NavLink></li>
                <li><NavLink to='/terms'>Refund policy</NavLink></li>
                <li><NavLink to='/terms'>Conditions of participation</NavLink></li>
                <li><NavLink to='/terms'>Using the defy games website</NavLink></li>
                <li><NavLink to='/terms'>Contest prizes and promotions</NavLink></li>
                <li><NavLink to='/terms'>Other legal restrictions</NavLink></li>
                <li><NavLink to='/terms'>Payment and withdrawal of Prizes</NavLink></li>
                <li><NavLink to='/terms'>Termination and effect of termination</NavLink></li>
                <li><NavLink to='/terms'>Disclaimer of warranties</NavLink></li>
                <li><NavLink to='/terms'>Limitation of Liability</NavLink></li>
                <li><NavLink to='/terms'>Intellectual Property Rights</NavLink></li>
                <li><NavLink to='/terms'>Binding Arbitration and Ccass action Waiver</NavLink></li>
                <li><NavLink to='/terms'>Miscellameous</NavLink></li> */}
            </ul>
    )
}

export default SideBar;