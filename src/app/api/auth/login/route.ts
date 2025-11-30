import { NextRequest, NextResponse } from 'next/server'

// Demo user database
const users: Record<string, { id: string; email: string; password: string; name: string }> = {
  'demo@classconnect.edu': {
    id: '1',
    email: 'demo@classconnect.edu',
    password: 'demo123', // In production, use hashed passwords
    name: 'Demo User',
  },
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const user = users[email]
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // In production, generate a proper JWT token
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64')

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}
