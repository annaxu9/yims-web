import { useEffect, useState } from 'react';

export default function Ref() {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/past-unscored-matches')
            .then(response => response.json())
            .then(data => setMatches(data))
            .catch(error => console.error('Error fetching matches:', error));
    }, []);

    return (
        <div>
            <h2>Ref</h2>
            <table>
                <thead>
                    <tr>
                        <th>College 1</th>
                        <th>College 2</th>
                        <th>Sport</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Start Time</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map(match => (
                        <tr key={match.id}>
                            <td>{match.college1}</td>
                            <td>{match.college2}</td>
                            <td>{match.sport}</td>
                            <td>{match.location}</td>
                            <td>{match.date}</td>
                            <td>{match.start_time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
