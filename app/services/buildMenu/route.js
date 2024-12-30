import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    // Fetch data from the external API
    const response = await axios.get('https://www.trailerplus.eu/api/v1/pwa/buildmenu');
    // Return the data from the external API to your client
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching data from external API:', error.message);
    return NextResponse.json(
      { error: 'Failed to fetch data from external API' },
      { status: 500 }
    );
  }
}
