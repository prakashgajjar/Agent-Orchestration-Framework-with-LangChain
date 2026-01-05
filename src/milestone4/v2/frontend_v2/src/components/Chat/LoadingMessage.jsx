import React from "react";
import geminilogo from "../../assets/1.png";

const LoadingMessage = () => (
  <div className="flex gap-4 mt-6 text-gray-400 animate-pulse">
    <img src={geminilogo} className="w-8 h-8 rounded-full" />
    Agents are thinking...
  </div>
);

export default LoadingMessage;
