import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    
    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Call Browserbase API directly to get debug URLs
    const response = await fetch(
      `https://api.browserbase.com/v1/sessions/${sessionId}/debug`,
      {
        method: 'GET',
        headers: {
          'X-BB-API-Key': process.env.BROWSERBASE_API_KEY!,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Browserbase API error:', response.status, errorText);
      return NextResponse.json(
        { success: false, error: `Browserbase API error: ${response.status}` },
        { status: response.status }
      );
    }

    const debugInfo = await response.json();
    
    return NextResponse.json({
      success: true,
      session: {
        id: sessionId,
        debuggerUrl: debugInfo.debuggerUrl,
        debuggerFullscreenUrl: debugInfo.debuggerFullscreenUrl,
        wsUrl: debugInfo.wsUrl,
        pages: debugInfo.pages || [],
      },
    });
  } catch (error) {
    console.error('Error fetching debug info:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch debug info' },
      { status: 500 }
    );
  }
}