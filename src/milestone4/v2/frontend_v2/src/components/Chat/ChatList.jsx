import React from "react";
import UserMessage from "./UserMessage";
import AIMessage from "./AIMessage";
import LoadingMessage from "./LoadingMessage";

const ChatList = ({ chathistory, loading, chatEndRef }) => {
  return (
    <div className="pb-32">
      {chathistory.map((chat, i) => (
        <div key={i} className="mb-10">
          <UserMessage text={chat.user} />
          <AIMessage research={chat.research} summary={chat.summary} />
        </div>
      ))}

      {loading && <LoadingMessage />}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatList;
