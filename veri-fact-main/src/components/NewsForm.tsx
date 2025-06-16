
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText, User, Type } from 'lucide-react';

interface NewsFormProps {
  onSubmit: (data: { title: string; author: string; text: string }) => void;
  isLoading: boolean;
}

export const NewsForm: React.FC<NewsFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    text: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Article title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters long';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author name is required';
    }
    
    if (!formData.text.trim()) {
      newErrors.text = 'Article text is required';
    } else if (formData.text.length < 50) {
      newErrors.text = 'Article text must be at least 50 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const loadSampleData = () => {
    setFormData({
      title: 'Scientists Discover New Treatment for Common Cold',
      author: 'Dr. Sarah Johnson',
      text: 'Researchers at the University of Medicine have announced a breakthrough in treating the common cold. The new treatment, based on advanced immunotherapy techniques, has shown promising results in clinical trials with a 85% success rate. The treatment works by boosting the immune system\'s natural ability to fight off cold viruses. Dr. Johnson, lead researcher on the project, stated that this could revolutionize how we approach common viral infections. The treatment is expected to be available to the public within the next two years, pending regulatory approval from health authorities.'
    });
    setErrors({});
  };

  return (
    <Card className="w-full shadow-lg border-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-xl">
          <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <span>News Article Analysis</span>
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400">
          Enter the news article details below to analyze its authenticity using our AI-powered detection system.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center space-x-2">
              <Type className="h-4 w-4" />
              <span>Article Title</span>
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter the news article title..."
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`transition-all duration-200 ${errors.title ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {errors.title && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="author" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Author Name</span>
            </Label>
            <Input
              id="author"
              type="text"
              placeholder="Enter the author's name..."
              value={formData.author}
              onChange={(e) => handleInputChange('author', e.target.value)}
              className={`transition-all duration-200 ${errors.author ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {errors.author && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.author}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="text" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Article Text</span>
            </Label>
            <Textarea
              id="text"
              placeholder="Paste the full article text here..."
              value={formData.text}
              onChange={(e) => handleInputChange('text', e.target.value)}
              className={`min-h-[150px] transition-all duration-200 ${errors.text ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {errors.text && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.text}</p>
            )}
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {formData.text.length} characters (minimum 50 required)
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all duration-200"
            >
              {isLoading ? 'Analyzing...' : 'Analyze Article'}
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={loadSampleData}
              disabled={isLoading}
              className="sm:w-auto"
            >
              Load Sample
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
