import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function main() {
  console.log('🔄 Running database migrations...')

  try {
    // Generate Prisma client
    console.log('📦 Generating Prisma client...')
    await execAsync('npx prisma generate')
    console.log('✅ Prisma client generated')

    // Push database schema
    console.log('🚀 Pushing database schema...')
    await execAsync('npx prisma db push')
    console.log('✅ Database schema pushed')

    console.log('🎉 Migration completed successfully!')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

main()