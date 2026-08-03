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
    <section className="min-h-[20vh] flex items-center justify-center relative overflow-hidden px-3 sm:px-6 lg:px-8 bg-white my-[10px]">
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

      {/* 2 COLUMNS ON MOBILE */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-2 gap-2 sm:gap-8 lg:gap-12 items-center relative z-10">
        {/* LEFT COLUMN - Content */}
        <div className="col-span-1 animate-fade-in-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-1 sm:gap-4 px-2 sm:px-4 py-0.5 sm:py-2 border border-golden/40 rounded-full bg-golden/5 mb-2 sm:mb-6 animate-glow-pulse">
            <span className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-golden animate-pulse-dot" />
            <span className="text-dark-navy text-[6px] sm:text-sm font-semibold tracking-wider">
              Available
            </span>
          </div>

          {/* Title */}
          <div className="mb-1 sm:mb-3">
            <div className="text-dark-navy text-[8px] sm:text-2xl lg:text-3xl font-semibold sm:font-extrabold">
              Hi, I'm
            </div>
            <div className="text-golden text-lg sm:text-5xl lg:text-6xl font-extrabold drop-shadow-[0_0_20px_rgba(252,163,17,0.3)] leading-tight">
              Cojo
            </div>
          </div>

          {/* Typing Animation */}
          <div className="mb-2 sm:mb-4">
            <div className="text-gray-600 text-[7px] sm:text-lg lg:text-xl font-medium">
              <span className="text-golden font-bold">
                <span className="inline-block bg-golden/10 px-1 sm:px-2 py-0.5 sm:py-1 rounded-lg border border-golden/20 text-[7px] sm:text-base lg:text-xl">
                  {displayText}
                  <span className="inline-block w-0.5 h-2 sm:h-5 lg:h-6 ml-0.5 bg-golden animate-pulse align-middle"></span>
                </span>
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-1.5 sm:gap-4">
            <Link
              to="/projects"
              className="px-3 sm:px-8 py-1.5 sm:py-4 bg-golden text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 hover:bg-golden-dark hover:translate-y-[-2px] hover:shadow-[0_8px_32px_rgba(252,163,17,0.4)] shadow-[0_4px_20px_rgba(252,163,17,0.3)] text-[7px] sm:text-base">
              View Work
            </Link>
            <Link
              to="/#contact"
              className="px-3 sm:px-8 py-1.5 sm:py-4 border-2 border-golden text-golden font-semibold rounded-lg sm:rounded-xl transition-all duration-300 hover:bg-golden/10 hover:translate-y-[-2px] hover:shadow-[0_8px_32px_rgba(252,163,17,0.2)] text-[7px] sm:text-base">
              Let's Talk
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN - Profile Image */}
        <div className="col-span-1 flex justify-end animate-fade-in-right">
          <div
            ref={profileCardRef}
            className="relative w-full max-w-[120px] sm:max-w-md transition-all duration-300 ease-out">
            <div className="relative aspect-[3/4] rounded-lg sm:rounded-2xl overflow-hidden bg-gradient-to-br from-golden/20 to-golden/10 backdrop-blur-sm border-2 border-golden/30 shadow-[0_10px_30px_rgba(252,163,17,0.12)]">
              <img
                src="/img/cojo.JPG"
                alt="Cojo - UI/UX & Frontend Developer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent/20 to-golden/10 pointer-events-none" />

              <div className="absolute bottom-2 left-2 right-2 sm:bottom-6 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md px-1 sm:px-4 py-1 sm:py-3 rounded-md sm:rounded-xl border border-golden/20 text-center shadow-lg">
                <span className="text-dark-navy font-medium text-[6px] sm:text-base">
                  Accra, Ghana
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
