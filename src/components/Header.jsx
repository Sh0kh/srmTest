import React, { useState, useEffect, useRef } from 'react';
import '../Style/Header.css';
import { NavLink } from 'react-router-dom';
import SaidBarHeader from './SaidBarHeader';
import axios from '../Service/axios';
import CONFIG from '../Service/config';

function Header() {

    // ---------------------- SaidBar ------------------------- satrt
    const [isAddClass, setAddClasss] = useState(null)
    const SaidbarMenu = ()=>{
        setAddClasss(!isAddClass)
    }

    // ----------------------- modal create --------------------start

    const [isActive, setActive] = useState(false);
    const [isHovered, setHovered] = useState(false);

    const modalRef = useRef();
    const buttonRef = useRef();
    const ProfileModal = useRef()
    const ModalActive = () => {
        setActive(!isActive);
    };
    const handleMouseEnter = () => {
        setHovered(true);
    };
    const handleMouseLeave = () => {
        setHovered(false);
    };


    // ------------------------modal create----------------- end




    // ------------------------ modal profile ------------- start
    const ProfilRef = useRef()
    const [isHoverdedProfile, setHoveredProfile] = useState(false)
    const ProfileHover1 = () => {
        setHoveredProfile(true)
    }
    const ProfileHover2 = () => {
        setHoveredProfile(false)
    }
    // ------------------------modal profile ---------------end



    // ------------------------modal profile active ----------- start
    const [isProfileActive, setProfileActive] = useState(false)
    const ProfileActive = () => {
        setProfileActive(!isProfileActive)
    }
    // ------------------------modal profile active ----------- end
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isActive || isProfileActive) {
                // Check if the clicked element is not within the modals or specific elements
                if (!(modalRef.current && modalRef.current.contains(event.target)) &&
                    !(buttonRef.current && buttonRef.current.contains(event.target)) &&
                    !(ProfileModal.current && ProfileModal.current.contains(event.target)) &&
                    !(ProfilRef.current && ProfilRef.current.contains(event.target))) {
                    setActive(false);
                    setProfileActive(false); // Добавление закрытия профиля при клике вне его области
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup on unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isActive, isProfileActive]);

    const [img, setImg] = useState({
        image:''
    })
    const getAdmins = () =>{
        const localId = localStorage.getItem('id')
        axios.get(`/user/${localId}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
        })
        .then((response)=>{
            setImg({
                image:response.data.image ||  'https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg='
            })
        })
        .catch((error)=>{
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login'; 
            }
        })
    }


useEffect(()=>{
    getAdmins()
},[])


    return (
        <div className='header'>
            <div className={`Saidbar_bg ${isAddClass ? 'Saidbar_bg_Active' : ''}`}>
                <SaidBarHeader/>
                <h1 className='x' onClick={SaidbarMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 40 40"><path fill="currentColor" d="M21.499 19.994L32.755 8.727a1.064 1.064 0 0 0-.001-1.502c-.398-.396-1.099-.398-1.501.002L20 18.494L8.743 7.224c-.4-.395-1.101-.393-1.499.002a1.05 1.05 0 0 0-.309.751c0 .284.11.55.309.747L18.5 19.993L7.245 31.263a1.064 1.064 0 0 0 .003 1.503c.193.191.466.301.748.301h.006c.283-.001.556-.112.745-.305L20 21.495l11.257 11.27c.199.198.465.308.747.308a1.058 1.058 0 0 0 1.061-1.061c0-.283-.11-.55-.31-.747z"/></svg>
                </h1>
            </div>
            <div className='header-wrapper'>
                <div className='header-search'>
                    <div  onClick={SaidbarMenu}  className='Hamburger-header'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15"><path fill="currentColor" fillRule="evenodd" d="M1.5 3a.5.5 0 0 0 0 1h12a.5.5 0 0 0 0-1zM1 7.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5" clipRule="evenodd"/></svg>
                    </div>
                    <div>

                    </div>
                    <div>

                    </div>
                    <div>
                        
                    </div>
                    <div className='header-serch-btn-wrapper'>
                        <button
                            ref={buttonRef}
                            onClick={ModalActive}
                            className='header-serch-button'
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            +
                        </button>
                        <div
                            className={`header-search-button-modal ${isHovered ? 'hoverActiver' : ''}`}
                        >
                            <span>
                                Быстро создать
                            </span>
                        </div>
                        <div ref={modalRef} className={`header-search-active-modal ${isActive ? 'ModalActive' : ''}`}>
                            <nav>
                                {/* <NavLink to="/CreateCustomers">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4" /></svg>
                                    <span>Клиент</span>
                                </NavLink> */}
                                <NavLink to="/CreateContracts">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M428 224H288a48 48 0 0 1-48-48V36a4 4 0 0 0-4-4h-92a64 64 0 0 0-64 64v320a64 64 0 0 0 64 64h224a64 64 0 0 0 64-64V228a4 4 0 0 0-4-4"/><path fill="currentColor" d="M419.22 188.59L275.41 44.78a2 2 0 0 0-3.41 1.41V176a16 16 0 0 0 16 16h129.81a2 2 0 0 0 1.41-3.41"/></svg>
                                    <span>Контракты</span>
                                </NavLink>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className='header-profile'>
                    <div
                        onClick={ProfileActive}
                        ref={ProfilRef}
                        onMouseEnter={ProfileHover1}
                        onMouseLeave={ProfileHover2}
                        className='header-acount'>
                        <img src={CONFIG.API_URL + img.image} alt="Profile" onError={(e) => { e.target.onerror = null; e.target.src = 'https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=' }} />
                    </div>
                    <div className={`header-profile-modal ${isHoverdedProfile ? 'header-profile-modal-active' : ''}`}>
                        <span>
                            Профиль
                        </span>
                    </div>
                    <div ref={ProfileModal} className={`heaedr-profile-modal-active ${isProfileActive ? 'header-profile-modal-active-start' : ''}`}>
                        <NavLink to="/Profile">
                            <span>
                                Мой профиль
                            </span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
