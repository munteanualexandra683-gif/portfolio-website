import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { ChevronDown, Code, Briefcase, Mail, FileText, X, GraduationCap, Monitor, Cpu, Eye, ExternalLink, Heart, Download, Send, ArrowLeft, CheckCircle, Copy, RotateCcw, Volume2, VolumeX, StickyNote } from 'lucide-react';
import confetti from 'canvas-confetti';

const playSound = (soundPath) => {
  const audio = new Audio(soundPath);
  audio.volume = 0.4;
  audio.play().catch((err) => {
    console.warn("Audio playback failed:", err);
  });
};

function App() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [foundObjects, setFoundObjects] = useState(() => {
    try {
      const saved = localStorage.getItem('foundObjects');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [hasWon, setHasWon] = useState(() => {
    try {
      const saved = localStorage.getItem('hasWon');
      return saved ? JSON.parse(saved) : false;
    } catch (e) {
      return false;
    }
  });
  const [isMuted, setIsMuted] = useState(() => {
    try {
      const saved = localStorage.getItem('isMuted');
      return saved ? JSON.parse(saved) : false;
    } catch (e) {
      return false;
    }
  });
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [showContactForm, setShowContactForm] = useState(false);
  const [showEmailMenu, setShowEmailMenu] = useState(false);
  const [formStatus, setFormStatus] = useState("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("submitting");

    // Replace this with your actual Web3Forms Access Key
    const ACCESS_KEY = "f3646684-d9ce-4280-b979-45010fb760b4";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        console.error("Web3Forms Error:", result);
        setFormStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus("error");
    }
  };

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("munteanualexandra683@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleObjectClick = (objectId) => {
    setActiveModal(objectId);
    if (objectId !== 'me' && !foundObjects.includes(objectId)) {
      if (!isMuted) playSound('/audio/bubble_pop.mp3');
      setFoundObjects(prev => {
        const next = [...prev, objectId];
        localStorage.setItem('foundObjects', JSON.stringify(next));
        return next;
      });
    }
  };

  const handleResetGame = () => {
    setFoundObjects([]);
    setHasWon(false);
    setActiveModal(null);
    localStorage.removeItem('foundObjects');
    localStorage.removeItem('hasWon');
  };

  useEffect(() => {
    if (hasWon) {
      localStorage.setItem('hasWon', 'true');
    }
  }, [hasWon]);

  useEffect(() => {
    localStorage.setItem('isMuted', JSON.stringify(isMuted));
  }, [isMuted]);



  useEffect(() => {
    if (foundObjects.length === 5 && !activeModal && !hasWon) {
      setHasWon(true);
      setActiveModal('victory');
      if (!isMuted) playSound('/audio/winning_sound.mp3');

      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ec4899', '#3b82f6', '#fbcfe8', '#bfdbfe'] // Pink and Blue
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ec4899', '#3b82f6', '#fbcfe8', '#bfdbfe']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [foundObjects.length, activeModal, hasWon]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Missing PC and "Welcome" speech bubble images, so we're using a placeholder text/style.
  // The positioning uses percentage-based relative to the container for responsiveness.

  return (
    <div className="bg-[#fff0f3] w-full text-gray-800">

      {/* HEADER */}
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full p-4 md:p-6 flex justify-between sm:justify-end items-center z-50 bg-[#fff0f3]/90 backdrop-blur-md"
      >
        <span className="text-[10px] md:text-sm font-bold text-pink-500 uppercase tracking-widest sm:mr-4">
          Skipping the game?
        </span>
        <div className="flex items-center gap-2 md:gap-4">
          <a href="/alexandra_munteanu_resume.pdf" download="Alexandra_Munteanu_Resume.pdf" className="p-2 text-gray-600 hover:text-pink-500 transition-colors group relative" aria-label="Resume">
            <FileText className="w-5 h-5" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Resume</span>
          </a>
          <a href="https://github.com/munteanualexandra683-gif" target="_blank" rel="noreferrer" className="p-2 text-gray-600 hover:text-pink-500 transition-colors group relative" aria-label="GitHub">
            <Code className="w-5 h-5" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/alexandra-munteanu-5aa485291/" target="_blank" rel="noreferrer" className="p-2 text-gray-600 hover:text-pink-500 transition-colors group relative" aria-label="LinkedIn">
            <Briefcase className="w-5 h-5" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">LinkedIn</span>
          </a>
          <div className="relative" onMouseLeave={() => setShowEmailMenu(false)}>
            <button onMouseEnter={() => setShowEmailMenu(true)} onClick={() => setShowEmailMenu(!showEmailMenu)} className="p-2 text-gray-600 hover:text-pink-500 transition-colors group relative cursor-pointer" aria-label="Email">
              <Mail className="w-5 h-5" />
              {!showEmailMenu && (
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  Email
                </span>
              )}
            </button>
            <AnimatePresence>
              {showEmailMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full pt-2 z-50"
                >
                  <div className="w-36 bg-white border border-pink-100 rounded-xl shadow-lg overflow-hidden flex flex-col">
                    <button
                      onClick={() => { setActiveModal('me'); setShowContactForm(true); setShowEmailMenu(false); }}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors text-left w-full"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Message</span>
                    </button>
                    <div className="w-full h-px bg-pink-50"></div>
                    <button
                      onClick={(e) => { handleCopyEmail(e); setTimeout(() => setShowEmailMenu(false), 1500); }}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors text-left w-full"
                    >
                      {copiedEmail ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedEmail ? "Copied!" : "Copy"}</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>

      {/* SECTION 0: HERO IMAGE */}
      <section className="relative h-[40vh] md:h-[60vh] xl:h-[70vh] w-full overflow-hidden bg-[#fff0f3] flex items-center justify-center pointer-events-none mt-12 md:mt-20">
        <motion.div
          className="relative w-full max-w-5xl h-full flex items-center justify-center px-4 py-8"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.img
            src="/pictures/hello.png"
            alt="Hello"
            className="w-full h-auto max-h-[40vh] md:max-h-[60vh] xl:max-h-[70vh] object-contain select-none pointer-events-none"
            draggable="false"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* SECTION 1: HERO */}
      <section id="intro-section" className="relative flex flex-col items-center justify-center px-6 pt-4 pb-12 md:py-24 text-center bg-[#fff0f3]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="text-xs md:text-sm uppercase tracking-widest font-mono text-pink-500 font-bold mb-3 block">
            [ Alexandra Munteanu ]
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 drop-shadow-sm select-none">
            {"Ready to explore?".split(" ").map((word, idx) => (
              <span key={idx} className="hover:text-pink-500 transition-colors duration-200 inline-block mr-[0.25em] last:mr-0 cursor-default">
                {word}
              </span>
            ))}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
            I am a <span className="text-pink-500 font-medium">computer engineering student</span> bridging the gap between <span className="text-pink-500 font-medium">web creativity</span> and <span className="text-pink-500 font-medium">hardware logic</span>. I have turned my background, projects, and qualifications into an interactive space.
            <span className="block mt-4 text-pink-500 font-medium">Step inside and take a look around!</span>
          </p>
        </motion.div>

        {/* Scroll Call to Action */}
        <motion.div
          className="mt-12 flex flex-col items-center opacity-70 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1, duration: 1 }}
          onClick={() => document.getElementById('game-section').scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-sm uppercase tracking-widest font-semibold mb-2 text-pink-500">
            Scroll down to enter the room
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="w-8 h-8 text-pink-500" />
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2: THE ROOM */}
      <section id="game-section" className="relative min-h-screen flex flex-col items-center justify-start pt-16 sm:justify-center sm:pt-4 sm:py-8 overflow-hidden">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-7xl text-center mb-4 sm:mb-6 px-4 sm:px-0 relative z-20"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800">
            Find the <span className="text-pink-500">5 objects</span> to discover <span className="text-pink-500">my story</span>.
          </h2>
        </motion.div>

        {/* Container for the room */}
        <div className="w-full flex items-center justify-center scale-[1.4] sm:scale-100 origin-center py-12 sm:py-0 transition-transform duration-300">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl aspect-video bg-transparent shrink-0 flex-none"
          >

            {/* Desktop Game Counter */}
            <AnimatePresence>
              {foundObjects.length > 0 && (
                <div className="hidden sm:flex absolute bottom-6 left-6 z-30 w-max pointer-events-none">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="pointer-events-auto"
                  >
                    <div className="bg-white/50 backdrop-blur-sm border border-pink-200 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-md flex items-center gap-2 hover:bg-white/80 transition-colors cursor-default">
                      <span className="text-[10px] sm:text-xs uppercase tracking-widest font-mono text-pink-500 font-bold">
                        Objects Found:
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-gray-900 bg-white px-2 py-0.5 rounded-full shadow-sm border border-pink-200">
                        {foundObjects.length} / 5
                      </span>
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-1 text-gray-400 hover:text-pink-600 transition-colors rounded-full hover:bg-pink-100/50 cursor-pointer ml-1"
                        title={isMuted ? "Unmute sounds" : "Mute sounds"}
                        aria-label="Toggle sound"
                      >
                        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={handleResetGame}
                        className="p-1 text-gray-400 hover:text-pink-600 transition-colors rounded-full hover:bg-pink-100/50 cursor-pointer ml-0.5"
                        title="Reset game progress"
                        aria-label="Reset progress"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Loading Screen Overlay */}
            <AnimatePresence>
              {!isImageLoaded && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 z-40 bg-[#fff0f3] flex flex-col items-center justify-center overflow-hidden"
                >
                  <div className="flex flex-col items-center gap-4">
                    <p className="text-pink-500 font-bold tracking-widest uppercase font-display animate-pulse text-lg sm:text-xl">
                      Loading Room...
                    </p>
                    <div className="w-48 sm:w-64 h-3 bg-pink-200/50 rounded-full overflow-hidden mt-2 shadow-inner border border-pink-200">
                      <motion.div
                        className="h-full bg-pink-500 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Background Room */}
            <img
              src="/pictures/room.png"
              alt="Room"
              className="absolute inset-0 w-full h-full object-cover"
              onLoad={() => setIsImageLoaded(true)}
            />

            {/* Plant (Tree) */}
            <div
              className="interactive-object"
              style={{ left: '23.02%', top: '43.80%', width: '7.60%', height: '25.56%' }}
              onClick={() => handleObjectClick('plant')}
            >
              <img src="/pictures/tree.png?v=2" alt="Plant" className="w-full h-full object-contain" />
            </div>

            {/* Books (Shelf) */}
            <div
              className="interactive-object"
              style={{ left: '51.20%', top: '30.56%', width: '9.58%', height: '12.13%' }}
              onClick={() => handleObjectClick('education')}
            >
              <img src="/pictures/shelf.png?v=2" alt="Bookshelf" className="w-full h-full object-contain" />
            </div>

            {/* Certificates (Posters) */}
            <div
              className="interactive-object"
              style={{ left: '28.23%', top: '20.28%', width: '12.03%', height: '24.17%' }}
              onClick={() => handleObjectClick('posters')}
            >
              <img src="/pictures/posters.png?v=2" alt="Certificates" className="w-full h-full object-contain" />
            </div>

            {/* Board */}
            <div
              className="interactive-object"
              style={{ left: '54.06%', top: '13.89%', width: '5.78%', height: '21.85%' }}
              onClick={() => handleObjectClick('board')}
            >
              <img src="/pictures/board.png" alt="Board" className="w-full h-full object-contain" />
            </div>

            {/* PC */}
            <div
              className="interactive-object"
              style={{ left: '64.69%', top: '35.28%', width: '6.20%', height: '13.70%' }}
              onClick={() => handleObjectClick('projects')}
            >
              {/* Un-comment and update path when you have the PC image */}
              <img src="/pictures/pc.png?v=2" alt="PC" className="w-full h-full object-contain" />
            </div>

            {/* Character */}
            <div
              className="interactive-object z-20"
              style={{ left: '47.66%', top: '41.02%', width: '8.91%', height: '37.59%' }}
              onClick={() => handleObjectClick('me')}
            >
              <img
                src="/pictures/me.png?v=2"
                alt="Character"
                className="w-full h-full object-contain"
              />
            </div>

          </motion.div>
        </div>

        {/* Mobile Game Counter */}
        <AnimatePresence>
          {foundObjects.length > 0 && (
            <div className="sm:hidden flex justify-center w-full mt-8 relative z-30 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="pointer-events-auto"
              >
                <div className="bg-white/50 backdrop-blur-sm border border-pink-200 px-3 py-1.5 rounded-full shadow-md flex items-center gap-2 hover:bg-white/80 transition-colors cursor-default">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-pink-500 font-bold">
                    Objects Found:
                  </span>
                  <span className="text-xs font-bold text-gray-900 bg-white px-2 py-0.5 rounded-full shadow-sm border border-pink-200">
                    {foundObjects.length} / 5
                  </span>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1 text-gray-400 hover:text-pink-600 transition-colors rounded-full hover:bg-pink-100/50 cursor-pointer ml-1"
                    title={isMuted ? "Unmute sounds" : "Mute sounds"}
                    aria-label="Toggle sound"
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={handleResetGame}
                    className="p-1 text-gray-400 hover:text-pink-600 transition-colors rounded-full hover:bg-pink-100/50 cursor-pointer ml-0.5"
                    title="Reset game progress"
                    aria-label="Reset progress"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </section>

      {/* MODALS */}
      <AnimatePresence>
        {activeModal === 'education' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#fff0f3] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-pink-200 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-pink-100/50 px-6 py-4 flex justify-between items-center border-b border-pink-100">
                <div className="flex items-center gap-3 text-pink-600">
                  <GraduationCap className="w-6 h-6" />
                  <h3 className="font-display text-xl font-bold tracking-wide uppercase">My Education</h3>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 text-gray-400 hover:text-pink-600 hover:bg-pink-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 text-left">
                <h4 className="text-2xl font-bold text-gray-900 mb-1">
                  University POLITEHNICA of Bucharest
                </h4>
                <div className="text-pink-500 font-semibold mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-start sm:items-center gap-2">
                  <span>B.Sc. in Computers and Information Technology</span>
                  <span className="text-gray-600 bg-white/50 px-3 py-1 rounded-full text-sm border border-pink-100 shadow-sm w-fit font-mono tracking-tight">
                    Oct 2025 – Jun 2029
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 items-start sm:items-center">
                    <span className="font-bold text-gray-800 w-36 shrink-0 text-sm uppercase tracking-wider">Grade</span>
                    <span className="text-gray-700 font-medium bg-white/60 px-2 py-0.5 rounded shadow-sm border border-pink-50">9.17 / 10.00</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 items-start sm:items-center">
                    <span className="font-bold text-gray-800 w-36 shrink-0 text-sm uppercase tracking-wider">Specialization</span>
                    <span className="text-gray-700 font-medium">French-Taught Engineering Stream</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 pt-2 items-start">
                    <span className="font-bold text-gray-800 w-36 shrink-0 text-sm uppercase tracking-wider mt-1">Coursework</span>
                    <span className="text-gray-600 leading-relaxed text-sm">
                      Data Structures & Algorithms (C/C++), Object-Oriented Programming (Java), Operating Systems (Linux), Web Development.
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeModal === 'board' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#fff0f3] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-pink-200 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-pink-100/50 px-6 py-4 flex justify-between items-center border-b border-pink-100">
                <div className="flex items-center gap-3 text-pink-600">
                  <Briefcase className="w-6 h-6" />
                  <h3 className="font-display text-xl font-bold tracking-wide uppercase">Professional Experience</h3>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 text-gray-400 hover:text-pink-600 hover:bg-pink-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 text-left">

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start border-b border-pink-100 pb-4 mb-4">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-1">
                      Computer Engineering Intern
                    </h4>
                    <span className="text-pink-500 font-bold text-lg">UMB Grup</span>
                  </div>
                  <div className="mt-2 sm:mt-0 flex flex-col items-start sm:items-end gap-1">
                    <span className="text-gray-600 bg-white/50 px-3 py-1 rounded-full text-sm border border-pink-100 shadow-sm font-mono tracking-tight">
                      Jul 2026 – Oct 2026
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-pink-500 mt-0.5 mr-2 shrink-0">▹</span>
                    <p className="text-gray-700 leading-relaxed">
                      Built web applications using a Django/Python backend and HTML/CSS/JS frontend.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-pink-500 mt-0.5 mr-2 shrink-0">▹</span>
                    <p className="text-gray-700 leading-relaxed">
                      Performed hands-on hardware assembly and precision soldering.
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}

        {activeModal === 'posters' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#fff0f3] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-pink-200 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-pink-100/50 px-6 py-4 flex justify-between items-center border-b border-pink-100">
                <div className="flex items-center gap-3 text-pink-600">
                  <FileText className="w-6 h-6" />
                  <h3 className="font-display text-xl font-bold tracking-wide uppercase">Certifications</h3>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 text-gray-400 hover:text-pink-600 hover:bg-pink-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 text-left max-h-[75vh] overflow-y-auto custom-scrollbar">

                {/* Cert 1 */}
                <div className="border-b border-pink-100 pb-5 mb-5">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">
                        Web Programming 101 Certificate
                      </h4>
                      <span className="text-pink-500 font-bold">Cisco</span>
                    </div>
                    <div className="mt-1 sm:mt-0">
                      <span className="text-gray-600 bg-white/50 px-3 py-1 rounded-full text-xs border border-pink-100 shadow-sm font-mono tracking-tight">
                        Dec 2025
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 mt-3">
                    <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
                      {['JavaScript', 'HTML5', 'CSS'].map(tech => (
                        <span key={tech} className="bg-white border border-pink-100 shadow-sm text-pink-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-start">
                      <span className="text-pink-500 mt-0.5 mr-2 shrink-0">▹</span>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Training focused on Front-End technologies.
                      </p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-pink-500 mt-0.5 mr-2 shrink-0">▹</span>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Designed and deployed responsive websites.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cert 2 */}
                <div className="border-b border-pink-100 pb-5 mb-5">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">
                        Cambridge English Level C2
                      </h4>
                      <span className="text-pink-500 font-bold">Cambridge University Press & Assessment</span>
                    </div>
                    <div className="mt-1 sm:mt-0">
                      <span className="text-gray-600 bg-white/50 px-3 py-1 rounded-full text-xs border border-pink-100 shadow-sm font-mono tracking-tight">
                        Jun 2023
                      </span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-start">
                      <span className="text-pink-500 mt-0.5 mr-2 shrink-0">▹</span>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Professional-level English proficiency for global communication and documentation.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Upskilling */}
                <div className="bg-pink-50/50 p-4 rounded-xl border border-pink-100">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-pink-500 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">Upskilling</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">
                        Python Certification
                      </h4>
                      <span className="text-pink-500 font-bold text-sm">freeCodeCamp</span>
                    </div>
                    <div className="mt-1 sm:mt-0">
                      <span className="text-pink-600 bg-pink-100 px-3 py-1 rounded-full text-xs font-mono tracking-tight font-bold">
                        Currently Working On
                      </span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      <span className="font-bold text-gray-900 mr-1">Goal:</span> Expanding backend, data structures, and automation skills to complement my Python/Django experience.
                    </p>
                  </div>

                  <div className="w-full h-px bg-pink-200/50 my-5"></div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">
                        Learn React
                      </h4>
                      <span className="text-pink-500 font-bold text-sm">Codecademy</span>
                    </div>
                    <div className="mt-1 sm:mt-0">
                      <span className="text-pink-600 bg-pink-100 px-3 py-1 rounded-full text-xs font-mono tracking-tight font-bold">
                        Currently Working On
                      </span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      <span className="font-bold text-gray-900 mr-1">Goal:</span> Mastering component-based architecture, state management, and modern front-end workflows to build interactive web applications.
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}

        {activeModal === 'plant' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#fff0f3] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-pink-200 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-pink-100/50 px-6 py-4 flex justify-between items-center border-b border-pink-100">
                <div className="flex items-center gap-3 text-pink-600">
                  <Heart className="w-6 h-6" />
                  <h3 className="font-display text-xl font-bold tracking-wide uppercase">Community & Leadership</h3>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 text-gray-400 hover:text-pink-600 hover:bg-pink-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 text-left max-h-[75vh] overflow-y-auto custom-scrollbar">

                {/* Role 1 */}
                <div className="border-b border-pink-100 pb-5 mb-5">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">
                        Erasmus+ Participant
                      </h4>
                      <span className="text-pink-500 font-bold">European Commission</span>
                    </div>
                    <div className="mt-1 sm:mt-0">
                      <span className="text-gray-600 bg-white/50 px-3 py-1 rounded-full text-xs border border-pink-100 shadow-sm font-mono tracking-tight">
                        2024 – 2025
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 mt-3">
                    <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
                      {['Cross-Cultural Communication', 'Public Speaking'].map(skill => (
                        <span key={skill} className="bg-white border border-pink-100 shadow-sm text-pink-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="pt-1">
                      <span className="font-bold text-gray-900 text-sm block mb-1">Key Projects Across Europe:</span>
                      <ul className="space-y-2 mt-1">
                        <li className="flex items-start">
                          <span className="text-pink-500 mt-0.5 mr-2 shrink-0">▹</span>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            <span className="font-bold text-pink-600">Empowering Vulnerable Youth (Turkey, 2025):</span> Collaborated on international workshops focused on social inclusion, leadership, and youth empowerment.
                          </p>
                        </li>
                        <li className="flex items-start">
                          <span className="text-pink-500 mt-0.5 mr-2 shrink-0">▹</span>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            <span className="font-bold text-pink-600">Reflection 4 Perfection (Lithuania, 2025):</span> Engaged in critical thinking and advanced non-formal learning methodologies.
                          </p>
                        </li>
                        <li className="flex items-start">
                          <span className="text-pink-500 mt-0.5 mr-2 shrink-0">▹</span>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            <span className="font-bold text-pink-600">Violence OUT - Tolerance IN (Serbia, 2024):</span> Promoted cross-cultural dialogue, peace-building, and community tolerance.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Role 2 */}
                <div className="border-b border-pink-100 pb-5 mb-5">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">
                        Youth Ambassador & Volunteer
                      </h4>
                      <span className="text-pink-500 font-bold">ThinkUp Academy</span>
                    </div>
                    <div className="mt-1 sm:mt-0">
                      <span className="text-gray-600 bg-white/50 px-3 py-1 rounded-full text-xs border border-pink-100 shadow-sm font-mono tracking-tight">
                        2022 – 2023
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 mt-3">
                    <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
                      {['Workshop Facilitation', 'Event Logistics', 'Creative Problem Solving', 'Community Outreach'].map(skill => (
                        <span key={skill} className="bg-white border border-pink-100 shadow-sm text-pink-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="pt-1">
                      <span className="font-bold text-gray-900 text-sm block mb-1">Impact:</span>
                      <ul className="space-y-2 mt-1">
                        <li className="flex items-start">
                          <span className="text-pink-500 mt-0.5 mr-2 shrink-0">▹</span>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            Facilitated youth development workshops using non-formal education techniques to foster creativity and critical thinking.
                          </p>
                        </li>
                        <li className="flex items-start">
                          <span className="text-pink-500 mt-0.5 mr-2 shrink-0">▹</span>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            Coordinated event logistics and student outreach for local educational initiatives.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Role 3 */}
                <div className="border-b border-pink-100 pb-5 mb-5">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">
                        Volunteer & Mentor
                      </h4>
                      <span className="text-pink-500 font-bold">Ajungem MARI</span>
                    </div>
                    <div className="mt-1 sm:mt-0">
                      <span className="text-gray-600 bg-white/50 px-3 py-1 rounded-full text-xs border border-pink-100 shadow-sm font-mono tracking-tight">
                        2022 – 2023
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 mt-3">
                    <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
                      {['Active Listening', 'Personalized Mentorship', 'Academic Tutoring', 'Time Management'].map(skill => (
                        <span key={skill} className="bg-white border border-pink-100 shadow-sm text-pink-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="pt-1">
                      <span className="font-bold text-gray-900 text-sm block mb-1">Impact:</span>
                      <ul className="space-y-2 mt-1">
                        <li className="flex items-start">
                          <span className="text-pink-500 mt-0.5 mr-2 shrink-0">▹</span>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            Provided weekly tutoring in English and Mathematics to children from disadvantaged backgrounds.
                          </p>
                        </li>
                        <li className="flex items-start">
                          <span className="text-pink-500 mt-0.5 mr-2 shrink-0">▹</span>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            Designed personalized learning plans to help students bridge academic gaps and improve long-term school performance.
                          </p>
                        </li>
                        <li className="flex items-start">
                          <span className="text-pink-500 mt-0.5 mr-2 shrink-0">▹</span>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            Acted as a steady mentor, building a positive, encouraging environment for vulnerable youth.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Role 4 */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">
                        University Events Volunteering
                      </h4>
                      <span className="text-pink-500 font-bold">Faculty of Engineering in Foreign Languages</span>
                    </div>
                  </div>
                  <div className="space-y-4 mt-3">
                    <div className="flex items-start">
                      <span className="text-pink-500 mt-0.5 mr-2 shrink-0">▹</span>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Active volunteer representing the Faculty of Engineering in Foreign Languages at major university tech and educational exhibitions.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                      <div className="flex-1 rounded-xl overflow-hidden border border-pink-100 shadow-sm bg-white">
                        <img src="/pictures/vol1.png" alt="Volunteering Event 1" className="w-full h-auto" />
                      </div>
                      <div className="flex-1 rounded-xl overflow-hidden border border-pink-100 shadow-sm bg-white">
                        <img src="/pictures/vol2.png" alt="Volunteering Event 2" className="w-full h-auto" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}

        {activeModal === 'projects' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#fff0f3] w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-pink-200 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-pink-100/50 px-6 py-4 flex justify-between items-center border-b border-pink-100 shrink-0">
                <div className="flex items-center gap-3 text-pink-600">
                  <Monitor className="w-6 h-6" />
                  <h3 className="font-display text-xl font-bold tracking-wide uppercase">My Projects</h3>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 text-gray-400 hover:text-pink-600 hover:bg-pink-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="p-6 md:p-8 text-left overflow-y-auto space-y-12">

                {/* PROJECT 1 */}
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left Column: Text */}
                  <div className="flex-1 space-y-4">
                    <h4 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <Cpu className="w-6 h-6 text-pink-500" />
                      Full-Stack IoT Environmental Monitor
                    </h4>
                    <p className="text-gray-600 font-medium leading-relaxed">
                      An end-to-end telemetry system built from scratch to monitor real-time voltage and temperature.
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {['C++', 'ESP32', 'Python / Flask', 'Raspberry Pi', 'SQLite', 'HTML/CSS'].map(tech => (
                        <span key={tech} className="bg-white border border-pink-100 shadow-sm text-pink-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-4 pt-4 border-t border-pink-100/60">
                      <div>
                        <span className="font-bold text-gray-800 text-sm uppercase tracking-wider block mb-1">Hardware & PCB</span>
                        <p className="text-gray-600 text-sm leading-relaxed">Designed a custom PCB featuring an I2C temperature sensor, voltage divider, and local alert system (LEDs/Buzzer).</p>
                      </div>
                      <div>
                        <span className="font-bold text-gray-800 text-sm uppercase tracking-wider block mb-1">Firmware (ESP32)</span>
                        <p className="text-gray-600 text-sm leading-relaxed">Programmed in C++ to filter analog noise and wirelessly transmit JSON payloads via HTTP POST over Wi-Fi.</p>
                      </div>
                      <div>
                        <span className="font-bold text-gray-800 text-sm uppercase tracking-wider block mb-1">Backend & Database</span>
                        <p className="text-gray-600 text-sm leading-relaxed">Deployed a Flask RESTful API on a Raspberry Pi paired with an SQLite database for persistent historical logging.</p>
                      </div>
                      <div>
                        <span className="font-bold text-gray-800 text-sm uppercase tracking-wider block mb-1">Web Dashboard</span>
                        <p className="text-gray-600 text-sm leading-relaxed">Developed a live, dynamic interface to visualize telemetry data across the local network in real-time.</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Visuals */}
                  <div className="lg:w-[45%] flex flex-col gap-4">
                    <div className="aspect-video bg-white/60 rounded-xl border border-pink-100 shadow-sm flex items-center justify-center relative overflow-hidden group">
                      <img
                        src="/pictures/firstpicturehardware.webp"
                        alt="Dashboard visualization"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-video bg-white/60 rounded-xl border border-pink-100 shadow-sm flex items-center justify-center relative overflow-hidden group">
                      <img
                        src="/pictures/secondpichardware.webp"
                        alt="Custom PCB design"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* PROJECT 2 */}
                <div className="relative border-t border-pink-200 pt-12 pb-6">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#fff0f3] px-4 text-pink-400 text-sm font-mono tracking-widest uppercase font-bold">
                    Project 02
                  </div>

                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Text */}
                    <div className="flex-1 space-y-4">
                      <h4 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Eye className="w-6 h-6 text-pink-500 shrink-0" />
                        Real-Time Adaptive Web Interfaces
                      </h4>
                      <p className="text-gray-600 font-medium leading-relaxed">
                        Co-developed for the Scientific Communication Session to challenge standard WCAG compliance limitations.
                      </p>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {['JavaScript', 'Python / Flask', 'Machine Learning (KNN)', 'Behavioral Analytics', 'Web Accessibility'].map(tech => (
                          <span key={tech} className="bg-white border border-pink-100 shadow-sm text-pink-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-4 pt-4 border-t border-pink-100/60">
                        <div>
                          <span className="font-bold text-gray-800 text-sm uppercase tracking-wider block mb-1">Machine Learning Integration</span>
                          <p className="text-gray-600 text-sm leading-relaxed">Engineered a full-stack system utilizing a K-Nearest Neighbors (KNN) classifier to predict and adapt to user accessibility needs in real-time.</p>
                        </div>
                        <div>
                          <span className="font-bold text-gray-800 text-sm uppercase tracking-wider block mb-1">Behavioral Tracking</span>
                          <p className="text-gray-600 text-sm leading-relaxed">Implemented low-level kinematic signal tracking (monitoring scroll speed, erratic clicks, and idle time) to dynamically shift UI layouts into specialized modes like Dyslexia or Focus views.</p>
                        </div>
                      </div>

                      {/* Live Demo CTA */}
                      <div className="pt-6">
                        <a
                          href="https://forma-accessibility-demo.onrender.com/"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2.5 px-6 rounded-full transition-transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Interactive Experience Demo
                        </a>
                        <p className="text-xs text-gray-500 mt-3 ml-2 max-w-sm">
                          Interact directly with the page's content to watch the machine learning model adjust the UI based on your live behavior.
                        </p>
                      </div>
                    </div>

                    {/* Right Column: Visuals */}
                    <div className="lg:w-[45%] flex flex-col gap-4">
                      <div className="aspect-video bg-white/60 rounded-xl border border-pink-100 shadow-sm flex items-center justify-center relative overflow-hidden group">
                        <img
                          src="/pictures/websitepic.webp"
                          alt="Accessibility Demo UI"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* PROJECT 3 */}
                <div className="relative border-t border-pink-200 pt-12 pb-6">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#fff0f3] px-4 text-pink-400 text-sm font-mono tracking-widest uppercase font-bold">
                    Project 03
                  </div>

                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Text */}
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                        <h4 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                          <StickyNote className="w-6 h-6 text-pink-500 shrink-0" />
                          Stickee
                        </h4>
                        <div className="mt-1 sm:mt-0">
                          <span className="text-pink-600 bg-pink-100 px-3 py-1 rounded-full text-xs font-mono tracking-tight font-bold whitespace-nowrap">
                            In Development
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 font-medium leading-relaxed">
                        Engineered a digital sticky-note board built on an infinite canvas to deliver a highly fluid and tactile user experience.
                      </p>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {['React / Vite', 'TypeScript', 'Framer Motion', 'UI/UX Physics'].map(tech => (
                          <span key={tech} className="bg-white border border-pink-100 shadow-sm text-pink-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-4 pt-4 border-t border-pink-100/60">
                        <div>
                          <span className="font-bold text-gray-800 text-sm uppercase tracking-wider block mb-1">Infinite Canvas Architecture</span>
                          <p className="text-gray-600 text-sm leading-relaxed">Engineered an endless workspace with free pan and zoom capabilities, allowing users to dynamically create, edit, and color-code digital sticky notes.</p>
                        </div>
                        <div>
                          <span className="font-bold text-gray-800 text-sm uppercase tracking-wider block mb-1">Tactile Physics Integration</span>
                          <p className="text-gray-600 text-sm leading-relaxed">Implemented smooth drag-and-drop mechanics and gesture interactions to ensure UI elements feel grounded and highly responsive.</p>
                        </div>
                        <div className="bg-pink-50/50 p-4 rounded-xl border border-pink-100 mt-2">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-pink-500 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">Roadmap</span>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            Will integrate real-time multiplayer synchronization, rich media elements (photos, pins, stickers), and custom theming, with plans to eventually package the application for native Mac and Windows deployment.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Visuals */}
                    <div className="lg:w-[45%] flex flex-col gap-4">
                      <div className="aspect-video bg-white/60 rounded-xl border border-pink-100 shadow-sm flex items-center justify-center relative overflow-hidden group">
                        <img
                          src="/pictures/stickee.png"
                          alt="Stickee UI"
                          className="w-full h-full object-cover object-center scale-[1.35] origin-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}

        {activeModal === 'me' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => {
              setActiveModal(null);
              setTimeout(() => {
                setShowContactForm(false);
                setFormStatus("idle");
                setFormData({ name: "", email: "", message: "" });
              }, 300);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#fff0f3] w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden border border-pink-200 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-pink-100/50 px-6 py-4 flex justify-between items-center border-b border-pink-100">
                <div className="flex items-center gap-3 text-pink-600">
                  {showContactForm && (
                    <button
                      onClick={() => {
                        setShowContactForm(false);
                        setFormStatus("idle");
                        setFormData({ name: "", email: "", message: "" });
                      }}
                      className="p-1 -ml-2 text-pink-500 hover:bg-pink-200 rounded-full transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                  )}
                  <span className="font-display text-xl font-bold tracking-wide uppercase">
                    {showContactForm ? "Send Message" : "Contact"}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setActiveModal(null);
                    setTimeout(() => {
                      setShowContactForm(false);
                      setFormStatus("idle");
                      setFormData({ name: "", email: "", message: "" });
                    }, 300);
                  }}
                  className="p-1.5 text-gray-400 hover:text-pink-600 hover:bg-pink-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-8 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {!showContactForm ? (
                    <motion.div
                      key="links"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col gap-4"
                    >
                      <a href="https://github.com/munteanualexandra683-gif" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-pink-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group">
                        <div className="bg-pink-50 text-pink-500 p-3 rounded-lg group-hover:bg-pink-500 group-hover:text-white transition-colors shrink-0">
                          <Code className="w-6 h-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-gray-900 truncate">GitHub</h4>
                          <span className="text-sm text-gray-500 font-mono tracking-tight group-hover:text-pink-600 transition-colors truncate block">munteanualexandra683-gif</span>
                        </div>
                      </a>

                      <a href="https://www.linkedin.com/in/alexandra-munteanu-5aa485291/" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-pink-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group">
                        <div className="bg-pink-50 text-pink-500 p-3 rounded-lg group-hover:bg-pink-500 group-hover:text-white transition-colors shrink-0">
                          <Briefcase className="w-6 h-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-gray-900 truncate">LinkedIn</h4>
                          <span className="text-sm text-gray-500 font-mono tracking-tight group-hover:text-pink-600 transition-colors truncate block">Alexandra Munteanu</span>
                        </div>
                      </a>

                      <div className="flex flex-row items-center w-full p-2 rounded-xl border border-pink-100 bg-white shadow-sm hover:shadow-md transition-all group">
                        <button onClick={() => setShowContactForm(true)} className="flex items-center text-left flex-1 min-w-0 gap-4 p-2 cursor-pointer rounded-lg hover:bg-pink-50/50 transition-colors">
                          <div className="bg-pink-50 text-pink-500 p-3 rounded-lg group-hover:bg-pink-500 group-hover:text-white transition-colors shrink-0">
                            <Mail className="w-6 h-6" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-gray-900 truncate">Email Me</h4>
                            <span className="text-sm text-gray-500 font-mono tracking-tight group-hover:text-pink-600 transition-colors truncate block">Send a message directly</span>
                          </div>
                        </button>
                        <div className="w-px h-10 bg-pink-100 mx-1 shrink-0"></div>
                        <button onClick={handleCopyEmail} className="p-3 mr-1 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors group/copy relative shrink-0" aria-label="Copy email address">
                          {copiedEmail ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-mono bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover/copy:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            {copiedEmail ? "Copied!" : "Copy"}
                          </span>
                        </button>
                      </div>

                      <a href="/alexandra_munteanu_resume.pdf" download="Alexandra_Munteanu_Resume.pdf" className="flex items-center gap-4 p-4 rounded-xl border border-pink-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group">
                        <div className="bg-pink-50 text-pink-500 p-3 rounded-lg group-hover:bg-pink-500 group-hover:text-white transition-colors shrink-0">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-gray-900 truncate">Resume</h4>
                          <span className="text-sm text-gray-500 font-mono tracking-tight group-hover:text-pink-600 transition-colors truncate block">Download PDF</span>
                        </div>
                      </a>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col h-[340px]"
                    >
                      {formStatus === "success" ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                          >
                            <CheckCircle className="w-16 h-16 text-pink-500" />
                          </motion.div>
                          <h3 className="text-xl font-bold text-gray-900">Message Sent!</h3>
                          <p className="text-sm text-gray-500">Thanks for reaching out, I'll get back to you soon.</p>
                        </div>
                      ) : formStatus === "error" ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                          >
                            <X className="w-16 h-16 text-red-500" />
                          </motion.div>
                          <h3 className="text-xl font-bold text-gray-900">Oops!</h3>
                          <p className="text-sm text-gray-500">Something went wrong sending your message. Please try again or copy my email address directly!</p>
                          <div className="flex items-center gap-3 mt-2">
                            <button
                              onClick={() => setFormStatus("idle")}
                              className="px-5 py-2 bg-pink-100 text-pink-600 font-bold text-sm rounded-full hover:bg-pink-200 transition-colors"
                            >
                              Try Again
                            </button>
                            <button
                              onClick={handleCopyEmail}
                              className="px-5 py-2 border border-pink-200 text-pink-600 font-bold text-sm rounded-full hover:bg-pink-50 transition-colors flex items-center gap-2 cursor-pointer"
                            >
                              {copiedEmail ? (
                                <>
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="w-4 h-4" />
                                  Copy Email
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <form onSubmit={handleContactSubmit} className="flex flex-col gap-3 h-full">
                          <div>
                            <input
                              type="text"
                              required
                              placeholder="Your Name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl border border-pink-100 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 transition-shadow text-sm text-gray-800 placeholder:text-gray-400"
                              disabled={formStatus === "submitting"}
                            />
                          </div>
                          <div>
                            <input
                              type="email"
                              required
                              placeholder="Your Email Address"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl border border-pink-100 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 transition-shadow text-sm text-gray-800 placeholder:text-gray-400"
                              disabled={formStatus === "submitting"}
                            />
                          </div>
                          <div className="flex-1 min-h-0">
                            <textarea
                              required
                              placeholder="Your Message"
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              className="w-full h-full min-h-[100px] px-4 py-2.5 rounded-xl border border-pink-100 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 transition-shadow resize-none text-sm text-gray-800 placeholder:text-gray-400"
                              disabled={formStatus === "submitting"}
                            />
                          </div>
                          <button
                            type="submit"
                            disabled={formStatus === "submitting"}
                            className="w-full py-3 px-4 mt-1 bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                          >
                            {formStatus === "submitting" ? (
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <>
                                <Send className="w-4 h-4" />
                                Send Message
                              </>
                            )}
                          </button>
                        </form>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeModal === 'victory' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#fff0f3] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-pink-200 cursor-default text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-pink-100/50 px-6 py-6 border-b border-pink-100 relative">
                <button
                  onClick={() => setActiveModal(null)}
                  className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-pink-600 hover:bg-pink-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="mx-auto bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mb-3">
                  <span className="text-3xl">🏆</span>
                </div>
                <h3 className="font-display text-2xl font-bold tracking-wide uppercase text-gray-900">Congratulations!</h3>
                <p className="text-pink-500 font-bold mt-1">You found all the items!</p>
              </div>

              <div className="p-6 md:p-8 flex flex-col gap-4">
                <p className="text-gray-700 leading-relaxed">
                  Thank you for taking the time to explore my portfolio! You've successfully found all the objects. If you like what you saw and want to connect, feel free to reach out. I'd love to hear from you!
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <a
                    href="https://www.linkedin.com/in/alexandra-munteanu-5aa485291/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md hover:shadow-lg"
                  >
                    <Briefcase className="w-5 h-5" />
                    Start a Chat
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="w-full py-8 text-center bg-[#fff0f3] flex flex-col items-center justify-center gap-2 relative z-10 border-t border-pink-100/50">

        <p className="text-xs text-gray-400 font-mono">
          © {new Date().getFullYear()} Crafted with React, Tailwind CSS, and Framer Motion
        </p>
      </footer>

    </div>
  )
}

export default App
