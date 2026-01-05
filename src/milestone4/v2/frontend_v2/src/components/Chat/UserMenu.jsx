import { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserMenu = ({ user, logout }) => {
    // console.log("user ", user)
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    // Close when clicking outside
    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="relative" ref={menuRef}>
            {/* USER ICON */}
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800"
            >
                <FaUserCircle className="text-3xl" />
            </button>

            {/* CLICK → SHOW DROPDOWN */}
            {open && (
                <div className="absolute right-0 mt-2 w-60 rounded-xl border shadow-lg
                        bg-white dark:bg-zinc-900 dark:border-zinc-700">

                    <div className="px-4 py-3 border-b dark:border-zinc-700">
                        <p className="font-semibold text-gray-900 dark:text-white">
                            {user?.username}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                            {user?.email}
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3
                       text-red-600 hover:bg-gray-50 dark:hover:bg-zinc-800
                       rounded-b-xl"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
