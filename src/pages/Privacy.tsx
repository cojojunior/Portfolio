// src/pages/Privacy.tsx
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  Database,
  Mail,
  Cookie,
} from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#0d1117] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-golden transition-all duration-300 mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-golden/10 rounded-full border border-golden/20 mb-4">
            <Lock className="w-5 h-5 text-golden" />
            <span className="text-golden text-sm font-medium">Privacy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Privacy <span className="text-golden">Policy</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Last Updated: August 4, 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div className="bg-[#1a1f2e] rounded-xl border border-gray-700/50 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <Eye className="w-6 h-6 text-golden flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  Information We Collect
                </h2>
                <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                  <li>Name and email address (when you contact us)</li>
                  <li>Messages you send through our contact form</li>
                  <li>
                    Basic analytics data (page visits, device information)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1f2e] rounded-xl border border-gray-700/50 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <Database className="w-6 h-6 text-golden flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  How We Use Your Data
                </h2>
                <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                  <li>To respond to your inquiries and messages</li>
                  <li>To improve our website and services</li>
                  <li>
                    To send you updates about our services (only with consent)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1f2e] rounded-xl border border-gray-700/50 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <Cookie className="w-6 h-6 text-golden flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  Cookies
                </h2>
                <p className="text-gray-400 leading-relaxed text-sm">
                  We use minimal cookies to improve your browsing experience.
                  You can disable cookies in your browser settings at any time.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1f2e] rounded-xl border border-gray-700/50 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-golden flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  Data Security
                </h2>
                <p className="text-gray-400 leading-relaxed text-sm">
                  We take reasonable measures to protect your personal
                  information from unauthorized access, alteration, or
                  destruction.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1f2e] rounded-xl border border-gray-700/50 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-golden flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  Contact Us
                </h2>
                <p className="text-gray-400 leading-relaxed text-sm">
                  For privacy-related questions, contact us at:{" "}
                  <a
                    href="mailto:codewithcojo@gmail.com"
                    className="text-golden hover:underline">
                    codewithcojo@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm border-t border-gray-700/50 pt-8">
          <p>© {new Date().getFullYear()} CodeWithCojo. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
