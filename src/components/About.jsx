import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Key, Terminal, User, Briefcase, Code, HelpCircle } from "lucide-react";
import CodeTerminal from "./CodeTerminal";
import InteractiveTimeline from "./InteractiveTimeline";
import ProjectShowcase from "./ProjectShowcase";
import ThreeDHero from "./ThreeDHero";

const About = () => {
  const [showTimeline, setShowTimeline] = useState(false);

  const handleTerminalComplete = () => {
    setTimeout(() => setShowTimeline(true), 1000);
  };

  return (
    <div
      name="about"
      className="w-full min-h-screen bg-gradient-to-br from-bg-deep via-gray-900 to-bg-deep text-white overflow-hidden"
    >
      {/* Header Section */}
      <motion.div
        className="max-w-7xl mx-auto px-4 pt-20 pb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-16">
          <motion.h1
            className="text-5xl font-bold mb-4 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-white relative z-10">
              About Me
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-brand-cyan rounded-full"></div>
              <div className="absolute -top-1 -right-2 w-2 h-2 bg-brand-magenta rounded-full animate-pulse"></div>
              <div
                className="absolute -bottom-1 -left-2 w-1 h-1 bg-brand-cyan rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Frontend Developer building scalable web experiences with modern
            technologies
          </motion.p>
        </div>

        {/* Interactive Terminal */}
        <div className="mb-2 relative">
          <motion.div
            className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-cyan text-white px-3 py-1 rounded-full text-xs font-medium z-10 flex items-center gap-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <Terminal size={12} />
            Try typing commands here!
          </motion.div>
          <CodeTerminal onCommandComplete={handleTerminalComplete} />
        </div>
      </motion.div>

      {/* Interactive Call-to-Action */}
      {!showTimeline && (
        <motion.div
          className="max-w-7xl mx-auto px-4 py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <div className="bg-gray-800/40 border-2 border-dashed border-brand-cyan/30 rounded-xl p-8 text-center">
            <motion.div
              className="mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-16 h-16 bg-brand-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock size={32} className="text-brand-cyan" />
              </div>
            </motion.div>
            
            <h3 className="text-xl font-bold text-white mb-3 flex items-center justify-center gap-2">
              <span>My Journey is Locked!</span>
              <Key size={20} className="text-brand-cyan" />
            </h3>
            
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Use the terminal above to discover my story. Try commands like:
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {[
                { cmd: 'whoami', icon: User },
                { cmd: 'experience', icon: Briefcase },
                { cmd: 'skills', icon: Code },
                { cmd: 'help', icon: HelpCircle }
              ].map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-900 border border-brand-cyan/30 rounded-md text-brand-cyan font-mono text-sm flex items-center gap-2"
                >
                  <item.icon size={14} />
                  {item.cmd}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <motion.div
                className="w-2 h-2 bg-brand-cyan rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span>Complete terminal interaction to unlock timeline & projects</span>
              <motion.div
                className="w-2 h-2 bg-brand-cyan rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Animated Timeline */}
      {showTimeline && (
        <motion.div
          className="max-w-7xl mx-auto px-4 py-8"
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
          className="max-w-7xl mx-auto px-4 py-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <ProjectShowcase />
        </motion.div>
      )}

      {/* Professional 3D CTA Section */}
      {showTimeline && (
        <motion.div
          className="max-w-7xl mx-auto px-4 py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <ThreeDHero />
        </motion.div>
      )}

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-brand-cyan rounded-full animate-float opacity-60"></div>
        <div
          className="absolute top-3/4 right-10 w-3 h-3 bg-brand-magenta rounded-full animate-float opacity-60"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-brand-cyan rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default About;
