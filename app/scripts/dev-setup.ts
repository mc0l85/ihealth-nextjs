import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'

const execAsync = promisify(exec)

async function main() {
  console.log('🚀 Setting up development environment...')

  // Check if .env.local exists
  const envPath = path.join(process.cwd(), '.env.local')
  if (!fs.existsSync(envPath)) {
    console.log('📝 Creating .env.local from example...')
    const examplePath = path.join(process.cwd(), '.env.local.example')
    if (fs.existsSync(examplePath)) {
      fs.copyFileSync(examplePath, envPath)
      console.log('✅ .env.local created! Please update it with your actual values.')
    } else {
      console.log('⚠️  .env.local.example not found. Please create .env.local manually.')
    }
  }

  try {
    // Install dependencies
    console.log('📦 Installing dependencies...')
    await execAsync('npm install')
    console.log('✅ Dependencies installed')

    // Generate Prisma client
    console.log('🔧 Generating Prisma client...')
    await execAsync('npx prisma generate')
    console.log('✅ Prisma client generated')

    // Push database schema (if DATABASE_URL is set)
    try {
      console.log('🗄️  Setting up database...')
      await execAsync('npx prisma db push')
      console.log('✅ Database schema applied')

      // Run seed
      console.log('🌱 Seeding database...')
      await execAsync('npm run seed')
      console.log('✅ Database seeded')
    } catch (dbError) {
      console.log('⚠️  Database setup skipped (DATABASE_URL not configured)')
    }

    console.log('\n🎉 Development setup completed!')
    console.log('\n📋 Next steps:')
    console.log('1. Update .env.local with your database URL and other secrets')
    console.log('2. Run: npm run dev')
    console.log('3. Open: http://localhost:3000')
    console.log('\n🔐 Demo login (if database was seeded):')
    console.log('Email: demo@ihealth.com')
    console.log('Password: demo123')

  } catch (error) {
    console.error('❌ Setup failed:', error)
    process.exit(1)
  }
}

main()