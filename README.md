# ClassConnect - Cloud AI Powered Academic Productivity & Collaboration Platform

<div align="center">
  
  **The Ultimate Academic Companion for Students**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
</div>

---

## 🚀 Features

### 🛠️ **30+ Embedded Tools Hub**
Access powerful tools without leaving the platform:
- **AI & Language**: ChatGPT, Gemini, Claude, RunAnywhere AI
- **Coding & IDE**: VS Code Web, GitHub, Replit, CodePen, JDoodle
- **ECE & VLSI**: Falstad Circuit Sim, EDA Playground, WaveDrom
- **Cloud & DevOps**: AWS Console, Docker Hub, Kubernetes Dashboard

### 🤖 **Multi-Model AI Chat**
Integrated AI assistants for academic help:
- GPT-4 & GPT-3.5 (OpenAI)
- Gemini Pro (Google)
- Claude 3 (Anthropic)
- RunAnywhere Custom Model

### ✅ **Smart Task Management**
- Create, edit, and organize tasks
- Priority levels (High, Medium, Low)
- Category-based organization
- Due date tracking
- Progress statistics

### 🎯 **Focus Mode (Pomodoro Timer)**
- Customizable focus sessions
- Short and long breaks
- Daily streak tracking
- Productivity score
- Weekly analytics
- Leaderboard competition

### 👥 **Study Groups**
- Create and join study groups
- Public and private groups
- Member management
- Real-time presence indicators
- File sharing capabilities

### 💬 **Real-Time Chat**
- Direct messaging
- Group conversations
- Online status indicators
- Typing indicators
- Message read receipts

### 📄 **AI-Powered Resume Builder**
- Drag-and-drop sections
- Multiple templates
- AI review and suggestions
- PDF export
- Live preview

### 📚 **Courses Explorer**
- Browse curated courses
- Filter by category and level
- AI-powered recommendations
- Progress tracking
- Bookmark favorites

### 💼 **Jobs Portal**
- Internships and job listings
- AI-powered job matching
- Easy apply functionality
- Save and track applications
- Skill-based recommendations

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS, CSS Variables |
| **UI Components** | Radix UI, ShadCN UI Pattern |
| **Animations** | Framer Motion |
| **State Management** | React Context, Zustand |
| **Forms** | React Hook Form, Zod |
| **Icons** | Lucide React |
| **Charts** | Recharts |
| **Drag & Drop** | @dnd-kit |

---

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/class-connect.git
cd class-connect

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# AI Services (Optional - Demo mode works without these)
OPENAI_API_KEY=your_openai_api_key
GOOGLE_AI_API_KEY=your_google_ai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key

# Database (Optional for demo)
DATABASE_URL=your_database_url
MONGODB_URI=your_mongodb_uri

# Auth (Optional for demo)
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

---

## 📁 Project Structure

```
class-connect/
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API routes
│   │   ├── auth/          # Authentication pages
│   │   ├── dashboard/     # Dashboard pages
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Landing page
│   ├── components/        # React components
│   │   ├── landing/       # Landing page components
│   │   └── ui/            # UI components (ShadCN-style)
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   └── types/             # TypeScript types
├── .env.example           # Environment variables template
├── next.config.js         # Next.js configuration
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

---

## 🎨 UI Components

ClassConnect uses a custom component library based on the ShadCN UI pattern:

- **Button** - Multiple variants (default, outline, ghost, gradient)
- **Card** - Content containers with headers and footers
- **Input/Textarea** - Form inputs with validation support
- **Dialog/Modal** - Overlay dialogs and modals
- **Tabs** - Tabbed content navigation
- **Select/Dropdown** - Selection components
- **Avatar** - User profile images
- **Badge** - Status indicators
- **Progress** - Progress bars
- **Toast** - Notification toasts
- **Tooltip** - Hover tooltips
- **Switch** - Toggle switches
- **ScrollArea** - Scrollable containers

---

## 🧪 Demo Mode

ClassConnect works in demo mode without any backend configuration:

1. **Demo Login**: Use `demo@classconnect.edu` with any password
2. **All features** work with mock data
3. **AI responses** are simulated for demo purposes
4. **Data persists** in local storage during session

---

## 📱 Responsive Design

ClassConnect is fully responsive and works on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1440px+)

---

## 🎯 Roadmap

### Coming Soon
- [ ] Real-time collaboration with Socket.IO
- [ ] Video conferencing integration
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Browser extension
- [ ] API rate limiting and caching
- [ ] Full database integration
- [ ] OAuth authentication (Google, GitHub)

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a PR.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Radix UI](https://www.radix-ui.com/) - Unstyled accessible components
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide](https://lucide.dev/) - Beautiful icons

---

<div align="center">
  Made with ❤️ for students everywhere
  
  **[Live Demo](https://classconnect.vercel.app)** | **[Documentation](https://docs.classconnect.app)** | **[Discord](https://discord.gg/classconnect)**
</div>