'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  anonymousId: string
  isVerified: boolean
  karma: number
  displayName?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  sendVerificationCode: (phoneNumber: string, alaskaZipCode?: string) => Promise<{ userId: string; isAlaskaNumber: boolean }>
  verifyCode: (userId: string, code: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('forty9_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const sendVerificationCode = async (phoneNumber: string, alaskaZipCode?: string) => {
    const response = await fetch('/api/auth/send-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, alaskaZipCode }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to send verification code')
    }

    return { userId: data.userId, isAlaskaNumber: data.isAlaskaNumber }
  }

  const verifyCode = async (userId: string, code: string) => {
    const response = await fetch('/api/auth/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, verificationCode: code }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to verify code')
    }

    setUser(data.user)
    localStorage.setItem('forty9_user', JSON.stringify(data.user))
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('forty9_user')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, sendVerificationCode, verifyCode, signOut }}>
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
