import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { Login } from './login/login';
import { Game } from './game/game';
import { Scores } from './scores/scores';
import { About } from './about/about';
import { AuthState } from './login/authState';

function useDailyReset(callback) {
  React.useEffect(() => {
    const checkForMidnight = () => {
      const now = new Date();
      const mtNow = new Date(now.toLocaleString("en-US", { timeZone: "America/Denver" }));
      const today = mtNow.toISOString().slice(0, 10);
      const lastDate = localStorage.getItem('lastDate');

      // Only trigger once per new date
      if (lastDate !== today) {
        localStorage.setItem('lastDate', today);
        callback(today);
      }
    };

    // Run on mount + every minute
    checkForMidnight();
    const interval = setInterval(checkForMidnight, 60 * 1000);
    return () => clearInterval(interval);
  }, [callback]);
}

export default function App() {
  const [username, setUsername] = React.useState(localStorage.getItem('username') || '');
  const [authState, setAuthState] = React.useState(
    username ? AuthState.Authenticated : AuthState.Unauthenticated
  );

  useDailyReset(async (newDate) => {
    console.log(`Midnight reset triggered for ${newDate}`);

    // Backend to clears daily scores
    try {
      await fetch('/api/scores', { method: 'DELETE', credentials: 'include' });
      console.log('[Reset] Backend scores cleared');
    } catch (err) {
      console.error('[Reset] Could not contact server to clear scores:', err);
    }

    // Clear local game state (except username)
    const savedUsername = localStorage.getItem('username');
    localStorage.clear();
    if (savedUsername) localStorage.setItem('username', savedUsername);
    localStorage.setItem('lastDate', newDate);

    // Refresh the page so new weapon + new scores show up
    window.location.reload();
  });

  React.useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem('username');
      if (storedUser) {
        setUsername(storedUser);
        setAuthState(AuthState.Authenticated);
      } else {
        setUsername('');
        setAuthState(AuthState.Unauthenticated);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <BrowserRouter>
      <div className="body">
        <header>
          <img id="logo" src="diverdle.png" alt="DIVERDLE" width="325" />
          <nav>
            <ul className="nav justify-content-center">
              <li className="nav-item">
                <NavLink className="nav-link text-warning" to="/">Login</NavLink>
              </li>
              {authState === AuthState.Authenticated && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link text-warning" to="/play">Play</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link text-warning" to="/scores">Scores</NavLink>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink className="nav-link text-warning" to="/info">Info</NavLink>
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <Login
                username={username}
                authState={authState}
                onAuthChange={(newUsername, newAuthState) => {
                  setUsername(newUsername);
                  setAuthState(newAuthState);
                }}
              />
            }
          />
          <Route path="/play" element={<Game username={username} />} />
          <Route path="/scores" element={<Scores username={username} />} />
          <Route path="/info" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer>
          <span>Joseph Christensen</span>
          <a id="github" href="https://github.com/Joseph-Christensen/startup" target="_blank" rel="noreferrer">GitHub</a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <main className="container-fluid bg-secondary text-center">
      404: Return to sender. Address unknown.
    </main>
  );
}