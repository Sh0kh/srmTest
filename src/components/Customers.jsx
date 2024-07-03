import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import '../Style/Customers.css';
import { NavLink } from 'react-router-dom';
import axios from '../Service/axios';
import CONFIG from '../Service/config';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

function Customers() {
  const [isActiveDelete, setActiveDelete] = useState(null);
  const [customersIdToDelete, setCustomersIdToDelete] = useState(null);
  const [isActive, setActive] = useState(null);
  const DownBtn = useRef(null);
  const modalRef = useRef(null);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [CustomersPage, setCustomersPage] = useState(1);
  const CustomersItem = 3;

  const deleteModal = (id = null) => {
    setActiveDelete(!isActiveDelete);
    setCustomersIdToDelete(id);
  };

  const DocumentDown = () => {
    setActive(!isActive);
  };

  useEffect(() => {
    const ClickOut = (e) => {
      if (
        DownBtn.current && !DownBtn.current.contains(e.target) &&
        modalRef.current && !modalRef.current.contains(e.target)
      ){
        setActive(false);
      }
    };

    if (isActive) {
      document.addEventListener('mousedown', ClickOut);
    } else {
      document.removeEventListener('mousedown', ClickOut);
    }

    return () => {
      document.removeEventListener('mousedown', ClickOut);
    };
  }, [isActive]);

  const getcustomers = () => {
    axios.get('/client', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      const sortedData = response.data.sort((a, b) => a.name.localeCompare(b.name));
      setData(sortedData);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const deleteCustomers = (id) => {
    if (!customersIdToDelete) return;
    axios.delete(`/client/${customersIdToDelete}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      getcustomers();
      deleteModal();
      Toastify({
        text: "Удалено",
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

  useEffect(() => {
    getcustomers();
  }, []);

  const indexOfLastItem = CustomersPage * CustomersItem;
  const indexOfFirstItem = indexOfLastItem - CustomersItem;
  
  const filteredData = data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / CustomersItem);

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

  const defaultImageUrl = 'https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=';

  return (
    <div className='Customers'>
      <Header />
      <div className='Customers-content'>
        <div className='Customers-content-header'></div>
        <div className='Customers-content-main'>
          <div className='Customers-content-top'>
            <h2>Все клиенты</h2>
            <div className='Customers-content-search'>
              <div className='Customers-content-search-grid'>
                <button className='Customers-cotent-search-btn'
                  ref={DownBtn}
                  onClick={DocumentDown}
                >
                  Скачать
                </button>
                <div ref={modalRef} className={`Down-modal ${isActive ? 'Down-modal-active' : ''}`}>
                  <a href="!#" download>Excel</a>
                  <a href="!#" download>PDF</a>
                  <a href="!#" download>Print</a>
                  <a href="!#" download>CSV</a>
                </div>
              </div>
              <div className='Customers-content-search-input'>
                <label htmlFor="doc">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14" />
                  </svg>
                  <input
                    placeholder='Поиск...'
                    id='doc'
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className='Customers-content-table'>
            {filteredData.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th className='customers-table-num'><h3>#</h3></th>
                    <th><h3>Фото</h3></th>
                    <th><h3>И.Ф.О</h3></th>
                    <th><h3>Телефон номер</h3></th>
                    <th><h3>Паспорт</h3></th>
                    <th><h3>Настройки</h3></th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={item.id}>
                      <td><h3>{indexOfFirstItem + index + 1}</h3></td>
                      <td>
                        <img src={CONFIG.API_URL + item.image}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = defaultImageUrl;
                          }} alt="foto" />
                      </td>
                      <td><h3>{item.name}</h3></td>
                      <td><h3>{item.phone_number}</h3></td>
                      <td><h3>{item.passport_series}</h3></td>
                      <td className='customers-nas'>
                        <div className='cus-grid'>
                          <NavLink to={`/CustomersProfile/${item.id}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"/></svg>
                          </NavLink>
                          <NavLink className="customers-edit" to={`/CustomersEdit/${item.id}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"/></svg>
                          </NavLink>
                          <button onClick={() => deleteModal(item.id)} className='customers-delete'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"/></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className='no-customers-message'>
                <h3>Нет клиентов, соответствующих поисковому запросу.</h3>
              </div>
            )}
          </div>
        </div>
        <div className='Customers-footer'>
          <button onClick={prevPage}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/></svg>
          </button>
          <div>
            <span>{CustomersPage}</span>
            <span>/</span>
            <span>{totalPages}</span>
          </div>
          <button onClick={nextPage}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="m220.24 132.24l-72 72a6 6 0 0 1-8.48-8.48L201.51 134H40a6 6 0 0 1 0-12h161.51l-61.75-61.76a6 6 0 0 1 8.48-8.48l72 72a6 6 0 0 1 0 8.48"/></svg>
          </button>
        </div>
      </div>
      <div className={`DeleteModal ${isActiveDelete ? "DeleteActive" : ""}`}>
        <div className='DeleteModal-content'>
          <h2>Удалить ?</h2>
          <div className='DeleteModal-content-grid'>
            <button onClick={deleteCustomers}>Да</button>
            <button onClick={deleteModal}>Нет</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customers;
