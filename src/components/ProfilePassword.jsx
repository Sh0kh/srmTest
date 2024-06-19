import React from 'react'
import { useNavigate } from 'react-router-dom';
function ProfilePassword() {
    const navigate = useNavigate();

    const closeModal = () => {
      navigate(-1);
    };
  return (
    <div>
         <button onClick={closeModal} >Close</button>
    </div>
  )
}

export default ProfilePassword