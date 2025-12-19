# Milestone 3: Multi-Agent Orchestration & Memory Management (Gemini + LangChain)

## Project Overview
This milestone implements a **multi-agent orchestration system** using **LangChain** and **Google Gemini**.  
The system demonstrates how multiple intelligent agents can collaborate, share memory, and complete a task together.

The workflow focuses on:
- Collecting detailed information on a topic
- Summarizing that information
- Using both individual and shared memory to coordinate agent behavior

---

## Agents Implemented

### 1. Research Agent
- Powered by **Google Gemini**
- Responsible for gathering detailed information, facts, and insights about a given topic
- Maintains its own short-term memory using `ConversationBufferMemory`

### 2. Summarizer Agent
- Powered by **Google Gemini**
- Takes the research output and generates a concise, well-structured summary
- Also maintains its own individual memory

---

## Memory Architecture

### Individual Memory
- Each agent uses `ConversationBufferMemory`
- Allows agents to remember their own interaction history

### Shared Memory
- Implemented using **FAISS Vector Store**
- Uses **FakeEmbeddings** (local embeddings) to simulate vector-based memory
- Enables agents to share context and information

> Note: FakeEmbeddings are used because Gemini free tier does not provide embedding quotas.  
This approach is suitable for prototyping and academic evaluation.

---

## Orchestration Flow

User Topic
↓
Research Agent (Gemini)
↓
Shared Memory (FAISS + FakeEmbeddings)
↓
Summarizer Agent (Gemini)
↓
Final Summary


An **orchestrator** controls the execution order and manages communication between agents.

---

## Tools & Technologies Used
- **Python**
- **LangChain**
- **Google Gemini (ChatGoogleGenerativeAI)**
- **FAISS Vector Store**
- **FakeEmbeddings (for shared memory simulation)**
- **dotenv (for API key management)**

---

## How to Run

1. Create a `.env` file:
```env
GOOGLE_API_KEY=your_gemini_api_key
