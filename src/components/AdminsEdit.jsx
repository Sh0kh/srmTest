import React from 'react'
import Header from './Header'
import '../Style/AdminsEdit.css'
function AdminsEdit() {
    return (
        <div className='AdminsEdit'>
            <Header />
            <div className='AdminsEdit-content'>
                <form>
                    <h2>
                        Изменить Админа
                    </h2>
                    <div className='CreateCustoers-content-grid'>
                        <label htmlFor="name">
                            <h3>
                                Имя
                            </h3>
                            <input id='name' type="text" />
                        </label>
                    </div>
                    <div className="modal-foto">
                        <h3>Фото</h3>
                        <label className="file-input-container" htmlFor="photo">
                            <span className='soz'>Фото</span>
                            <input id="photo" accept="image/*" type="file" />
                        </label>
                    </div>
                    <label htmlFor="em">
                        <h3>
                            Email
                        </h3>
                        <input id='em' type='email' />
                    </label>
                    <label htmlFor="pass">
                        <h3>
                            Пароль
                        </h3>
                        <input id='pass' type="text" />
                    </label>
                    <label htmlFor="info">
                        <h3>
                            Описание
                        </h3>
                        <textarea name="" id="info"></textarea>
                    </label>
                    <button type='submit'>
                        Создать
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminsEdit