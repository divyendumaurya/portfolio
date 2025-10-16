import React, { useState, useEffect } from "react";
import {
  Mail,
  Clock,
  CheckCircle,
  AlertTriangle,
  Coffee,
  Zap,
  Brain,
  Target,
  Rocket,
  Eye,
  Search,
  Edit3,
  Users,
  TrendingUp,
  Accessibility,
  Keyboard,
  MessageSquare,
  Send,
  Loader2,
  Star,
  Calendar,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStage, setSubmitStage] = useState(0);
  const [focusedField, setFocusedField] = useState("");
  const [keywordResponse, setKeywordResponse] = useState("");
  const [timeBasedGreeting, setTimeBasedGreeting] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [lastTypingTime, setLastTypingTime] = useState(0);
  const [responseTimeEstimate, setResponseTimeEstimate] = useState("");
  const [showTimeline, setShowTimeline] = useState(false);
  const [buttonPlayingHardToGet, setButtonPlayingHardToGet] = useState(false);
  const [buttonMoveCount, setButtonMoveCount] = useState(0);
  const [fieldWakeStates, setFieldWakeStates] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [screenReaderMessages, setScreenReaderMessages] = useState("");
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);
  const [grammarSuggestions, setGrammarSuggestions] = useState([]);
  const [contentScore, setContentScore] = useState(0);
  const [toneAnalysis, setToneAnalysis] = useState("");

  // Dynamic placeholders that evolve
  const placeholders = {
    name: {
      default: "Your name (hopefully not John Doe #47)",
      focused: "Come on, surprise me with originality...",
      filled: "Wow, an actual name! 👏",
    },
    email: {
      default: "your.email@definitely-not-fake.com",
      focused: "Make it real this time...",
      filled: "Gmail? How... predictable 📧",
    },
    message: {
      default: "Tell me something I haven't heard before...",
      focused: "This is where the magic happens ✨",
      filled: "Still typing? This must be good! 📝",
    },
  };

  // Submit button text evolution
  const buttonTexts = [
    "Let's talk",
    "Still thinking?",
    "Send it already! 🚀",
    "Sending to the void...",
    "Message launched! 🎉",
  ];

  // Time-based greetings
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 22 || hour < 6)
      return "Burning the midnight oil? Same here! 🌙";
    if (hour >= 6 && hour < 12) return "Morning person, eh? Respect! ☀️";
    if (hour >= 12 && hour < 17)
      return "Afternoon productivity mode activated! ⚡";
    if (hour >= 17 && hour < 22)
      return "Evening vibes! Perfect time to chat 🌅";
    return "";
  };

  // Keyword detection with responses
  const keywordResponses = {
    urgent: "Everything's urgent these days... but I hear you! 🚨",
    quick: "Famous last words: 'quick question' 😏",
    simple: "Simple? That's what they all say... 🤔",
    help: "Help is on the way! Like a coding superhero! 🦸‍♂️",
    project: "Another project? My favorite kind of challenge! 💼",
    website: "Websites are my jam! Let's build something awesome! 🌐",
    mobile: "Mobile-first thinking? You get it! 📱",
    design: "Design is where the magic happens! ✨",
    react: "React? Now you're speaking my language! ⚛️",
    javascript: "JavaScript - the language of possibilities! 🚀",
    portfolio: "Portfolio work? Time to show off! 🎨",
    freelance: "Freelance life chose us! 💪",
    budget: "Let's talk numbers... reasonably! 💰",
    timeline: "Time is relative... but deadlines aren't! ⏰",
    meeting: "Face-to-face chat? Count me in! 🤝",
  };

  // Smart suggestions based on common project types
  const projectSuggestions = [
    "I need a modern website for my business",
    "Looking for help with React development",
    "Want to build a mobile-responsive portfolio",
    "Need assistance with JavaScript functionality",
    "Interested in full-stack web development",
    "Looking for UI/UX design collaboration",
  ];

  // Typing speed responses
  const getTypingSpeedResponse = (speed) => {
    if (speed > 100) return "Woah there, speed demon! 🏎️";
    if (speed > 50) return "Nice typing skills! 👩‍💻";
    if (speed > 20) return "Steady as she goes... ⛵";
    if (speed > 5) return "Taking your time? I respect that 🐌";
    return "Deep in thought... 🤯";
  };

  // Smart response time estimation based on message complexity
  const calculateResponseTime = (message, name, email) => {
    const completionScore =
      (name ? 1 : 0) + (email ? 1 : 0) + (message ? 1 : 0);
    const messageLength = message.length;
    const urgencyKeywords = ["urgent", "asap", "quickly", "immediate"];
    const complexKeywords = [
      "complex",
      "detailed",
      "comprehensive",
      "full-stack",
      "enterprise",
    ];

    const hasUrgency = urgencyKeywords.some((keyword) =>
      message.toLowerCase().includes(keyword)
    );
    const hasComplexity = complexKeywords.some((keyword) =>
      message.toLowerCase().includes(keyword)
    );

    let baseTime = 24; // hours
    let humor = "";

    if (hasUrgency && hasComplexity) {
      baseTime = 12;
      humor = "Urgent AND complex? I admire your optimism! ⚡";
    } else if (hasUrgency) {
      baseTime = 8;
      humor = "Urgent request detected! Coffee machine activated ☕";
    } else if (hasComplexity) {
      baseTime = 48;
      humor = "Complex project ahead! Time to dust off the thinking cap 🤔";
    } else if (messageLength > 300) {
      baseTime = 36;
      humor = "War and Peace vibes! This deserves a proper response 📚";
    } else if (messageLength < 50) {
      baseTime = 6;
      humor = "Short and sweet! I like your style 🎯";
    } else {
      const responses = [
        "I'll get back to you faster than your last relationship lasted 💔",
        "Response time: Somewhere between instant noodles and fine wine 🍜🍷",
        "Faster than you can say 'JavaScript framework fatigue' 🚀",
        "Quicker than debugging a typo you've been staring at for hours 🐛",
      ];
      humor = responses[Math.floor(Math.random() * responses.length)];
    }

    // Adjust for completion score
    if (completionScore === 3) baseTime *= 0.8; // Reward complete forms

    return { hours: baseTime, message: humor };
  };

  // Timeline steps for visual representation
  const getTimelineSteps = (hours) => [
    {
      time: "0min",
      status: "Message received!",
      icon: Mail,
      completed: true,
    },
    {
      time: "5min",
      status: "Initial review & coffee preparation",
      icon: Coffee,
      completed: true,
    },
    {
      time: hours < 12 ? "2hrs" : "6hrs",
      status: "Deep dive into your request",
      icon: Search,
      completed: false,
    },
    {
      time: hours < 24 ? `${hours}hrs` : `${Math.floor(hours / 24)}d`,
      status: "Crafting the perfect response",
      icon: Edit3,
      completed: false,
    },
    {
      time: "Final",
      status: "Response delivered!",
      icon: Rocket,
      completed: false,
    },
  ];

  // Validation with personality
  const validateField = (field, value) => {
    const validationMessages = {
      name: {
        empty: "Silent treatment? Not very social...",
        tooShort: "Come on, even Cher has more letters",
        valid: "Now that's a proper introduction! ✓",
      },
      email: {
        empty: "How am I supposed to reply? Telepathy?",
        invalid: "That's not an email, that's modern art",
        valid: "Finally, something that looks like an email ✓",
      },
      message: {
        empty: "The strong silent type, eh?",
        tooShort: "That's it? My grocery list is longer...",
        valid: "Now we're cooking with gas! ✓",
      },
    };

    switch (field) {
      case "name":
        if (!value) return validationMessages.name.empty;
        if (value.length < 2) return validationMessages.name.tooShort;
        return validationMessages.name.valid;
      case "email":
        if (!value) return validationMessages.email.empty;
        if (!/\S+@\S+\.\S+/.test(value))
          return validationMessages.email.invalid;
        return validationMessages.email.valid;
      case "message":
        if (!value) return validationMessages.message.empty;
        if (value.length < 10) return validationMessages.message.tooShort;
        return validationMessages.message.valid;
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const currentTime = Date.now();

    // Calculate typing speed (characters per second)
    if (lastTypingTime > 0) {
      const timeDiff = (currentTime - lastTypingTime) / 1000;
      const charDiff = Math.abs(value.length - formData[name].length);
      const speed = timeDiff > 0 ? charDiff / timeDiff : 0;
      setTypingSpeed(speed);
    }
    setLastTypingTime(currentTime);

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation
    const validation = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: validation }));

    // Keyword detection and analysis for message field
    if (name === "message") {
      detectKeywords(value);
      updateSuggestions(value);

      // Calculate response time when message is substantial
      if (value.length > 20) {
        const estimate = calculateResponseTime(
          value,
          formData.name,
          formData.email
        );
        setResponseTimeEstimate(estimate);
        setShowTimeline(true);
      } else {
        setShowTimeline(false);
      }

      // Content analysis
      if (value.length > 10) {
        const suggestions = analyzeContent(value);
        setGrammarSuggestions(suggestions);

        const tone = analyzeTone(value);
        setToneAnalysis(tone);

        const score = calculateContentScore(value);
        setContentScore(score);
      } else {
        setGrammarSuggestions([]);
        setToneAnalysis("");
        setContentScore(0);
      }
    }
  };

  // Detect keywords and show responses
  const detectKeywords = (text) => {
    const lowerText = text.toLowerCase();
    let response = "";

    for (const [keyword, message] of Object.entries(keywordResponses)) {
      if (lowerText.includes(keyword)) {
        response = message;
        break;
      }
    }

    setKeywordResponse(response);

    // Clear response after 3 seconds
    if (response) {
      setTimeout(() => setKeywordResponse(""), 3000);
    }
  };

  // Update smart suggestions
  const updateSuggestions = (text) => {
    if (text.length < 3) {
      setSuggestions([]);
      return;
    }

    const matchingSuggestions = projectSuggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().includes(text.toLowerCase()) ||
        text
          .toLowerCase()
          .split(" ")
          .some(
            (word) => suggestion.toLowerCase().includes(word) && word.length > 2
          )
    );

    setSuggestions(matchingSuggestions.slice(0, 3));
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setFormData((prev) => ({ ...prev, message: suggestion }));
    setSuggestions([]);
    setKeywordResponse("Smart choice! I like your style 😎");
    setTimeout(() => setKeywordResponse(""), 2000);
  };

  // Initialize time-based greeting and accessibility detection
  useEffect(() => {
    setTimeBasedGreeting(getTimeBasedGreeting());

    // Detect if user prefers reduced motion or high contrast
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const prefersHighContrast = window.matchMedia(
      "(prefers-contrast: high)"
    ).matches;

    if (prefersReducedMotion || prefersHighContrast) {
      setAccessibilityMode(true);
      setScreenReaderMessages(
        "Accessibility mode detected! Sarcasm level: Professional 😉"
      );
    }

    // Keyboard navigation detection
    const handleKeyDown = (e) => {
      if (e.key === "Tab") {
        setKeyboardNavigation(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Playful submit button behavior
  const handleButtonHover = () => {
    const formComplete = formData.name && formData.email && formData.message;

    if (!formComplete && buttonMoveCount < 3) {
      setButtonPlayingHardToGet(true);
      setButtonMoveCount((prev) => prev + 1);

      // Reset after animation
      setTimeout(() => {
        setButtonPlayingHardToGet(false);
      }, 600);
    }
  };

  // Field wake up animation
  const handleFieldFocus = (fieldName) => {
    setFocusedField(fieldName);
    setFieldWakeStates((prev) => ({ ...prev, [fieldName]: true }));

    // Reset wake state after animation
    setTimeout(() => {
      setFieldWakeStates((prev) => ({ ...prev, [fieldName]: false }));
    }, 1000);
  };

  // Mouse tracking for particle effects
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Get playful button messages
  const getButtonPlayMessage = () => {
    const messages = [
      "Hey! Fill out the form first! 😏",
      "Nice try, but I'm not that easy! 💅",
      "Complete the form and I'll consider it 🤔",
    ];
    return messages[Math.min(buttonMoveCount, messages.length - 1)];
  };

  // Screen reader friendly messages
  const getAccessibleValidation = (field, message) => {
    const accessibleMessages = {
      name: {
        empty: "Name field is required. Please enter your name to proceed.",
        tooShort: "Name should be at least 2 characters long.",
        valid: "Name field completed successfully.",
      },
      email: {
        empty: "Email field is required. Please enter a valid email address.",
        invalid: "Please enter a valid email address format.",
        valid: "Email field completed successfully.",
      },
      message: {
        empty:
          "Message field is required. Please share your thoughts or project details.",
        tooShort:
          "Please provide more details in your message. Minimum 10 characters.",
        valid: "Message field completed successfully.",
      },
    };

    if (accessibilityMode) {
      return (
        accessibleMessages[field]?.[
          message.includes("✓")
            ? "valid"
            : message.includes("empty")
            ? "empty"
            : message.includes("short")
            ? "tooShort"
            : "invalid"
        ] || message
      );
    }
    return message;
  };

  // Keyboard sound effects (visual feedback for screen readers)
  const playKeyboardSound = (action) => {
    if (keyboardNavigation) {
      const soundMessages = {
        focus: "Field focused and ready for input",
        complete: "Field validation successful",
        error: "Please review field input",
        submit: "Form submission in progress",
      };

      setScreenReaderMessages(soundMessages[action] || "");
      setTimeout(() => setScreenReaderMessages(""), 2000);
    }
  };

  // Grammar and content analysis
  const analyzeContent = (text) => {
    const suggestions = [];
    const words = text.toLowerCase().split(/\s+/);

    // Grammar checks with sarcasm
    const grammarRules = [
      {
        pattern: /\bi\b/g,
        replacement: "I",
        message: "Capital 'I' - because you're important! 😉",
      },
      {
        pattern: /\bthier\b/g,
        replacement: "their",
        message: "It's 'their' not 'thier' - English is fun, right? 📚",
      },
      {
        pattern: /\byour\s+are\b/g,
        replacement: "you are",
        message: "You're vs your - the eternal struggle! 🤔",
      },
      {
        pattern: /\bits\s+a\b/g,
        replacement: "it's a",
        message: "Missing apostrophe detected! Grammar police activated 🚨",
      },
    ];

    grammarRules.forEach((rule) => {
      if (rule.pattern.test(text)) {
        suggestions.push({
          type: "grammar",
          message: rule.message,
          severity: "medium",
        });
      }
    });

    // Content quality analysis
    const qualityChecks = [
      {
        condition: words.length < 5,
        message: "A bit short, don't you think? Add some details! 📝",
        type: "length",
      },
      {
        condition: words.length > 100,
        message: "War and Peace vibes! Maybe keep it concise? ✂️",
        type: "length",
      },
      {
        condition:
          !text.includes("?") && !text.includes(".") && !text.includes("!"),
        message: "Punctuation is your friend! Don't leave sentences hanging 😅",
        type: "punctuation",
      },
      {
        condition: (text.match(/!/g) || []).length > 3,
        message: "Easy on the exclamation marks! We get it, you're excited! 🎉",
        type: "punctuation",
      },
    ];

    qualityChecks.forEach((check) => {
      if (check.condition) {
        suggestions.push({
          type: check.type,
          message: check.message,
          severity: "low",
        });
      }
    });

    return suggestions;
  };

  // Tone analysis
  const analyzeTone = (text) => {
    const words = text.toLowerCase().split(/\s+/);

    const toneWords = {
      professional: [
        "project",
        "business",
        "collaboration",
        "opportunity",
        "discuss",
      ],
      casual: ["hey", "cool", "awesome", "thanks", "chat"],
      urgent: ["urgent", "asap", "quickly", "immediate", "rush"],
      friendly: ["please", "thank you", "appreciate", "love", "amazing"],
    };

    let toneScores = {
      professional: 0,
      casual: 0,
      urgent: 0,
      friendly: 0,
    };

    words.forEach((word) => {
      Object.keys(toneWords).forEach((tone) => {
        if (toneWords[tone].includes(word)) {
          toneScores[tone]++;
        }
      });
    });

    const dominantTone = Object.keys(toneScores).reduce((a, b) =>
      toneScores[a] > toneScores[b] ? a : b
    );

    const toneMessages = {
      professional: "Professional tone detected! 💼 You mean business!",
      casual: "Casual vibes! 😎 Keeping it chill, I like that!",
      urgent: "Urgent tone detected! ⚡ Someone's got deadlines!",
      friendly:
        "Friendly tone! 😊 You seem like a pleasant person to work with!",
    };

    return toneScores[dominantTone] > 0
      ? toneMessages[dominantTone]
      : "Neutral tone - playing it safe! 🎯";
  };

  // Content quality scoring
  const calculateContentScore = (text) => {
    let score = 50; // Base score

    const words = text.split(/\s+/).length;

    // Length scoring
    if (words >= 20 && words <= 80) score += 20;
    else if (words < 10) score -= 10;
    else if (words > 100) score -= 5;

    // Structure scoring
    if (text.includes("?")) score += 5;
    if (text.includes(".")) score += 5;
    if (text.match(/[A-Z]/)) score += 5;

    // Content keywords
    const goodKeywords = [
      "project",
      "help",
      "collaborate",
      "discuss",
      "interested",
    ];
    goodKeywords.forEach((keyword) => {
      if (text.toLowerCase().includes(keyword)) score += 5;
    });

    return Math.min(Math.max(score, 0), 100);
  };

  const getCharacterCounter = (count, max) => {
    if (count === 0) return "0/500 - Speechless already? 😶";
    if (count < 50) return `${count}/500 - Getting warmed up... 🔥`;
    if (count < 200) return `${count}/500 - Now we're talking! 💬`;
    if (count < 450) return `${count}/500 - Easy there, Shakespeare 📚`;
    if (count === max) return `${count}/500 - Look who's an overachiever! 🏆`;
    return `${count}/500 - Perfect length! ✨`;
  };

  const getCurrentPlaceholder = (field) => {
    if (formData[field]) return placeholders[field].filled;
    if (focusedField === field) return placeholders[field].focused;
    return placeholders[field].default;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    playKeyboardSound("submit");

    // Advanced loading stories
    const loadingStories = [
      "📧 Message received! Coffee machine activated...",
      "🤖 Teaching AI to understand your request...",
      "🔍 Scanning message for hidden meanings...",
      "✨ Sprinkling some magic dust on your inquiry...",
      "🚀 Launching message into the digital stratosphere...",
      "🧠 Connecting neurons to craft the perfect response...",
      "⚡ Charging up the creativity batteries...",
      "🎯 Calibrating sarcasm levels to 'professional'...",
      "🛠️ Building a custom response just for you...",
      "🎉 Almost there... preparing for impact!",
    ];

    // Progress storytelling
    for (let i = 0; i < Math.min(loadingStories.length, 5); i++) {
      setScreenReaderMessages(loadingStories[i]);
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    // Button text animation sequence
    for (let i = 1; i < buttonTexts.length - 1; i++) {
      setSubmitStage(i);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    // Final success
    setTimeout(() => {
      setSubmitStage(buttonTexts.length - 1);
      setIsSubmitting(false);
      setScreenReaderMessages(
        "🎉 Message successfully launched! Response incoming..."
      );
      // Reset after success message
      setTimeout(() => {
        setSubmitStage(0);
        setScreenReaderMessages("");
      }, 3000);
    }, 1000);
  };

  return (
    <div
      name="contact me"
      className="w-full min-h-screen  bg-gradient-to-b from-black to bg-gray-800  text-white "
    >
      <div className="flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full py-10">
        <div className="pb-8">
          <p className=" text-4xl font-bold inline border-b-4 border-gray-400">
            Contact Me
          </p>
          <p className="text-xl mt-10">
            Submit the form below to get in touch!
          </p>

          {/* Accessibility Controls */}
          {keyboardNavigation && (
            <div className="mt-4 p-3 bg-green-900/30 rounded-lg border border-green-500/30">
              <div className="flex items-center text-green-300 text-sm font-medium mb-2">
                <Accessibility className="w-4 h-4 mr-2" />
                Keyboard navigation detected! High contrast mode available.
              </div>
              <button
                type="button"
                onClick={() => setAccessibilityMode(!accessibilityMode)}
                className="mt-2 text-xs text-green-400 underline hover:text-green-300 
                         transition-colors duration-200 focus:ring-2 focus:ring-green-400"
              >
                {accessibilityMode ? "Disable" : "Enable"} Enhanced
                Accessibility Mode
              </button>
            </div>
          )}

          {/* Screen Reader Live Region */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {screenReaderMessages}
          </div>

          {/* Time-based greeting with animation */}
          {timeBasedGreeting && (
            <div
              className={`mt-4 p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 
                          rounded-lg border border-cyan-400/30 ${
                            accessibilityMode ? "" : "animate-pulse"
                          }`}
            >
              <p className="text-cyan-300 text-sm font-medium">
                {timeBasedGreeting}
              </p>
            </div>
          )}
        </div>
        {/* Social Proof & Fun Stats */}
        <div className="text-center mb-6">
          <div className="flex justify-center space-x-6 text-sm text-gray-400 mb-4">
            <div className="flex items-center">
              <Send className="w-4 h-4 text-cyan-400 mr-1" />
              <span className="text-cyan-400 font-bold text-lg mr-1">
                {Math.floor(Math.random() * 150) + 50}
              </span>
              <span>messages sent today</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
              <span className="text-green-400 font-bold text-lg mr-1">98%</span>
              <span>satisfaction rate*</span>
            </div>
            <div className="flex items-center">
              <Coffee className="w-4 h-4 text-purple-400 mr-1" />
              <span className="text-purple-400 font-bold text-lg mr-1">∞</span>
              <span>coffee cups consumed</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 italic">
            *Based on scientifically unverified but highly optimistic
            assumptions 😄
          </p>

          {/* Live user activity (fake but fun) */}
          <div className="mt-4 p-2 bg-gray-800/50 rounded-lg border border-gray-600/30 inline-block">
            <div className="flex items-center text-xs text-gray-300">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
              <Users className="w-3 h-3 mr-1" />
              <span>
                {Math.floor(Math.random() * 8) + 2} people are currently
                crafting messages... be the next success story!
              </span>
              <Star className="w-3 h-3 ml-1 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <form
            className="flex flex-col w-full md:w-1/2"
            onSubmit={handleSubmit}
          >
            {/* Name Input */}
            <div
              className="relative group"
              onMouseMove={!accessibilityMode ? handleMouseMove : undefined}
            >
              <label htmlFor="name-input" className="sr-only">
                Your Name (Required)
              </label>
              <input
                id="name-input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onFocus={() => {
                  handleFieldFocus("name");
                  playKeyboardSound("focus");
                }}
                onBlur={() => setFocusedField("")}
                placeholder={getCurrentPlaceholder("name")}
                aria-describedby={errors.name ? "name-error" : undefined}
                aria-invalid={errors.name && !errors.name.includes("✓")}
                className={`w-full p-3 bg-transparent border-2 rounded-lg text-white 
                         focus:outline-none transition-all duration-500 hover:border-gray-300 hover:shadow-md
                         placeholder:text-gray-400 placeholder:transition-all placeholder:duration-300
                         ${
                           accessibilityMode
                             ? "border-gray-300 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/50"
                             : "border-gray-400 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/20"
                         }
                         ${
                           fieldWakeStates.name && !accessibilityMode
                             ? "animate-wake-up scale-105"
                             : ""
                         }
                         ${
                           keyboardNavigation
                             ? "focus:ring-2 focus:ring-cyan-400"
                             : ""
                         }`}
              />

              {/* Field wake-up indicator */}
              {fieldWakeStates.name && !accessibilityMode && (
                <div
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 
                              text-xs text-cyan-300 animate-bounce-in pointer-events-none flex items-center"
                >
                  <MessageSquare className="w-3 h-3 mr-1" />
                  Hello there!
                </div>
              )}
              {errors.name && (
                <div
                  id="name-error"
                  role="alert"
                  className={`text-sm mt-1 transition-all duration-300 ${
                    errors.name.includes("✓")
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {getAccessibleValidation("name", errors.name)}
                </div>
              )}
            </div>

            {/* Email Input */}
            <div className="relative group my-5" onMouseMove={handleMouseMove}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => handleFieldFocus("email")}
                onBlur={() => setFocusedField("")}
                placeholder={getCurrentPlaceholder("email")}
                className={`w-full p-3 bg-transparent border-2 border-gray-400 rounded-lg text-white 
                         focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/20
                         transition-all duration-500 hover:border-gray-300 hover:shadow-md
                         placeholder:text-gray-400 placeholder:transition-all placeholder:duration-300
                         ${
                           fieldWakeStates.email
                             ? "animate-wake-up scale-105"
                             : ""
                         }`}
              />

              {/* Field wake-up indicator */}
              {fieldWakeStates.email && (
                <div
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 
                              text-xs text-cyan-300 animate-bounce-in pointer-events-none flex items-center"
                >
                  <Mail className="w-3 h-3 mr-1" />
                  Ready to connect!
                </div>
              )}
              {errors.email && (
                <div
                  className={`text-sm mt-1 transition-all duration-300 ${
                    errors.email.includes("✓")
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {errors.email}
                </div>
              )}
            </div>

            {/* Message Textarea */}
            <div className="relative group" onMouseMove={handleMouseMove}>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                onFocus={() => handleFieldFocus("message")}
                onBlur={() => setFocusedField("")}
                placeholder={getCurrentPlaceholder("message")}
                rows="8"
                maxLength="500"
                className={`w-full p-3 bg-transparent border-2 border-gray-400 rounded-lg text-white 
                         focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/20
                         transition-all duration-500 hover:border-gray-300 hover:shadow-md resize-none
                         placeholder:text-gray-400 placeholder:transition-all placeholder:duration-300
                         ${
                           fieldWakeStates.message
                             ? "animate-wake-up scale-105"
                             : ""
                         }`}
              />

              {/* Field wake-up indicator */}
              {fieldWakeStates.message && (
                <div
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 
                              text-xs text-cyan-300 animate-bounce-in pointer-events-none flex items-center"
                >
                  <Star className="w-3 h-3 mr-1" />
                  Time to share your thoughts!
                </div>
              )}

              {/* Smart Suggestions */}
              {suggestions.length > 0 && (
                <div
                  className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 
                              rounded-lg shadow-xl z-10 animate-slide-down"
                >
                  <div className="p-2 text-xs text-gray-400 border-b border-gray-600">
                    💡 Smart suggestions (click to use):
                  </div>
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="p-3 text-sm text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-300 
                               cursor-pointer transition-all duration-200 border-b border-gray-700 last:border-b-0"
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}

              {/* Keyword Response */}
              {keywordResponse && (
                <div
                  className="absolute -top-12 left-0 right-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 
                              border border-purple-400/30 rounded-lg p-2 animate-bounce-in"
                >
                  <p className="text-purple-300 text-xs text-center font-medium">
                    {keywordResponse}
                  </p>
                </div>
              )}

              {/* Character Counter with Typing Speed */}
              <div className="flex justify-between items-center mt-2 text-xs">
                <span className="text-gray-400 transition-all duration-300">
                  {getCharacterCounter(formData.message.length, 500)}
                </span>
                {typingSpeed > 0 && formData.message.length > 0 && (
                  <span className="text-cyan-400 animate-fade-in">
                    {getTypingSpeedResponse(typingSpeed)}
                  </span>
                )}
              </div>

              {errors.message && (
                <div
                  className={`text-sm mt-1 transition-all duration-300 ${
                    errors.message.includes("✓")
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {errors.message}
                </div>
              )}
            </div>

            {/* Grammar & Content Suggestions */}
            {(grammarSuggestions.length > 0 ||
              toneAnalysis ||
              contentScore > 0) && (
              <div
                className="mt-4 p-4 bg-gradient-to-r from-amber-900/30 to-orange-900/30 
                            rounded-lg border border-amber-500/30 animate-slide-down"
              >
                <h4 className="text-amber-300 font-semibold text-sm mb-3 flex items-center">
                  🧠 Smart Content Analysis
                </h4>

                {/* Content Score */}
                {contentScore > 0 && (
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-300">
                        Content Quality Score
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          contentScore >= 80
                            ? "text-green-400"
                            : contentScore >= 60
                            ? "text-yellow-400"
                            : "text-orange-400"
                        }`}
                      >
                        {contentScore}/100
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-700 ${
                          contentScore >= 80
                            ? "bg-gradient-to-r from-green-500 to-emerald-500"
                            : contentScore >= 60
                            ? "bg-gradient-to-r from-yellow-500 to-amber-500"
                            : "bg-gradient-to-r from-orange-500 to-red-500"
                        }`}
                        style={{ width: `${contentScore}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Tone Analysis */}
                {toneAnalysis && (
                  <div className="mb-3 p-2 bg-purple-900/30 rounded border border-purple-500/30">
                    <p className="text-purple-300 text-xs">{toneAnalysis}</p>
                  </div>
                )}

                {/* Grammar Suggestions */}
                {grammarSuggestions.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-amber-400 font-medium">
                      💡 Suggestions:
                    </p>
                    {grammarSuggestions.slice(0, 3).map((suggestion, index) => (
                      <div
                        key={index}
                        className={`p-2 rounded text-xs border-l-2 ${
                          suggestion.severity === "high"
                            ? "bg-red-900/30 border-red-500 text-red-300"
                            : suggestion.severity === "medium"
                            ? "bg-yellow-900/30 border-yellow-500 text-yellow-300"
                            : "bg-blue-900/30 border-blue-500 text-blue-300"
                        }`}
                      >
                        {suggestion.message}
                      </div>
                    ))}
                  </div>
                )}

                {/* Pro tip */}
                <div className="mt-3 pt-2 border-t border-amber-500/20">
                  <p className="text-xs text-center text-amber-400">
                    💼 Pro tip: Clear, concise messages get faster responses!
                  </p>
                </div>
              </div>
            )}

            {/* Playful Submit Button */}
            <div className="relative my-8 mx-auto flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={handleButtonHover}
                className={`text-white bg-gradient-to-b from-cyan-400 to-blue-500 px-8 py-4 
                         flex items-center rounded-md transition-all duration-500 font-medium
                         ${
                           isSubmitting
                             ? "scale-95 opacity-80 cursor-not-allowed"
                             : buttonPlayingHardToGet
                             ? "animate-dodge-button transform translate-x-4 translate-y-2"
                             : "hover:scale-110 hover:shadow-xl hover:shadow-cyan-400/30 hover:from-cyan-300 hover:to-blue-400 active:scale-105"
                         }
                         transform-gpu`}
              >
                <span className="transition-all duration-300">
                  {buttonTexts[submitStage]}
                </span>
                {isSubmitting ? (
                  <Loader2 className="ml-3 w-4 h-4 animate-spin" />
                ) : (
                  <Send className="ml-2 w-4 h-4" />
                )}
              </button>

              {/* Button playing hard to get message */}
              {buttonPlayingHardToGet && buttonMoveCount > 0 && (
                <div
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 
                              bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-2 
                              animate-bounce-in whitespace-nowrap"
                >
                  <p className="text-yellow-300 text-xs font-medium">
                    {getButtonPlayMessage()}
                  </p>
                </div>
              )}
            </div>

            {/* Simple Progress Indicator */}
            {(formData.name || formData.email || formData.message) && (
              <div className="w-full bg-gray-700 rounded-full h-2 mb-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${
                      ((formData.name ? 1 : 0) +
                        (formData.email ? 1 : 0) +
                        (formData.message ? 1 : 0)) *
                      33.33
                    }%`,
                  }}
                ></div>
              </div>
            )}

            {/* Interactive Timeline & Response Prediction */}
            {showTimeline && responseTimeEstimate && (
              <div
                className="mt-6 p-4 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 
                            rounded-lg border border-indigo-500/30 animate-slide-down"
              >
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center mb-2">
                    <Calendar className="w-5 h-5 text-indigo-300 mr-2" />
                    <h3 className="text-lg font-semibold text-indigo-300">
                      Response Timeline Prediction
                    </h3>
                  </div>
                  <p className="text-sm text-gray-300 mb-1">
                    Expected response:{" "}
                    <span className="text-cyan-400 font-medium">
                      ~{responseTimeEstimate.hours} hours
                    </span>
                  </p>
                  <p className="text-xs text-purple-300 italic">
                    {responseTimeEstimate.message}
                  </p>
                </div>

                {/* Visual Timeline */}
                <div className="relative">
                  {getTimelineSteps(responseTimeEstimate.hours).map(
                    (step, index) => (
                      <div
                        key={index}
                        className="flex items-center mb-3 last:mb-0"
                      >
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                                    border-2 transition-all duration-500 ${
                                      step.completed
                                        ? "bg-cyan-500 border-cyan-400 text-white"
                                        : "bg-gray-700 border-gray-500 text-gray-400"
                                    }`}
                        >
                          <step.icon className="w-4 h-4" />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between items-center">
                            <p
                              className={`text-sm font-medium transition-colors duration-300 ${
                                step.completed
                                  ? "text-cyan-300"
                                  : "text-gray-400"
                              }`}
                            >
                              {step.status}
                            </p>
                            <span className="text-xs text-gray-500">
                              {step.time}
                            </span>
                          </div>
                        </div>
                        {index <
                          getTimelineSteps(responseTimeEstimate.hours).length -
                            1 && (
                          <div
                            className={`absolute left-4 w-0.5 h-6 transition-colors duration-500 ${
                              step.completed ? "bg-cyan-500" : "bg-gray-600"
                            }`}
                            style={{ top: `${(index + 1) * 48}px` }}
                          />
                        )}
                      </div>
                    )
                  )}
                </div>

                {/* Fun fact */}
                <div className="mt-4 pt-3 border-t border-indigo-500/20">
                  <p className="text-xs text-center text-indigo-300">
                    💡 Fun fact: Response quality is inversely proportional to
                    response speed!
                  </p>
                </div>
              </div>
            )}

            {/* Night Owl Easter Egg */}
            {(new Date().getHours() >= 23 || new Date().getHours() < 6) && (
              <div className="text-center mt-4">
                <p className="text-sm text-purple-400 animate-pulse">
                  🌙 Night Owl Mode Activated - We both have great priorities!
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Accessibility Mode Indicator */}
        {accessibilityMode && (
          <div
            className="fixed top-4 right-4 bg-green-900/90 border border-green-500 
                        rounded-lg p-3 z-50 animate-slide-down"
          >
            <div className="flex items-center text-green-300 text-sm font-medium mb-1">
              <Accessibility className="w-4 h-4 mr-2" />
              Enhanced Accessibility Mode Active
            </div>
            <p className="text-green-400 text-xs mt-1">
              Animations reduced, contrast enhanced, screen reader optimized
            </p>
          </div>
        )}

        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes slide-down {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes bounce-in {
            0% {
              opacity: 0;
              transform: scale(0.3);
            }
            50% {
              opacity: 1;
              transform: scale(1.05);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .animate-slide-down {
            animation: slide-down 0.3s ease-out;
          }

          .animate-bounce-in {
            animation: bounce-in 0.5s ease-out;
          }

          .animate-fade-in {
            animation: fade-in 0.3s ease-in;
          }

          @keyframes wake-up {
            0% {
              transform: scale(1) rotate(0deg);
            }
            25% {
              transform: scale(1.02) rotate(-1deg);
            }
            50% {
              transform: scale(1.05) rotate(1deg);
            }
            75% {
              transform: scale(1.02) rotate(-0.5deg);
            }
            100% {
              transform: scale(1) rotate(0deg);
            }
          }

          @keyframes dodge-button {
            0% {
              transform: translate(0, 0) rotate(0deg);
            }
            25% {
              transform: translate(8px, -4px) rotate(-5deg);
            }
            50% {
              transform: translate(16px, 8px) rotate(3deg);
            }
            75% {
              transform: translate(8px, 4px) rotate(-2deg);
            }
            100% {
              transform: translate(0, 0) rotate(0deg);
            }
          }

          .animate-wake-up {
            animation: wake-up 0.6s ease-out;
          }

          .animate-dodge-button {
            animation: dodge-button 0.6s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Contact;
