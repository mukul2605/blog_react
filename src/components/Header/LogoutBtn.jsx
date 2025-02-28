import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout()); // Dispatch logout action first
            navigate('/login'); // Then navigate
        }).catch((error) => {
            console.error("Logout error:", error);
        });
    };

    return (
        <button 
            className='px-6 py-2 rounded-full bg-gray-700 text-white font-medium 
                       hover:bg-gray-600 transition-all duration-200 shadow-md'
            onClick={logoutHandler}>
            Logout
        </button>
    );
}

export default LogoutBtn;
