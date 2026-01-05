import { Brain, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="
        sticky top-0 z-50
        backdrop-blur-xl bg-white/60
        border-b border-white/30
        shadow-[0_10px_40px_rgba(0,0,0,0.05)]
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative bg-gradient-to-br from-indigo-600 to-cyan-500 p-2.5 rounded-xl shadow-lg">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                AI Research Assistant
              </h1>
              <p className="text-xs text-gray-600">
                Multi-Agent Intelligence
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {["Home", "Features", "How It Works", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                className="relative text-gray-700 font-medium hover:text-indigo-600 transition"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            md:hidden overflow-hidden transition-all duration-300
            ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <nav className="flex flex-col gap-2 pb-4">
            {["Home", "Features", "How It Works", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                onClick={() => setOpen(false)}
                className="
                  px-3 py-2 rounded-lg
                  text-gray-700 font-medium
                  hover:bg-indigo-50 hover:text-indigo-600
                  transition
                "
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

      </div>
    </header>
  );
};

export default Header;
