import React from "react";
import "./game.css";
import { AutoComplete } from "./autoComplete";
import { getWeapon, compareWeapons } from "./weaponUtils";
import { GameNotifier } from "./gameNotifier";
import { Players } from "./playerNotif";

export function Game({username}) {
    const [guesses, setGuesses] = React.useState([]);
    const [correctWeapon, setCorrectWeapon] = React.useState(null);
    const [message, setMessage] = React.useState('');
    const [hasWon, setHasWon] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);

    // Set up the daily weapon at mount
    React.useEffect(() => {
        fetch('/api/weapon', { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                if (!data) throw new Error("No weapon data");
                setCorrectWeapon(data); 
            })
            .catch((err) => console.error('Failed to fetch weapon:', err));

        // Restore any saved local guesses for this user
        fetch(`/api/gameState/${username}`, {
            method: 'GET',
            credentials: 'include'
        })
        .then((res) => {
            if (!res.ok) throw new Error('No saved state');
            return res.json();
        })
        .then((data) => {
            setGuesses(data.guesses || []);
            setMessage(data.message || '');
            setHasWon(data.hasWon || false);
        })
        .catch(() => console.log('No saved game state found.'))
        .finally(() => setLoaded(true));
    }, [username]);

    React.useEffect(() => {
        if (!username || !loaded) return;
        const gameState = { guesses, message, hasWon };

        fetch('/api/gameState', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ username, gameState }),
        })
        .catch((err) => console.error('Failed to save game state:', err));
    }, [guesses, message, hasWon, username, loaded]);

    // Handle a new guess
    function handleGuessSubmit(weaponName) {
        if (!correctWeapon || hasWon) return;

        const guessedWeapon = getWeapon(weaponName);
        if (!guessedWeapon) {
            setMessage("That weapon doesn't exist! Try again.");
            return;
        }

        setMessage('');

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
            const totalGuesses = guesses.length + 1;
            setHasWon(true);
            saveScore(totalGuesses);
        }
    }

    async function saveScore(score) {
        const newScore = { name: username, score: score };
        try {
            const response = await fetch('/api/scores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(newScore),
            });

            if (!response.ok) {
                console.error('Failed to save score');
            }

            GameNotifier.broadcastEvent(username, newScore)
        } catch (err) {
            console.error('Error saving score:', err);
        }
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
            <Players username={username} />
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