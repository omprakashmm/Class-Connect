// API client for ClassConnect

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: Record<string, unknown>
  headers?: Record<string, string>
}

class ApiClient {
  private baseUrl: string
  private defaultHeaders: Record<string, string>

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('auth-token')
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, headers = {} } = options

    const authToken = this.getAuthToken()
    const requestHeaders: Record<string, string> = {
      ...this.defaultHeaders,
      ...headers,
    }

    if (authToken) {
      requestHeaders['Authorization'] = `Bearer ${authToken}`
    }

    const config: RequestInit = {
      method,
      headers: requestHeaders,
    }

    if (body && method !== 'GET') {
      config.body = JSON.stringify(body)
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, config)

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }))
      throw new Error(error.error || 'Request failed')
    }

    return response.json()
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    })
  }

  async register(name: string, email: string, password: string) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: { name, email, password },
    })
  }

  // Tasks endpoints
  async getTasks(filters?: { status?: string; priority?: string; category?: string }) {
    const params = new URLSearchParams()
    if (filters?.status) params.append('status', filters.status)
    if (filters?.priority) params.append('priority', filters.priority)
    if (filters?.category) params.append('category', filters.category)
    
    const query = params.toString()
    return this.request(`/api/tasks${query ? `?${query}` : ''}`)
  }

  async createTask(task: {
    title: string
    description?: string
    priority?: string
    category?: string
    dueDate?: string
  }) {
    return this.request('/api/tasks', {
      method: 'POST',
      body: task,
    })
  }

  async updateTask(id: string, updates: Record<string, unknown>) {
    return this.request('/api/tasks', {
      method: 'PUT',
      body: { id, ...updates },
    })
  }

  async deleteTask(id: string) {
    return this.request(`/api/tasks?id=${id}`, {
      method: 'DELETE',
    })
  }

  // Groups endpoints
  async getGroups(category?: string) {
    const query = category ? `?category=${category}` : ''
    return this.request(`/api/groups${query}`)
  }

  async createGroup(group: {
    name: string
    description?: string
    category?: string
    isPrivate?: boolean
  }) {
    return this.request('/api/groups', {
      method: 'POST',
      body: group,
    })
  }

  async deleteGroup(id: string) {
    return this.request(`/api/groups?id=${id}`, {
      method: 'DELETE',
    })
  }

  // AI Chat endpoints
  async sendAIMessage(message: string, model: string = 'gpt-4') {
    return this.request('/api/ai/chat', {
      method: 'POST',
      body: { message, model },
    })
  }

  async getAIModels() {
    return this.request('/api/ai/chat')
  }

  // Focus endpoints
  async getFocusStats(userId?: string, period?: string) {
    const params = new URLSearchParams()
    if (userId) params.append('userId', userId)
    if (period) params.append('period', period)
    
    const query = params.toString()
    return this.request(`/api/focus${query ? `?${query}` : ''}`)
  }

  async saveFocusSession(session: {
    duration: number
    mode: string
    userId?: string
  }) {
    return this.request('/api/focus', {
      method: 'POST',
      body: session,
    })
  }
}

export const apiClient = new ApiClient()
export default apiClient
