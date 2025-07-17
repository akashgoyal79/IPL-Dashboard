export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  color: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  time: string;
  venue: string;
  status: 'upcoming' | 'live' | 'completed';
  result?: string;
  liveScore?: {
    homeScore: string;
    awayScore: string;
    overs: string;
    currentInnings: string;
    lastWicket?: string;
    recentBalls?: string[];
  };
}

export interface PointsTableEntry {
  position: number;
  team: Team;
  played: number;
  won: number;
  lost: number;
  points: number;
  netRunRate: number;
  form: string[];
}

export interface MatchSchedule {
  date: string;
  matches: Match[];
}