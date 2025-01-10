
# Drawing Viewer Application

A modern web application for viewing technical drawings using Autodesk Forge Viewer, built with Next.js 14 and Supabase.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
- **Backend**: Supabase
- **Viewer**: Autodesk Forge Viewer
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Deployment**: Vercel
- **Container**: Docker

## Features

- User authentication (email/password)
- Protected routes for authenticated users
- Drawing upload and management
- Autodesk Forge Viewer integration
- Responsive UI with Tailwind
- Real-time updates
- Docker support for development

## Prerequisites

- Node.js 18+
- Docker and Docker Compose (optional)
- Supabase Account
- Autodesk Forge API credentials

## Environment Setup

Create a `.env.local` file in the root directory:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_FORGE_CLIENT_ID=your_forge_client_id
FORGE_CLIENT_SECRET=your_forge_client_secret


## Installation

1. Clone the repository:
git clone https://github.com/anwar78692/drawing-viewer.git
cd drawing-viewer


2. Install dependencies:
npm install

3. Run the development server:
npm run dev
Open [http://localhost:3000](http://localhost:3000)

## Docker Development

1. Build and run with Docker Compose:
docker-compose up
2. Access the application at [http://localhost:3000](http://localhost:3000)

## API Endpoints

### Authentication
- POST `/api/auth/signup` - User registration
- POST `/api/auth/login` - User login
- POST `/api/auth/logout` - User logout

### Drawings
- GET `/api/drawings` - List all drawings
- POST `/api/drawings/upload` - Upload drawing
- GET `/api/drawings/:id` - Get drawing details

## Project Structure
├── app/
│ ├── api/
│ ├── utils/
│ ├── drawings/
│ └── page.tsx
├── components/
├── public/


## Supabase Setup

1. Create a new project in Supabase
2. Set up the drawings table:

CREATE TABLE drawings (
id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
name TEXT NOT NULL,
url TEXT NOT NULL,
user_id UUID REFERENCES auth.users,
created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);


3. Configure storage bucket for drawings

## Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel
4. Deploy

## Development
Run development server
npm run dev

Build for production
npm run build

Start production server
npm start
Run linter
npm run lint


## Docker Configuration

The project includes Docker support for development:

- `Dockerfile` - Container configuration
- `docker-compose.yml` - Service orchestration
- Volume mounting for hot reload
- Environment variable handling

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Autodesk Forge Documentation](https://forge.autodesk.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

# Deployment Guide

## Vercel Deployment

1. Push code to GitHub
2. Connect to Vercel:
   - Go to vercel.com
   - Import project
   - Configure build settings:
     - Framework: Next.js
     - Build Command: npm run build
     - Output Directory: .next
3. Configure environment variables
4. Deploy

## Production URLs
- Application: https://drawing-viewer-sooty.vercel.app/
- Supabase Project: https://supabase.com/dashboard/projects
-Login detail :- Email :- anwar15298@gmail.com
                 Password : Anwar@321
                 
## License

This project is licensed under the MIT License.