// Function to shuffle an array
export function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  
  // Function to generate a round-robin schedule
  export function generateRoundRobin(teams) {
    let schedule = [];
    const numTeams = teams.length;

    // Generate the schedule
    for (let round = 0; round < teams.length - 1; round++) {
      let matches = [];
      for (let i = 0; i < teams.length / 2; i++) {
        const team1 = teams[i];
        const team2 = teams[teams.length - 1 - i];
        if (team1 && team2) { // Exclude matches with the dummy team
          matches.push({ team1, team2 });
        }
      }
      schedule.push(matches);
  
      // Rotate the teams
      teams.splice(1, 0, teams.pop());
    }
  
    return schedule;
  }

  export function fillScheduleDetails(schedule) {
    // Example pattern for dates, times, and locations
    const details = [
        { date: '2023-01-29', time: '20:00', location: 'The Whale' },
        { date: '2023-01-29', time: '21:00', location: 'The Whale' },
        { date: '2023-01-29', time: '22:00', location: 'The Whale' },
        { date: '2023-01-30', time: '21:00', location: 'The Whale' },
        { date: '2023-01-30', time: '22:00', location: 'The Whale' },
        { date: '2023-02-01', time: '20:00', location: 'The Whale' },
        { date: '2023-02-04', time: '17:00', location: 'The Whale' },
        { date: '2023-02-04', time: '18:00', location: 'The Whale' },
        { date: '2023-02-04', time: '19:00', location: 'The Whale' },
        { date: '2023-02-05', time: '20:00', location: 'The Whale' },
        { date: '2023-02-05', time: '21:00', location: 'The Whale' },
        { date: '2023-02-05', time: '22:00', location: 'The Whale' },
        { date: '2023-02-08', time: '20:00', location: 'The Whale' },
        { date: '2023-02-08', time: '21:00', location: 'The Whale' },
        { date: '2023-02-08', time: '22:00', location: 'The Whale' },
        { date: '2023-02-12', time: '20:00', location: 'The Whale' },
        { date: '2023-02-12', time: '21:00', location: 'The Whale' },
        { date: '2023-02-12', time: '22:00', location: 'The Whale' },
        { date: '2023-02-18', time: '17:00', location: 'The Whale' },
        { date: '2023-02-18', time: '18:00', location: 'The Whale' },
        { date: '2023-02-18', time: '19:00', location: 'The Whale' }
      ];
  
    // Assign details to each match in the schedule
    return schedule.map((match, index) => ({
      ...match,
      ...details[index % details.length] // Repeat the pattern if there are more matches than details
    }));
  };
  
  