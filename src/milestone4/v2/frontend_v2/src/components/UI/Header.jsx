import React, { useContext } from "react";
import { FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import { Context } from "../../context/context";
import UserMenu from "../Chat/UserMenu";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const { dark, setdark, selectedAgent } = useContext(Context);
  const {user , logout} = useContext(AuthContext)


  return (
    <header
      className={`sticky top-0 z-20 flex items-center justify-between p-4 sm:p-5
        backdrop-blur border-b transition-colors
        ${dark === "dark"
          ? "bg-zinc-900/80 border-zinc-700 text-white"
          : "bg-white/80 border-gray-200 text-zinc-800"
        }
      `}
    >
      <p className="text-lg font-semibold">
        Lexis Agent
        {selectedAgent && (
          <span className="text-sm ml-2 opacity-60">
            • {selectedAgent.name}
          </span>
        )}
      </p>

      <div className="flex gap-4 items-center">
        <button
          onClick={() => setdark(dark === "dark" ? "light" : "dark")}
          className={`p-2 rounded-full transition
            ${dark === "dark"
              ? "hover:bg-zinc-800 text-yellow-400"
              : "hover:bg-gray-100 text-gray-700"
            }
          `}
        >
          {dark === "dark" ? <FaMoon /> : <FaSun />}
        </button>

        <UserMenu user={user} logout={logout} />

      </div>
    </header>
  );
};

export default Header;
