# iHealth NextJS Installation Guide

## Quick Start for Ubuntu 24.04

### Prerequisites
- Ubuntu 24.04 LTS
- Internet connection
- Terminal access

### Step 1: System Update
```bash
sudo apt update && sudo apt upgrade -y
```

### Step 2: Install Node.js 20
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version  # Should show v20.x.x
```

### Step 3: Install Yarn
```bash
npm install -g yarn
yarn --version
```

### Step 4: Install PostgreSQL
```bash
sudo apt install postgresql postgresql-contrib -y
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres createuser --interactive
# Enter your username and make it a superuser

sudo -u postgres createdb ihealth_db

# Set password
sudo -u postgres psql
\password your_username
\q
```

### Step 5: Clone and Setup
```bash
git clone https://github.com/mc0l85/ihealth-nextjs.git
cd ihealth-nextjs/app
yarn install
```

### Step 6: Environment Setup
```bash
cp .env.example .env
nano .env
```

Update the .env file:
```
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/ihealth_db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
```

### Step 7: Database Setup
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

### Step 8: Start Development Server
```bash
yarn dev
```

Open http://localhost:3000 in your browser.

### Test Account
- Email: john@doe.com
- Password: johndoe123

## Troubleshooting

### Database Connection Issues
```bash
sudo systemctl status postgresql
sudo systemctl restart postgresql
```

### Port Already in Use
```bash
sudo lsof -ti:3000 | xargs kill -9
```

### Permission Issues
```bash
sudo chown -R $(whoami) ~/.npm
```

For more detailed instructions, see the main README.md file.