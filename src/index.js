import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Error from './components/Error';
import Customers from './components/Customers';
import Home from './components/Home';
import CreateCustomers from './components/CreateCustomers';
import Profile from './components/Profile';
import Contracts from './components/Contracts';
import CreateContracts from './components/CreateContracts';
import Login from './components/Login';
import ContractEdit from './components/ContractEdit';
import Admins from './components/Admins';
import CreateAdmins from './components/CreateAdmins';
import AdminsEdit from './components/AdminsEdit';
import CustomersEdit from './components/CustomersEdit';
import CustomersProfile from './components/CustomersProfile';
import Cmc from './components/Cmc';
import Contract1 from './components/Contract1';

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    errorElement:<Error/>,
    children:[
      {
        path:"/",
        element:localStorage.getItem('token') ?  <Home/> : <Login/>
      },
      {
        path:"/Customers",
        element: localStorage.getItem('token') ? <Customers/> : <Login/>,
      },
      {
        path:"/CreateCustomers",
        element: localStorage.getItem('token') ? <CreateCustomers/> : <Login/>,
      },
      {
        path:"/Profile",
        element:localStorage.getItem('token')?  <Profile/> : <Login/>,
      },
      {
        path:"/Contracts",
        element: localStorage.getItem('token') ? <Contracts/> : <Login/>,
      },
      {
        path:"/CreateContracts",
        element: localStorage.getItem('token') ? <CreateContracts/> : <Login/>
      },
      {
        path:"/ContractEdit/:id",
        element: localStorage.getItem('token') ? <ContractEdit/> : <Login/>
      },
      {
        path:"/Admins",
        element:localStorage.getItem('Role') === 'SUPER-ADMIN' && localStorage.getItem('token') ? <Admins/> : <Login/>
      },
      {
        path:"/CreateAdmins",
        element: localStorage.getItem('Role') === 'SUPER-ADMIN'  && localStorage.getItem('token')  ? <CreateAdmins/> : <Login/>
      },
      {
        path:"/AdminsEdit/:id",
        element: localStorage.getItem("Role") === 'SUPER-ADMIN'  && localStorage.getItem('token')  ? <AdminsEdit/> : <Login/>
      },
      {
        path:"/CustomersEdit/:id",
        element: localStorage.getItem('token') ? <CustomersEdit/> : <Login/>
      },
      {
        path:"/CustomersProfile/:id",
        element:localStorage.getItem('token') ? <CustomersProfile/> : <Login/>
      },
      {
        path:"/Cmc",
        element: localStorage.getItem('Role') === 'SUPER-ADMIN'  && localStorage.getItem('token') ? <Cmc/> : <Login/>
      },
      {
        path:'/contractPr/:id',
        element:localStorage.getItem('token') ? <Contract1/> : <Login/>
      }
    
    ]
  },
  {
    path:"/Login",
    element:<Login/>
  },
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter}/>
  </React.StrictMode>
);