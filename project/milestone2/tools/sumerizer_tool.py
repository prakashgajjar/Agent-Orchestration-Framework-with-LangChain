from tools.config import model

def summarizer_tool(input_text: str) -> str:
    """
    Summarizes text.
    
    Supports:
    1) "short|text here"
    2) "text here"  (auto short summary)
    """

    try:
        # Case 1 check for "mode|text"
        if "|" in input_text:
            parts = input_text.split("|", 1)
            mode = parts[0].strip()
            text = parts[1].strip()
        else:
            # Case 2 default mode = short summary
            mode = "short"
            text = input_text.strip()

        prompt = f"""
        You are a summarizer.
        Summarize the following text.

        Mode: {mode}
        Text: {text}

        Return ONLY the summary.
        """

        response = model.invoke(prompt)
        return response.content.strip()

    except Exception as e:
        return f"Summarizer error: {str(e)}"
