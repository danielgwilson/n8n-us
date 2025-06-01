'use client';

import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Maximize2, X, Loader2 } from 'lucide-react';

interface Session {
  id: string;
  url: string;
  liveViewUrl: string;
}

// Fixed session ID for shared viewing
const SHARED_SESSION_ID = 'bbfee89a-c265-4cce-8694-ea0bec6bbb54';

export default function BrowserbaseViewer() {
  const [session, setSession] = useState<Session | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch the debug URL on mount
  useEffect(() => {
    const fetchDebugUrl = async () => {
      try {
        const response = await fetch(`/api/browserbase/debug?sessionId=${SHARED_SESSION_ID}`);
        const data = await response.json();
        
        if (data.success && data.session.debuggerFullscreenUrl) {
          setSession({
            id: SHARED_SESSION_ID,
            url: `https://www.browserbase.com/sessions/${SHARED_SESSION_ID}`,
            liveViewUrl: data.session.debuggerFullscreenUrl,
          });
        } else {
          // Fallback to direct URL if API fails
          setSession({
            id: SHARED_SESSION_ID,
            url: `https://www.browserbase.com/sessions/${SHARED_SESSION_ID}`,
            liveViewUrl: `https://www.browserbase.com/sessions/${SHARED_SESSION_ID}/debug`,
          });
        }
      } catch (err) {
        console.error('Failed to fetch debug URL:', err);
        // Fallback to direct URL
        setSession({
          id: SHARED_SESSION_ID,
          url: `https://www.browserbase.com/sessions/${SHARED_SESSION_ID}`,
          liveViewUrl: `https://www.browserbase.com/sessions/${SHARED_SESSION_ID}/debug`,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDebugUrl();
  }, []);

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
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : session ? (
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
                </div>
              </div>

              <div className="relative w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  src={session.liveViewUrl}
                  className="w-full h-full border-0"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  allow="clipboard-read; clipboard-write"
                />
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
          ) : (
            <div className="text-center py-8">
              <p className="text-red-600">Failed to load session viewer</p>
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