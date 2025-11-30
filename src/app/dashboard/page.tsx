'use client'

import { motion } from 'framer-motion'
import {
  Wrench,
  Bot,
  CheckSquare,
  Clock,
  Users,
  TrendingUp,
  Flame,
  Award,
  Calendar,
  ArrowUpRight,
  BookOpen,
  Target,
} from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/contexts/auth-context'

const quickStats = [
  {
    title: 'Tasks Due Today',
    value: '3',
    icon: CheckSquare,
    color: 'from-blue-500 to-cyan-500',
    href: '/dashboard/tasks',
  },
  {
    title: 'Focus Time',
    value: '2h 45m',
    icon: Clock,
    color: 'from-purple-500 to-pink-500',
    href: '/dashboard/focus',
  },
  {
    title: 'Active Groups',
    value: '4',
    icon: Users,
    color: 'from-orange-500 to-red-500',
    href: '/dashboard/groups',
  },
  {
    title: 'Streak',
    value: '7 days',
    icon: Flame,
    color: 'from-yellow-500 to-orange-500',
    href: '/dashboard/profile',
  },
]

const recentTasks = [
  { id: 1, title: 'Complete Data Structures Assignment', due: 'Today', priority: 'high', progress: 75 },
  { id: 2, title: 'Read Chapter 5 - Algorithms', due: 'Tomorrow', priority: 'medium', progress: 30 },
  { id: 3, title: 'Prepare Presentation Slides', due: 'In 3 days', priority: 'low', progress: 0 },
]

const upcomingDeadlines = [
  { title: 'CS301 Project Submission', date: 'Dec 5', course: 'Computer Science' },
  { title: 'Math Quiz', date: 'Dec 7', course: 'Mathematics' },
  { title: 'Physics Lab Report', date: 'Dec 10', course: 'Physics' },
]

const activeGroups = [
  {
    id: 1,
    name: 'CS101 Study Group',
    members: 5,
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop',
    online: 3,
  },
  {
    id: 2,
    name: 'Math Tutoring',
    members: 8,
    avatar: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=100&h=100&fit=crop',
    online: 2,
  },
]

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.name?.split(' ')[0] || 'Student'}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here&apos;s what&apos;s happening with your studies today.
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            View Schedule
          </Button>
          <Link href="/dashboard/ai-chat">
            <Button variant="gradient">
              <Bot className="w-4 h-4 mr-2" />
              Ask AI
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {quickStats.map((stat, index) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="card-hover cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Tasks Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Tasks</CardTitle>
                <CardDescription>Your active assignments and tasks</CardDescription>
              </div>
              <Link href="/dashboard/tasks">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center space-x-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium truncate">{task.title}</p>
                      <Badge
                        variant={
                          task.priority === 'high'
                            ? 'destructive'
                            : task.priority === 'medium'
                            ? 'warning'
                            : 'secondary'
                        }
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Due: {task.due}</p>
                    <div className="mt-2">
                      <Progress value={task.progress} className="h-2" />
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold">{task.progress}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Productivity Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-primary" />
                Productivity Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      className="text-muted"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="url(#gradient)"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${(user?.productivityScore || 85) * 3.52} 352`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">{user?.productivityScore || 85}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                +5% from last week
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-sm">{deadline.title}</p>
                    <p className="text-xs text-muted-foreground">{deadline.course}</p>
                  </div>
                  <Badge variant="outline">{deadline.date}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Active Groups */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Active Groups
              </CardTitle>
              <Link href="/dashboard/groups">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeGroups.map((group) => (
                <div key={group.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                  <Avatar>
                    <AvatarImage src={group.avatar} />
                    <AvatarFallback>{group.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{group.name}</p>
                    <p className="text-xs text-muted-foreground">{group.members} members</p>
                  </div>
                  <div className="flex items-center text-xs text-green-500">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                    {group.online} online
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used tools and features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/dashboard/tools">
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center space-y-2">
                  <Wrench className="w-6 h-6" />
                  <span>Tools Hub</span>
                </Button>
              </Link>
              <Link href="/dashboard/ai-chat">
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center space-y-2">
                  <Bot className="w-6 h-6" />
                  <span>AI Assistant</span>
                </Button>
              </Link>
              <Link href="/dashboard/focus">
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center space-y-2">
                  <Clock className="w-6 h-6" />
                  <span>Focus Mode</span>
                </Button>
              </Link>
              <Link href="/dashboard/courses">
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center space-y-2">
                  <BookOpen className="w-6 h-6" />
                  <span>Courses</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
