from agents.research_agent import create_research_agent
from agents.summarizer_agent import create_summarizer_agent
from memory.shared_memory import create_shared_memory

class MultiAgentOrchestrator:
    def __init__(self):
        self.research_agent = create_research_agent()
        self.summarizer_agent = create_summarizer_agent()
        self.shared_memory = create_shared_memory()

    def run(self, topic: str):
        # Step 1: Research
        research_result = self.research_agent.run(topic=topic)

        # Save into shared memory
        self.shared_memory.save_context(
            {"input": topic},
            {"output": research_result}
        )

        # Step 2: Summarization
        summary = self.summarizer_agent.run(
            research_output=research_result
        )

        return {
            "topic": topic,
            "research": research_result,
            "summary": summary
        }
