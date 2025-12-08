import os
import requests
from dotenv import load_dotenv

load_dotenv()

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")

def weather_tool(city: str) -> str:
    """
    Fetches REAL weather using OpenWeatherMap API.
    Example call: weather("Patan")
    """

    try:
        if not city:
            return "City name required."

        url = (
            f"https://api.openweathermap.org/data/2.5/weather"
            f"?q={city}&appid={OPENWEATHER_API_KEY}&units=metric"
        )

        response = requests.get(url)

        if response.status_code != 200:
            return f"Weather API error: {response.json().get('message', 'Unknown error')}"

        data = response.json()

        temp = data["main"]["temp"]
        feels = data["main"]["feels_like"]
        humidity = data["main"]["humidity"]
        condition = data["weather"][0]["description"].title()

        return (
            f"Weather in {city}:\n"
            f"- Temperature: {temp}°C\n"
            f"- Feels Like: {feels}°C\n"
            f"- Humidity: {humidity}%\n"
            f"- Condition: {condition}"
        )

    except Exception as e:
        return f"Weather tool error: {str(e)}"
