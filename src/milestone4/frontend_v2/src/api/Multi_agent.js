import axios from "axios";

export const Multi_Agent = async (topic) => {

  // Environment validation
  const API_URL_LOCAL = import.meta.env.VITE_API_BASE_URL_LOCAL;
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  // console.log(API_URL_LOCAL , topic)

  if (!API_URL_LOCAL) {
    throw new Error("API base URL is not defined in environment variables");
  }
  try {
    const response = await axios.post(
      API_URL,
      { topic: topic.trim() },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 40000, 
      }
    );

    // console.log(response)

    // Response validation
    if (!response.data) {
      throw new Error("Empty response received from server");
    }

    if (typeof response.data !== "object") {
      throw new Error("Invalid response format");
    }

    return response.data;
  } catch (error) {
    console.error("Multi-Agent service error:", error);

    // Normalized error handling
    if (axios.isAxiosError(error)) {
      throw (
        error.response?.data?.message ||
        `Request failed with status ${error.response?.status}` ||
        "Server error occurred"
      );
    }

    throw error.message || "Unexpected error occurred";
  }
};
