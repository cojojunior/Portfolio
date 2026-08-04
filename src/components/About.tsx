import { Link } from "react-router-dom";

const About = () => {
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
      className="min-h-[20vh] flex items-center justify-center px-3 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto w-full">
        {/* Main Content - 2 columns on mobile with image left */}
        <div className="grid grid-cols-2 gap-2 sm:gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN - Image */}
          <div className="col-span-1 animate-fade-in-left flex items-center justify-start">
            <div className="relative w-full max-w-[140px] sm:max-w-md">
              <div className="relative w-full aspect-[3/4] rounded-lg sm:rounded-2xl overflow-hidden backdrop-blur-sm ">
                <img
                  src="/img/me.jpg"
                  alt="Developer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 rounded-lg sm:rounded-2xl bg-gradient-to-b from-transparent via-transparent/30 to-golden/10 pointer-events-none" />

                {/* Experience Badge - Compact */}
                <div className="absolute bottom-1 sm:bottom-2 left-2 sm:left-6 bg-black/35 backdrop-blur-md px-1.5 sm:px-3 py-0.5 sm:py-1.5 rounded-md sm:rounded-md h-fit w-fit">
                  <span className="block text-[10px] sm:text-2xl font-bold text-white leading-none tracking-wide">
                    1+
                  </span>
                  <span className="text-golden text-[4px] sm:text-sm font-medium leading-tight">
                    Years exp
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Text Content */}
          <div className="col-span-1 animate-fade-in-right">
            <h2 className="text-xs sm:text-3xl lg:text-4xl font-extrabold leading-tight mb-2 sm:mb-4 text-dark-navy">
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

              {/* Read More - Links to About page */}
              <Link
                to="/about"
                className="inline-flex items-center gap-0.5 sm:gap-2 text-golden font-semibold text-[7px] sm:text-base hover:text-golden-dark transition-all duration-300 group mt-0.5 sm:mt-1">
                <span>Read More</span>
                <svg
                  className={`w-2 h-2 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Skills - Full width underneath both columns */}
        <div className="mt-1 sm:mt-6 lg:mt-8 overflow-hidden  py-2 sm:py-4">
          <div className="flex items-center gap-1.5 sm:gap-4 mb-0.5 sm:mb-2 px-2">
            <span className="w-0.5 sm:w-1 h-1.5 sm:h-5 bg-golden rounded-full flex-shrink-" />
            <span className="text-dark-navy text-[6px] sm:text-sm font-bold tracking-wider uppercase flex-shrink-0">
              Skills & Technologies
            </span>
            <div className="flex-1 h-px" />
          </div>

          {/* Scrolling container */}
          <div className="relative overflow-hidden">
            <div className="animate-scroll-skills flex whitespace-nowrap">
              {scrollingSkills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-block px-2 sm:px-6 py-0.5 sm:py-2.5 mx-0.5 sm:mx-2 rounded-full text-dark-navy text-[6px] sm:text-sm font-medium bg-black/5 hover:bg-golden hover:text-white hover:border-golden transition-all duration-100">
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
