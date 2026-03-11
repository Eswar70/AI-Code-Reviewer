import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'glass py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center group-hover:glow-cyan transition-all">
            <Terminal className="text-primary w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span className="text-lg md:text-xl font-bold tracking-tight">AI Reviewer</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#features" className="hover:text-primary transition-colors hover:scale-105 active:scale-95">Features</a>
          <a href="#testimonials" className="hover:text-primary transition-colors hover:scale-105 active:scale-95">Testimonials</a>
          <a href="#faq" className="hover:text-primary transition-colors hover:scale-105 active:scale-95">FAQ</a>
          <button className="px-5 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:glow-cyan active:scale-95">
            Sign In
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
            Sign In
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            {isMenuOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/5 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4 text-sm font-medium text-center">
              <a href="#features" onClick={() => setIsMenuOpen(false)} className="py-2 hover:text-primary border-b border-white/5">Features</a>
              <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className="py-2 hover:text-primary border-b border-white/5">Testimonials</a>
              <a href="#faq" onClick={() => setIsMenuOpen(false)} className="py-2 hover:text-primary border-b border-white/5">FAQ</a>
              <button className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20">
                Sign In
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
