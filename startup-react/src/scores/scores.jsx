import React from 'react';
import "./scores.css";

export function Scores() {
  return (
    <main className="container my-5 text-center">
        <h2 className="mb-4 text-warning">Today's Leaderboard</h2>

        <div className="table-responsive">
            <table id="scoresTable" className="table table-dark table-striped table-bordered align-middle text-center">
                <thead id = "scoresHead">
                    <tr>
                        <th scope="col">Place</th>
                        <th scope="col">Name</th>
                        <th scope="col">Guesses</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>1</th>
                        <th>Little Caesar</th>
                        <th>3</th>
                    </tr>
                    <tr>
                        <th>2</th>
                        <th>Domino</th>
                        <th>5</th>
                    </tr>
                    <tr>
                        <th>3</th>
                        <th>Papa John</th>
                        <th>27</th>
                    </tr>
                </tbody>
            </table>
        </div>

        <div className="mt-4">
            <p className="lead">You placed higher than <span className="text-warning">90%</span> of other players.</p>
            <p className="lead">Today's score was better than <span className="text-warning">54%</span> of your past scores.</p>
        </div>
    </main>
  );
}