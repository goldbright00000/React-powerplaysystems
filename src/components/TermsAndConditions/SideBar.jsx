import React from 'react';
import './Sidebar.scss';
import terms from './terms';

const SideBar = () => {
    return (
        <ul className='terms-sidebar-section'>
            {terms.map(({title, index}) => (
                <li>
                    <a onClick={() => document.getElementById(title.toLocaleLowerCase().replaceAll(' ', '-')).scrollIntoView()} key={index}>{title}</a>
                </li>
            ))}
        </ul>
    )
}

export default SideBar;