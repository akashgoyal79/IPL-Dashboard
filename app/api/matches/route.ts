import { NextResponse } from 'next/server';
import { generateDummyMatches } from '@/lib/dummy-data';

export async function GET() {
  try {
    // In a real implementation, this would scrape iplt20.com
    const matches = generateDummyMatches();
    
    return NextResponse.json({
      success: true,
      data: matches,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch matches' },
      { status: 500 }
    );
  }
}