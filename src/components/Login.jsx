import React, { useState } from 'react'
import '../Style/Login.css'
import Logo from '../img/favicon.png'
import axios from '../Service/axios'
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
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
            localStorage.setItem("name",respons.data.user.name );
            localStorage.setItem('Role',respons.data.user.role)
            window.location.href = '/';
            Toastify({
                text: "Успешно",
                duration: 3000,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            }).showToast();
        })
        .catch((error)=>{
            Toastify({
                text: "Ошибка!",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
            }).showToast();
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