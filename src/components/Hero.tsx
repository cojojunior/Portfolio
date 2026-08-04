import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  // Typing animation states
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);

  const roles = ["FRONTEND DEVELOPER", "GRAPHIC DESIGNER", "UI/UX DESIGNER"];

  useEffect(() => {
    const currentRole = roles[loopIndex % roles.length];
    const typingSpeed = isDeleting ? 80 : 150;
    const pauseDelay = 1500;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDelay);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setLoopIndex((prev) => prev + 1);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopIndex]);

  return (
    <section
      className="h-fit sm:h-[850vh] md:h-[85vh] lg:h-[85vh] flex items-center justify-center relative overflow-hidden px-3 sm:px-6 sm:py-70 lg:px-8 lg:py-70 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("/img/hero.jpg")',
      }}>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none" />

      {/* 2 COLUMNS - Minimal padding to account for fixed navbar */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-2 gap-2 sm:gap-8 lg:gap-12 items-center relative z-10 py-1 sm:py-4 lg:py-6">
        {/* LEFT COLUMN - Content */}
        <div className="col-span-1 animate-fade-in-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-1 sm:gap-4 px-2 sm:px-4 py-0.5 sm:py-2 border border-golden/40 rounded-full bg-black/30 backdrop-blur-sm mb-1.5 sm:mb-4 animate-glow-pulse tracking-wide">
            <span className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-golden animate-pulse-dot" />
            <span className="text-white text-[6px] sm:text-sm font-semibold tracking-wider">
              Available For Bookings
            </span>
          </div>

          {/* Title */}
          <div className="mb-1 sm:mb-2">
            <div className="text-white text-[8px] sm:text-2xl lg:text-3xl font-semibold sm:font-extrabold drop-shadow-lg">
              Hi, I'm
            </div>
            <div className="text-golden text-lg sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-wide">
              Cojo
            </div>
          </div>

          {/* Typing Animation */}
          <div className="mb-1 sm:mb-2">
            <div className="text-white/90 text-[7px] sm:text-lg lg:text-xl font-medium drop-shadow-lg">
              <span className="text-white font-m tracking-wider">
                <span className="inline-block bg-black/30 backdrop-blur-sm px-1 sm:px-2 py-0.5 sm:py-1 rounded-lg border border-golden/20 text-[7px] sm:text-base lg:text-xl">
                  {displayText}
                  <span className="inline-block w-0.5 h-2 sm:h-5 lg:h-6 ml-0.5 bg-golden animate-pulse align-middle"></span>
                </span>
              </span>
            </div>
          </div>

          {/* Description - Hidden on mobile to save space */}
          <div className="hidden sm:block mb-1.5 sm:mb-3">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed drop-shadow-lg max-w-md">
              I build accessible, pixel-perfect, and performant modern web
              applications with clean code and great UX.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-1 sm:gap-4">
            <Link
              to="/projects"
              className="px-3 sm:px-8 py-1 sm:py-3.5 bg-golden text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 hover:bg-golden-dark hover:translate-y-[-2px] hover:shadow-[0_8px_32px_rgba(252,163,17,0.4)] shadow-[0_4px_20px_rgba(252,163,17,0.3)] text-[7px] sm:text-base">
              View Work
            </Link>
            <Link
              to="/#contact"
              className="px-3 sm:px-8 py-1 sm:py-3.5 border-2 border-white text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 hover:bg-white/10 hover:translate-y-[-2px] hover:shadow-[0_8px_32px_rgba(255,255,255,0.1)] text-[7px] sm:text-base">
              Let's Talk
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN - Profile Image */}
        <div className="col-span-1 flex justify-end items-center">
          <div className="relative w-full max-w-[120px] sm:max-w-[260px] lg:max-w-[340px]">
            <div className="relative aspect-[3/4] rounded-lg sm:rounded-2xl overflow-hidden">
              <img
                src="/img/cojo.JPG"
                alt="Cojo - UI/UX & Frontend Developer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent/20 to-golden/10 pointer-events-none" />

              {/* Location Badge - Smaller on mobile */}
              <div className="absolute bottom-1 sm:bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md rounded sm:rounded-xl border border-golden/20 text-center shadow-lg px-1.5 sm:px-4 py-0.5 sm:py-2 min-w-[60px] sm:min-w-[120px] lg:min-w-[140px]">
                <span className="text-dark-navy font-black text-[5px] sm:text-[10px] lg:text-xs whitespace-nowrap">
                  Based In ACCRA, Ghana
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
