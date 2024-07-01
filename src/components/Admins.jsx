import React, { useEffect, useState } from 'react';
import '../Style/Admins.css';
import Header from './Header';
import { NavLink } from 'react-router-dom';
import axios from '../Service/axios';
import CONFIG from '../Service/config';

function Admins() {
  const [isActiveDelete, setActiveDelete] = useState(false);
  const [data, setData] = useState([]);
  const [AdminPage, setAdminPage] = useState(1);
  const [adminIdToDelete, setAdminIdToDelete] = useState(null);
  const AdminItems = 3;

  const deleteModal = (id = null) => {
    setActiveDelete(!isActiveDelete);
    setAdminIdToDelete(id);
  };

  const getAdmins = () => {
    axios.get('/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const deleteAdmins = () => {
    if (!adminIdToDelete) return;
    axios.delete(`/user/${adminIdToDelete}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      getAdmins();
      deleteModal();
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const indexOfLastItem = AdminPage * AdminItems;
  const indexOfFirstItem = indexOfLastItem - AdminItems;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / AdminItems);

  const nextPage = () => {
    if (AdminPage < totalPages) {
      setAdminPage(AdminPage + 1);
    }
  };

  const prevPage = () => {
    if (AdminPage > 1) {
      setAdminPage(AdminPage - 1);
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  return (
    <div className='Admins'>
      <Header />
      <div className='Admins-content'>
        <div className='Admins-content-header'>
          <NavLink to="/CreateAdmins">
            + Создать нового админа
          </NavLink>
        </div>
        <div className='Admins-content-main'>
          <div className='Admins-content-table'>
            <table>
              <thead>
                <tr>
                  <th className='admins-table-num'>
                    <h3>#</h3>
                  </th>
                  <th>
                    <h3>Фото</h3>
                  </th>
                  <th>
                    <h3>Имя</h3>
                  </th>
                  <th>
                    <h3>Email</h3>
                  </th>
                  <th>
                    <h3>Описание</h3>
                  </th>
                  <th>
                    <h3>Настройки</h3>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={item.id}>
                    <td>
                        <h3>
                          {indexOfFirstItem + index + 1 }
                        </h3>
                    </td>
                    <td>
                      <img src={CONFIG.API_URL + item.image} alt="foto" />
                    </td>
                    <td>
                      <h3>{item.name}</h3>
                    </td>
                    <td>
                      <h3>{item.email}</h3>
                    </td>
                    <td>
                      <p>{item.description}</p>
                    </td>
                    <td className='admins-nas'>
                      <div>
                        <NavLink className="admins-edit" to={`/AdminsEdit/${item.id}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"/></svg>
                        </NavLink>
                        <button onClick={() => deleteModal(item.id)} className='admins-delete'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='Admins-footer'>
          <button onClick={prevPage}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/></svg>
          </button>
          <div>
            <span>{AdminPage}</span>
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
          <h2>Удалить?</h2>
          <div className='DeleteModal-content-grid'>
            <button onClick={deleteAdmins}>
              Да
            </button>
            <button onClick={deleteModal}>
              Нет
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admins;
