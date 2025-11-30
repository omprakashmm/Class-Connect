'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  MessageSquare,
  Search,
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Image,
  Mic,
  Check,
  CheckCheck,
  Circle,
  ArrowLeft,
  Home,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useAuth } from '@/contexts/auth-context'

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: Date
  status: 'sent' | 'delivered' | 'read'
}

interface Chat {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  timestamp: string
  unread: number
  status: 'online' | 'offline' | 'typing'
  isGroup: boolean
  messages: Message[]
}

const initialChats: Chat[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    lastMessage: 'Hey! Did you finish the assignment?',
    timestamp: '2 min ago',
    unread: 3,
    status: 'online',
    isGroup: false,
    messages: [
      { id: '1', senderId: '2', content: 'Hi there!', timestamp: new Date(Date.now() - 3600000), status: 'read' },
      { id: '2', senderId: '1', content: 'Hey Sarah! How are you?', timestamp: new Date(Date.now() - 3500000), status: 'read' },
      { id: '3', senderId: '2', content: "I'm good! Working on the CS assignment", timestamp: new Date(Date.now() - 3400000), status: 'read' },
      { id: '4', senderId: '1', content: "Nice! I'm almost done with mine", timestamp: new Date(Date.now() - 3300000), status: 'read' },
      { id: '5', senderId: '2', content: 'Hey! Did you finish the assignment?', timestamp: new Date(Date.now() - 120000), status: 'delivered' },
    ],
  },
  {
    id: '2',
    name: 'CS101 Study Group',
    lastMessage: 'Mike: The test is tomorrow!',
    timestamp: '15 min ago',
    unread: 12,
    status: 'online',
    isGroup: true,
    messages: [
      { id: '1', senderId: '3', content: 'Has everyone reviewed chapter 5?', timestamp: new Date(Date.now() - 7200000), status: 'read' },
      { id: '2', senderId: '4', content: 'Yes, but I have questions about recursion', timestamp: new Date(Date.now() - 7100000), status: 'read' },
      { id: '3', senderId: '1', content: 'I can help with that!', timestamp: new Date(Date.now() - 7000000), status: 'read' },
      { id: '4', senderId: '3', content: 'The test is tomorrow!', timestamp: new Date(Date.now() - 900000), status: 'delivered' },
    ],
  },
  {
    id: '3',
    name: 'Alex Johnson',
    lastMessage: 'Thanks for the notes!',
    timestamp: '1 hour ago',
    unread: 0,
    status: 'offline',
    isGroup: false,
    messages: [
      { id: '1', senderId: '1', content: 'Hey Alex, here are the notes from class', timestamp: new Date(Date.now() - 7200000), status: 'read' },
      { id: '2', senderId: '5', content: 'Thanks for the notes!', timestamp: new Date(Date.now() - 3600000), status: 'read' },
    ],
  },
  {
    id: '4',
    name: 'Emily Brown',
    lastMessage: "Let's meet at the library",
    timestamp: '3 hours ago',
    unread: 0,
    status: 'typing',
    isGroup: false,
    messages: [
      { id: '1', senderId: '6', content: 'Want to study together?', timestamp: new Date(Date.now() - 14400000), status: 'read' },
      { id: '2', senderId: '1', content: 'Sure! When are you free?', timestamp: new Date(Date.now() - 14300000), status: 'read' },
      { id: '3', senderId: '6', content: "Let's meet at the library", timestamp: new Date(Date.now() - 10800000), status: 'read' },
    ],
  },
  {
    id: '5',
    name: 'Project Team Alpha',
    lastMessage: 'Meeting at 4 PM today',
    timestamp: 'Yesterday',
    unread: 0,
    status: 'online',
    isGroup: true,
    messages: [
      { id: '1', senderId: '7', content: 'Meeting at 4 PM today', timestamp: new Date(Date.now() - 86400000), status: 'read' },
    ],
  },
  {
    id: '6',
    name: 'Dr. Smith',
    lastMessage: 'Your paper looks good!',
    timestamp: 'Yesterday',
    unread: 0,
    status: 'offline',
    isGroup: false,
    messages: [
      { id: '1', senderId: '1', content: 'Hi Dr. Smith, I submitted my paper', timestamp: new Date(Date.now() - 172800000), status: 'read' },
      { id: '2', senderId: '8', content: 'Your paper looks good!', timestamp: new Date(Date.now() - 86400000), status: 'read' },
    ],
  },
]

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>(initialChats)
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [messageInput, setMessageInput] = useState('')
  const [showChatList, setShowChatList] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [selectedChat?.messages])

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: user?.id || '1',
      content: messageInput,
      timestamp: new Date(),
      status: 'sent',
    }

    const updatedChats = chats.map((chat) => {
      if (chat.id === selectedChat.id) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: messageInput,
          timestamp: 'Just now',
        }
      }
      return chat
    })

    setChats(updatedChats)
    setSelectedChat({
      ...selectedChat,
      messages: [...selectedChat.messages, newMessage],
    })
    setMessageInput('')

    // Simulate message delivery
    setTimeout(() => {
      const deliveredChats = updatedChats.map((chat) => {
        if (chat.id === selectedChat.id) {
          return {
            ...chat,
            messages: chat.messages.map((msg) =>
              msg.id === newMessage.id ? { ...msg, status: 'delivered' as const } : msg
            ),
          }
        }
        return chat
      })
      setChats(deliveredChats)
    }, 1000)
  }

  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat)
    setShowChatList(false)
    // Mark as read
    setChats(chats.map((c) => (c.id === chat.id ? { ...c, unread: 0 } : c)))
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

      <div className="h-[calc(100vh-12rem)] flex">
      <Card className="flex-1 flex overflow-hidden">
        {/* Chat List */}
        <div
          className={`w-full md:w-80 border-r flex-shrink-0 ${
            showChatList ? 'block' : 'hidden md:block'
          }`}
        >
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold flex items-center mb-4">
              <MessageSquare className="w-6 h-6 mr-2 text-primary" />
              Messages
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <ScrollArea className="h-[calc(100%-5rem)]">
            <div className="p-2">
              {filteredChats.map((chat) => (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`p-3 rounded-lg cursor-pointer transition-colors mb-1 ${
                    selectedChat?.id === chat.id
                      ? 'bg-primary/10'
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => handleSelectChat(chat)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        {chat.isGroup ? (
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                            {chat.name.charAt(0)}
                          </AvatarFallback>
                        ) : (
                          <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                        )}
                      </Avatar>
                      {!chat.isGroup && (
                        <span
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${
                            chat.status === 'online'
                              ? 'bg-green-500'
                              : chat.status === 'typing'
                              ? 'bg-blue-500'
                              : 'bg-gray-400'
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium truncate">{chat.name}</span>
                        <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-sm truncate ${
                            chat.unread > 0 ? 'text-foreground font-medium' : 'text-muted-foreground'
                          }`}
                        >
                          {chat.status === 'typing' ? (
                            <span className="text-primary">typing...</span>
                          ) : (
                            chat.lastMessage
                          )}
                        </span>
                        {chat.unread > 0 && (
                          <Badge variant="default" className="ml-2 min-w-[1.25rem] h-5 flex items-center justify-center">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div
          className={`flex-1 flex flex-col ${
            !showChatList ? 'block' : 'hidden md:flex'
          }`}
        >
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setShowChatList(true)}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <Avatar className="w-10 h-10">
                    {selectedChat.isGroup ? (
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                        {selectedChat.name.charAt(0)}
                      </AvatarFallback>
                    ) : (
                      <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedChat.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {selectedChat.status === 'online'
                        ? 'Online'
                        : selectedChat.status === 'typing'
                        ? 'Typing...'
                        : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="w-5 h-5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Search Messages</DropdownMenuItem>
                      <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Block User</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {selectedChat.messages.map((message, index) => {
                    const isOwnMessage = message.senderId === (user?.id || '1')
                    const showAvatar =
                      index === 0 ||
                      selectedChat.messages[index - 1].senderId !== message.senderId

                    return (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`flex items-end space-x-2 max-w-[70%] ${
                            isOwnMessage ? 'flex-row-reverse space-x-reverse' : ''
                          }`}
                        >
                          {!isOwnMessage && showAvatar && (
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-xs">
                                {selectedChat.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          {!isOwnMessage && !showAvatar && <div className="w-8" />}
                          <div
                            className={`px-4 py-2 rounded-2xl ${
                              isOwnMessage
                                ? 'bg-primary text-primary-foreground rounded-br-sm'
                                : 'bg-muted rounded-bl-sm'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <div
                              className={`flex items-center justify-end space-x-1 mt-1 ${
                                isOwnMessage ? 'text-primary-foreground/70' : 'text-muted-foreground'
                              }`}
                            >
                              <span className="text-xs">{formatMessageTime(message.timestamp)}</span>
                              {isOwnMessage && (
                                <>
                                  {message.status === 'read' ? (
                                    <CheckCheck className="w-3 h-3 text-blue-400" />
                                  ) : message.status === 'delivered' ? (
                                    <CheckCheck className="w-3 h-3" />
                                  ) : (
                                    <Check className="w-3 h-3" />
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Image className="w-5 h-5" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button variant="ghost" size="icon">
                    <Smile className="w-5 h-5" />
                  </Button>
                  {messageInput.trim() ? (
                    <Button size="icon" onClick={handleSendMessage}>
                      <Send className="w-5 h-5" />
                    </Button>
                  ) : (
                    <Button variant="ghost" size="icon">
                      <Mic className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold">Select a Conversation</h3>
                <p className="text-muted-foreground mt-2">
                  Choose a chat from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
      </div>
    </div>
  )
}
