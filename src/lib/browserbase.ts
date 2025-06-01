import { Browserbase } from '@browserbasehq/sdk';

export const browserbase = new Browserbase({
  apiKey: process.env.BROWSERBASE_API_KEY!,
});

export interface BrowserSession {
  id: string;
  url?: string;
  contextId?: string;
  liveViewUrl?: string;
}

export interface SessionOptions {
  projectId?: string;
  contextId?: string;
  useProxy?: boolean;
  keepAlive?: boolean;
}