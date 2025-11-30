'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Play,
  Pause,
  RotateCcw,
  Settings,
  Clock,
  Trophy,
  Flame,
  TrendingUp,
  Target,
  Coffee,
  Brain,
  BarChart3,
  Medal,
  Home,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/contexts/auth-context'

interface LeaderboardEntry {
  rank: number
  name: string
  avatar: string
  score: number
  streak: number
}

const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Alex Johnson', avatar: '👨‍💻', score: 2450, streak: 15 },
  { rank: 2, name: 'Sarah Chen', avatar: '👩‍🔬', score: 2380, streak: 12 },
  { rank: 3, name: 'Mike Wilson', avatar: '👨‍🎓', score: 2250, streak: 10 },
  { rank: 4, name: 'Emily Brown', avatar: '👩‍💻', score: 2100, streak: 8 },
  { rank: 5, name: 'David Kim', avatar: '👨‍🏫', score: 1950, streak: 7 },
]

const weeklyData = [
  { day: 'Mon', minutes: 120 },
  { day: 'Tue', minutes: 90 },
  { day: 'Wed', minutes: 150 },
  { day: 'Thu', minutes: 80 },
  { day: 'Fri', minutes: 110 },
  { day: 'Sat', minutes: 60 },
  { day: 'Sun', minutes: 45 },
]

type TimerMode = 'focus' | 'short-break' | 'long-break'

const timerModes: Record<TimerMode, { label: string; duration: number; color: string }> = {
  focus: { label: 'Focus', duration: 25 * 60, color: 'from-blue-500 to-purple-500' },
  'short-break': { label: 'Short Break', duration: 5 * 60, color: 'from-green-500 to-emerald-500' },
  'long-break': { label: 'Long Break', duration: 15 * 60, color: 'from-orange-500 to-red-500' },
}

export default function FocusPage() {
  const [mode, setMode] = useState<TimerMode>('focus')
  const [timeLeft, setTimeLeft] = useState(timerModes.focus.duration)
  const [isRunning, setIsRunning] = useState(false)
  const [sessionsCompleted, setSessionsCompleted] = useState(0)
  const [totalFocusTime, setTotalFocusTime] = useState(165) // in minutes
  const { user } = useAuth()

  const progress = ((timerModes[mode].duration - timeLeft) / timerModes[mode].duration) * 100

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleModeChange = (newMode: TimerMode) => {
    setMode(newMode)
    setTimeLeft(timerModes[newMode].duration)
    setIsRunning(false)
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setTimeLeft(timerModes[mode].duration)
    setIsRunning(false)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
      if (mode === 'focus') {
        setSessionsCompleted((prev) => prev + 1)
        setTotalFocusTime((prev) => prev + timerModes.focus.duration / 60)
      }
      // Play notification sound
      new Audio('/notification.mp3').play().catch(() => {})
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, mode])

  const maxMinutes = Math.max(...weeklyData.map((d) => d.minutes))

  return (
    <div className="space-y-6">
      {/* Home Button */}
      <Link href="/dashboard">
        <Button variant="ghost" className="gap-2">
          <Home className="w-4 h-4" />
          Dashboard Home
        </Button>
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold flex items-center">
          <Brain className="w-8 h-8 mr-3 text-primary" />
          Focus Mode
        </h1>
        <p className="text-muted-foreground mt-1">
          Stay focused and boost your productivity
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Timer Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardContent className="p-8">
              {/* Mode Tabs */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex bg-muted rounded-lg p-1">
                  {(Object.keys(timerModes) as TimerMode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => handleModeChange(m)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        mode === m
                          ? 'bg-background shadow text-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {timerModes[m].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timer Display */}
              <div className="flex flex-col items-center">
                <div className="relative w-64 h-64 mb-8">
                  {/* Background Circle */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="128"
                      cy="128"
                      r="120"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-muted"
                    />
                    {/* Progress Circle */}
                    <circle
                      cx="128"
                      cy="128"
                      r="120"
                      fill="none"
                      stroke="url(#focusGradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${progress * 7.54} 754`}
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="focusGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {/* Timer Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-6xl font-bold font-mono">{formatTime(timeLeft)}</span>
                    <span className="text-muted-foreground mt-2">{timerModes[mode].label}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="icon" onClick={resetTimer}>
                    <RotateCcw className="w-5 h-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="gradient"
                    className="w-32 h-12"
                    onClick={toggleTimer}
                  >
                    {isRunning ? (
                      <>
                        <Pause className="w-5 h-5 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Start
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="icon">
                    <Settings className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Session Info */}
              <div className="mt-8 flex justify-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold">{sessionsCompleted}</div>
                  <div className="text-sm text-muted-foreground">Sessions Today</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{totalFocusTime}m</div>
                  <div className="text-sm text-muted-foreground">Focus Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold flex items-center justify-center">
                    <Flame className="w-6 h-6 text-orange-500 mr-1" />
                    {user?.streak || 7}
                  </div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Productivity Score */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Target className="w-5 h-5 mr-2 text-primary" />
                Productivity Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-4">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="42"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-muted"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="42"
                      fill="none"
                      stroke="url(#scoreGradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${(user?.productivityScore || 85) * 2.64} 264`}
                    />
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{user?.productivityScore || 85}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                +5% from last week
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Today's Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-blue-500" />
                  <span className="text-sm">Focus Time</span>
                </div>
                <span className="font-medium">{totalFocusTime}m</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Coffee className="w-4 h-4 mr-2 text-orange-500" />
                  <span className="text-sm">Breaks</span>
                </div>
                <span className="font-medium">{Math.floor(sessionsCompleted / 2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Target className="w-4 h-4 mr-2 text-green-500" />
                  <span className="text-sm">Daily Goal</span>
                </div>
                <span className="font-medium">
                  {Math.min(100, Math.round((totalFocusTime / 120) * 100))}%
                </span>
              </div>
              <Progress value={Math.min(100, (totalFocusTime / 120) * 100)} className="h-2" />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Weekly Analytics & Leaderboard */}
      <Tabs defaultValue="analytics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="analytics" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Weekly Analytics
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="gap-2">
            <Trophy className="w-4 h-4" />
            Leaderboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Weekly Focus Time</CardTitle>
                <CardDescription>Your focus session history this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between h-64 px-4">
                  {weeklyData.map((day, index) => (
                    <div key={day.day} className="flex flex-col items-center space-y-2">
                      <div
                        className="w-12 rounded-t-lg bg-gradient-to-t from-blue-500 to-purple-500 transition-all duration-500"
                        style={{ height: `${(day.minutes / maxMinutes) * 180}px` }}
                      />
                      <span className="text-sm text-muted-foreground">{day.day}</span>
                      <span className="text-xs font-medium">{day.minutes}m</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between text-sm">
                  <div>
                    <span className="text-muted-foreground">Total: </span>
                    <span className="font-medium">
                      {weeklyData.reduce((acc, d) => acc + d.minutes, 0)} minutes
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Average: </span>
                    <span className="font-medium">
                      {Math.round(weeklyData.reduce((acc, d) => acc + d.minutes, 0) / 7)} min/day
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="leaderboard">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                  Top Performers
                </CardTitle>
                <CardDescription>Students with the highest productivity scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((entry, index) => (
                    <div
                      key={entry.rank}
                      className={`flex items-center space-x-4 p-4 rounded-xl ${
                        entry.name === user?.name ? 'bg-primary/10' : 'bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center justify-center w-8">
                        {entry.rank <= 3 ? (
                          <Medal
                            className={`w-6 h-6 ${
                              entry.rank === 1
                                ? 'text-yellow-500'
                                : entry.rank === 2
                                ? 'text-gray-400'
                                : 'text-orange-400'
                            }`}
                          />
                        ) : (
                          <span className="text-muted-foreground font-medium">#{entry.rank}</span>
                        )}
                      </div>
                      <div className="text-2xl">{entry.avatar}</div>
                      <div className="flex-1">
                        <div className="font-medium">{entry.name}</div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Flame className="w-3 h-3 mr-1 text-orange-500" />
                          {entry.streak} day streak
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{entry.score}</div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
