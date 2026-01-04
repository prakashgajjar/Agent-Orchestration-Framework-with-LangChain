import React, { useState, useContext } from "react";
import Sidebar from "./components/UI/Sidebar";
import MainContant from "./components/UI/MainContant";
import { Context } from "./context/context.jsx";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { dark } = useContext(Context);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div
      className={`flex min-h-screen w-full ${dark === "dark" ? "bg-zinc-900" : "bg-white"
        }`}
    >
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
    inset-y-0 left-0 z-30 w-72
    transform transition-transform duration-300 ease-in-out
    fixed lg:static
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0
    lg:sticky lg:top-0 lg:h-screen
    border-r overflow-y-auto
    ${dark === "dark"
            ? "border-zinc-700 bg-zinc-900"
            : "border-gray-200 bg-white"}
  `}
      >

        <Sidebar onClose={toggleSidebar} />
      </aside>


      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Mobile Header */}
        <header
          className={`flex items-center gap-3 p-3 border-b lg:hidden ${dark === "dark"
            ? "border-zinc-700 text-white"
            : "border-gray-200 text-gray-900"
            }`}
        >
          <button
            onClick={toggleSidebar}
            className="text-2xl"
          >
            ☰
          </button>
          <h1 className="font-semibold">Chat</h1>
        </header>

        {/* Main (NO scroll here) */}
        <main className="flex-1">
          <MainContant />
        </main>
      </div>
    </div>
  );
};

export default App;
