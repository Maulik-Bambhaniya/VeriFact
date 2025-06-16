
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Share2, Calendar, User, FileText } from 'lucide-react';
import { PredictionResult } from '../pages/Index';
import { toast } from '@/hooks/use-toast';

interface ResultsDisplayProps {
  result: PredictionResult;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  const [isSharing, setIsSharing] = useState(false);

  const isReal = result.prediction === 'REAL';
  const confidenceColor = result.confidence >= 80 ? 'text-green-600' : 
                         result.confidence >= 60 ? 'text-yellow-600' : 'text-red-600';

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const shareText = `VeriFact Analysis: "${result.title}" - ${result.prediction} (${result.confidence}% confidence)`;
      
      if (navigator.share) {
        await navigator.share({
          title: 'VeriFact Analysis Result',
          text: shareText,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
        toast({
          title: "Copied to Clipboard",
          description: "Analysis result has been copied to your clipboard.",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: "Share Failed",
        description: "Unable to share the result. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Card className="w-full shadow-lg border-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm animate-fade-in">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isReal ? (
              <CheckCircle className="h-6 w-6 text-green-600" />
            ) : (
              <XCircle className="h-6 w-6 text-red-600" />
            )}
            <span>Analysis Result</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            disabled={isSharing}
            className="flex items-center space-x-2"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center space-y-4">
          <Badge 
            variant={isReal ? "default" : "destructive"}
            className={`text-lg px-6 py-2 ${
              isReal 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
            }`}
          >
            {result.prediction}
          </Badge>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Confidence Score</span>
              <span className={`font-bold ${confidenceColor}`}>
                {result.confidence}%
              </span>
            </div>
            <Progress 
              value={result.confidence} 
              className="h-3"
            />
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {result.confidence >= 80 ? 'High confidence' : 
               result.confidence >= 60 ? 'Moderate confidence' : 'Low confidence'}
            </p>
          </div>
        </div>

        <div className="border-t pt-4 space-y-4">
          <h4 className="font-semibold text-sm text-slate-700 dark:text-slate-300">
            Analyzed Article
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <FileText className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm text-slate-900 dark:text-slate-100 line-clamp-2">
                  {result.title}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <User className="h-4 w-4 text-slate-500 flex-shrink-0" />
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {result.author}
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Calendar className="h-4 w-4 text-slate-500 flex-shrink-0" />
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Analyzed on {result.timestamp.toLocaleDateString()} at {result.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
          <h5 className="font-medium text-sm text-slate-700 dark:text-slate-300 mb-2">
            Understanding the Result
          </h5>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            This analysis is based on machine learning algorithms trained on thousands of news articles. 
            The confidence score indicates how certain our model is about the classification. 
            Always cross-reference with multiple sources and use critical thinking when evaluating news content.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
