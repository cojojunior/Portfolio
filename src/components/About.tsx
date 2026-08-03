import { useState } from "react";

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const skills = [
    "HTML5",
    "JavaScript",
    "Graphic Designer",
    "UI/UX Design",
    "Node.js",
    "React",
    "Next.js",
    "Tailwind CSS",
  ];

  const scrollingSkills = [...skills, ...skills, ...skills];

  return (
    <section
      id="about"
      className="min-h-[70vh] flex items-center justify-center px-2 sm:px-6 lg:px-8 py-2 sm:py-12 bg-white my-[5px]">
      <div className="max-w-7xl mx-auto w-full">
        {/* Main Content - 2 columns on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-2 sm:gap-8 lg:gap-12 items-stretch">
          {/* Left Image */}
          <div className="col-span-2 sm:col-span-1 animate-fade-in-left flex items-stretch">
            <div className="relative w-full max-w-[140px] sm:max-w-md mx-auto lg:mx-0 flex items-center">
              <div className="relative w-full aspect-[3/4] rounded-lg sm:rounded-2xl overflow-hidden bg-gradient-to-br from-golden/20 to-golden/10 backdrop-blur-sm border-2 border-golden/30 shadow-[0_15px_40px_rgba(252,163,17,0.15)]">
                <img
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=800&fit=crop"
                  alt="Developer working at desk with multiple monitors"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 rounded-lg sm:rounded-2xl bg-gradient-to-b from-transparent via-transparent/30 to-golden/10 pointer-events-none" />

                {/* Experience Badge */}
                <div className="absolute bottom-1.5 sm:bottom-8 left-1.5 sm:left-8 bg-white/95 backdrop-blur-md p-1 sm:p-6 rounded-md sm:rounded-xl border-2 border-golden/20 shadow-[0_8px_32px_rgba(252,163,17,0.1)] max-w-[80px] sm:max-w-[200px]">
                  <span className="block text-xs sm:text-3xl font-extrabold text-golden">
                    1+
                  </span>
                  <span className="text-dark-navy text-[4px] sm:text-sm font-medium leading-tight">
                    Years exp
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="col-span-2 sm:col-span-1 animate-fade-in-right flex flex-col justify-center">
            <div className="flex items-center gap-1.5 sm:gap-4 mb-1 sm:mb-4">
              <span className="w-0.5 sm:w-1 h-1.5 sm:h-5 bg-golden rounded-full" />
              <span className="text-golden text-[7px] sm:text-sm font-bold tracking-wider uppercase">
                About Me
              </span>
            </div>

            <h2 className="text-xs sm:text-3xl lg:text-4xl font-extrabold leading-tight mb-1.5 sm:mb-4 text-dark-navy">
              Passionate about creating digital experiences that matter.
            </h2>

            {/* Description with Read More toggle */}
            <div className="space-y-0.5 sm:space-y-4 text-gray-600 text-[8px] sm:text-lg leading-relaxed">
              <p>
                I'm a full-stack developer with a strong focus on frontend
                architecture and user experience. My journey started with a
                curiosity for how things work on the web, and it has evolved
                into a career where I solve complex problems with elegant code.
              </p>

              {/* Hidden text - toggled with Read More */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}>
                <p>
                  When I'm not coding, I'm contributing to open source, writing
                  tech articles, or exploring the latest design trends. I
                  believe in continuous learning and adapting to the
                  ever-evolving tech landscape.
                </p>
                <p className="mt-0.5 sm:mt-4">
                  I'm passionate about building products that make a difference
                  and collaborating with teams to create exceptional digital
                  experiences.
                </p>
              </div>

              {/* Read More / Read Less Toggle */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-0.5 sm:gap-2 text-golden font-semibold text-[7px] sm:text-base hover:text-golden-dark transition-all duration-300 group mt-0.5 sm:mt-1">
                <span>{isExpanded ? "Read Less" : "Read More"}</span>
                <svg
                  className={`w-2 h-2 sm:w-4 sm:h-4 transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : ""
                  } group-hover:translate-y-0.5`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Skills - Auto-scrolling marquee */}
        <div className="mt-2 sm:mt-6 lg:mt-8 overflow-hidden border-y border-golden/20 py-1.5 sm:py-4">
          <div className="flex items-center gap-1.5 sm:gap-4 mb-1 sm:mb-2 px-2">
            <span className="w-0.5 sm:w-1 h-1.5 sm:h-5 bg-golden rounded-full flex-shrink-0" />
            <span className="text-golden text-[6px] sm:text-sm font-bold tracking-wider uppercase flex-shrink-0">
              Skills & Technologies
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-golden/30 to-transparent" />
          </div>

          {/* Scrolling container */}
          <div className="relative overflow-hidden">
            <div className="animate-scroll-skills flex whitespace-nowrap">
              {scrollingSkills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-block px-2 sm:px-6 py-0.5 sm:py-2.5 mx-0.5 sm:mx-2 border border-golden/30 rounded-full text-dark-navy text-[6px] sm:text-sm font-medium bg-golden/5 hover:bg-golden hover:text-white hover:border-golden transition-all duration-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
