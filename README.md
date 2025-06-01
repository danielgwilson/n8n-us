# n8n Browserbase Integration

AI-powered browser automation for n8n workflows with Browserbase embedded viewer.

## Features

- 🤖 **AI-Powered Browser Automation**: Intelligent browser control that understands context
- 🔄 **n8n Integration**: Seamlessly integrates with n8n workflows
- 🖼️ **Live Browser View**: Real-time visualization of browser sessions
- 🔒 **Secure & Isolated**: Enterprise-grade security with isolated sessions
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Environment Variables

Create a `.env.local` file with:

```env
BROWSERBASE_API_KEY=your_browserbase_api_key
BROWSERBASE_PROJECT_ID=your_project_id
```

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment to Vercel

1. Push this code to a GitHub repository
2. Import the project in Vercel
3. Add the environment variables in Vercel project settings:
   - `BROWSERBASE_API_KEY`
   - `BROWSERBASE_PROJECT_ID`
4. Deploy!

## API Routes

- `POST /api/browserbase/session` - Create a new browser session
- `GET /api/browserbase/session?sessionId={id}` - Get session details

## How It Works

1. User clicks "Launch Browser Session" 
2. API creates a new Browserbase session
3. Live view URL is embedded in an iframe
4. n8n workflows can control the browser session via Browserbase API
5. User sees real-time updates in the embedded viewer

## Tech Stack

- Next.js 15 with App Router
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui components
- Browserbase SDK

## Learn More

- [n8n Documentation](https://docs.n8n.io) - Learn about n8n workflow automation
- [Browserbase Documentation](https://docs.browserbase.com) - Learn about browser automation
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features

## Deploy on Vercel

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
