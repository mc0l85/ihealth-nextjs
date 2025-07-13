import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create demo users
  const hashedPassword = await bcrypt.hash('demo123', 12)
  
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@ihealth.com' },
    update: {},
    create: {
      email: 'demo@ihealth.com',
      name: 'Demo User',
      password: hashedPassword,
      dateOfBirth: new Date('1990-01-15'),
      height: 175, // cm
      weight: 70, // kg
      activityLevel: 'moderately_active',
      healthGoals: ['weight_loss', 'better_sleep', 'fitness_improvement'],
    },
  })

  console.log('✅ Created demo user:', demoUser.email)

  // Create sample health records for the demo user
  const healthRecords = []
  const today = new Date()
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    const record = await prisma.healthRecord.create({
      data: {
        userId: demoUser.id,
        date: date,
        steps: Math.floor(Math.random() * 5000) + 5000, // 5000-10000 steps
        calories: Math.floor(Math.random() * 500) + 1800, // 1800-2300 calories
        distance: Math.round((Math.random() * 3 + 2) * 100) / 100, // 2-5 km
        heartRate: Math.floor(Math.random() * 20) + 70, // 70-90 BPM
        weight: Math.round((70 + (Math.random() - 0.5) * 4) * 10) / 10, // 68-72 kg
        bloodPressureSystolic: Math.floor(Math.random() * 20) + 110, // 110-130
        bloodPressureDiastolic: Math.floor(Math.random() * 15) + 70, // 70-85
        restingHeartRate: Math.floor(Math.random() * 15) + 55, // 55-70 BPM
        bodyFatPercentage: Math.round((15 + Math.random() * 5) * 10) / 10, // 15-20%
        bmi: Math.round((70 / (1.75 * 1.75)) * 10) / 10, // Calculate BMI
        source: 'manual',
      },
    })
    healthRecords.push(record)
  }

  console.log(`✅ Created ${healthRecords.length} health records`)

  // Create sample workouts
  const workoutTypes = ['running', 'cycling', 'swimming', 'strength_training', 'yoga', 'walking']
  const workouts = []
  
  for (let i = 20; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    // Not every day has a workout
    if (Math.random() > 0.3) {
      const workoutType = workoutTypes[Math.floor(Math.random() * workoutTypes.length)]
      const duration = Math.floor(Math.random() * 60) + 30 // 30-90 minutes
      
      const workout = await prisma.workout.create({
        data: {
          userId: demoUser.id,
          date: date,
          type: workoutType,
          duration: duration,
          calories: Math.floor(duration * (3 + Math.random() * 7)), // 3-10 cal/min
          distance: workoutType === 'running' || workoutType === 'cycling' 
            ? Math.round((duration * 0.1 + Math.random() * 5) * 100) / 100 
            : null,
          averageHeartRate: Math.floor(Math.random() * 40) + 120, // 120-160 BPM
          maxHeartRate: Math.floor(Math.random() * 30) + 160, // 160-190 BPM
          notes: `Great ${workoutType} session!`,
          source: 'manual',
        },
      })
      workouts.push(workout)
    }
  }

  console.log(`✅ Created ${workouts.length} workout records`)

  // Create sample sleep data
  const sleepRecords = []
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    const bedtime = new Date(date)
    bedtime.setHours(22 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 60)) // 22:00-23:59
    
    const sleepStart = new Date(bedtime)
    sleepStart.setMinutes(sleepStart.getMinutes() + Math.floor(Math.random() * 30)) // 0-30 min to fall asleep
    
    const totalSleepMinutes = Math.floor(Math.random() * 120) + 360 // 6-8 hours
    const sleepEnd = new Date(sleepStart)
    sleepEnd.setMinutes(sleepEnd.getMinutes() + totalSleepMinutes)
    
    const wakeTime = new Date(sleepEnd)
    wakeTime.setMinutes(wakeTime.getMinutes() + Math.floor(Math.random() * 30)) // 0-30 min after sleep ends
    
    const deepSleep = Math.floor(totalSleepMinutes * (0.15 + Math.random() * 0.1)) // 15-25%
    const remSleep = Math.floor(totalSleepMinutes * (0.20 + Math.random() * 0.1)) // 20-30%
    const lightSleep = totalSleepMinutes - deepSleep - remSleep - 20 // Rest is light sleep minus some awake time
    const awakeTime = 20 + Math.floor(Math.random() * 20) // 20-40 minutes awake
    
    const sleepRecord = await prisma.sleepData.create({
      data: {
        userId: demoUser.id,
        date: date,
        bedtime: bedtime,
        sleepStart: sleepStart,
        sleepEnd: sleepEnd,
        wakeTime: wakeTime,
        totalSleep: totalSleepMinutes,
        deepSleep: deepSleep,
        lightSleep: lightSleep,
        remSleep: remSleep,
        awakeTime: awakeTime,
        sleepEfficiency: Math.round((totalSleepMinutes / (totalSleepMinutes + awakeTime)) * 100),
        sleepScore: Math.floor(Math.random() * 30) + 70, // 70-100
        restfulness: Math.round((0.7 + Math.random() * 0.3) * 100) / 100, // 0.7-1.0
        source: 'manual',
      },
    })
    sleepRecords.push(sleepRecord)
  }

  console.log(`✅ Created ${sleepRecords.length} sleep records`)

  // Create sample activity data
  const activityRecords = []
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    const steps = Math.floor(Math.random() * 5000) + 5000 // 5000-10000 steps
    const activeMinutes = Math.floor(Math.random() * 60) + 30 // 30-90 active minutes
    
    const activityRecord = await prisma.activityData.create({
      data: {
        userId: demoUser.id,
        date: date,
        steps: steps,
        calories: Math.floor(steps * 0.04 + Math.random() * 200) + 1800, // Rough calculation
        activeCalories: Math.floor(activeMinutes * 8 + Math.random() * 100), // ~8 cal/min active
        distance: Math.round((steps * 0.0008) * 100) / 100, // Rough step to km conversion
        floors: Math.floor(Math.random() * 20) + 5, // 5-25 floors
        activeMinutes: activeMinutes,
        sedentaryMinutes: 1440 - activeMinutes - 480, // Total minutes - active - sleep
        averageHeartRate: Math.floor(Math.random() * 20) + 70, // 70-90 BPM
        maxHeartRate: Math.floor(Math.random() * 40) + 140, // 140-180 BPM
        minHeartRate: Math.floor(Math.random() * 15) + 50, // 50-65 BPM
        activityScore: Math.floor(Math.random() * 30) + 70, // 70-100
        source: 'manual',
      },
    })
    activityRecords.push(activityRecord)
  }

  console.log(`✅ Created ${activityRecords.length} activity records`)

  // Create a sample chat conversation
  const conversation = await prisma.chatConversation.create({
    data: {
      userId: demoUser.id,
      title: 'Health Goals Discussion',
    },
  })

  await prisma.chatMessage.createMany({
    data: [
      {
        conversationId: conversation.id,
        role: 'user',
        content: 'Hi! I want to improve my overall health. Can you help me analyze my data?',
      },
      {
        conversationId: conversation.id,
        role: 'assistant',
        content: 'Hello! I\'d be happy to help you improve your health. Based on your recent data, I can see you\'re averaging about 7,500 steps per day and getting around 7 hours of sleep. Your workout consistency is good with about 4-5 sessions per week. Would you like me to focus on any specific area like sleep optimization, workout planning, or nutrition?',
      },
      {
        conversationId: conversation.id,
        role: 'user',
        content: 'I\'d like to focus on improving my sleep quality. I notice I sometimes feel tired even after 7-8 hours of sleep.',
      },
      {
        conversationId: conversation.id,
        role: 'assistant',
        content: 'Great question! Looking at your sleep data, I notice a few patterns that might help explain this. Your sleep efficiency is averaging around 85%, which is good, but there\'s room for improvement. I also see that your bedtime varies quite a bit - sometimes you\'re going to bed at 10 PM, other times closer to midnight. Consistency in your sleep schedule can significantly impact sleep quality. Would you like me to suggest a personalized sleep optimization plan?',
      },
    ],
  })

  console.log('✅ Created sample chat conversation')

  console.log('🎉 Database seeding completed successfully!')
  console.log('\n📊 Summary:')
  console.log(`- Users: 1`)
  console.log(`- Health Records: ${healthRecords.length}`)
  console.log(`- Workouts: ${workouts.length}`)
  console.log(`- Sleep Records: ${sleepRecords.length}`)
  console.log(`- Activity Records: ${activityRecords.length}`)
  console.log(`- Chat Conversations: 1`)
  console.log('\n🔐 Demo Login:')
  console.log(`Email: demo@ihealth.com`)
  console.log(`Password: demo123`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error during seeding:', e)
    await prisma.$disconnect()
    process.exit(1)
  })