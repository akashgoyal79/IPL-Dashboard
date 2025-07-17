import { NextResponse } from 'next/server';
import { generateSchedule } from '@/lib/dummy-data';

export async function GET() {
  try {
    // In a real implementation, this would scrape iplt20.com
    const schedule = generateSchedule();
    
    return NextResponse.json({
      success: true,
      data: schedule,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch schedule' },
      { status: 500 }
    );
  }
}