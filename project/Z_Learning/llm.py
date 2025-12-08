# # LLM- Large Language Models

# # is a deep learning model trained on the vast amounts of the text data to:
# #     - uderstand the natural lang
# #     - generate the context-aware response
# #     - reasoning, summarize, classify, extract data, transfomr the content 
# #     - using the tools and API's (with the frameworks like LangChain)
    
    
# # Popular LLm's:
# #     - OpenAPI- GPT series(4o, 3.5)
# #     - Google- Gemini
# #     - Meta- Llama 3
# #     - Mistral AI- Mixtral 
# #     - Anthropic- Claude 3


# # LLM can be called without the LangChain 

# # useing OPenAPI (4o):
    
# # pip install openai python-dotenv 

# # .env -> storing your API_keys/ endpoints securely
# # OPENAI_API_KEY="your_openai_api_key"
# # OPENAI_ENDPOINT="your_openai_endpoint"

# # import os 
# # from openai import OpenAI 
# # from dotenv import load_dotenv

# # # 1. Load the API keys and endpoint from .env file
# # load_dotenv() # loading the .env file -> fetches the API key
# # client= OpenAPI(api_key= os.getenv("OPENAI_API_KEY"), api_base= os.getenv("OPENAI_ENDPOINT"))
# # # clinet->create a connection to the LLM service


# # # 2. Send a message to LLM (GPT-4o) and get the response
# # response= client.chat.completions.create(
# #     model= "gpt-4o-mini", # fast & cheap model for the demos 
# #     message=[
# #         {
# #             "role": "user",
# #             "content": "You are a helpful AI Assistant."
# #         }, 
# #         {
# #             " role": "user",
# #             "content": "Explain the machine learning in simple terms."
# #         }
# #     ]
# # )

# # # 3. print the result 

# # print(response.choices[0].message["content"]) ## LLM output


# # Basic LLM program:

# # pip install langchain langchain-community langchain-openai python-dotenv

# # import the packages
# from langchain_openai import ChatOpenAI

# from langchain.chains import LLMChain
# from langchain.prompts import PromptTemplate

# import os 
# from dotenv import load_dotenv  

# load_dotenv()

# # 1. connect to an LLM using Langchain Wrapper 

# llm = ChatOpenAI(
#     model= "gpt-4o-mini",
#     temperature= 0.2,
#     api_key= os.getenv("OPENAI_API_KEY")
# )

# # 2. create a prompt template 

# prompt= PromptTemplate(
#     input_variables= ["topic"],
#     template= """
#     You are a helpful AI assistant. Explain the topic below in simple, easy-to-understand language:
    
#     Topic: {topic}
#     """
    
# )

# # 3. create a chain (LLM + prompt)

# chain = LLMChain(
#     llm= llm, 
#     prompt= prompt
# )

# #4. run the chain 

# result= chain.run({"topic" : "How machine learning works" })
# print(result)  # LLM output

