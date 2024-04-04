const sportsData = {
    'soccer': { players: 11, emoji: "⚽" },
    'flag football': { players: 6, emoji: "🏈" },
    'spikeball': { players: 6, emoji: "🦔" },
    'cornhole': { players: 6, emoji: "🌽" },
    'pickleball': { players: 6, emoji: "🥒" },
    'ping pong': { players: 10, emoji: "🏓" },
    'w-hoops': { players: 5, emoji: "🏀" },
    'm-hoops': { players: 5, emoji: "🏀" },
    'c-hoops': { players: 5, emoji: "🏀" },
    'dodgeball': { players: 8, emoji: "🤾" },
    'broomball': { players: 6, emoji: "🧹" },
    'indoor soccer': { players: 5, emoji: "🥅" },
    'volleyball': { players: 6, emoji: "🏐" },
    'badminton': { players: 6, emoji: "🏸" }
  };

  
export default function Match({ match }) {
    const sportEmoji = sportsData[match.sport]?.emoji || '';
    return (
      <div className="flex flex-col items-center p-1">
        <div className="text-xs">{match.startTime}</div>
        <div className="text-xs">{sportEmoji} {match.college1} vs {match.college2}</div>
      </div>
    );
  }
  