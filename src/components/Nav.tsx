
import { useState, useEffect } from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavProps {
  className?: string;
}

const Nav = ({ className }: NavProps) => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-8',
        scrolled 
          ? 'bg-glass/80 backdrop-blur-md shadow-sm border-b border-white/10' 
          : 'bg-transparent',
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a 
          href="/" 
          className="flex items-center space-x-2 text-foreground transition-opacity duration-200 hover:opacity-80"
        >
          <BookOpen className="w-6 h-6 text-primary" />
          <span className="font-medium text-lg">Fable</span>
        </a>
        
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-1 px-4 py-2 rounded-full transition-all duration-200 bg-primary/10 hover:bg-primary/20 text-primary">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">New Story</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
