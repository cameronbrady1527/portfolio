import { TypewriterText } from "./TypewriterText";
import { useState, useEffect, useRef } from "react";

interface ProjectImageFallbackProps {
  title: string;
  className?: string;
}

export function ProjectImageFallback({ title, className = "" }: ProjectImageFallbackProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Extract initials from the title (first letter of each word, max 3)
  const getInitials = (title: string) => {
    const words = title.split(' ').filter(word => word.length > 0);
    const initials = words.slice(0, 3).map(word => word[0]).join('');
    return initials.toUpperCase();
  };

  const initials = getInitials(title);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, we can disconnect the observer
          observer.disconnect();
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '50px' // Start animation slightly before the element comes into view
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`w-full h-full flex items-center justify-center ${className}`}>
      <div className="text-center">
        <div className="text-6xl font-bold text-gray-900 mb-2">
          {isVisible ? (
            <TypewriterText 
              text={initials} 
              speed={100}
              className="text-gray-900"
            />
          ) : (
            <span className="text-gray-900">{initials}</span>
          )}
        </div>
        <div className="text-sm text-gray-800 font-semibold">
          {title}
        </div>
      </div>
    </div>
  );
}
