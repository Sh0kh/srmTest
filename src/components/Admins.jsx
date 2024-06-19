import React from 'react'
import '../Style/Admins.css'
import Header from './Header'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
function Admins() {
    const [isActiveDelete, setActiveDelete] = useState(null)
    const deleteModal = ()=>{
        setActiveDelete(!isActiveDelete)
      }
  return (
    <div className='Admins'>
        <Header/>
        <div className='Admins-content'>
        <div className='Admins-content-header'>
                <NavLink to="/CreateAdmins">
                    + Создать новый админа 
                </NavLink>
            </div>
            <div className='Admins-content-main'>
               <div className='Admins-content-table'>
               <table>
                  <thead>
                    <tr>
                      <th className='admins-table-num'>
                        <h3>
                          #
                        </h3>
                      </th>
                      <th>
                        <h3>
                          Фото 
                        </h3>
                      </th>
                      <th>
                        <h3>
                          Имя
                        </h3>
                      </th>
                      <th>
                        <h3>
                          Email
                        </h3>
                      </th>
                      <th>
                        <h3>
                          Пароль
                        </h3>
                      </th>
                      <th>
                       <h3>
                        Описание 
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
                          <img src="https://static-00.iconduck.com/assets.00/person-icon-1901x2048-a9h70k71.png" alt="foto" />
                        </td>
                        <td>
                          <h3>
                            John Doe
                          </h3>
                        </td>
                        <td>
                          <h3>
                            Admins@gmail.com
                          </h3>
                        </td>
                        <td>
                          <h3>
                            password
                          </h3>
                        </td>
                        <td>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nihil sit ut dolores soluta possimus, corrupti in minus dolorum doloribus?
                          </p>
                        </td>
                        <td className='admins-nas'>
                          <div>
                          <NavLink className="admins-edit" to="/AdminsEdit">
                          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"/></svg>
                          </NavLink>
                          <button onClick={deleteModal} className='admins-delete'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"/></svg>
                          </button>
                          </div>
                        </td>
                      </tr>
                  </tbody>
                </table>
               </div>
            </div>
            <div className='Admins-footer'>
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

export default Admins