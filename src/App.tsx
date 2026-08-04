import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminProvider } from "@/context/AdminContext";
import { ServiceProvider } from "@/context/ServiceContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProjectsPage from "./pages/ProjectsPage";
import BlogPage from "./pages/BlogPage";
import AboutPage from "./pages/AboutPage";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminProjectForm from "./pages/admin/AdminProjectForm";
import AdminServices from "./pages/admin/AdminServices";
import AdminServiceForm from "./pages/admin/AdminServicesForm";

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = localStorage.getItem("admin_auth");
  if (auth !== "true") {
    window.location.href = "/admin/login";
    return null;
  }
  return children;
};

// Layout for public routes (with Navbar & Footer)
const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AdminProvider>
        <ServiceProvider>
          <Routes>
            {/* Public Routes with Navbar & Footer */}
            <Route
              path="/"
              element={
                <PublicLayout>
                  <Home />
                </PublicLayout>
              }
            />
            <Route
              path="/projects"
              element={
                <PublicLayout>
                  <ProjectsPage />
                </PublicLayout>
              }
            />
            <Route
              path="/blog"
              element={
                <PublicLayout>
                  <BlogPage />
                </PublicLayout>
              }
            />
            <Route
              path="/about"
              element={
                <PublicLayout>
                  <AboutPage />
                </PublicLayout>
              }
            />

            {/* ✅ Legal Pages */}
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />

            {/* Admin Auth Routes (no Navbar/Footer) */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />

            {/* Admin Protected Routes (no Navbar/Footer) */}
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
              <Route path="services" element={<AdminServices />} />
              <Route path="services/new" element={<AdminServiceForm />} />
              <Route path="services/edit/:id" element={<AdminServiceForm />} />
            </Route>
          </Routes>
        </ServiceProvider>
      </AdminProvider>
    </Router>
  );
}

export default App;
