import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const CodeTerminal = ({ onCommandComplete }) => {
  const [currentCommand, setCurrentCommand] = useState("");
  const [output, setOutput] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [commandIndex, setCommandIndex] = useState(0);
  const outputRef = useRef(null);

  const commands = [
    {
      command: "whoami",
      output: [
        "> Divyendu Maurya",
        "> Frontend Developer 🚀",
        "> React.js Specialist | JavaScript Enthusiast",
        "> Building scalable web experiences at Techugo",
      ],
      delay: 100,
    },
    {
      command: "experience --current",
      output: [
        "> Associate Software Engineer – Techugo",
        "> Duration: May 2024 – Present",
        "> Projects: PWR (PickleBall), Josh (Video Streaming)",
        "> Status: ✅ Live & Impacting Users",
      ],
      delay: 120,
    },
    {
      command: "skills --list",
      output: [
        "> Frontend: React.js, JavaScript (ES6+), Tailwind CSS",
        "> Tools: Git, GitHub, FileZilla, API Integration",
        "> Deployment: Server Management, PWA Optimization",
        "> Special: Cross-timezone notifications with Moment.js",
      ],
      delay: 80,
    },
  ];

  const typeCommand = async (cmd, delay = 100) => {
    setIsTyping(true);
    setCurrentCommand("");

    for (let i = 0; i <= cmd.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      setCurrentCommand(cmd.slice(0, i));
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsTyping(false);
  };

  const executeCommand = async (commandObj) => {
    // Add command to output
    setOutput((prev) => [...prev, `$ ${commandObj.command}`]);

    // Type out each line of output
    for (const line of commandObj.output) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setOutput((prev) => [...prev, line]);
    }

    await new Promise((resolve) => setTimeout(resolve, 800));
  };

  useEffect(() => {
    const runCommands = async () => {
      for (let i = 0; i < commands.length; i++) {
        const cmd = commands[i];
        await typeCommand(cmd.command, cmd.delay);
        await executeCommand(cmd);
        setCurrentCommand("");
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // Notify parent that commands are complete
      if (onCommandComplete) {
        onCommandComplete();
      }
    };

    const timer = setTimeout(runCommands, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom when output changes
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleManualCommand = async (e) => {
    if (e.key === "Enter" && currentCommand.trim()) {
      const cmd = currentCommand.trim();

      // Easter eggs and additional commands
      const easterEggs = {
        help: [
          "Available commands: whoami, skills, experience, projects, contact",
          "Try: coffee, music, or surprise 😉",
        ],
        coffee: [
          "☕ Coffee.exe loaded...",
          "Developer fuel: 100% charged!",
          "Ready to code all night! 🌙",
        ],
        music: [
          "🎵 Currently playing: Lo-fi Hip Hop",
          "Coding playlist: Active",
          "Productivity mode: ON",
        ],
        surprise: [
          "🎉 You found an easter egg!",
          "🚀 Fun fact: This terminal was built with React!",
          '💡 Try typing "matrix" for a surprise...',
        ],
        matrix: [
          "🔍 Entering the Matrix...",
          "01001000 01100101 01101100 01101100 01101111",
          "🕶️ Welcome to the real world, Neo.",
        ],
        clear: [],
      };

      setOutput((prev) => [...prev, `$ ${cmd}`]);

      if (cmd === "clear") {
        setOutput([]);
      } else if (easterEggs[cmd]) {
        for (const line of easterEggs[cmd]) {
          await new Promise((resolve) => setTimeout(resolve, 200));
          setOutput((prev) => [...prev, line]);
        }
      } else {
        setOutput((prev) => [
          ...prev,
          `Command not found: ${cmd}`,
          'Type "help" for available commands',
        ]);
      }

      setCurrentCommand("");
    }
  };

  return (
    <motion.div
      className="bg-gray-900 rounded-lg p-6 font-mono text-sm max-w-4xl mx-auto shadow-2xl border border-brand-cyan/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-gray-400 ml-4">divyendu@portfolio:~$</span>
      </div>

      {/* Terminal Output */}
      <div
        ref={outputRef}
        className="space-y-1 max-h-96 overflow-y-auto scroll-smooth"
      >
        {output.map((line, index) => (
          <motion.div
            key={index}
            className={`${
              line.startsWith(">")
                ? "text-brand-cyan"
                : line.startsWith("$")
                ? "text-green-400"
                : "text-gray-300"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {line}
          </motion.div>
        ))}

        {/* Current typing command */}
        <div className="flex items-center text-green-400">
          <span>$ </span>
          <span>{currentCommand}</span>
          <motion.span
            className="ml-1 bg-brand-cyan w-2 h-4"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            _
          </motion.span>
        </div>
      </div>

      {/* Interactive Input */}
      <input
        type="text"
        value={currentCommand}
        onChange={(e) => setCurrentCommand(e.target.value)}
        onKeyPress={handleManualCommand}
        className="mt-4 w-full bg-transparent border border-gray-600 rounded px-3 py-2 text-gray-300 focus:border-brand-cyan focus:outline-none"
        placeholder="Type a command and press Enter..."
        disabled={isTyping}
      />

      <div className="mt-2 text-xs text-gray-500">
        Try: whoami, skills, experience, help, or discover hidden commands... 👨‍💻
      </div>
    </motion.div>
  );
};

export default CodeTerminal;
