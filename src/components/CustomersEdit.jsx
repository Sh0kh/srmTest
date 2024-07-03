import React, { useState, useEffect } from 'react'
import '../Style/CustomersEdit.css'
import Header from './Header'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
function CustomersEdit() {
    // const [isActive, setActive] = useState(null)
    // const ClikcButton = ()=>{
    //     setActive(!isActive)
    // }
    // const [isActiveBtn, setActiveBtn] = useState(1)

    // const ButtonClick = (a) => {
    //     setActiveBtn(a)
    // }
    const {id} = useParams()
    const [selectedFile, setSelectedFile] = useState(null);
    const [editItem, setEditItem] = useState({
        id: '',
        name: '',
        passport_series: '',
        phone_number: '',
        image: ''
    })
    useEffect(() => {
        axios.get(`/client/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            
            const { id, name, passport_series, phone_number, image } = response.data;
            setEditItem({ id, name, passport_series, phone_number,image });
        })
        .catch(error => {
            console.error('Error fetching admin data:', error);
        });
    }, [id]); 

    const editCustomers = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', editItem.name)
        formData.append('passport_series', editItem.passport_series)
        formData.append('phone_number', editItem.phone_number)
        if (selectedFile) {
            formData.append('image', selectedFile);
        } else {
            formData.append('image', editItem.image);
        }

        axios.put(`/client/${editItem.id}`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                setEditItem(prevState => ({
                    ...prevState,
                    image: selectedFile
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
            })
    }
    const postFoto = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    return (
        <div className='CustomersEdit'>
            <Header />
            <div className='CustomersEdit-content'>
                <div className='CreateCust'>
                    <form onSubmit={editCustomers}>
                        <h2>
                            Изменить клиента
                        </h2>
                        <div className='CreateCustoers-content-gridd'>
                            <label htmlFor="name">
                                <h3>
                                    Имя
                                </h3>
                                <input
                                    value={editItem.name}
                                    onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                                    id='name' type="text" />
                            </label>
                            <label htmlFor="passport">
                                <h3>
                                    Пасспорт
                                </h3>
                                <input
                                    value={editItem.passport_series}
                                    onChange={(e) => setEditItem({ ...editItem, passport_series: e.target.value })}
                                    id='passport' type="text" />
                            </label>
                            <div className="modal-foto">
                                <h3>Фото</h3>
                                <label className="file-input-container" htmlFor="photo">
                                    <span className='soz'>Фото</span>
                                    <input onChange={postFoto} id="photo" accept="image/*" type="file" />
                                </label>
                            </div>
                            <label htmlFor="Tel">
                                <h3>
                                    Номер телефона
                                </h3>
                                <input
                                    value={editItem.phone_number}
                                    onChange={(e) => setEditItem({ ...editItem, phone_number: e.target.value })}
                                    id='Tel' type="number" />
                            </label>
                            {/* <label htmlFor="info">
                                <h3>Адрес</h3>
                                <textarea name="" id="info"></textarea>
                            </label> */}
                        </div>
                        <button type='submit'>
                            Изменить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CustomersEdit