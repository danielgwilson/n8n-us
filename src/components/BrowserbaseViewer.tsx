'use client';

import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Globe, Maximize2, X } from 'lucide-react';

interface Session {
  id: string;
  url: string;
  liveViewUrl: string;
}

export default function BrowserbaseViewer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const createSession = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/browserbase/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          useProxy: false,
          keepAlive: true,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSession(data.session);
      } else {
        throw new Error(data.error || 'Failed to create session');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create session');
    } finally {
      setLoading(false);
    }
  }, []);

  const endSession = useCallback(() => {
    setSession(null);
    setIsFullscreen(false);
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
          {!session ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-6">
                Launch a browser session to start automating your workflows with our intelligent assistant.
                The session will be controlled by n8n workflows to perform tasks on your behalf.
              </p>
              <Button
                onClick={createSession}
                disabled={loading}
                size="lg"
                className="gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating Session...
                  </>
                ) : (
                  <>
                    <Globe className="h-4 w-4" />
                    Launch Browser Session
                  </>
                )}
              </Button>
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
                  {error}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Session ID</p>
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
                    onClick={endSession}
                    variant="destructive"
                    size="sm"
                  >
                    End Session
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
                <h3 className="font-semibold text-blue-900 mb-2">How it works:</h3>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li>This browser session is controlled by n8n workflows</li>
                  <li>The assistant can navigate, fill forms, and extract data</li>
                  <li>All actions are performed securely in an isolated environment</li>
                  <li>Session data persists across workflow executions</li>
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
              <p className="text-sm opacity-75">n8n Browserbase Session</p>
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