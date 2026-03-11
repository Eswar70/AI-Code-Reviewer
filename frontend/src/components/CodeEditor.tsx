import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
    code: string;
    language: string;
    onChange: (value: string | undefined) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, language, onChange }) => {
    return (
        <div className="h-full w-full rounded-xl overflow-hidden glass border-white/5 border-2 shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30 z-10" />
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    <span className="ml-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">{language}</span>
                </div>
            </div>
            <Editor
                height="calc(100% - 40px)"
                defaultLanguage={language}
                language={language}
                value={code}
                theme="vs-dark"
                onChange={onChange}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 16 },
                    fontFamily: "'Fira Code', monospace",
                    cursorStyle: 'block',
                    cursorBlinking: 'smooth',
                }}
            />
        </div>
    );
};
