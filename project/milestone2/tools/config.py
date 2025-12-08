import os
from dotenv import load_dotenv
import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)

model = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",  # You have PRO
    api_key=os.getenv("GEMINI_API_KEY"),
    temperature=0.1,
)