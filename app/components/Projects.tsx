import Image from 'next/image';
import { projects } from '../data/projects';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';
import { GitHubIcon } from './icons/GitHubIcon';

const Projects = () => {
    return (
        <section className="container mx-auto max-w-5xl px-6 pb-20">
            <h2 className="text-3xl font-bold text-white mb-10 text-center animate-fade-in">
                Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <article
                        key={project.id}
                        className="group bg-surface rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up flex flex-col"
                        style={{ animationDelay: `${index * 150}ms` }}
                    >
                        {project.image && (
                            <div className="overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={`${project.title} screenshot`}
                                    width={600}
                                    height={400}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        )}
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-xl font-semibold text-blue-400 mb-2">
                                {project.title}
                            </h3>
                            <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-1">
                                {project.description}
                            </p>

                            {project.tags && project.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 text-xs font-medium text-blue-300 bg-blue-900/30 rounded-md"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="flex gap-3">
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded-sm"
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
                                        className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded-sm"
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
    );
};

export default Projects;
