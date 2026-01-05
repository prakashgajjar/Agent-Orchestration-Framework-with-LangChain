import React, { useContext } from "react";
import { IoMdSend } from "react-icons/io";
import { Context } from "../../context/context";

const ChatInput = ({ input, setinput, loading, onSend }) => {
  const { dark } = useContext(Context);

  const canSend = input.trim().length > 0 && !loading;

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && canSend) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="relative max-w-[1200px] bottom-0 left-0 right-0 p-4 bg-transparent">
      <div className=" mx-auto">
        <div
          className={`flex gap-3 px-4 py-3 rounded-full border transition-colors
            ${
              dark === "dark"
                ? "bg-zinc-800 border-zinc-700 text-white"
                : "bg-white border-gray-200 text-gray-900"
            }
          `}
        >
          <input
            value={input}
            onChange={(e) => setinput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            placeholder="Enter a prompt..."
            className={`flex-1 bg-transparent outline-none
              ${
                dark === "dark"
                  ? "placeholder-gray-400"
                  : "placeholder-gray-500"
              }
            `}
          />

          <button
            onClick={onSend}
            disabled={!canSend}
            className={`p-2 rounded-full transition
              ${
                canSend
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : dark === "dark"
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-gray-400 cursor-not-allowed"
              }
            `}
          >
            <IoMdSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
