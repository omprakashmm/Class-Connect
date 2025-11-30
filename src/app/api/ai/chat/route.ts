import { NextRequest, NextResponse } from 'next/server'

// Mock AI responses for different models
const modelResponses: Record<string, (prompt: string) => string> = {
  'gpt-4': (prompt) => {
    return `[GPT-4 Response]\n\nI've analyzed your question: "${prompt.slice(0, 50)}..."\n\nHere's my response:\n\nThis is a simulated GPT-4 response. In production, this would connect to the OpenAI API to provide intelligent responses to your academic questions.\n\nKey points:\n1. AI-powered analysis of your query\n2. Context-aware responses\n3. Academic assistance and explanations`
  },
  'gpt-3.5-turbo': (prompt) => {
    return `[GPT-3.5 Response]\n\nRegarding your question about "${prompt.slice(0, 50)}..."\n\nThis is a simulated GPT-3.5-turbo response. It provides fast and efficient answers for general questions.\n\nIn production, this connects to the OpenAI API.`
  },
  'gemini-pro': (prompt) => {
    return `[Gemini Pro Response]\n\nAnalyzing: "${prompt.slice(0, 50)}..."\n\nThis is a simulated Google Gemini Pro response. In production, this would connect to the Google AI API.\n\nGemini excels at:\n- Multi-modal understanding\n- Complex reasoning\n- Academic research assistance`
  },
  'claude-3': (prompt) => {
    return `[Claude 3 Response]\n\nThank you for your question: "${prompt.slice(0, 50)}..."\n\nThis is a simulated Claude 3 response. In production, this would connect to the Anthropic API.\n\nClaude is known for:\n- Nuanced understanding\n- Helpful and harmless responses\n- Academic writing assistance`
  },
  'run-anywhere': (prompt) => {
    return `[RunAnywhere Response]\n\nProcessing: "${prompt.slice(0, 50)}..."\n\nThis is a simulated RunAnywhere response. This service provides:\n- Code execution\n- Multi-language support\n- Cloud computing capabilities`
  },
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, model = 'gpt-4' } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // In production, you would call the actual AI APIs here
    // For demo purposes, we return mock responses
    
    // Simulate API latency
    await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000))

    const responseGenerator = modelResponses[model] || modelResponses['gpt-4']
    const response = responseGenerator(message)

    return NextResponse.json({
      success: true,
      response,
      model,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('AI Chat Error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    models: [
      { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI' },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI' },
      { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google' },
      { id: 'claude-3', name: 'Claude 3', provider: 'Anthropic' },
      { id: 'run-anywhere', name: 'RunAnywhere', provider: 'Custom' },
    ],
  })
}
