import { Match, PointsTableEntry, MatchSchedule } from '@/types/ipl';
import { teams, getTeamById } from './teams';

export const generateDummyMatches = (): Match[] => {
  const matches: Match[] = [];
  const venues = [
    'Wankhede Stadium, Mumbai',
    'Eden Gardens, Kolkata',
    'M. Chinnaswamy Stadium, Bangalore',
    'Feroz Shah Kotla, Delhi',
    'Rajiv Gandhi International Stadium, Hyderabad',
    'Sawai Mansingh Stadium, Jaipur',
    'MA Chidambaram Stadium, Chennai',
    'Punjab Cricket Association Stadium, Mohali'
  ];

  // Live match
  matches.push({
    id: 'live-1',
    homeTeam: getTeamById('csk'),
    awayTeam: getTeamById('mi'),
    date: new Date().toISOString().split('T')[0],
    time: '19:30',
    venue: venues[0],
    status: 'live',
    liveScore: {
      homeScore: '145/4',
      awayScore: '89/2',
      overs: '12.3',
      currentInnings: 'MI - 2nd Innings',
      lastWicket: 'R Sharma b Jadeja 34',
      recentBalls: ['4', '1', '6', '0', '2', '1']
    }
  });

  // Upcoming matches
  const today = new Date();
  for (let i = 1; i <= 15; i++) {
    const matchDate = new Date(today);
    matchDate.setDate(today.getDate() + i);
    
    const homeTeam = teams[Math.floor(Math.random() * teams.length)];
    let awayTeam = teams[Math.floor(Math.random() * teams.length)];
    while (awayTeam.id === homeTeam.id) {
      awayTeam = teams[Math.floor(Math.random() * teams.length)];
    }

    matches.push({
      id: `match-${i}`,
      homeTeam,
      awayTeam,
      date: matchDate.toISOString().split('T')[0],
      time: i % 2 === 0 ? '15:30' : '19:30',
      venue: venues[Math.floor(Math.random() * venues.length)],
      status: 'upcoming'
    });
  }

  return matches;
};

export const generatePointsTable = (): PointsTableEntry[] => {
  const baseStats = [
    { team: 'gt', played: 12, won: 9, lost: 3, points: 18, nrr: 0.85 },
    { team: 'csk', played: 12, won: 8, lost: 4, points: 16, nrr: 0.65 },
    { team: 'mi', played: 12, won: 8, lost: 4, points: 16, nrr: 0.42 },
    { team: 'rcb', played: 12, won: 7, lost: 5, points: 14, nrr: 0.28 },
    { team: 'kkr', played: 12, won: 6, lost: 6, points: 12, nrr: 0.15 },
    { team: 'rr', played: 12, won: 6, lost: 6, points: 12, nrr: -0.12 },
    { team: 'dc', played: 12, won: 5, lost: 7, points: 10, nrr: -0.25 },
    { team: 'pbks', played: 12, won: 5, lost: 7, points: 10, nrr: -0.38 },
    { team: 'srh', played: 12, won: 4, lost: 8, points: 8, nrr: -0.52 },
    { team: 'lsg', played: 12, won: 3, lost: 9, points: 6, nrr: -0.78 }
  ];

  const forms = [
    ['W', 'W', 'L', 'W', 'W'],
    ['W', 'L', 'W', 'W', 'L'],
    ['L', 'W', 'W', 'L', 'W'],
    ['W', 'W', 'L', 'L', 'W'],
    ['L', 'L', 'W', 'W', 'L']
  ];

  return baseStats.map((stat, index) => ({
    position: index + 1,
    team: getTeamById(stat.team),
    played: stat.played,
    won: stat.won,
    lost: stat.lost,
    points: stat.points,
    netRunRate: stat.nrr,
    form: forms[Math.floor(Math.random() * forms.length)]
  }));
};

export const generateSchedule = (): MatchSchedule[] => {
  const matches = generateDummyMatches();
  const schedule: MatchSchedule[] = [];
  
  matches.forEach(match => {
    const existingDate = schedule.find(s => s.date === match.date);
    if (existingDate) {
      existingDate.matches.push(match);
    } else {
      schedule.push({
        date: match.date,
        matches: [match]
      });
    }
  });

  return schedule.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};