import { useState, useEffect } from "react";
import trophy from "../../assets/icons/trophy.png";

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
        <div className="text-center mx-auto max-w-lg border-4 border-[#4267E6] p-5 rounded-lg">
            <h1 className="text-[#4267E6] text-2xl font-bold mb-5">Standings</h1>
            <img src={trophy} alt="trophy" className="h-64 mx-auto" />
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-[#4267E6] text-sm font-semibold">
                            <th className="p-3">Rank</th>
                            <th className="p-3">College</th>
                            <th className="p-3">Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((college, index) => (
                            <tr key={index} className={`text-gray-700 text-sm`}>
                                <td className="p-3">{index + 1}</td>
                                <td className="flex justify-center items-center">
                                    <p className="p-3">{college.name}</p>
                                    <img src={`/images/college-flags/${college.abbreviation}.png`} alt={college.name} className="h-6 inline-block" />
                                </td>
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
