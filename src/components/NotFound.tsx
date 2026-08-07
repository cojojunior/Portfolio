import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117] p-4">
      <div className="text-center max-w-md">
        <div>
          <h1 className="text-8xl font-bold text-white mb-4">
            4<span className="text-[#fca311]">0</span>4
          </h1>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Page Not Found</h2>
          <p className="text-[#8b949e] mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#fca311] text-[#0d1117] font-semibold hover:bg-[#e5940f] transition-all duration-300">
            ← Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#30363d] text-white hover:bg-[#161b22] transition-all duration-300">
            ← Go Back
          </button>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-[#8b949e]">
          <Link to="/" className="hover:text-[#fca311] transition-colors">
            Home
          </Link>
          <span>•</span>
          <Link to="/about" className="hover:text-[#fca311] transition-colors">
            About
          </Link>
          <span>•</span>
          <Link
            to="/projects"
            className="hover:text-[#fca311] transition-colors">
            Projects
          </Link>
          <span>•</span>
          <Link
            to="/contact"
            className="hover:text-[#fca311] transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
