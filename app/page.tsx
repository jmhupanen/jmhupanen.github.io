import About from './components/About';
import DotMatrix from './components/DotMatrix';
import Footer from './components/Footer';

const projects = [
  {
    id: 1,
    title: 'TLDR',
    description:
      'A simple URL shortener including support for the deployer to define so called "secret keywords" for redirection to the newest YouTube video of a chosen channel.',
    image: '/tldr-screenshot.webp',
    link: 'https://tldr.juho.page/',
    github: 'https://github.com/jmhupanen/tldr-url-shortener/',
  },
  {
    id: 2,
    title: 'InstAnalyze',
    description:
      'A browser-based AI-powered image analysis tool that allows users to upload images and analyze them using image classification model MobileNet v3.',
    image: '/instanalyze-screenshot.webp',
    link: 'https://instanalyze.juho.page/',
    github: 'https://github.com/jmhupanen/instanalyze/',
  },
  {
    id: 3,
    title: 'ASCII Art Generator',
    description:
      'An ASCII art generator with customization options that converts uploaded images into ASCII art.',
    image: '/ascii-screenshot.webp',
    link: 'https://juho.page/ascii-art-generator/',
    github: 'https://github.com/jmhupanen/ascii-art-generator/',
  },
];

const ExternalLinkIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg
    className="w-4 h-4"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

export default function Home() {
  return (
    <>
      <DotMatrix />
      <main className="flex-1 relative" style={{ zIndex: 1 }}>
        <About />

        <section className="container mx-auto max-w-5xl px-6 pb-20">
          <h2 className="text-3xl font-bold text-white mb-10 text-center animate-fade-in">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className="group bg-surface rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {project.image && (
                  <div className="overflow-hidden">
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex gap-3">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      >
                        <ExternalLinkIcon />
                        Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      >
                        <GitHubIcon />
                        Source
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
