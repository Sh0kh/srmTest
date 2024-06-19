import React from 'react'
import '../Style/Login.css'
import Logo from '../img/favicon.png'
function Login() {
  return (
    <div className='Login'>
        <div className='Login-wrapper'>
            <div className='Login-logo'>
                <img src={Logo} alt="" />
            </div>
                <h1>
                    Войти
                </h1>
            <form>
                <label htmlFor="Login">
                    <h3>
                        Логин
                    </h3>
                    <input id='Login' type="text" />
                </label>
                <label  htmlFor="password">
                    <h3>
                        Пароль
                    </h3>
                    <input id='password' type="password" />
                </label>
                <button type='submit'>
                    Войти
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login