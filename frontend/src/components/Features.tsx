import React from 'react';
import { motion } from 'framer-motion';
import { Bug, ShieldCheck, Zap, Code2, Cpu, Globe } from 'lucide-react';

const features = [
  {
    icon: <Bug className="w-8 h-8 text-neon-cyan" />,
    title: "Bug Detection",
    description: "Our AI identifies edge cases and logical flaws that manual reviews might miss."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-neon-purple" />,
    title: "Security Audit",
    description: "Scan for SQL injections, XSS vulnerabilities, and insecure dependencies automatically."
  },
  {
    icon: <Zap className="w-8 h-8 text-neon-pink" />,
    title: "Performance Optimization",
    description: "Get suggestions for more efficient algorithms and reduced resource usage."
  },
  {
    icon: <Code2 className="w-8 h-8 text-primary" />,
    title: "Clean Code",
    description: "Enforce best practices and consistent formatting across your entire codebase."
  },
  {
    icon: <Cpu className="w-8 h-8 text-neon-green" />,
    title: "AI Refactoring",
    description: "Receive instant, high-quality refactors with explanations of every change."
  },
  {
    icon: <Globe className="w-8 h-8 text-neon-cyan" />,
    title: "Multi-Language",
    description: "Support for Python, JS, TS, Java, C++, and more out of the box."
  }
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Enterprise-Grade Features</h2>
          <p className="text-muted-foreground">Everything you need to ship world-class software.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl glass border-white/5 hover:border-primary/20 transition-all group"
            >
              <div className="mb-6 p-3 rounded-xl bg-white/5 w-fit group-hover:glow-cyan transition-all">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
