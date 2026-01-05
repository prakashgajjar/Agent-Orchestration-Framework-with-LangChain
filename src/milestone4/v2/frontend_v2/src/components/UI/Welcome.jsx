import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Welcome = () => {
  const { user } = useContext(AuthContext); // ✅ CORRECT

  return (
    <div className="my-12 text-3xl sm:text-5xl font-semibold">
      <p className="bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
        Hello, {user?.username || "Prathamesh"}
      </p>
      <p className="mt-2 text-gray-400">
        How can I help you today?
      </p>
    </div>
  );
};

export default Welcome;
