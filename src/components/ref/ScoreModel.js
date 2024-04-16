import { useState, useEffect } from 'react';

export default function ScoreModal({ match, onClose, updateMatchScore }) {
    const [college1Outcome, setCollege1Outcome] = useState('');
    const [college2Outcome, setCollege2Outcome] = useState('');
    const [college2Options, setCollege2Options] = useState(['win', 'loss', 'tie', 'forfeit']);

    useEffect(() => {
        switch (college1Outcome) {
            case 'win':
                setCollege2Options(['loss', 'forfeit']);
                setCollege2Outcome('');
                break;
            case 'loss':
                setCollege2Options(['win']);
                setCollege2Outcome('win');
                break;
            case 'tie':
                setCollege2Options(['tie']);
                setCollege2Outcome('tie');
                break;
            case 'forfeit':
                setCollege2Options(['win', 'forfeit']);
                break;
            default:
                setCollege2Options(['win', 'loss', 'tie', 'forfeit']);
                setCollege2Outcome('');
        }
    }, [college1Outcome]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateMatchScore(match.id, college1Outcome, college2Outcome);
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg max-w-md w-full">
                <h3 className="text-lg font-semibold mb-2">Score Match</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="college1Outcome" className="block text-sm font-medium text-gray-700">{match.college1}</label>
                        <select id="college1Outcome" value={college1Outcome} onChange={(e) => setCollege1Outcome(e.target.value)} className="mt-1 p-2 block w-full border border-gray-300 rounded-md">
                            <option value="">Select Outcome</option>
                            <option value="win">Win</option>
                            <option value="loss">Loss</option>
                            <option value="tie">Tie</option>
                            <option value="forfeit">Forfeit</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="college2Outcome" className="block text-sm font-medium text-gray-700">{match.college2}</label>
                        <select id="college2Outcome" value={college2Outcome} onChange={(e) => setCollege2Outcome(e.target.value)} className="mt-1 p-2 block w-full border border-gray-300 rounded-md">
                            <option value="">Select Outcome</option>
                            {college2Options.map(option => (
                                <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-800 mr-2">Cancel</button>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
