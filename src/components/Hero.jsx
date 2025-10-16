import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-scroll";
import AnimatedSplitText from "./AnimatedSplitText";
import HeroImage from "../images/hero1.jpg";

const Hero = () => {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Motion values for image tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transform motion values to rotation
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  // Handle mouse movement for tilt effect
  const handleMouseMove = (event) => {
    if (prefersReducedMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;

    x.set(0);
    y.set(0);
  };

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
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

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.5,
      },
    },
  };

  return (
    <section
      name="home"
      className="min-h-screen bg-gradient-to-br from-bg-deep via-gray-900 to-bg-deep text-white py-16 lg:py-0"
    >
      <div className="max-w-screen-lg mx-auto px-4 min-h-screen flex items-center justify-center">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Animated Headline */}
            <motion.div variants={itemVariants}>
              <AnimatedSplitText
                text="Creative Frontend Developer"
                className="text-5xl lg:text-6xl font-bold leading-tight"
                splitBy="words"
                staggerDelay={0.15}
                initialDelay={0.2}
              />
              <div className="mt-4">
                <AnimatedSplitText
                  text="& UI Designer"
                  className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-brand-cyan to-brand-magenta bg-clip-text text-transparent"
                  splitBy="words"
                  staggerDelay={0.15}
                  initialDelay={0.8}
                />
              </div>
            </motion.div>

            {/* Paragraph */}
            <motion.p
              className="text-xl text-muted-300 leading-relaxed max-w-md"
              variants={itemVariants}
            >
              I create beautiful, interactive experiences that blend creativity
              with cutting-edge technology. Let's bring your ideas to life in
              the digital realm.
            </motion.p>

            {/* Portfolio Button */}
            <motion.div variants={itemVariants}>
              <Link
                to="portfolio"
                smooth
                duration={500}
                className="group text-white px-6 py-3 my-2 w-fit flex items-center rounded-md bg-gradient-to-r from-cyan-400 to-blue-500 cursor-pointer hover:shadow-neon hover:scale-105 transition-all duration-300"
              >
                Portfolio
                <span className="group-hover:rotate-90 duration-300">
                  <MdOutlineKeyboardArrowRight size={22} />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right Column - Image Card */}
          <motion.div
            className="flex justify-center lg:justify-end"
            variants={imageVariants}
          >
            <motion.div
              className="relative w-80 h-96 rounded-2xl shadow-2xl overflow-hidden cursor-pointer"
              style={
                prefersReducedMotion
                  ? {}
                  : {
                      rotateX,
                      rotateY,
                      transformStyle: "preserve-3d",
                    }
              }
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Hero Image */}
              <img
                src={HeroImage}
                alt="Hero"
                className="w-full h-full object-cover"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-cyan/20 to-brand-magenta/20 z-10"></div>

              {/* Floating elements */}
              <div className="absolute top-6 right-6 w-3 h-3 bg-brand-cyan rounded-full animate-float"></div>
              <div
                className="absolute bottom-8 left-8 w-2 h-2 bg-brand-magenta rounded-full animate-float"
                style={{ animationDelay: "2s" }}
              ></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
