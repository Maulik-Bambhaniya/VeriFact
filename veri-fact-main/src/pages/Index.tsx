import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { NewsForm } from '../components/NewsForm';
import { ResultsDisplay } from '../components/ResultsDisplay';
import { HistorySection } from '../components/HistorySection';
import { EducationalSection } from '../components/EducationalSection';
import { Footer } from '../components/Footer';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { toast } from '@/hooks/use-toast';

export interface PredictionResult {
  id: string;
  title: string;
  author: string;
  text: string;
  prediction: 'REAL' | 'FAKE';
  confidence: number;
  timestamp: Date;
}

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<PredictionResult | null>(null);
  const [history, setHistory] = useState<PredictionResult[]>([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('verifact-theme');
    const savedHistory = localStorage.getItem('verifact-history');
    
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        setHistory(parsedHistory);
      } catch (error) {
        console.error('Error parsing history:', error);
      }
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('verifact-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('verifact-theme', 'light');
    }
  };

  const handleFormSubmit = async (formData: { title: string; author: string; text: string }) => {
    setIsLoading(true);
    setCurrentResult(null);

    try {
      // Create form data for the API request
      const apiFormData = new FormData();
      apiFormData.append('title', formData.title);
      apiFormData.append('author', formData.author);
      apiFormData.append('maintext', formData.text);
      
      // Make the API request to our Flask backend
      const response = await fetch('/api', {
        method: 'POST',
        body: apiFormData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze the article');
      }
      
      const responseText = await response.text();
      
      // Extract the prediction from the response
      // The response is HTML with the prediction in an h1 tag
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = responseText;
      const predictionText = tempDiv.querySelector('h1')?.innerText.toUpperCase() || 'UNKNOWN';
      
      // Create a result object
      const result: PredictionResult = {
        id: Date.now().toString(),
        title: formData.title,
        author: formData.author,
        text: formData.text,
        prediction: predictionText === 'REAL' ? 'REAL' : 'FAKE',
        confidence: 85, // Fixed confidence since our model doesn't provide this
        timestamp: new Date()
      };

      setCurrentResult(result);
      
      const updatedHistory = [result, ...history.slice(0, 9)]; // Keep last 10 results
      setHistory(updatedHistory);
      localStorage.setItem('verifact-history', JSON.stringify(updatedHistory));
      
      toast({
        title: "Analysis Complete",
        description: `News article analyzed as ${predictionText}.`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze the article. Please try again.",
        variant: "destructive",
      });
      console.error('Error analyzing article:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('verifact-history');
    toast({
      title: "History Cleared",
      description: "All previous analyses have been removed.",
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 dark:from-slate-900 dark:via-blue-900 dark:to-green-900">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <NewsForm onSubmit={handleFormSubmit} isLoading={isLoading} />
              
              {isLoading && <LoadingSpinner />}
              
              {currentResult && !isLoading && (
                <ResultsDisplay result={currentResult} />
              )}
              
              <EducationalSection />
            </div>
            
            <div className="space-y-8">
              <HistorySection history={history} onClearHistory={clearHistory} />
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
