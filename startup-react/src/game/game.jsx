import React from 'react';
import "./game.css";

export function Game() {
  return (
    <main className="container my-5 text-center">
        
        <div>
            <p>Hi Player-Username!</p>
            <p>Guess the Weapon of the Day</p>
        </div>

        <div className="table-responsive">
            <table id="guessTable" className="table table-dark table-bordered align-middle text-center">
                <thead>
                    <tr id = "categories">
                        <th>Weapon</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Damage</th>
                        <th>Armor Pen.</th>
                        <th>Traits</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className = "guesses">
                        <td className = "correct">?</td>
                        <td className = "partial">?</td>
                        <td className = "incorrect">?</td>
                        <td className = "incorrect higher">?</td>
                        <td className = "incorrect lower">?</td>
                        <td className = "correct">?</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <form id="guessForm" className="d-flex justify-content-center mt-3">
            <input type = "text" className = "form-control w-50" placeholder = "Enter your weapon guess"/>
            <button type="submit" className="btn btn-outline-warning ms-2 fw-bold">Submit</button>
        </form>
    </main>
  );
}