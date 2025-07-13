import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'
import readline from 'readline'

const execAsync = promisify(exec)

async function askQuestion(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer)
    })
  })
}

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

  // Check backups directory
  const backupsDir = path.join(process.cwd(), 'backups')
  if (!fs.existsSync(backupsDir)) {
    console.error('❌ Backups directory not found. Run backup-db first.')
    process.exit(1)
  }

  // List available backups
  const backupFiles = fs.readdirSync(backupsDir)
    .filter(file => file.startsWith('ihealth-backup-') && file.endsWith('.sql'))
    .sort()
    .reverse()

  if (backupFiles.length === 0) {
    console.error('❌ No backup files found in backups directory.')
    process.exit(1)
  }

  console.log('📋 Available backups:')
  backupFiles.forEach((file, index) => {
    const filePath = path.join(backupsDir, file)
    const stats = fs.statSync(filePath)
    const size = (stats.size / 1024 / 1024).toFixed(2)
    const date = new Date(stats.mtime).toLocaleString()
    console.log(`   ${index + 1}. ${file} (${size} MB, ${date})`)
  })

  // Ask user to select backup
  const selection = await askQuestion('\n🔢 Enter backup number to restore (or press Enter for latest): ')
  const selectedIndex = selection.trim() === '' ? 0 : parseInt(selection) - 1

  if (selectedIndex < 0 || selectedIndex >= backupFiles.length) {
    console.error('❌ Invalid selection')
    process.exit(1)
  }

  const selectedBackup = backupFiles[selectedIndex]
  const backupFile = path.join(backupsDir, selectedBackup)

  // Confirm restoration
  const confirm = await askQuestion(`\n⚠️  This will replace all data in database "${dbName}". Continue? (yes/no): `)
  if (confirm.toLowerCase() !== 'yes') {
    console.log('❌ Restoration cancelled')
    process.exit(0)
  }

  console.log(`🔄 Restoring database from: ${selectedBackup}`)

  try {
    // Set password environment variable for psql
    const env = { ...process.env, PGPASSWORD: password }
    
    // Drop and recreate database
    console.log('🗑️  Dropping existing database...')
    await execAsync(
      `dropdb -h ${host} -p ${port} -U ${username} ${dbName} --if-exists`,
      { env }
    )

    console.log('🆕 Creating new database...')
    await execAsync(
      `createdb -h ${host} -p ${port} -U ${username} ${dbName}`,
      { env }
    )

    // Restore from backup
    console.log('📥 Restoring data...')
    await execAsync(
      `psql -h ${host} -p ${port} -U ${username} -d ${dbName} -f "${backupFile}"`,
      { env }
    )

    console.log('✅ Database restored successfully!')
    console.log('🔄 You may need to run: npm run generate')

  } catch (error) {
    console.error('❌ Restoration failed:', error)
    process.exit(1)
  }
}

main()