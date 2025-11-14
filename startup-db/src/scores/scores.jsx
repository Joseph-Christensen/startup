import React from 'react';
import "./scores.css";

export function Scores() {
    const [scores, setScores] = React.useState([]);
    const [percentile, setPercentile] = React.useState(null);
    const [allTimePercentile, setAllTimePercentile] = React.useState(null);

    React.useEffect(() => {
        // Fetch scores from backend
        let scoreToday = null;
        const username = localStorage.getItem('username');

        fetch('/api/scores', { cache: 'no-store' , credentials: 'include' })
        .then((response) => {
            if (!response.ok) throw new Error('Failed to fetch scores');
            return response.json();
        })
        .then((fetchedScores) => {
            // Sort by fewest guesses
            const sortedScores = fetchedScores.sort((a, b) => a.score - b.score);
            setScores(sortedScores);

            // Calculate percentile if logged in
            if (username) {
                const rank = sortedScores.findIndex(s => s.name === username) + 1;
                if (rank > 0) {
                    scoreToday = sortedScores[rank - 1];
                    let percentileValue = 100;
                    if (sortedScores.length > 1) {
                    percentileValue = ((sortedScores.length - rank) / (sortedScores.length - 1)) * 100;
                    }
                    setPercentile(Math.round(percentileValue));
                }
            }
        })
        .catch((err) => console.error("[Scores] Error fetching scores:", err))
        .finally(() => {
            fetch('/api/scores/alltime', { cache: 'no-store', credentials: 'include' })
                .then((response) => {
                if (!response.ok) throw new Error('Failed to fetch all-time scores');
                return response.json();
                })
                .then((fetchedAllTime) => {
                // Sort by fewest guesses
                const allScores = [...fetchedAllTime];
                if (scoreToday) allScores.push(scoreToday);
                const sortedAllTime = allScores.sort((a, b) => a.score - b.score);

                // Calculate percentile
                if (username && scoreToday) {
                    const allTimeRank = sortedAllTime.findIndex(s => s.score === scoreToday.score) + 1;
                    if (allTimeRank > 0) {
                    let allTimeValue = 100;
                    if (sortedAllTime.length > 1) {
                        allTimeValue = ((sortedAllTime.length - allTimeRank) / (sortedAllTime.length - 1)) * 100;
                    }
                    setAllTimePercentile(Math.round(allTimeValue));
                    }
                }
                })
                .catch((err) => console.error("[Scores] Error fetching all-time scores:", err));
        });
    }, []);

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

    let statsSection = null;

    if (allTimePercentile !== null && percentile !== null) {
        statsSection = (
        <div className="mt-4">
            <p className="lead">
            You scored better than{" "}
            <span className="text-warning">{percentile}%</span> of other players
            today.
            </p>
            <p className="lead">
            You scored better than{" "}
            <span className="text-warning">{allTimePercentile}%</span> of your past scores
            today.
            </p>
        </div>
        );
    } else if (percentile != null) {
        statsSection = (
        <div className="mt-4">
            <p className="lead">
            You scored better than{" "}
            <span className="text-warning">{percentile}%</span> of other players
            today.
            </p>
        </div>
        );
    } else if (scores.length > 0) {
        statsSection = (
        <div className="mt-4">
            <p className="lead">Play today to see your rank on the leaderboard!</p>
        </div>
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
            {statsSection}
        </main>
    );
}