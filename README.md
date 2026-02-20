# Netflix Clone - Movie Landing Page

A Netflix-style movie streaming platform built with Next.js 14, TMDB API, and Aiven MySQL for authentication.

## Features

- 🔐 User authentication (Signup/Login) with Aiven MySQL
- 🎬 Movie data from TMDB API
- 🎨 Netflix-inspired UI/UX
- 📱 Responsive design (mobile & desktop)
- 🔒 Protected routes with JWT
- ⚡ Optimized for Vercel deployment

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Aiven MySQL
- **Authentication**: JWT with bcryptjs
- **API**: The Movie Database (TMDB)
- **Deployment**: Vercel

## Prerequisites

Before you begin, ensure you have:

1. **Node.js** (v18 or higher)
2. **Aiven MySQL Database** - [Sign up for free](https://aiven.io/)
3. **TMDB API Key** - [Get it here](https://www.themoviedb.org/settings/api)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd netflix-clone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Aiven MySQL Configuration
DB_HOST=your-aiven-mysql-host.aivencloud.com
DB_PORT=12345
DB_USER=avnadmin
DB_PASSWORD=your-database-password
DB_NAME=defaultdb

# TMDB API Key
NEXT_PUBLIC_TMDB_API_KEY=your-tmdb-api-key

# JWT Secret (use a strong random string)
JWT_SECRET=your-super-secret-jwt-key-min-32-characters

# Base URL (update for production)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Get Aiven MySQL Credentials

1. Go to [Aiven Console](https://console.aiven.io/)
2. Create a MySQL service (free tier available)
3. Wait for the service to start
4. Copy connection details:
   - Host
   - Port
   - User (avnadmin)
   - Password
   - Database name (defaultdb)

### 5. Get TMDB API Key

1. Create account at [TMDB](https://www.themoviedb.org/)
2. Go to Settings → API
3. Request an API key (free)
4. Copy the API Key (v3 auth)

### 6. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Database Schema

The application automatically creates the following table:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  kodnestid VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Vercel](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Configure environment variables in Vercel:
   - Add all variables from `.env`
   - Set `NEXT_PUBLIC_BASE_URL` to your Vercel domain
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variables
vercel env add DB_HOST
vercel env add DB_PORT
vercel env add DB_USER
vercel env add DB_PASSWORD
vercel env add DB_NAME
vercel env add NEXT_PUBLIC_TMDB_API_KEY
vercel env add JWT_SECRET
vercel env add NEXT_PUBLIC_BASE_URL

# Deploy to production
vercel --prod
```

## Important Notes for Production

1. **Environment Variables**: 
   - Never commit `.env` to Git
   - Set all environment variables in Vercel dashboard
   - Update `NEXT_PUBLIC_BASE_URL` to your production domain

2. **Database Security**:
   - Aiven provides SSL by default
   - Keep database credentials secure
   - Use strong passwords

3. **JWT Secret**:
   - Generate a strong random secret (min 32 characters)
   - Use different secrets for dev/staging/production

4. **TMDB API**:
   - Free tier has rate limits
   - Monitor your usage
   - Consider caching if needed

## Project Structure

```
netflix-clone/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── signup/route.ts
│   │       ├── login/route.ts
│   │       ├── logout/route.ts
│   │       └── me/route.ts
│   ├── browse/
│   │   └── page.tsx          # Main movie landing page
│   ├── login/
│   │   └── page.tsx          # Login page
│   ├── signup/
│   │   └── page.tsx          # Signup page
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── lib/
│   ├── db.ts                 # Database connection
│   └── auth.ts               # JWT utilities
├── public/
├── .env.example
├── next.config.js
├── tailwind.config.js
├── package.json
└── README.md
```

## API Routes

- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

## Troubleshooting

### Database Connection Issues

```bash
# Test database connection
mysql -h your-host.aivencloud.com -P port -u avnadmin -p
```

### TMDB API Issues

- Verify API key is correct
- Check rate limits
- Ensure `NEXT_PUBLIC_` prefix for client-side access

### Vercel Deployment Issues

- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Ensure Node.js version compatibility

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Environment Variables Summary

| Variable | Required | Description |
|----------|----------|-------------|
| `DB_HOST` | Yes | Aiven MySQL host |
| `DB_PORT` | Yes | Aiven MySQL port |
| `DB_USER` | Yes | Database user (avnadmin) |
| `DB_PASSWORD` | Yes | Database password |
| `DB_NAME` | Yes | Database name (defaultdb) |
| `NEXT_PUBLIC_TMDB_API_KEY` | Yes | TMDB API key |
| `JWT_SECRET` | Yes | Secret for JWT signing |
| `NEXT_PUBLIC_BASE_URL` | Yes | Application base URL |

## Security Considerations

1. All passwords are hashed with bcrypt
2. JWT tokens stored in HTTP-only cookies
3. Protected routes check authentication
4. Database connection uses SSL
5. Environment variables never exposed to client

## License

MIT

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review environment variables
3. Check Vercel deployment logs
4. Verify database connection

## Credits

- Movie data from [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Inspired by Netflix UI/UX
