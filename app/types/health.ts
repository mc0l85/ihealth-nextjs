export interface HealthMetrics {
  steps: number
  calories: number
  distance: number
  heartRate: number
  sleep: number
  weight?: number
}

export interface WorkoutData {
  id: string
  type: string
  duration: number
  calories: number
  date: string
  distance?: number
  averageHeartRate?: number
}

export interface SleepData {
  id: string
  date: string
  totalSleep: number
  deepSleep: number
  lightSleep: number
  remSleep: number
  sleepScore: number
  sleepEfficiency: number
}

export interface HealthRecord {
  id: string
  date: string
  steps?: number
  calories?: number
  distance?: number
  heartRate?: number
  weight?: number
  source: string
}

export interface DashboardData {
  todayMetrics: HealthMetrics
  weeklyAverage: HealthMetrics
  recentWorkouts: WorkoutData[]
  sleepData: SleepData[]
  healthRecords: HealthRecord[]
}