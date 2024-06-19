import React from 'react'
import '../Style/CustomorsProfile.css'
import Header from './Header'
import { NavLink } from 'react-router-dom'
function CustomersProfile() {
  return (
    <div className='CustomorsProfile'>
        <Header/>
        <div className='CustomersProfile-content'>
          <div className='CustomersProfile-content1'>
          <div className='CustomersProfile-foto'>
          <img className='customersfoto' src="https://static-00.iconduck.com/assets.00/person-icon-1901x2048-a9h70k71.png" alt="" />
          </div>
          <div className='CustomersProfile-content13'>
                <div className='CustomersProfile-grid'>
              <h2>
                  Контракты:
                </h2>
                <h3>
                    3
                </h3>
              </div>
              <div className='CustomersProfile-grid2'>
                  <NavLink to="/ContractEdit">
                      Физическое лицо
                  </NavLink>
                  <NavLink to="/ContractEdit">
                      Юридическое лицо
                  </NavLink>
              </div>
            </div>
          </div>
           
            <div className='CustomersProfile-content2'>
              <div className='CustomersProfile-grid'>
                  
                  <h2>
                    Имя:
                  </h2>
                  <h3>
                    John
                  </h3>
                  </div>
                  <div className='CustomersProfile-grid'>
                  <h2>
                    Фамилия:
                  </h2>
                  <h3>
                    Doe
                  </h3>
                  </div>
                  <div className='CustomersProfile-grid'>
                  <h2>
                    Отчество:
                  </h2>
                  <h3>
                    Doe
                  </h3>
                  </div>
                  <div className='CustomersProfile-grid'>
                  <h2>
                    Телефон номер:
                  </h2>
                  <h3>
                    980205656
                  </h3>
                  </div>
                  <div className='CustomersProfile-grid'>
                  <h2>
                    Время создания:
                  </h2>
                  <h3>
                    05-08-2024
                  </h3>
                  </div>
            </div>
        </div>
    </div>
  )
}

export default CustomersProfile