const AboutPage = () => {
  return (
    <section className="min-h-screen px-4 sm:px-6 lg:px-8 pt-28 pb-20 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h3 className="text-lg sm:text-3xl lg:text-4xl font-extrabold text-dark-navy tracking-[0.2rem] mb-1 uppercase">
            About <span className="text-[#fca311]">Me</span>
          </h3>
          <div className="w-16 h-1 bg-[#fca311] mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Row 1: Image on right, 2 paragraphs on left */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-6 text-gray-600 text-base sm:text-lg leading-relaxed">
            <p>
              I'm a Frontend Developer, UI/UX Designer, and Graphic Designer
              passionate about creating digital experiences that are both
              visually compelling and functional. My background combines web
              development, user-centered design, and visual communication,
              allowing me to approach projects from both a design and
              development perspective.
            </p>
            <p>
              I have experience building responsive web applications and
              translating UI/UX concepts into interactive interfaces using
              technologies such as React, HTML, CSS, and JavaScript, while also
              using tools such as Figma and Adobe Creative Suite to create
              engaging designs, prototypes, and brand experiences.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end items-justify">
            <img
              src="/img/me.jpg"
              alt="Profile photo"
              className="w-60 h-80 sm:w-80 sm:h-80 lg:w-[250px] lg:h-[300px] rounded-[10px] object-cover border-2 border-gray-200 shadow-lg"
            />
          </div>
        </div>

        {/* Row 2: Remaining 2 paragraphs (full width) */}
        <div className="grid grid-cols-1 gap-6 text-gray-600 text-base sm:text-lg leading-relaxed border-t border-gray-100 pt-8">
          <p>
            My approach is centered around understanding the problem, designing
            intuitive experiences, and developing clean, responsive interfaces
            that work effectively across different devices. Through my work, I
            aim to bridge the gap between design and development—turning ideas
            into digital products that are simple, purposeful, and engaging.
          </p>
          <p>
            I'm continuously learning and expanding my skills in frontend
            development, UI/UX design, graphic design, and modern web
            technologies, with the goal of creating meaningful digital
            experiences and solving real-world problems through technology.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
