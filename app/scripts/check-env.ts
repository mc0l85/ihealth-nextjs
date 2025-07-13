import fs from 'fs'
import path from 'path'

interface EnvCheck {
  name: string
  required: boolean
  description: string
}

const envChecks: EnvCheck[] = [
  {
    name: 'DATABASE_URL',
    required: true,
    description: 'PostgreSQL database connection string'
  },
  {
    name: 'NEXTAUTH_URL',
    required: true,
    description: 'NextAuth.js URL (http://localhost:3000 for development)'
  },
  {
    name: 'NEXTAUTH_SECRET',
    required: true,
    description: 'NextAuth.js secret key for JWT signing'
  },
  {
    name: 'OPENAI_API_KEY',
    required: false,
    description: 'OpenAI API key for AI chat features'
  },
  {
    name: 'OURA_CLIENT_ID',
    required: false,
    description: 'Oura Ring API client ID'
  },
  {
    name: 'OURA_CLIENT_SECRET',
    required: false,
    description: 'Oura Ring API client secret'
  },
  {
    name: 'EMAIL_SERVER_HOST',
    required: false,
    description: 'SMTP server host for email notifications'
  },
  {
    name: 'EMAIL_SERVER_USER',
    required: false,
    description: 'SMTP server username'
  },
  {
    name: 'EMAIL_SERVER_PASSWORD',
    required: false,
    description: 'SMTP server password'
  },
  {
    name: 'EMAIL_FROM',
    required: false,
    description: 'From email address for notifications'
  }
]

async function main() {
  console.log('🔍 Checking environment configuration...\n')

  const envPath = path.join(process.cwd(), '.env.local')
  const envExamplePath = path.join(process.cwd(), '.env.local.example')

  // Check if .env.local exists
  if (!fs.existsSync(envPath)) {
    console.log('❌ .env.local file not found!')
    
    if (fs.existsSync(envExamplePath)) {
      console.log('💡 Found .env.local.example. You can copy it:')
      console.log('   cp .env.local.example .env.local')
    } else {
      console.log('💡 Create .env.local with the required environment variables.')
    }
    
    console.log('\n📋 Required environment variables:')
    envChecks.forEach(check => {
      const status = check.required ? '🔴 REQUIRED' : '🟡 OPTIONAL'
      console.log(`   ${status} ${check.name} - ${check.description}`)
    })
    
    return
  }

  // Load environment variables
  const envContent = fs.readFileSync(envPath, 'utf8')
  const envVars: Record<string, string> = {}
  
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=')
    if (key && valueParts.length > 0) {
      envVars[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '')
    }
  })

  let allRequiredPresent = true
  let hasOptionalFeatures = false

  console.log('📋 Environment Variables Status:\n')

  envChecks.forEach(check => {
    const value = envVars[check.name]
    const isPresent = value && value.length > 0
    
    if (check.required) {
      if (isPresent) {
        console.log(`✅ ${check.name} - Set`)
      } else {
        console.log(`❌ ${check.name} - Missing (REQUIRED)`)
        allRequiredPresent = false
      }
    } else {
      if (isPresent) {
        console.log(`✅ ${check.name} - Set (enables: ${check.description})`)
        hasOptionalFeatures = true
      } else {
        console.log(`⚪ ${check.name} - Not set (optional)`)
      }
    }
  })

  console.log('\n📊 Summary:')
  
  if (allRequiredPresent) {
    console.log('✅ All required environment variables are set!')
    console.log('🚀 You can run: npm run dev')
  } else {
    console.log('❌ Some required environment variables are missing.')
    console.log('📝 Please update your .env.local file before running the application.')
  }

  if (hasOptionalFeatures) {
    console.log('🎉 Optional features are configured and will be available.')
  } else {
    console.log('💡 Consider adding optional environment variables for enhanced features.')
  }

  console.log('\n🔗 Useful commands:')
  console.log('   npm run setup    - Complete development setup')
  console.log('   npm run seed     - Seed database with demo data')
  console.log('   npm run dev      - Start development server')
  console.log('   npm run db:studio - Open Prisma Studio')
}

main().catch(console.error)