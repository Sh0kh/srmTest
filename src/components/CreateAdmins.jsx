import React, { useState } from 'react'
import '../Style/CreateAdmins.css'
import Header from './Header'
import axios from '../Service/axios'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
function CreateAdmins() {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const createAdmin = (e) =>{
        e.preventDefault();
        const NewData = {
            name:name,
            description:description,
            email:email,
            password:password
        }
        const formData = new FormData();
        for (let key of Object.keys(NewData)) {
            formData.append(key, NewData[key]);
        }
        if (selectedFile) {
            formData.append('image', selectedFile);
        }
        axios.post('/user/create', formData,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((respons)=>{
            Toastify({
                text: "Добавлено",
                duration: 3000,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            }).showToast();
            setEmail('')
            setName('')
            setDescription('')
            setPassword('')
            
        })
        .catch((error)=>{
            Toastify({
                text: "Ошибка!",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
            }).showToast();
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login'; 
            }
        })
    }
  
    const postFoto = (event) =>{
        setSelectedFile(event.target.files[0]);
    }

    return (
        <div className='CreateAdmins'>
            <Header />
            <div className='CreateAdmins-content'>
                <form onSubmit={createAdmin}>
                    <h2>
                        Создать Админа
                    </h2>
                    <div className='CreateCustoers-content-grid'>
                        <label htmlFor="name">
                            <h3>
                                Имя
                            </h3>
                            <input 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id='name' type="text" />
                        </label>

                    </div>
                    <div className="modal-foto">
                        <h3>Фото</h3>
                        <label className="file-input-container" htmlFor="photo">
                            <span className='soz'>Фото</span>
                            <input
                            onChange={postFoto}
                            id="photo" accept="image/*" type="file" />
                        </label>
                    </div>
                    <label htmlFor="em">
                        <h3>
                            Email
                        </h3>
                        <input
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        id='em' type='email' />
                    </label>
                    <label htmlFor="pass">
                        <h3>
                            Пароль
                        </h3>
                        <input
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        id='pass' type="text" />
                    </label>
                    <label htmlFor="info">
                        <h3>
                            Описание
                        </h3>

                        <textarea
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        name="" id="info"></textarea>
                    </label>
                    <button type='submit'>
                        Создать
                    </button>
                </form>
            </div>
            {/* <ToastContainer /> */}

        </div>
    )
}

export default CreateAdmins