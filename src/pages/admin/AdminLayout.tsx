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
  X,
  Home,
  // ❌ REMOVE Briefcase from here - services not in admin
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
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
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

  // ✅ Services is NOT in this list - it only shows on the homepage
  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/projects", icon: FolderOpen, label: "Projects" },
    { path: "/admin/projects/new", icon: Plus, label: "Add Project" },
    // ❌ Service removed from admin nav
    // { path: "/admin/services", icon: Briefcase, label: "Services" },
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
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${sidebarOpen ? "w-64" : "w-20"}
          bg-[#161b22] border-r border-gray-700/50 transition-all duration-300 
          flex flex-col fixed md:relative h-full z-50
        `}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-700/50 flex items-center gap-3">
          <img
            src="/img/mylogo.png"
            alt="Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          {sidebarOpen && (
            <div>
              <h1 className="text-white font-bold text-sm">Admin Panel</h1>
              <p className="text-gray-400 text-xs">Manage Portfolio</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeSidebar}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                isActive(item.path)
                  ? "bg-golden/20 text-golden"
                  : "text-gray-400 hover:bg-gray-700/30 hover:text-white"
              }`}>
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700/50">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-red-400 hover:bg-red-500/10 transition-all duration-300">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 transition-all duration-300">
        {/* Top Bar - Minimal */}
        <header className="bg-[#161b22] border-b border-gray-700/50 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-40">
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white transition-all duration-300 p-2 hover:bg-gray-700/30 rounded-lg"
            aria-label="Toggle sidebar">
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
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
