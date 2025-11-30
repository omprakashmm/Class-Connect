// Type definitions for ClassConnect

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  university?: string
  major?: string
  year?: string
  streak?: number
  productivityScore?: number
  createdAt?: string
}

export interface Task {
  id: string
  title: string
  description?: string
  status: 'todo' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  category: string
  dueDate: string
  createdAt: string
  updatedAt: string
  userId?: string
}

export interface Group {
  id: string
  name: string
  description: string
  icon: string
  category: string
  isPrivate: boolean
  memberCount: number
  members: GroupMember[]
  lastActive: string
  unreadMessages: number
  ownerId?: string
  createdAt?: string
}

export interface GroupMember {
  id: string
  name: string
  avatar?: string
  role: 'admin' | 'moderator' | 'member'
  status: 'online' | 'offline' | 'away'
  joinedAt?: string
}

export interface Message {
  id: string
  senderId: string
  content: string
  timestamp: Date
  status: 'sent' | 'delivered' | 'read'
  attachments?: Attachment[]
}

export interface Attachment {
  id: string
  name: string
  type: string
  url: string
  size: number
}

export interface Chat {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  timestamp: string
  unread: number
  status: 'online' | 'offline' | 'typing'
  isGroup: boolean
  messages: Message[]
  participants?: string[]
}

export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  thumbnail: string
  rating: number
  reviews: number
  students: number
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  category: string
  price: number | 'Free'
  progress?: number
  tags: string[]
  isBookmarked: boolean
  syllabus?: CourseSyllabus[]
}

export interface CourseSyllabus {
  id: string
  title: string
  duration: string
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  duration: string
  type: 'video' | 'article' | 'quiz'
  isCompleted: boolean
}

export interface Job {
  id: string
  title: string
  company: string
  companyLogo: string
  location: string
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract' | 'Remote'
  salary: string
  posted: string
  description: string
  requirements: string[]
  skills: string[]
  applicants: number
  isBookmarked: boolean
  isEasyApply: boolean
  matchScore?: number
}

export interface ResumeSection {
  id: string
  type: 'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications'
  title: string
  isExpanded: boolean
  data: Record<string, unknown>
}

export interface FocusSession {
  id: string
  userId: string
  duration: number
  mode: 'focus' | 'short-break' | 'long-break'
  completedAt: string
}

export interface Tool {
  id: string
  name: string
  description: string
  url: string
  icon: string
  category: string
  isFavorite: boolean
  isNew?: boolean
  isPremium?: boolean
}

export interface LeaderboardEntry {
  rank: number
  name: string
  avatar: string
  score: number
  streak: number
  userId?: string
}

export interface Notification {
  id: string
  type: 'task' | 'message' | 'group' | 'course' | 'job' | 'system'
  title: string
  message: string
  isRead: boolean
  createdAt: string
  link?: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
