import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState('All'); 
  const [selectedSport, setSelectedSport] = useState('All');

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
            const matches = await response.json();
            const formattedEvents = matches.map(match => {
              const fullStartTime = `${match.date}T${match.start_time}:00Z`; // Append 'Z' to indicate UTC
              return {
                title: `${match.college1} vs ${match.college2} (${match.sport})`,
                start: new Date(fullStartTime),
                end: new Date(new Date(fullStartTime).getTime() + 60 * 60 * 1000), // Adds 1 hour to start
                location: match.location
              };
            });
            setEvents(formattedEvents);
          } else {
            throw new Error('Failed to fetch matches');
          }
        } catch (error) {
          console.error("Fetching Error:", error);
        }
      };
      fetchMatches();
    }, [selectedCollege, selectedSport]);

    console.log(events);  // This should log the array of event objects

  
  return (
    <div style={{ height: 700 }}>
      <div >
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
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day']}
      />
    </div>
  );
};

export default MyCalendar;
