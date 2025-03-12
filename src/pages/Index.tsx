
import { useEffect, useState } from 'react';
import Nav from '@/components/Nav';
import StoryGenerator from '@/components/StoryGenerator';
import { BookOpen, Sparkles, Lightbulb } from 'lucide-react';
import { AnimatedText } from '@/components/ui/animated-text';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { GlowEffect } from '@/components/ui/glow-effect';

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Aurora Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <AuroraBackground 
          blurColor="rgba(88, 95, 253, 0.4)"
          blurSize={180}
          intensity={0.7}
          backgroundColor="hsl(var(--background))"
          highlightColor="rgba(235, 200, 255, 0.8)"
          particleCount={250}
        />
      </div>
      
      <Nav />
      
      <main className="flex-1 pt-24 pb-16 relative">
        <section className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <GlowEffect position="center" size="md" color="hsla(210, 100%, 50%, 0.3)" intensity="medium">
                <div className="inline-block p-2 bg-primary/10 rounded-full mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
              </GlowEffect>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground font-display">
                <AnimatedText 
                  text="Create beautiful stories" 
                  reveal={{ 
                    type: "words",
                    stagger: 0.1,
                    delay: 0.2,
                    duration: 0.8,
                    startOn: "mount",
                    noRepeat: true
                  }}
                  className="block text-glow-sm"
                />
                <AnimatedText 
                  text="with AI" 
                  reveal={{ 
                    type: "characters",
                    stagger: 0.05,
                    delay: 1.0,
                    duration: 0.5,
                    startOn: "mount",
                    noRepeat: true
                  }}
                  className="text-primary text-glow"
                />
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
                <AnimatedText 
                  text="Transform your ideas into captivating narratives with our AI-powered story generator."
                  reveal={{ 
                    type: "words",
                    stagger: 0.03,
                    delay: 1.5,
                    duration: 0.6,
                    startOn: "mount",
                    noRepeat: true
                  }}
                />
              </p>
            </div>

            <div className="mt-12 md:mt-16 animate-slide-up">
              <StoryGenerator />
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary/50 relative">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Feature 
                icon={<Sparkles className="w-6 h-6 text-primary" />}
                title="Intelligent Creation"
                description="Our AI uses advanced algorithms to create unique, engaging stories tailored to your preferences."
              />
              <Feature 
                icon={<BookOpen className="w-6 h-6 text-primary" />}
                title="Multiple Genres"
                description="Choose from a wide range of genres, from fantasy and sci-fi to mystery and romance."
              />
              <Feature 
                icon={<Lightbulb className="w-6 h-6 text-primary" />}
                title="Endless Inspiration"
                description="Never face writer's block again with our powerful story generation engine."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-border relative">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="font-medium">Fable</span>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Fable. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
  <GlowEffect position="center" color="hsla(210, 100%, 65%, 0.1)" size="sm" intensity="low">
    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-background/70 backdrop-blur-sm border border-border/50 transition-all duration-300 hover:shadow-neo glow-container">
      <div className="p-3 bg-primary/10 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 font-display">
        <AnimatedText 
          text={title}
          reveal={{ 
            type: "characters",
            stagger: 0.03,
            startOn: "scroll",
            noRepeat: true
          }}
        />
      </h3>
      <p className="text-muted-foreground font-sans">
        <AnimatedText 
          text={description}
          reveal={{ 
            type: "words",
            stagger: 0.02,
            delay: 0.2,
            startOn: "scroll",
            noRepeat: true
          }}
        />
      </p>
    </div>
  </GlowEffect>
);

export default Index;
