import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CodeTerminal from './CodeTerminal';
import InteractiveTimeline from './InteractiveTimeline';
import ProjectShowcase from './ProjectShowcase';

const About = () => {
  const [showTimeline, setShowTimeline] = useState(false);

  const handleTerminalComplete = () => {
    setTimeout(() => setShowTimeline(true), 1000);
  };

  return (
    <div name="about" className="w-full min-h-screen bg-gradient-to-br from-bg-deep via-gray-900 to-bg-deep text-white">
      {/* Header Section */}
      <motion.div
        className="max-w-screen-lg mx-auto px-4 pt-20 pb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-16">
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-brand-cyan to-brand-magenta bg-clip-text text-transparent">
              About Me
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Frontend Developer building scalable web experiences with modern technologies
          </motion.p>
        </div>

        {/* Interactive Terminal */}
        <div className="mb-20">
          <CodeTerminal onCommandComplete={handleTerminalComplete} />
        </div>
      </div>

      {/* Animated Timeline */}
      {showTimeline && (
        <motion.div
          className="max-w-screen-xl mx-auto px-4 py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <InteractiveTimeline />
        </motion.div>
      )}

      {/* Project Showcase */}
      {showTimeline && (
        <motion.div
          className="max-w-screen-xl mx-auto px-4 py-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <ProjectShowcase />
        </motion.div>
      )}

      {/* Personal Touch Section */}
      {showTimeline && (
        <motion.div
          className="max-w-screen-lg mx-auto px-4 py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="bg-gray-800/60 backdrop-blur border border-gray-700 rounded-2xl p-8 text-center">
            <motion.div
              className="mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <span className="text-6xl">👨‍💻</span>
            </motion.div>
            
            <h3 className="text-2xl font-bold text-brand-cyan mb-4">
              Let's Build Something Amazing Together!
            </h3>
            
            <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
              I'm passionate about turning ideas into interactive and visually appealing digital experiences. 
              With 1.5+ years of hands-on experience, I specialize in React.js, JavaScript, and modern UI/UX design. 
              My goal is to blend creativity with functionality, bringing ideas to life in the digital realm.
            </p>

            <motion.div
              className="flex justify-center gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="flex items-center gap-2 text-brand-cyan">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm">Available for opportunities</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Floating Decorative Elements */}
      <div className="fixed top-1/4 left-10 w-2 h-2 bg-brand-cyan rounded-full animate-float opacity-60"></div>
      <div className="fixed top-3/4 right-10 w-3 h-3 bg-brand-magenta rounded-full animate-float opacity-60" style={{ animationDelay: '2s' }}></div>
      <div className="fixed bottom-1/4 left-1/4 w-1 h-1 bg-brand-cyan rounded-full animate-pulse"></div>
    </div>
  );
};

export default About;

export default About
