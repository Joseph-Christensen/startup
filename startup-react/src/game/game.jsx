import React from "react";
import "./game.css";
import { AutoComplete } from "./autoComplete";
import { getWeapon, getDailyWeapon, compareWeapons } from "./weaponUtils";

export function Game() {
    const [guesses, setGuesses] = React.useState([]);
    const [correctWeapon, setCorrectWeapon] = React.useState(null);
    const [message, setMessage] = React.useState('');
    const [hasWon, setHasWon] = React.useState(false);

    const username = localStorage.getItem("username") || "Anonymous";

    // Set up the daily weapon at mount
    React.useEffect(() => {
        const dailyWeapon = getDailyWeapon();
        setCorrectWeapon(dailyWeapon);

        // Save today's date in Mountain time for reset detection
        const now = new Date();
        const mountainString = now.toLocaleString("en-US", { timeZone: "America/Denver" });
        const mountainDate = new Date(mountainString).toISOString().slice(0, 10);
        localStorage.setItem("weaponDate", mountainDate);

        const savedData = localStorage.getItem(`gameState_${username}`);
        if (savedData) {
            const parsed = JSON.parse(savedData);
            setGuesses(parsed.guesses || []);
            setMessage(parsed.message || '');
            setHasWon(parsed.hasWon || false);
        }

        // Auto-reset the game when midnight Mountain Time hits
        const checkForMidnight = setInterval(() => {
        const current = new Date();
        const currentMountain = new Date(current.toLocaleString("en-US", { timeZone: "America/Denver" }));
        const currentDate = currentMountain.toISOString().slice(0, 10);
        const savedDate = localStorage.getItem("weaponDate");

        if (savedDate && savedDate !== currentDate) {
            localStorage.clear();
            window.location.reload();
        }
        }, 60000);

        return () => clearInterval(checkForMidnight);
    }, []);

    React.useEffect(() => {
        const gameState = {
            guesses,
            message,
            hasWon,
        };
        localStorage.setItem(`gameState_${username}`, JSON.stringify(gameState));
    }, [guesses, message, hasWon]);

    // Handle a new guess
    function handleGuessSubmit(weaponName) {
        if (!correctWeapon || hasWon) return;

        const guessedWeapon = getWeapon(weaponName);
        if (!guessedWeapon) {
            setMessage("That weapon doesn't exist! Try again.");
            return;
        }

        const comparison = compareWeapons(guessedWeapon, correctWeapon);

        // Create a table row entry
        const newGuess = {
            name: guessedWeapon.name,
            feedback: comparison,
            data: guessedWeapon
        };

        setGuesses((prev) => [...prev, newGuess]);

        const allCorrect = Object.values(comparison).every((val) => val === "correct");

        if (allCorrect) {
            setHasWon(true);
            saveScoreToLocalStorage(guesses.length + 1);
        }
    }

    
  

    function saveScoreToLocalStorage(score) {
        const username = localStorage.getItem("username") || "Anonymous";
        const date = localStorage.getItem("weaponDate");

        const scoresText = localStorage.getItem("scores");
        let scores = scoresText ? JSON.parse(scoresText) : [];

        // If this user already scored today, do nothing
        const alreadyPlayed = scores.find((s) => s.name === username);
        if (alreadyPlayed) return;

        // Add new entry
        scores.push({ name: username, score });
        localStorage.setItem("scores", JSON.stringify(scores));
        localStorage.setItem("scoresDate", date);
    }

  // Render table rows dynamically
    const guessRows = guesses.map((guess, i) => (
        <tr key={i} className="guesses">
        <td className={guess.feedback.name}>{guess.name}</td>
        <td className={guess.feedback.category}>{guess.data.category}</td>
        <td className={guess.feedback.type}>{guess.data.type}</td>
        <td className={guess.feedback.damage}>{guess.data.damage}</td>
        <td className={guess.feedback.armorPen}>{guess.data.armorPen}</td>
        <td className={guess.feedback.traits}>{guess.data.traits.join(", ")}</td>
        </tr>
    ));

    return (
        <main className="container my-5 text-center">
            <div>
                <p>Guess the Weapon of the Day!</p>
            </div>

            <div className="table-responsive">
                <table id="guessTable" className="table table-dark table-bordered align-middle text-center">
                    <thead>
                        {guessRows.length > 0 &&
                            <tr id="categories">
                            <th>Weapon</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Damage</th>
                            <th>Armor Pen.</th>
                            <th>Traits</th>
                            </tr>
                        }  
                    </thead>
                    <tbody>
                        {guessRows.length > 0 && 
                            guessRows 
                        }
                </tbody>
                </table>
            </div>

            {/* Autocomplete Guess Input */}
            {!hasWon ? (
                <AutoComplete onSubmit={handleGuessSubmit} />
            ) : (
                <p className="mt-3 text-warning fw-bold">You found the Weapon of the Day in {guesses.length} guesses!</p>
            )}
            {message && <div className="text-danger text-center mt-3">{message}</div>}
        </main>
    );
}