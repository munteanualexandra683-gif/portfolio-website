import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

function App() {
  // Missing PC and "Welcome" speech bubble images, so we're using a placeholder text/style.
  // The positioning uses percentage-based relative to the container for responsiveness.

  return (
    <div className="bg-[#fff0f3] w-full text-gray-800">

      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="text-xs md:text-sm uppercase tracking-widest font-mono text-pink-500 font-bold mb-3 block">
            [ Player 1: Alexandra Munteanu ]
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 drop-shadow-sm">
            Ready to explore?
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
            Find the 4 objects to discover my story.
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

    </div>
  )
}

export default App
