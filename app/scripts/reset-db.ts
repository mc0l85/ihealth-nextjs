import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🗑️  Resetting database...')

  // Delete all data in reverse order of dependencies
  await prisma.chatMessage.deleteMany()
  await prisma.chatConversation.deleteMany()
  await prisma.ouraData.deleteMany()
  await prisma.activityData.deleteMany()
  await prisma.sleepData.deleteMany()
  await prisma.workout.deleteMany()
  await prisma.healthRecord.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.verificationToken.deleteMany()
  await prisma.user.deleteMany()

  console.log('✅ Database reset completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error during reset:', e)
    await prisma.$disconnect()
    process.exit(1)
  })