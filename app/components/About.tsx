const About = () => {
  return (
    <section className="w-full max-w-3xl mx-auto px-6 pt-24 pb-16 text-center animate-fade-in-up">
      <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white mb-4">
        Juho
      </h1>
      <p className="text-xl sm:text-2xl text-blue-400 font-medium mb-6">
        Software Engineer
      </p>
      <p className="text-lg text-gray-300 leading-relaxed max-w-xl mx-auto mb-8">
        I build tools and applications with modern technologies. Check out
        some of my work below.
      </p>
      <div className="flex justify-center gap-4">
        <a
          href="https://github.com/jmhupanen"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
          aria-label="GitHub Profile"
        >
          <svg
            className="w-5 h-5"
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
          GitHub
        </a>
      </div>
    </section>
  );
};

export default About;
