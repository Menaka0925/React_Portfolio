import React, { useState } from 'react';
import ProjectModal from './ProjectModal';
import { inventoImg, searchImg, cyberImg, chatImg, notesImg, projectImg, analyticsImg, loanImg, ticketImg, quizImg } from "../components/importimages";
import portfolioImg from '../assets/pro_img/portfolio.jpg';

import { motion } from 'framer-motion';

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
    technologies: ['React', 'Node', 'Express', 'MongoDB', 'Unsplash API', 'OAuth' ],
  },
  {
    title: 'Cyberbullying Detection on Social Media using Machine Learning ',
    category: 'React',
    description:
      'Extended a previously built React chat application by adding a Cyber Safe Mode feature to detect and block offensive messages in real-time using an ML-based text classification API. Included friendship checks to prevent harmful messages between non-friends and ensure safer communication.',
    url: 'https://github.com/Menaka0411/React_Chat_App.git',
    images: cyberImg,
    technologies: ['React', 'Node', 'Express', 'MongoDB', 'Socket.io', 'Machine Learning'],
  },
  {
    title: 'React Chat Application',
    category: 'React',
    description:
      'Developed a real-time chat application using React, Node.js, Express, MongoDB, and Socket.io, offering instant messaging with real-time updates, ability to add new contacts and create groups, private and group message archiving, customizable settings, and a seamless user experience without page reloads.',
    url: 'https://github.com/Menaka0411/React_Chat_App.git',
    images: chatImg,
    technologies: ['React', 'Node', 'Express', 'MongoDB', 'Socket.io'],
  },
  {
    title: 'Collaborative Notes App',
    category: 'React',
    description:
      'Developed a Collaborative Notes App with rich text editor, real-time sync, and permission-based sharing using React. The app evolved from a basic note-keeping tool using state and props to a fully interactive platform that enables users to create, edit, view, delete, and share notes.',
    url: 'https://github.com/Menaka0411/Collaborative_Notes_App.git',
    images: notesImg,
    technologies: ['React', 'Node', 'Express', 'MongoDB'],
  },
  {
    title: 'Portfolio Website',
    category: 'React',
    description:
      'My personal portfolio built using React and TailwindCSS. You are currently viewing it live.',
    url: '',
    images: [portfolioImg],
    technologies: ['React', 'TailwindCSS'],
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
  {
    title: 'Online Quiz',
    category: 'Web',
    description:
      'A web-based quiz platform with score tracking, responsive design, and review features.',
    url: 'https://github.com/Menaka0411/Online_Quiz',
    images: quizImg,
    technologies: ['HTML', 'CSS', 'JavaScript'],
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(3);

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

  const handleTabChange = (cat) => {
    setSelectedCategory(cat);
    setVisibleCount(3);
  };

  return (
    <section id="projects" className="py-12 px-6 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center">
       <motion.h2
          className="text-4xl font-bold mb-10 text-[#A35C7A] dark:text-[#C890A7]"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          Showcase
        </motion.h2>

        <div className="mb-10 flex flex-wrap justify-center gap-4">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => handleTabChange(cat)}
              className={`px-4 py-2 rounded-full border transition font-medium
                ${selectedCategory === cat
                  ? 'bg-[#A35C7A] text-white dark:bg-[#C890A7]'
                  : 'border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, idx) => (
              <div
                key={idx}
                onClick={() => openModal(project)}
                className="cursor-pointer 
                  bg-[#cf909d] dark:bg-[#A35C7A] 
                  text-[#212121] dark:text-[#FFFCFB]
                  border border-[#e0d4d9] dark:border-[#C890A7] 
                  p-4 rounded-xl shadow-md hover:shadow-lg transition"
              >
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-[#212121] dark:text-[#FFFCFB]">{project.title}</h3>
            </div>
          ))}
        </div>

        {visibleCount < filteredProjects.length && (
          <button
            onClick={() => setVisibleCount((prev) => prev + 3)}
            className="mt-10 px-6 py-2 bg-[#A35C7A] text-white dark:bg-[#C890A7] rounded-full shadow hover:scale-105 transition-transform"
          >
            Load More
          </button>
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
