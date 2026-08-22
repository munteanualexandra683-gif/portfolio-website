import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { ChevronDown, Code, Briefcase, Mail, FileText, X, GraduationCap, Monitor, Cpu, Eye, ExternalLink } from 'lucide-react';

function App() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

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
        className="fixed top-0 left-0 w-full p-4 md:p-6 flex justify-end items-center z-50 bg-[#fff0f3]/90 backdrop-blur-md"
      >
        <div className="flex items-center gap-2 md:gap-4">
          <span className="text-xs md:text-sm font-bold text-pink-500 hidden sm:inline-block mr-2 uppercase tracking-widest">
            Skipping the game?
          </span>
          <a href="#" className="p-2 text-gray-600 hover:text-pink-500 transition-colors group relative" aria-label="Resume">
            <FileText className="w-5 h-5" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Resume</span>
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 text-gray-600 hover:text-pink-500 transition-colors group relative" aria-label="GitHub">
            <Code className="w-5 h-5" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">GitHub</span>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 text-gray-600 hover:text-pink-500 transition-colors group relative" aria-label="LinkedIn">
            <Briefcase className="w-5 h-5" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">LinkedIn</span>
          </a>
          <a href="mailto:your.email@example.com" className="p-2 text-gray-600 hover:text-pink-500 transition-colors group relative" aria-label="Email">
            <Mail className="w-5 h-5" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Email</span>
          </a>
        </div>
      </motion.header>

      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="text-xs md:text-sm uppercase tracking-widest font-mono text-pink-500 font-bold mb-3 block">
            [ Player: Alexandra Munteanu ]
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 drop-shadow-sm select-none">
            {"Ready to explore?".split(" ").map((word, idx) => (
              <span key={idx} className="hover:text-pink-500 transition-colors duration-200 inline-block mr-[0.25em] last:mr-0 cursor-default">
                {word}
              </span>
            ))}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
            I'm a computer engineering student bridging the gap between hardware logic and web creativity. I've turned my background, projects, and qualifications into an interactive space. Click around to see for yourself.
          </p>
        </motion.div>

        {/* Scroll Call to Action */}
        <motion.div
          className="absolute bottom-12 flex flex-col items-center opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1, duration: 1 }}
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
      <section className="relative min-h-screen flex flex-col items-center justify-center p-4">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-7xl text-center mb-8"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800">
            Find the <span className="text-pink-500">4 objects</span> to discover <span className="text-pink-500">my story</span>.
          </h2>
        </motion.div>

        {/* Container for the room */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative w-full max-w-7xl aspect-video bg-transparent"
        >

          {/* Background Room */}
          <img
            src="/pictures/room.png"
            alt="Room"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Plant (Tree) */}
          <div
            className="interactive-object"
            style={{ left: '23.02%', top: '43.80%', width: '7.60%', height: '25.56%' }}
          >
            <img src="/pictures/tree.png?v=2" alt="Plant" className="w-full h-full object-contain" />
          </div>

          {/* Books (Shelf) */}
          <div
            className="interactive-object"
            style={{ left: '51.20%', top: '30.56%', width: '9.58%', height: '12.13%' }}
            onClick={() => setActiveModal('education')}
          >
            <img src="/pictures/shelf.png?v=2" alt="Bookshelf" className="w-full h-full object-contain" />
          </div>

          {/* Certificates (Posters) */}
          <div
            className="interactive-object"
            style={{ left: '28.23%', top: '20.28%', width: '12.03%', height: '24.17%' }}
          >
            <img src="/pictures/posters.png?v=2" alt="Certificates" className="w-full h-full object-contain" />
          </div>

          {/* PC */}
          <div
            className="interactive-object"
            style={{ left: '64.69%', top: '35.28%', width: '6.20%', height: '13.70%' }}
            onClick={() => setActiveModal('projects')}
          >
            {/* Un-comment and update path when you have the PC image */}
            <img src="/pictures/pc.png?v=2" alt="PC" className="w-full h-full object-contain" />
          </div>

          {/* Character */}
          <div
            className="interactive-object z-20"
            style={{ left: '47.66%', top: '41.02%', width: '8.91%', height: '37.59%' }}
          >
            <img
              src="/pictures/me.png?v=2"
              alt="Character"
              className="w-full h-full object-contain"
            />
          </div>

        </motion.div>
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

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default App
