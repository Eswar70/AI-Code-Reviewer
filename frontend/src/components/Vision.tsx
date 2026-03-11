import React from 'react';
import { motion } from 'framer-motion';

export const Vision: React.FC = () => {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto glass rounded-[2rem] p-12 text-center border-primary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-purple/5 blur-[100px]" />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            We're building the future of autonomous engineering. Our mission is to empower developers to focus on what matters: **creating value**, while our AI handles the repetitive task of ensuring code quality and security.
          </p>
          <div className="flex justify-center gap-12">
            <div>
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest mt-2">Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-neon-purple">10k+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest mt-2">Commits Reviewed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-neon-pink">500+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest mt-2">Teams Empowered</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
