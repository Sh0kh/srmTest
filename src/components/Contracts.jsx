import React, { useState, useEffect, useRef } from 'react'
import '../Style/Contracts.css'
import Header from '../components/Header'
import { NavLink } from 'react-router-dom'
import axios from '../Service/axios'
// import axios from '../Service/axios'
// import CONFIG from '../Service/config'
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
function Contracts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [adminIdToDelete, setAdminIdToDelete] = useState(null);
  const [isActiveDelete, setActiveDelete] = useState(null)
  const deleteModal = (id = null) => {
    setActiveDelete(!isActiveDelete);
    setAdminIdToDelete(id);
  };
  const [isActive, setActive] = useState(null);
  const DownBtn = useRef(null);
  const modalRef = useRef(null);
  // const DocumentDown = () => {
  //   setActive(!isActive);
  // };
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const ClickOut = (e) => {
      if (
        DownBtn.current && !DownBtn.current.contains(e.target) &&
        modalRef.current && !modalRef.current.contains(e.target)
      ) {
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



  const deleteContract = () => {
    if (!adminIdToDelete) return;
    axios.delete(`/contract/${adminIdToDelete}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((respons) => {
        Toastify({
          text: "Удалено",
          duration: 3000,
          gravity: "top", // `top` or `bottom`
          position: "right",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        }).showToast();
        getContract();
        deleteModal()

      })
      .catch((error) => {
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
  const [data, setData] = useState([]);
  // const [admin, setAdmin ]= useState([])
  const [contractPage, setContractPage] = useState(1);
  const contractItem = 10;

// const storedId = localStorage.getItem('id');
  const getContract = () => {
    axios.get('/contract', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        const sortedData = response.data.sort((a, b) => new Date(a.contract_date) - new Date(b.contract_date));
        setData(sortedData);
        setTableData(response.data);
        console.log(response.data.create_user.name);
        console.log(response);
        
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      });
  };

  const indexOfLastItem = contractPage * contractItem;
  const indexOfFirstItem = indexOfLastItem - contractItem;
  const filteredData = data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / contractItem);




  const nextPage = () => {
    if (contractPage < totalPages) {
      setContractPage(contractPage + 1);
    }
  };

  const prevPage = () => {
    if (contractPage > 1) {
      setContractPage(contractPage - 1);
    }
  };

  useEffect(() => {
    getContract()

  }, [])

  
  const handleExport = () => {
    // Исключаем ненужные поля из данных таблицы
    const filteredData = tableData.map(({
      html,
      category_contract_id,
      client_id,
      create_user_id,
      createdAt,
      updatedAt,
      create_user,
      document,
      category_contract,
      client,
      image,
      id_one,
      id_two,
      price_text,
      phone_number,
      id,
      contract_date,
      rs,
      mfo,
      oked,
      inn,
      ...rest
    }) => rest);
  
    // Обновляем заголовки столбцов
    const headers = {
      name: 'Имя',
      title:'Наимевонаие объекта',
      description:'Описание',
      address:'Адрес',
      date:'Дата',
      price_info:'Вид определяемой стоимости',
      price:'Цена',
      passport_series:'Серия паспорта',
      phone_number:'Телефон номер',
      info_bank:'Информация банка ',
      info_address:'Информация адреса',
      inn:'ИНН',
      rs:'РС',
      mfo:'МФО',
      oked:'ОКЭД'
    };
  
    // Преобразуем данные в массив объектов с обновленными заголовками
    const updatedData = filteredData.map(row => {
      const updatedRow = {};
      Object.keys(row).forEach(key => {
        updatedRow[headers[key] || key] = row[key];
      });
      return updatedRow;
    });
  
    // Создаем новую книгу Excel
    const wb = XLSX.utils.book_new();
  
    // Преобразуем обновленные данные в рабочий лист
    const ws = XLSX.utils.json_to_sheet(updatedData, { cellStyles: true });
  
    // Настраиваем ширину столбцов (200 пикселей для каждого столбца)
    const columnWidths = Object.keys(updatedData[0]).map(() => ({ wpx: 200 }));
    ws['!cols'] = columnWidths;
  
    // Применяем стили для каждой ячейки
    Object.keys(ws).forEach(cell => {
      if (cell[0] !== '!') { // исключаем метаданные, такие как '!ref' и '!cols'
        ws[cell].s = {
          alignment: {
            horizontal: 'center',
            vertical: 'center'
          }
        };
      }
    });
  
    // Добавляем рабочий лист в книгу Excel
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    // Генерируем бинарный буфер для создания файла
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  
    // Создаем файл Blob и инициируем его скачивание
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'data.xlsx');
  };
  
  
  
  return (
    <div className='Contracts'>
      <Header />
      <div className='Contracts-content'>
        <div className='Contracts-content-header'>
          <NavLink to="/CreateContracts">
            + Создать новый контракт
          </NavLink>
          {/* <button>
                        Контакты
                    </button> */}
        </div>
        <div className='Contracts-content-main'>
          <div className='Contracts-content-top'>
            <h2>
              Все контракты
            </h2>

            <div className='Contracts-content-search'>
              <div className='Contracts-content-search-input flexing'>
                <label htmlFor="doc">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14" />
                  </svg>
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder='Поиск...' id='doc' type="text" />
                </label>
                <button onClick={handleExport}>
                  Скачать exel
                </button>
              </div>
            </div>

          </div>
          <div className='Contracts-content-table'>
            {filteredData.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th className='contracts-table-num'>
                      <h3>#</h3>
                    </th>
                    <th><h3>Названия</h3></th>
                    <th><h3>Тип</h3></th>
                    <th><h3>Наименования обекта</h3></th>
                    <th><h3>Адрес обекта</h3></th>
                    <th><h3>Адрес заказчика</h3></th>
                    <th><h3>Сумма сделки</h3></th>
                    <th><h3>Телефон номер</h3></th>
                    <th><h3>Дата создания</h3></th>
                    <th><h3>Работник</h3></th>
                    <th><h3>Настройки</h3></th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={item.id}>
                      <td>
                        <h3>{item.id_one}/{item.id_two}</h3>
                      </td>
                      <td>
                        <h3>{item.name}</h3>
                      </td>
                      <td>
                        <h3>{item.category_contract.name}</h3>
                      </td>
                      <td>
                        <h3>{item.title}</h3>
                      </td>
                      <td>
                        <p>{item.info_address}</p>
                      </td>
                      <td>
                        <p>{item.address}</p>
                      </td>
                      <td>
                        <h3>{item.price}</h3>
                      </td>
                      <td>
                        <h3>{item.phone_number}</h3>
                      </td>
                      <td>
                        <h3>{item.contract_date.split('T')[0]}</h3>
                      </td>
                      <td>
                        <h3>{item.create_user.name}</h3>
                      </td>
                      <td className='contracts-nas'>
                        <div className='Table__grdi'>
                          <NavLink className="contracts-eye" to={`/contractPr/${item.id}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"></path></svg>
                          </NavLink>
                          {localStorage.getItem('Role') === 'SUPER-ADMIN' && (
                           <div className='tabless__grdi'>
                             <NavLink className="contracts-edit" to={`/ContractEdit/${item.id}`}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z" />
                              </svg>
                            </NavLink>
                          <button onClick={() => deleteModal(item.id)} className='contracts-delete'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z" /></svg>
                          </button>
                           </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className='no-customers-message'>
                <h3>Нет клиентов</h3>
              </div>
            )}
          </div>
        </div>
        <div className='Contracts-footer'>
          <button onClick={prevPage}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" /></svg>
          </button>
          <div>
            <span>{contractPage}</span>
            <span>/</span>
            <span>{totalPages}</span>
          </div>
          <button onClick={nextPage}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="m220.24 132.24l-72 72a6 6 0 0 1-8.48-8.48L201.51 134H40a6 6 0 0 1 0-12h161.51l-61.75-61.76a6 6 0 0 1 8.48-8.48l72 72a6 6 0 0 1 0 8.48" /></svg>
          </button>
        </div>
      </div>
      <div className={`DeleteModal ${isActiveDelete ? "DeleteActive" : ""}`}>
        <div className='DeleteModal-content'>
          <h2>
            Удалить ?
          </h2>
          <div className='DeleteModal-content-grid'>
            <button onClick={deleteContract}>
              Да
            </button>
            <button onClick={deleteModal}>
              Нет
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contracts