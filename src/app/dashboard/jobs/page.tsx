'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Briefcase,
  Search,
  MapPin,
  Clock,
  DollarSign,
  Building2,
  BookmarkPlus,
  ExternalLink,
  Filter,
  TrendingUp,
  Sparkles,
  Users,
  Calendar,
  GraduationCap,
  Zap,
  Home,
  ChevronRight,
  Heart,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Job {
  id: string
  title: string
  company: string
  companyLogo: string
  location: string
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract' | 'Remote'
  salary: string
  posted: string
  description: string
  requirements: string[]
  skills: string[]
  applicants: number
  isBookmarked: boolean
  isEasyApply: boolean
  matchScore?: number
}

const jobs: Job[] = [
  {
    id: '1',
    title: 'Software Engineer Intern',
    company: 'Google',
    companyLogo: '🔵',
    location: 'Mountain View, CA',
    type: 'Internship',
    salary: '$8,000/month',
    posted: '2 days ago',
    description:
      "Join Google's engineering team and work on products used by billions. You'll collaborate with experienced engineers on challenging technical problems.",
    requirements: [
      'Currently pursuing BS/MS in Computer Science or related field',
      'Strong programming skills in one or more languages',
      'Excellent problem-solving abilities',
      'Expected graduation in 2025 or 2026',
    ],
    skills: ['Python', 'Java', 'Data Structures', 'Algorithms'],
    applicants: 1250,
    isBookmarked: true,
    isEasyApply: true,
    matchScore: 92,
  },
  {
    id: '2',
    title: 'Frontend Developer',
    company: 'Meta',
    companyLogo: '🔷',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120,000 - $180,000',
    posted: '1 week ago',
    description:
      "Build the next generation of social experiences. Work on React applications that serve billions of users worldwide.",
    requirements: [
      "Bachelor's degree in Computer Science or equivalent",
      '2+ years of experience with React',
      'Strong JavaScript/TypeScript skills',
      'Experience with modern frontend tooling',
    ],
    skills: ['React', 'TypeScript', 'JavaScript', 'GraphQL', 'CSS'],
    applicants: 856,
    isBookmarked: false,
    isEasyApply: true,
    matchScore: 85,
  },
  {
    id: '3',
    title: 'Data Science Intern',
    company: 'Amazon',
    companyLogo: '📦',
    location: 'Seattle, WA',
    type: 'Internship',
    salary: '$7,500/month',
    posted: '3 days ago',
    description:
      "Work with Amazon's vast datasets to derive insights and build machine learning models that power recommendations.",
    requirements: [
      'Pursuing degree in Data Science, Statistics, or related field',
      'Proficiency in Python and SQL',
      'Experience with ML frameworks',
      'Strong analytical skills',
    ],
    skills: ['Python', 'SQL', 'Machine Learning', 'Pandas', 'TensorFlow'],
    applicants: 678,
    isBookmarked: true,
    isEasyApply: false,
    matchScore: 78,
  },
  {
    id: '4',
    title: 'Product Manager',
    company: 'Microsoft',
    companyLogo: '🪟',
    location: 'Redmond, WA',
    type: 'Full-time',
    salary: '$140,000 - $200,000',
    posted: '5 days ago',
    description:
      'Lead product strategy and development for Azure cloud services. Work with engineering and design teams to deliver world-class products.',
    requirements: [
      'MBA or equivalent experience',
      '3+ years of product management experience',
      'Technical background preferred',
      'Excellent communication skills',
    ],
    skills: ['Product Strategy', 'Agile', 'Azure', 'Data Analysis'],
    applicants: 423,
    isBookmarked: false,
    isEasyApply: true,
    matchScore: 65,
  },
  {
    id: '5',
    title: 'Machine Learning Engineer',
    company: 'OpenAI',
    companyLogo: '🤖',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$200,000 - $350,000',
    posted: '1 day ago',
    description:
      'Push the boundaries of AI research and development. Build and train large language models and work on cutting-edge AI systems.',
    requirements: [
      'PhD in ML, AI, or related field (or equivalent experience)',
      'Publications in top ML conferences',
      'Experience with large-scale distributed systems',
      'Strong Python and PyTorch skills',
    ],
    skills: ['PyTorch', 'Transformers', 'NLP', 'Distributed Systems', 'Python'],
    applicants: 2340,
    isBookmarked: true,
    isEasyApply: false,
    matchScore: 88,
  },
  {
    id: '6',
    title: 'UX Design Intern',
    company: 'Apple',
    companyLogo: '🍎',
    location: 'Cupertino, CA',
    type: 'Internship',
    salary: '$6,500/month',
    posted: '1 week ago',
    description:
      "Design intuitive and beautiful user experiences for Apple's products and services. Work alongside world-class designers.",
    requirements: [
      'Pursuing degree in Design, HCI, or related field',
      'Strong portfolio demonstrating UX work',
      'Proficiency in Figma or Sketch',
      'Understanding of design systems',
    ],
    skills: ['Figma', 'UI Design', 'Prototyping', 'User Research'],
    applicants: 567,
    isBookmarked: false,
    isEasyApply: true,
    matchScore: 72,
  },
  {
    id: '7',
    title: 'Backend Engineer',
    company: 'Stripe',
    companyLogo: '💳',
    location: 'Remote',
    type: 'Full-time',
    salary: '$150,000 - $220,000',
    posted: '4 days ago',
    description:
      "Build the infrastructure that powers internet commerce. Work on APIs and systems that handle billions of dollars.",
    requirements: [
      '4+ years of backend development experience',
      'Strong knowledge of distributed systems',
      'Experience with Ruby, Go, or Java',
      'Understanding of financial systems',
    ],
    skills: ['Ruby', 'Go', 'PostgreSQL', 'Kubernetes', 'AWS'],
    applicants: 789,
    isBookmarked: false,
    isEasyApply: true,
    matchScore: 81,
  },
  {
    id: '8',
    title: 'DevOps Engineer',
    company: 'Netflix',
    companyLogo: '🎬',
    location: 'Los Gatos, CA',
    type: 'Full-time',
    salary: '$160,000 - $250,000',
    posted: '6 days ago',
    description:
      "Build and maintain Netflix's world-class streaming infrastructure. Work on systems that deliver entertainment to millions.",
    requirements: [
      '5+ years of DevOps/SRE experience',
      'Expert in AWS and cloud infrastructure',
      'Experience with container orchestration',
      'Strong scripting skills',
    ],
    skills: ['AWS', 'Kubernetes', 'Terraform', 'Python', 'CI/CD'],
    applicants: 445,
    isBookmarked: false,
    isEasyApply: false,
    matchScore: 76,
  },
]

const jobTypes = ['All Types', 'Full-time', 'Part-time', 'Internship', 'Contract', 'Remote']

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [locationQuery, setLocationQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('All Types')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [savedJobs, setSavedJobs] = useState<Set<string>>(
    new Set(jobs.filter((j) => j.isBookmarked).map((j) => j.id))
  )

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesLocation =
      !locationQuery || job.location.toLowerCase().includes(locationQuery.toLowerCase())
    const matchesType = typeFilter === 'All Types' || job.type === typeFilter
    return matchesSearch && matchesLocation && matchesType
  })

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(jobId)) {
        newSet.delete(jobId)
      } else {
        newSet.add(jobId)
      }
      return newSet
    })
  }

  const getMatchColor = (score: number) => {
    if (score >= 80) return 'text-green-500'
    if (score >= 60) return 'text-yellow-500'
    return 'text-red-500'
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
      >
        <h1 className="text-3xl font-bold flex items-center">
          <Briefcase className="w-8 h-8 mr-3 text-primary" />
          Jobs Portal
        </h1>
        <p className="text-muted-foreground mt-1">
          Discover internships and job opportunities tailored for you
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-4 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Briefcase className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">{jobs.length}</div>
              <div className="text-xs text-muted-foreground">Available Jobs</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-green-500/10">
              <GraduationCap className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">
                {jobs.filter((j) => j.type === 'Internship').length}
              </div>
              <div className="text-xs text-muted-foreground">Internships</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Zap className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">
                {jobs.filter((j) => j.isEasyApply).length}
              </div>
              <div className="text-xs text-muted-foreground">Easy Apply</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-orange-500/10">
              <Heart className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">{savedJobs.size}</div>
              <div className="text-xs text-muted-foreground">Saved Jobs</div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Top Match */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-primary" />
              Top Match For You
            </CardTitle>
            <CardDescription>Based on your profile and skills</CardDescription>
          </CardHeader>
          <CardContent>
            {jobs
              .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
              .slice(0, 1)
              .map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-background/80 cursor-pointer hover:bg-background transition-colors"
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{job.companyLogo}</div>
                    <div>
                      <h3 className="font-semibold">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {job.company} • {job.location}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary">{job.type}</Badge>
                        <span className="text-sm font-medium text-green-500">
                          {job.matchScore}% Match
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" onClick={() => toggleSaveJob(job.id)}>
                      <BookmarkPlus
                        className={`w-4 h-4 mr-1 ${
                          savedJobs.has(job.id) ? 'fill-primary text-primary' : ''
                        }`}
                      />
                      Save
                    </Button>
                    <Button>Apply Now</Button>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search jobs, companies, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="relative md:w-64">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Location..."
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="md:w-40">
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            {jobTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* Jobs Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Jobs</TabsTrigger>
          <TabsTrigger value="internships">Internships</TabsTrigger>
          <TabsTrigger value="saved">
            Saved ({savedJobs.size})
          </TabsTrigger>
          <TabsTrigger value="recommended">
            <Sparkles className="w-4 h-4 mr-1" />
            Recommended
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className="cursor-pointer hover:shadow-md transition-all"
                onClick={() => setSelectedJob(job)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{job.companyLogo}</div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold hover:text-primary transition-colors">
                            {job.title}
                          </h3>
                          {job.isEasyApply && (
                            <Badge variant="secondary" className="text-xs">
                              <Zap className="w-3 h-3 mr-1" />
                              Easy Apply
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {job.salary}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {job.posted}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {job.applicants} applicants
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {job.skills.slice(0, 4).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {job.skills.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{job.skills.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge variant={job.type === 'Internship' ? 'default' : 'secondary'}>
                        {job.type}
                      </Badge>
                      {job.matchScore && (
                        <span className={`text-sm font-medium ${getMatchColor(job.matchScore)}`}>
                          {job.matchScore}% Match
                        </span>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleSaveJob(job.id)
                        }}
                      >
                        <BookmarkPlus
                          className={`w-5 h-5 ${
                            savedJobs.has(job.id) ? 'fill-primary text-primary' : ''
                          }`}
                        />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          {filteredJobs.length === 0 && (
            <Card className="p-12 text-center">
              <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg">No jobs found</h3>
              <p className="text-muted-foreground mt-1">
                Try adjusting your search or filters
              </p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="internships" className="space-y-4">
          {jobs
            .filter((j) => j.type === 'Internship')
            .map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className="cursor-pointer hover:shadow-md transition-all"
                  onClick={() => setSelectedJob(job)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">{job.companyLogo}</div>
                        <div>
                          <h3 className="font-semibold">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {job.company} • {job.location}
                          </p>
                          <p className="text-sm font-medium text-primary mt-1">{job.salary}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          {jobs
            .filter((j) => savedJobs.has(j.id))
            .map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className="cursor-pointer hover:shadow-md transition-all"
                  onClick={() => setSelectedJob(job)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">{job.companyLogo}</div>
                        <div>
                          <h3 className="font-semibold">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {job.company} • {job.location}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleSaveJob(job.id)
                        }}
                      >
                        <BookmarkPlus className="w-5 h-5 fill-primary text-primary" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          {savedJobs.size === 0 && (
            <Card className="p-12 text-center">
              <BookmarkPlus className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg">No saved jobs</h3>
              <p className="text-muted-foreground mt-1">Save jobs to view them later</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recommended" className="space-y-4">
          {jobs
            .filter((j) => (j.matchScore || 0) >= 75)
            .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
            .map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className="cursor-pointer hover:shadow-md transition-all border-primary/20"
                  onClick={() => setSelectedJob(job)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">{job.companyLogo}</div>
                        <div>
                          <h3 className="font-semibold">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {job.company} • {job.location}
                          </p>
                          <div className="flex items-center mt-1">
                            <Sparkles className="w-4 h-4 mr-1 text-primary" />
                            <span className="text-sm font-medium text-green-500">
                              {job.matchScore}% Match
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button>Apply</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </TabsContent>
      </Tabs>

      {/* Job Details Dialog */}
      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh]">
          {selectedJob && (
            <>
              <DialogHeader>
                <div className="flex items-start space-x-4">
                  <div className="text-5xl">{selectedJob.companyLogo}</div>
                  <div>
                    <DialogTitle className="text-xl">{selectedJob.title}</DialogTitle>
                    <DialogDescription className="flex items-center space-x-2 mt-1">
                      <Building2 className="w-4 h-4" />
                      <span>{selectedJob.company}</span>
                      <span>•</span>
                      <MapPin className="w-4 h-4" />
                      <span>{selectedJob.location}</span>
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <ScrollArea className="max-h-96 pr-4">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge>{selectedJob.type}</Badge>
                    <Badge variant="outline">{selectedJob.salary}</Badge>
                    <Badge variant="outline">
                      <Clock className="w-3 h-3 mr-1" />
                      {selectedJob.posted}
                    </Badge>
                    <Badge variant="outline">
                      <Users className="w-3 h-3 mr-1" />
                      {selectedJob.applicants} applicants
                    </Badge>
                    {selectedJob.matchScore && (
                      <Badge variant="secondary" className={getMatchColor(selectedJob.matchScore)}>
                        {selectedJob.matchScore}% Match
                      </Badge>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground">{selectedJob.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Requirements</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {selectedJob.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={() => toggleSaveJob(selectedJob.id)}
                  className="w-full sm:w-auto"
                >
                  <BookmarkPlus
                    className={`w-4 h-4 mr-2 ${
                      savedJobs.has(selectedJob.id) ? 'fill-primary text-primary' : ''
                    }`}
                  />
                  {savedJobs.has(selectedJob.id) ? 'Saved' : 'Save Job'}
                </Button>
                <Button variant="outline" className="w-full sm:w-auto">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Company Site
                </Button>
                <Button className="w-full sm:w-auto" variant="gradient">
                  {selectedJob.isEasyApply ? (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Easy Apply
                    </>
                  ) : (
                    'Apply Now'
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
