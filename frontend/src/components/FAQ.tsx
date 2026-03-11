import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "How accurate is the AI in detecting bugs?",
    answer: "Our engine uses multi-stage validation with Google Gemini 2.5 Flash, achieving over 98% accuracy in common vulnerability patterns and logic flaws."
  },
  {
    question: "Does it support private repositories?",
    answer: "Yes, we integrate with GitHub and GitLab. Your code is never used for training and is encrypted at rest."
  },
  {
    question: "Which languages are supported?",
    answer: "We support Python, JavaScript, TypeScript, Java, C++, Go, and Rust. More languages are being added every month."
  },
  {
    question: "Is there a free tier for developers?",
    answer: "Yes, individuals get up to 50 complimentary reviews per month. Team-based pricing starts at $49/month."
  }
];

export const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(0);

  return (
    <section id="faq" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Everything you need to know about AI Reviewer.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="glass rounded-xl border-white/5 overflow-hidden">
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left transition-colors hover:bg-white/5"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                {activeIndex === index ? <Minus className="w-5 h-5 text-primary" /> : <Plus className="w-5 h-5" />}
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
