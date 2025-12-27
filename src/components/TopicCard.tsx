import React from "react";

interface TopicCardProps {
  title: string;
  description: string;
  illustration: React.ReactNode;
  figureNumber: string;
  isReversed?: boolean;
}

const TopicCard = ({ title, description, illustration, figureNumber, isReversed = false }: TopicCardProps) => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
      {/* Text content */}
      <div className={`space-y-4 ${isReversed ? 'lg:order-2' : ''}`}>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
            {figureNumber}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <h3 className="font-display text-xl md:text-2xl text-primary">{title}</h3>
        <div className="font-body text-foreground leading-relaxed space-y-4">
          {description.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
      
      {/* Illustration */}
      <div className={`flex justify-center ${isReversed ? 'lg:order-1' : ''}`}>
        {illustration}
      </div>
    </div>
  );
};

// Memoize TopicCard to prevent re-renders if its props haven't changed.
// This is especially beneficial if TopicCard is part of a list that re-renders,
// ensuring this component only re-renders when its specific data changes.
export default React.memo(TopicCard);
