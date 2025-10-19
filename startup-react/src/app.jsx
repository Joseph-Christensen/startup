import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Game } from './game/game';
import { Scores } from './scores/scores';
import { About } from './about/about';

export default function App() {
  return (
    <BrowserRouter>
      <div className="body">
          <header>
              <img id = "logo" src="diverdle.png" alt="DIVERDLE" width = "325"/>
              <nav>
                  <ul className = "nav justify-content-center">
                      <li className = "nav-item"><NavLink className="nav-link text-warning" to="">Login</NavLink></li>
                      <li className = "nav-item"><NavLink className="nav-link text-warning" to="play">Play</NavLink></li>
                      <li className = "nav-item"><NavLink className="nav-link text-warning" to="scores">Scores</NavLink></li>
                      <li className = "nav-item"><NavLink className="nav-link text-warning" to="info">Info</NavLink></li>
                  </ul>
              </nav>
          </header>

          <Routes>
            <Route path='/' element={<Login />} exact />
            <Route path='/play' element={<Game />} />
            <Route path='/scores' element={<Scores />} />
            <Route path='/info' element={<About />} />
            <Route path='*' element={<NotFound />} />
          </Routes>

          <footer>
          <span>Joseph Christensen</span>
          <a id = "github" href="https://github.com/Joseph-Christensen/startup" target = "_blank">GitHub</a>
          </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}