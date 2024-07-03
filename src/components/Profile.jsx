import React, { useEffect, useState } from 'react';
import '../Style/Profile.css';
import Header from './Header';
import axios from '../Service/axios';
import CONFIG from '../Service/config';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
function Profile() {
  const [isActiveProfile, setActiveProfile] = useState(null);
  const [userData, setUserData] = useState({ name: '', image: '', email: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [editItem, setEditItem] = useState({
    name: '',
    email: '',
    image: '',
    password:''
  });

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
          image: response.data.image || 'https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=',
          email: response.data.email,
        });
        setEditItem({
          password:response.data.password,
          name: response.data.name,
          email: response.data.email,
          image: response.data.image || 'https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [confirmPassword, setConfirmPassword] = useState('');
  const editAdmins = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', editItem.name);
    formData.append('email', editItem.email);
    if (selectedFile) {
      formData.append('image', selectedFile);
    } else {
      formData.append('image', editItem.image);
    }

    const localId = localStorage.getItem('id');
    axios.put(`/user/${localId}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        setEditItem(prevState => ({
          ...prevState,
          image: selectedFile ? URL.createObjectURL(selectedFile) : prevState.image,
        }));
        Toastify({
          text: "Изменено",
          duration: 3000,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
      }).showToast();
      })
      .catch((error) => {
        Toastify({
          text: "Ошибка!",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
      }).showToast();
      });

  };
  const editAdminsPassword =(e) =>{
    e.preventDefault();
    if (editItem.password !== confirmPassword) {
      console.log("Пароль не совпадают ");
      return
    }
    const localId = localStorage.getItem('id');
    const formData = new FormData();
    formData.append('password', editItem.password);
    axios.put(`/user/${localId}`, formData,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log("Yes");
        console.log(editItem.password);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const postFoto = (event) => {
    setSelectedFile(event.target.files[0]);
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
          <form onSubmit={editAdmins}>
            <div className='Profile-form-grid'>
              <label htmlFor="Name">
                <h3>Имя</h3>
                <input id='Name' type="text" 
                  value={editItem.name}
                  onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                />
              </label>
            </div>
            <div className="modal-foto">
              <h3>Фото</h3>
              <label className="file-input-container" htmlFor="photo">
                <span className='soz'>Выберите файл</span>
                <input
                  onChange={postFoto} id="photo" accept="image/*" type="file" />
              </label>
            </div>
            <label htmlFor="Email">
              <h3>Email Адрес</h3>
              <input
                value={editItem.email}
                onChange={(e) => setEditItem({ ...editItem, email: e.target.value })}
                type="email" id="email" />
            </label>
            <button type='submit'>Сохранить</button>
          </form>
        </div>
        <div className={`Profile-Password ${isActiveProfile ? 'Profile-Password-dn' : ''}`}>
          <h1>Изменение пароля</h1>
          <form onSubmit={editAdminsPassword}>
            <label htmlFor="NewPassword">
              <h3>Новый пароль</h3>
              <input
               onChange={(e) => setEditItem({ ...editItem, password: e.target.value })}
              type="text" id="NewPassword" />
            </label>
            <label htmlFor="ConfirmPassword">

              <h3>Повторите новый пароль</h3>
              <input 
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="text" id="ConfirmPassword" />
            </label>
            <button type='submit'>Сохранить</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
