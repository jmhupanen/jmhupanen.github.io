import About from './components/About';
import Footer from './components/Footer';

const projects = [
  {
    id: 1,
    title: 'TLDR',
    description: 'A simple URL shortener including support for the deployer to define so called "secret keywords" for redirection to the newest YouTube video of a chosen channel.',
    image: '/tldr-screenshot.webp',
    link: 'https://tldr.juho.page/',
    github: 'https://github.com/jmhupanen/tldr-url-shortener/',
  },
  {
    id: 2,
    title: 'InstAnalyze',
    description: 'A browser-based AI-powered image analysis tool that allows users to upload images and analyze them using image classification model MobileNet v3.',
    image: '/instanalyze-screenshot.webp',
    link: 'https://instanalyze.juho.page/',
    github: 'https://github.com/jmhupanen/instanalyze/',
  },
    {
    id: 3,
    title: 'ASCII Art Generator',
    description: 'An ASCII art generator with customization options that converts uploaded images into ASCII art.',
    image: '/ascii-screenshot.webp',
    link: 'https://juho.page/ascii-art-generator/',
    github: 'https://github.com/jmhupanen/ascii-art-generator/',
  }
];

export default function Home() {
  return (
    <div className='relative flex flex-col h-screen'>
      <About />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h2 className="text-2xl font-semibold text-blue-400 mb-2">{project.title}</h2>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex space-x-4">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};