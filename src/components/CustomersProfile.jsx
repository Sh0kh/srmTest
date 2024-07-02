import React, { useEffect, useState } from 'react'
import '../Style/CustomorsProfile.css'
import Header from './Header'
import {  useParams } from 'react-router-dom'
import axios from '../Service/axios'
import CONFIG from '../Service/config'
function CustomersProfile() {
  const [data, setData] = useState([])
  const {id} = useParams()
  useEffect(()=>{
    const getCustomers = () =>{
      axios.get(`/client/${id}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
      })
      .then((response)=>{
        setData(response.data)
        console.log(response.data.image);
      })
      .catch((error)=>{
        console.log(error);
      })
    }
    getCustomers()
  },[id])
  
  return (
    <div className='CustomorsProfile'>
        <Header/>
        <div className='CustomersProfile-content'>
          <div className='CustomersProfile-content1'>
          <div className='CustomersProfile-foto'>
          <img className='customersfoto' src={CONFIG.API_URL + data.image} alt="Profile" onError={(e) => { e.target.onerror = null; e.target.src = 'https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=' }} />
          </div>
          <div className='CustomersProfile-content13'>
                {/* <div className='CustomersProfile-grid'>
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
              </div> */}
            </div>
          </div>
           
            <div className='CustomersProfile-content2'>
              <div className='CustomersProfile-grid'>
                  
                  <h2>
                    Имя:
                  </h2>
                  <h3>
                    {data.name}
                  </h3>
                  </div>
                  <div className='CustomersProfile-grid'>
                  <h2>
                    Телефон номер:
                  </h2>
                  <h3>
                    {data.phone_number}
                  </h3>
                  </div>
                  <div className='CustomersProfile-grid'>
                  <h2>
                    Паспорт:
                  </h2>
                  <h3>
                    {data.passport_series}
                  </h3>
                  </div>
            </div>
        </div>
    </div>
  )
}

export default CustomersProfile