import { useState, useEffect } from "react";
// import assets from './assets/images';

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:5000/leaderboard')
          .then(response => response.json())
          .then(data => {
            setLeaderboard(data);
          });
      }, []);

    return (
        <div className="text-center mx-auto max-w-lg bg-gray-100 p-5 rounded-lg shadow-lg">
            <h1 className="text-gray-800 text-2xl font-bold mb-5">Leaderboard</h1>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 text-sm font-semibold">
                            <th className="p-3">College</th>
                            <th className="p-3">Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((college, index) => (
                            <tr key={index} className={`text-gray-700 text-sm ${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}`}>
                                <div className="flex justify-center items-center">
                                    <td className="p-3">{college.name}</td>
                                    <img src={`/images/college-flags/${college.abbreviation}.png`} alt={college.name} className="h-6 inline-block" />
                                </div>
                                <td className="p-3">{college.points} points</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Leaderboard;
