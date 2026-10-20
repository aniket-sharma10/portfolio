import About from "./components/About";
import Contact from "./components/Contact";
import Spotlight from "./components/effects/Spotlight";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Technologies from "./components/Technologies";

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
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
