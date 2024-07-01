import React, { useState } from 'react'
import '../Style/Login.css'
import Logo from '../img/favicon.png'
import axios from '../Service/axios'

function Login() {

    const [login, setLogin] = useState({
        email:'',
        password:'',
    })
    const loginAdmin = (e) =>{
        e.preventDefault();
        const data = {
            email:login.email,
            password:login.password,
        };
        axios.post('/user/login',data)
        .then((respons)=>{
            setLogin({email:'', password:'',})
            localStorage.setItem('token', respons.data.tokens.refresh_token);
            // console.log(respons.data.user.id);
            localStorage.setItem("id",respons.data.user.id );
            localStorage.setItem('Role',respons.data.user.role)
            window.location.href = '/';
        })
        .catch((error)=>{
            console.log(error);
        })
    }
  return (
    <div className='Login'>
        <div className='Login-wrapper'>
            <div className='Login-logo'>
                <img src={Logo} alt="" />
            </div>
                <h1>
                    Войти
                </h1>
            <form onSubmit={loginAdmin}>
                <label htmlFor="Login">
                    <h3>
                        Логин
                    </h3>
                    <input 
                    onChange={(e)=> setLogin({...login, email: e.target.value})}
                    id='Login' type="text" />
                </label>
                <label  htmlFor="password">
                    <h3>
                        Пароль
                    </h3>
                    <input
                    onChange={(e)=> setLogin({...login,password:e.target.value})}
                    id='password' type="password" />
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