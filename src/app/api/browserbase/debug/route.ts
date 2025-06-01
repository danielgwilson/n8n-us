import { NextRequest, NextResponse } from 'next/server';
import { browserbase } from '@/lib/browserbase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId') || 'bbfee89a-c265-4cce-8694-ea0bec6bbb54';

    // Get debug URLs for the session
    const debugInfo = await browserbase.sessions.debug(sessionId);
    
    return NextResponse.json({
      success: true,
      session: {
        id: sessionId,
        debuggerUrl: debugInfo.debuggerUrl,
        debuggerFullscreenUrl: debugInfo.debuggerFullscreenUrl,
        wsUrl: debugInfo.wsUrl,
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