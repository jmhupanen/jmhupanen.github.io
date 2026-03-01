import About from './components/About';
import DotMatrix from './components/DotMatrix';
import Projects from './components/Projects';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <DotMatrix />
      <main className="flex-1 relative" style={{ zIndex: 1 }}>
        <About />
        <Projects />
      </main>
      <Footer />
    </>
  );
}
