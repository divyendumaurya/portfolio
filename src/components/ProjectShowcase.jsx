import React, { useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Video, GraduationCap, Rocket } from "lucide-react";

const ProjectCard = ({ project, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-80 h-64 mx-auto cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ y: -10 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <motion.div
          className="absolute inset-0 w-full h-full backface-hidden rounded-xl border border-gray-700 shadow-xl"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
          }}
        >
          <div className="relative h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden">
            {/* Project Icon/Logo */}
            <div className="absolute top-6 left-6 w-12 h-12 bg-brand-cyan rounded-lg flex items-center justify-center">
              {project.icon}
            </div>

            {/* Status Badge */}
            <div className="absolute top-6 right-6">
              <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-xs font-medium">
                {project.status}
              </span>
            </div>

            <div className="p-6 pt-20 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {project.shortDescription}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {project.techStack.slice(0, 3).map((tech, idx) => (
                    <div
                      key={idx}
                      className="w-8 h-8 bg-brand-cyan/20 border-2 border-gray-700 rounded-full flex items-center justify-center text-xs text-brand-cyan"
                      title={tech}
                    >
                      {tech.charAt(0)}
                    </div>
                  ))}
                  {project.techStack.length > 3 && (
                    <div className="w-8 h-8 bg-gray-700 border-2 border-gray-600 rounded-full flex items-center justify-center text-xs text-gray-400">
                      +{project.techStack.length - 3}
                    </div>
                  )}
                </div>

                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-3 py-1 bg-brand-cyan hover:bg-brand-cyan/80 rounded-md text-white text-xs font-medium hover:scale-105 transition-all duration-200"
                >
                  View Live →
                </a>
              </div>
            </div>

            {/* Decorative Corner Elements */}
            <div className="absolute top-3 right-3 w-2 h-2 bg-brand-cyan/30 rounded-full animate-pulse"></div>
            <div
              className="absolute bottom-3 left-3 w-1 h-1 bg-brand-magenta/40 rounded-full animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>
        </motion.div>

        {/* Back Side */}
        <motion.div
          className="absolute inset-0 w-full h-full backface-hidden rounded-xl border border-gray-700 shadow-xl"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="h-full bg-gradient-to-br from-gray-900 to-black rounded-xl p-4 flex flex-col relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-brand-cyan truncate">
                {project.title}
              </h3>
              <span className="text-xs text-gray-500 whitespace-nowrap">
                ← Click to flip
              </span>
            </div>

            {/* Content Area */}
            <div className="flex-1 space-y-3">
              {/* Features */}
              <div>
                <h4 className="text-sm font-semibold text-brand-magenta mb-2">
                  Key Features:
                </h4>
                <ul className="space-y-1">
                  {project.features.slice(0, 3).map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-gray-400 flex items-start"
                    >
                      <span className="text-brand-cyan mr-2 flex-shrink-0">
                        ▸
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                  {project.features.length > 3 && (
                    <li className="text-xs text-gray-500 italic">
                      +{project.features.length - 3} more features...
                    </li>
                  )}
                </ul>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-sm font-semibold text-brand-magenta mb-2">
                  Tech Stack:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {project.techStack.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-brand-cyan/10 border border-brand-cyan/20 rounded text-xs text-brand-cyan whitespace-nowrap"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-2 py-1 bg-gray-700/30 border border-gray-600/30 rounded text-xs text-gray-400 whitespace-nowrap">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Fixed Button Area */}
            <div className="mt-4 pt-3 border-t border-gray-700/50">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="block w-full py-3 bg-brand-cyan hover:bg-brand-cyan/80 rounded-lg text-center text-white font-semibold text-sm hover:scale-105 hover:shadow-lg transition-all duration-200 shadow-md"
                >
                  View Live Project →
                </a>
              )}
            </div>

            {/* Decorative Corner Elements */}
            <div className="absolute top-2 right-2 w-2 h-2 bg-brand-cyan/30 rounded-full animate-pulse"></div>
            <div
              className="absolute bottom-2 left-2 w-1 h-1 bg-brand-magenta/40 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ProjectShowcase = () => {
  const projects = [
    {
      title: "PWR (PickleBall Project)",
      icon: <Gamepad2 className="w-6 h-6 text-white" />,
      status: "Live",
      shortDescription:
        "Sports tournament platform for PickleBall enthusiasts with real-time scoring and tournament management.",
      features: [
        "Real-time tournament management",
        "Live scoring system",
        "Player registration & profiles",
        "Match scheduling & notifications",
        "Performance analytics dashboard",
      ],
      techStack: [
        "React.js",
        "JavaScript",
        "Tailwind CSS",
        "API Integration",
        "PWA",
      ],
      liveUrl: "https://rankings.pwr.global/",
    },
    {
      title: "Josh (Video Streaming)",
      icon: <Video className="w-6 h-6 text-white" />,
      status: "Live",
      shortDescription:
        "TikTok-like video streaming platform with smooth UI, responsive design, and efficient video handling.",
      features: [
        "Smooth video streaming UI",
        "Responsive design for all devices",
        "Efficient API integrations",
        "Video upload & processing",
        "User engagement features",
      ],
      techStack: [
        "React.js",
        "Video APIs",
        "Responsive Design",
        "JavaScript",
        "CSS",
      ],
      liveUrl: "https://myjosh.in/",
    },
    {
      title: "College Browsing Platform",
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      status: "Under Development",
      shortDescription:
        "College exploration platform similar to CollegeDuniya with advanced filtering and search capabilities.",
      features: [
        "Advanced college search & filters",
        "Detailed college profiles",
        "Course information & fees",
        "Admission process guidance",
        "User reviews & ratings",
      ],
      techStack: [
        "React.js",
        "Search APIs",
        "Filter System",
        "JavaScript",
        "Tailwind CSS",
      ],
      liveUrl: "https://unigoal.com/",
    },
  ];

  return (
    <div className="py-2">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-white mb-4">Live Projects</h2>
        <p className="text-gray-400">
          Click on cards to explore project details
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>

      <motion.div
        className="text-center mt-12 pt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <p className="text-sm text-gray-500 italic">
          ✨ All projects are live and actively impacting users
        </p>
      </motion.div>
    </div>
  );
};

export default ProjectShowcase;
