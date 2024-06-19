import { Outlet } from 'react-router-dom';
import './App.css';
import SaidBar from './components/SaidBar';

function App() {
  return (
    <div className="App">
      <SaidBar/>
      <Outlet/>
    </div>
  );
}

export default App;
