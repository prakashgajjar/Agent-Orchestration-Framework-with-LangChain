
import os
import requests
from dotenv import load_dotenv

# LangChain + Gemini
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.tools import Tool
from langchain.memory import ConversationBufferMemory
from langchain.agents import initialize_agent, AgentType


# -----------------------------
# LOAD API KEY
# -----------------------------
load_dotenv()  # Make sure .env has GOOGLE_API_KEY


# -----------------------------
# TOOLS
# -----------------------------

# Tool 1: Greeting tool
def greet(name: str):
    return f"Hello {name}, I am your Gemini LangChain Agent!"

greet_tool = Tool(
    name="greeting_tool",
    func=greet,
    description="Use this to greet a person by name."
)


# Tool 2: Weather API tool
def weather(city: str):
    url = f"https://wttr.in/{city}?format=j1"
    res = requests.get(url).json()
    temp = res["current_condition"][0]["temp_C"]
    return f"Current temperature in {city} is {temp}°C"

weather_tool = Tool(
    name="weather",
    func=weather,
    description="Get current temperature of a city"
)


tools = [greet_tool, weather_tool]


# -----------------------------
# MEMORY
# -----------------------------
memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True
)


# -----------------------------
# CREATE GEMINI AGENT
# -----------------------------
def create_agent():
    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-pro",   # You can use pro also
        temperature=0,
        api_key=os.getenv("GEMINI_API_KEY")
    )

    agent = initialize_agent(
        tools=tools,
        llm=llm,
        agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
        memory=memory,
        verbose=True,
        handle_parsing_errors=True
    )

    return agent


# -----------------------------
# RUN INTERACTIVE CHAT
# -----------------------------
if __name__ == "__main__":
    agent = create_agent()

    print("Gemini LangChain Agent is ready!")
    print("Type 'exit' to quit.\n")

    while True:
        query = input("You: ")

        if query.lower() == "exit":
            print("Goodbye!")
            break

        response = agent.run(query)
        print("Agent:", response)
