from langchain.tools import tool
from tools.config import model



@tool
def summarizer(input_text: str) -> str:
    """
    Summarizes text.
    Supports:
    1) 'short|text here'
    2) 'text here'
    """
    try:
        if "|" in input_text:
            mode, text = input_text.split("|", 1)
        else:
            mode = "short"
            text = input_text

        prompt = f"""
        You are a summarizer.
        Summarize the text below.

        Mode: {mode}
        Text: {text}

        Return ONLY the summary.
        """

        response = model.invoke(prompt)
        return response.content.strip()

    except Exception as e:
        return f"Summarizer error: {str(e)}"
