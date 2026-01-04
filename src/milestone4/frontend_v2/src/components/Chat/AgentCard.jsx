import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";
import { Context } from "../../context/context";

const COLOR_MAP = {
  blue: "text-blue-500",
  green: "text-green-500",
  purple: "text-purple-500",
  pink: "text-pink-500",
};

const AgentCard = ({ title, color = "blue", content }) => {
  const { dark } = useContext(Context);

  if (!content) return null;

  return (
    <div
      className={`rounded-2xl p-6 border transition-colors
        ${
          dark === "dark"
            ? "bg-zinc-800 border-zinc-700 text-white"
            : "bg-gray-50 border-gray-200 text-gray-900"
        }
      `}
    >
      <p className={`text-sm font-semibold mb-3 ${COLOR_MAP[color]}`}>
        {title}
      </p>

      <div
        className={`prose prose-lg max-w-full
          ${dark === "dark" ? "prose-invert" : ""}
        `}
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default AgentCard;
