import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Match from './Match';
import 'react-calendar/dist/Calendar.css'; // Import default styles for react-calendar
import './schedule.css';

export default function MatchCalendar() {
  const [matches, setMatches] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState('');
  const [selectedSport, setSelectedSport] = useState('');

  const colleges = [
    "Benjamin Franklin",
    "Berkeley",
    "Branford",
    "Davenport",
    "Ezra Stiles",
    "Grace Hopper",
    "Jonathan Edwards",
    "Morse",
    "Pauli Murray",
    "Pierson",
    "Saybrook",
    "Silliman",
    "Timothy Dwight",
    "Trumbull"
  ];
  
  const sports = [
      "soccer", "flag football", "spikeball", "cornhole", "pickleball", "ping pong",
      "w-hoops", "m-hoops", "c-hoops", "dodgeball", "broomball", "indoor soccer", "volleyball", "badminton"
    ];

  useEffect(() => {
    const fetchMatches = async () => {
        const queryParams = new URLSearchParams({
            college: selectedCollege,
            sport: selectedSport
        }).toString();

        try {
            const response = await fetch(`http://127.0.0.1:5000/matches?${queryParams}`);
            if (response.ok) {
                const data = await response.json();
                setMatches(data.map(match => ({ ...match })));
            } else {
                throw new Error('Failed to fetch matches');
            }
        } catch (error) {
            console.error(error);
        }
    };

    fetchMatches();
}, [selectedCollege, selectedSport]);  // Re-fetch matches when filters change

  const groupMatchesByDate = () => {
    return matches.reduce((acc, match) => {
      // Convert match.date to a Date object and then to a string in the same format as date.toDateString()
      console.log(match)
      const date = new Date(match.date).toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(match);
      return acc;
    }, {});
  };


  const matchesByDate = groupMatchesByDate();

  return (
    <div className="flex flex-col justify-center">
      <div>
            <select value={selectedCollege} onChange={(e) => setSelectedCollege(e.target.value)}>
          <option value="">All Colleges</option>
          {colleges.map((college) => (
              <option key={college} value={college}>{college}</option>
          ))}
      </select>

      <select value={selectedSport} onChange={(e) => setSelectedSport(e.target.value)}>
          <option value="">All Sports</option>
          {sports.map((sport) => (
              <option key={sport} value={sport}>{sport}</option>
          ))}
      </select>

      </div>

      <Calendar
        className="custom-calendar bg-white shadow-lg rounded-lg p-4"
        tileClassName="border border-black"
        tileContent={({ date, view }) =>
        view === 'month' && matchesByDate[date.toDateString()] ? (
          <div className="flex flex-col overflow-y-auto max-h-24">
            {matchesByDate[date.toDateString()].map((match, index) => (
              <Match key={index} match={match} />
            ))}
          </div>
        ) : null
        }
      
      />
    </div>
  );
}
