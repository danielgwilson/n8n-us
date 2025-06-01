'use client';

import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Globe, Maximize2, X, Loader2, Play } from 'lucide-react';

interface Session {
  id: string;
  url: string;
  liveViewUrl: string;
}

export default function BrowserbaseViewer() {
  const [session, setSession] = useState<Session | null>(null);
  const [sessionId, setSessionId] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadSession = useCallback(async () => {
    if (!sessionId.trim()) return;
    
    setLoading(true);
    try {
      // Set the session with app subdomain /live as default
      setSession({
        id: sessionId,
        url: `https://www.browserbase.com/sessions/${sessionId}`,
        // Default to app subdomain with /live
        liveViewUrl: `https://app.browserbase.com/sessions/${sessionId}/live`,
      });
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  // Handle escape key for fullscreen
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isFullscreen]);

  return (
    <>
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-6 w-6" />
            n8n Browserbase Assistant
          </CardTitle>
          <CardDescription>
            Your AI-powered browser automation assistant for n8n workflows
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!session ? (
            <div className="space-y-4">
              <div className="text-center py-8">
                <p className="text-gray-600 mb-6">
                  Enter a Browserbase session ID to view the live browser session.
                </p>
              </div>
              <div className="flex gap-2 max-w-xl mx-auto">
                <Input
                  type="text"
                  placeholder="Enter session ID (e.g., bbfee89a-c265-4cce-8694-ea0bec6bbb54)"
                  value={sessionId}
                  onChange={(e) => setSessionId(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && loadSession()}
                  className="flex-1"
                />
                <Button
                  onClick={loadSession}
                  disabled={loading || !sessionId.trim()}
                  className="gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      View Session
                    </>
                  )}
                </Button>
              </div>
              <div className="text-center text-sm text-gray-500">
                <p>Need a session? Start one in your Browserbase dashboard or via API.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">🔴 Live Shared Session</p>
                  <p className="font-mono text-xs">{session.id}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={toggleFullscreen}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Maximize2 className="h-4 w-4" />
                    Fullscreen
                  </Button>
                  <Button
                    onClick={() => {
                      setSession(null);
                      setSessionId('');
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Change Session
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>URL Format:</span>
                  <select 
                    className="border rounded px-2 py-1"
                    onChange={(e) => {
                      setSession({
                        ...session,
                        liveViewUrl: e.target.value
                      });
                    }}
                    defaultValue={session.liveViewUrl}
                  >
                    <option value={`https://app.browserbase.com/sessions/${session.id}/live`}>app.browserbase.com/sessions/{session.id}/live</option>
                    <option value={`https://www.browserbase.com/sessions/${session.id}/live`}>www.browserbase.com/sessions/{session.id}/live</option>
                    <option value={`https://www.browserbase.com/sessions/${session.id}/debug`}>www.browserbase.com/sessions/{session.id}/debug</option>
                    <option value={`https://app.browserbase.com/sessions/${session.id}/debug`}>app.browserbase.com/sessions/{session.id}/debug</option>
                    <option value={`https://www.browserbase.com/sessions/${session.id}`}>www.browserbase.com/sessions/{session.id}</option>
                  </select>
                  <span className="text-xs text-gray-500">Try different URLs if one doesn&apos;t work</span>
                </div>
                <div className="relative w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    key={session.liveViewUrl}
                    src={session.liveViewUrl}
                    className="w-full h-full border-0"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    allow="clipboard-read; clipboard-write"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">🔴 Watching Live Session</h3>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li>You&apos;re viewing a live browser session controlled by Claude Code</li>
                  <li>Watch as the AI assistant performs automated tasks</li>
                  <li>This is a shared view - you cannot control this session</li>
                  <li>The session is being operated by another Claude Code instance</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Fullscreen overlay */}
      {isFullscreen && session && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="bg-gray-900 p-4 flex justify-between items-center">
            <div className="text-white">
              <p className="text-sm opacity-75">🔴 Live Shared Session - n8n Browserbase</p>
              <p className="font-mono text-xs opacity-50">{session.id}</p>
            </div>
            <Button
              onClick={toggleFullscreen}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-800"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 relative">
            <iframe
              src={session.liveViewUrl}
              className="w-full h-full border-0"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              allow="clipboard-read; clipboard-write"
            />
          </div>
        </div>
      )}
    </>
  );
}