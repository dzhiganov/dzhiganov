# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Nuxt 3, featuring:
- Personal portfolio with projects, videos, and downloadable materials
- Authentication system using Better Auth with GitHub/Google OAuth
- YouTube integration for video content
- Email newsletter functionality via Resend
- MongoDB database for user management and content
- Tailwind CSS for styling

## Development Commands

```bash
# Install dependencies
npm install

# Development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Generate static site
npm run generate
```

## Architecture Overview

### Authentication Flow
- **Better Auth**: Modern auth library configured in `server/lib/auth.ts`
- **Auth Client**: Client-side auth client in `plugins/auth.client.ts`
- **Base URL**: Authentication endpoints use `/api/auth` (handled by `server/api/auth/[...].ts`)
- **Social Providers**: GitHub and Google OAuth configured
- **Email/Password**: Enabled with optional email verification
- **Session Management**: 7-day expiration with 24-hour update interval

### Key Architectural Patterns
- **Server API Routes**: Located in `server/api/` with REST endpoints
- **Composables**: Reusable logic in `composables/` (useAuth, useYouTube, useTheme, useNewsletter)
- **Middleware**: Route protection in `middleware/auth.ts`
- **Database**: MongoDB with connection string in env vars
- **Content Management**: Nuxt Content for markdown materials in `content/`

### Directory Structure
```
├── components/           # Vue components for UI sections
├── composables/         # Reusable composition functions
├── content/            # Markdown content (materials)
├── middleware/         # Route middleware (auth protection)
├── pages/              # File-based routing
├── plugins/           # Nuxt plugins (auth client)
├── public/            # Static assets
├── server/            # Server-side code
│   ├── api/           # API endpoints
│   ├── lib/           # Server utilities (auth config)
│   └── models/        # Database models
└── assets/            # Build-time assets
```

## Environment Configuration

Copy `.env.example` to `.env` and configure:
- `YOUTUBE_API_KEY`: YouTube Data API v3 key
- `RESEND_API_KEY`: Email service API key
- `MONGODB_URI`: MongoDB connection string
- `BETTER_AUTH_SECRET`: 32+ character secret for auth
- `BETTER_AUTH_URL`: Base URL for auth callbacks
- `GITHUB_CLIENT_ID/SECRET`: GitHub OAuth credentials
- `GOOGLE_CLIENT_ID/SECRET`: Google OAuth credentials
- `NUXT_PUBLIC_BASE_URL`: Public base URL for the app

## Authentication System Details

### Better Auth Configuration
- **Database**: MongoDB adapter with "portfolio" database
- **Session**: 7-day expiration, 24-hour update age
- **Providers**: Email/password, GitHub, Google
- **Callbacks**: Custom sign-in/sign-up logic with logging
- **Trusted Origins**: Configured for CORS handling

### Auth Client Usage
```typescript
const { user, signIn, signUp, signOut, signInWithGitHub, signInWithGoogle } = useAuth()
```

### Route Protection
- Protected routes: `/dashboard/*`
- Redirect authenticated users away from: `/login`, `/register`
- Middleware automatically handles redirects

## Content Management

### Nuxt Content
- **Materials**: Markdown files in `content/materials/`
- **Collections**: Configured in `content.config.ts`
- **Dynamic Routes**: `pages/materials/[id].vue` for material pages

### Video Integration
- **YouTube API**: Fetch video data in `composables/useYouTube.ts`
- **Video Pages**: `pages/video/[id].vue` for individual videos
- **Videos List**: `pages/videos.vue` for video gallery

## Key Features

### Download System
- **Token-based**: Secure download links via `pages/download/[token].vue`
- **API Endpoint**: `server/api/materials/download/[token].get.ts`
- **File Serving**: Static files served from `server/api/materials/files/[...path].get.ts`

### Newsletter
- **Resend Integration**: Email service in `server/api/newsletter/subscribe.post.ts`
- **Frontend**: Newsletter signup in `composables/useNewsletter.ts`

### Theme System
- **Dark/Light Mode**: Toggle in `composables/useTheme.ts`
- **Component**: `components/ThemeToggle.vue`
- **Persistence**: LocalStorage-based theme persistence

## Database Schema

### Users Collection
- Managed by Better Auth
- Fields: email, name, provider info, sessions

### Materials Collection
- Downloadable content metadata
- Access tokens for secure downloads

## Common Issues

### Auth Base URL Error
If you see "Invalid base URL: /api/auth", ensure:
1. `BETTER_AUTH_URL` is set in environment
2. `baseURL` in auth client matches server configuration
3. Server is running on the correct port

### MongoDB Connection
- Default: `mongodb://localhost:27017/portfolio`
- Database name: "portfolio"
- Ensure MongoDB is running locally or update connection string

## Development Notes

- **No linting/testing**: Project uses standard npm scripts without additional linting or testing frameworks
- **Tailwind CSS**: Configured in `tailwind.config.js`
- **Google Fonts**: Inter, Fira Code, Chivo, Lora fonts loaded
- **TypeScript**: Configured throughout with strict type checking