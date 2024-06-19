import React, { useState } from 'react'
import '../Style/CreateCustomers.css'
import Header from './Header'
function CreateCustomers() {
    // const [isActive, setActive] = useState(null)
    // const ClikcButton = ()=>{
    //     setActive(!isActive)
    // }

    const [isActiveBtn, setActiveBtn] = useState(1)

    const ButtonClick = (a) => {
        setActiveBtn(a)
    }
    return (
        <div className='CreateCustomers'>
            <Header />
            <div className='CreateCustomers-content'>
                <div className='CreateCust'>
                    <div className='CreateCustomers-saidbar'>
                        <button className={isActiveBtn === 1 ? 'createCust_btn-active' : ''}
                            onClick={() => ButtonClick(1)}
                        >
                            Физическое лицо
                        </button>
                        <button
                            className={isActiveBtn === 2 ? 'createCust_btn-active' : ''}
                            onClick={() => ButtonClick(2)}
                        >
                            Юридик лицо
                        </button>
                        <button
                            className={isActiveBtn === 3 ? 'createCust_btn-active' : ''}
                            onClick={() => ButtonClick(3)}
                        >
                            Акцион тендер
                        </button>
                    </div>
                    <form className={`${isActiveBtn === 1 ? 'CustCreateActive' : 'dn'}`}>
                        <h2>
                            Создать клиента (Физическое лицо)
                        </h2>
                        <div className='CreateCustoers-content-gridd'>
                            <label htmlFor="name">
                                <h3>
                                    Имя
                                </h3>
                                <input id='name' type="text" />
                            </label>
                            <div className="modal-foto">
                                <h3>Фото</h3>
                                <label className="file-input-container" htmlFor="photo">
                                    <span className='soz'>Фото</span>
                                    <input id="photo"  accept="image/*" type="file" />
                                </label>
                            </div>
                            <label htmlFor="Last_name">
                                <h3>
                                    Фамилия
                                </h3>
                                <input id='Last_name' type="text" />
                            </label>
                            <label htmlFor="Last_name2">
                                <h3>
                                    Отчество
                                </h3>
                                <input id='Last_name2' type="text" />
                            </label>
                            <label htmlFor="Tel">
                                <h3>
                                    Номер телефона
                                </h3>
                                <input id='Tel' type="number" />
                            </label>
                        </div>
                        <div className='CreateCustomers-cuntract'>
                            <h3>
                                Искать контракт
                            </h3>
                            <label className='CreateCustomers-search'>
                                <div className='CreateCustomers-search-svg'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14" /></svg>
                                </div>
                                <input type="text" />
                            </label>
                            {/* <span onClick={ClikcButton} className={`CreateCustomers-cuntract-item ${isActive ? 'CreateCustomers-cuntract-item-start' : ''}`}>
                        Контракт 2
                    </span>
                    <span className='CreateCustomers-cuntract-item2'>
                        Контракт не найден 
                    </span> */}
                        </div>
                        <button type='submit'>
                            Создать
                        </button>
                    </form>
                    <form className={`${isActiveBtn === 2 ? 'CustCreateActive' : 'dn'}`}>
                        <h2>
                            Создать клиента (Юридическое лицо )
                        </h2>
                        <div className='CreateCustoers-content-gridd'>
                            <label htmlFor="name">
                                <h3>
                                    Названия
                                </h3>
                                <input id='name' type="text" />
                            </label>
                            <div className="modal-foto">
                                <h3>Фото</h3>
                                <label className="file-input-container" htmlFor="photo">
                                    <span className='soz'>Фото</span>
                                    <input id="photo"  accept="image/*" type="file" />
                                </label>
                            </div>
                            <label htmlFor="Tel">
                                <h3>
                                    Номер телефона
                                </h3>
                                <input id='Tel' type="number" />
                            </label>
                        </div>
                        <div className='CreateCustomers-cuntract'>
                            <h3>
                                Искать контракт
                            </h3>
                            <label className='CreateCustomers-search'>
                                <div className='CreateCustomers-search-svg'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14" /></svg>
                                </div>
                                <input type="text" />
                            </label>
                            {/* <span onClick={ClikcButton} className={`CreateCustomers-cuntract-item ${isActive ? 'CreateCustomers-cuntract-item-start' : ''}`}>
                        Контракт 2
                    </span>
                    <span className='CreateCustomers-cuntract-item2'>
                        Контракт не найден 
                    </span> */}
                        </div>
                        <button type='submit'>
                            Создать
                        </button>
                    </form>
                    <form className={`${isActiveBtn === 3 ? 'CustCreateActive' : 'dn'}`}>
                        <h2>
                            Создать клиента (Акцинер тендер)
                        </h2>
                        <div className='CreateCustoers-content-gridd'>
                            <label htmlFor="name">
                                <h3>
                                    Названия
                                </h3>
                                <input id='name' type="text" />
                            </label>
                            <div className="modal-foto">
                                <h3>Фото</h3>
                                <label className="file-input-container" htmlFor="photo">
                                    <span className='soz'>Фото</span>
                                    <input id="photo"  accept="image/*" type="file" />
                                </label>
                            </div>
                            <label htmlFor="Tel">
                                <h3>
                                    Номер телефона
                                </h3>
                                <input id='Tel' type="number" />
                            </label>
                        </div>
                        <div className='CreateCustomers-cuntract'>
                            <h3>
                                Искать контракт
                            </h3>
                            <label className='CreateCustomers-search'>
                                <div className='CreateCustomers-search-svg'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14" /></svg>
                                </div>
                                <input type="text" />
                            </label>
                            {/* <span onClick={ClikcButton} className={`CreateCustomers-cuntract-item ${isActive ? 'CreateCustomers-cuntract-item-start' : ''}`}>
                        Контракт 2
                    </span>
                    <span className='CreateCustomers-cuntract-item2'>
                        Контракт не найден 
                    </span> */}
                        </div>
                        <button type='submit'>
                            Создать
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateCustomers