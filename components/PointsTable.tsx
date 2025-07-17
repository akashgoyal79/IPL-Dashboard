'use client';

import { PointsTableEntry } from '@/types/ipl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PointsTableProps {
  pointsTable: PointsTableEntry[];
}

export function PointsTable({ pointsTable }: PointsTableProps) {
  const getQualificationStatus = (position: number) => {
    if (position <= 2) return 'qualified';
    if (position <= 4) return 'playoff';
    return 'eliminated';
  };

  const getPositionColor = (position: number) => {
    if (position <= 2) return 'bg-green-100 text-green-800';
    if (position <= 4) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Points Table</span>
          <Badge variant="outline">IPL 2024</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Pos</th>
                <th className="text-left p-2">Team</th>
                <th className="text-center p-2">M</th>
                <th className="text-center p-2">W</th>
                <th className="text-center p-2">L</th>
                <th className="text-center p-2">Pts</th>
                <th className="text-center p-2">NRR</th>
                <th className="text-center p-2">Form</th>
              </tr>
            </thead>
            <tbody>
              {pointsTable.map((entry) => (
                <tr key={entry.team.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-2">
                    <Badge className={getPositionColor(entry.position)} variant="secondary">
                      {entry.position}
                    </Badge>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{entry.team.logo}</span>
                      <div>
                        <p className="font-semibold">{entry.team.shortName}</p>
                        <p className="text-xs text-gray-600 hidden sm:block">{entry.team.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-center p-2 font-medium">{entry.played}</td>
                  <td className="text-center p-2 font-medium text-green-600">{entry.won}</td>
                  <td className="text-center p-2 font-medium text-red-600">{entry.lost}</td>
                  <td className="text-center p-2 font-bold text-blue-600">{entry.points}</td>
                  <td className="text-center p-2">
                    <div className="flex items-center justify-center space-x-1">
                      {entry.netRunRate > 0 ? (
                        <TrendingUp className="w-3 h-3 text-green-500" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-500" />
                      )}
                      <span className={entry.netRunRate > 0 ? 'text-green-600' : 'text-red-600'}>
                        {entry.netRunRate > 0 ? '+' : ''}{entry.netRunRate.toFixed(2)}
                      </span>
                    </div>
                  </td>
                  <td className="text-center p-2">
                    <div className="flex justify-center space-x-1">
                      {entry.form.map((result, index) => (
                        <div
                          key={index}
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                            result === 'W' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                          }`}
                        >
                          {result}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-600">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-100 rounded"></div>
            <span>Top 2 - Direct Qualification</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-100 rounded"></div>
            <span>3rd-4th - Playoff</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-100 rounded"></div>
            <span>Eliminated</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}