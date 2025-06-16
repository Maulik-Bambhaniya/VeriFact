
import React from 'react';
import { Shield, Moon, Sun, BarChart, Database, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Shield className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full flex items-center justify-center">
                <Search className="h-2 w-2 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                VeriFact
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Unmasking Fake News with Data Science
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
              <BarChart className="h-4 w-4" />
              <span>AI-Powered</span>
              <Database className="h-4 w-4 ml-4" />
              <span>Data-Driven</span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="rounded-full p-2"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-slate-600" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
