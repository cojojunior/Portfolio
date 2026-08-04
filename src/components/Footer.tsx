import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark-navy py-1.5 sm:py-8 px-3 sm:px-6 lg:px-8 h-full w-full">
      <div className="max-w-7xl mx-auto">
        {/* 4 Columns*/}
        <div className="grid grid-cols-4 gap-2 sm:gap-8 pb-4 sm:pb-6 border-b border-golden/10">
          {/* Brand Section */}
          <div className="flex flex-col items-start">
            <img
              src="/img/mylogo.png"
              alt="Codewith-COJO Logo"
              className="w-15 h-15 sm:w-12 sm:h-12 rounded-full object-cover mb-0.5 sm:mb-2 transition-all hover:shadow-[0_0_20px_rgba(252,163,17,0.3)]"
            />
            <h3 className="text-[6px] sm:text-lg font-extrabold text-golden leading-tight">
              Codewith-COJO
            </h3>
            <p className="text-gray-400 text-[5px] sm:text-xs leading-relaxed mt-0.5 sm:mt-1">
              Building elegant solutions with clean code and great UX.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[6px] sm:text-xs font-semibold text-golden uppercase tracking-wider mb-0.5 sm:mb-3">
              Quick Links
            </h4>
            <ul className="space-y-0.5 sm:space-y-1.5">
              <li>
                <Link
                  to="/#about"
                  className="text-gray-400 hover:text-golden transition-colors duration-300 text-[5px] sm:text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-gray-400 hover:text-golden transition-colors duration-300 text-[5px] sm:text-sm">
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-400 hover:text-golden transition-colors duration-300 text-[5px] sm:text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/#contact"
                  className="text-gray-400 hover:text-golden transition-colors duration-300 text-[5px] sm:text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[6px] sm:text-xs font-semibold text-golden uppercase tracking-wider mb-0.5 sm:mb-3">
              Follow
            </h4>
            <ul className="space-y-0.5 sm:space-y-1.5">
              <li>
                <a
                  href="https://github.com/cojojunior"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-golden transition-colors duration-300 text-[5px] sm:text-sm">
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/codewithcode/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-golden transition-colors duration-300 text-[5px] sm:text-sm">
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/233570622400"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-golden transition-colors duration-300 text-[5px] sm:text-sm">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[6px] sm:text-xs font-semibold text-golden uppercase tracking-wider mb-0.5 sm:mb-3">
              Legal
            </h4>
            <ul className="space-y-0.5 sm:space-y-1.5">
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-golden transition-colors duration-300 text-[5px] sm:text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-golden transition-colors duration-300 text-[5px] sm:text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/#contact"
                  className="text-gray-400 hover:text-golden transition-colors duration-300 text-[5px] sm:text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-2 text-[5px] sm:text-xs text-gray-300">
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-4">
            <span>&copy; 2026 Codewith-COJO. All rights reserved.</span>
            <span className="hidden sm:inline text-gray-600">|</span>
            <Link
              to="/privacy"
              className="hover:text-golden transition-colors duration-300">
              Privacy Policy
            </Link>
            <span className="hidden sm:inline text-gray-600">|</span>
            <Link
              to="/terms"
              className="hover:text-golden transition-colors duration-300">
              Terms of Service
            </Link>
            <span className="hidden sm:inline text-gray-600">|</span>
            <Link
              to="/#contact"
              className="hover:text-golden transition-colors duration-300">
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-300">Designed & Built with by COJO</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
