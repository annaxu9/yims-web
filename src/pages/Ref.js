import { useEffect, useState } from 'react';
import ScoreModal from '../components/ref/ScoreModel';

const sportsData = {
    'Soccer': { players: 11, emoji: "⚽" },
    'Flag Football': { players: 6, emoji: "🏈" },
    'Spikeball': { players: 6, emoji: "🦔" },
    'Cornhole': { players: 6, emoji: "🌽" },
    'Pickleball': { players: 6, emoji: "🥒" },
    'Ping Pong': { players: 10, emoji: "🏓" },
    'W-Hoops': { players: 5, emoji: "🏀" },
    'M-Hoops': { players: 5, emoji: "🏀" },
    'C-Hoops': { players: 5, emoji: "🏀" },
    'Dodgeball': { players: 8, emoji: "🤾" },
    'Broomball': { players: 6, emoji: "🧹" },
    'Indoor Soccer': { players: 5, emoji: "🥅" },
    'Volleyball': { players: 6, emoji: "🏐" },
    'Badminton': { players: 6, emoji: "🏸" }
  };

export default function Ref() {
    const [matches, setMatches] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/past-unscored-matches')
            .then(response => response.json())
            .then(data => setMatches(data))
            .catch(error => console.error('Error fetching matches:', error));
    }, []);

    const updateMatchScore = (matchId, college1Outcome, college2Outcome) => {
        const outcomeToScore = {
            'win': 2,
            'loss': 1,
            'forfeit': 0,
            'tie': 1
        };

        const college_pts1 = outcomeToScore[college1Outcome];
        const college_pts2 = outcomeToScore[college2Outcome];

        fetch(`http://127.0.0.1:5000/update-match/${matchId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ college_pts1, college_pts2 })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Match updated:', data);
            // Refresh the match list to reflect the updated score
            setMatches(matches.map(match => match.id === matchId ? { ...match, college_pts1, college_pts2 } : match));
            setSelectedMatch(null); // Close the modal
        })
        .catch(error => console.error('Error updating match:', error));
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Score Past Matches</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border-b">Date</th>
                        <th className="p-2 border-b">Game</th>
                        <th className="p-2 border-b">Sport</th>
                        <th className="p-2 border-b">Outcome</th>
                        <th className="p-2 border-b">Ref</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map(match => (
                        <tr key={match.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedMatch(match)}>
                            <td className="p-2 border-b">{new Date(match.date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</td>
                            <td className="p-2 border-b">{`${match.college1} vs ${match.college2}`}</td>
                            <td className="p-2 border-b">{match.sport} {sportsData[match.sport].emoji}</td>
                            <td className="p-2 border-b">{match.college_pts1 === -1 ? 'Unscored' : `${match.college_pts1} - ${match.college_pts2}`}</td>
                            <td className="p-2 border-b">{match.ref || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>

                </table>
            </div>
            {selectedMatch && <ScoreModal match={selectedMatch} onClose={() => setSelectedMatch(null)} updateMatchScore={updateMatchScore} />}
        </div>
    );
}
