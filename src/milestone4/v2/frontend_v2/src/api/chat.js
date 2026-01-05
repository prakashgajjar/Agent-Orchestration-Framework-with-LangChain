import api from "./api";

export const chat = {
  createChat: async () => {
    const response = await api.post("/chat");
    // console.log(response.data);
    return response.data;
  },

  getChats: async () => {
    const response = await api.get("/chats");
    // console.log(response.data);
    return response.data;
  },

  getChatById: async (chatId) => {
    const response = await api.get(`/chat/${chatId}`);
    return response.data;
  },
};