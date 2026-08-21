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
      className="h-[160px] lg:h-[70vh] md:h-[70vh] sm:h-[60vh] flex items-center justify-center relative overflow-hidden px-3 py-1 sm:px-6 sm:py-4 lg:px-8 bg-cover bg-center bg-no-repeat mt-10 sm:mt-14"
      style={{
        backgroundImage: 'url("/img/hero.jpg")',
      }}>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none" />

      {/* 2 COLUMNS - Equal height with 2px padding */}
      <div className="max-w-5xl mx-auto w-full grid grid-cols-5 gap-1 sm:gap-2 lg:gap-4 relative z-10 h-full py-2 sm:py-1 lg:py-6">
        {/* LEFT COLUMN - Content (takes 3/5 of the space) */}
        <div className="col-span-3 animate-fade-in-left h-full flex flex-col justify-center p-[2px]">
          {/* Badge */}
          <div className="inline-flex items-center gap-1 sm:gap-4 px-2 sm:px-4 py-0.5 sm:py-2 border border-golden/40 rounded-full bg-black/30 backdrop-blur-sm mb-1.5 sm:mb-6 animate-glow-pulse tracking-wide w-fit">
            <span className="w-1 h-fit sm:w-2 sm:h-2 rounded-full bg-golden animate-pulse-dot" />
            <span className="text-white text-[6px] sm:text-sm font-semibold tracking-wider whitespace-nowrap">
              Available For Bookings
            </span>
          </div>

          {/* Title */}
          <div className="mb-1 sm:mb-3">
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

          {/* Description */}
          <div className="mb-1.5 sm:mb-4">
            <p className="text-white/80 text-[7px] sm:text-base leading-relaxed drop-shadow-lg max-w-md">
              I build accessible, pixel-perfect, and performant modern web
              applications with clean code and great UX.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-1 sm:gap-4">
            <Link
              to="/projects"
              className="px-3 sm:px-8 py-1 sm:py-4 bg-golden text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 hover:bg-golden-dark hover:translate-y-[-2px] hover:shadow-[0_8px_32px_rgba(252,163,17,0.4)] shadow-[0_4px_20px_rgba(252,163,17,0.3)] text-[7px] sm:text-base whitespace-nowrap">
              View Work
            </Link>
            <Link
              to="/#contact"
              className="px-3 sm:px-8 py-1 sm:py-4 border-2 border-white text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 hover:bg-white/10 hover:translate-y-[-2px] hover:shadow-[0_8px_32px_rgba(255,255,255,0.1)] text-[7px] sm:text-base whitespace-nowrap">
              Let's Talk
            </Link>
          </div>
        </div>

       
        {/* RIGHT COLUMN - Profile Image (takes 2/5 of the space) */}
        <div className="col-span-2 flex justify-end items-center h-full p-[2px]" >
          <div className="relative w-full max-w-[100px] sm:max-w-[240px] md:max-w-[45vh] lg:max-w-[300px] h-full flex items-center">
            <div className="relative aspect-[3/4] w-full h-full max-h-full md:w-full rounded-lg sm:rounded-2xl overflow-hidden">
              <img
                src="/img/cojo.JPG"
                alt="Cojo - UI/UX & Frontend Developer"
                className="w-full h-full object-cover object-center"
              />

              {/* Location Badge */}
              <div className="absolute bottom-1 sm:bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md rounded sm:rounded-xl text-center shadow-lg px-1 sm:px-4 py-0.5 sm:py-2 min-w-[10px] h-[14px] sm:h-auto sm:min-w-[120px] lg:min-w-[140px] flex items-center justify-center">
                <span className="text-dark-navy font-black text-[4px] sm:text-[10px] lg:text-xs whitespace-nowrap leading-none">
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
