import { createContext, useState } from "react";
// import run from "../config/gemini";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [input, setinput] = useState("");
  const [recentPromot, setRecentPromot] = useState("");
  const [prevePromot, setprevePromot] = useState([]);
  const [showresult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chathistory, setChatHistory] = useState([]);
  const [resultdata, setresultdata] = useState("");
  const [dark, setdark] = useState("dark");
  const [selectedAgent, setSelectedAgent] = useState(null);

  const onSent = async (prompt) => {
    setresultdata("");
    setLoading(true);
    setShowResult(true);
    setRecentPromot(prompt);
    setprevePromot((prev) => [...prev, prompt]);
    setinput("");
    setLoading(false);
  };

  return (
    <Context.Provider
      value={{
        input,
        setinput,
        recentPromot,
        setRecentPromot,
        prevePromot,
        setprevePromot,
        showresult,
        setShowResult,
        loading,
        setLoading,
        chathistory,
        setChatHistory,
        resultdata,
        onSent,
        dark,
        setdark,
        selectedAgent,
        setSelectedAgent,
      }}
    >
      {children}
    </Context.Provider>
  );
};
