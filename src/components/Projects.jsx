import React, { useState, useEffect } from 'react';
import ProjectModal from './ProjectModal';
import { inventoImg, searchImg, cyberImg, chatImg, notesImg, projectImg, analyticsImg, loanImg, ticketImg } from "../components/importimages";
import portfolioImg from '../assets/pro_img/portfolio.jpg';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const categories = ['All', 'Web', 'AIML', 'Analytics', 'React'];

const allProjects = [
  {
    title: 'INVENTO – Inventory Manager',
    category: 'Web',
    description:
      'Developed an offline inventory and billing web app using LocalStorage with CRUD operations, bulk item management, and auto PDF invoicing. Designed a responsive SCSS-based UI featuring sales analytics, expense tracking, and PWA-like offline performance.',
    url: 'https://github.com/Menaka0411/inventory-manager.git',
    images: inventoImg,
    technologies: ['JavaScript', 'LocalStorage', 'SCSS', 'PWA'],
  },
  {
    title: 'Image Search Web App',
    category: 'React',
    description:
      'Developed a full-stack responsive image search application integrating Unsplash API for fetching high-quality images. Implemented secure OAuth authentication via Google, GitHub, and Facebook using Passport.js. Designed an interactive frontend with React and Tailwind CSS featuring personalized search history and global trending search terms. Built backend APIs with Node.js, Express.js, and MongoDB for user data and search metadata management.',
    url: 'https://github.com/Menaka0411/mern-image-search-app.git',
    images: searchImg,
    technologies: ['React', 'Node', 'Express', 'MongoDB', 'Unsplash API'],
  },
  {
    title: 'Cyberbullying Detection',
    category: 'React',
    description:
      'Extended a previously built React chat application by adding a Cyber Safe Mode feature to detect and block offensive messages in real-time using an ML-based text classification API. Included friendship checks to prevent harmful messages between non-friends.',
    url: 'https://github.com/Menaka0411/React_Chat_App.git',
    images: cyberImg,
    technologies: ['React', 'Node', 'Express', 'Socket.io', 'ML'],
  },
  {
    title: 'React Real-Time Chat',
    category: 'React',
    description:
      'Developed a real-time chat application using React, Node.js, Express, MongoDB, and Socket.io, offering instant messaging with real-time updates, ability to add new contacts and create groups.',
    url: 'https://github.com/Menaka0411/React_Chat_App.git',
    images: chatImg,
    technologies: ['React', 'Node', 'Express', 'MongoDB', 'Socket.io'],
  },
  {
    title: 'Collaborative Notes App',
    category: 'React',
    description:
      'Developed a Collaborative Notes App with rich text editor, real-time sync, and permission-based sharing using React. The app enables users to create, edit, view, delete, and share notes.',
    url: 'https://github.com/Menaka0411/Collaborative_Notes_App.git',
    images: notesImg,
    technologies: ['React', 'Node', 'Express', 'MongoDB'],
  },
  {
    title: 'Modern Professional Portfolio',
    category: 'React',
    description:
      'An advanced, gamified professional portfolio featuring a 3D-perspective Quest Map, a custom terminal-inspired contact system, and a dedicated analytics engine. Built with a focus on high-end UI/UX, responsive architectural design, and real-time visitor interaction tracking via Google Sheets integration.',
    url: '',
    images: [portfolioImg],
    technologies: ['React', 'Framer Motion', 'TailwindCSS', 'Google Apps Script', 'Analytics API'],
  },
  {
    title: 'Project Management System',
    category: 'Web',
    description:
      'Created a Project Management System for college, enabling secure student and staff logins, project tracking, team creation, and mentor-student collaboration. The system includes dashboards for students to monitor projects and deadlines, and for staff to allocate mentors, provide feedback, and manage project timelines.',
    url: 'https://github.com/Menaka0411/Project_Management_System.git',
    images: projectImg,
    technologies: ['PHP', 'MySQL', 'HTML', 'CSS'],
  },
  {
    title: 'Twitter Analytics Dashboard',
    category: 'Analytics',
    description:
      'Designed and developed an interactive Power BI dashboard to analyze real-time Twitter data for engagement metrics and trending patterns. Strengthened data visualization skills while enhancing understanding of real-world analytics use cases.',
    url: 'https://github.com/Menaka0411/Twitter-Analysis-Dashboard.git',
    images: analyticsImg,
    technologies: ['Power BI', 'Data Cleaning', 'Data Visualization'],
  },
  {
    title: 'Loan Prediction System',
    category: 'AIML',
    description:
      'Created a loan prediction system using the Random Forest algorithm, coupled with a money tracking app to help users manage finances effectively. This project streamlined the loan approval process and provided tools for budgeting and financial analysis.',
    url: 'https://github.com/Menaka0411/Loan_Eligibility_Prediction',
    images: loanImg,
    technologies: ['Python', 'Flask', 'Scikit-Learn', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Movie Ticket Booking System',
    category: 'Web',
    description:
      'An online platform to browse movies, select seats, and securely book tickets.',
    url: 'https://github.com/Menaka0411/Movie_Ticket_Booking_System',
    images: ticketImg,
    technologies: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Dynamic Initial Count based on Device
  useEffect(() => {
    const getInitialCount = () => {
      if (window.innerWidth >= 1024) return 3; // Desktop: 1 row of 3
      if (window.innerWidth >= 768) return 4;  // Tablet: 2 rows of 2
      return 3; // Mobile: 3 cards
    };
    setVisibleCount(getInitialCount());
    
    const handleResize = () => setVisibleCount(getInitialCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedCategory]); // Reset when category changes

  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setModalOpen(false);
  };

  const filteredProjects =
    selectedCategory === 'All'
      ? allProjects
      : allProjects.filter((project) => project.category === selectedCategory);

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  return (
    <section id="projects" className="pt-24 pb-16 px-6 bg-[#020617] relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Project <span className="text-gradient">Showcase</span>
          </h2>
          <div className="h-1 w-20 bg-sky-500 mx-auto rounded-full" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setVisibleCount(3); }}
              className={`px-6 py-2 rounded-full font-bold transition-all duration-300 border ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-slate-950 border-sky-500 shadow-lg shadow-sky-500/20'
                  : 'bg-transparent text-slate-400 border-slate-800 hover:border-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, idx) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onClick={() => openModal(project)}
                className="group cursor-pointer glass-card rounded-2xl overflow-hidden flex flex-col glow-border"
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-sky-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-sky-500 bg-sky-500/10 px-2 py-1 rounded">
                      {project.category}
                    </span>
                  </div>
                  
                  <p className="text-slate-400 text-sm mb-6 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-[10px] font-mono text-slate-500">
                        #{tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[10px] font-mono text-slate-500">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {visibleCount < filteredProjects.length && (
          <div className="mt-16 text-center">
            <button
              onClick={() => {
                const increment = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 3;
                setVisibleCount(prev => prev + increment);
              }}
              className="px-8 py-3 bg-slate-900 text-slate-300 border border-slate-800 rounded-full font-bold hover:bg-slate-800 hover:text-white transition-all"
            >
              Load More Projects
            </button>
          </div>
        )}
      </div>

      {modalOpen && (
        <ProjectModal 
          isOpen={modalOpen} 
          onRequestClose={closeModal} 
          data={selectedProject} 
        />
      )}
    </section>
  );
};

export default Projects;
