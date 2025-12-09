from langchain.agents import initialize_agent, AgentType
from tools.config import model


from tools.calculator_tool import calculator
from tools.whether_tool import weather
from tools.temp_converter import temp_converter
from tools.sumerizer_tool import summarizer

tools = [calculator, weather, temp_converter, summarizer]

agent = initialize_agent(
    tools=tools,
    llm=model,
    agent=AgentType.OPENAI_FUNCTIONS,
    verbose=True
)

if __name__ == "__main__":
    while True:
        q = input("\nAsk → ")
        result = agent.invoke({"input": q})
        print("\n→", result["output"])
