import React, { useEffect, useRef, useState } from 'react';
import '../Style/Home.css';
import Header from './Header';
import { NavLink } from 'react-router-dom';
function Home() {
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
            <span>10</span>
          </div>
          <div className='Home-card'>
            <h3>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                <path fill="currentColor" d="M428 224H288a48 48 0 0 1-48-48V36a4 4 0 0 0-4-4h-92a64 64 0 0 0-64 64v320a64 64 0 0 0 64 64h224a64 64 0 0 0 64-64V228a4 4 0 0 0-4-4" />
                <path fill="currentColor" d="M419.22 188.59L275.41 44.78a2 2 0 0 0-3.41 1.41V176a16 16 0 0 0 16 16h129.81a2 2 0 0 0 1.41-3.41" />
              </svg>
                Контракты
            </h3>
            <span>10</span>
          </div>
          <div className='Home-card'>
            <h3>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                <path fill="currentColor" d="M256 256a112 112 0 1 0-112-112a112 112 0 0 0 112 112m0 32c-69.42 0-208 42.88-208 128v64h416v-64c0-85.12-138.58-128-208-128" />
              </svg>
              Админы
            </h3>
            <span>10</span>
          </div>
        </div>
        <div className='Home-table-wrapper'>
          <div className='Home-table-header'>
            <h2>Последние клиенты</h2>
          </div>
          <div className='Home-table-main'>
            <div className='Home-table-main-top'>
              <div className='Home-table-main-search'>
                <div className='Home-table-search-grid'>
                  <select name="" id="">
                    <option value="default">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                  </select>
                  <button
                    ref={DownBtn}
                    onClick={DocumentDown}
                    className='Home-table-search-doc'
                  >
                    Export
                  </button>
                  <div ref={modalRef} className={`Down-modal ${isActive ? 'Down-modal-active' : ''}`}>
                    <a href="!#" download>Excel</a>
                    <a href="!#" download>PDF</a>
                    <a href="!#" download>Print</a>
                    <a href="!#" download>CSV</a>
                  </div>
                </div>
                <div className='Home-table-search-ser'>
                  <label htmlFor="doc">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14" />
                    </svg>
                    <input placeholder='Поиск...' id='doc' type="text" />
                  </label>
                </div>
              </div>
            </div>
            <div className='Home-table'>
              <table>
                <thead>
                  <tr>
                    <th className='Home-table-num'>
                      <h3>
                        #
                      </h3>
                    </th>
                    <th >
                      <h3>
                        Фото 
                      </h3>
                    </th>
                    <th >
                      <h3>
                        Имя
                      </h3>
                    </th>
                    <th >
                      <h3>
                        Время запуска
                      </h3>
                    </th>
                    <th >
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
                          04-06-2024
                      </h3>
                    </td>
                    <td>
                    <NavLink to="/CustomersProfile">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"/></svg>
                    </NavLink>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>
                        2
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
                          04-06-2024
                      </h3>
                    </td>
                    <td>
                    <NavLink to="/CustomersProfile">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"/></svg>
                    </NavLink>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>
                        3
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
                          04-06-2024
                      </h3>
                    </td>
                    <td>
                    <NavLink to="/CustomersProfile">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"/></svg>
                    </NavLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='Home-table-footer'>
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
    </div>
  );
}

export default Home;
