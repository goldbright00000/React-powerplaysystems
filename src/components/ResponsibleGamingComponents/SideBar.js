import React from 'react';
import ResponsibleGames from './ResponsibleGames';
import './SideBar.scss';

const SideBar = () => (
    <div className='__relative'>
        <ul className='__responsible-gaming-sidebar-section'>
        {ResponsibleGames.map(({title}, index) => (
            <li key={index}>
                <a href={`#${title.toLocaleLowerCase().replaceAll(' ', '-')}`} key={index}>{title}</a>
            </li>
        ))}
    </ul>
    </div>
)

export  default SideBar;