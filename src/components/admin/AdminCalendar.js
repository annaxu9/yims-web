import React from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import AddMatch from './AddMatch';
import 'react-calendar/dist/Calendar.css'; // Import default styles for react-calendar
import './admin.css';

export default function MatchCalendar() {
  const [matches, setMatches] = React.useState([]);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const addMatch = (match) => {
    setMatches([...matches, { ...match, date: selectedDate }]);
  };

  const openModal = (value) => {
    setSelectedDate(value);
    setModalIsOpen(true);
  };

  const groupMatchesByDate = () => {
    return matches.reduce((acc, match) => {
      const date = match.date.toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(match);
      return acc;
    }, {});
  };

  const matchesByDate = groupMatchesByDate();

  return (
    <div className="flex justify-center">
      <Calendar
        onClickDay={openModal}
        className="custom-calendar bg-white shadow-lg rounded-lg p-4"
        tileClassName="border border-black  "
        tileContent={({ date, view }) =>
          view === 'month' && matchesByDate[date.toDateString()] ? (
            <div className="flex-1 overflow-y-auto mt-2">
              {matchesByDate[date.toDateString()].map((match, index) => (
                <div key={index} className="text-sm my-3">
                  <p>{match.startTime}</p>
                  <p>{match.team1} vs {match.team2}</p>
                </div>
              ))}
            </div>
          ) : null
        }
      />
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
        <AddMatch onSubmit={addMatch} onClose={() => setModalIsOpen(false)} />
      </Modal>
    </div>
  );
}
