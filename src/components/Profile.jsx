import React, { useState } from 'react'
import '../Style/Profile.css'
import Header from './Header'


function Profile() {
  const [isActiveProfile, setActiveProfile] = useState(null)
  const handleButtonClick = (buttonId) => {
    setActiveProfile(buttonId);
  }
  return (
    <div className='Profile'>
      <Header />
      <div className='Profile-content'>
        <div className='Profile-img'>
          <div className='Profile-img-content'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8A2wOvDj7sAobit1mD4lCc6ilEaBm_CF3AQ&s" alt="foto" />
            <h1>
              John Doe
            </h1>
          </div>
          <div className='Profile-img-saidbar'>
            <ul>
              <li
                onClick={() => handleButtonClick(null)}
                className={isActiveProfile === null ? 'Profile-img-saidbar-active' : ''}>
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
          <h1>
            Профиль
          </h1>
          <form>
            <div className='Profile-form-grid'>
              <label htmlFor="Name">
                <h3>
                  Имя
                </h3>
                <input id='Name' type="text" />
              </label>
              <label id='Familiya' htmlFor="">
                <h3>
                  Фамилия
                </h3>
                <input id='Familiya' type="text" />
              </label>
            </div>
            <div className="modal-foto">
              <h3>Фото</h3>
              <label className="file-input-container" htmlFor="photo">
                <span className='soz'>Фото</span>
                <input id="photo" accept="image/*" type="file" />
              </label>
            </div>
            <label htmlFor="Email">
              <h3>
                Email Адресc
              </h3>
              <input type="email" id="email" />
            </label>
            <button type='submit'>
              Сохранить
            </button>
          </form>
        </div>
        <div className={`Profile-Password ${isActiveProfile ? 'Profile-Password-dn' : ""}`}>
          <h1>
            Профиль пароль
          </h1>
          <form>
            <label htmlFor="Password">
              <h3>
                Новый пароль
              </h3>
              <input type="text" id="Passwordd" />
            </label>
            <label htmlFor="Password">
              <h3>
                Ведите еще раз
              </h3>
              <input type="text" id="Passwordd" />
            </label>
            <button type='submit'>
              Сохранить
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile