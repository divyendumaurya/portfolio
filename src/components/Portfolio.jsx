import React from "react";
import { motion } from "framer-motion";
import wiz from "../images/Banner/wiz.png";
import textutil from "../images/Banner/textutil.png";
import WizServices from "../images/Banner/WizServices.png";
import Netflix from "../images/Banner/Netflix.png";
import spot from "../images/Banner/spot.png";
import tic from "../images/Banner/tic.png";
import Admin from "../images/Banner/AdminPanel.png";
import Hungry from "../images/Banner/hungry365.png";

const Portfolio = () => {
  const portfolios = [
    {
      id: 1,
      src: Admin,
      text: "AdminDash",
      description: "Modern admin dashboard with analytics and user management",
      category: "Dashboard",
      techStack: ["React", "CSS", "JS"],
      href1: "https://admin-panels-div.netlify.app/",
      href2: "https://github.com/divyendumaurya?tab=repositories",
    },
    {
      id: 2,
      src: Hungry,
      text: "Hungry365 - Food Ordering App",
      description: "Complete food delivery platform with cart and checkout",
      category: "Web App",
      techStack: ["React", "Node", "CSS"],
      href1: "https://hungry365.netlify.app/",
      href2: "https://github.com/divyendumaurya/hungry-365.git",
    },
    {
      id: 3,
      src: wiz,
      text: "WizEcommerce - Online Store",
      description: "Full-featured e-commerce website with product catalog",
      category: "E-commerce",
      techStack: ["React", "CSS", "JS"],
      href1: "https://wizecommerce.netlify.app/",
      href2: "https://github.com/divyendumaurya/wizecommerce.git",
    },
    {
      id: 4,
      src: textutil,
      text: "TextUtil - Text Processing Tool",
      description: "Utility app for text manipulation and formatting",
      category: "Utility",
      techStack: ["React", "JS", "CSS"],
      href1: "https://texteditonline.netlify.app/",
      href2: "https://github.com/divyendumaurya/TextOnlineEdit.git",
    },
    {
      id: 5,
      src: spot,
      text: "Music24/7 - Spotify Clone",
      description: "Music streaming app with playlists and player controls",
      category: "Entertainment",
      techStack: ["React", "API", "CSS"],
      href1: "https://music24-7.netlify.app/",
      href2: "https://github.com/divyendumaurya/SpotifyClone",
    },
    {
      id: 6,
      src: tic,
      text: "Tic-Tac-Toe Game",
      description: "Classic game with AI opponent and score tracking",
      category: "Game",
      techStack: ["React", "JS", "CSS"],
      href1: "https://tic-tac-toe-by-div.netlify.app/",
      href2: "https://github.com/divyendumaurya/tic-tac-toe",
    },
  ];

  return (
    <div
      name="portfolio"
      className="min-h-screen bg-gradient-to-br from-bg-deep via-gray-900 to-bg-deep text-white py-20"
    >
      <div className="max-w-7xl p-4 mx-auto flex flex-col justify-center w-full">
        <div className="text-center pb-12">
          <h2 className="text-5xl font-bold mb-4 relative inline-block">
            <span className="text-white relative z-10">
              My Portfolio
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-brand-cyan rounded-full"></div>
              <div className="absolute -top-1 -right-2 w-2 h-2 bg-brand-magenta rounded-full animate-pulse"></div>
              <div
                className="absolute -bottom-1 -left-2 w-1 h-1 bg-brand-cyan rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Projects from my frontend learning journey - foundational work that
            helped shape my skills.
            <span className="text-brand-cyan font-medium">
              {" "}
              For my current industry-grade expertise, check out the Live
              Projects section above.
            </span>
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-0">
          {portfolios.map(
            (
              {
                id,
                src,
                href1,
                href2,
                style,
                text,
                description,
                category,
                techStack,
              },
              index
            ) => (
              <motion.div
                key={id}
                className={`group relative overflow-hidden bg-gray-800 rounded-xl border border-gray-700 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 hover:-translate-y-2 ${style}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="relative overflow-hidden">
                  <img
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    src={src}
                    alt={text}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Project Info in Blurry Background */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900/95 via-gray-800/90 to-transparent backdrop-blur-sm translate-y-2.5">
                    <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1">
                      {text}
                    </h3>
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <a
                    href={href1}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8"
                  >
                    <button className="w-1/2 px-3 py-3 m-3 duration-150 hover:scale-105 hover:text-cyan-300">
                      Demo
                    </button>
                  </a>
                  <a
                    href={href2}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8"
                  >
                    <button className="w-1/2 px-3 py-3 m-3 duration-150 hover:scale-105 hover:text-cyan-300">
                      Code
                    </button>
                  </a>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
