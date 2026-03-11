import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: "Alex Rivera",
    role: "CTO at TechFlow",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    content: "The best AI reviewer I've used. It actually understands the context of our architecture."
  },
  {
    name: "Sarah Chen",
    role: "Lead Engineer at Innovate",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    content: "Saved us countless hours of manual PR reviews. The security scanning is top-notch."
  },
  {
    name: "Mark Johnson",
    role: "Founder of DevScale",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
    content: "Clean code suggestions are incredibly helpful for mentoring junior developers."
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 px-6 bg-white/2">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">What Engineers Say</h2>
          <p className="text-muted-foreground">Trusted by engineering teams worldwide.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl glass border-white/5 hover:border-primary/20 transition-all flex flex-col gap-6"
            >
              <div className="flex gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="italic text-lg">"{review.content}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/20" />
                <div>
                  <div className="font-bold">{review.name}</div>
                  <div className="text-sm text-muted-foreground">{review.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
