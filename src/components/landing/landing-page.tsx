'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Bot,
  Users,
  Clock,
  FileText,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Zap,
  ArrowRight,
  CheckCircle,
  Star,
  Menu,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const features = [
  {
    icon: Bot,
    title: 'AI Chat Hub',
    description: 'Access GPT-4, Gemini, Claude, and more through one unified interface',
    color: 'from-blue-500 to-purple-500',
  },
  {
    icon: BookOpen,
    title: '30+ Tools Hub',
    description: 'LeetCode, HackerRank, MATLAB, Docker, and more embedded tools',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Users,
    title: 'Study Groups',
    description: 'Real-time collaboration with file sharing and live presence',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Clock,
    title: 'Focus Mode',
    description: 'Pomodoro timer with productivity scores and streak tracking',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: FileText,
    title: 'Resume Builder',
    description: 'AI-powered resume creation with professional templates',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Briefcase,
    title: 'Jobs Portal',
    description: 'Discover internships and job opportunities tailored for students',
    color: 'from-violet-500 to-purple-500',
  },
]

const stats = [
  { value: '30+', label: 'Embedded Tools' },
  { value: '4', label: 'AI Models' },
  { value: '10k+', label: 'Active Students' },
  { value: '99%', label: 'Uptime' },
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CS Student, Stanford',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    content: 'ClassConnect has completely transformed how I study. The AI assistant helps me understand complex concepts in minutes.',
  },
  {
    name: 'James Wilson',
    role: 'Engineering Student, MIT',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    content: 'The focus mode and productivity tracking kept me accountable. I improved my grades by a full letter grade!',
  },
  {
    name: 'Priya Sharma',
    role: 'Data Science, Berkeley',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    content: 'Having LeetCode, GitHub, and AI tools in one place is a game-changer for my coding practice sessions.',
  },
]

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">ClassConnect</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#tools" className="text-muted-foreground hover:text-foreground transition-colors">
              Tools
            </Link>
            <Link href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
              Testimonials
            </Link>
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="gradient">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden glass border-b p-4 space-y-4"
          >
            <Link href="#features" className="block py-2">Features</Link>
            <Link href="#tools" className="block py-2">Tools</Link>
            <Link href="#testimonials" className="block py-2">Testimonials</Link>
            <Link href="/auth/login">
              <Button variant="outline" className="w-full mb-2">Sign In</Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="gradient" className="w-full">Get Started</Button>
            </Link>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Powered by Next-Gen Cloud AI
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Your AI-Powered
              <br />
              <span className="text-gradient">Academic Companion</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              ClassConnect brings together 30+ essential tools, multi-AI assistance, 
              real-time collaboration, and smart productivity features in one seamless platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register">
                <Button variant="gradient" size="xl" className="group">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="xl">
                  Explore Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient">{stat.value}</div>
                <div className="text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive suite of tools designed specifically for students
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card-hover h-full">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Preview */}
      <section id="tools" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              30+ Integrated Tools
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access all your favorite development and learning tools in one place
            </p>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[
              'ChatGPT', 'Gemini', 'Claude', 'LeetCode', 'GitHub', 'Docker',
              'HackerRank', 'StackOverflow', 'MATLAB', 'VS Code', 'Figma', 'Notion',
            ].map((tool, index) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-background rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="font-medium text-sm">{tool}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by Students
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See what students from top universities are saying
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4">{testimonial.content}</p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <div className="font-medium">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="gradient-primary rounded-3xl p-8 md:p-16 text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Boost Your Productivity?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Join thousands of students who are already using ClassConnect to excel in their academics.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register">
                <Button size="xl" className="bg-white text-primary hover:bg-white/90">
                  Get Started Free
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-8 text-white/80">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Free tier available
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                No credit card required
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">ClassConnect</span>
              </Link>
              <p className="text-muted-foreground text-sm">
                The ultimate AI-powered academic productivity platform for students.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><Link href="/dashboard/tools" className="hover:text-foreground">Tools Hub</Link></li>
                <li><Link href="/dashboard/ai-chat" className="hover:text-foreground">AI Chat</Link></li>
                <li><Link href="/dashboard/groups" className="hover:text-foreground">Study Groups</Link></li>
                <li><Link href="/dashboard/focus" className="hover:text-foreground">Focus Mode</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><Link href="#" className="hover:text-foreground">Documentation</Link></li>
                <li><Link href="#" className="hover:text-foreground">API Reference</Link></li>
                <li><Link href="#" className="hover:text-foreground">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><Link href="#" className="hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-foreground">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-foreground">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} ClassConnect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
