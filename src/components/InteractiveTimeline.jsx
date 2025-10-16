import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Rocket, Laptop, GraduationCap } from "lucide-react";

const TimelineNode = ({ item, index, isLast }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      className="relative flex items-start gap-6 pb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      {/* Timeline Line */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Timeline Dot */}
        <motion.div
          className="relative w-12 h-12 bg-brand-cyan rounded-full flex items-center justify-center shadow-lg z-10"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
        >
          {item.iconComponent && (
            <item.iconComponent size={20} className="text-white" />
          )}
        </motion.div>

        {/* Connecting Line */}
        {!isLast && (
          <motion.div
            className="w-0.5 h-16 bg-gray-600 mt-2"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
            style={{ transformOrigin: "top" }}
          />
        )}
      </div>

      {/* Content Card */}
      <motion.div
        className="flex-1 bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-brand-cyan/30 transition-colors duration-300"
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
          <h3 className="text-xl font-bold text-white">{item.title}</h3>
          <span className="text-sm text-brand-cyan font-medium px-3 py-1 bg-brand-cyan/10 rounded-full w-fit">
            {item.period}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Key Achievements */}
        {item.highlights && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-200 mb-3">
              Key Achievements:
            </h4>
            <div className="grid gap-2">
              {item.highlights.slice(0, 3).map((highlight, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-2 text-sm text-gray-400"
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.2 + 0.7 + idx * 0.1,
                  }}
                >
                  <div className="w-1 h-1 bg-brand-cyan rounded-full mt-2 flex-shrink-0"></div>
                  <span>{highlight}</span>
                </motion.div>
              ))}
              {item.highlights.length > 3 && (
                <span className="text-xs text-gray-500 italic ml-3">
                  +{item.highlights.length - 3} more achievements
                </span>
              )}
            </div>
          </div>
        )}

        {/* Technologies */}
        {item.technologies && (
          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-3">
              Technologies:
            </h4>
            <div className="flex flex-wrap gap-2">
              {item.technologies.map((tech, idx) => (
                <motion.span
                  key={idx}
                  className="px-3 py-1 bg-brand-cyan/10 border border-brand-cyan/20 rounded-md text-xs text-brand-cyan font-medium"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.2 + 0.9 + idx * 0.05,
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const InteractiveTimeline = () => {
  const timelineData = [
    {
      title: "Associate Software Engineer",
      period: "May 2024 – Present",
      iconComponent: Rocket,
      description:
        "Building scalable React.js applications at Techugo with focus on performance optimization and user experience.",
      highlights: [
        "Developed PWR (PickleBall Project) - live sports tournament platform",
        "Contributed to Josh (Video Streaming App) - TikTok-like streaming platform",
        "Built Admin Panels and College Browsing Platforms",
        "Implemented cross-timezone notifications using Moment.js",
        "Deployed and managed servers with FileZilla",
      ],
      technologies: [
        "React.js",
        "JavaScript",
        "Tailwind CSS",
        "API Integration",
        "PWA",
      ],
    },
    {
      title: "Frontend Developer",
      period: "Oct 2023 – Dec 2023",
      iconComponent: Laptop,
      description:
        "Started journey at Way2tanda, learning industry best practices and building foundational skills.",
      highlights: [
        "Learned modern React.js development patterns",
        "Worked on responsive UI/UX implementations",
        "Gained experience with version control and team collaboration",
        "Built reusable component libraries",
      ],
      technologies: ["React.js", "CSS", "Git", "Responsive Design"],
    },
    {
      title: "Learning & Growth",
      period: "2023 – Present",
      iconComponent: GraduationCap,
      description:
        "Graduated from Galgotias University and continuous learning in modern web technologies.",
      highlights: [
        "Mastered React.js ecosystem and modern JavaScript",
        "Specialized in UI/UX design principles",
        "Built multiple live projects impacting real users",
        "Developed expertise in performance optimization",
      ],
      technologies: ["HTML", "CSS", "JavaScript", "React.js", "UI/UX Design"],
    },
  ];

  return (
    <div className="relative max-w-5xl mx-auto py-16">
      {/* Header Section */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-white mb-3 relative">
          My Journey
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-brand-cyan rounded-full"></div>
        </h2>
        <p className="text-gray-400 text-lg mt-6">
          From learning to building live applications
        </p>
      </motion.div>

      {/* Timeline Content */}
      <div className="relative">
        {timelineData.map((item, index) => (
          <TimelineNode
            key={index}
            item={item}
            index={index}
            isLast={index === timelineData.length - 1}
          />
        ))}
      </div>

      {/* Simple Decorative Dots */}
      <div className="absolute top-20 right-4 w-1 h-1 bg-brand-cyan/60 rounded-full"></div>
      <div className="absolute bottom-20 left-4 w-1 h-1 bg-brand-cyan/40 rounded-full"></div>
    </div>
  );
};

export default InteractiveTimeline;
