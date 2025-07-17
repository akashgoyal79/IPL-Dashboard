import { Team } from '@/types/ipl';

export const teams: Team[] = [
  {
    id: 'csk',
    name: 'Chennai Super Kings',
    shortName: 'CSK',
    logo: '🦁',
    color: '#FFD700'
  },
  {
    id: 'mi',
    name: 'Mumbai Indians',
    shortName: 'MI',
    logo: '🔵',
    color: '#004B87'
  },
  {
    id: 'rcb',
    name: 'Royal Challengers Bangalore',
    shortName: 'RCB',
    logo: '🔴',
    color: '#C41230'
  },
  {
    id: 'kkr',
    name: 'Kolkata Knight Riders',
    shortName: 'KKR',
    logo: '⚫',
    color: '#3A225D'
  },
  {
    id: 'dc',
    name: 'Delhi Capitals',
    shortName: 'DC',
    logo: '🔷',
    color: '#17479E'
  },
  {
    id: 'pbks',
    name: 'Punjab Kings',
    shortName: 'PBKS',
    logo: '🦁',
    color: '#DD1F2D'
  },
  {
    id: 'rr',
    name: 'Rajasthan Royals',
    shortName: 'RR',
    logo: '👑',
    color: '#E91E63'
  },
  {
    id: 'srh',
    name: 'Sunrisers Hyderabad',
    shortName: 'SRH',
    logo: '🟠',
    color: '#FF822A'
  },
  {
    id: 'gt',
    name: 'Gujarat Titans',
    shortName: 'GT',
    logo: '🏛️',
    color: '#1F4B6C'
  },
  {
    id: 'lsg',
    name: 'Lucknow Super Giants',
    shortName: 'LSG',
    logo: '🟦',
    color: '#00B2FF'
  }
];

export const getTeamById = (id: string): Team => {
  return teams.find(team => team.id === id) || teams[0];
};