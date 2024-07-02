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

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    errorElement:<Error/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/Customers",
        element:<Customers/>,
      },
      {
        path:"/CreateCustomers",
        element:<CreateCustomers/>,
      },
      {
        path:"/Profile",
        element:<Profile/>,
      },
      {
        path:"/Contracts",
        element:<Contracts/>,
      },
      {
        path:"/CreateContracts",
        element:<CreateContracts/>
      },
      {
        path:"/ContractEdit/:id",
        element:<ContractEdit/>
      },
      {
        path:"/Admins",
        element:localStorage.getItem('Role') === 'SUPER-ADMIN' ? <Admins/> : <Home/>
      },
      {
        path:"/CreateAdmins",
        element: localStorage.getItem('Role') === 'SUPER-ADMIN' ? <CreateAdmins/> : <Home/>
      },
      {
        path:"/AdminsEdit/:id",
        element: localStorage.getItem("Role") === 'SUPER-ADMIN' ? <AdminsEdit/> : <Home/>
      },
      {
        path:"/CustomersEdit/:id",
        element:<CustomersEdit/>
      },
      {
        path:"/CustomersProfile/:id",
        element:<CustomersProfile/>
      },
      {
        path:"/Cmc",
        element: localStorage.getItem('Role') === 'SUPER-ADMIN' ? <Cmc/> : <Home/>
      },
    
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