'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  AlertCircle,
  MoreVertical,
  Edit,
  Trash2,
  Flag,
  Tag,
  Bot,
  Home,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'in-progress' | 'completed'
  category: string
  progress: number
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Complete Data Structures Assignment',
    description: 'Implement binary search tree with all operations',
    dueDate: '2024-12-01',
    priority: 'high',
    status: 'in-progress',
    category: 'Computer Science',
    progress: 75,
  },
  {
    id: '2',
    title: 'Read Chapter 5 - Algorithms',
    description: 'Study divide and conquer algorithms',
    dueDate: '2024-12-02',
    priority: 'medium',
    status: 'pending',
    category: 'Computer Science',
    progress: 30,
  },
  {
    id: '3',
    title: 'Physics Lab Report',
    description: 'Write lab report for electromagnetic waves experiment',
    dueDate: '2024-12-05',
    priority: 'high',
    status: 'pending',
    category: 'Physics',
    progress: 0,
  },
  {
    id: '4',
    title: 'Math Problem Set 7',
    description: 'Complete all problems from chapter 7',
    dueDate: '2024-12-03',
    priority: 'low',
    status: 'completed',
    category: 'Mathematics',
    progress: 100,
  },
  {
    id: '5',
    title: 'Prepare Presentation Slides',
    description: 'Create slides for project presentation',
    dueDate: '2024-12-10',
    priority: 'medium',
    status: 'pending',
    category: 'Project',
    progress: 10,
  },
]

const categories = ['All', 'Computer Science', 'Mathematics', 'Physics', 'Project']

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [search, setSearch] = useState('')
  const [filterPriority, setFilterPriority] = useState<string>('all')
  const [filterCategory, setFilterCategory] = useState('All')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    category: 'Computer Science',
  })

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
                         task.description.toLowerCase().includes(search.toLowerCase())
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority
    const matchesCategory = filterCategory === 'All' || task.category === filterCategory
    return matchesSearch && matchesPriority && matchesCategory
  })

  const tasksByStatus = {
    pending: filteredTasks.filter(t => t.status === 'pending'),
    'in-progress': filteredTasks.filter(t => t.status === 'in-progress'),
    completed: filteredTasks.filter(t => t.status === 'completed'),
  }

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    overdue: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length,
  }

  const addTask = () => {
    if (!newTask.title) return
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title || '',
      description: newTask.description || '',
      dueDate: newTask.dueDate || new Date().toISOString().split('T')[0],
      priority: newTask.priority as 'low' | 'medium' | 'high',
      status: 'pending',
      category: newTask.category || 'Computer Science',
      progress: 0,
    }
    
    setTasks(prev => [task, ...prev])
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      category: 'Computer Science',
    })
    setIsAddDialogOpen(false)
  }

  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    setTasks(prev => prev.map(t => 
      t.id === taskId 
        ? { ...t, status, progress: status === 'completed' ? 100 : t.progress }
        : t
    ))
  }

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId))
  }

  return (
    <div className="space-y-6">
      {/* Home Button */}
      <Link href="/dashboard">
        <Button variant="ghost" className="gap-2">
          <Home className="w-4 h-4" />
          Dashboard Home
        </Button>
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground mt-1">
            Manage your assignments and tasks
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="gradient">
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogDescription>
                  Create a new task or assignment
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Task title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Task description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={newTask.priority}
                      onValueChange={(value) => setNewTask({ ...newTask, priority: value as Task['priority'] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newTask.category}
                    onValueChange={(value) => setNewTask({ ...newTask, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(c => c !== 'All').map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={addTask}>Add Task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stats.completed}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stats.inProgress}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stats.overdue}</p>
                <p className="text-sm text-muted-foreground">Overdue</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tasks..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-[180px]">
            <Flag className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[180px]">
            <Tag className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* Tasks List */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All ({filteredTasks.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({tasksByStatus.pending.length})</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress ({tasksByStatus['in-progress'].length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({tasksByStatus.completed.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <TaskList
            tasks={filteredTasks}
            onStatusChange={updateTaskStatus}
            onDelete={deleteTask}
          />
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <TaskList
            tasks={tasksByStatus.pending}
            onStatusChange={updateTaskStatus}
            onDelete={deleteTask}
          />
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          <TaskList
            tasks={tasksByStatus['in-progress']}
            onStatusChange={updateTaskStatus}
            onDelete={deleteTask}
          />
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <TaskList
            tasks={tasksByStatus.completed}
            onStatusChange={updateTaskStatus}
            onDelete={deleteTask}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function TaskList({
  tasks,
  onStatusChange,
  onDelete,
}: {
  tasks: Task[]
  onStatusChange: (id: string, status: Task['status']) => void
  onDelete: (id: string) => void
}) {
  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <CheckCircle2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No tasks found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <AnimatePresence>
      {tasks.map((task, index) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card className="card-hover">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <button
                  onClick={() => onStatusChange(
                    task.id,
                    task.status === 'completed' ? 'pending' : 'completed'
                  )}
                  className="mt-1"
                >
                  {task.status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                  )}
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className={`font-semibold ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </h3>
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
                    <Badge variant="outline">{task.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {task.progress}% complete
                    </span>
                  </div>
                  <div className="mt-2">
                    <Progress value={task.progress} className="h-2" />
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onStatusChange(task.id, 'in-progress')}>
                      <Clock className="w-4 h-4 mr-2" />
                      Mark In Progress
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onStatusChange(task.id, 'completed')}>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Mark Complete
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bot className="w-4 h-4 mr-2" />
                      Get AI Help
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => onDelete(task.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </AnimatePresence>
  )
}
