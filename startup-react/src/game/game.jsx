import React from "react";
import "./game.css";
import { AutoComplete } from "./autoComplete";

export function Game() {
  // Handles guess submissions from AutoComplete
  function handleGuessSubmit(weaponName) {
    console.log("Player guessed:", weaponName);
    // Next step: compare with weapon of the day
  }

  return (
    <main className="container my-5 text-center">
      <div>
        <p>Hi John!</p>
        <p>Guess the Weapon of the Day</p>
      </div>

      <div className="table-responsive">
        <table
          id="guessTable"
          className="table table-dark table-bordered align-middle text-center"
        >
          <thead>
            <tr id="categories">
              <th>Weapon</th>
              <th>Category</th>
              <th>Type</th>
              <th>Damage</th>
              <th>Armor Pen.</th>
              <th>Traits</th>
            </tr>
          </thead>
          <tbody>
            <tr className="guesses">
              <td colSpan="6" className="text-muted">
                Make your first guess!
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ✅ Autocomplete input field */}
      <AutoComplete onSubmit={handleGuessSubmit} />
    </main>
  );
}