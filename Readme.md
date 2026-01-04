# 🤖 Agent-Orchestration Framework with LangChain

<div align="center">

![LangChain](https://img.shields.io/badge/LangChain-🦜-blue)
![Python](https://img.shields.io/badge/Python-3.8+-green)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-teal)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)
![Status](https://img.shields.io/badge/Status-Active-success)

**An intelligent multi-agent orchestration system powered by LangChain, enabling collaborative AI agents to work together on complex tasks.**

[🌐 Live Demo](https://agent-orchestration-framework-with-phi.vercel.app/) • [📖 Documentation](#documentation) • [🚀 Quick Start](#quick-start)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Milestones](#project-milestones)
- [Quick Start](#quick-start)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Usage Examples](#usage-examples)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

This project demonstrates a sophisticated **multi-agent orchestration system** built with LangChain. The framework enables multiple AI agents to collaborate, share memory, use tools, and execute complex workflows autonomously.

### 🌐 Live Demo

**Live Demo :** [https://agent-orchestration-framework-with-phi.vercel.app/](https://agent-orchestration-framework-with-phi.vercel.app/)

The live demo showcases:
- 🔍 **Research Agent** - Gathers and analyzes information
- 📝 **Summarizer Agent** - Refines and condenses outputs
- 🤝 **Agent Collaboration** - Multi-agent workflow execution

---

## ✨ Features

- 🧠 **Multi-Agent System** - Multiple specialized agents working collaboratively
- 🔧 **Tool Integration** - Agents can use external tools (APIs, calculators, search, etc.)
- 💾 **Memory Management** - Both individual and shared memory across agents
- 🔄 **Workflow Automation** - Complex multi-step task orchestration
- 🌐 **REST API** - FastAPI backend for agent orchestration
- 💻 **Modern UI** - React-based frontend interface
- 🎨 **Real-time Streaming** - Live agent responses
- 📊 **Structured Outputs** - Clean, formatted agent responses

---

## 🏗️ Architecture

```
┌─────────────────┐
│   Frontend UI   │
│  (React/Next)   │
└────────┬────────┘
         │
    HTTP/REST
         │
┌────────▼────────┐
│  FastAPI Server │
│   (Backend)     │
└────────┬────────┘
         │
    ┌────▼─────┬──────────┬─────────┐
    │          │          │         │
┌───▼───┐  ┌──▼──┐  ┌────▼────┐  ┌▼────┐
│Research│  │Sum- │  │ Memory  │  │Tools│
│ Agent │  │mary │  │ Manager │  │     │
└───┬───┘  └──┬──┘  └────┬────┘  └─────┘
    │         │           │
    └─────────┴───────────┘
          LangChain
```

---

## 🛠️ Tech Stack

### Backend
- **Python 3.8+** - Core language
- **LangChain** - Agent framework
- **FastAPI** - REST API framework
- **Google Gemini** - LLM provider
- **Uvicorn** - ASGI server

### Frontend
- **React 18** - UI framework
- **Next.js** - React framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vercel** - Deployment

---

## 📍 Project Milestones

### Milestone 1️⃣: Environment Setup & Basic Agent Creation
**Status:** ✅ Complete

- ✅ Python + LangChain environment setup
- ✅ Gemini model integration (`ChatGoogleGenerativeAI`)
- ✅ PromptTemplate + LLMChain implementation
- ✅ Console-based interactive agent
- ✅ Custom markdown-to-CLI color parser

**Deliverables:**
- Functional LangChain environment
- Basic single-agent chat prototype
- Console interface for testing

---

### Milestone 2️⃣: Tool Integration & API Calling
**Status:** ✅ Complete

- ✅ LangChain `Tool` abstraction implementation
- ✅ Multiple tool integrations (Calculator, Weather API, etc.)
- ✅ Tool invocation prompts
- ✅ Error handling for tool failures

**Deliverables:**
- Agent capable of using external tools
- At least two working tool integrations
- Verified tool-agent interaction

---

### Milestone 3️⃣: Multi-Agent Orchestration & Memory
**Status:** ✅ Complete

- ✅ Multiple agent roles (Researcher, Summarizer)
- ✅ Inter-agent communication
- ✅ Individual agent memory (ConversationBufferMemory)
- ✅ Shared memory (VectorStoreRetrieverMemory)
- ✅ Collaborative multi-step scenarios

**Deliverables:**
- Multi-agent system working together
- Functional memory layers (personal + shared)
- Collaborative task execution flow

---

### Milestone 4️⃣: Complex Workflow Automation, REST API & UI
**Status:** ✅ Complete

- ✅ Real workflow implementation (Research → Summarize → Compose)
- ✅ Multi-agent orchestration logic
- ✅ REST API using FastAPI
- ✅ Modern React frontend
- ✅ Documentation and testing

**Deliverables:**
- Complete automated workflow
- REST API endpoints
- Interactive web UI
- Final documentation

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- Node.js 16+ (for frontend)
- Google Gemini API key

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/prakashgajjar/Agent-Orchestration-Framework-with-LangChain.git

cd agent-orchestration-framework

# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "GOOGLE_API_KEY=your_gemini_api_key_here" > .env

# Run the server
uvicorn app:app --reload
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

```bash
# Navigate to frontend
cd frontend_v2

# Install dependencies
npm install

# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Run development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

---

## 📡 API Documentation

### Base URL
```
http://localhost:8000
```

### Endpoints

#### 1. Research Endpoint
```http
POST /api/research
Content-Type: application/json

{
  "topic": "Artificial Intelligence trends in 2024"
}
```

**Response:**
```json
{
  "success": true,
  "research": "Detailed research findings...",
  "summary": "Condensed summary...",
  "timestamp": "2024-01-04T10:30:00Z"
}
```

#### 2. Agent Chat
```http
POST /api/chat
Content-Type: application/json

{
  "message": "Explain quantum computing",
  "agent": "researcher"
}
```

#### 3. Workflow Execution
```http
POST /api/workflow
Content-Type: application/json

{
  "workflow_type": "research_summarize",
  "input": "Topic to research"
}
```

### API Documentation (Interactive)
Visit `http://localhost:8000/docs` for interactive Swagger documentation.

---

## 📁 Project Structure

```
agent-orchestration-framework/
├── src/                          # Root source directory
│   ├── milestone1/               # Basic agent setup
│   ├── milestone2/               # Tool integration
│   ├── milestone3/               # Multi-agent + memory
│   └── milestone4/               # Complete system
│       └── backend/              # FastAPI backend
│           ├── agents/           # Agent implementations
│           ├── memory/           # Memory management
│           ├── __pycache__/      # Python cache
│           ├── venv/             # Virtual environment
│           ├── app.py            # Main FastAPI app
│           ├── orchestrator.py   # Agent orchestrator
│           ├── requirements.txt  # Python dependencies
│           └── runtime.txt       # Python version
├── frontend/                     # Frontend v1
└── frontend_v2/                  # Frontend v2 (current)
    ├── src/
    │   ├── api/                  # API integration
    │   ├── assets/               # Static assets
    │   ├── components/           # React components
    │   ├── context/              # React context
    │   ├── App.jsx               # Main app component
    │   ├── index.css             # Global styles
    │   └── main.jsx              # Entry point
    ├── public/                   # Public assets
    ├── dist/                     # Build output
    ├── node_modules/             # Dependencies
    ├── .env                      # Environment variables
    ├── .gitignore
    ├── bun.lock
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── postcss.config.js
    ├── README.md
    ├── tailwind.config.js
    └── vite.config.js
```

---

## 💡 Usage Examples

### Example 1: Research Workflow
```python
from orchestrator import AgentOrchestrator

orchestrator = AgentOrchestrator()
result = orchestrator.execute_research_workflow(
    topic="Latest developments in Large Language Models"
)

print(result['research'])  # Detailed research
print(result['summary'])   # Concise summary
```

### Example 2: Multi-Agent Collaboration
```python
# Research Agent gathers information
research_output = research_agent.run("AI ethics guidelines")

# Summarizer Agent processes the research
summary = summarizer_agent.run(research_output)

# Email Composer uses both outputs
email = composer_agent.run({
    "research": research_output,
    "summary": summary
})
```

### Example 3: Tool Usage
```python
from langchain.tools import Tool

calculator_tool = Tool(
    name="Calculator",
    func=calculate,
    description="Useful for mathematical calculations"
)

agent = create_agent(tools=[calculator_tool])
result = agent.run("What is 25% of 1500?")
```

---

## 🎨 Screenshots

### Frontend Interface
![Frontend UI](https://via.placeholder.com/800x400?text=Add+Your+Screenshot+Here)

### Agent Collaboration
![Agent Flow](https://via.placeholder.com/800x400?text=Add+Agent+Flow+Diagram)

---

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend_v2
npm test
```

---

## 📚 Documentation

Detailed documentation for each milestone:

- [Milestone 1 - Setup & Basic Agent](./src/milestone1/README.md)
- [Milestone 2 - Tool Integration](./src/milestone2/README.md)
- [Milestone 3 - Multi-Agent System](./src/milestone3/README.md)
- [Milestone 4 - Complete System](./src/milestone4/README.md)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [LangChain](https://langchain.com/) - Agent framework
- [Google Gemini](https://deepmind.google/technologies/gemini/) - LLM provider
- [Flask](https://fastapi.tiangolo.com/) - Backend framework
- [React](https://react.dev/) - Frontend framework

---

## 📧 Contact

**Project Maintainer:** Your Name

- GitHub: [@Prakash Suthar](https://github.com/prakashgajjar)
- Email: prakashgajjar096@gmail.com

---

<div align="center">

**⭐ If you find this project useful, please consider giving it a star!**

Made by Prakash Suthar using LangChain

</div>