import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MessageSquare, ChevronRight, Hash, Trash2 } from 'lucide-react';
import type { HistoryItem } from '../types/reviewTypes';

interface SidebarProps {
    history: HistoryItem[];
    onSelect: (item: HistoryItem) => void;
    onDelete: (id: string, e: React.MouseEvent) => void;
    currentId?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ history, onSelect, onDelete, currentId }) => {
    return (
        <aside className="w-full h-full glass border-r border-white/5 flex flex-col">
            <div className="p-6 border-b border-white/5 bg-white/5">
                <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-bold">Review History</h2>
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Previous sessions</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                    {history.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => onSelect(item)}
                            className={`p-4 rounded-xl cursor-pointer transition-all border group relative ${
                                currentId === item.id 
                                    ? 'bg-primary/10 border-primary/50 text-white glow-cyan' 
                                    : 'bg-white/2 border-white/5 hover:bg-white/5 hover:border-white/10 text-muted-foreground hover:text-white'
                            }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2 text-xs font-mono">
                                    <Hash className="w-3 h-3 opacity-50" />
                                    <span className="uppercase">{item.language}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] opacity-50 px-2 py-0.5 rounded-full bg-white/10 uppercase">
                                        {new Date(item.created_at).toLocaleDateString()}
                                    </span>
                                    <button
                                        onClick={(e) => onDelete(item.id, e)}
                                        className="p-1.5 rounded-md hover:bg-destructive/20 hover:text-destructive transition-colors opacity-70 hover:opacity-100"
                                        title="Delete Session"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                            <div className="text-sm font-medium truncate">
                                {item.code.substring(0, 50)}...
                            </div>
                            <div className="flex items-center gap-1 mt-3 text-[10px] text-primary">
                                <MessageSquare className="w-3 h-3" />
                                <span>{item.bugs.length} issues found</span>
                                <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {history.length === 0 && (
                  <div className="h-40 flex flex-col items-center justify-center text-muted-foreground opacity-50">
                    <MessageSquare className="w-10 h-10 mb-2" />
                    <p className="text-sm italic">No history yet</p>
                  </div>
                )}
            </div>
        </aside>
    );
};
