# iHealth NextJS - Personal Health Tracking Platform

A comprehensive health tracking application built with Next.js, featuring AI-powered insights, Oura Ring integration, and detailed health analytics.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/mc0l85/ihealth-nextjs.git
cd ihealth-nextjs/app

# Run automated setup
npm run setup

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) and log in with:
- **Email:** demo@ihealth.com  
- **Password:** demo123

## ✨ Features

- 📊 **Health Data Tracking** - Monitor steps, calories, heart rate, weight, and more
- 💪 **Workout Logging** - Track exercises with detailed metrics
- 😴 **Sleep Analysis** - Comprehensive sleep quality monitoring
- 🔗 **Oura Ring Integration** - Sync data from your Oura Ring
- 🤖 **AI Health Insights** - Get personalized recommendations
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🔐 **Secure Authentication** - NextAuth.js with multiple providers
- 📈 **Data Visualization** - Beautiful charts and graphs
- 💬 **AI Chat Assistant** - Ask questions about your health data

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS, Radix UI, Framer Motion
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js
- **Charts:** Chart.js, Recharts, Plotly.js
- **AI:** OpenAI API integration
- **Deployment:** Vercel-ready

## 📋 Prerequisites

- Node.js 18 or higher
- PostgreSQL database
- Git

## 🔧 Installation

### Automated Setup (Recommended)

```bash
git clone https://github.com/mc0l85/ihealth-nextjs.git
cd ihealth-nextjs/app
npm run setup
```

### Manual Setup

1. **Clone and install dependencies**
   ```bash
   git clone https://github.com/mc0l85/ihealth-nextjs.git
   cd ihealth-nextjs/app
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` with your values:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/ihealth_db"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   OPENAI_API_KEY="your-openai-api-key"
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

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run setup` | Complete development setup |
| `npm run seed` | Seed database with demo data |
| `npm run reset-db` | Reset database (delete all data) |
| `npm run migrate` | Run database migrations |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:studio` | Open Prisma Studio |
| `npm run generate` | Generate Prisma client |

## 🗄️ Database Schema

### Core Models

- **User** - User accounts, profiles, and health goals
- **HealthRecord** - Daily health metrics (steps, calories, heart rate, etc.)
- **Workout** - Exercise sessions with detailed tracking
- **SleepData** - Sleep quality and duration metrics
- **ActivityData** - Daily activity summaries
- **OuraData** - Oura Ring integration data
- **ChatConversation/ChatMessage** - AI chat functionality

### Key Features

- Comprehensive health data tracking
- Oura Ring API integration
- AI-powered chat system
- Secure user authentication
- Data visualization ready

## 🔗 Integrations

### Oura Ring
Connect your Oura Ring to automatically sync:
- Sleep data (duration, efficiency, stages)
- Activity data (steps, calories, heart rate)
- Readiness scores and recovery metrics

### OpenAI
AI-powered features include:
- Personalized health insights
- Chat-based data analysis
- Trend identification
- Goal recommendations

## 🎨 UI Components

Built with modern, accessible components:
- Radix UI primitives
- Custom Tailwind CSS styling
- Framer Motion animations
- Responsive design patterns
- Dark/light mode support

## 📊 Data Visualization

Multiple chart types for health data:
- Line charts for trends
- Bar charts for comparisons
- Pie charts for distributions
- Interactive Plotly.js charts
- Real-time data updates

## 🔐 Security

- NextAuth.js authentication
- Secure password hashing (bcrypt)
- JWT token management
- Environment variable protection
- Database query sanitization

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy automatically

### Docker

```bash
# Build image
docker build -t ihealth-nextjs .

# Run container
docker run -p 3000:3000 ihealth-nextjs
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📱 Mobile Support

- Responsive design for all screen sizes
- Touch-friendly interface
- Progressive Web App (PWA) ready
- Offline data caching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📖 Check the [SETUP.md](SETUP.md) guide
- 🐛 Report issues on GitHub
- 💬 Join our community discussions
- 📧 Contact support

## 🗺️ Roadmap

- [ ] Apple Health integration
- [ ] Google Fit integration
- [ ] Advanced AI insights
- [ ] Social features
- [ ] Nutrition tracking
- [ ] Medication reminders
- [ ] Doctor portal
- [ ] Export/import data

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma for the excellent ORM
- Radix UI for accessible components
- Tailwind CSS for utility-first styling
- OpenAI for AI capabilities

---

**Made with ❤️ for better health tracking**