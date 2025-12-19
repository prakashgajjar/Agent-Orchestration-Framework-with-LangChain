import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate

def create_research_agent():
    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        google_api_key=os.getenv("GEMINI_API_KEY"),
        temperature=0.3
    )

    prompt = PromptTemplate(
        input_variables=["topic"],
        template="""
You are a Research Agent.
Collect detailed factual information about the topic.

Topic: {topic}
"""
    )

    return prompt | llm
