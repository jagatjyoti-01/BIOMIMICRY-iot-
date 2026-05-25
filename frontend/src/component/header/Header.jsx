import { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  Moon,
  User,
  LogOut,
} from "lucide-react";
import {useNavigate} from "react-router-dom";

import { logout } from "../../services/axiosClient";

const Header = ({ toggleSidebar }) => {
  const [open, setOpen] = useState(false);

  const navigate=useNavigate();

  // get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        {/* Sidebar Toggle */}
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <Menu size={20} />
        </button>

        {/* Search */}
      <div className="hidden sm:flex items-center bg-gray-100 px-3 py-2 rounded-lg w-full max-w-md">

          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none ml-2 text-sm w-full"
          />
        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 relative">

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
          AI Assistance
        </button>

        <Bell className="text-gray-500" size={20} />
        <Moon className="text-gray-500" size={20} />

        {/* Profile */}
        <div className="relative">

          <button
            onClick={() => setOpen(!open)}
            className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold"
          >
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50">

              {/* User Info */}
              <div className="border-b pb-3 mb-3">
                <h3 className="font-semibold text-gray-800">
                  {user?.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {user?.email}
                </p>

                <span className="inline-block mt-2 text-xs bg-gray-100 px-2 py-1 rounded capitalize">
                  {user?.role}
                </span>
              </div>

              {/* Profile */}
              <button
             onClick={()=>navigate("/dashboard/profile")}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
              >
                <User size={16} />
                Profile
              </button>

              {/* Logout */}
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 text-sm"
              >
                <LogOut size={16} />
                Logout
              </button>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Header;