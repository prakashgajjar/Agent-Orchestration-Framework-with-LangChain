import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate

def create_summarizer_agent():
    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        google_api_key=os.getenv("GEMINI_API_KEY"),
        temperature=0.4
    )

    prompt = PromptTemplate(
        input_variables=["research_output"],
        template="""
You are a Summarizer Agent.
Summarize the following research clearly.

Research:
{research_output}
"""
    )

    return prompt | llm
