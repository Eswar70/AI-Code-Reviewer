import React from 'react';
import { Terminal, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5 glass">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center">
                <Terminal className="text-primary w-5 h-5" />
              </div>
              <span className="text-xl font-bold">AI Reviewer</span>
            </div>
            <p className="text-muted-foreground max-w-md mb-8">
              Building the next generation of intelligent tools for modern engineering teams. Ship safer, faster, and better code.
            </p>
            <div className="flex items-center gap-4">
              <Github className="w-6 h-6 text-muted-foreground hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-muted-foreground hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="w-6 h-6 text-muted-foreground hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 italic text-primary">Product</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 italic text-primary">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:row items-center justify-between gap-6 text-sm text-muted-foreground">
          <p>© 2026 AI Code Reviewer. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
