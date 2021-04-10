import React from 'react';
import './Sidebar.scss';
import terms from './Terms';

const SideBar = () => {
    return (
        <ul className='terms-sidebar-section'>
            {terms.map(({title, index}) => (
                <li>
                    <a href={`#${title.toLocaleLowerCase().replaceAll(' ', '-')}`}>{title.toLowerCase()}</a>
                </li>
            ))}
        </ul>
    )
}

export default SideBar;