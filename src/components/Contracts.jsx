import React, { useState, useEffect, useRef } from 'react'
import '../Style/Contracts.css'
import Header from '../components/Header'
import { NavLink } from 'react-router-dom'
function Contracts() {
    const [isActiveDelete, setActiveDelete] = useState(null)
  const deleteModal = ()=>{
    setActiveDelete(!isActiveDelete)
  }
  const [isActive, setActive] = useState(null);
  const DownBtn = useRef(null);
  const modalRef = useRef(null);
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

  return (
    <div className='Contracts'>
       <Header/>
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
                      <div className='Contracts-content-search-grid'>
                      <select name="" id="">
                        <option value="default">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                    </select>
                    <button className='Contracts-cotent-search-btn'
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
                      <div className='Contracts-content-search-input'>
                  <label htmlFor="doc">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14" />
                    </svg>
                    <input placeholder='Поиск...' id='doc' type="text" />
                  </label>
                  </div>
                  </div>
               
              </div>
               <div className='Contracts-content-table'>
               <table>
                  <thead>
                    <tr>
                      <th className='contracts-table-num'>
                        <h3>
                          #
                        </h3>
                      </th>
                      <th>
                        <h3>
                          Названия
                        </h3>
                      </th>
                      <th>
                        <h3>
                          Тип
                        </h3>
                      </th>
                      <th>
                        <h3>
                          Телефон номер
                        </h3>
                      </th>
                      <th>
                        <h3>
                          Дата создания
                        </h3>
                      </th>
                      <th>
                        <h3>
                          Настройки
                        </h3>
                      </th>
                    </tr>
                  </thead>
                  <tbody> 
                      <tr>
                        <td>
                          <h3>
                            1
                          </h3>
                        </td>
                        <td>
                          <h3>
                            SW компания
                          </h3>
                        </td>
                        <td>
                          <h3>
                              Юридическое
                          </h3>
                        </td>
                        <td>
                          <h3>
                            970206565
                          </h3>
                        </td>
                        <td>
                          <h3>
                            27-05-2024
                          </h3>
                        </td>
                        <td className='contracts-nas'>
                          <div>
                          <NavLink className="contracts-edit" to="/ContractEdit">
                          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"/></svg>
                          </NavLink>
                          <button onClick={deleteModal} className='contracts-delete'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"/></svg>
                          </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h3>
                            1
                          </h3>
                        </td>
                        <td>
                          <h3>
                            John Doe
                          </h3>
                        </td>
                        <td>
                          <h3>
                             Физическое
                          </h3>
                        </td>
                        <td>
                          <h3>
                            970206565
                          </h3>
                        </td>
                        <td>
                          <h3>
                            27-05-2024
                          </h3>
                        </td>
                        <td className='contracts-nas'>
                          <div>
                          <NavLink className="contracts-edit" to="/ContractEdit">
                          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"/></svg>
                          </NavLink>
                          <button onClick={deleteModal} className='contracts-delete'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"/></svg>
                          </button>
                          </div>
                        </td>
                      </tr>
                  </tbody>
                </table>
               </div>
            </div>
            <div className='Contracts-footer'>
            <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/></svg>
            </button>
            <div>
              <span>1</span>
              <span>/</span>
              <span>2</span>
            </div>
            <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="m220.24 132.24l-72 72a6 6 0 0 1-8.48-8.48L201.51 134H40a6 6 0 0 1 0-12h161.51l-61.75-61.76a6 6 0 0 1 8.48-8.48l72 72a6 6 0 0 1 0 8.48"/></svg>
            </button>
            </div>
        </div>
        <div className={`DeleteModal ${isActiveDelete ? "DeleteActive" : ""}`}>
            <div className='DeleteModal-content'>
                <h2>
                  Удалить ?
                </h2>
                <div className='DeleteModal-content-grid'>
                    <button>
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