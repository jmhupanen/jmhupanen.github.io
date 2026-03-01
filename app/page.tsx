import About from './components/About';
import ParticleNetwork from './components/ParticleNetwork';
import Projects from './components/Projects';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <ParticleNetwork />
      <main className="flex-1 relative" style={{ zIndex: 1 }}>
        <About />
        <Projects />
      </main>
      <Footer />
    </>
  );
}
