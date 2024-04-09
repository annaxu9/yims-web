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
    for (let round = 0; round < numTeams - 1; round++) {
      let matches = [];
      for (let i = 0; i < numTeams / 2; i++) {
        const college1 = teams[i];
        const college2 = teams[numTeams - 1 - i];
        if (college1 !== college2) { // Ensure teams are not matched against themselves
          matches.push({ college1, college2 });
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
        { date: '2024-01-29', start_time: '20:00', location: 'The Whale' },
        { date: '2024-01-29', start_time: '21:00', location: 'The Whale' },
        { date: '2024-01-29', start_time: '22:00', location: 'The Whale' },
        { date: '2024-01-30', start_time: '21:00', location: 'The Whale' },
        { date: '2024-01-30', start_time: '22:00', location: 'The Whale' },
        { date: '2024-02-01', start_time: '20:00', location: 'The Whale' },
        { date: '2024-02-04', start_time: '17:00', location: 'The Whale' },
        { date: '2024-02-04', start_time: '18:00', location: 'The Whale' },
        { date: '2024-02-04', start_time: '19:00', location: 'The Whale' },
        { date: '2024-02-05', start_time: '20:00', location: 'The Whale' },
        { date: '2024-02-05', start_time: '21:00', location: 'The Whale' },
        { date: '2024-02-05', start_time: '22:00', location: 'The Whale' },
        { date: '2024-02-08', start_time: '20:00', location: 'The Whale' },
        { date: '2024-02-08', start_time: '21:00', location: 'The Whale' },
        { date: '2024-02-08', start_time: '22:00', location: 'The Whale' },
        { date: '2024-02-12', start_time: '20:00', location: 'The Whale' },
        { date: '2024-02-12', start_time: '21:00', location: 'The Whale' },
        { date: '2024-02-12', start_time: '22:00', location: 'The Whale' },
        { date: '2024-02-18', start_time: '17:00', location: 'The Whale' },
        { date: '2024-02-18', start_time: '18:00', location: 'The Whale' },
        { date: '2024-02-18', start_time: '19:00', location: 'The Whale' }
      ];
  
    // Assign details to each match in the schedule
    return schedule.map((match, index) => ({
      ...match,
      ...details[index % details.length] // Repeat the pattern if there are more matches than details
    }));
  };
  
  