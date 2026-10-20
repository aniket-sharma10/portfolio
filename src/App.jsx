import About from "./components/About";
import Contact from "./components/Contact";
import Spotlight from "./components/effects/Spotlight";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Technologies from "./components/Technologies";

// The id wrappers and the .legacy container are temporary: each goes away once its section is rebuilt on <Section>
function App() {
  return (
    <div id="top">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-small focus:font-medium focus:text-canvas focus:shadow-focus focus:outline-none"
      >
        Skip to content
      </a>

      <Spotlight />
      <Navbar />

      <main id="content" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <About />
        <Experience />
        <Technologies />
        <div className="legacy container mx-auto overflow-x-clip px-4 sm:px-8">
          <div id="projects" className="scroll-mt-16">
            <Projects />
          </div>
          <div id="contact" className="scroll-mt-16">
            <Contact />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
