from tools.config import model
from tools.calculator_tool import calculator_tool
from tools.temp_converter import temp_converter_tool
from tools.sumerizer_tool import summarizer_tool
from tools.whether_tool import weather_tool

TOOLS = {
    "calculator": calculator_tool,
    "summarizer": summarizer_tool,
    "weather": weather_tool,
    "temp_converter": temp_converter_tool,
}

def agent(query: str):
    prompt = f"""
    You are an AI assistant with these tools:

    Tools:
    - calculator(expression)
    - summarizer(mode|text)
    - weather(city)
    - temp_converter("100 C F")
    
    When needed, respond ONLY using the format:
    tool_name("argument")

    User query: {query}
    """

    # Ask Gemini to select tool
    response = model.invoke(prompt)
    # print(response)convert 100 ruppes into dolar

    decision = response.content.strip()

    # Match tool call
    for name, func in TOOLS.items():
        if decision.startswith(name):
            try:
                arg = decision.split("(", 1)[1].split(")", 1)[0].strip().strip('"')
                return func(arg)
            except:
                return "Tool invocation error."

    # If no tool was selected
    return decision


if __name__ == "__main__":
    while True:
        q = input("\nAsk: ")
        print("→", agent(q))
