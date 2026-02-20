# Vercel Deployment Guide

## Quick Deploy to Vercel

### Prerequisites
- GitHub/GitLab/Bitbucket account
- Vercel account (free)
- Aiven MySQL database
- TMDB API key

## Step-by-Step Deployment

### 1. Push Code to Git Repository

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your Git repository
4. Vercel will auto-detect Next.js

### 3. Configure Environment Variables

In Vercel dashboard, add these environment variables:

**Database Configuration:**
```
DB_HOST=your-aiven-mysql-host.aivencloud.com
DB_PORT=12345
DB_USER=avnadmin
DB_PASSWORD=your-password
DB_NAME=defaultdb
```

**API Configuration:**
```
NEXT_PUBLIC_TMDB_API_KEY=your-tmdb-api-key
JWT_SECRET=your-32-char-min-secret-key
NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
```

### 4. Deploy Settings

**Framework Preset:** Next.js
**Build Command:** `npm run build` (auto-detected)
**Output Directory:** `.next` (auto-detected)
**Install Command:** `npm install` (auto-detected)

### 5. Deploy

Click "Deploy" - Vercel will:
1. Install dependencies
2. Build your application
3. Deploy to production
4. Provide a live URL

## Post-Deployment

### Update Base URL

After first deployment, update `NEXT_PUBLIC_BASE_URL`:
1. Go to Project Settings → Environment Variables
2. Update `NEXT_PUBLIC_BASE_URL` to your Vercel URL
3. Redeploy

### Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Automatic Deployments

Vercel automatically deploys on:
- **Production:** Pushes to `main` branch
- **Preview:** Pull requests and other branches

## Vercel CLI Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Add environment variables
vercel env add DB_HOST production
vercel env add DB_PORT production
vercel env add DB_USER production
vercel env add DB_PASSWORD production
vercel env add DB_NAME production
vercel env add NEXT_PUBLIC_TMDB_API_KEY production
vercel env add JWT_SECRET production
vercel env add NEXT_PUBLIC_BASE_URL production

# Deploy to production
vercel --prod
```

## Environment Variable Management

### Add variable:
```bash
vercel env add VARIABLE_NAME
```

### Pull variables locally:
```bash
vercel env pull .env.local
```

### List variables:
```bash
vercel env ls
```

## Troubleshooting

### Build Fails

Check build logs in Vercel dashboard:
1. Go to Deployments
2. Click failed deployment
3. View build logs

Common issues:
- Missing environment variables
- TypeScript errors
- Database connection timeout

### Database Connection Issues

Aiven MySQL requires SSL. The code handles this automatically:
```typescript
ssl: {
  rejectUnauthorized: false
}
```

### Environment Variables Not Working

Ensure variables have correct prefixes:
- `NEXT_PUBLIC_*` - Available in browser
- No prefix - Server-side only

### Cold Starts

First request may be slow (serverless). Solutions:
1. Use Vercel Pro for faster cold starts
2. Implement caching
3. Pre-warm endpoints

## Performance Tips

1. **Image Optimization:**
   - Already configured in `next.config.js`
   - TMDB images auto-optimized

2. **Caching:**
   - Consider Redis for session storage
   - Cache TMDB responses

3. **Database Connection Pooling:**
   - Already implemented in `lib/db.ts`
   - Adjust pool size if needed

## Monitoring

Vercel provides:
- **Analytics:** Page views, visitors
- **Logs:** Runtime and build logs
- **Speed Insights:** Performance metrics

Access from Project → Analytics/Logs

## Costs

**Free Tier Includes:**
- Unlimited deployments
- 100GB bandwidth/month
- SSL certificate
- Custom domains

**Pro Tier ($20/month):**
- More bandwidth
- Faster builds
- Better performance

## Security Checklist

- ✅ Environment variables set in Vercel (not in code)
- ✅ JWT secret is strong (32+ characters)
- ✅ Database uses SSL
- ✅ Cookies are HTTP-only
- ✅ CORS properly configured

## Support

**Vercel Documentation:**
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

**Get Help:**
- Vercel Discord
- GitHub Issues
- Vercel Support (Pro)

## Next Steps

1. Test authentication flow
2. Verify TMDB API integration
3. Check database connectivity
4. Add custom domain (optional)
5. Monitor performance
6. Set up alerts (Vercel Pro)

---

Your app is now live! 🚀
```

Visit your deployment URL and sign up to test the complete flow.
