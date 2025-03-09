import About from './components/About';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className='relative flex h-screen'>
      <About />
      <Footer />
    </div>
  );
};