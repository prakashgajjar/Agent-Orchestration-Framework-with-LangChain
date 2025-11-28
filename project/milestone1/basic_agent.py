
# Milestone 1

import os
import re
from dotenv import load_dotenv

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain.chains import LLMChain

from rich.console import Console

console = Console()

# Handmade Markdown Parser
def parse_markdown_custom(text):
    # Bold first
    text = re.sub(r"\*\*(.+?)\*\*", r"[bold blue]\1[/bold blue]", text)

    # Italic
    text = re.sub(r"(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)", 
                  r"[italic yellow]\1[/italic yellow]", 
                  text)

    return text


# Load API Key

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise Exception("Please set GEMINI_API_KEY in your .env file")


# Init Gemini Model

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    api_key=GEMINI_API_KEY
)


# Prompt Template

prompt = PromptTemplate(
    input_variables=["query"],
    template="You are a smart AI assistant. Answer in clean format:\n\nQuestion: {query}"
)

agent = LLMChain(
    llm=llm,
    prompt=prompt
)


# Chat Loop

def run_console():
    console.print("[bold magenta]Gemini Agent Ready! Type 'exit' to quit.[/bold magenta]\n")

    while True:
        user_input = input("You: ")

        if user_input.lower() == "exit":
            console.print("[red]Goodbye[/red]")
            break

        # Run model
        response = agent.invoke({"query": user_input})
        answer = response["text"] if isinstance(response, dict) else response

        # Apply custom markdown colors
        styled = parse_markdown_custom(answer)

        console.print("\n[cyan]AI:[/cyan]")
        console.print(styled)
        print()


# Run

if __name__ == "__main__":
    run_console()
