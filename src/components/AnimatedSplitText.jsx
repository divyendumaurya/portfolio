import React from "react";
import { motion } from "framer-motion";

const AnimatedSplitText = ({
  text,
  className = "",
  splitBy = "words", // 'words' or 'letters'
  staggerDelay = 0.1,
  initialDelay = 0,
}) => {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // If reduced motion is preferred, render static text
  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  // Split text based on splitBy prop
  const items =
    splitBy === "words"
      ? text
          .split(" ")
          .map((word, index) => ({ content: word, key: `word-${index}` }))
      : text
          .split("")
          .map((char, index) => ({
            content: char === " " ? "\u00A0" : char,
            key: `char-${index}`,
          }));

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.span
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => (
        <motion.span
          key={item.key}
          variants={itemVariants}
          className={splitBy === "words" ? "inline-block mr-2" : "inline-block"}
        >
          {item.content}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default AnimatedSplitText;
