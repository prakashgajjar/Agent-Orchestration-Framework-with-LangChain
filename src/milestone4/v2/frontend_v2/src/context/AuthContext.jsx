import { createContext, useEffect, useState } from "react";
import { auth } from "../api/Auth.js";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔄 Fetch logged-in user
  const loadUser = async () => {
    try {
      const data = await auth.getMe();
      // console.log(data)
      setUser(data?.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // 🔐 Logout (frontend + backend)
  const logout = async () => {
    try {
      await auth.logout(); // POST /logout
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null);
      localStorage.removeItem("token"); // if used
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
