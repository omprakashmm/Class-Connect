'use client'

import { useState } from 'react'
import { motion, Reorder } from 'framer-motion'
import Link from 'next/link'
import {
  FileText,
  Plus,
  Download,
  Eye,
  Sparkles,
  GripVertical,
  Trash2,
  Edit3,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  ChevronDown,
  Home,
  ChevronUp,
  Palette,
  Layout,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAuth } from '@/contexts/auth-context'

interface ResumeSection {
  id: string
  type: 'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications'
  title: string
  isExpanded: boolean
  data: Record<string, unknown>
}

interface ResumeTemplate {
  id: string
  name: string
  preview: string
  color: string
}

const templates: ResumeTemplate[] = [
  { id: 'modern', name: 'Modern', preview: '📄', color: 'blue' },
  { id: 'classic', name: 'Classic', preview: '📝', color: 'gray' },
  { id: 'creative', name: 'Creative', preview: '🎨', color: 'purple' },
  { id: 'minimal', name: 'Minimal', preview: '📋', color: 'green' },
]

const initialSections: ResumeSection[] = [
  {
    id: 'personal',
    type: 'personal',
    title: 'Personal Information',
    isExpanded: true,
    data: {
      fullName: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/johndoe',
      github: 'github.com/johndoe',
      website: 'johndoe.dev',
      summary:
        'Passionate software developer with 3+ years of experience in full-stack development. Skilled in React, Node.js, and cloud technologies. Seeking to leverage my technical skills and creativity to build innovative solutions.',
    },
  },
  {
    id: 'experience',
    type: 'experience',
    title: 'Work Experience',
    isExpanded: true,
    data: {
      items: [
        {
          id: '1',
          company: 'Tech Corp',
          position: 'Senior Software Developer',
          location: 'San Francisco, CA',
          startDate: 'Jan 2022',
          endDate: 'Present',
          description:
            'Led development of microservices architecture, improving system performance by 40%. Mentored junior developers and conducted code reviews.',
          highlights: ['Microservices', 'Team Leadership', 'Performance Optimization'],
        },
        {
          id: '2',
          company: 'StartUp Inc',
          position: 'Full Stack Developer',
          location: 'Remote',
          startDate: 'Jun 2020',
          endDate: 'Dec 2021',
          description:
            'Built and maintained web applications using React and Node.js. Implemented CI/CD pipelines and automated testing.',
          highlights: ['React', 'Node.js', 'CI/CD'],
        },
      ],
    },
  },
  {
    id: 'education',
    type: 'education',
    title: 'Education',
    isExpanded: true,
    data: {
      items: [
        {
          id: '1',
          institution: 'University of Technology',
          degree: 'Bachelor of Science in Computer Science',
          location: 'Boston, MA',
          startDate: 'Sep 2016',
          endDate: 'May 2020',
          gpa: '3.8/4.0',
          highlights: ["Dean's List", 'Computer Science Club President'],
        },
      ],
    },
  },
  {
    id: 'skills',
    type: 'skills',
    title: 'Skills',
    isExpanded: true,
    data: {
      categories: [
        {
          name: 'Programming Languages',
          skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go'],
        },
        {
          name: 'Frameworks & Libraries',
          skills: ['React', 'Next.js', 'Node.js', 'Express', 'Django'],
        },
        {
          name: 'Tools & Technologies',
          skills: ['Git', 'Docker', 'Kubernetes', 'AWS', 'MongoDB'],
        },
      ],
    },
  },
  {
    id: 'projects',
    type: 'projects',
    title: 'Projects',
    isExpanded: false,
    data: {
      items: [
        {
          id: '1',
          name: 'E-Commerce Platform',
          description: 'Built a full-stack e-commerce platform with React and Node.js',
          technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
          link: 'github.com/johndoe/ecommerce',
        },
        {
          id: '2',
          name: 'AI Chat Assistant',
          description: 'Developed an AI-powered chat assistant using OpenAI GPT-4',
          technologies: ['Python', 'FastAPI', 'OpenAI', 'Redis'],
          link: 'github.com/johndoe/ai-chat',
        },
      ],
    },
  },
  {
    id: 'certifications',
    type: 'certifications',
    title: 'Certifications',
    isExpanded: false,
    data: {
      items: [
        { id: '1', name: 'AWS Solutions Architect', issuer: 'Amazon', date: 'Dec 2023' },
        { id: '2', name: 'Google Cloud Professional', issuer: 'Google', date: 'Aug 2023' },
      ],
    },
  },
]

export default function ResumePage() {
  const [sections, setSections] = useState<ResumeSection[]>(initialSections)
  const [selectedTemplate, setSelectedTemplate] = useState('modern')
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false)
  const [aiSuggestion, setAISuggestion] = useState('')
  const { user } = useAuth()

  const toggleSection = (id: string) => {
    setSections(
      sections.map((s) => (s.id === id ? { ...s, isExpanded: !s.isExpanded } : s))
    )
  }

  const updateSectionData = (id: string, data: Record<string, unknown>) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, data: { ...s.data, ...data } } : s)))
  }

  const handleAIReview = () => {
    setIsAIDialogOpen(true)
    // Simulate AI review
    setTimeout(() => {
      setAISuggestion(
        `Here are some suggestions to improve your resume:\n\n1. **Summary Section**: Consider adding quantifiable achievements. For example, "Led development of microservices architecture" could become "Led development of microservices architecture serving 1M+ users".\n\n2. **Skills**: Your skills section is comprehensive, but consider organizing by proficiency level (Expert, Advanced, Intermediate).\n\n3. **Experience**: Add more metrics and outcomes. Numbers and percentages make your achievements more impactful.\n\n4. **Projects**: Great portfolio! Consider adding links to live demos where available.\n\n5. **ATS Optimization**: Your resume uses good keywords for software development roles. Consider adding more industry-specific terms for your target role.`
      )
    }, 2000)
  }

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'personal':
        return User
      case 'experience':
        return Briefcase
      case 'education':
        return GraduationCap
      case 'skills':
        return Code
      case 'projects':
        return Layout
      case 'certifications':
        return Award
      default:
        return FileText
    }
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
            <FileText className="w-8 h-8 mr-3 text-primary" />
            Resume Builder
          </h1>
          <p className="text-muted-foreground mt-1">
            Create a professional resume with AI assistance
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => setIsPreviewMode(!isPreviewMode)}>
            <Eye className="w-4 h-4 mr-2" />
            {isPreviewMode ? 'Edit Mode' : 'Preview'}
          </Button>
          <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={handleAIReview}>
                <Sparkles className="w-4 h-4 mr-2" />
                AI Review
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-primary" />
                  AI Resume Review
                </DialogTitle>
                <DialogDescription>
                  Here's what our AI thinks about your resume
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-96">
                {aiSuggestion ? (
                  <div className="whitespace-pre-wrap text-sm">{aiSuggestion}</div>
                ) : (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                    <span className="ml-3">Analyzing your resume...</span>
                  </div>
                )}
              </ScrollArea>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAIDialogOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => setIsAIDialogOpen(false)}>Apply Suggestions</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="gradient">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Resume Editor */}
        <div className="lg:col-span-2 space-y-4">
          {/* Template Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Palette className="w-5 h-5 mr-2 text-primary" />
                  Choose Template
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 overflow-x-auto pb-2">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`flex-shrink-0 p-4 rounded-xl border-2 transition-all ${
                        selectedTemplate === template.id
                          ? 'border-primary bg-primary/5'
                          : 'border-transparent bg-muted/50 hover:bg-muted'
                      }`}
                    >
                      <div className="text-4xl mb-2">{template.preview}</div>
                      <div className="text-sm font-medium">{template.name}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Resume Sections */}
          <Reorder.Group axis="y" values={sections} onReorder={setSections} className="space-y-4">
            {sections.map((section, index) => {
              const Icon = getSectionIcon(section.type)

              return (
                <Reorder.Item key={section.id} value={section}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="cursor-grab">
                              <GripVertical className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <Icon className="w-5 h-5 text-primary" />
                            <CardTitle className="text-lg">{section.title}</CardTitle>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleSection(section.id)}
                            >
                              {section.isExpanded ? (
                                <ChevronUp className="w-5 h-5" />
                              ) : (
                                <ChevronDown className="w-5 h-5" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      {section.isExpanded && (
                        <CardContent className="space-y-4">
                          {section.type === 'personal' && (
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Full Name</Label>
                                <Input
                                  value={(section.data.fullName as string) || ''}
                                  onChange={(e) =>
                                    updateSectionData(section.id, { fullName: e.target.value })
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Email</Label>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                  <Input
                                    className="pl-10"
                                    value={(section.data.email as string) || ''}
                                    onChange={(e) =>
                                      updateSectionData(section.id, { email: e.target.value })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Phone</Label>
                                <div className="relative">
                                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                  <Input
                                    className="pl-10"
                                    value={(section.data.phone as string) || ''}
                                    onChange={(e) =>
                                      updateSectionData(section.id, { phone: e.target.value })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Location</Label>
                                <div className="relative">
                                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                  <Input
                                    className="pl-10"
                                    value={(section.data.location as string) || ''}
                                    onChange={(e) =>
                                      updateSectionData(section.id, { location: e.target.value })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>LinkedIn</Label>
                                <div className="relative">
                                  <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                  <Input
                                    className="pl-10"
                                    value={(section.data.linkedin as string) || ''}
                                    onChange={(e) =>
                                      updateSectionData(section.id, { linkedin: e.target.value })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>GitHub</Label>
                                <div className="relative">
                                  <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                  <Input
                                    className="pl-10"
                                    value={(section.data.github as string) || ''}
                                    onChange={(e) =>
                                      updateSectionData(section.id, { github: e.target.value })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="md:col-span-2 space-y-2">
                                <Label>Professional Summary</Label>
                                <Textarea
                                  rows={4}
                                  value={(section.data.summary as string) || ''}
                                  onChange={(e) =>
                                    updateSectionData(section.id, { summary: e.target.value })
                                  }
                                />
                              </div>
                            </div>
                          )}

                          {section.type === 'experience' && (
                            <div className="space-y-4">
                              {((section.data.items as Record<string, unknown>[]) || []).map(
                                (item, i) => (
                                  <div
                                    key={(item.id as string) || i}
                                    className="p-4 rounded-lg border bg-muted/30"
                                  >
                                    <div className="flex items-start justify-between mb-3">
                                      <div>
                                        <h4 className="font-semibold">{item.position as string}</h4>
                                        <p className="text-sm text-muted-foreground">
                                          {item.company as string} • {item.location as string}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          {item.startDate as string} - {item.endDate as string}
                                        </p>
                                      </div>
                                      <div className="flex space-x-1">
                                        <Button variant="ghost" size="icon">
                                          <Edit3 className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                          <Trash2 className="w-4 h-4 text-destructive" />
                                        </Button>
                                      </div>
                                    </div>
                                    <p className="text-sm mb-2">{item.description as string}</p>
                                    <div className="flex flex-wrap gap-1">
                                      {((item.highlights as string[]) || []).map((h, idx) => (
                                        <Badge key={idx} variant="secondary">
                                          {h}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )
                              )}
                              <Button variant="outline" className="w-full">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Experience
                              </Button>
                            </div>
                          )}

                          {section.type === 'education' && (
                            <div className="space-y-4">
                              {((section.data.items as Record<string, unknown>[]) || []).map(
                                (item, i) => (
                                  <div
                                    key={(item.id as string) || i}
                                    className="p-4 rounded-lg border bg-muted/30"
                                  >
                                    <div className="flex items-start justify-between">
                                      <div>
                                        <h4 className="font-semibold">{item.degree as string}</h4>
                                        <p className="text-sm text-muted-foreground">
                                          {item.institution as string} • {item.location as string}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          {item.startDate as string} - {item.endDate as string} | GPA:{' '}
                                          {item.gpa as string}
                                        </p>
                                      </div>
                                      <div className="flex space-x-1">
                                        <Button variant="ghost" size="icon">
                                          <Edit3 className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                          <Trash2 className="w-4 h-4 text-destructive" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                              <Button variant="outline" className="w-full">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Education
                              </Button>
                            </div>
                          )}

                          {section.type === 'skills' && (
                            <div className="space-y-4">
                              {((section.data.categories as Record<string, unknown>[]) || []).map(
                                (cat, i) => (
                                  <div key={i}>
                                    <Label className="mb-2 block">{cat.name as string}</Label>
                                    <div className="flex flex-wrap gap-2">
                                      {((cat.skills as string[]) || []).map((skill, idx) => (
                                        <Badge key={idx} variant="secondary">
                                          {skill}
                                        </Badge>
                                      ))}
                                      <Button variant="ghost" size="sm" className="h-6">
                                        <Plus className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          )}

                          {section.type === 'projects' && (
                            <div className="space-y-4">
                              {((section.data.items as Record<string, unknown>[]) || []).map(
                                (item, i) => (
                                  <div
                                    key={(item.id as string) || i}
                                    className="p-4 rounded-lg border bg-muted/30"
                                  >
                                    <div className="flex items-start justify-between mb-2">
                                      <div>
                                        <h4 className="font-semibold">{item.name as string}</h4>
                                        <p className="text-sm text-muted-foreground">
                                          {item.description as string}
                                        </p>
                                      </div>
                                      <div className="flex space-x-1">
                                        <Button variant="ghost" size="icon">
                                          <Edit3 className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                          <Trash2 className="w-4 h-4 text-destructive" />
                                        </Button>
                                      </div>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                      {((item.technologies as string[]) || []).map((tech, idx) => (
                                        <Badge key={idx} variant="outline" className="text-xs">
                                          {tech}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )
                              )}
                              <Button variant="outline" className="w-full">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Project
                              </Button>
                            </div>
                          )}

                          {section.type === 'certifications' && (
                            <div className="space-y-4">
                              {((section.data.items as Record<string, unknown>[]) || []).map(
                                (item, i) => (
                                  <div
                                    key={(item.id as string) || i}
                                    className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                                  >
                                    <div className="flex items-center space-x-3">
                                      <Award className="w-5 h-5 text-primary" />
                                      <div>
                                        <h4 className="font-medium">{item.name as string}</h4>
                                        <p className="text-xs text-muted-foreground">
                                          {item.issuer as string} • {item.date as string}
                                        </p>
                                      </div>
                                    </div>
                                    <Button variant="ghost" size="icon">
                                      <Trash2 className="w-4 h-4 text-destructive" />
                                    </Button>
                                  </div>
                                )
                              )}
                              <Button variant="outline" className="w-full">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Certification
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      )}
                    </Card>
                  </motion.div>
                </Reorder.Item>
              )
            })}
          </Reorder.Group>
        </div>

        {/* Resume Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:sticky lg:top-4 space-y-4"
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Eye className="w-5 h-5 mr-2 text-primary" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-[8.5/11] bg-white rounded-lg shadow-lg p-6 text-black text-xs overflow-hidden">
                {/* Mini Resume Preview */}
                <div className="space-y-3">
                  {/* Header */}
                  <div className="text-center border-b pb-2">
                    <h1 className="text-sm font-bold">
                      {(sections.find((s) => s.type === 'personal')?.data.fullName as string) ||
                        'Your Name'}
                    </h1>
                    <p className="text-[8px] text-gray-600">
                      {(sections.find((s) => s.type === 'personal')?.data.email as string) || ''} •{' '}
                      {(sections.find((s) => s.type === 'personal')?.data.phone as string) || ''} •{' '}
                      {(sections.find((s) => s.type === 'personal')?.data.location as string) || ''}
                    </p>
                  </div>

                  {/* Summary */}
                  <div>
                    <p className="text-[7px] text-gray-700 leading-tight line-clamp-3">
                      {(sections.find((s) => s.type === 'personal')?.data.summary as string) || ''}
                    </p>
                  </div>

                  {/* Experience */}
                  <div>
                    <h2 className="text-[9px] font-bold border-b pb-0.5 mb-1">EXPERIENCE</h2>
                    {(
                      (sections.find((s) => s.type === 'experience')?.data.items as Record<
                        string,
                        unknown
                      >[]) || []
                    )
                      .slice(0, 2)
                      .map((item, i) => (
                        <div key={i} className="mb-1">
                          <div className="flex justify-between">
                            <span className="font-semibold text-[8px]">{item.position as string}</span>
                            <span className="text-[7px] text-gray-500">
                              {item.startDate as string} - {item.endDate as string}
                            </span>
                          </div>
                          <p className="text-[7px] text-gray-600">{item.company as string}</p>
                        </div>
                      ))}
                  </div>

                  {/* Education */}
                  <div>
                    <h2 className="text-[9px] font-bold border-b pb-0.5 mb-1">EDUCATION</h2>
                    {(
                      (sections.find((s) => s.type === 'education')?.data.items as Record<
                        string,
                        unknown
                      >[]) || []
                    )
                      .slice(0, 1)
                      .map((item, i) => (
                        <div key={i}>
                          <span className="font-semibold text-[8px]">{item.degree as string}</span>
                          <p className="text-[7px] text-gray-600">{item.institution as string}</p>
                        </div>
                      ))}
                  </div>

                  {/* Skills */}
                  <div>
                    <h2 className="text-[9px] font-bold border-b pb-0.5 mb-1">SKILLS</h2>
                    <div className="flex flex-wrap gap-0.5">
                      {(
                        (sections.find((s) => s.type === 'skills')?.data.categories as Record<
                          string,
                          unknown
                        >[]) || []
                      )
                        .flatMap((cat) => (cat.skills as string[]) || [])
                        .slice(0, 10)
                        .map((skill, i) => (
                          <span
                            key={i}
                            className="px-1 py-0.5 bg-gray-100 text-[6px] rounded"
                          >
                            {skill}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  Full Preview
                </Button>
                <Button size="sm" className="flex-1">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
                Resume Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Use action verbs like "Led", "Built", "Improved"
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Include quantifiable achievements with numbers
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Tailor your resume for each job application
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Keep it concise - 1 page for students
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
