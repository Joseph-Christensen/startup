import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthState } from './authState';
import './login.css';

export function Authenticated({ username, onLogout }) {
  const navigate = useNavigate();

  function logoutUser() {
    localStorage.removeItem('username'); 
    onLogout('', AuthState.Unauthenticated);                        
    navigate('/');                      
  }

  return (
    <main className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
      <div className="text-center mb-4">
        <h2 className="text-warning">Welcome {username}!</h2>
      </div>

      <div className="d-flex flex-column gap-3 w-100" style={{ maxWidth: '300px' }}>
        <button className="btn btn-outline-warning fw-bold" onClick={() => navigate('/play')}>
          Play
        </button>
        <button className="btn btn-outline-danger fw-bold" onClick={logoutUser}>
          Logout
        </button>
      </div>
    </main>
  );
}