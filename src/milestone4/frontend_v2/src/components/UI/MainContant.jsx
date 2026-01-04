import React, { useContext, useRef, useEffect } from "react";
import { Context } from "../../context/context.jsx";
import { Multi_Agent } from "../../api/Multi_agent.js";

import Header from "./Header";
import Welcome from "./Welcome";
import ChatList from "../Chat/ChatList";
import ChatInput from "./ChatInput";

const MainContent = () => {
  const {
    input,
    setinput,
    setRecentPromot,
    chathistory,
    setChatHistory,
    showresult,
    setShowResult,
    loading,
    setLoading,
    dark,
  } = useContext(Context);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chathistory, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setinput("");

    try {
      setShowResult(true);
      setRecentPromot(userMessage);
      setLoading(true);

      const data = await Multi_Agent(userMessage);

      setChatHistory((prev) => [
        ...prev,
        {
          user: userMessage,
          research: data?.research,
          summary: data?.summary,
        },
      ]);
    } catch {
      setChatHistory((prev) => [
        ...prev,
        {
          user: userMessage,
          research: "❌ Error fetching research",
          summary: "Please try again later",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col h-screen ${
        dark === "dark" ? "bg-zinc-900" : "bg-white"
      }`}
    >
      {/* 🔹 Sticky Header */}
      <div className="sticky top-0 z-20">
        <Header />
      </div>

      {/* 🔹 Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto pb-[120px]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 mt-3">
          {!showresult ? (
            <Welcome />
          ) : (
            <ChatList
              chathistory={chathistory}
              loading={loading}
              chatEndRef={chatEndRef}
            />
          )}
        </div>
      </div>

      {/* 🔹 Fixed Centered Input */}
      <div className="realtive bg-transparent bottom-0 left-0 right-0 z-30">
        <div className="max-w-[900px] mx-auto px-4 pb-4 bg-transparent">
          <ChatInput
            input={input}
            setinput={setinput}
            loading={loading}
            onSend={handleSend}
          />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
