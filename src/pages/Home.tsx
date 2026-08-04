import Hero from "@/components/Hero";
import About from "@/components/About";
import ServicesSection from "@/components/ServicesSection";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

const Home = () => {
  return (
    <main>
      <Hero />
      <About />
      <ServicesSection />
      <Projects />
      <Contact />
    </main>
  );
};

export default Home;
