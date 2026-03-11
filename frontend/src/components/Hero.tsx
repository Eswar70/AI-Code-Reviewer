import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-primary/20 text-primary text-sm mb-6"
        >
          <Sparkles className="w-4 h-4" />
          <span>The Next Generation of AI Code Review</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-8 tracking-tight"
        >
          Elevate Your Code with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-neon-purple drop-shadow-[0_0_15px_rgba(0,242,254,0.3)]">
            AI-Powered Intelligence
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Ship production-grade code faster. Detect bugs, vulnerabilities, and performance bottlenecks before they hit production.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/review">
            <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:glow-cyan hover:scale-105 active:scale-95 transition-all duration-300">
              Start Free Review
            </button>
          </Link>
          <button className="px-8 py-3 rounded-lg glass hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300">
            View Live Demo
          </button>
        </motion.div>

        {/* Mock Editor Interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 mx-auto max-w-5xl rounded-xl glass border-primary/20 p-2 overflow-hidden shadow-2xl relative"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <div className="flex items-center gap-2 p-3 border-b border-white/5 bg-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="p-6 text-left font-mono text-sm leading-relaxed overflow-x-auto">
            <pre className="text-muted-foreground">
              <code>
                <span className="text-primary italic"># AI Review Found 2 Issues</span>{'\n'}
                <span className="text-neon-pink">def</span> process_data(user_id):{'\n'}
                {'  '}data = db.fetch(user_id) <span className="bg-red-500/20 text-red-400"># SECURITY: SQL Injection Risk</span>{'\n'}
                {'  '}return json.dumps(data){'\n'}
                {'\n'}
                <span className="text-green-400 italic"># SUGGESTION: Use parameterized queries</span>
              </code>
            </pre>
          </div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-neon-purple/10 rounded-full blur-[120px]" />
    </section>
  );
};
