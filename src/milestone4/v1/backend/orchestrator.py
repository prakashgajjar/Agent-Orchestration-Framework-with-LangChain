# orchestrator.py
from agents.research_agent import create_research_agent
from agents.summarizer_agent import create_summarizer_agent
from memory.shared_memory import create_shared_memory

class MultiAgentOrchestrator:
    def __init__(self):
        self.research_chain = create_research_agent()
        self.summarizer_chain = create_summarizer_agent()
        self.shared_memory = create_shared_memory()

    def run(self, topic: str):
        research = self.research_chain.invoke({
            "topic": topic
        }).content

        self.shared_memory.save(research)

        summary = self.summarizer_chain.invoke({
            "research_output": research
        }).content

        return {
            "topic": topic,
            "research": research,
            "summary": summary
        }
