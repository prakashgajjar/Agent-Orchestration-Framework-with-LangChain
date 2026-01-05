import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { FaPlus, FaRobot } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa6";
import { FiMessageSquare } from "react-icons/fi";
import {
  IoMenuSharp,
  IoSettings,
  IoChevronDown,
  IoChevronUp,
} from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { SiOpenai } from "react-icons/si";

import { Context } from "../../context/context";
import { chat } from "../../api/chat";

/* ---------------- Agents ---------------- */
const AGENTS = [
  {
    id: "general",
    name: "General Assistant",
    icon: FaRobot,
    description: "General purpose AI helper",
    color: "text-blue-500",
  },
  {
    id: "coder",
    name: "Code Expert",
    icon: BsStars,
    description: "Specialized in programming",
    color: "text-green-500",
  },
  {
    id: "researcher",
    name: "Research Agent",
    icon: SiOpenai,
    description: "Deep research & analysis",
    color: "text-purple-500",
  },
  {
    id: "creative",
    name: "Creative Writer",
    icon: BsStars,
    description: "Creative content generation",
    color: "text-pink-500",
  },
];

const Sidebar = () => {
  const {
    setChatHistory,
    setprevePromot,
    dark,
    selectedAgent,
    setSelectedAgent,
  } = useContext(Context);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeChatId = searchParams.get("id");

  const [extended, setExtended] = useState(true);
  const [agentMenuOpen, setAgentMenuOpen] = useState(false);
  const [chats, setChats] = useState([]);

  /* ---------------- Load chats ---------------- */
  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await chat.getChats();
        setChats(data);
      } catch (err) {
        console.error("Failed to load chats", err);
      }
    };

    loadChats();
  }, []);

  /* ---------------- New Chat ---------------- */
  const handleNewChat = () => {
    setChatHistory([]);
    setprevePromot("");
    navigate("/home");
  };

  /* ---------------- Open Chat ---------------- */
  const openChat = (chatId) => {
    navigate(`/home?id=${chatId}`);
  };

  /* ---------------- Agent ---------------- */
  const currentAgent = selectedAgent || AGENTS[0];
  const CurrentAgentIcon = currentAgent.icon;

  const handleAgentSelect = (agent) => {
    setSelectedAgent(agent);
    setAgentMenuOpen(false);
  };

  return (
    <div
      className={`min-h-screen inline-flex flex-col justify-between py-[25px] px-[15px]
        ${extended ? "w-[250px]" : "w-[70px]"}
        ${dark === "dark" ? "bg-zinc-900 text-white" : "bg-[#f0f4f9] text-zinc-900"}
        transition-all duration-300`}
    >
      {/* ---------------- Top ---------------- */}
      <div>
        {/* Toggle */}
        <IoMenuSharp
          className="block cursor-pointer text-2xl hover:opacity-70"
          onClick={() => setExtended(!extended)}
        />

        {/* New Chat */}
        <div
          onClick={handleNewChat}
          className={`mt-6 flex gap-2 items-center p-3 rounded-full cursor-pointer
            ${
              dark === "dark"
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-white hover:bg-gray-200 shadow-sm"
            }`}
        >
          <FaPlus />
          {extended && <p className="font-medium">New Chat</p>}
        </div>

        {/* Agent Selector */}
        <div className="mt-4">
          <div
            onClick={() => extended && setAgentMenuOpen(!agentMenuOpen)}
            className={`flex gap-2 items-center p-3 rounded-lg cursor-pointer
              ${
                dark === "dark"
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-white hover:bg-gray-200 shadow-sm"
              }`}
          >
            <CurrentAgentIcon className={`text-xl ${currentAgent.color}`} />
            {extended && (
              <>
                <div className="flex-1">
                  <p className="font-medium text-sm">{currentAgent.name}</p>
                  <p className="text-xs opacity-60">
                    {currentAgent.description}
                  </p>
                </div>
                {agentMenuOpen ? <IoChevronUp /> : <IoChevronDown />}
              </>
            )}
          </div>

          {/* Agent Dropdown */}
          {extended && agentMenuOpen && (
            <div
              className={`mt-2 rounded-lg overflow-hidden ${
                dark === "dark" ? "bg-zinc-900" : "bg-white shadow-lg"
              }`}
            >
              {AGENTS.map((agent) => {
                const AgentIcon = agent.icon;
                const isSelected = currentAgent.id === agent.id;
                return (
                  <div
                    key={agent.id}
                    onClick={() => handleAgentSelect(agent)}
                    className={`flex gap-2 items-center p-3 cursor-pointer
                      ${
                        isSelected
                          ? dark === "dark"
                            ? "bg-gray-700"
                            : "bg-blue-50"
                          : dark === "dark"
                          ? "hover:bg-gray-700"
                          : "hover:bg-gray-100"
                      }`}
                  >
                    <AgentIcon className={`text-xl ${agent.color}`} />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{agent.name}</p>
                      <p className="text-xs opacity-60">
                        {agent.description}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ---------------- Chats ---------------- */}
        {extended && chats.length > 0 && (
          <div className="flex flex-col mt-6">
            <p className="text-xs font-semibold uppercase opacity-50 mb-3">
              Chats
            </p>

            {chats.map((c) => (
              <div
                key={c._id}
                onClick={() => openChat(c._id)}
                className={`flex gap-2 items-center p-2 rounded-lg cursor-pointer mb-1
                  ${
                    activeChatId === c._id
                      ? dark === "dark"
                        ? "bg-gray-700"
                        : "bg-blue-100"
                      : dark === "dark"
                      ? "hover:bg-gray-800"
                      : "hover:bg-gray-200"
                  }`}
              >
                <FiMessageSquare className="opacity-70" />
                <p className="text-sm truncate">
                  {c.title || "New Chat"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------------- Bottom ---------------- */}
      <div className="flex flex-col gap-1">
        <SidebarItem icon={FaQuestion} label="Help" extended={extended} dark={dark} />
        <SidebarItem icon={MdHistory} label="Activity" extended={extended} dark={dark} />
        <SidebarItem icon={IoSettings} label="Settings" extended={extended} dark={dark} />
      </div>
    </div>
  );
};

/* ---------------- Reusable Item ---------------- */
const SidebarItem = ({ icon: Icon, label, extended, dark, onClick }) => (
  <div
    onClick={onClick}
    className={`flex gap-2 items-center p-2 rounded-lg cursor-pointer
      ${dark === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"}`}
  >
    <Icon className="text-xl" />
    {extended && <p className="text-sm">{label}</p>}
  </div>
);

export default Sidebar;
