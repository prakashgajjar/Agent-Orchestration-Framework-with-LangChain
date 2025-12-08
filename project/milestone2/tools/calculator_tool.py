def calculator_tool(expression: str) -> str:
    try:
        result = eval(expression, {"__builtins__": {}})
        # print(result)
        return str(result)
    except:
        return "Invalid math expression"
