import About from "./components/About";
import Contact from "./components/Contact";
import Exp from "./components/Exp";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Portfolio from "./components/Portfolio";
import Social from "./components/Social";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Exp />
      <Contact />

      <Social />
    </>
  );
}

export default App;
