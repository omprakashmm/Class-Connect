import { NextRequest, NextResponse } from 'next/server'

// Demo user database (shared with login)
const users: Map<string, { id: string; email: string; password: string; name: string }> = new Map()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    if (users.has(email)) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      )
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password, // In production, hash the password
      name,
    }

    users.set(email, newUser)

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}
