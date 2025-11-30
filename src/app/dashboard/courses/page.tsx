'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  BookOpen,
  Search,
  Filter,
  Star,
  Clock,
  Users,
  Play,
  BookmarkPlus,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Award,
  Video,
  FileText,
  Code,
  Home,
  Palette,
  BarChart,
  Brain,
  Globe,
  Lightbulb,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  thumbnail: string
  rating: number
  reviews: number
  students: number
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  category: string
  price: number | 'Free'
  progress?: number
  tags: string[]
  isBookmarked: boolean
}

const categories = [
  { id: 'all', name: 'All Courses', icon: BookOpen },
  { id: 'programming', name: 'Programming', icon: Code },
  { id: 'data-science', name: 'Data Science', icon: BarChart },
  { id: 'ai-ml', name: 'AI & ML', icon: Brain },
  { id: 'web-dev', name: 'Web Development', icon: Globe },
  { id: 'design', name: 'Design', icon: Palette },
]

const courses: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn HTML, CSS, JavaScript, React, Node.js and more. Build real-world projects.',
    instructor: 'Dr. Angela Yu',
    thumbnail: '🌐',
    rating: 4.9,
    reviews: 15420,
    students: 245000,
    duration: '65 hours',
    level: 'Beginner',
    category: 'web-dev',
    price: 'Free',
    progress: 35,
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
    isBookmarked: true,
  },
  {
    id: '2',
    title: 'Machine Learning A-Z',
    description: 'Master Machine Learning with Python and R. Build intelligent applications.',
    instructor: 'Kirill Eremenko',
    thumbnail: '🤖',
    rating: 4.8,
    reviews: 12350,
    students: 180000,
    duration: '44 hours',
    level: 'Intermediate',
    category: 'ai-ml',
    price: 49.99,
    tags: ['Python', 'Machine Learning', 'TensorFlow'],
    isBookmarked: false,
  },
  {
    id: '3',
    title: 'Python for Data Science',
    description: 'Complete Python programming for data analysis, visualization, and machine learning.',
    instructor: 'Jose Portilla',
    thumbnail: '📊',
    rating: 4.7,
    reviews: 9800,
    students: 156000,
    duration: '38 hours',
    level: 'Beginner',
    category: 'data-science',
    price: 'Free',
    progress: 78,
    tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
    isBookmarked: true,
  },
  {
    id: '4',
    title: 'React - The Complete Guide',
    description: 'Dive into React.js! Learn Hooks, Redux, React Router, Next.js and more.',
    instructor: 'Maximilian Schwarzmüller',
    thumbnail: '⚛️',
    rating: 4.9,
    reviews: 18200,
    students: 320000,
    duration: '48 hours',
    level: 'Intermediate',
    category: 'web-dev',
    price: 59.99,
    tags: ['React', 'Redux', 'Next.js', 'TypeScript'],
    isBookmarked: false,
  },
  {
    id: '5',
    title: 'Deep Learning Specialization',
    description: 'Master Deep Learning with Andrew Ng. Build neural networks and AI systems.',
    instructor: 'Andrew Ng',
    thumbnail: '🧠',
    rating: 4.9,
    reviews: 25600,
    students: 450000,
    duration: '80 hours',
    level: 'Advanced',
    category: 'ai-ml',
    price: 79.99,
    tags: ['Deep Learning', 'Neural Networks', 'TensorFlow'],
    isBookmarked: false,
  },
  {
    id: '6',
    title: 'UI/UX Design Masterclass',
    description: 'Learn Figma, design systems, and create stunning user interfaces.',
    instructor: 'Daniel Walter Scott',
    thumbnail: '🎨',
    rating: 4.8,
    reviews: 7650,
    students: 98000,
    duration: '32 hours',
    level: 'Beginner',
    category: 'design',
    price: 'Free',
    tags: ['Figma', 'UI Design', 'UX', 'Prototyping'],
    isBookmarked: true,
  },
  {
    id: '7',
    title: 'Data Structures & Algorithms',
    description: 'Master DSA with 100+ coding problems. Prepare for technical interviews.',
    instructor: 'Abdul Bari',
    thumbnail: '🔢',
    rating: 4.8,
    reviews: 11200,
    students: 175000,
    duration: '42 hours',
    level: 'Intermediate',
    category: 'programming',
    price: 39.99,
    progress: 15,
    tags: ['DSA', 'Algorithms', 'Interview Prep'],
    isBookmarked: true,
  },
  {
    id: '8',
    title: 'AWS Certified Solutions Architect',
    description: 'Complete guide to passing the AWS Solutions Architect certification.',
    instructor: 'Stephane Maarek',
    thumbnail: '☁️',
    rating: 4.9,
    reviews: 14300,
    students: 220000,
    duration: '55 hours',
    level: 'Intermediate',
    category: 'programming',
    price: 69.99,
    tags: ['AWS', 'Cloud', 'DevOps'],
    isBookmarked: false,
  },
]

const aiRecommendations = [
  {
    title: 'Based on your recent activity',
    courses: ['3', '7'],
    reason: "You've been studying Python and algorithms",
  },
  {
    title: 'Popular in your field',
    courses: ['4', '5'],
    reason: 'Trending among Computer Science students',
  },
]

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [levelFilter, setLevelFilter] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')
  const [bookmarkedCourses, setBookmarkedCourses] = useState<Set<string>>(
    new Set(courses.filter((c) => c.isBookmarked).map((c) => c.id))
  )

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
    const matchesLevel = levelFilter === 'all' || course.level.toLowerCase() === levelFilter
    const matchesPrice =
      priceFilter === 'all' ||
      (priceFilter === 'free' && course.price === 'Free') ||
      (priceFilter === 'paid' && course.price !== 'Free')
    return matchesSearch && matchesCategory && matchesLevel && matchesPrice
  })

  const inProgressCourses = courses.filter((c) => c.progress && c.progress > 0)

  const toggleBookmark = (courseId: string) => {
    setBookmarkedCourses((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(courseId)) {
        newSet.delete(courseId)
      } else {
        newSet.add(courseId)
      }
      return newSet
    })
  }

  const CourseCard = ({ course }: { course: Course }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-all group">
      <CardContent className="p-0">
        <div className="relative">
          <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-6xl">
            {course.thumbnail}
          </div>
          <Badge
            className="absolute top-2 right-2"
            variant={course.price === 'Free' ? 'default' : 'secondary'}
          >
            {course.price === 'Free' ? 'Free' : `$${course.price}`}
          </Badge>
          <button
            onClick={() => toggleBookmark(course.id)}
            className="absolute top-2 left-2 p-1.5 rounded-full bg-background/80 hover:bg-background transition-colors"
          >
            <BookmarkPlus
              className={`w-4 h-4 ${
                bookmarkedCourses.has(course.id) ? 'fill-primary text-primary' : ''
              }`}
            />
          </button>
        </div>
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {course.level}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {course.duration}
            </span>
          </div>
          <h3 className="font-semibold line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">{course.instructor}</p>
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium ml-1">{course.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              ({course.reviews.toLocaleString()} reviews)
            </span>
          </div>
          <div className="flex items-center text-xs text-muted-foreground mb-3">
            <Users className="w-3 h-3 mr-1" />
            {course.students.toLocaleString()} students
          </div>
          {course.progress !== undefined && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-1.5" />
            </div>
          )}
          <div className="flex flex-wrap gap-1 mt-3">
            {course.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )

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
          <BookOpen className="w-8 h-8 mr-3 text-primary" />
          Courses Explorer
        </h1>
        <p className="text-muted-foreground mt-1">
          Discover courses to enhance your skills and knowledge
        </p>
      </motion.div>

      {/* Continue Learning */}
      {inProgressCourses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Play className="w-5 h-5 mr-2 text-primary" />
                Continue Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {inProgressCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                  >
                    <div className="text-3xl">{course.thumbnail}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{course.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Progress value={course.progress} className="h-1.5 flex-1" />
                        <span className="text-xs text-muted-foreground">{course.progress}%</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-primary" />
              AI Recommended For You
            </CardTitle>
            <CardDescription>Personalized course suggestions based on your learning path</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {courses
                .filter((c) => aiRecommendations[0].courses.includes(c.id))
                .map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-background/80 hover:bg-background transition-colors cursor-pointer"
                  >
                    <div className="text-4xl">{course.thumbnail}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{course.title}</h4>
                      <p className="text-sm text-muted-foreground">{course.instructor}</p>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm ml-1">{course.rating}</span>
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {course.level}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Play className="w-4 h-4 mr-1" />
                      Start
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search courses, topics, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category Tabs */}
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

      {/* Course Grid */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="bookmarked">
            Bookmarked ({bookmarkedCourses.size})
          </TabsTrigger>
          <TabsTrigger value="trending">
            <TrendingUp className="w-4 h-4 mr-1" />
            Trending
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>
          {filteredCourses.length === 0 && (
            <Card className="p-12 text-center">
              <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg">No courses found</h3>
              <p className="text-muted-foreground mt-1">
                Try adjusting your search or filters
              </p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="bookmarked">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {courses
              .filter((c) => bookmarkedCourses.has(c.id))
              .map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
          </motion.div>
          {bookmarkedCourses.size === 0 && (
            <Card className="p-12 text-center">
              <BookmarkPlus className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg">No bookmarked courses</h3>
              <p className="text-muted-foreground mt-1">
                Save courses to view them later
              </p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="trending">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {courses
              .sort((a, b) => b.students - a.students)
              .slice(0, 4)
              .map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
