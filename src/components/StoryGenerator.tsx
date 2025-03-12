
import React, { useState } from 'react';
import { Sparkles, RefreshCw, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { storyParameters, generateStory } from '@/utils/storyUtils';
import ParameterSelector from '@/components/ParameterSelector';
import StoryOutput from '@/components/StoryOutput';
import LoadingIndicator from '@/components/LoadingIndicator';
import { toast } from 'sonner';

interface StoryGeneratorProps {
  className?: string;
}

const StoryGenerator: React.FC<StoryGeneratorProps> = ({ className }) => {
  const [prompt, setPrompt] = useState('');
  const [parameters, setParameters] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    storyParameters.forEach(param => {
      if (param.options.length > 0) {
        initial[param.id] = param.options[0].id;
      }
    });
    return initial;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [story, setStory] = useState<{ title: string; content: string } | null>(null);

  const handleParameterChange = (id: string, value: string) => {
    setParameters(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleGenerateStory = async () => {
    setIsLoading(true);
    
    try {
      const generatedStory = await generateStory(parameters, prompt);
      setStory(generatedStory);
      toast.success('Story generated successfully!');
    } catch (error) {
      toast.error('Failed to generate story. Please try again.');
      console.error('Error generating story:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPrompt('');
    // Reset parameters to default values
    const defaultParams: Record<string, string> = {};
    storyParameters.forEach(param => {
      if (param.options.length > 0) {
        defaultParams[param.id] = param.options[0].id;
      }
    });
    setParameters(defaultParams);
    setStory(null);
  };

  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-medium">Story Parameters</h2>
            </div>
            
            <ParameterSelector 
              parameters={storyParameters} 
              onChange={handleParameterChange}
            />
          </div>
          
          <div className="space-y-4">
            <label htmlFor="prompt" className="text-sm font-medium text-foreground">
              Additional Details (Optional)
            </label>
            <textarea
              id="prompt"
              placeholder="Add specific details or elements you'd like in your story..."
              value={prompt}
              onChange={handlePromptChange}
              className="w-full h-32 px-4 py-3 rounded-xl bg-background border border-input focus:border-primary/50 focus:ring-0 transition-all duration-200 resize-none text-foreground"
            />
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handleGenerateStory}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center space-x-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-sm"
            >
              {isLoading ? (
                <>
                  <LoadingIndicator size="sm" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Generate Story</span>
                </>
              )}
            </button>
            
            <button
              onClick={handleReset}
              disabled={isLoading}
              className="px-4 py-3 rounded-xl bg-secondary hover:bg-secondary/70 text-muted-foreground transition-all duration-200"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Your Story</h2>
          
          <StoryOutput
            title={story?.title}
            content={story?.content || "Your story will appear here after generation..."}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default StoryGenerator;
