import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark-navy border-t border-golden/20 py-6 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 3 Columns on mobile */}
        <div className="grid grid-cols-3 gap-2 sm:gap-8 pb-4 sm:pb-8 border-b border-golden/10">
          {/* Brand with Logo on top - BIGGER LOGO ON MOBILE */}
          <div className="flex flex-col items-start">
            {/* Logo - Bigger on mobile */}
            <img
              src="/img/mylogo.png"
              alt="Codewith-COJO Logo"
              className="w-15 h-15 sm:w-15 sm:h-15 rounded-full object-cover mb-1 sm:mb-2 transition-all hover:shadow-[0_0_20px_rgba(252,163,17,0.3)]"
            />
            <h3 className="text-[8px] sm:text-xl font-extrabold text-golden leading-tight">
              Codewith-COJO
            </h3>
            <p className="text-gray-400 text-[6px] sm:text-sm leading-relaxedsm:block mt-1">
              Building elegant solutions with clean code and great UX. Clean
              code, great UX.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[6px] sm:text-sm font-semibold text-golden uppercase tracking-wider mb-1 sm:mb-4">
              Quick Links
            </h4>
            <ul className="space-y-0.5 sm:space-y-2">
              <li>
                <Link
                  to="/#about"
                  className="text-gray-400 hover:text-golden transition-colors duration-300 text-[6px] sm:text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-gray-400 hover:text-golden transition-colors duration-300 text-[6px] sm:text-sm">
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-400 hover:text-golden transition-colors duration-300 text-[6px] sm:text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/#contact"
                  className="text-gray-400 hover:text-golden transition-colors duration-300 text-[6px] sm:text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[6px] sm:text-sm font-semibold text-golden uppercase tracking-wider mb-1 sm:mb-4">
              Follow
            </h4>
            <div className="flex flex-col gap-0.5 sm:gap-2">
              <a
                href="https://github.com/cojojunior"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-golden transition-colors duration-300 text-[6px] sm:text-sm">
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/bright-sakyi-junior-akyea-09aaa1370/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-golden transition-colors duration-300 text-[6px] sm:text-sm">
                LinkedIn
              </a>
              <a
                href="https://wa.me/233570622400"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-golden transition-colors duration-300 text-[6px] sm:text-sm">
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom - Maintained as is */}
        <div className="pt-3 sm:pt-6 flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-4 text-[6px] sm:text-sm text-gray-400">
          <p>&copy; 2026 CodeWith-COJO. All rights reserved.</p>
          <p>Designed & Built with by COJO</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
