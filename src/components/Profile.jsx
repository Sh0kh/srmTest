import React, { useEffect, useState } from 'react';
import '../Style/Profile.css';
import Header from './Header';
import axios from '../Service/axios';
import CONFIG from '../Service/config';

function Profile() {
  const [isActiveProfile, setActiveProfile] = useState(null);
  const [userData, setUserData] = useState({ name: '', image: '' });

  const handleButtonClick = (buttonId) => {
    setActiveProfile(buttonId);
  };

  const getAdmins = () => {
    const localId = localStorage.getItem('id');
    axios.get(`/user/${localId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      setUserData({
        name: response.data.name,
        image: response.data.image ||  'https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg='
      });
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    getAdmins();
  }, []);

  return (
    <div className='Profile'>
      <Header />
      <div className='Profile-content'>
        <div className='Profile-img'>
          <div className='Profile-img-content'>
          <img src={CONFIG.API_URL + userData.image} alt="Profile" onError={(e) => { e.target.onerror = null; e.target.src = 'https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=' }} />
            <h1>{userData.name}</h1>
          </div>
          <div className='Profile-img-saidbar'>
            <ul>
              <li
                onClick={() => handleButtonClick(null)}
                className={isActiveProfile === null ? 'Profile-img-saidbar-active' : ''}
              >
                Профиль
              </li>
              <li
                onClick={() => handleButtonClick(2)}
                className={isActiveProfile === 2 ? 'Profile-img-saidbar-active' : ''}
              >
                Изменить пароль
              </li>
            </ul>
          </div>
        </div>
        <div className={`Profile-form ${isActiveProfile ? 'Profile-content-dn' : ''}`}>
          <h1>Профиль</h1>
          <form>
            <div className='Profile-form-grid'>
              <label htmlFor="Name">
                <h3>Имя</h3>
                <input id='Name' type="text" value={userData.name} />
              </label>
              <label htmlFor="Familiya">
                <h3>Фамилия</h3>
                <input id='Familiya' type="text" />
              </label>
            </div>
            <div className="modal-foto">
              <h3>Фото</h3>
              <label className="file-input-container" htmlFor="photo">
                <span className='soz'>Выберите файл</span>
                <input id="photo" accept="image/*" type="file" />
              </label>
            </div>
            <label htmlFor="Email">
              <h3>Email Адрес</h3>
              <input type="email" id="email" />
            </label>
            <button type='submit'>Сохранить</button>
          </form>
        </div>
        <div className={`Profile-Password ${isActiveProfile ? 'Profile-Password-dn' : ''}`}>
          <h1>Изменение пароля</h1>
          <form>
            <label htmlFor="NewPassword">
              <h3>Новый пароль</h3>
              <input type="password" id="NewPassword" />
            </label>
            <label htmlFor="ConfirmPassword">
              <h3>Повторите новый пароль</h3>
              <input type="password" id="ConfirmPassword" />
            </label>
            <button type='submit'>Сохранить</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
