// MatchForm.js
import React from 'react';

const colleges = {
  "Benjamin Franklin": 'BF',
  "Berkeley": 'BK',
  "Branford": 'BR',
  "Davenport": 'DC',
  "Ezra Stiles": 'ES',
  "Grace Hopper": 'GH',
  "Jonathan Edwards": 'JE',
  "Morse": 'MC',
  "Pauli Murray": "MY",
  "Pierson": 'PC',
  "Saybrook": 'SY',
  "Silliman": 'SM',
  "Timothy Dwight": 'TD',
  "Trumbull": 'TC'
};

const MatchForm = ({ onSubmit, onClose }) => {
  const [match, setMatch] = React.useState({
    startTime: '',
    location: '',
    team1: '',
    team2: '',
  });

  const handleChange = (e) => {
    setMatch({ ...match, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(match);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Start Time:</label>
        <input type="datetime-local" name="startTime" value={match.startTime} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Location:</label>
        <input type="text" name="location" value={match.location} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Team 1:</label>
        <select name="team1" value={match.team1} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
          <option value="">Select a college</option>
          {Object.entries(colleges).map(([name, abbreviation]) => (
            <option key={abbreviation} value={abbreviation} disabled={abbreviation === match.team2}>{name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Team 2:</label>
        <select name="team2" value={match.team2} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
          <option value="">Select a college</option>
          {Object.entries(colleges).map(([name, abbreviation]) => (
            <option key={abbreviation} value={abbreviation} disabled={abbreviation === match.team1}>{name}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Add Match</button>
        <button type="button" onClick={onClose} className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</button>
      </div>
    </form>
  );
};

export default MatchForm;
