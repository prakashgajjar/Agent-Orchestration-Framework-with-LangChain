import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import LoadingMessage from "./components/Chat/LoadingMessage";
import CircleLoader from "./components/Chat/CircleLoader";

const App = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div> <CircleLoader/> </div>;

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to="/home" />}
      />
      <Route
        path="/signup"
        element={!user ? <SignupPage /> : <Navigate to="/home" />}
      />

      {/* Protected route */}
      <Route
        path="/home"
        element={user ? <HomePage /> : <Navigate to="/login" />}
      />

      {/* Default redirect */}
      <Route
        path="/"
        element={<Navigate to={user ? "/home" : "/login"} />}
      />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
