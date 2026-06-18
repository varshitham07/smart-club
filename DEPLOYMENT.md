# Deployment Guide - Smart Club

This guide will help you deploy the Smart Club application to Render with MongoDB Atlas.

## Prerequisites

1. **GitHub Account** - Repository must be on GitHub
2. **Render Account** - Sign up at [render.com](https://render.com)
3. **MongoDB Atlas Account** - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

## Step-by-Step Deployment

### 1. Set Up MongoDB Atlas

1. Log in to MongoDB Atlas
2. Create a new project
3. Create a new cluster (Free tier available)
4. In Database Access, create a user with username and password
5. In Network Access, allow all IPs (0.0.0.0/0) or Render IP range
6. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/smart-club?retryWrites=true&w=majority`

### 2. Deploy on Render

#### Option A: Using Render Dashboard (Recommended)

1. Go to [render.com](https://render.com) and sign in
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Fill in the deployment settings:
   - **Name**: smart-club
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or paid if needed)

5. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `3000`
   - `MONGODB_URI`: Your MongoDB Atlas connection string

6. Click "Create Web Service"

#### Option B: Using render.yaml (Infrastructure as Code)

1. Push the `render.yaml` file to your repository
2. On Render dashboard, select "Infrastructure" and import the `render.yaml`
3. Follow the prompts and deploy

### 3. Configure Environment Variables on Render

1. After deployment, go to your service settings
2. Click "Environment"
3. Add the following variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: `production`

### 4. Set Up GitHub Actions (Optional Auto-Deploy)

1. Go to your GitHub repository Settings
2. Add these secrets:
   - `RENDER_SERVICE_ID`: Your Render service ID (found in service URL)
   - `RENDER_API_KEY`: Generate from Render account settings

The workflow will automatically deploy on every push to `main` branch.

## Important Notes

### For MongoDB Atlas with Render

- **Allow Render IP**: Since Render IPs are dynamic, allow all IPs (0.0.0.0/0) in MongoDB Atlas Network Access, or use Render's static IP if available in your Render plan
- **Connection String Format**: 
  ```
  mongodb+srv://username:password@cluster.mongodb.net/smart-club?retryWrites=true&w=majority
  ```

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file (copy from `.env.example`):
   ```bash
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   ```

3. For development with auto-reload:
   ```bash
   npm run dev
   ```

4. For production:
   ```bash
   npm start
   ```

## Monitoring & Logs

### View Logs on Render

1. Go to your service on Render dashboard
2. Click "Logs" tab
3. View real-time logs of your application

### Health Check

The application provides a health check endpoint:
```
GET https://your-app.render.com/health
```

## Troubleshooting

### "Failed to connect to MongoDB"
- Verify MONGODB_URI is correct in environment variables
- Check MongoDB Atlas Network Access allows Render IPs
- Ensure MongoDB user credentials are correct

### "Deployment failed"
- Check build logs in Render dashboard
- Verify `package.json` exists and is valid
- Ensure Node version matches (18.x recommended)

### "Port already in use"
- Render automatically assigns the PORT environment variable
- Don't hardcode port numbers; use `process.env.PORT`

## Scaling & Performance

- **Free Tier**: Suitable for development and testing
- **Paid Plans**: For production use with better resources and uptime

## Next Steps

1. Add database models and routes to `server.js`
2. Implement authentication
3. Add error handling and logging
4. Set up CI/CD pipeline for automated testing
5. Configure custom domain (if needed)

## Useful Links

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
