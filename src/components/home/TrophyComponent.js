import React, { useState } from 'react';
import Confetti from 'react-confetti';
import trophy from "../../assets/icons/trophy.png";

const TrophyComponent = () => {
    const [confetti, setConfetti] = useState(false);
    const [shake, setShake] = useState(false);

    const handleClick = () => {
        setConfetti(true);
        setShake(true);
        setTimeout(() => setShake(false), 1000);  // Shake duration
    }

    return (
        <div>
            {confetti && <Confetti recycle={false} />}
            <img src={trophy} alt="trophy" className={`h-64 mx-auto ${shake ? 'animate-shake' : ''}`} onClick={handleClick} />
        </div>
    );
};

export default TrophyComponent;
