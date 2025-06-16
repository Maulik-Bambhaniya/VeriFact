
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BookOpen, AlertTriangle, ExternalLink, TrendingUp, Users, Globe } from 'lucide-react';

export const EducationalSection: React.FC = () => {
  const factCheckingSites = [
    { name: 'Snopes', url: 'https://snopes.com', description: 'Fact-checking urban legends and misinformation' },
    { name: 'PolitiFact', url: 'https://politifact.com', description: 'Political fact-checking and truth-o-meter' },
    { name: 'FactCheck.org', url: 'https://factcheck.org', description: 'Nonpartisan fact-checking of politics' },
    { name: 'AP Fact Check', url: 'https://apnews.com/hub/ap-fact-check', description: 'Associated Press fact-checking' }
  ];

  const tips = [
    'Check the source - Is it a reputable news organization?',
    'Look for author credentials and contact information',
    'Verify the date - Is this current or outdated information?',
    'Cross-reference with multiple reliable sources',
    'Be skeptical of sensational headlines or emotional language',
    'Check if the story is reported by other major news outlets',
    'Look for supporting evidence and citations',
    'Be wary of stories that confirm your existing beliefs without question'
  ];

  const stats = [
    { label: 'Global Impact', value: '3.8B', description: 'People exposed to misinformation daily' },
    { label: 'Spread Rate', value: '6x', description: 'Faster than factual news on social media' },
    { label: 'Trust Level', value: '32%', description: 'Of people trust news on social platforms' }
  ];

  return (
    <Card className="w-full shadow-lg border-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-xl">
          <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <span>Educational Resources</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="how-it-works" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="how-it-works" className="text-xs">How It Works</TabsTrigger>
            <TabsTrigger value="tips" className="text-xs">Detection Tips</TabsTrigger>
            <TabsTrigger value="resources" className="text-xs">Resources</TabsTrigger>
            <TabsTrigger value="statistics" className="text-xs">Statistics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="how-it-works" className="mt-6 space-y-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                AI-Powered Detection System
              </h3>
              <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-700 dark:text-slate-300">Text Analysis</p>
                    <p>Our model analyzes writing patterns, linguistic features, and content structure to identify potential indicators of misinformation.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-green-600 dark:text-green-400">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-700 dark:text-slate-300">Pattern Recognition</p>
                    <p>Machine learning algorithms trained on thousands of verified and false articles identify subtle patterns that humans might miss.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-700 dark:text-slate-300">Confidence Scoring</p>
                    <p>The system provides a confidence score based on multiple factors, helping you understand the reliability of the prediction.</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tips" className="mt-6 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Manual Fact-Checking Tips
                </h3>
              </div>
              <div className="grid gap-3">
                {tips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Badge variant="outline" className="text-xs px-2 py-1 flex-shrink-0">
                      {index + 1}
                    </Badge>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="mt-6 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <ExternalLink className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Trusted Fact-Checking Websites
                </h3>
              </div>
              <div className="grid gap-3">
                {factCheckingSites.map((site, index) => (
                  <div key={index} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-slate-900 dark:text-slate-100">{site.name}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{site.description}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="statistics" className="mt-6 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-red-600 dark:text-red-400" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Misinformation Impact
                </h3>
              </div>
              <div className="grid gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-800/50 border border-slate-200 dark:border-slate-600">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {index === 0 && <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
                        {index === 1 && <TrendingUp className="h-6 w-6 text-red-600 dark:text-red-400" />}
                        {index === 2 && <Users className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />}
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                          {stat.value}
                        </div>
                        <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {stat.label}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          {stat.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
