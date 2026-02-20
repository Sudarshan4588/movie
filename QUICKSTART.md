# Quick Setup Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
# Get from Aiven MySQL Dashboard
DB_HOST=your-aiven-host.aivencloud.com
DB_PORT=12345
DB_USER=avnadmin
DB_PASSWORD=your-password
DB_NAME=defaultdb

# Get from TMDB (themoviedb.org)
NEXT_PUBLIC_TMDB_API_KEY=your-tmdb-key

# Generate a random string (32+ chars)
JWT_SECRET=your-secret-key-min-32-characters

# For local development
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📦 Get Your Credentials

### Aiven MySQL (Free Tier)
1. Sign up at [aiven.io](https://aiven.io/)
2. Create MySQL service
3. Copy connection details

### TMDB API (Free)
1. Sign up at [themoviedb.org](https://www.themoviedb.org/)
2. Go to Settings → API
3. Request API key
4. Copy API Key (v3)

### JWT Secret
Generate a secure random string:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🌐 Deploy to Vercel

### Method 1: GitHub + Vercel Dashboard
1. Push code to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

### Method 2: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
```

---

## ✅ Testing

1. **Sign Up**: Create a new account
2. **Login**: Sign in with credentials
3. **Browse**: View movies from TMDB
4. **Logout**: Sign out

---

## 📁 Project Structure
```
netflix-clone/
├── app/
│   ├── api/auth/          # Authentication endpoints
│   ├── browse/            # Main movie page
│   ├── login/             # Login page
│   └── signup/            # Signup page
├── lib/
│   ├── db.ts              # Database connection
│   └── auth.ts            # JWT utilities
└── .env                   # Your credentials
```

---

## 🆘 Troubleshooting

**Database Connection Error?**
- Check Aiven service is running
- Verify credentials in `.env`
- Ensure SSL is enabled (automatic)

**TMDB Not Loading?**
- Check API key is correct
- Verify `NEXT_PUBLIC_` prefix
- Check browser console for errors

**Build Errors?**
- Run `npm install` again
- Check Node version (18+)
- Clear cache: `rm -rf .next`

---

## 📚 Full Documentation

- [README.md](./README.md) - Complete documentation
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [setup.sql](./setup.sql) - Database schema

---

## 🎯 Next Steps

1. Customize the UI
2. Add more movie categories
3. Implement search functionality
4. Add user profiles
5. Deploy to production

---

**Need Help?** Check the full README.md for detailed instructions!
