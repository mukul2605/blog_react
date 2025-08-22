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
            className='nav-link flex items-center space-x-1 text-red-400 hover:text-red-300 hover:bg-red-900/20 px-3 py-2'
            onClick={logoutHandler}
        >
            <span className="text-sm">🚪</span>
            <span className="hidden sm:inline">Logout</span>
        </button>
    );
}

export default LogoutBtn;
