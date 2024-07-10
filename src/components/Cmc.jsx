import React, { useEffect, useState } from 'react'
import '../Style/Cmc.css'
import Header from './Header'
import axios from '../Service/axios'
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
function Cmc() {
    const [isActive, setActive] = useState(null)
    const modalActive = () => {
        setActive(!isActive)
    }

    const [data, setData] = useState([])
    const getClient = () => {
        axios.get('/client', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((respons) => {
                setData(respons.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }


    const [CustomersPage, setCustomersPage] = useState(1)
    const CustomersItem = 3;
    const indexOfLastItem = CustomersPage * CustomersItem;
    const indexOfFirstItem = indexOfLastItem - CustomersItem;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(data.length / CustomersItem);

    const nextPage = () => {
        if (CustomersPage < totalPages) {
            setCustomersPage(CustomersPage + 1);
        }
    };

    const prevPage = () => {
        if (CustomersPage > 1) {
            setCustomersPage(CustomersPage - 1);
        }
    };
    useEffect(() => {
        getClient()
    }, [])

    const [message, setMessage] = useState('');
    const createSMS = (e) => {
        e.preventDefault();
        const smsMessage = {
            message: message,
        };

        axios.post('/client', smsMessage, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                Toastify({
                    text: "Отправлено",
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
    return (
        <div className='Cmc'>
            <Header />
            <div className='Cmc-content'>
                <div className='Create-cmc'>
                    <button onClick={modalActive}>
                        Отправить СМС
                    </button>
                </div>
                <div className='Cmc-table'>
                    <table>
                        <thead>
                            <tr>
                                <th className='cmc-table-num'>
                                    <h3>
                                        #
                                    </h3>
                                </th>
                                <th>
                                    <h3>
                                        Наименование
                                    </h3>
                                </th>
                                <th>
                                    <h3>
                                        Номер телефона
                                    </h3>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr>
                                    <td>
                                        <h3>
                                            {indexOfFirstItem + index + 1}
                                        </h3>
                                    </td>
                                    <td>
                                        <h3>
                                            {item.name}
                                        </h3>
                                    </td>
                                    <td>
                                        <h3>
                                            {item.phone_number}
                                        </h3>
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='Contracts-footer'>
                    <button onClick={prevPage}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" /></svg>
                    </button>
                    <div>
                        <span>{CustomersPage}</span>
                        <span>/</span>
                        <span>{totalPages}</span>
                    </div>
                    <button onClick={nextPage}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="m220.24 132.24l-72 72a6 6 0 0 1-8.48-8.48L201.51 134H40a6 6 0 0 1 0-12h161.51l-61.75-61.76a6 6 0 0 1 8.48-8.48l72 72a6 6 0 0 1 0 8.48" /></svg>
                    </button>
                </div>
            </div>
            <div className={`Cmc-modal-bg ${isActive ? 'db' : ''}`}>
                <div className='Cmc-modal-content'>
                    <div className='Cmc-modal-header'>
                        <h1>
                            Отправить Смс
                        </h1>
                        <button onClick={modalActive}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="currentColor" fill-rule="evenodd" d="M1.707.293A1 1 0 0 0 .293 1.707L5.586 7L.293 12.293a1 1 0 1 0 1.414 1.414L7 8.414l5.293 5.293a1 1 0 0 0 1.414-1.414L8.414 7l5.293-5.293A1 1 0 0 0 12.293.293L7 5.586z" clip-rule="evenodd" /></svg>
                        </button>
                    </div>
                    <form onSubmit={createSMS}>
                        {/* <label htmlFor="NameCmc">
                        <h3>
                            Названия
                        </h3>
                        <input type="text" id='NameCmc' required />
                    </label>
                    <label htmlFor="TextCmc">
                        <h3>
                            Описание 
                        </h3>
                        <textarea name="" id="TextCmc" required></textarea>
                    </label> */}
                        <select value={message} onChange={(e) => setMessage(e.target.value)} name="" id="">
                            <option value="Это тест от Eskiz">
                                Это тест от Eskiz
                            </option>
                            <option value="Bu Eskiz dan test">
                                Bu Eskiz dan test
                            </option>
                            <option value="This is test from Eskiz">
                                This is test from Eskiz
                            </option>
                        </select>
                        <button type='submit'>
                            Отправить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Cmc