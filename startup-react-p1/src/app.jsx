import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className="body">
        <header>
            <img id = "logo" src="./public/Diverdle.png" alt="DIVERDLE" width = "325"/>
            <nav>
                <ul class = "nav justify-content-center">
                    <li class = "nav-item"><a class="nav-link text-warning" href="index.html">Home</a></li>
                    <li class = "nav-item"><a class="nav-link text-warning" href="game.html">Game</a></li>
                    <li class = "nav-item"><a class="nav-link text-warning" href="scores.html">Scores</a></li>
                    <li class = "nav-item"><a class="nav-link text-warning" href="about.html">Info</a></li>
                </ul>
            </nav>
        </header>

        <main class="container d-flex flex-column justify-content-center align-items-center flex-grow-1">App components go here</main>

        <footer>
        <span>Joseph Christensen</span>
        <a id = "github" href="https://github.com/Joseph-Christensen/startup" target = "_blank">GitHub</a>
        </footer>
    </div>
  );
}