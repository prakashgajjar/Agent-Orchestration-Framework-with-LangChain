import os
import re
from dotenv import load_dotenv
from rich.console import Console

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.tools import StructuredTool
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_core.prompts import ChatPromptTemplate

console = Console()

def parse_markdown_custom(text):
    text = re.sub(r"\*\*(.+?)\*\*", r"[bold blue]\1[/bold blue]", text)
    text = re.sub(r"(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)",
                  r"[italic yellow]\1[/italic yellow]", text)
    return text

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    api_key=GEMINI_API_KEY,
    temperature=0.2
)

def echo_tool(text: str) -> str:
    return f"[EchoTool Output] {text}"

EchoTool = StructuredTool.from_function(
    func=echo_tool,
    name="EchoTool",
    description="Echoes back the input text."
)

tools = [EchoTool]

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an AI assistant. Use tools when needed."),
    ("user", "{input}"),
    ("assistant", "{agent_scratchpad}")
])

agent = create_tool_calling_agent(llm, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

def run_console():
    console.print("[bold magenta]Gemini Agent Ready! Type 'exit' to quit.[/bold magenta]\n")
    while True:
        user_input = input("You: ")
        if user_input.lower() == "exit":
            console.print("[red]Goodbye[/red]")
            break
        response = agent_executor.invoke({"input": user_input})
        answer = response.get("output", "No output returned.")
        console.print("\n[cyan]AI:[/cyan]")
        console.print(parse_markdown_custom(answer))
        print()

if __name__ == "__main__":
    run_console()
