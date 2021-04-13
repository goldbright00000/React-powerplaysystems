import React from 'react';
import ResponsibleGames from './ResponsibleGames';
import './SideBar.scss';

const SideBar = () => (
    <ul className='__responsible-gaming-sidebar-section'>
        {ResponsibleGames.map(({title}, index) => (
            <li key={index}>
                <a href={`#${title.toLocaleLowerCase().replaceAll(' ', '-')}`} key={index}>{title.toLowerCase()}</a>
            </li>
        ))}
    </ul>
)

export  default SideBar;