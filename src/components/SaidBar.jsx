import React, { useState } from 'react';
import '../Style/Saidbar.css';
import '../Style/Header.css';
import { NavLink } from 'react-router-dom';
import Logo from '../img/favicon.png'
function SaidBar() {
    const [selectLink, setSelectLink] = useState(1);
    
    const handleCategoryClick = (a) => {
        setSelectLink(a);
    };
    return (
        <div className={`Saidbar `}>
            <div className='saidbar-header'>
                <img src={Logo} alt="" />
            </div>
            <div className='Saidbar-main'>
                <nav>
                    <NavLink to="/"
                        
                        className={selectLink === 1 ? 'active' : ''}
                        onClick={() => handleCategoryClick(1)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1"/>
                        </svg>
                        <span>Глава</span>
                    </NavLink>
                    <NavLink to="/Customers"
                 
                        className={selectLink === 2 ? 'active' : ''}
                        onClick={() => handleCategoryClick(2)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M256 256a112 112 0 1 0-112-112a112 112 0 0 0 112 112m0 32c-69.42 0-208 42.88-208 128v64h416v-64c0-85.12-138.58-128-208-128"/>
                        </svg>
                        <span>Клиенты</span>
                    </NavLink>
                    <NavLink to="/Contracts"
                        className={selectLink === 3 ? 'active' : ''}
                        onClick={() => handleCategoryClick(3)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M428 224H288a48 48 0 0 1-48-48V36a4 4 0 0 0-4-4h-92a64 64 0 0 0-64 64v320a64 64 0 0 0 64 64h224a64 64 0 0 0 64-64V228a4 4 0 0 0-4-4"/><path fill="currentColor" d="M419.22 188.59L275.41 44.78a2 2 0 0 0-3.41 1.41V176a16 16 0 0 0 16 16h129.81a2 2 0 0 0 1.41-3.41"/></svg>
                        <span>Контракты</span>
                    </NavLink>
                    {localStorage.getItem('Role') === 'SUPER-ADMIN' ?(<NavLink to="/Admins"
                 
                        className={selectLink === 4 ? 'active' : ''}
                        onClick={() => handleCategoryClick(4)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M256 256a112 112 0 1 0-112-112a112 112 0 0 0 112 112m0 32c-69.42 0-208 42.88-208 128v64h416v-64c0-85.12-138.58-128-208-128"/>
                        </svg>
                        <span>Админы</span>
                    </NavLink>): null}
                    {localStorage.getItem('Role') === 'SUPER-ADMIN' ? (
    <NavLink 
        to="/Cmc"
        className={selectLink === 5 ? 'active' : ''}
        onClick={() => handleCategoryClick(5)}
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 26 26">
            <path fill="currentColor" d="M23 4H3C1.3 4 0 5.3 0 7v12c0 1.7 1.3 3 3 3h20c1.7 0 3-1.3 3-3V7c0-1.7-1.3-3-3-3m.8 15.4L16 13.8l-3 2l-3.1-2l-7.7 5.6l6.3-6.5l-7.7-6L13 13.5L25.1 7l-7.6 6z"/>
        </svg>
        <span>СМС</span>
    </NavLink>
) : null}

                </nav>
            </div>

        </div>
    );
}

export default SaidBar;