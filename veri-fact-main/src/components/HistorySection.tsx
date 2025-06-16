
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { History, Trash2, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { PredictionResult } from '../pages/Index';

interface HistorySectionProps {
  history: PredictionResult[];
  onClearHistory: () => void;
}

export const HistorySection: React.FC<HistorySectionProps> = ({ history, onClearHistory }) => {
  return (
    <Card className="h-fit shadow-lg border-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center space-x-2">
            <History className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span>Analysis History</span>
          </div>
          {history.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearHistory}
              className="h-8 w-8 p-0 text-slate-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {history.length === 0 ? (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            <History className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No analysis history yet</p>
            <p className="text-xs mt-1">Your recent checks will appear here</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="space-y-3">
              {history.map((item) => (
                <div 
                  key={item.id}
                  className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <Badge 
                      variant={item.prediction === 'REAL' ? "default" : "destructive"}
                      className={`text-xs ${
                        item.prediction === 'REAL'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                      }`}
                    >
                      <div className="flex items-center space-x-1">
                        {item.prediction === 'REAL' ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <XCircle className="h-3 w-3" />
                        )}
                        <span>{item.prediction}</span>
                      </div>
                    </Badge>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {item.confidence}%
                    </span>
                  </div>
                  
                  <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 line-clamp-2 mb-1">
                    {item.title}
                  </h4>
                  
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                    by {item.author}
                  </p>
                  
                  <div className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400">
                    <Calendar className="h-3 w-3" />
                    <span>{item.timestamp.toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
