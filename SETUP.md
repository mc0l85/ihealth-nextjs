# iHealth NextJS - Setup Guide

This guide will help you set up the iHealth NextJS application locally.

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Git

## Quick Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/mc0l85/ihealth-nextjs.git
   cd ihealth-nextjs/app
   ```

2. **Run the automated setup**
   ```bash
   npm run setup
   ```
   This will:
   - Install all dependencies
   - Create `.env.local` from example
   - Generate Prisma client
   - Set up database schema
   - Seed with demo data

3. **Configure environment variables**
   Edit `.env.local` with your actual values:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/ihealth_db"
   NEXTAUTH_SECRET="your-secret-key-here"
   # ... other variables
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   Visit [http://localhost:3000](http://localhost:3000)

## Manual Setup

If you prefer to set up manually:

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your values
   ```

3. **Set up database**
   ```bash
   npx prisma generate
   npx prisma db push
   npm run seed
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run setup` - Complete development setup
- `npm run seed` - Seed database with demo data
- `npm run reset-db` - Reset database (delete all data)
- `npm run migrate` - Run database migrations

## Demo Account

After seeding, you can log in with:
- **Email:** demo@ihealth.com
- **Password:** demo123

## Database Schema

The application uses PostgreSQL with Prisma ORM. Key models include:

- **User** - User accounts and profiles
- **HealthRecord** - Daily health metrics
- **Workout** - Exercise sessions
- **SleepData** - Sleep tracking data
- **ActivityData** - Daily activity metrics
- **OuraData** - Oura Ring integration data
- **ChatConversation/ChatMessage** - AI chat functionality

## Features

- 📊 Health data tracking and visualization
- 💪 Workout logging and analysis
- 😴 Sleep monitoring
- 🔗 Oura Ring integration
- 🤖 AI-powered health insights
- 📱 Responsive design
- 🔐 Secure authentication

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env.local
- Verify database exists and user has permissions

### Build Errors
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Regenerate Prisma client: `npx prisma generate`

### Environment Variables
- Ensure all required variables are set in .env.local
- Restart development server after changing environment variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues and questions:
- Check the troubleshooting section above
- Review the application logs
- Create an issue on GitHub