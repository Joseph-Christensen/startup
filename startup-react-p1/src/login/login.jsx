import React from 'react';
import "./login.css";

export function Login() {
  return (
    <main className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
        <div className = "text-center mb-4">
            <h1>Welcome to Diverdle!</h1>
            <p className="lead" style={{ color: "white", fontSize: "1.25rem" }}>Login to Play</p>
        </div>
        <form method = "get" action = "game" className="w-100" style={{ maxWidth: "400px" }}>
            <div className="mb-3 text-start">
                <label htmlFor="username" className="form-label">Username</label>
                <input id="username" type="text" className="form-control" placeholder = "Your Username Here"/>
            </div>
            <div className="mb-3 text-start">
                <label htmlFor="password" className="form-label">Password</label>
                <input id="password" type="password" className="form-control" placeholder="Your Password Here"/>
            </div>
            <div className="d-flex justify-content-center gap-2">
              <button type="submit" className="btn btn-outline-warning fw-bold">Login</button>
              <button type="submit" className="btn btn-outline-warning fw-bold">Create</button>
            </div>
        </form>
    </main>
  );
}