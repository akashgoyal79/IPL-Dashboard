import { NextResponse } from 'next/server';
import { generatePointsTable } from '@/lib/dummy-data';

export async function GET() {
  try {
    // In a real implementation, this would scrape iplt20.com
    const pointsTable = generatePointsTable();
    
    return NextResponse.json({
      success: true,
      data: pointsTable,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch points table' },
      { status: 500 }
    );
  }
}