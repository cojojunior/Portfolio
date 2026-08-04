import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "@/lib/supabaseAuth";
import { Lock, Mail, Shield, AlertCircle } from "lucide-react";

const AdminRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Validate password strength
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    const result = await signUp(email, password);
    setIsLoading(false);

    if (result.success) {
      setSuccess(
        "Account created successfully! Please check your email to verify your account.",
      );
      setTimeout(() => {
        navigate("/admin/login");
      }, 3000);
    } else {
      setError(result.error || "Failed to create account");
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
            <h2 className="text-2xl font-bold text-white">
              Create Admin Account
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Register to manage your portfolio
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
              <p className="text-gray-500 text-xs mt-1">Minimum 6 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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

            {success && (
              <div className="text-green-500 text-sm text-center bg-green-500/10 py-2 rounded-lg border border-green-500/20">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-golden text-dark-navy font-semibold rounded-xl transition-all duration-300 hover:bg-golden-dark hover:shadow-[0_8px_32px_rgba(252,163,17,0.3)] disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link
                to="/admin/login"
                className="text-golden hover:text-golden-dark transition-colors duration-300">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
