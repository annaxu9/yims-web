import React, { useState } from 'react';
import { shuffleArray, generateRoundRobin, fillScheduleDetails } from '../../utils'; // Utility functions for shuffling and round-robin generation
import DivisionsDisplay from './Divisions'; // Import the new component
import '@fortawesome/fontawesome-free/css/all.css';


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
  

function BracketGeneration() {
    const [selectedSport, setSelectedSport] = useState('');
    const [divisions, setDivisions] = useState(null);
    const [schedule, setSchedule] = useState(null);
    const [badMatchIndices, setBadMatchIndices] = useState([]);
    const [isScheduleValidated, setIsScheduleValidated] = useState(false);

    console.log(badMatchIndices)

    const validateSchedule = async () => {
      const badMatchIndices = await validateScheduleAPI();
      setBadMatchIndices(badMatchIndices);
      if (badMatchIndices.length === 0) {
          setIsScheduleValidated(true); // Set the validation state to true only if there are no bad matches
      }
    };
  

    const validateScheduleAPI = async () => {
      const response = await fetch('http://127.0.0.1:5000/validate_matches', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(schedule),
      });
  
      if (!response.ok) {
          throw new Error('Failed to validate schedule');
      }
  
      const badMatchIndices = await response.json();
      return badMatchIndices
    };

    const addMatchesToDatabase = async () => {
      for (const match of schedule) {
          const response = await fetch('http://127.0.0.1:5000/add_match', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  college_1: match.college1,
                  college_2: match.college2,
                  date: match.date,
                  start_time: match.time,
                  location: match.location,
                  sport: selectedSport
              }),
          });
  
          const responseData = await response.json();
          if (response.ok) {
              console.log('Match added successfully:', responseData);
          } else {
              console.error('Error adding match:', responseData.message);
          }
      }
  };
  

    const handleSportChange = (event) => {
        setSelectedSport(event.target.value);
        setDivisions(null);
        setSchedule(null);
    };

    const handleScheduleChange = (e, index, field) => {
        const updatedSchedule = [...schedule];
        updatedSchedule[index][field] = e.target.value;
        setSchedule(updatedSchedule);
    };

    const generateDivisions = () => {
        const shuffledColleges = shuffleArray([...colleges]);
        setDivisions({
            green: shuffledColleges.slice(0, 7),
            blue: shuffledColleges.slice(7)
        });
    };

    const generateSchedule = () => {
        if (divisions) {
          const greenSchedule = generateRoundRobin(divisions.green);
          const blueSchedule = generateRoundRobin(divisions.blue);
          const combinedSchedule = [...greenSchedule, ...blueSchedule].flat();
          const scheduleWithDetails = combinedSchedule.map(match => ({
            date: '', // Blank field for date
            time: '', // Blank field for time
            location: '', // Blank field for location
            college1: match.team1,
            college2: match.team2
          }));
          setSchedule(scheduleWithDetails);
        }
      };
      
    return (
        <div className="flex flex-col items-center space-y-4 mt-4">
          <select value={selectedSport} onChange={handleSportChange} className="w-48 p-2 border border-gray-300 rounded">
            <option value="">Select a sport</option>
            {sports.map((sport) => (
              <option key={sport} value={sport}>{sport}</option>
            ))}
          </select>
      
          {selectedSport && (
            <button onClick={generateDivisions} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
              Generate Divisions
            </button>
          )}

          <DivisionsDisplay divisions={divisions} />
      
          {divisions && (
            <>
              <button onClick={generateSchedule} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
                Generate Schedule
              </button>
             
            </>
          )}

      
        {schedule && (
            <table className="border-collapse border border-gray-300 mt-4">
                <thead>
                <tr>
                    <th className="border border-gray-300 p-2">Date</th>
                    <th className="border border-gray-300 p-2">Time</th>
                    <th className="border border-gray-300 p-2">Location</th>
                    <th className="border border-gray-300 p-2">College 1</th>
                    <th className="border border-gray-300 p-2">College 2</th>
                </tr>
                </thead>
                <tbody>
                {schedule.map((match, index) => (
                      <tr key={index} className={badMatchIndices.includes(index) ? "border-2 border-red-500" : ""}>
                          <td className="border border-gray-300 p-2">
                            {badMatchIndices.includes(index) ? (
                                  <>
                                      <span className="relative right-6 top-1/2 -translate-y-1/2 text-red-500 -ml-4">
                                          <i className="fas fa-exclamation-circle"></i>
                                      </span>
                                      <input type="date" className="w-40 p-2 border border-gray-300 rounded-md" value={match.date} onChange={(e) => handleScheduleChange(e, index, 'date')} />
                                  </>
                              ) : (
                                  <input type="date" className="w-40 p-2 border border-gray-300 rounded-md" value={match.date} onChange={(e) => handleScheduleChange(e, index, 'date')} />
                              )}
                              
                          </td>
                          <td className="border border-gray-300 p-2">
                              <input type="time" className="w-40 p-2 border border-gray-300 rounded-md" value={match.time} onChange={(e) => handleScheduleChange(e, index, 'time')} />
                          </td>
                          <td className="border border-gray-300 p-2">
                              <input type="text" className="w-40 p-2 border border-gray-300 rounded-md" value={match.location} onChange={(e) => handleScheduleChange(e, index, 'location')} />
                          </td>
                          <td className="border border-gray-300 p-2">
                              {match.college1}

                          </td>
                          <td className="border border-gray-300 p-2">{match.college2}</td>
                      </tr>
                  ))}

                </tbody>
            </table>
            
            )}

            {schedule && (
            <>
                <button onClick={() => setSchedule(fillScheduleDetails(schedule))} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200">
                Fill Schedule Details
                </button>
            </>
            )}

            {schedule && (!isScheduleValidated || badMatchIndices.length > 0) && (
                <button onClick={validateSchedule} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200">
                    Validate Schedule
                </button>
            )}

            {schedule && isScheduleValidated && (
                <button onClick={addMatchesToDatabase} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
                    Add Matches
                </button>
            )}

        </div>
      );
      
    }

export default BracketGeneration;
