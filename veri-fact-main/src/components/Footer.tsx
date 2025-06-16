import React from 'react';
import { AlertTriangle, Github, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-t border-slate-200 dark:border-slate-700 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">About VeriFact</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              VeriFact uses advanced machine learning algorithms to help identify potential misinformation. 
              Our system is designed to assist, not replace, critical thinking and professional fact-checking.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Important Disclaimer</h3>
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                AI predictions are not 100% accurate. Always verify information through multiple reliable sources 
                and use your judgment when evaluating news content.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                <Mail className="h-4 w-4" />
                <span>contact@verifact.ai</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                <Github className="h-4 w-4" />
                <span>Open Source Project</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-200 dark:border-slate-700 mt-8 pt-6 flex justify-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © 2025 VeriFact. Built with AI to combat misinformation. Use responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
};
