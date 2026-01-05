import React from "react";
import AgentCard from "./AgentCard";
import geminilogo from "../../assets/1.png";

const AIMessage = ({ research, summary }) => {
  return (
    <div className="flex gap-4">
      <img src={geminilogo} className="w-8 h-8 rounded-full" />

      <div className="flex flex-col gap-6 w-full">
        <AgentCard title="🔍 Research Agent" color="blue" content={research} />
        <AgentCard title="✨ Summary Agent" color="green" content={summary} />
      </div>
    </div>
  );
};

export default AIMessage;
