import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/blog", label: "Blog" },
    { to: "/#about", label: "About" },
    { to: "/#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-golden/20 shadow-sm"
          : "bg-white/90 backdrop-blur-sm border-b border-golden/10"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/img/mylogo.png"
              alt="CodeWithCojo Logo"
              className="w-10 h-10 rounded-full object-cover transition-all group-hover:shadow-[0_0_20px_rgba(252,163,17,0.3)]"
            />
            <span className="text-xl font-bold text-dark-navy">
              CodeWith-COJO
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <li key={link.to}>
                {link.to.startsWith("/#") ? (
                  <a
                    href={link.to}
                    className="text-gray-600 hover:text-golden transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-0.5 after:bg-golden after:transition-all after:duration-300 hover:after:w-full">
                    {link.label}
                  </a>
                ) : (
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `text-gray-600 hover:text-golden transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-0.5 after:bg-golden after:transition-all after:duration-300 hover:after:w-full ${
                        isActive ? "text-golden after:w-full" : ""
                      }`
                    }>
                    {link.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          {/* Social Icons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://github.com/cojojunior"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-golden/30 rounded-lg text-gray-600 hover:text-golden hover:border-golden hover:shadow-[0_0_12px_rgba(252,163,17,0.2)] transition-all duration-300"
              aria-label="GitHub">
              <img src="/img/github.svg" alt="GitHub" className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/bright-sakyi-junior-akyea-09aaa1370/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-golden/30 rounded-lg text-gray-600 hover:text-golden hover:border-golden hover:shadow-[0_0_12px_rgba(252,163,17,0.2)] transition-all duration-300"
              aria-label="LinkedIn">
              <img src="/img/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/233570622400"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-golden/30 rounded-lg text-gray-600 hover:text-golden hover:border-golden hover:shadow-[0_0_12px_rgba(252,163,17,0.2)] transition-all duration-300"
              aria-label="WhatsApp">
              <img src="/img/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-golden hover:bg-golden/10 transition-all duration-300"
            aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-golden/10 animate-fade-in-up">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.to}>
                  {link.to.startsWith("/#") ? (
                    <a
                      href={link.to}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-gray-600 hover:text-golden transition-colors duration-300 px-4 py-2">
                      {link.label}
                    </a>
                  ) : (
                    <NavLink
                      to={link.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-gray-600 hover:text-golden transition-colors duration-300 ${
                          isActive ? "text-golden" : ""
                        }`
                      }>
                      {link.label}
                    </NavLink>
                  )}
                </li>
              ))}
              <div className="flex items-center gap-4 px-4 pt-2 border-t border-golden/10">
                <a
                  href="https://github.com/cojojunior"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-600 hover:text-golden transition-colors">
                  <img
                    src="/img/github.svg"
                    alt="GitHub"
                    className="w-5 h-5"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/bright-sakyi-junior-akyea-09aaa1370/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-600 hover:text-golden transition-colors">
                  <img
                    src="/img/linkedin.svg"
                    alt="LinkedIn"
                    className="w-5 h-5"
                  />
                </a>
                <a
                  href="https://wa.me/233570622400"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-600 hover:text-golden transition-colors">
                  <img
                    src="/img/WhatsApp.svg"
                    alt="WhatsApp"
                    className="w-5 h-5"
                  />
                </a>
              </div>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
