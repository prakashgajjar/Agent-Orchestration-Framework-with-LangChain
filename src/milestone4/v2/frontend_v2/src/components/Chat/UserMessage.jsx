import React, { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Context } from "../../context/context";

const UserMessage = ({ text }) => {
  const { dark } = useContext(Context);

  return (
    <div
      className={`flex gap-4 p-4 rounded-xl mb-4 transition-colors
        ${
          dark === "dark"
            ? "bg-zinc-800 text-white"
            : "bg-gray-100 text-gray-900"
        }
      `}
    >
      <FaUserCircle className="text-3xl text-blue-500 flex-shrink-0" />
      <p className="leading-relaxed">{text}</p>
    </div>
  );
};

export default UserMessage;
