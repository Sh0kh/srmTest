import React, { useState } from 'react'
import '../Style/Cmc.css'
import Header from './Header'
function Cmc() {
    const [isActive, setActive] = useState(null)
    const modalActive = () =>{
        setActive(!isActive)
    }
  return (
    <div className='Cmc'>
        <Header/>
        <div className='Cmc-content'>
            <div className='Create-cmc'>
                <button onClick={modalActive}>
                    Отправить СМС
                </button>
            </div>
            <div className='Cmc-table'>
                <table>
                    <thead>
                        <tr>
                            <th className='cmc-table-num'>
                                <h3>
                                    #
                                </h3>
                            </th>
                            <th>
                                <h3>
                                Наименование
                                </h3>
                            </th>
                            <th>
                                <h3>
                                Номер телефона
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
                                    Сардор
                                </h3>
                            </td>
                            <td>
                                <h3>
                                    988585656
                                </h3>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
        <div className={`Cmc-modal-bg ${isActive ? 'db' : ''}`}>
            <div className='Cmc-modal-content'>
                <div className='Cmc-modal-header'>
                    <h1>
                        Отправить Смс
                    </h1>
                    <button onClick={modalActive}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><path fill="currentColor" fill-rule="evenodd" d="M1.707.293A1 1 0 0 0 .293 1.707L5.586 7L.293 12.293a1 1 0 1 0 1.414 1.414L7 8.414l5.293 5.293a1 1 0 0 0 1.414-1.414L8.414 7l5.293-5.293A1 1 0 0 0 12.293.293L7 5.586z" clip-rule="evenodd"/></svg>
                    </button>
                </div>
                <form>
                    <label htmlFor="NameCmc">
                        <h3>
                            Названия
                        </h3>
                        <input type="text" id='NameCmc' required />
                    </label>
                    <label htmlFor="TextCmc">
                        <h3>
                            Описание 
                        </h3>
                        <textarea name="" id="TextCmc" required></textarea>
                    </label>
                    <button type='submit'>
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Cmc