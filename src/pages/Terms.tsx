// src/pages/Terms.tsx
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Shield,
  FileText,
  Scale,
  Lock,
  Eye,
  AlertCircle,
} from "lucide-react";

const Terms = () => {
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
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Terms & <span className="text-golden">Conditions</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Last Updated: August 4, 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Section 1 - Introduction */}
          <div className="bg-[#1a1f2e] rounded-xl border border-gray-700/50 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-golden flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  1. Introduction
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  Welcome to CodeWithCojo ("we," "our," "us"). These Terms and
                  Conditions govern your use of our website and services. By
                  accessing or using our website, you agree to be bound by these
                  terms. If you disagree with any part of these terms, please do
                  not use our website.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2 - Intellectual Property */}
          <div className="bg-[#1a1f2e] rounded-xl border border-gray-700/50 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <Scale className="w-6 h-6 text-golden flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  2. Intellectual Property
                </h2>
                <p className="text-gray-400 leading-relaxed mb-3">
                  All content on this website, including but not limited to
                  text, graphics, logos, images, and software, is the property
                  of CodeWithCojo and is protected by copyright and intellectual
                  property laws.
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                  <li>
                    You may not reproduce, distribute, or modify any content
                    without prior written consent
                  </li>
                  <li>
                    You may not use our trademarks or logos without permission
                  </li>
                  <li>All rights not expressly granted are reserved</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3 - Use of Services */}
          <div className="bg-[#1a1f2e] rounded-xl border border-gray-700/50 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <Eye className="w-6 h-6 text-golden flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  3. Use of Services
                </h2>
                <p className="text-gray-400 leading-relaxed mb-3">
                  You agree to use our services only for lawful purposes and in
                  a way that does not infringe on the rights of others.
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                  <li>
                    You must not use our services for any illegal or
                    unauthorized purpose
                  </li>
                  <li>You must not transmit any harmful or malicious code</li>
                  <li>
                    You must not attempt to gain unauthorized access to our
                    systems
                  </li>
                  <li>
                    You must not harass, abuse, or harm others through our
                    services
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 4 - Limitation of Liability */}
          <div className="bg-[#1a1f2e] rounded-xl border border-gray-700/50 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-golden flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  4. Limitation of Liability
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  CodeWithCojo is provided "as is" without any warranties,
                  express or implied. We do not guarantee that our services will
                  be uninterrupted, secure, or error-free. In no event shall we
                  be liable for any damages arising from the use of our
                  services.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5 - Privacy */}
          <div className="bg-[#1a1f2e] rounded-xl border border-gray-700/50 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <Lock className="w-6 h-6 text-golden flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  5. Privacy Policy
                </h2>
                <p className="text-gray-400 leading-relaxed mb-3">
                  Your privacy is important to us. Please review our{" "}
                  <Link to="/privacy" className="text-golden hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  to understand how we collect, use, and protect your personal
                  information.
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                  <li>
                    We collect minimal personal data necessary for service
                    delivery
                  </li>
                  <li>We do not sell or share your data with third parties</li>
                  <li>You have the right to request deletion of your data</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 6 - User Accounts */}
          <div className="bg-[#1a1f2e] rounded-xl border border-gray-700/50 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-golden flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  6. User Accounts
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  If you create an account on our website, you are responsible
                  for maintaining the security of your account and for all
                  activities that occur under your account. You must notify us
                  immediately of any unauthorized use of your account.
                </p>
              </div>
            </div>
          </div>

          {/* Section 7 - Termination */}
          <div className="bg-[#1a1f2e] rounded-xl border border-gray-700/50 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-golden flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  7. Termination
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  We reserve the right to terminate or suspend your access to
                  our services immediately, without prior notice or liability,
                  for any reason whatsoever, including without limitation if you
                  breach these Terms and Conditions.
                </p>
              </div>
            </div>
          </div>

          {/* Section 8 - Changes to Terms */}
          <div className="bg-[#1a1f2e] rounded-xl border border-gray-700/50 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-golden flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  8. Changes to Terms
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  We reserve the right to update or modify these Terms and
                  Conditions at any time without prior notice. Your continued
                  use of our services after any changes constitutes your
                  acceptance of the new terms.
                </p>
              </div>
            </div>
          </div>

          {/* Section 9 - Governing Law */}
          <div className="bg-[#1a1f2e] rounded-xl border border-gray-700/50 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <Scale className="w-6 h-6 text-golden flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  9. Governing Law
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  These Terms and Conditions shall be governed by and construed
                  in accordance with the laws of Ghana, without regard to its
                  conflict of law provisions.
                </p>
              </div>
            </div>
          </div>

          {/* Section 10 - Contact Us */}
          <div className="bg-[#1a1f2e] rounded-xl border border-gray-700/50 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-golden flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  10. Contact Us
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  If you have any questions about these Terms and Conditions,
                  please contact us at:
                </p>
                <div className="mt-3 p-4 bg-[#0d1117] rounded-lg border border-gray-700/30">
                  <p className="text-gray-300">
                    <span className="text-golden">Email:</span>{" "}
                    <a
                      href="mailto:akyeajunior@gmail.com"
                      className="hover:text-golden transition-colors">
                      akyeajunior@gmail.com
                    </a>
                  </p>
                  <p className="text-gray-300 mt-1">
                    <span className="text-golden">Website:</span>{" "}
                    <a
                      href="https://codewithcojo.netlify.app"
                      className="hover:text-golden transition-colors">
                      codewithcojo.netlify.app
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-gray-500 text-sm border-t border-gray-700/50 pt-8">
          <p>By using this website, you agree to these Terms and Conditions.</p>
          <p className="mt-1">
            © {new Date().getFullYear()} CodeWithCojo. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

// ✅ Make sure this export is present
export default Terms;
