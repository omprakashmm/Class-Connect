'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'student' | 'teacher' | 'admin'
  streak: number
  badges: string[]
  productivityScore: number
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (data: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo user for testing
const DEMO_USER: User = {
  id: '1',
  email: 'student@classconnect.com',
  name: 'Alex Johnson',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  role: 'student',
  streak: 7,
  badges: ['Early Adopter', 'Task Master', 'Focus Champion'],
  productivityScore: 85,
  createdAt: '2024-01-15T00:00:00.000Z',
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth on mount
    const stored = localStorage.getItem('classconnect_user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem('classconnect_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // For demo, accept any credentials
    const loggedInUser = { ...DEMO_USER, email }
    setUser(loggedInUser)
    localStorage.setItem('classconnect_user', JSON.stringify(loggedInUser))
    setIsLoading(false)
  }, [])

  const loginWithGoogle = useCallback(async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setUser(DEMO_USER)
    localStorage.setItem('classconnect_user', JSON.stringify(DEMO_USER))
    setIsLoading(false)
  }, [])

  const register = useCallback(async (name: string, email: string, password: string) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newUser: User = {
      ...DEMO_USER,
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      streak: 0,
      badges: ['Early Adopter'],
      productivityScore: 0,
      createdAt: new Date().toISOString(),
    }
    
    setUser(newUser)
    localStorage.setItem('classconnect_user', JSON.stringify(newUser))
    setIsLoading(false)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('classconnect_user')
  }, [])

  const updateUser = useCallback((data: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null
      const updated = { ...prev, ...data }
      localStorage.setItem('classconnect_user', JSON.stringify(updated))
      return updated
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
