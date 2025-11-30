'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  Plus,
  Search,
  MessageSquare,
  FileText,
  Video,
  Calendar,
  Settings,
  MoreVertical,
  UserPlus,
  Lock,
  Globe,
  BookOpen,
  Code,
  Palette,
  Music,
  Camera,
  X,
  ChevronRight,
  Crown,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useAuth } from '@/contexts/auth-context'

interface Member {
  id: string
  name: string
  avatar?: string
  role: 'admin' | 'moderator' | 'member'
  status: 'online' | 'offline' | 'away'
}

interface Group {
  id: string
  name: string
  description: string
  icon: string
  category: string
  isPrivate: boolean
  memberCount: number
  members: Member[]
  lastActive: string
  unreadMessages: number
}

const categories = [
  { id: 'all', name: 'All Groups', icon: Users },
  { id: 'study', name: 'Study Groups', icon: BookOpen },
  { id: 'project', name: 'Project Teams', icon: Code },
  { id: 'club', name: 'Clubs', icon: Palette },
  { id: 'research', name: 'Research', icon: FileText },
]

const initialGroups: Group[] = [
  {
    id: '1',
    name: 'CS101 Study Group',
    description: 'Collaborative learning for Computer Science fundamentals',
    icon: '💻',
    category: 'study',
    isPrivate: false,
    memberCount: 24,
    members: [
      { id: '1', name: 'Alex Johnson', role: 'admin', status: 'online' },
      { id: '2', name: 'Sarah Chen', role: 'moderator', status: 'online' },
      { id: '3', name: 'Mike Wilson', role: 'member', status: 'away' },
      { id: '4', name: 'Emily Brown', role: 'member', status: 'offline' },
    ],
    lastActive: '2 min ago',
    unreadMessages: 5,
  },
  {
    id: '2',
    name: 'AI Research Lab',
    description: 'Exploring machine learning and deep learning concepts',
    icon: '🤖',
    category: 'research',
    isPrivate: true,
    memberCount: 12,
    members: [
      { id: '5', name: 'Dr. Smith', role: 'admin', status: 'online' },
      { id: '6', name: 'Jane Doe', role: 'member', status: 'online' },
      { id: '7', name: 'John Wick', role: 'member', status: 'offline' },
    ],
    lastActive: '15 min ago',
    unreadMessages: 0,
  },
  {
    id: '3',
    name: 'Capstone Project Team',
    description: 'Final year project collaboration - Smart Campus App',
    icon: '🚀',
    category: 'project',
    isPrivate: true,
    memberCount: 5,
    members: [
      { id: '8', name: 'Team Lead', role: 'admin', status: 'online' },
      { id: '9', name: 'Developer 1', role: 'member', status: 'online' },
      { id: '10', name: 'Designer', role: 'member', status: 'away' },
    ],
    lastActive: '1 hour ago',
    unreadMessages: 12,
  },
  {
    id: '4',
    name: 'Photography Club',
    description: 'Share your shots and learn from fellow photographers',
    icon: '📷',
    category: 'club',
    isPrivate: false,
    memberCount: 45,
    members: [
      { id: '11', name: 'Photo Master', role: 'admin', status: 'online' },
      { id: '12', name: 'Shutterbug', role: 'moderator', status: 'offline' },
    ],
    lastActive: '3 hours ago',
    unreadMessages: 0,
  },
  {
    id: '5',
    name: 'Web Dev Warriors',
    description: 'Learning and building web applications together',
    icon: '🌐',
    category: 'study',
    isPrivate: false,
    memberCount: 32,
    members: [
      { id: '13', name: 'React Pro', role: 'admin', status: 'online' },
      { id: '14', name: 'CSS Wizard', role: 'member', status: 'online' },
    ],
    lastActive: '30 min ago',
    unreadMessages: 3,
  },
  {
    id: '6',
    name: 'Music Production',
    description: 'Create, share, and collaborate on music projects',
    icon: '🎵',
    category: 'club',
    isPrivate: false,
    memberCount: 28,
    members: [
      { id: '15', name: 'Beat Maker', role: 'admin', status: 'away' },
      { id: '16', name: 'Vocalist', role: 'member', status: 'offline' },
    ],
    lastActive: '2 hours ago',
    unreadMessages: 0,
  },
]

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>(initialGroups)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    category: 'study',
    isPrivate: false,
  })
  const { user } = useAuth()

  const filteredGroups = groups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || group.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleCreateGroup = () => {
    const group: Group = {
      id: Date.now().toString(),
      name: newGroup.name,
      description: newGroup.description,
      icon: '👥',
      category: newGroup.category,
      isPrivate: newGroup.isPrivate,
      memberCount: 1,
      members: [
        {
          id: user?.id || '1',
          name: user?.name || 'You',
          role: 'admin',
          status: 'online',
        },
      ],
      lastActive: 'Just now',
      unreadMessages: 0,
    }
    setGroups([group, ...groups])
    setIsCreateDialogOpen(false)
    setNewGroup({ name: '', description: '', category: 'study', isPrivate: false })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Users className="w-8 h-8 mr-3 text-primary" />
            Study Groups
          </h1>
          <p className="text-muted-foreground mt-1">
            Collaborate and learn together with your peers
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient">
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Group</DialogTitle>
              <DialogDescription>
                Create a study group to collaborate with your classmates
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="group-name">Group Name</Label>
                <Input
                  id="group-name"
                  placeholder="Enter group name"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="What's this group about?"
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <div className="flex flex-wrap gap-2">
                  {categories.slice(1).map((cat) => (
                    <Button
                      key={cat.id}
                      variant={newGroup.category === cat.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setNewGroup({ ...newGroup, category: cat.id })}
                    >
                      {cat.name}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={newGroup.isPrivate ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setNewGroup({ ...newGroup, isPrivate: true })}
                >
                  <Lock className="w-4 h-4 mr-1" />
                  Private
                </Button>
                <Button
                  variant={!newGroup.isPrivate ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setNewGroup({ ...newGroup, isPrivate: false })}
                >
                  <Globe className="w-4 h-4 mr-1" />
                  Public
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateGroup} disabled={!newGroup.name}>
                Create Group
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Search and Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
              className="gap-2"
            >
              <cat.icon className="w-4 h-4" />
              {cat.name}
            </Button>
          ))}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Groups List */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {filteredGroups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedGroup?.id === group.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedGroup(group)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{group.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold truncate">{group.name}</h3>
                          {group.isPrivate && (
                            <Lock className="w-4 h-4 text-muted-foreground" />
                          )}
                          {group.unreadMessages > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {group.unreadMessages}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {group.description}
                        </p>
                        <div className="flex items-center mt-2 space-x-4 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {group.memberCount} members
                          </span>
                          <span>Active {group.lastActive}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex -space-x-2">
                          {group.members.slice(0, 3).map((member) => (
                            <Avatar key={member.id} className="w-8 h-8 border-2 border-background">
                              <AvatarFallback className="text-xs">
                                {member.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {group.memberCount > 3 && (
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
                              +{group.memberCount - 3}
                            </div>
                          )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredGroups.length === 0 && (
            <Card className="p-12 text-center">
              <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg">No groups found</h3>
              <p className="text-muted-foreground mt-1">
                Try adjusting your search or create a new group
              </p>
            </Card>
          )}
        </div>

        {/* Group Details Sidebar */}
        <div className="space-y-4">
          {selectedGroup ? (
            <motion.div
              key={selectedGroup.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-4xl">{selectedGroup.icon}</div>
                      <div>
                        <CardTitle className="flex items-center">
                          {selectedGroup.name}
                          {selectedGroup.isPrivate && (
                            <Lock className="w-4 h-4 ml-2 text-muted-foreground" />
                          )}
                        </CardTitle>
                        <CardDescription>{selectedGroup.memberCount} members</CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Invite Members
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Leave Group
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{selectedGroup.description}</p>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-4 gap-2">
                    <Button variant="outline" size="sm" className="flex-col h-auto py-3">
                      <MessageSquare className="w-5 h-5 mb-1" />
                      <span className="text-xs">Chat</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex-col h-auto py-3">
                      <Video className="w-5 h-5 mb-1" />
                      <span className="text-xs">Meet</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex-col h-auto py-3">
                      <FileText className="w-5 h-5 mb-1" />
                      <span className="text-xs">Files</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex-col h-auto py-3">
                      <Calendar className="w-5 h-5 mb-1" />
                      <span className="text-xs">Events</span>
                    </Button>
                  </div>

                  {/* Members */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Members</h4>
                      <Button variant="ghost" size="sm">
                        <UserPlus className="w-4 h-4 mr-1" />
                        Invite
                      </Button>
                    </div>
                    <ScrollArea className="h-48">
                      <div className="space-y-2">
                        {selectedGroup.members.map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="relative">
                                <Avatar className="w-8 h-8">
                                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span
                                  className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background ${
                                    member.status === 'online'
                                      ? 'bg-green-500'
                                      : member.status === 'away'
                                      ? 'bg-yellow-500'
                                      : 'bg-gray-400'
                                  }`}
                                />
                              </div>
                              <div>
                                <div className="text-sm font-medium flex items-center">
                                  {member.name}
                                  {member.role === 'admin' && (
                                    <Crown className="w-3 h-3 ml-1 text-yellow-500" />
                                  )}
                                </div>
                                <div className="text-xs text-muted-foreground capitalize">
                                  {member.role}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card className="p-8 text-center">
              <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold">Select a Group</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Click on a group to view details and members
              </p>
            </Card>
          )}

          {/* Suggested Groups */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Suggested Groups</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">📐</div>
                  <div>
                    <div className="text-sm font-medium">Math Study Circle</div>
                    <div className="text-xs text-muted-foreground">156 members</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Join
                </Button>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🧬</div>
                  <div>
                    <div className="text-sm font-medium">Biology Lab</div>
                    <div className="text-xs text-muted-foreground">89 members</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Join
                </Button>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">📊</div>
                  <div>
                    <div className="text-sm font-medium">Data Science Hub</div>
                    <div className="text-xs text-muted-foreground">234 members</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Join
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
