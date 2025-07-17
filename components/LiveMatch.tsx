'use client';

import { Match } from '@/types/ipl';
import { Clock, MapPin, Radio } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LiveMatchProps {
  match: Match;
}

export function LiveMatch({ match }: LiveMatchProps) {
  const { homeTeam, awayTeam, venue, liveScore, status } = match;

  if (status !== 'live') {
    return (
      <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <Clock className="w-3 h-3 mr-1" />
              Upcoming
            </Badge>
            <span className="text-sm text-gray-600">{match.time}</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{homeTeam.logo}</span>
              <div>
                <p className="font-semibold text-lg">{homeTeam.shortName}</p>
                <p className="text-sm text-gray-600">{homeTeam.name}</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-800">VS</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="font-semibold text-lg">{awayTeam.shortName}</p>
                <p className="text-sm text-gray-600">{awayTeam.name}</p>
              </div>
              <span className="text-2xl">{awayTeam.logo}</span>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{venue}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 to-white">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge variant="destructive" className="animate-pulse">
            <Radio className="w-3 h-3 mr-1" />
            LIVE
          </Badge>
          <span className="text-sm text-gray-600">{liveScore?.currentInnings}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{homeTeam.logo}</span>
              <div>
                <p className="font-semibold text-lg">{homeTeam.shortName}</p>
                <p className="text-xl font-bold text-blue-600">{liveScore?.homeScore}</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Overs</p>
              <p className="text-lg font-bold">{liveScore?.overs}</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="font-semibold text-lg">{awayTeam.shortName}</p>
                <p className="text-xl font-bold text-blue-600">{liveScore?.awayScore}</p>
              </div>
              <span className="text-2xl">{awayTeam.logo}</span>
            </div>
          </div>
          
          {liveScore?.lastWicket && (
            <div className="bg-yellow-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-yellow-800">
                Last Wicket: {liveScore.lastWicket}
              </p>
            </div>
          )}
          
          {liveScore?.recentBalls && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">Recent Balls:</p>
              <div className="flex space-x-2">
                {liveScore.recentBalls.map((ball, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      ball === '4' ? 'bg-green-500 text-white' :
                      ball === '6' ? 'bg-purple-500 text-white' :
                      ball === '0' ? 'bg-gray-400 text-white' :
                      'bg-blue-500 text-white'
                    }`}
                  >
                    {ball}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{venue}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}