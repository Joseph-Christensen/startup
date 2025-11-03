import React from 'react';

import './login.css';

export function Unauthenticated({onLogin}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');

  async function loginUser() {
    if (!username || !password) {
      setMessage('Please enter both username and password.')
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        localStorage.setItem('username', username);
        onLogin(username);
      } else {
        setMessage('Invalid login credentials.');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setMessage('Error connecting to server.');
    }
  }
  

  async function createUser() {
    if (!username || !password) {
      setMessage('Please enter both username and password.');
      return;
    }

    try {
      const response = await fetch('/api/auth/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        localStorage.setItem('username', username);
        onLogin(username);
      } else if (response.status === 409) {
        setMessage('That username is already taken.');
      } else {
        setMessage('Error creating account.');
      }
    } catch (err) {
      console.error('Error creating user:', err);
      setMessage('Error connecting to server.');
    }
  }

  return (
    <main className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
      <div className="text-center mb-4">
        <h1>Welcome to Diverdle!</h1>
        <p className="lead text-white" style={{ fontSize: '1.25rem' }}>
          Login to Play
        </p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="w-100" style={{ maxWidth: '400px' }}>
        <div className="mb-3 text-start">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            id="username"
            type="text"
            className="form-control"
            placeholder="Your Username Here"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3 text-start">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            className="form-control"
            placeholder="Your Password Here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="d-flex justify-content-center gap-2">
          <button type="button" onClick={loginUser} className="btn btn-outline-warning fw-bold">
            Login
          </button>
          <button type="button" onClick={createUser} className="btn btn-outline-warning fw-bold">
            Create
          </button>
        </div>

        {message && <div className="text-danger text-center mt-3">{message}</div>}
      </form>
    </main>
  );
}
