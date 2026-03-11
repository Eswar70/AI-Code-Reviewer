import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Play, Trash2, ChevronLeft, ChevronRight, Terminal, Layers, History, X } from 'lucide-react';
import { CodeEditor } from '../components/CodeEditor';
import { Sidebar } from '../components/Sidebar';
import { ReviewPanel } from '../components/ReviewPanel';
import { api } from '../services/api';
import type { ReviewResponse, HistoryItem } from '../types/reviewTypes';
import { toast } from 'sonner';

const LANGUAGES = ['python', 'javascript', 'typescript', 'java', 'cpp', 'go'];

export const ReviewPage: React.FC = () => {
    const [code, setCode] = useState<string>('# Paste your code here to start review...\n\ndef main():\n    print("Hello, World!")\n');
    const [language, setLanguage] = useState<string>('python');
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [review, setReview] = useState<ReviewResponse | null>(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [streamText, setStreamText] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
    const [isPanelOpen, setIsPanelOpen] = useState(window.innerWidth >= 1280);
    const [currentReviewId, setCurrentReviewId] = useState<string | undefined>();
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);

    // Ref for the hidden file input
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            const data = await api.getHistory();
            setHistory(data);
        } catch (error) {
            console.error('Failed to load history:', error);
            toast.error('Failed to connect to backend. Please check if the server is running.');
        }
    };

    const handleReview = async () => {
        if (!code.trim()) return;

        setReview(null);
        setStreamText('');
        setIsStreaming(true);

        try {
            let fullText = '';
            await api.reviewCodeStream(code, language, (chunk) => {
                fullText += chunk;
                setStreamText(fullText);
            });

            // Once the stream is done, the backend has saved it.
            // We can fetch the latest result or parse the fullText if it's JSON.
            // For now, we perform a standard non-stream call to get the structured data
            // (or the user can click a "Finalize" button, but let's automate it).
            const structuredResult = await api.reviewCode(code, language);
            setReview(structuredResult);
            loadHistory();
            toast.success('Code audit completed successfully!');
        } catch (error) {
            console.error('Review failed:', error);
            toast.error('AI Analysis failed. Please try again.');
        } finally {
            setIsStreaming(false);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        
        // Progress simulation for "Toasted notifications" and "Progressing bars" requirement
        setUploadProgress(0);
        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev === null || prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 10;
            });
        }, 100);

        reader.onload = (event) => {
            const content = event.target?.result as string;
            setCode(content);
            
            // Auto-detect language by extension
            const ext = file.name.split('.').pop()?.toLowerCase();
            if (ext === 'py') setLanguage('python');
            else if (ext === 'js') setLanguage('javascript');
            else if (ext === 'ts') setLanguage('typescript');
            else if (ext === 'java') setLanguage('java');
            else if (ext === 'cpp') setLanguage('cpp');

            setUploadProgress(100);
            setTimeout(() => {
                setUploadProgress(null);
                toast.success(`File "${file.name}" uploaded successfully`);
            }, 800); // Slightly longer for the 100% to be visible before disappearing
        };
        reader.readAsText(file);
    };

    const handleDeleteHistory = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await api.deleteHistoryItem(id);
            setHistory(prev => prev.filter(item => item.id !== id));
            if (currentReviewId === id) {
                setReview(null);
                setCurrentReviewId(undefined);
            }
            toast.success('Review history deleted');
        } catch (error) {
            toast.error('Failed to delete history item');
        }
    };

    const handleHistorySelect = (item: HistoryItem) => {
        if (currentReviewId === item.id) {
            // Toggle the panel if clicking the same item
            setIsPanelOpen(!isPanelOpen);
            return;
        }

        setCode(item.code);
        setLanguage(item.language);
        setReview({
            bugs: item.bugs,
            security_issues: item.security_issues,
            performance_issues: item.performance_issues,
            suggestions: item.suggestions,
            refactored_code: item.refactored_code
        });
        setCurrentReviewId(item.id);
        setStreamText(''); 
        setIsPanelOpen(true); // Automatically open the right sidebar (Insights)
        setIsSidebarOpen(false); // Close history to focus on insights
    };

    const clearEditor = () => {
        setCode('');
        setReview(null);
        setCurrentReviewId(undefined);
    };

    return (
        <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden selection:bg-primary/30">
            {/* Header / Workspace Navbar */}
            <header className="h-16 glass border-b border-white/5 px-4 md:px-6 flex items-center justify-between z-20">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center">
                            <Terminal className="text-primary w-5 h-5" />
                        </div>
                        <span className="font-bold tracking-tight text-sm md:text-base">Reviewer <span className="text-[10px] text-primary/60 font-mono ml-1 hidden sm:inline">v2.5</span></span>
                    </div>
                </div>

                <div className="flex items-center gap-1.5 md:gap-3">
                    <select 
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-primary md:text-sm"
                    >
                        {LANGUAGES.map(lang => (
                            <option key={lang} value={lang} className="bg-background">{lang.toUpperCase()}</option>
                        ))}
                    </select>

                    <div className="flex items-center gap-1 bg-white/5 rounded-lg p-0.5 border border-white/10">
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="p-1.5 rounded-md hover:bg-white/10 transition-all group"
                            title="Upload File"
                        >
                            <Upload className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileUpload} 
                                className="hidden" 
                            />
                        </button>

                        <button 
                            onClick={clearEditor}
                            className="p-1.5 rounded-md hover:bg-white/10 transition-all group"
                            title="Clear Editor"
                        >
                            <Trash2 className="w-4 h-4 text-muted-foreground group-hover:text-neon-pink" />
                        </button>
                    </div>

                    <div className="w-[1px] h-6 bg-white/10 mx-1 hidden md:block" />

                    <button 
                        onClick={() => setIsPanelOpen(!isPanelOpen)}
                        className={`hidden md:flex p-2 rounded-lg transition-all ${isPanelOpen ? 'bg-primary/20 text-primary' : 'hover:bg-white/5 text-muted-foreground'}`}
                        title="Toggle Insights"
                    >
                        <Layers className="w-5 h-5" />
                    </button>

                    <button 
                        onClick={handleReview}
                        disabled={isStreaming}
                        className={`flex items-center gap-2 px-3 md:px-6 py-2 rounded-lg font-bold transition-all text-sm ${
                            isStreaming 
                                ? 'bg-primary/20 text-primary/50 cursor-not-allowed opacity-50' 
                                : 'bg-primary text-primary-foreground hover:glow-cyan active:scale-95'
                        }`}
                    >
                        {isStreaming ? (
                            <span className="flex items-center gap-2">
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-3 h-3 md:w-4 md:h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" />
                                <span className="hidden sm:inline">...</span>
                            </span>
                        ) : (
                            <>
                                <Play className="w-3 h-3 md:w-4 md:h-4 fill-current" />
                                <span className="hidden md:inline">Audit</span>
                                <span className="md:hidden">Run</span>
                            </>
                        )}
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-row overflow-hidden relative">
                {/* Mobile Drawer Overlay */}
                <AnimatePresence>
                    {(isSidebarOpen || isPanelOpen) && window.innerWidth < 1024 && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => {
                                setIsSidebarOpen(false);
                                setIsPanelOpen(false);
                            }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                        />
                    )}
                </AnimatePresence>

                {/* Sidebar (History) Drawer/Panel */}
                <div className="relative flex flex-row h-full">
                    <aside 
                        className={`fixed inset-y-0 left-0 lg:relative z-50 transition-all duration-300 ease-in-out transform overflow-hidden
                        ${isSidebarOpen ? 'translate-x-0 w-[280px] md:w-[320px] opacity-100' : '-translate-x-full lg:translate-x-0 lg:w-0 opacity-0 lg:opacity-0'}`}
                    >
                        <div className="h-full w-[280px] md:w-[320px]">
                            <Sidebar 
                                history={history} 
                                onSelect={handleHistorySelect} 
                                onDelete={handleDeleteHistory}
                                currentId={currentReviewId} 
                            />
                        </div>
                        {/* Close button for Mobile Drawer */}
                        <button 
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden absolute top-4 right-4 p-2 glass rounded-lg text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </aside>
                    {/* Inline Toggle Button (Left) - Kept outside for vertical center and visibility */}
                    <button 
                        onClick={() => {
                            const nextState = !isSidebarOpen;
                            setIsSidebarOpen(nextState);
                            if (nextState) setIsPanelOpen(false); // Mutual exclusivity
                        }}
                        className="hidden md:flex absolute top-1/2 -translate-y-1/2 z-50 transition-all duration-300"
                        style={{ 
                            left: isSidebarOpen ? (window.innerWidth >= 1024 ? '320px' : (window.innerWidth >= 768 ? '320px' : '280px')) : '0px',
                            transform: `translate(${isSidebarOpen ? '-50%' : '0%'}, -50%)`
                        }}
                    >
                        <div className="w-6 h-12 bg-white/5 glass border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-all shadow-xl">
                            {isSidebarOpen ? <ChevronLeft className="w-4 h-4 text-primary" /> : <ChevronRight className="w-4 h-4 text-primary" />}
                        </div>
                    </button>
                </div>

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                    {/* Progress Bar Overlay for Uploads */}
                    <AnimatePresence>
                        {uploadProgress !== null && (
                            <motion.div 
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-64 p-3 glass rounded-xl border-primary/30"
                            >
                                <div className="flex items-center justify-between mb-2 text-[10px] font-bold uppercase tracking-wider text-primary">
                                    <span>Uploading File</span>
                                    <span>{uploadProgress}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                        className="h-full bg-primary" 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${uploadProgress}%` }}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Floating Mobile Toggles (Sticky bottom for small devices) */}
                    <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-[60]">
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-3 bg-primary text-primary-foreground rounded-full shadow-lg shadow-primary/20 hover:scale-110 active:scale-90 transition-all"
                            title="Open History"
                        >
                            <History className="w-6 h-6" />
                        </button>
                        <button 
                            onClick={handleReview}
                            disabled={isStreaming}
                            className="px-6 py-3 bg-white text-black font-bold rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                        >
                            <Play className="w-5 h-5 fill-current" />
                            <span>Audit</span>
                        </button>
                        <button 
                            onClick={() => setIsPanelOpen(true)}
                            className="p-3 bg-primary text-primary-foreground rounded-full shadow-lg shadow-primary/20 hover:scale-110 active:scale-90 transition-all"
                            title="Open Insights"
                        >
                            <Layers className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex-1 p-4 md:p-6 flex flex-col overflow-hidden">
                        <div className="flex-1 min-h-0 glass border border-white/5 rounded-2xl overflow-hidden group relative">
                            <CodeEditor 
                                code={code} 
                                language={language} 
                                onChange={(val) => setCode(val || '')} 
                            />
                        </div>
                    </div>
                </main>

                {/* Review Panel (Insights) Drawer/Panel */}
                <div className="relative flex flex-row h-full">
                    {/* Inline Toggle Button (Right) - Standardized with Left handle */}
                    <button 
                        onClick={() => {
                            const nextState = !isPanelOpen;
                            setIsPanelOpen(nextState);
                            if (nextState) setIsSidebarOpen(false); // Mutual exclusivity
                        }}
                        className="hidden lg:flex absolute top-1/2 -translate-y-1/2 z-50 transition-all duration-300 shadow-xl"
                        style={{ 
                            left: isPanelOpen ? '-3px' : '0px',
                            transform: `translate(${isPanelOpen ? '-50%' : '0%'}, -50%)`
                        }}
                    >
                        <div className="w-6 h-12 bg-white/5 glass border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-all rotate-180">
                            {isPanelOpen ? <ChevronLeft className="w-4 h-4 text-primary" /> : <ChevronRight className="w-4 h-4 text-primary" />}
                        </div>
                    </button>
                    <aside 
                        className={`fixed inset-y-0 right-0 lg:relative z-50 transition-all duration-300 ease-in-out transform overflow-hidden
                        ${isPanelOpen ? 'translate-x-0 w-full md:w-[400px] lg:w-[450px] opacity-100' : 'translate-x-full lg:hidden lg:w-0 opacity-0 lg:opacity-0'}`}
                    >
                        <div className="h-full w-full md:w-[400px] lg:w-[450px]">
                            <ReviewPanel 
                                review={review} 
                                isStreaming={isStreaming} 
                                streamText={streamText} 
                            />
                        </div>
                        {/* Close button for Mobile Drawer */}
                        <button 
                            onClick={() => setIsPanelOpen(false)}
                            className="lg:hidden absolute top-4 left-4 p-2 glass rounded-lg text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </aside>
                </div>
            </div>
            
            {/* Refined Footer with Stats */}
            <footer className="h-10 md:h-8 glass border-t border-white/5 px-4 md:px-6 flex flex-col md:flex-row items-center justify-between text-[9px] md:text-[10px] uppercase tracking-[0.1em] md:tracking-[0.2em] text-muted-foreground z-20 gap-2 md:gap-0">
                <div className="flex items-center gap-4 md:gap-6">
                    <span className="flex items-center gap-1.5"><Layers className="w-3 h-3 text-primary" /> Memory: 124MB</span>
                    <span className="flex items-center gap-1.5"><Terminal className="w-3 h-3 text-primary" /> Region: US-CENTRAL1</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                        <span className="text-white/80 font-bold">Gemini 2.5 Flash</span>
                    </div>
                    <span className="opacity-30 hidden sm:inline">|</span>
                    <span className="hidden sm:inline">124ms Latency</span>
                </div>
            </footer>
        </div>
    );
};
