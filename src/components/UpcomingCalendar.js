import React from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import AddMatch from './AddMatch';

const MatchCalendar = () => {
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
    <div className="max-w-md mx-auto">
      <Calendar
        onClickDay={openModal}
        className="border border-gray-300 rounded-lg shadow-sm"
        tileClassName="h-28 border border-gray-200 flex flex-col"
        tileContent={({ date, view }) =>
          view === 'month' && matchesByDate[date.toDateString()] ? (
            <div className="flex-1 overflow-y-auto mt-2 px-1">
              {matchesByDate[date.toDateString()].map((match, index) => (
                <div key={index} className="text-xs p-1 bg-blue-100 rounded-md my-1">
                  <p>{match.startTime}</p>
                  <p>{match.team1} vs {match.team2}</p>
                </div>
              ))}
            </div>
          ) : null
        }
      />
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6">
        <AddMatch onSubmit={addMatch} onClose={() => setModalIsOpen(false)} />
      </Modal>
    </div>
  );
};

export default MatchCalendar;
