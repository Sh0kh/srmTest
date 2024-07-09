import React, { useEffect, useState } from 'react';
import '../Style/Home.css';
import Header from './Header';
import axios from '../Service/axios';
import { Bar } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
function Home() {

  Chart.register(CategoryScale);
  const [data, setData] = useState([]);
  const getCustomers = () => {
    axios.get('/client', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((respons) => {
      setData(respons.data);
    })
    .catch((error) => {
      console.error(error);
    });
  };
  
  

  const [UserData, setUserData] = useState([]);
  const getAdmin = () => {
    axios.get('/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((respons) => {
        setUserData(respons.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCustomers();
    getContract();
    getAdmin();
    
  }, []);
  const [monthlyContracts, setMonthlyContracts] = useState(Array(12).fill([]));
  const [ConData, setConData] = useState([]);
  
  const getContract = () => {
    axios.get('/contract', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((respons) => {
        setConData(respons.data);
        const newMonthlyContracts = Array(12).fill().map(() => []);
        
        respons.data.forEach(contract => {
          const contractDate = new Date(contract.contract_date);
          const month = contractDate.getMonth();
          newMonthlyContracts[month].push(contract.contract_date);
        });
  
        setMonthlyContracts(newMonthlyContracts);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const chartData = {
    labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    datasets: [
      {
        label:'Контракты',
        backgroundColor: 'rgba(37,99,235,235)',
        borderWidth: 1,
        data: monthlyContracts.map(month => month.length),
      },
    ],
  };


  return (
    <div className='Home'>
      <Header />
      <div className='Home-content'>
        <div className='Home-card-wrapper'>
          <div className='Home-card'>
            <h3>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                <path fill="currentColor" d="M256 256a112 112 0 1 0-112-112a112 112 0 0 0 112 112m0 32c-69.42 0-208 42.88-208 128v64h416v-64c0-85.12-138.58-128-208-128" />
              </svg>
              Клиенты
            </h3>
            <span>{data.length}</span>
          </div>
          <div className='Home-card'>
            <h3>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                <path fill="currentColor" d="M428 224H288a48 48 0 0 1-48-48V36a4 4 0 0 0-4-4h-92a64 64 0 0 0-64 64v320a64 64 0 0 0 64 64h224a64 64 0 0 0 64-64V228a4 4 0 0 0-4-4" />
                <path fill="currentColor" d="M419.22 188.59L275.41 44.78a2 2 0 0 0-3.41 1.41V176a16 16 0 0 0 16 16h129.81a2 2 0 0 0 1.41-3.41" />
              </svg>
              Контракты
            </h3>
            <span>{ConData.length}</span>
          </div>
          <div className='Home-card'>
            <h3>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                <path fill="currentColor" d="M256 256a112 112 0 1 0-112-112a112 112 0 0 0 112 112m0 32c-69.42 0-208 42.88-208 128v64h416v-64c0-85.12-138.58-128-208-128" />
              </svg>
              Админы
            </h3>
            <span>{UserData.length}</span>
          </div>
        </div>
        <div className='Home-table-wrapper'>
          <div className='Home-table-header'>
            <h2>Статистика</h2>
          </div>
          <div className='Home-table-main'>
          <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Контракты за 2024 год"
            },
            legend: {
              display: false
            }
          }
        }}
      />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
