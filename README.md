# iHealth - Personal Health Tracking Dashboard

A modern, comprehensive health tracking application built with NextJS that helps you monitor your wellness journey through data visualization, AI insights, and device integrations.

![iHealth Dashboard](https://lh3.googleusercontent.com/QpUVkhodlLmKRTJzZklmWxqJEINbuLmD2526HXUA-_d6aLm7gh6WrW2bMe3pmrjG44Xf=h900)

## 🌟 Features

### ✅ Currently Implemented
- **User Authentication**: Secure login/signup with session management
- **Health Dashboard**: Interactive overview with key metrics and trends
- **Data Visualization**: Beautiful charts for steps, sleep, calories, and more
- **Health Metrics Tracking**: Steps, calories, distance, heart rate, sleep data
- **Workout Tracking**: Exercise logging and progress monitoring
- **Sleep Analysis**: Sleep quality scoring and pattern analysis
- **AI Chat Interface**: Health insights powered by LLM (UI ready)
- **Data Import System**: Apple Health and Oura Ring integration (UI ready)
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Real-time Data**: Live dashboard updates with sample data

### 🚧 Coming Soon
- Apple Health XML file processing and import
- Oura Ring API live data sync
- Streaming AI chat responses with health insights
- Advanced analytics and trend predictions
- Health goal setting and progress tracking
- Data export and sharing features

## 🛠️ Technology Stack

- **Frontend**: NextJS 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion for animations
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with JWT sessions
- **Charts**: Recharts for data visualization
- **UI Components**: Radix UI primitives
- **AI Integration**: AbacusAI LLM API for health insights

## 📋 Prerequisites

This guide assumes you're using **Ubuntu 24.04** and are new to web development. We'll walk through every step.

## 🚀 Installation Guide for Ubuntu 24.04

### Step 1: Update Your System

First, let's make sure your Ubuntu system is up to date:

```bash
sudo apt update && sudo apt upgrade -y
```

### Step 2: Install Node.js and npm

We need Node.js version 18 or higher:

```bash
# Install Node.js 20 (recommended)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x or higher
```

### Step 3: Install Yarn Package Manager

Yarn is faster and more reliable than npm:

```bash
# Install Yarn globally
npm install -g yarn

# Verify installation
yarn --version  # Should show 1.x.x or higher
```

### Step 4: Install Git

Git is needed to clone the repository:

```bash
sudo apt install git -y

# Verify installation
git --version
```

### Step 5: Install PostgreSQL

We need PostgreSQL for our database:

```bash
# Install PostgreSQL and additional tools
sudo apt install postgresql postgresql-contrib -y

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create a database user
sudo -u postgres createuser --interactive
# When prompted:
# - Enter name of role: your_username
# - Shall the new role be a superuser? y

# Create a database
sudo -u postgres createdb ihealth_db

# Set password for your user
sudo -u postgres psql
\password your_username
\q
```

### Step 6: Clone and Setup the Project

```bash
# Clone the repository
git clone https://github.com/mc0l85/ihealth-nextjs.git
cd ihealth-nextjs/app

# Install dependencies
yarn install

# Copy environment variables template
cp .env.example .env

# Edit environment variables
nano .env
```

### Step 7: Configure Environment Variables

Edit the `.env` file with your settings:

```bash
# Database URL - Update with your credentials
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/ihealth_db"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# AI Chat API (AbacusAI)
ABACUSAI_API_KEY="your-api-key-here"
```

**Generate a secure secret:**
```bash
openssl rand -base64 32
```

### Step 8: Setup Database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed database with sample data
npx prisma db seed
```

### Step 9: Start Development Server

```bash
yarn dev
```

Your application will be available at `http://localhost:3000`

## 👤 Test Account

Use these credentials to test the application:
- **Email**: john@doe.com
- **Password**: johndoe123

## 📱 Usage

### Dashboard Overview
1. **Sign in** with your credentials
2. **View metrics** - See your daily steps, calories, sleep, and heart rate
3. **Analyze trends** - Compare today's data with weekly averages
4. **Review workouts** - Check your recent exercise activities
5. **Track sleep** - Monitor sleep quality and duration

### Navigation
- **Dashboard**: Main health overview with key metrics
- **Sleep**: Detailed sleep analysis and patterns
- **Workouts**: Exercise tracking and progress
- **Chat**: AI-powered health insights (coming soon)
- **Import**: Data import from Apple Health and Oura Ring

### Adding Data
Currently, the app uses sample data. Future versions will support:
- Manual data entry
- Apple Health XML import
- Oura Ring API sync
- Other fitness device integrations

## 🔧 Development

### Project Structure
```
ihealth-nextjs/app/
├── app/                    # NextJS app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── dashboard/         # Dashboard-specific components
│   └── ui/               # Reusable UI components
├── lib/                  # Utility functions
├── prisma/               # Database schema and migrations
└── types/                # TypeScript type definitions
```

### Available Scripts

```bash
# Development
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server

# Database
npx prisma studio        # Open database browser
npx prisma db push       # Push schema changes
npx prisma db seed       # Seed sample data
npx prisma generate      # Generate Prisma client

# Testing
yarn lint         # Run ESLint
yarn type-check   # Check TypeScript types
```

## 🗄️ Database Schema

The application uses a comprehensive health data schema:

- **Users**: Profile and authentication
- **HealthRecords**: Daily health metrics
- **Workouts**: Exercise activities
- **SleepData**: Sleep tracking information
- **ActivityData**: Daily activity summaries
- **OuraData**: Oura Ring specific metrics
- **ChatConversations**: AI chat history

## 🔌 API Integration

### Health Data APIs
- **Apple Health**: XML export processing
- **Oura Ring**: REST API for sleep/activity data
- **Manual Entry**: Form-based data input

### AI Chat Integration
- **LLM Provider**: AbacusAI for health insights
- **Streaming**: Real-time response streaming
- **Context**: Health data-aware conversations

## 🎨 Customization

### Themes
The app uses a health-focused color palette:
- **Primary**: Blue (#60B5FF) - Trust and technology
- **Secondary**: Green (#10B981) - Health and growth
- **Accent**: Purple (#8B5CF6) - Sleep and recovery

### Adding New Metrics
1. Update Prisma schema in `prisma/schema.prisma`
2. Create migration: `npx prisma db push`
3. Add UI components in `components/dashboard/`
4. Update API routes in `app/api/`

## 🚨 Troubleshooting

### Common Issues

#### Database Connection Error
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Restart if needed
sudo systemctl restart postgresql

# Check database exists
sudo -u postgres psql -l
```

#### Node Version Issues
```bash
# Check Node version
node --version

# Update if needed (should be 18+)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Port Already in Use
```bash
# Kill process on port 3000
sudo lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 yarn dev
```

#### Prisma Issues
```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Regenerate client
npx prisma generate
```

### Environment Setup Issues

#### Missing Dependencies
```bash
# Reinstall node_modules
rm -rf node_modules yarn.lock
yarn install
```

#### Permission Issues
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

## 📊 Performance

### Optimization Features
- **Server-side rendering** for fast initial loads
- **Static generation** for auth pages
- **Image optimization** with Next.js Image component
- **Code splitting** for efficient bundle sizes
- **Caching** for API responses

### Monitoring
- Built-in performance monitoring
- Error boundary components
- Console logging for debugging

## 🔒 Security

### Authentication
- **JWT tokens** for session management
- **Password hashing** with bcryptjs
- **CSRF protection** via NextAuth.js
- **Secure headers** in production

### Data Protection
- **Environment variables** for sensitive data
- **Database encryption** for passwords
- **API rate limiting** (recommended for production)
- **Input validation** on all forms

## 🚀 Deployment

### Production Checklist
- [ ] Set secure `NEXTAUTH_SECRET`
- [ ] Configure production database
- [ ] Set up SSL certificates
- [ ] Configure domain and DNS
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy

### Recommended Platforms
- **Vercel**: Optimized for NextJS applications
- **Railway**: Easy PostgreSQL integration
- **DigitalOcean**: Full control and customization
- **AWS**: Enterprise-scale deployment

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

Need help? Here are your options:

1. **Check this README** for common solutions
2. **GitHub Issues** for bug reports
3. **Discussions** for questions and ideas
4. **Email Support** for urgent issues

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **NextJS Team** for the amazing framework
- **Radix UI** for accessible components
- **Tailwind CSS** for utility-first styling
- **Prisma** for type-safe database access
- **AbacusAI** for LLM integration

---

**Built with ❤️ for better health tracking**

Last updated: July 2025