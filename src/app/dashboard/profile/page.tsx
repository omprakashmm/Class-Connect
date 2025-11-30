'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  GraduationCap,
  Briefcase,
  Award,
  BookOpen,
  Target,
  TrendingUp,
  Edit,
  Camera,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Clock,
  Flame,
  Save,
  X,
  Link as LinkIcon,
  Upload,
  Home,
  ArrowLeft
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { useAuth } from '@/contexts/auth-context'
import { getInitials } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'

interface ProfileData {
  name: string
  email: string
  phone: string
  location: string
  bio: string
  university: string
  major: string
  graduationYear: string
  position: string
  company: string
  github: string
  linkedin: string
  twitter: string
  website: string
  avatar: string
}

export default function ProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEditMode, setIsEditMode] = useState(false)
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate computer science student focused on full-stack development and machine learning. Love building projects that solve real-world problems and collaborating with fellow students.',
    university: 'Stanford University',
    major: 'Computer Science',
    graduationYear: '2026',
    position: 'Software Engineering Intern',
    company: 'Tech Startup',
    github: 'https://github.com/username',
    linkedin: 'https://linkedin.com/in/username',
    twitter: 'https://twitter.com/username',
    website: 'https://myportfolio.com',
    avatar: user?.avatar || ''
  })

  const stats = [
    { label: 'Tasks Completed', value: '127', icon: Target, change: '+12%' },
    { label: 'Study Hours', value: '340', icon: Clock, change: '+8%' },
    { label: 'Current Streak', value: user?.streak || 0, icon: Flame, change: 'days' },
    { label: 'Productivity', value: `${user?.productivityScore || 0}%`, icon: TrendingUp, change: '+5%' },
  ]

  const achievements = [
    { title: 'Early Bird', description: 'Complete 10 tasks before 9 AM', icon: '🌅', earned: true },
    { title: 'Study Streak', description: 'Maintain 7-day study streak', icon: '🔥', earned: true },
    { title: 'Team Player', description: 'Join 5 study groups', icon: '👥', earned: true },
    { title: 'Quick Learner', description: 'Complete 10 courses', icon: '⚡', earned: false },
    { title: 'Focus Master', description: '100 Pomodoro sessions', icon: '🎯', earned: false },
    { title: 'Helpful Peer', description: 'Help 20 group members', icon: '🤝', earned: false },
  ]

  const recentActivity = [
    { action: 'Completed task', details: 'Data Structures Assignment', time: '2 hours ago', icon: Target },
    { action: 'Joined group', details: 'CS101 Study Group', time: '5 hours ago', icon: User },
    { action: 'Finished course', details: 'React Fundamentals', time: '1 day ago', icon: BookOpen },
    { action: 'Earned achievement', details: 'Study Streak (7 days)', time: '2 days ago', icon: Award },
  ]

  const handleSaveProfile = () => {
    // In a real app, this would save to backend
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been successfully updated.',
    })
    setIsEditMode(false)
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploadingPhoto(true)
      // Simulate upload
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileData({ ...profileData, avatar: reader.result as string })
        setIsUploadingPhoto(false)
        toast({
          title: 'Photo Updated',
          description: 'Your profile photo has been updated.',
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData({ ...profileData, [field]: value })
  }

  const courses = [
    { title: 'Data Structures & Algorithms', progress: 75, status: 'In Progress' },
    { title: 'Web Development Bootcamp', progress: 100, status: 'Completed' },
    { title: 'Machine Learning Basics', progress: 45, status: 'In Progress' },
    { title: 'Database Management', progress: 30, status: 'In Progress' },
  ]

  const skills = [
    { name: 'React', level: 85 },
    { name: 'TypeScript', level: 75 },
    { name: 'Python', level: 70 },
    { name: 'Data Structures', level: 80 },
    { name: 'Machine Learning', level: 60 },
    { name: 'UI/UX Design', level: 65 },
  ]

  if (!user) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link href="/dashboard">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 lg:p-8"
      >
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
          <div className="relative group">
            <Avatar className="h-32 w-32 border-4 border-primary/20">
              <AvatarImage src={profileData.avatar} />
              <AvatarFallback className="text-3xl">{getInitials(profileData.name)}</AvatarFallback>
            </Avatar>
            <label htmlFor="avatar-upload" className="cursor-pointer">
              <div className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                {isUploadingPhoto ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Camera className="w-4 h-4" />
                )}
              </div>
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{profileData.name}</h1>
                <Badge className="gradient-primary text-white border-0">Professional</Badge>
              </div>
              <p className="text-muted-foreground">
                {profileData.major} Student · {profileData.university}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {profileData.email}
              </div>
              {profileData.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {profileData.phone}
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {profileData.location}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Joined Nov 2024
              </div>
            </div>

            <div className="flex gap-2">
              {profileData.github && (
                <a href={profileData.github} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                </a>
              )}
              {profileData.linkedin && (
                <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                </a>
              )}
              {profileData.twitter && (
                <a href={profileData.twitter} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                </a>
              )}
              {profileData.website && (
                <a href={profileData.website} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    <Globe className="w-4 h-4 mr-2" />
                    Website
                  </Button>
                </a>
              )}
            </div>
          </div>

          <div>
            <Button onClick={() => setIsEditMode(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditMode} onOpenChange={setIsEditMode}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your professional profile information
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="San Francisco, CA"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={4}
                />
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Academic Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="university">University *</Label>
                  <Input
                    id="university"
                    value={profileData.university}
                    onChange={(e) => handleInputChange('university', e.target.value)}
                    placeholder="Stanford University"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="major">Major *</Label>
                  <Input
                    id="major"
                    value={profileData.major}
                    onChange={(e) => handleInputChange('major', e.target.value)}
                    placeholder="Computer Science"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="graduationYear">Expected Graduation Year</Label>
                <Input
                  id="graduationYear"
                  value={profileData.graduationYear}
                  onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                  placeholder="2026"
                />
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Professional Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Current Position</Label>
                  <Input
                    id="position"
                    value={profileData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    placeholder="Software Engineering Intern"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={profileData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="Tech Startup"
                  />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Social Links</h3>
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="github" className="flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    GitHub Profile
                  </Label>
                  <Input
                    id="github"
                    value={profileData.github}
                    onChange={(e) => handleInputChange('github', e.target.value)}
                    placeholder="https://github.com/username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    LinkedIn Profile
                  </Label>
                  <Input
                    id="linkedin"
                    value={profileData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter" className="flex items-center gap-2">
                    <Twitter className="w-4 h-4" />
                    Twitter Profile
                  </Label>
                  <Input
                    id="twitter"
                    value={profileData.twitter}
                    onChange={(e) => handleInputChange('twitter', e.target.value)}
                    placeholder="https://twitter.com/username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Personal Website
                  </Label>
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://myportfolio.com"
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditMode(false)}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSaveProfile}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                  <Badge variant="secondary" className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="glass">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {profileData.bio}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">{profileData.university}</div>
                      <div className="text-xs text-muted-foreground">
                        B.S. {profileData.major} · Class of {profileData.graduationYear}
                      </div>
                    </div>
                  </div>
                  {profileData.position && profileData.company && (
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">{profileData.position}</div>
                        <div className="text-xs text-muted-foreground">{profileData.company}</div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
                <CardDescription>Your top technical skills</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest actions and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 last:pb-0 border-b last:border-0">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <activity.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{activity.action}</div>
                      <div className="text-sm text-muted-foreground">{activity.details}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Courses</CardTitle>
              <CardDescription>Track your learning progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {courses.map((course) => (
                  <div key={course.title} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{course.title}</div>
                        <div className="text-sm text-muted-foreground">{course.status}</div>
                      </div>
                      <Badge variant={course.status === 'Completed' ? 'default' : 'secondary'}>
                        {course.progress}%
                      </Badge>
                    </div>
                    <Progress value={course.progress} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={achievement.earned ? 'border-primary' : 'opacity-60'}>
                  <CardContent className="p-6 text-center space-y-3">
                    <div className="text-5xl mb-2">{achievement.icon}</div>
                    <div>
                      <div className="font-semibold">{achievement.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {achievement.description}
                      </div>
                    </div>
                    {achievement.earned && (
                      <Badge className="mt-2 gradient-primary text-white border-0">
                        Earned
                      </Badge>
                    )}
                    {!achievement.earned && (
                      <Badge variant="outline" className="mt-2">
                        Locked
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
              <CardDescription>Your complete activity history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...recentActivity, ...recentActivity].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 last:pb-0 border-b last:border-0">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <activity.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{activity.action}</div>
                      <div className="text-sm text-muted-foreground">{activity.details}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
