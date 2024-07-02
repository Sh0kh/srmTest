import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import '../Style/AdminsEdit.css';
import axios from '../Service/axios';

function AdminsEdit() {
    const { id } = useParams(); // Извлекаем параметр `id` из URL
    const [selectedFile, setSelectedFile] = useState(null);
    const [editItem, setEditItem] = useState({
        id: '',
        name: '',
        email: '',
        description: '',
        password: '',
        image: ''
    });

    useEffect(() => {
        axios.get(`/user/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            const { id, name, email, description, password, image } = response.data;
            setEditItem({ id, name, email, description, password, image });
        })
        .catch(error => {
            console.error('Error fetching admin data:', error);
        });
    }, [id]); 

    const adminEdit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', editItem.name);
        formData.append('email', editItem.email);
        formData.append('password', editItem.password);
        formData.append('description', editItem.description);

        if (selectedFile) {
            formData.append('image', selectedFile);
        } else {
            formData.append('image', editItem.image);
        }

        axios.put(`/user/${editItem.id}`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            // Обновляем состояние после успешного запроса
            setEditItem(prevState => ({
                ...prevState,
                image: selectedFile // Обновляем изображение, если оно выбрано
            }));
        })
        .catch((error) => {
        });
    };

    const postFoto = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    return (
        <div className='AdminsEdit'>
            <Header />
            <div className='AdminsEdit-content'>
                <form onSubmit={adminEdit}>
                    <h2>Изменить Админа</h2>
                    <div className='CreateCustoers-content-grid'>
                        <label htmlFor="name">
                            <h3>Имя</h3>
                            <input 
                                value={editItem.name}
                                onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                                id='name' type="text"
                            />
                        </label>
                    </div>
                    <div className="modal-foto">
                        <h3>Фото</h3>
                        <label className="file-input-container" htmlFor="photo">
                            <span className='soz'>Фото</span>
                            <input
                                onChange={postFoto}
                                id="photo" accept="image/*" type="file"
                            />
                        </label>
                    </div>
                    <label htmlFor="em">
                        <h3>Email</h3>
                        <input
                            value={editItem.email}
                            onChange={(e) => setEditItem({ ...editItem, email: e.target.value })}
                            id='em' type='email'
                        />
                    </label>
                    <label htmlFor="pass">
                        <h3>Пароль</h3>
                        <input
                            value={editItem.password}
                            onChange={(e) => setEditItem({ ...editItem, password: e.target.value })}
                            id='pass' type="text"
                        />
                    </label>
                    <label htmlFor="info">
                        <h3>Описание</h3>
                        <textarea
                            value={editItem.description}
                            onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                            name="" id="info"
                        ></textarea>
                    </label>
                    <button type='submit'>Обновить</button>
                </form>
            </div>
        </div>
    );
}

export default AdminsEdit;
