import React, { useContext, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Context } from "../../context/context.jsx";
import { Multi_Agent } from "../../api/Multi_agent.js";
import { sendMessage, getMessages } from "../../api/messages";

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

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const chatIdFromUrl = searchParams.get("id"); // ✅ URL is source of truth

  const chatEndRef = useRef(null);

  /* 🔁 Auto scroll */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chathistory, loading]);

  /* 🔁 Load messages when chatId changes (or refresh) */
  useEffect(() => {
    if (!chatIdFromUrl) {
      setChatHistory([]);
      setShowResult(false);
      return;
    }

    const loadMessages = async () => {
      try {
        setLoading(true);

        const messages = await getMessages(chatIdFromUrl);

        const formatted = messages.map((m) => ({
          user: m.prompt,
          research: m.aiResponse?.research,
          summary: m.aiResponse?.summary,
        }));

        setChatHistory(formatted);
        setShowResult(true);
      } catch (err) {
        console.error("Failed to load messages", err);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [chatIdFromUrl]);

  /* 🚀 SEND MESSAGE */
  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setinput("");

    try {
      setShowResult(true);
      setRecentPromot(userMessage);
      setLoading(true);

      // 1️⃣ Frontend AI
      const data = await Multi_Agent(userMessage);

      // 2️⃣ Backend save (auto-create chat)
      const res = await sendMessage({
        chatId: chatIdFromUrl,
        prompt: userMessage,
        research: data?.research,
        summary: data?.summary,
      });

      // 3️⃣ If new chat → update URL
      if (!chatIdFromUrl && res.chatId) {
        navigate(`/home?id=${res.chatId}`, { replace: true });
      }

      // 4️⃣ Append message to UI
      setChatHistory((prev) => [
        ...prev,
        {
          user: res.data.prompt,
          research: res.data.aiResponse.research,
          summary: res.data.aiResponse.summary,
        },
      ]);
    } catch (error) {
      console.error(error);
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
      {/* Header */}
      <div className="sticky top-0 z-20">
        <Header />
      </div>

      {/* Chat Area */}
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

      {/* Input */}
      <div className="relative bottom-0 left-0 right-0 z-30">
        <div className="max-w-[900px] mx-auto px-4 pb-4">
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
