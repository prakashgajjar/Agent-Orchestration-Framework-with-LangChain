def temp_converter_tool(input_text: str) -> str:
    """
    Convert temperatures.
    Example: "100 C F"
    """
    try:
        value, from_unit, to_unit = input_text.split()
        value = float(value)

        if from_unit == "C" and to_unit == "F":
            return f"{value}°C = {(value * 9/5) + 32}°F"

        elif from_unit == "F" and to_unit == "C":
            return f"{value}°F = {((value - 32) * 5/9)}°C"

        else:
            return "Invalid format. Use: value C F or value F C"

    except Exception as e:
        return f"Temperature converter error: {str(e)}"
