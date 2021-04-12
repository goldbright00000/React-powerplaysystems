import React from 'react';
import './Sidebar.scss';
import Terms from './Terms';

const SideBar = () => {
    return (
        <ul className='terms-sidebar-section'>
            {Terms.map(({title, index}) => (
                <li>
                    <a href={`#${title.toLocaleLowerCase().replaceAll(' ', '-')}`}>{title.toLowerCase()}</a>
                </li>
            ))}
        </ul>
    )
}

export default SideBar;