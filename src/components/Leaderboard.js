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
            <div style={{ textAlign: 'center', maxWidth: '400px', margin: 'auto' }}>
                <h1 style={{ fontSize: '32px', color: '#333' }}>Leaderboard</h1>
                {
                    leaderboard.map((college, index) => (
                        <div key={index} style={{ 
                            background: index % 2 === 0 ? '#f9f9f9' : '#fff',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            marginTop: '10px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            <h2 style={{ fontSize: '24px', color: '#666', marginBottom: '5px' }}>{college.name}</h2>
                            <p style={{ fontSize: '18px', color: '#999' }}>{college.points} points</p>

                        </div>
                    ))
                }
                console.log(`${process.env.PUBLIC_URL}/assets/images/college-flags/BF.png`);
                <img src={`${process.env.PUBLIC_URL}/assets/images/college-flags/BF.png`} alt="What" />
            </div>

    );
}

export default Leaderboard;
