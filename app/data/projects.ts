import { Project } from '../types';

export const projects: Project[] = [
    {
        id: 1,
        title: 'TLDR',
        description:
            'A simple URL shortener including support for the deployer to define so called "secret keywords" for redirection to the newest YouTube video of a chosen channel.',
        image: '/tldr-screenshot.webp',
        link: 'https://tldr.juho.page/',
        github: 'https://github.com/jmhupanen/tldr-url-shortener/',
        tags: [],
    },
    {
        id: 2,
        title: 'InstAnalyze',
        description:
            'A browser-based AI-powered image analysis tool that allows users to upload images and analyze them using image classification model MobileNet v3.',
        image: '/instanalyze-screenshot.webp',
        link: 'https://instanalyze.juho.page/',
        github: 'https://github.com/jmhupanen/instanalyze/',
        tags: [],
    },
    {
        id: 3,
        title: 'ASCII Art Generator',
        description:
            'An ASCII art generator with customization options that converts uploaded images into ASCII art.',
        image: '/ascii-screenshot.webp',
        link: 'https://juho.page/ascii-art-generator/',
        github: 'https://github.com/jmhupanen/ascii-art-generator/',
        tags: [],
    },
];
