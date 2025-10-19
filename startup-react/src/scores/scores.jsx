import React from 'react';
import "./scores.css";

export function Scores() {
    const [scores, setScores] = React.useState([]);
    const [userRank, setUserRank] = React.useState(null);
    const [percentile, setPercentile] = React.useState(null);

    React.useEffect(() => {

        const getMountainDate = () => {
            const now = new Date();
            const mountainString = now.toLocaleString("en-US", { timeZone: "America/Denver" });
            const mountainDate = new Date(mountainString);
            
            console.log("[Time Check] Local time:", now.toString());
            console.log("[Time Check] Mountain time:", mountainDate.toString());
            
            return mountainDate.toISOString().slice(0, 10);
        };

        const today = getMountainDate();
        const lastDate = localStorage.getItem("scoresDate");
        
        console.log("[Scores Reset Check] Today:", today);
        console.log("[Scores Reset Check] Last Date:", lastDate);

        if (lastDate !== today) {
            localStorage.removeItem("scores");
            localStorage.setItem("scoresDate", today);
        } else {
            console.log("[Scores Reset] Same day, keeping scores.");
        }

        const scoresText = localStorage.getItem('scores');
        if (scoresText) {

            const parsedScores = JSON.parse(scoresText);
            parsedScores.sort((a, b) => a.score - b.score);
            setScores(parsedScores);

            const username = localStorage.getItem('username');
            if (username) {
                const rank = parsedScores.findIndex(s => s.name === username) + 1;
                if (rank > 0) {
                    setUserRank(rank);
                    let percentileValue = 100;
                    if (parsedScores.length > 1) {
                        percentileValue = ((parsedScores.length - rank) / (parsedScores.length - 1)) * 100;
                    }
                    setPercentile(Math.round(percentileValue));
                }
            }
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

    let statsSection = null;

    if (userRank !== null && percentile !== null) {
        statsSection = (
        <div className="mt-4">
            <p className="lead">
            You placed <span className="text-warning">#{userRank}</span> out of{" "}
            {scores.length} players today.
            </p>
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