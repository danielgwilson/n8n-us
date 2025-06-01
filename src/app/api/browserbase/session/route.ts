import { NextRequest, NextResponse } from 'next/server';
import { browserbase } from '@/lib/browserbase';

interface SessionConfig {
  projectId: string;
  browserSettings: {
    viewport: {
      width: number;
      height: number;
    };
    context?: {
      id: string;
      persist: boolean;
    };
  };
  keepAlive: boolean;
  proxies?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contextId, useProxy = false, keepAlive = true } = body;

    // Create session configuration
    const sessionConfig: SessionConfig = {
      projectId: process.env.BROWSERBASE_PROJECT_ID!,
      browserSettings: {
        viewport: {
          width: 1920,
          height: 1080,
        },
      },
      keepAlive,
    };

    // Add context for persisting authentication
    if (contextId) {
      sessionConfig.browserSettings.context = {
        id: contextId,
        persist: true,
      };
    }

    // Add proxy if requested
    if (useProxy) {
      sessionConfig.proxies = true;
    }

    // Create the session
    const session = await browserbase.sessions.create(sessionConfig);

    // Get the live view URL for the session
    const liveViewUrl = `https://www.browserbase.com/sessions/${session.id}/live`;

    return NextResponse.json({
      success: true,
      session: {
        id: session.id,
        url: `https://www.browserbase.com/sessions/${session.id}`,
        liveViewUrl,
      },
    });
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create session' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Session ID required' },
        { status: 400 }
      );
    }

    // Get session details
    const session = await browserbase.sessions.retrieve(sessionId);
    const liveViewUrl = `https://www.browserbase.com/sessions/${session.id}/live`;

    return NextResponse.json({
      success: true,
      session: {
        id: session.id,
        status: session.status,
        liveViewUrl,
      },
    });
  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch session' },
      { status: 500 }
    );
  }
}