import React from 'react';
import { motion } from 'framer-motion';
import { Bug, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import type { ReviewResponse } from '../types/reviewTypes';

interface ReviewPanelProps {
    review: ReviewResponse | null;
    isStreaming: boolean;
    streamText?: string;
}

export const ReviewPanel: React.FC<ReviewPanelProps> = ({ review, isStreaming, streamText }) => {
    if (!review && !isStreaming) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center glass border-l border-white/5 opacity-50">
                <Sparkles className="w-12 h-12 mb-4 text-primary animate-pulse" />
                <h3 className="text-lg font-bold mb-2">Ready for Review</h3>
                <p className="text-sm max-w-[200px]">Upload or paste code to see AI-powered insights here.</p>
            </div>
        );
    }

    return (
        <aside className="w-full h-full glass border-l border-white/5 flex flex-col overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold">AI Insights</h2>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                        {isStreaming ? 'Analyzing code...' : 'Review Complete'}
                    </p>
                </div>
                {isStreaming && (
                    <div className="flex gap-1">
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 rounded-full bg-primary" />
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 rounded-full bg-primary/60" />
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 rounded-full bg-primary/30" />
                    </div>
                )}
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {isStreaming && streamText && (
                    <div className="p-4 rounded-xl bg-white/5 font-mono text-sm leading-relaxed border border-white/10 animate-in fade-in slide-in-from-bottom-2">
                        {streamText}
                    </div>
                )}

                {review && (
                    <>
                        <ReviewSection 
                            title="Bugs" 
                            items={review.bugs} 
                            icon={<Bug className="w-4 h-4 text-neon-pink" />} 
                            gradient="from-neon-pink/20 to-transparent"
                            borderColor="border-neon-pink/20"
                        />
                        <ReviewSection 
                            title="Security" 
                            items={review.security_issues} 
                            icon={<ShieldCheck className="w-4 h-4 text-neon-purple" />} 
                            gradient="from-neon-purple/20 to-transparent"
                            borderColor="border-neon-purple/20"
                        />
                        <ReviewSection 
                            title="Performance" 
                            items={review.performance_issues} 
                            icon={<Zap className="w-4 h-4 text-neon-cyan" />} 
                            gradient="from-neon-cyan/20 to-transparent"
                            borderColor="border-neon-cyan/20"
                        />
                        <ReviewSection 
                            title="Suggestions" 
                            items={review.suggestions} 
                            icon={<Sparkles className="w-4 h-4 text-neon-green" />} 
                            gradient="from-neon-green/20 to-transparent"
                            borderColor="border-neon-green/20"
                        />
                    </>
                )}
            </div>
        </aside>
    );
};

interface SectionProps {
    title: string;
    items: string[];
    icon: React.ReactNode;
    gradient: string;
    borderColor: string;
}

const ReviewSection: React.FC<SectionProps> = ({ title, items, icon, gradient, borderColor }) => {
    if (items.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl border ${borderColor} bg-gradient-to-br ${gradient} p-5 overflow-hidden relative group`}
        >
            <div className="flex items-center gap-2 mb-4">
                {icon}
                <h4 className="text-sm font-bold uppercase tracking-wider">{title}</h4>
                <span className="ml-auto text-[10px] bg-white/10 px-2 py-0.5 rounded-full">{items.length}</span>
            </div>
            <ul className="space-y-3">
                {items.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                        {item}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};
