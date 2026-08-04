const AboutPage = () => {
  return (
    <section className="min-h-screen px-4 sm:px-6 lg:px-8 pt-28 pb-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark-navy tracking-tight mb-1">
            About Me
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Learn more about my journey, skills, and what drives me.
          </p>
        </div>

        <div className="space-y-6 text-gray-600 text-base sm:text-lg leading-relaxed">
          <p>
            I'm a full-stack developer with a strong focus on frontend
            architecture and user experience. My journey started with a
            curiosity for how things work on the web, and it has evolved into a
            career where I solve complex problems with elegant code.
          </p>
          <p>
            When I'm not coding, I'm contributing to open source, writing tech
            articles, or exploring the latest design trends. I believe in
            continuous learning and adapting to the ever-evolving tech
            landscape.
          </p>
          <p>
            I'm passionate about building products that make a difference and
            collaborating with teams to create exceptional digital experiences.
          </p>
          <p>
            With experience in both frontend and backend development, I bring a
            holistic approach to building web applications. My design background
            helps me create interfaces that are not only functional but also
            visually appealing and intuitive to use.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
