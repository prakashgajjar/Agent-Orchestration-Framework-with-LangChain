from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory

import os

def create_research_agent():
    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        temperature=0.3,
        google_api_key=os.getenv("GEMINI_API_KEY")
    )


    memory = ConversationBufferMemory(
        memory_key="chat_history",
        return_messages=True
    )

    prompt = PromptTemplate(
        input_variables=["topic", "chat_history"],
        template="""
You are a Research Agent.
Your task is to collect key factual information about the topic.

Topic: {topic}

Conversation so far:
{chat_history}

Return bullet points with facts, statistics, and key insights.
"""
    )

    chain = LLMChain(
        llm=llm,
        prompt=prompt,
        memory=memory,
        verbose=True
    )

    return chain
