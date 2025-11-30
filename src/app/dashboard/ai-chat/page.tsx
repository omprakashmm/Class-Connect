'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Send,
  Bot,
  User,
  Sparkles,
  Trash2,
  Copy,
  Check,
  Settings,
  ChevronDown,
  Loader2,
  Brain,
  Lightbulb,
  Code,
  FileText,
  Mic,
  Image,
  Home,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/contexts/auth-context'
import { getInitials } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  model?: string
  timestamp: Date
}

interface AIModel {
  id: string
  name: string
  description: string
  icon: string
  color: string
  available: boolean
}

const aiModels: AIModel[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    description: 'Most capable model for complex tasks',
    icon: '🤖',
    color: 'from-green-500 to-emerald-500',
    available: true,
  },
  {
    id: 'gemini',
    name: 'Gemini 1.5',
    description: 'Google\'s multimodal AI model',
    icon: '✨',
    color: 'from-blue-500 to-cyan-500',
    available: true,
  },
  {
    id: 'claude',
    name: 'Claude 3',
    description: 'Best for analysis and writing',
    icon: '🧠',
    color: 'from-purple-500 to-pink-500',
    available: true,
  },
  {
    id: 'runanywhere',
    name: 'RunAnywhere AI',
    description: 'Real-time reasoning model',
    icon: '⚡',
    color: 'from-orange-500 to-red-500',
    available: true,
  },
]

const quickPrompts = [
  { icon: Brain, label: 'Explain concept', prompt: 'Explain the concept of ' },
  { icon: Code, label: 'Help with code', prompt: 'Help me write code for ' },
  { icon: FileText, label: 'Summarize text', prompt: 'Summarize the following: ' },
  { icon: Lightbulb, label: 'Generate ideas', prompt: 'Give me creative ideas for ' },
]

// Simulated AI responses
const getAIResponse = async (message: string, model: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
  
  const responses: Record<string, string[]> = {
    'gpt-4': [
      "I'd be happy to help you with that! Let me break this down into clear steps...",
      "That's an interesting question! Here's my analysis...",
      "Based on my understanding, here's a comprehensive answer...",
    ],
    'gemini': [
      "Great question! Let me provide you with a detailed explanation...",
      "I've analyzed this from multiple perspectives...",
      "Here's what I found after considering various factors...",
    ],
    'claude': [
      "I appreciate you bringing this up! Here's my thoughtful response...",
      "Let me offer a nuanced perspective on this...",
      "After careful consideration, here's my analysis...",
    ],
    'runanywhere': [
      "Processing in real-time... Here's my response...",
      "Based on my quick analysis...",
      "Let me help you with that right away...",
    ],
  }
  
  const modelResponses = responses[model] || responses['gpt-4']
  return modelResponses[Math.floor(Math.random() * modelResponses.length)] + 
    `\n\nRegarding "${message.slice(0, 50)}...", here's what I can tell you:\n\n` +
    "1. **Key Point 1**: This is an important consideration that you should keep in mind.\n\n" +
    "2. **Key Point 2**: Additionally, this aspect is worth exploring further.\n\n" +
    "3. **Key Point 3**: Finally, don't forget to consider this perspective as well.\n\n" +
    "Would you like me to elaborate on any of these points?"
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState(aiModels[0])
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await getAIResponse(input, selectedModel.id)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        model: selectedModel.name,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error getting AI response:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const clearChat = () => {
    setMessages([])
  }

  return (
    <div className="space-y-4">
      {/* Home Button */}
      <Link href="/dashboard">
        <Button variant="ghost" className="gap-2">
          <Home className="w-4 h-4" />
          Dashboard Home
        </Button>
      </Link>

      <div className="h-[calc(100vh-12rem)] flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-4"
      >
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${selectedModel.color} flex items-center justify-center`}>
            <span className="text-2xl">{selectedModel.icon}</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              AI Chat Hub
              <Sparkles className="w-5 h-5 ml-2 text-primary" />
            </h1>
            <p className="text-sm text-muted-foreground">Powered by multiple AI models</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Model Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <span>{selectedModel.icon}</span>
                {selectedModel.name}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Select AI Model</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {aiModels.map((model) => (
                <DropdownMenuItem
                  key={model.id}
                  onClick={() => setSelectedModel(model)}
                  className="flex items-start space-x-3 p-3"
                >
                  <span className="text-xl">{model.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="font-medium">{model.name}</span>
                      {model.id === selectedModel.id && (
                        <Check className="w-4 h-4 ml-auto text-primary" />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{model.description}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={clearChat}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${selectedModel.color} flex items-center justify-center mb-6`}>
                <span className="text-4xl">{selectedModel.icon}</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">How can I help you today?</h2>
              <p className="text-muted-foreground mb-8 max-w-md">
                I'm {selectedModel.name}, ready to assist with studying, coding, writing, and more.
              </p>
              
              {/* Quick Prompts */}
              <div className="grid grid-cols-2 gap-3 max-w-lg">
                {quickPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start h-auto py-3 px-4"
                    onClick={() => setInput(prompt.prompt)}
                  >
                    <prompt.icon className="w-4 h-4 mr-2 shrink-0" />
                    <span className="text-left">{prompt.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex items-start space-x-3 ${
                      message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <Avatar className="h-8 w-8 shrink-0">
                      {message.role === 'assistant' ? (
                        <>
                          <AvatarImage src="" />
                          <AvatarFallback className="text-lg">
                            {selectedModel.icon}
                          </AvatarFallback>
                        </>
                      ) : (
                        <>
                          <AvatarImage src={user?.avatar} />
                          <AvatarFallback>
                            {user ? getInitials(user.name) : 'U'}
                          </AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    
                    <div
                      className={`flex-1 max-w-[80%] ${
                        message.role === 'user' ? 'text-right' : ''
                      }`}
                    >
                      <div
                        className={`inline-block rounded-2xl px-4 py-2 ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-left">{message.content}</div>
                      </div>
                      <div className="flex items-center mt-1 space-x-2 text-xs text-muted-foreground">
                        {message.model && (
                          <Badge variant="outline" className="text-xs">
                            {message.model}
                          </Badge>
                        )}
                        <span>
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        {message.role === 'assistant' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2"
                            onClick={() => handleCopy(message.content, message.id)}
                          >
                            {copiedId === message.id ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start space-x-3"
                >
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="text-lg">
                      {selectedModel.icon}
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask ${selectedModel.name} anything...`}
                className="min-h-[60px] max-h-[200px] resize-none pr-24"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
              />
              <div className="absolute bottom-2 right-2 flex items-center space-x-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Mic className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Image className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Button
              variant="gradient"
              size="lg"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            AI can make mistakes. Consider checking important information.
          </p>
        </div>
      </Card>
      </div>
    </div>
  )
}
