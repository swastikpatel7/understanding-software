const SectionDivider = () => {
  return (
    <div className="w-full py-8 overflow-hidden">
      <svg 
        className="w-full h-2" 
        viewBox="0 0 1200 8" 
        preserveAspectRatio="none"
      >
        {/* Animated dashed line */}
        {Array.from({ length: 60 }).map((_, i) => (
          <rect
            key={i}
            x={i * 20}
            y="3"
            width="12"
            height="2"
            className="fill-primary animate-pulse-subtle"
            style={{ animationDelay: `${i * 0.05}s` }}
          />
        ))}
      </svg>
    </div>
  );
};

export default SectionDivider;
