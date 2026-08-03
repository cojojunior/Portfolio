import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark-navy border-t border-golden/20 py-4 sm:py-4 px-4 sm:px-2 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 3 Columns on mobile */}
        <div className="grid grid-cols-3 gap-3 sm:gap-8 pb-6 sm:pb-8 border-b border-golden/10">
          <div className="flex flex-col items-start">
            {/* Logo */}
            <img
              src="/img/mylogo.png"
              alt="CodeWithCojo Logo"
              className="w-5 h-5 sm:w-30 sm:h-20 rounded-full object-cover mb-0.5 sm:mb-0 transition-all hover:shadow-[0_0_10px_rgba(252,163,17,0.3)]"
            />

            <p className="text-gray-400 text-[8px] sm:text-sm leading-relaxed hidden sm:block mt-1">
              Building elegant solutions with clean code and great UX.
            </p>
            <p className="text-gray-400 text-[8px] leading-relaxed sm:hidden mt-0.5">
              Clean code, great UX.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[8px] sm:text-sm font-semibold text-golden uppercase tracking-wider mb-1 sm:mb-4">
              Quick Links
            </h4>
            <ul className="space-y-0.5 sm:space-y-2">
              <li>
                <Link
                  to="/#about"
                  className="text-gray-400 hover:text-golden transition-colors duration-300 text-[8px] sm:text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-gray-400 hover:text-golden transition-colors duration-300 text-[8px] sm:text-sm">
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-400 hover:text-golden transition-colors duration-300 text-[8px] sm:text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/#contact"
                  className="text-gray-400 hover:text-golden transition-colors duration-300 text-[8px] sm:text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[8px] sm:text-sm font-semibold text-golden uppercase tracking-wider mb-1 sm:mb-4">
              Follow
            </h4>
            <div className="flex flex-col gap-0.5 sm:gap-2">
              <a
                href="https://github.com/cojojunior"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-golden transition-colors duration-300 text-[8px] sm:text-sm">
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/bright-sakyi-junior-akyea-09aaa1370/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-golden transition-colors duration-300 text-[8px] sm:text-sm">
                LinkedIn
              </a>
              <a
                href="https://wa.me/233570622400"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-golden transition-colors duration-300 text-[8px] sm:text-sm">
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom - Maintained as is */}
        <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 text-[8px] sm:text-sm text-gray-400">
          <p>&copy; 2026 CodeWithCojo. All rights reserved.</p>
          <p>Designed & Built with by Cojo</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
