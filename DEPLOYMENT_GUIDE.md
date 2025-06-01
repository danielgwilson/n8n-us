# Deployment Guide for n8n Browserbase Integration

## Prerequisites

1. **Browserbase Account**: Sign up at [browserbase.com](https://www.browserbase.com)
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **GitHub Account**: For repository hosting

## Step 1: Get Browserbase Credentials

1. Log in to your Browserbase dashboard
2. Navigate to Settings → API Keys
3. Create a new API key and save it
4. Find your Project ID in the project settings

## Step 2: Prepare for Deployment

1. Create a new GitHub repository
2. Initialize git in the project directory:
   ```bash
   cd /home/azureuser/claude/n8n-hackathon-2025-05-31/n8n-us
   git init
   git add .
   git commit -m "Initial commit: n8n Browserbase Integration"
   ```

3. Add your GitHub remote:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/n8n-browserbase.git
   git branch -M main
   git push -u origin main
   ```

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   pnpm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts:
   - Link to existing project? No
   - What's your project's name? n8n-browserbase
   - In which directory is your code located? ./
   - Want to override the settings? No

4. Add environment variables:
   ```bash
   vercel env add BROWSERBASE_API_KEY
   vercel env add BROWSERBASE_PROJECT_ID
   ```

### Option B: Deploy via Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `pnpm build`
   - Output Directory: Leave default

4. Add Environment Variables:
   - `BROWSERBASE_API_KEY`: Your Browserbase API key
   - `BROWSERBASE_PROJECT_ID`: Your Browserbase project ID

5. Click "Deploy"

## Step 4: Test Your Deployment

1. Visit your Vercel deployment URL
2. Click "Launch Browser Session"
3. Verify the browser session loads correctly

## Step 5: Integrate with n8n

1. In your n8n workflow, use HTTP Request node
2. Configure to call your Vercel API endpoints:
   - Create session: `POST https://your-app.vercel.app/api/browserbase/session`
   - Get session: `GET https://your-app.vercel.app/api/browserbase/session?sessionId={id}`

## Troubleshooting

### Build Errors
- Ensure all dependencies are installed: `pnpm install`
- Check that shadcn/ui components are properly installed
- Verify TypeScript has no errors: `pnpm tsc --noEmit`

### Runtime Errors
- Check Vercel function logs for API errors
- Verify environment variables are set correctly
- Ensure Browserbase API key has proper permissions

### Session Issues
- Check Browserbase dashboard for active sessions
- Verify project ID matches your Browserbase project
- Ensure API key is valid and not expired

## Security Considerations

1. **API Keys**: Never commit `.env.local` to git
2. **CORS**: Configure allowed origins if needed
3. **Rate Limiting**: Consider adding rate limiting to API routes
4. **Authentication**: Add auth layer for production use

## Next Steps

1. Add authentication to protect API endpoints
2. Implement session management and cleanup
3. Add webhook support for n8n integration
4. Create more sophisticated browser automation flows