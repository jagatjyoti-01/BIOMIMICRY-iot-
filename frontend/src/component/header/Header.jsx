import { Menu, Search, Bell, Moon } from "lucide-react";

const Header = ({ toggleSidebar }) => {
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
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-80">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none ml-2 text-sm w-full"
          />
        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
          AI Assistance
        </button>

        <Bell className="text-gray-500" size={20} />
        <Moon className="text-gray-500" size={20} />

        {/* Profile */}
        <div className="w-8 h-8 rounded-full bg-gray-300" />

      </div>
    </div>
  );
};

export default Header;