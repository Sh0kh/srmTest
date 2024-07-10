import { Outlet } from 'react-router-dom';
import './App.css';
import SaidBar from './components/SaidBar';

function App() {
  return (
    <div className="App">
     <div className={localStorage.getItem('token') ? "block" : 'dnn'}>
     <SaidBar/>
     </div>
      <Outlet/>
    </div>
  );
}

export default App;
