'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  LayoutDashboard,
  Wrench,
  Bot,
  CheckSquare,
  Clock,
  Users,
  MessageSquare,
  FileText,
  BookOpen,
  Briefcase,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  Moon,
  Sun,
  Menu,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/contexts/auth-context'
import { useTheme } from 'next-themes'
import { getInitials } from '@/lib/utils'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Wrench, label: 'Tools Hub', href: '/dashboard/tools', badge: '30+' },
  { icon: Bot, label: 'AI Chat', href: '/dashboard/ai-chat' },
  { icon: CheckSquare, label: 'Tasks', href: '/dashboard/tasks' },
  { icon: Clock, label: 'Focus Mode', href: '/dashboard/focus' },
  { icon: Users, label: 'Groups', href: '/dashboard/groups' },
  { icon: MessageSquare, label: 'Chat', href: '/dashboard/chat' },
  { icon: FileText, label: 'Resume', href: '/dashboard/resume' },
  { icon: BookOpen, label: 'Courses', href: '/dashboard/courses' },
  { icon: Briefcase, label: 'Jobs', href: '/dashboard/jobs' },
]

const bottomNavItems = [
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 glass border-b h-16 px-4 flex items-center justify-between">
        <button onClick={() => setMobileOpen(true)} className="p-2">
          <Menu className="w-6 h-6" />
        </button>
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold">ClassConnect</span>
        </Link>
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>{user ? getInitials(user.name) : 'U'}</AvatarFallback>
        </Avatar>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: collapsed ? 80 : 280,
          x: mobileOpen ? 0 : -280,
        }}
        className={cn(
          'fixed left-0 top-0 z-50 h-screen bg-card border-r flex flex-col transition-all duration-300',
          'lg:translate-x-0'
        )}
        style={{
          width: collapsed ? 80 : 280,
        }}
      >
        {/* Logo */}
        <div className="h-16 px-4 flex items-center justify-between border-b">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold text-xl"
              >
                ClassConnect
              </motion.span>
            )}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-2 hover:bg-muted rounded-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <Badge variant={isActive ? 'secondary' : 'outline'} className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="p-3 border-t space-y-1">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>

        {/* User Card */}
        {!collapsed && user && (
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}
      </motion.aside>

      {/* Main Content */}
      <main
        className={cn(
          'min-h-screen transition-all duration-300 pt-16 lg:pt-0',
          collapsed ? 'lg:ml-20' : 'lg:ml-[280px]'
        )}
      >
        {/* Top Bar */}
        <header className="hidden lg:flex sticky top-0 z-40 h-16 glass border-b items-center justify-between px-6">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tools, tasks, courses..."
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium">New assignment due</span>
                    <span className="text-xs text-muted-foreground">Data Structures - Due tomorrow</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium">Study group invite</span>
                    <span className="text-xs text-muted-foreground">Alex invited you to join "CS101 Study"</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user ? getInitials(user.name) : 'U'}</AvatarFallback>
                  </Avatar>
                  {user && <span className="hidden md:inline">{user.name}</span>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/dashboard/profile" className="flex items-center w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard/settings" className="flex items-center w-full">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-6">{children}</div>
      </main>
    </div>
  )
}
