import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";
import {
  LogOut,
  LayoutDashboard,
  FolderOpen,
  Plus,
  MessageSquare,
  Users,
  Settings,
  Menu,
  Home,
} from "lucide-react"; 
import { useState, useEffect } from "react";

const AdminLayout = () => {
  const { logout } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Close sidebar on mobile by default
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/projects", icon: FolderOpen, label: "Projects" },
    { path: "/admin/projects/new", icon: Plus, label: "Add Project" },
    { path: "/admin/messages", icon: MessageSquare, label: "Messages" },
    { path: "/admin/users", icon: Users, label: "Users" },
    { path: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  const isActive = (path: string) => {
    if (path === "/admin/dashboard") {
      return (
        location.pathname === "/admin/dashboard" ||
        location.pathname === "/admin"
      );
    }
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex">
      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar - Overlays on mobile, static on desktop */}
      <aside
        className={`
          fixed md:relative z-50 h-screen
          bg-[#161b22] border-r border-gray-700/50
          transition-all duration-300 ease-in-out
          flex flex-col overflow-hidden flex-shrink-0
          ${isMobile ? (sidebarOpen ? "left-0" : "-left-64") : "left-0 w-64"}
          ${isMobile ? "w-64" : "w-64"}
        `}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-700/50 flex items-center gap-3 min-h-[72px]">
          <img
            src="/img/mylogo.png"
            alt="Logo"
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
          <div>
            <h1 className="text-white font-bold text-sm whitespace-nowrap">
              Admin Panel
            </h1>
            <p className="text-gray-400 text-xs whitespace-nowrap">
              Manage Portfolio
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeSidebar}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 group ${
                isActive(item.path)
                  ? "bg-golden/20 text-golden"
                  : "text-gray-400 hover:bg-gray-700/30 hover:text-white"
              }`}>
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm whitespace-nowrap">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700/50">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-red-400 hover:bg-red-500/10 transition-all duration-300 group">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm whitespace-nowrap">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content - No margin, full width */}
      <div className="flex-1 min-h-screen w-full">
        {/* Top Bar */}
        <header className="bg-[#161b22] border-b border-gray-700/50 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-40">
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white transition-all duration-300 p-2 hover:bg-gray-700/30 rounded-lg"
            aria-label="Toggle sidebar">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-gray-400 text-xs sm:text-sm hidden sm:block">
              Admin
            </span>
            <div className="w-8 h-8 rounded-full bg-golden/20 flex items-center justify-center">
              <span className="text-golden font-bold text-sm">A</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
