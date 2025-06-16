
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Database, Search } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <Card className="w-full shadow-lg border-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin border-t-blue-600 dark:border-t-blue-400"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="h-6 w-6 text-blue-600 dark:text-blue-400 animate-pulse" />
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Analyzing Article...
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Our AI is processing the content and cross-referencing patterns
            </p>
          </div>
          
          <div className="flex items-center space-x-8 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-2">
              <BarChart className="h-4 w-4 animate-pulse" />
              <span>Pattern Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <Database className="h-4 w-4 animate-pulse" />
              <span>Data Comparison</span>
            </div>
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 animate-pulse" />
              <span>Fact Verification</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
