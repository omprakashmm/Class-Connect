import { NextRequest, NextResponse } from 'next/server'

interface Task {
  id: string
  title: string
  description?: string
  status: 'todo' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  category: string
  dueDate: string
  createdAt: string
  updatedAt: string
}

// In-memory storage for demo (use database in production)
let tasks: Task[] = [
  {
    id: '1',
    title: 'Complete CS Assignment',
    description: 'Finish the data structures assignment',
    status: 'in-progress',
    priority: 'high',
    category: 'homework',
    dueDate: '2024-12-20',
    createdAt: '2024-12-15T10:00:00Z',
    updatedAt: '2024-12-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Study for Finals',
    description: 'Review chapters 1-10 for the final exam',
    status: 'todo',
    priority: 'high',
    category: 'exam',
    dueDate: '2024-12-22',
    createdAt: '2024-12-14T10:00:00Z',
    updatedAt: '2024-12-14T10:00:00Z',
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const priority = searchParams.get('priority')
  const category = searchParams.get('category')

  let filteredTasks = [...tasks]

  if (status && status !== 'all') {
    filteredTasks = filteredTasks.filter((t) => t.status === status)
  }
  if (priority && priority !== 'all') {
    filteredTasks = filteredTasks.filter((t) => t.priority === priority)
  }
  if (category && category !== 'all') {
    filteredTasks = filteredTasks.filter((t) => t.category === category)
  }

  return NextResponse.json({
    success: true,
    tasks: filteredTasks,
    total: filteredTasks.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, priority, category, dueDate } = body

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description: description || '',
      status: 'todo',
      priority: priority || 'medium',
      category: category || 'general',
      dueDate: dueDate || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    tasks.push(newTask)

    return NextResponse.json({
      success: true,
      task: newTask,
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Task ID is required' },
        { status: 400 }
      )
    }

    const taskIndex = tasks.findIndex((t) => t.id === id)
    if (taskIndex === -1) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      )
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      task: tasks[taskIndex],
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update task' },
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
        { error: 'Task ID is required' },
        { status: 400 }
      )
    }

    const taskIndex = tasks.findIndex((t) => t.id === id)
    if (taskIndex === -1) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      )
    }

    tasks.splice(taskIndex, 1)

    return NextResponse.json({
      success: true,
      message: 'Task deleted successfully',
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    )
  }
}
