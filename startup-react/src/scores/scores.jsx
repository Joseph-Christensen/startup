import React from 'react';
import "./scores.css";

export function Scores() {
    const [scores, setScores] = React.useState([]);

    React.useEffect(() => {
        const scoresText = localStorage.getItem('scores');
        if (scoresText) {
            const parsedScores = JSON.parse(scoresText);
            parsedScores.sort((a, b) => a.score - b.score);
            setScores(parsedScores);
        }
    }, [])

    let scoreRows = [];

    if (scores.length > 0) {
        for (let i = 0; i < scores.length; i++) {
        const score = scores[i];
        scoreRows.push(
            <tr key={i}>
            <td>{i + 1}</td>
            <td>{score.name}</td>
            <td>{score.score}</td>
            </tr>
        );
        }
    } else {
        scoreRows.push(
        <tr key="0">
            <td colSpan="3">Be the first to score!</td>
        </tr>
        );
    }


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
                    {scoreRows}
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