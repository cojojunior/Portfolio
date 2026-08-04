import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";
import { Lock, Mail, Shield, AlertCircle } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      navigate("/admin/dashboard");
    } else {
      setError(result.error || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117] px-4">
      <div className="w-full max-w-md">
        <div className="bg-[#161b22] rounded-2xl p-8 shadow-2xl border border-gray-700/50">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto rounded-full bg-golden/20 flex items-center justify-center mb-4">
              <Shield className="w-10 h-10 text-golden" />
            </div>
            <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
            <p className="text-gray-400 text-sm mt-1">
              Sign in to manage your portfolio
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#0d1117] border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/20 transition-all duration-300"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#0d1117] border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-golden focus:ring-2 focus:ring-golden/20 transition-all duration-300"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20 flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-golden text-dark-navy font-semibold rounded-xl transition-all duration-300 hover:bg-golden-dark hover:shadow-[0_8px_32px_rgba(252,163,17,0.3)] disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link
                to="/admin/register"
                className="text-golden hover:text-golden-dark transition-colors duration-300">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
