'use client';

import { useState, useEffect } from 'react';
import { Match, PointsTableEntry, MatchSchedule } from '@/types/ipl';
import { LiveMatch } from './LiveMatch';
import { PointsTable } from './PointsTable';
import { MatchSchedule as MatchScheduleComponent } from './MatchSchedule';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Trophy, Calendar, TrendingUp, Radio } from 'lucide-react';
import { toast } from 'sonner';

interface DashboardData {
  matches: Match[];
  pointsTable: PointsTableEntry[];
  schedule: MatchSchedule[];
}

export function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async (showRefreshToast = false) => {
    try {
      setRefreshing(true);
      const [matchesRes, pointsRes, scheduleRes] = await Promise.all([
        fetch('/api/matches'),
        fetch('/api/points-table'),
        fetch('/api/schedule')
      ]);

      const [matchesData, pointsData, scheduleData] = await Promise.all([
        matchesRes.json(),
        pointsRes.json(),
        scheduleRes.json()
      ]);

      if (matchesData.success && pointsData.success && scheduleData.success) {
        setData({
          matches: matchesData.data,
          pointsTable: pointsData.data,
          schedule: scheduleData.data
        });
        setLastUpdated(new Date());
        if (showRefreshToast) {
          toast.success('Data refreshed successfully!');
        }
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch latest data. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    fetchData(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading IPL dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center h-96">
            <p className="text-gray-600 mb-4">Failed to load data</p>
            <Button onClick={handleRefresh} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const liveMatch = data.matches.find(match => match.status === 'live');
  const upcomingMatches = data.matches.filter(match => match.status === 'upcoming').slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-3 mb-4 sm:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">IPL T20 Dashboard</h1>
                <p className="text-sm text-gray-600">Live scores, standings & schedule</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {lastUpdated && (
                <div className="text-sm text-gray-600">
                  Last updated: {lastUpdated.toLocaleDateString()}
                </div>
              )}
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                disabled={refreshing}
                className="flex items-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Live Match Section */}
        {liveMatch && (
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Radio className="w-5 h-5 text-red-500" />
              <h2 className="text-xl font-bold text-gray-900">Live Match</h2>
              <Badge variant="destructive" className="animate-pulse">LIVE</Badge>
            </div>
            <LiveMatch match={liveMatch} />
          </div>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="table">Points Table</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Radio className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Live Matches</p>
                      <p className="text-2xl font-bold">{data.matches.filter(m => m.status === 'live').length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Upcoming Matches</p>
                      <p className="text-2xl font-bold">{data.matches.filter(m => m.status === 'upcoming').length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Teams</p>
                      <p className="text-2xl font-bold">{data.pointsTable.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Matches */}
            {upcomingMatches.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Upcoming Matches</span>
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {upcomingMatches.map((match) => (
                    <LiveMatch key={match.id} match={match} />
                  ))}
                </div>
              </div>
            )}

            {/* Top 4 Teams */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Top 4 Teams</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.pointsTable.slice(0, 4).map((team, index) => (
                  <Card key={team.team.id} className="relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-full h-1 ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                    }`} />
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl font-bold text-gray-400">#{team.position}</div>
                        <span className="text-2xl">{team.team.logo}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{team.team.shortName}</p>
                          <p className="text-sm text-gray-600">{team.points} pts</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="matches">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">All Matches</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {data.matches.map((match) => (
                  <LiveMatch key={match.id} match={match} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="table">
            <PointsTable pointsTable={data.pointsTable} />
          </TabsContent>

          <TabsContent value="schedule">
            <MatchScheduleComponent schedule={data.schedule} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}