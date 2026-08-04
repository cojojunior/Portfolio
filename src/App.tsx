import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminProvider } from "@/context/AdminContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProjectsPage from "./pages/ProjectsPage";
import BlogPage from "./pages/BlogPage";
import AboutPage from "./pages/AboutPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminProjectForm from "./pages/admin/AdminProjectForm";

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = localStorage.getItem("admin_auth");
  if (auth !== "true") {
    window.location.href = "/admin/login";
    return null;
  }
  return children;
};

function App() {
  return (
    <Router>
      <AdminProvider>
        <div className="min-h-screen bg-white">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="projects/new" element={<AdminProjectForm />} />
              <Route path="projects/edit/:id" element={<AdminProjectForm />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </AdminProvider>
    </Router>
  );
}

export default App;
