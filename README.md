# FLICK - Video Messaging Platform

A Loom-like video messaging platform built with Next.js, Supabase, and modern web technologies.

## Features

- 🎥 Screen and video recording
- 👤 User authentication
- 🎬 Video message management
- 🌓 Dark/Light mode support
- 🔒 Secure video storage
- 📱 Responsive design

## Tech Stack

- **Frontend**: Next.js 13+ with App Router
- **Authentication**: Supabase Auth
- **Database & Storage**: Supabase
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Project Structure

```
├── app/                    # Next.js app router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── messages/          # Video messages list
│   ├── record/           # Video recording page
│   └── layout.tsx        # Root layout
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── ui/               # UI components (shadcn/ui)
│   └── video/            # Video-related components
├── lib/                  # Utility functions and configurations
└── middleware.ts        # Authentication middleware
```

## Key Components

- `VideoRecorder`: Handles video recording using the MediaRecorder API
- `VideoList`: Displays recorded videos with playback controls
- `AuthForm`: Manages user authentication flow
- `Header`: Navigation and user controls
- `ThemeProvider`: Manages dark/light mode

## Authentication Flow

1. Users can sign up/sign in via email/password
2. Protected routes require authentication
3. Middleware handles route protection
4. Session management via Supabase

## Video Recording Process

1. User initiates recording
2. MediaRecorder API captures video/audio
3. Recording can be paused/resumed
4. On completion, video is uploaded to Supabase storage
5. Video reference is stored in the database

## Database Schema

```sql
-- Messages table
create table messages (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  video_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Storage bucket for videos
create policy "Videos are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'videos' );

create policy "Users can upload videos"
  on storage.objects for insert
  with check ( bucket_id = 'videos' AND auth.role() = 'authenticated' );
```

## Setup Instructions

1. Create a Supabase project
2. Set up environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Create the database schema
4. Create a storage bucket named "videos"
5. Install dependencies: `npm install`
6. Run development server: `npm run dev`

## Development Workflow

1. Authentication setup
2. Video recording implementation
3. Storage configuration
4. Message management
5. UI/UX enhancements

## Best Practices

- Modular component architecture
- Server/Client component separation
- Proper error handling
- Responsive design
- Type safety with TypeScript
- Secure authentication flow

## Deployment on Vercel

1. **Prepare Your Repository**
   - Push your code to a GitHub repository
   - Make sure your environment variables are properly set up

2. **Deploy to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Environment Variables:
       ```
       NEXT_PUBLIC_SUPABASE_URL=your-project-url
       NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
       ```
   - Click "Deploy"

3. **Post-Deployment**
   - Add your production domain to Supabase Auth configuration
   - Update any necessary CORS settings in Supabase
   - Test all functionality in production environment

4. **Custom Domain (Optional)**
   - Go to Project Settings in Vercel
   - Navigate to Domains section
   - Add your custom domain
   - Configure DNS settings as instructed

## Production Considerations

- Enable rate limiting for API routes
- Set up proper CORS configurations
- Configure proper caching strategies
- Monitor performance metrics
- Set up error tracking (e.g., Sentry)