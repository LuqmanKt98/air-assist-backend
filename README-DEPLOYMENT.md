# Air Assist Backend - Vercel Deployment

## 🚀 Quick Deploy to Vercel

### Prerequisites
1. GitHub account
2. Vercel account (free)
3. OpenAI API Key

### Step 1: Push to GitHub
```bash
# Create new repository on GitHub: air-assist-backend
git init
git add .
git commit -m "Initial commit - Air Assist Backend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/air-assist-backend.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your `air-assist-backend` repository
4. Configure environment variables:
   - `OPENAI_API_KEY`: `sk-proj-your-openai-api-key-here`
   - `CORS_ORIGIN`: `https://air-assist-frontend.vercel.app`
   - `NODE_ENV`: `production`

### Step 3: Deploy
- Click "Deploy"
- Wait for deployment to complete
- Your API will be available at: `https://air-assist-backend.vercel.app`

## 🔧 Environment Variables

Copy these to your Vercel project settings:

```
OPENAI_API_KEY=sk-proj-your-actual-openai-api-key-here
CORS_ORIGIN=https://air-assist-frontend.vercel.app
NODE_ENV=production
```

## 🔗 API Endpoints

Once deployed, your backend will have these endpoints:

- `GET /health` - Health check
- `GET /api/key-status` - Check if OpenAI API key is configured
- `POST /api/chat/completions` - OpenAI Chat Completions proxy
- `WebSocket /openai-realtime` - OpenAI Realtime API proxy

## 🧪 Testing

Test your deployed backend:
```bash
curl https://air-assist-backend.vercel.app/health
```

## 🔗 Links
- Backend: https://air-assist-backend.vercel.app
- Frontend: https://air-assist-frontend.vercel.app
