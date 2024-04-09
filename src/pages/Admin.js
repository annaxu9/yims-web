// Admin.js
import { useState, useEffect } from 'react';
import AdminCalendar from '../components/admin/AdminCalendar';

export default function Admin() {
    const [sports, setSports] = useState([]);
    const [selectedSport, setSelectedSport] = useState('');

    useEffect(() => {
        fetch('http://127.0.0.1:5000/sports')
            .then(response => response.json())
            .then(data => {
                setSports(data);
                setSelectedSport(''); // Set the initial selected sport to an empty string
            });
    }, []);

    const handleSportChange = (event) => {
        setSelectedSport(event.target.value);
    };

    return (
        <div className="container mx-auto my-8">
            <div className="w-full mx-auto">
                <label htmlFor="sport-select" className="block text-gray-700 text-sm font-bold mb-2">Choose a sport:</label>
                <select
                    id="sport-select"
                    value={selectedSport}
                    onChange={handleSportChange}
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">Select a sport</option>
                    {sports.map((sport, index) => (
                        <option key={index} value={sport.name}>
                            {sport.name}
                        </option>
                    ))}
                </select>
            </div>
            {selectedSport && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold">{selectedSport} Calendar</h2>
                    <AdminCalendar />
                </div>
            )}
        </div>
    );
}
