// src/Main.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
                <button onClick={() => navigate('/login')} style={{ marginRight: '10px' }}>
                    Login
                </button>
                <button onClick={() => navigate('/register')}>
                    Register
                </button>
            </div>
        </div>
    );
};

export default Main;
