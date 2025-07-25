#!/bin/bash

# Air Assist Backend - GitHub Setup Script

echo "🚀 Setting up Air Assist Backend for GitHub..."

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - Air Assist Backend API

Features:
- OpenAI Chat Completions proxy
- OpenAI Realtime API WebSocket proxy
- CORS configuration for frontend
- Health check endpoints
- Environment variable support
- Vercel deployment ready"

# Set main branch
git branch -M main

echo "✅ Git repository initialized!"
echo ""
echo "📝 Next steps:"
echo "1. Create a new repository on GitHub named 'air-assist-backend'"
echo "2. Run: git remote add origin https://github.com/YOUR_USERNAME/air-assist-backend.git"
echo "3. Run: git push -u origin main"
echo "4. Deploy to Vercel using the GitHub repository"
echo ""
echo "🔗 Repository URL format: https://github.com/YOUR_USERNAME/air-assist-backend"
