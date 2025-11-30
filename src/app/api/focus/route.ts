import { NextRequest, NextResponse } from 'next/server'

interface FocusSession {
  id: string
  userId: string
  duration: number // in seconds
  mode: 'focus' | 'short-break' | 'long-break'
  completedAt: string
}

let sessions: FocusSession[] = []
let userStats: Record<string, { totalMinutes: number; streak: number; score: number }> = {
  '1': { totalMinutes: 165, streak: 7, score: 85 },
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId') || '1'
  const period = searchParams.get('period') || 'week'

  const stats = userStats[userId] || { totalMinutes: 0, streak: 0, score: 0 }

  // Generate weekly data
  const weeklyData = [
    { day: 'Mon', minutes: 120 },
    { day: 'Tue', minutes: 90 },
    { day: 'Wed', minutes: 150 },
    { day: 'Thu', minutes: 80 },
    { day: 'Fri', minutes: 110 },
    { day: 'Sat', minutes: 60 },
    { day: 'Sun', minutes: 45 },
  ]

  return NextResponse.json({
    success: true,
    stats,
    weeklyData,
    sessions: sessions.filter((s) => s.userId === userId),
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, duration, mode } = body

    if (!duration || !mode) {
      return NextResponse.json(
        { error: 'Duration and mode are required' },
        { status: 400 }
      )
    }

    const session: FocusSession = {
      id: Date.now().toString(),
      userId: userId || '1',
      duration,
      mode,
      completedAt: new Date().toISOString(),
    }

    sessions.push(session)

    // Update user stats
    const uid = userId || '1'
    if (!userStats[uid]) {
      userStats[uid] = { totalMinutes: 0, streak: 0, score: 0 }
    }
    
    if (mode === 'focus') {
      userStats[uid].totalMinutes += Math.floor(duration / 60)
      userStats[uid].score = Math.min(100, userStats[uid].score + 1)
    }

    return NextResponse.json({
      success: true,
      session,
      updatedStats: userStats[uid],
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save session' },
      { status: 500 }
    )
  }
}
