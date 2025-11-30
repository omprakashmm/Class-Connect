'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Bot,
  Code,
  Cpu,
  Cloud,
  Search,
  ExternalLink,
  Star,
  Filter,
  LayoutGrid,
  List,
  Sparkles,
  Home,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Tool {
  id: string
  name: string
  description: string
  url: string
  category: 'ai' | 'coding' | 'ece' | 'cloud'
  icon: string
  popular?: boolean
}

const tools: Tool[] = [
  // AI Tools
  { id: 'chatgpt', name: 'ChatGPT', description: 'AI-powered chat assistant by OpenAI', url: 'https://chat.openai.com', category: 'ai', icon: '🤖', popular: true },
  { id: 'gemini', name: 'Google Gemini', description: 'Google\'s multimodal AI assistant', url: 'https://gemini.google.com', category: 'ai', icon: '✨', popular: true },
  { id: 'claude', name: 'Claude', description: 'Anthropic\'s AI assistant for analysis', url: 'https://claude.ai', category: 'ai', icon: '🧠', popular: true },
  { id: 'perplexity', name: 'Perplexity AI', description: 'AI-powered answer engine', url: 'https://perplexity.ai', category: 'ai', icon: '🔍' },
  { id: 'copilot', name: 'GitHub Copilot', description: 'AI pair programmer', url: 'https://github.com/features/copilot', category: 'ai', icon: '👨‍💻' },
  { id: 'midjourney', name: 'Midjourney', description: 'AI image generation', url: 'https://midjourney.com', category: 'ai', icon: '🎨' },
  { id: 'notion-ai', name: 'Notion AI', description: 'AI writing assistant in Notion', url: 'https://notion.so', category: 'ai', icon: '📝' },
  { id: 'grammarly', name: 'Grammarly', description: 'AI writing assistant', url: 'https://grammarly.com', category: 'ai', icon: '✍️' },
  
  // Coding Tools
  { id: 'leetcode', name: 'LeetCode', description: 'Coding interview practice', url: 'https://leetcode.com', category: 'coding', icon: '📊', popular: true },
  { id: 'hackerrank', name: 'HackerRank', description: 'Coding challenges & competitions', url: 'https://hackerrank.com', category: 'coding', icon: '🏆', popular: true },
  { id: 'gfg', name: 'GeeksforGeeks', description: 'DSA tutorials & practice', url: 'https://geeksforgeeks.org', category: 'coding', icon: '📚', popular: true },
  { id: 'stackoverflow', name: 'StackOverflow', description: 'Programming Q&A community', url: 'https://stackoverflow.com', category: 'coding', icon: '💬', popular: true },
  { id: 'codepen', name: 'CodePen', description: 'Front-end code playground', url: 'https://codepen.io', category: 'coding', icon: '🖊️' },
  { id: 'replit', name: 'Replit', description: 'Online IDE and compiler', url: 'https://replit.com', category: 'coding', icon: '⌨️' },
  { id: 'codesandbox', name: 'CodeSandbox', description: 'Cloud development environment', url: 'https://codesandbox.io', category: 'coding', icon: '📦' },
  { id: 'codeforces', name: 'Codeforces', description: 'Competitive programming', url: 'https://codeforces.com', category: 'coding', icon: '🏅' },
  
  // ECE Tools
  { id: 'matlab', name: 'MATLAB Online', description: 'Numerical computing platform', url: 'https://matlab.mathworks.com', category: 'ece', icon: '📈', popular: true },
  { id: 'tinkercad', name: 'Tinkercad', description: '3D design & circuit simulation', url: 'https://tinkercad.com', category: 'ece', icon: '🔧' },
  { id: 'circuitlab', name: 'CircuitLab', description: 'Online circuit simulator', url: 'https://circuitlab.com', category: 'ece', icon: '⚡' },
  { id: 'falstad', name: 'Falstad Simulator', description: 'Interactive circuit simulator', url: 'https://falstad.com/circuit', category: 'ece', icon: '🔌' },
  { id: 'easyeda', name: 'EasyEDA', description: 'Online PCB design tool', url: 'https://easyeda.com', category: 'ece', icon: '🖥️' },
  { id: 'onshape', name: 'Onshape', description: 'Cloud CAD platform', url: 'https://onshape.com', category: 'ece', icon: '🛠️' },
  { id: 'geogebra', name: 'GeoGebra', description: 'Math visualization tool', url: 'https://geogebra.org', category: 'ece', icon: '📐' },
  { id: 'desmos', name: 'Desmos', description: 'Graphing calculator', url: 'https://desmos.com', category: 'ece', icon: '📉' },
  
  // Cloud/DevOps Tools
  { id: 'github', name: 'GitHub', description: 'Code hosting & version control', url: 'https://github.com', category: 'cloud', icon: '🐙', popular: true },
  { id: 'docker', name: 'Docker Playground', description: 'Container platform', url: 'https://labs.play-with-docker.com', category: 'cloud', icon: '🐳', popular: true },
  { id: 'vercel', name: 'Vercel', description: 'Frontend deployment platform', url: 'https://vercel.com', category: 'cloud', icon: '▲' },
  { id: 'railway', name: 'Railway', description: 'Backend deployment platform', url: 'https://railway.app', category: 'cloud', icon: '🚂' },
  { id: 'netlify', name: 'Netlify', description: 'Web deployment platform', url: 'https://netlify.com', category: 'cloud', icon: '🌐' },
  { id: 'aws', name: 'AWS Console', description: 'Amazon Web Services', url: 'https://aws.amazon.com', category: 'cloud', icon: '☁️' },
  { id: 'firebase', name: 'Firebase', description: 'Google\'s app platform', url: 'https://console.firebase.google.com', category: 'cloud', icon: '🔥' },
  { id: 'supabase', name: 'Supabase', description: 'Open source Firebase alternative', url: 'https://supabase.com', category: 'cloud', icon: '⚡' },
]

const categoryIcons = {
  ai: Bot,
  coding: Code,
  ece: Cpu,
  cloud: Cloud,
}

const categoryLabels = {
  ai: 'AI Tools',
  coding: 'Coding Tools',
  ece: 'ECE Tools',
  cloud: 'Cloud/DevOps',
}

export default function ToolsPage() {
  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null)

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(search.toLowerCase()) ||
    tool.description.toLowerCase().includes(search.toLowerCase())
  )

  const toggleFavorite = (toolId: string) => {
    setFavorites(prev =>
      prev.includes(toolId)
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
    )
  }

  const openTool = (tool: Tool) => {
    setSelectedTool(tool)
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
          <h1 className="text-3xl font-bold flex items-center">
            <Sparkles className="w-8 h-8 mr-3 text-primary" />
            Tools Hub
          </h1>
          <p className="text-muted-foreground mt-1">
            Access 30+ essential development and learning tools
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tools..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Selected Tool iFrame */}
      {selectedTool && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{selectedTool.icon}</span>
                <div>
                  <CardTitle>{selectedTool.name}</CardTitle>
                  <CardDescription>{selectedTool.description}</CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <a href={selectedTool.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open in New Tab
                  </Button>
                </a>
                <Button variant="ghost" size="sm" onClick={() => setSelectedTool(null)}>
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[600px] rounded-lg overflow-hidden border bg-muted">
                <iframe
                  src={selectedTool.url}
                  className="w-full h-full"
                  title={selectedTool.name}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Tools by Category */}
      {!selectedTool && (
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Tools</TabsTrigger>
            <TabsTrigger value="ai">AI Tools</TabsTrigger>
            <TabsTrigger value="coding">Coding</TabsTrigger>
            <TabsTrigger value="ece">ECE</TabsTrigger>
            <TabsTrigger value="cloud">Cloud</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {/* Popular Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500 fill-yellow-500" />
                Popular Tools
              </h2>
              <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-4 gap-4' : 'space-y-3'}>
                {filteredTools.filter(t => t.popular).map((tool, index) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    index={index}
                    viewMode={viewMode}
                    isFavorite={favorites.includes(tool.id)}
                    onToggleFavorite={() => toggleFavorite(tool.id)}
                    onOpen={() => openTool(tool)}
                  />
                ))}
              </div>
            </motion.div>

            {/* All Tools by Category */}
            {(['ai', 'coding', 'ece', 'cloud'] as const).map((category, catIndex) => {
              const CategoryIcon = categoryIcons[category]
              const categoryTools = filteredTools.filter(t => t.category === category)
              
              if (categoryTools.length === 0) return null

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (catIndex + 2) }}
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <CategoryIcon className="w-5 h-5 mr-2" />
                    {categoryLabels[category]}
                  </h2>
                  <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-4 gap-4' : 'space-y-3'}>
                    {categoryTools.map((tool, index) => (
                      <ToolCard
                        key={tool.id}
                        tool={tool}
                        index={index}
                        viewMode={viewMode}
                        isFavorite={favorites.includes(tool.id)}
                        onToggleFavorite={() => toggleFavorite(tool.id)}
                        onOpen={() => openTool(tool)}
                      />
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </TabsContent>

          {(['ai', 'coding', 'ece', 'cloud'] as const).map((category) => {
            const categoryTools = filteredTools.filter(t => t.category === category)
            
            return (
              <TabsContent key={category} value={category}>
                <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-4 gap-4' : 'space-y-3'}>
                  {categoryTools.map((tool, index) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      index={index}
                      viewMode={viewMode}
                      isFavorite={favorites.includes(tool.id)}
                      onToggleFavorite={() => toggleFavorite(tool.id)}
                      onOpen={() => openTool(tool)}
                    />
                  ))}
                </div>
              </TabsContent>
            )
          })}
        </Tabs>
      )}
    </div>
  )
}

function ToolCard({
  tool,
  index,
  viewMode,
  isFavorite,
  onToggleFavorite,
  onOpen,
}: {
  tool: Tool
  index: number
  viewMode: 'grid' | 'list'
  isFavorite: boolean
  onToggleFavorite: () => void
  onOpen: () => void
}) {
  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <Card className="card-hover">
          <CardContent className="p-4 flex items-center space-x-4">
            <span className="text-3xl">{tool.icon}</span>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold">{tool.name}</h3>
              <p className="text-sm text-muted-foreground truncate">{tool.description}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleFavorite()
                }}
              >
                <Star className={`w-4 h-4 ${isFavorite ? 'fill-yellow-500 text-yellow-500' : ''}`} />
              </Button>
              <Button variant="outline" size="sm" onClick={onOpen}>
                Open
              </Button>
              <a href={tool.url} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="card-hover cursor-pointer group" onClick={onOpen}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <span className="text-3xl">{tool.icon}</span>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
              onClick={(e) => {
                e.stopPropagation()
                onToggleFavorite()
              }}
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-yellow-500 text-yellow-500' : ''}`} />
            </Button>
          </div>
          <h3 className="font-semibold mb-1">{tool.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{tool.description}</p>
          {tool.popular && (
            <Badge variant="secondary" className="mt-3">Popular</Badge>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
