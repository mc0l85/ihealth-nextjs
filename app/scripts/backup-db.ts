import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'

const execAsync = promisify(exec)

async function main() {
  const databaseUrl = process.env.DATABASE_URL
  
  if (!databaseUrl) {
    console.error('❌ DATABASE_URL environment variable is not set')
    process.exit(1)
  }

  // Parse database URL
  const url = new URL(databaseUrl)
  const dbName = url.pathname.slice(1)
  const host = url.hostname
  const port = url.port || '5432'
  const username = url.username
  const password = url.password

  // Create backups directory if it doesn't exist
  const backupsDir = path.join(process.cwd(), 'backups')
  if (!fs.existsSync(backupsDir)) {
    fs.mkdirSync(backupsDir)
  }

  // Generate backup filename with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupFile = path.join(backupsDir, `ihealth-backup-${timestamp}.sql`)

  console.log('🗄️  Creating database backup...')
  console.log(`📁 Backup file: ${backupFile}`)

  try {
    // Set password environment variable for pg_dump
    const env = { ...process.env, PGPASSWORD: password }
    
    // Create backup using pg_dump
    await execAsync(
      `pg_dump -h ${host} -p ${port} -U ${username} -d ${dbName} -f "${backupFile}"`,
      { env }
    )

    console.log('✅ Database backup created successfully!')
    console.log(`📊 Backup size: ${(fs.statSync(backupFile).size / 1024 / 1024).toFixed(2)} MB`)
    
    // List recent backups
    const backupFiles = fs.readdirSync(backupsDir)
      .filter(file => file.startsWith('ihealth-backup-') && file.endsWith('.sql'))
      .sort()
      .reverse()
      .slice(0, 5)

    console.log('\n📋 Recent backups:')
    backupFiles.forEach(file => {
      const filePath = path.join(backupsDir, file)
      const stats = fs.statSync(filePath)
      const size = (stats.size / 1024 / 1024).toFixed(2)
      console.log(`   ${file} (${size} MB)`)
    })

  } catch (error) {
    console.error('❌ Backup failed:', error)
    process.exit(1)
  }
}

main()