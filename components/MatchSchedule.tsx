'use client';

import { useState } from 'react';
import { MatchSchedule as MatchScheduleType } from '@/types/ipl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Filter } from 'lucide-react';
import { format } from 'date-fns';

interface MatchScheduleProps {
  schedule: MatchScheduleType[];
}

export function MatchSchedule({ schedule }: MatchScheduleProps) {
  const [filterType, setFilterType] = useState<'all' | 'upcoming' | 'today'>('all');
  const today = new Date().toISOString().split('T')[0];

  const filteredSchedule = schedule.filter(day => {
    if (filterType === 'today') {
      return day.date === today;
    }
    if (filterType === 'upcoming') {
      return new Date(day.date) >= new Date(today);
    }
    return true;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Match Schedule</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              variant={filterType === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('all')}
            >
              All
            </Button>
            <Button
              variant={filterType === 'today' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('today')}
            >
              Today
            </Button>
            <Button
              variant={filterType === 'upcoming' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('upcoming')}
            >
              Upcoming
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {filteredSchedule.map((day) => (
            <div key={day.date} className="space-y-3">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-blue-50">
                  {format(new Date(day.date), 'EEE, MMM d')}
                </Badge>
                {day.date === today && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Today
                  </Badge>
                )}
              </div>
              
              <div className="space-y-2">
                {day.matches.map((match) => (
                  <div
                    key={match.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{match.homeTeam.logo}</span>
                          <span className="font-semibold">{match.homeTeam.shortName}</span>
                        </div>
                        <span className="text-gray-500">vs</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{match.awayTeam.logo}</span>
                          <span className="font-semibold">{match.awayTeam.shortName}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{match.time}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{match.venue}</span>
                      </div>
                      <Badge
                        variant={match.status === 'live' ? 'destructive' : 'secondary'}
                        className={match.status === 'live' ? 'animate-pulse' : ''}
                      >
                        {match.status === 'live' ? 'LIVE' : 'Upcoming'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}