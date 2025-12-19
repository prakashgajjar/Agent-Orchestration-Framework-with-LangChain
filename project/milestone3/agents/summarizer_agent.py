from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory

import os

def create_summarizer_agent():
    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        temperature=0.4,
        google_api_key=os.getenv("GEMINI_API_KEY")
    )


    memory = ConversationBufferMemory(
        memory_key="chat_history",
        return_messages=True
    )

    prompt = PromptTemplate(
        input_variables=["research_output", "chat_history"],
        template="""
You are a Summarizer Agent.
Your task is to convert research notes into a concise summary.

Research Notes:
{research_output}

Conversation so far:
{chat_history}

Return a well-structured paragraph summary.
"""
    )

    chain = LLMChain(
        llm=llm,
        prompt=prompt,
        memory=memory,
        verbose=True
    )

    return chain
