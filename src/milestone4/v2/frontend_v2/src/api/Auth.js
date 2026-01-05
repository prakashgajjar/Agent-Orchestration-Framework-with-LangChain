import api from "./api";
export const auth = {
  login: async (email, password) => {
    const response = await api.post("/signin", { email, password });
    return response;
  },

  logout: async () => {
    const response = await api.post("/signout");
    return response.data;
  },

  register: async (username, email, password) => {
    const response = await api.post("/signup", {
      username,
      email,
      password,
    });
    return response;
  },

  getMe: async () => {
    const response = await api.get("/me");
    return response.data;
  },
};
