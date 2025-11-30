// Constants and configuration for ClassConnect

export const APP_NAME = 'ClassConnect'
export const APP_DESCRIPTION = 'Cloud AI Powered Academic Productivity & Collaboration Platform'

export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  DASHBOARD: '/dashboard',
  TOOLS: '/dashboard/tools',
  AI_CHAT: '/dashboard/ai-chat',
  TASKS: '/dashboard/tasks',
  FOCUS: '/dashboard/focus',
  GROUPS: '/dashboard/groups',
  CHAT: '/dashboard/chat',
  RESUME: '/dashboard/resume',
  COURSES: '/dashboard/courses',
  JOBS: '/dashboard/jobs',
  SETTINGS: '/dashboard/settings',
} as const

export const TASK_STATUSES = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
] as const

export const TASK_PRIORITIES = [
  { value: 'low', label: 'Low', color: 'bg-green-500' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
  { value: 'high', label: 'High', color: 'bg-red-500' },
] as const

export const TASK_CATEGORIES = [
  { value: 'homework', label: 'Homework' },
  { value: 'project', label: 'Project' },
  { value: 'exam', label: 'Exam' },
  { value: 'reading', label: 'Reading' },
  { value: 'research', label: 'Research' },
  { value: 'meeting', label: 'Meeting' },
  { value: 'personal', label: 'Personal' },
] as const

export const AI_MODELS = [
  { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', icon: '🧠' },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5', provider: 'OpenAI', icon: '⚡' },
  { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google', icon: '💎' },
  { id: 'claude-3', name: 'Claude 3', provider: 'Anthropic', icon: '🤖' },
  { id: 'run-anywhere', name: 'RunAnywhere', provider: 'Custom', icon: '🚀' },
] as const

export const FOCUS_MODES = {
  focus: { label: 'Focus', duration: 25 * 60, color: 'blue' },
  'short-break': { label: 'Short Break', duration: 5 * 60, color: 'green' },
  'long-break': { label: 'Long Break', duration: 15 * 60, color: 'orange' },
} as const

export const GROUP_CATEGORIES = [
  { id: 'all', name: 'All Groups' },
  { id: 'study', name: 'Study Groups' },
  { id: 'project', name: 'Project Teams' },
  { id: 'club', name: 'Clubs' },
  { id: 'research', name: 'Research' },
] as const

export const COURSE_CATEGORIES = [
  { id: 'all', name: 'All Courses' },
  { id: 'programming', name: 'Programming' },
  { id: 'data-science', name: 'Data Science' },
  { id: 'ai-ml', name: 'AI & ML' },
  { id: 'web-dev', name: 'Web Development' },
  { id: 'design', name: 'Design' },
] as const

export const COURSE_LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
] as const

export const JOB_TYPES = [
  'All Types',
  'Full-time',
  'Part-time',
  'Internship',
  'Contract',
  'Remote',
] as const

export const THEMES = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
] as const

export const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
  { value: 'zh', label: '中文' },
] as const

// Tool categories for the Tools Hub
export const TOOL_CATEGORIES = [
  { id: 'all', name: 'All Tools' },
  { id: 'ai', name: 'AI & Language' },
  { id: 'coding', name: 'Coding & IDE' },
  { id: 'ece', name: 'ECE & VLSI' },
  { id: 'cloud', name: 'Cloud & DevOps' },
] as const

// Social links
export const SOCIAL_LINKS = {
  github: 'https://github.com/classconnect',
  twitter: 'https://twitter.com/classconnect',
  linkedin: 'https://linkedin.com/company/classconnect',
  discord: 'https://discord.gg/classconnect',
} as const

// Feature flags
export const FEATURES = {
  enableAIChat: true,
  enableRealTimeChat: true,
  enableVideoCall: false,
  enablePremiumTools: false,
  enableJobMatching: true,
  enableCourseRecommendations: true,
} as const
