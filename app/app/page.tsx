import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { DashboardClient } from '@/components/dashboard/dashboard-client'

export default async function Home() {
  const session = await getServerSession()

  if (!session) {
    redirect('/auth/signin')
  }

  return <DashboardClient />
}