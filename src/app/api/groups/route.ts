import { NextRequest, NextResponse } from 'next/server'

interface Group {
  id: string
  name: string
  description: string
  category: string
  isPrivate: boolean
  memberCount: number
  createdAt: string
  ownerId: string
}

let groups: Group[] = [
  {
    id: '1',
    name: 'CS101 Study Group',
    description: 'Collaborative learning for Computer Science fundamentals',
    category: 'study',
    isPrivate: false,
    memberCount: 24,
    createdAt: '2024-12-01T10:00:00Z',
    ownerId: '1',
  },
  {
    id: '2',
    name: 'AI Research Lab',
    description: 'Exploring machine learning and deep learning concepts',
    category: 'research',
    isPrivate: true,
    memberCount: 12,
    createdAt: '2024-12-05T10:00:00Z',
    ownerId: '2',
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  let filteredGroups = [...groups]

  if (category && category !== 'all') {
    filteredGroups = filteredGroups.filter((g) => g.category === category)
  }

  return NextResponse.json({
    success: true,
    groups: filteredGroups,
    total: filteredGroups.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, category, isPrivate, userId } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Group name is required' },
        { status: 400 }
      )
    }

    const newGroup: Group = {
      id: Date.now().toString(),
      name,
      description: description || '',
      category: category || 'general',
      isPrivate: isPrivate || false,
      memberCount: 1,
      createdAt: new Date().toISOString(),
      ownerId: userId || '1',
    }

    groups.push(newGroup)

    return NextResponse.json({
      success: true,
      group: newGroup,
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create group' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Group ID is required' },
        { status: 400 }
      )
    }

    const groupIndex = groups.findIndex((g) => g.id === id)
    if (groupIndex === -1) {
      return NextResponse.json(
        { error: 'Group not found' },
        { status: 404 }
      )
    }

    groups.splice(groupIndex, 1)

    return NextResponse.json({
      success: true,
      message: 'Group deleted successfully',
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete group' },
      { status: 500 }
    )
  }
}
