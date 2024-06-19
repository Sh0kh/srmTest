import React from 'react'
import '../Style/Error.css'
import { NavLink } from 'react-router-dom'
function Error() {
  return (
    <div className='Error'>
        <div className='Error-wrapper'>
            <h1>
                Ошибка 
            </h1>
            <NavLink to="">
                Вернутся 
            </NavLink>
        </div>
    </div>
  )
}

export default Error