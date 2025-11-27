# 🚀 Vercel Deployment Guide - Urban Fashion E-Commerce

## 📋 Prerequisites

Before deploying to Vercel, ensure you have:
- ✅ A Vercel account (sign up at [vercel.com](https://vercel.com))
- ✅ Your backend deployed and running (Railway, Render, or Heroku)
- ✅ MongoDB Atlas database set up and accessible

---

## 🎯 Step-by-Step Deployment

### **Step 1: Deploy Your Backend First**

Your backend needs to be hosted separately. Recommended options:

#### Option A: Railway (Recommended - Easy & Free)
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `Urban-fashion-E-Commerce` repository
5. Railway will auto-detect the backend
6. Add environment variables:
   - `MONGO_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Your secret key
   - `PORT` - 5000
7. Deploy and copy the generated URL (e.g., `https://your-app.railway.app`)

#### Option B: Render
1. Go to [render.com](https://render.com)
2. Create a new "Web Service"
3. Connect your GitHub repository
4. Set root directory to `backend`
5. Build command: `npm install`
6. Start command: `npm start`
7. Add environment variables (same as Railway)

---

### **Step 2: Deploy Frontend to Vercel**

#### Method 1: Via Vercel Dashboard (Easiest)

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Select your `Urban-fashion-E-Commerce` repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` (click "Edit" and select the frontend folder)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add: `VITE_API_URL` = `https://your-backend-url.railway.app`
   - ⚠️ **Important**: Replace with your actual backend URL from Step 1

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at `https://your-project.vercel.app`

#### Method 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to your project
cd "d:\Projects\E-commerce Website"

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name? urban-fashion-ecommerce
# - In which directory is your code located? ./frontend
# - Want to override settings? Y
# - Build Command? npm run build
# - Output Directory? dist
# - Development Command? npm run dev

# Add environment variable
vercel env add VITE_API_URL

# When prompted, enter your backend URL
# Example: https://your-app.railway.app

# Deploy to production
vercel --prod
```

---

## 🔧 Important Configuration

### Update API URL in Frontend

After deploying your backend, you need to set the environment variable:

**In Vercel Dashboard:**
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.railway.app` (your actual backend URL)
   - **Environment**: Production, Preview, Development (select all)
4. Click "Save"
5. Redeploy your project (Deployments → Latest → Redeploy)

---

## ✅ Post-Deployment Checklist

After deployment, verify:

- [ ] Frontend loads at your Vercel URL
- [ ] Backend is accessible (test: `https://your-backend-url/api/products`)
- [ ] Products display on homepage
- [ ] Login/Register works
- [ ] Cart functionality works
- [ ] Images load correctly
- [ ] All API calls succeed (check browser console for errors)

---

## 🐛 Troubleshooting

### Issue: "Failed to fetch" or CORS errors
**Solution**: Add CORS configuration to your backend

In `backend/server.js`, ensure you have:
```javascript
const cors = require('cors');

app.use(cors({
  origin: ['https://your-vercel-app.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

### Issue: Environment variables not working
**Solution**: 
- Ensure variable names start with `VITE_` for Vite projects
- Redeploy after adding environment variables
- Check spelling and URL format (include `https://`)

### Issue: 404 on page refresh
**Solution**: Already handled by `vercel.json` rewrites configuration

### Issue: Build fails
**Solution**:
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

---

## 🔄 Updating Your Deployment

Whenever you make changes:

1. **Commit and push to GitHub**:
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```

2. **Vercel auto-deploys** from your main branch
3. Check deployment status in Vercel dashboard

---

## 📊 Monitoring

- **Vercel Dashboard**: Monitor deployments, analytics, and logs
- **Backend Logs**: Check Railway/Render dashboard for API errors
- **MongoDB Atlas**: Monitor database connections and queries

---

## 🎉 Your Deployment URLs

After deployment, you'll have:
- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-backend.railway.app`
- **Database**: MongoDB Atlas cluster

---

## 💡 Pro Tips

1. **Custom Domain**: Add your own domain in Vercel settings
2. **Preview Deployments**: Every PR creates a preview URL
3. **Environment Branches**: Use different env vars for staging/production
4. **Analytics**: Enable Vercel Analytics for visitor insights
5. **Performance**: Vercel automatically optimizes images and assets

---

## 📞 Need Help?

If you encounter issues:
1. Check Vercel deployment logs
2. Check backend logs in Railway/Render
3. Verify environment variables are set correctly
4. Test backend API endpoints directly in browser/Postman

---

**Ready to deploy? Follow Step 1 (Backend) then Step 2 (Frontend)!** 🚀
