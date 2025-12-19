from dotenv import load_dotenv
load_dotenv()

from orchestrator import MultiAgentOrchestrator

def main():
    orchestrator = MultiAgentOrchestrator()
    topic = "Impact of AI on Startup Ecosystem in India"
    result = orchestrator.run(topic)
    print(result)

if __name__ == "__main__":
    main()
