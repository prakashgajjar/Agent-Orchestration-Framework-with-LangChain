from langchain.tools import tool

@tool
def calculator(expression: str) -> str:
    """Evaluate a safe mathematical expression."""
    try:
        result = eval(expression, {"__builtins__": {}})
        return str(result)
    except:
        return "Invalid math expression"
