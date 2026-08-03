import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const profileCardRef = useRef<HTMLDivElement>(null);

  // Typing animation states
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);

  const roles = ["FRONTEND DEVELOPER", "GRAPHIC DESIGNER", "UI/UX DESIGNER"];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!profileCardRef.current) return;
      const x = (window.innerWidth / 2 - e.clientX) / 50;
      const y = (window.innerHeight / 2 - e.clientY) / 50;
      profileCardRef.current.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) translateZ(20px)`;
    };

    const handleMouseLeave = () => {
      if (!profileCardRef.current) return;
      profileCardRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Typing animation effect
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
    <section className="min-h-[70vh] flex items-center justify-center relative overflow-hidden px-3 sm:px-6 lg:px-8 bg-white my-[5px]">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-5">
        <div
          className="absolute w-[150%] h-[150%] top-[-25%] right-[-25%] animate-circuit-drift"
          style={{
            background: `
              repeating-linear-gradient(45deg, transparent, transparent 300px, #fca311 300px, #fca311 600px),
              repeating-linear-gradient(-45deg, transparent, transparent 300px, #fca311 300px, #fca311 600px)
            `,
          }}
        />
      </div>

      {/* Subtle Vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-white/20 z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 items-center relative z-10 py-4 sm:py-8">
        {/* LEFT COLUMN - Content */}
        <div className="animate-fade-in-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-4 px-2.5 sm:px-4 py-1 sm:py-2 border border-golden/40 rounded-full bg-golden/5 mb-3 sm:mb-6 animate-glow-pulse">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-golden animate-pulse-dot" />
            <span className="text-dark-navy text-[8px] sm:text-sm font-semibold tracking-wider whitespace-nowrap">
              Available for New Projects
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-1.5 sm:mb-3">
            <span className="block text-dark-navy text-sm sm:text-2xl lg:text-3xl font-semibold sm:font-extrabold">
              Hi, I'm
            </span>
            <span className="block text-golden text-3xl sm:text-5xl lg:text-6xl font-extrabold drop-shadow-[0_0_20px_rgba(252,163,17,0.3)]">
              Cojo
            </span>
          </h1>

          {/* Typing Animation */}
          <div className="mb-2 sm:mb-4">
            <div className="text-gray-600 text-xs sm:text-lg lg:text-xl font-medium tracking-wide flex items-center flex-wrap">
              <span className="mr-1 sm:mr-2">I'm a</span>
              <span className="text-golden font-bold min-h-[1.5rem] sm:min-h-[2.5rem] lg:min-h-[3rem] relative">
                <span className="inline-block bg-golden/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg border border-golden/20 text-[10px] sm:text-base lg:text-xl">
                  {displayText}
                  <span className="inline-block w-0.5 h-3 sm:h-5 lg:h-6 ml-0.5 bg-golden animate-pulse align-middle"></span>
                </span>
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-[10px] sm:text-lg leading-relaxed max-w-md mb-3 sm:mb-6">
            I build accessible, pixel-perfect, and performant modern web
            applications with clean code and great UX.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <Link
              to="/projects"
              className="px-4 sm:px-8 py-2 sm:py-4 bg-golden text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 hover:bg-golden-dark hover:translate-y-[-2px] hover:shadow-[0_8px_32px_rgba(252,163,17,0.4)] shadow-[0_4px_20px_rgba(252,163,17,0.3)] text-[10px] sm:text-base">
              View My Work
            </Link>
            <Link
              to="/#contact"
              className="px-4 sm:px-8 py-2 sm:py-4 border-2 border-golden text-golden font-semibold rounded-lg sm:rounded-xl transition-all duration-300 hover:bg-golden/10 hover:translate-y-[-2px] hover:shadow-[0_8px_32px_rgba(252,163,17,0.2)] text-[10px] sm:text-base">
              Let's Talk
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN - Profile Image */}
        <div className="flex justify-center sm:justify-end animate-fade-in-right">
          <div
            ref={profileCardRef}
            className="relative w-full max-w-[200px] sm:max-w-md transition-all duration-300 ease-out">
            <div className="relative aspect-[3/4] rounded-lg sm:rounded-2xl overflow-hidden bg-gradient-to-br from-golden/20 to-golden/10 backdrop-blur-sm border-2 border-golden/30 shadow-[0_15px_40px_rgba(252,163,17,0.15)]">
              <img
                src="/img/cojo.JPG"
                alt="Cojo - UI/UX & Frontend Developer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent/20 to-golden/10 pointer-events-none" />

              <div className="absolute bottom-2 sm:bottom-6 left-2 sm:left-6 right-2 sm:right-6 bg-white/95 backdrop-blur-md px-1.5 sm:px-4 py-1 sm:py-3 rounded-md sm:rounded-xl border border-golden/20 text-center shadow-lg">
                <span className="text-dark-navy font-medium text-[8px] sm:text-base">
                  Based in Accra, Ghana
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
