import api from "./api";

export const sendMessage = async ({ chatId, prompt, research, summary }) => {
  const res = await api.post("/messages", {
    chatId,
    prompt,
    research,
    summary,
  });
  return res.data;
};

export const getMessages = async (chatId) => {
  const res = await api.get(`/messages/${chatId}`);
  return res.data;
};
