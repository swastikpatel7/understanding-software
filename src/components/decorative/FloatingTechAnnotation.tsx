import { useEffect, useState, useRef } from "react";

interface FloatingTechAnnotationProps {
  text: string;
  position: "left" | "right";
  offsetY?: number;
  variant?: "default" | "highlight" | "muted";
}

/**
 * Technical annotation that floats in the margin.
 * Adds subtle engineering documentation feel.
 */
const FloatingTechAnnotation = ({
  text,
  position,
  offsetY = 0,
  variant = "default"
}: FloatingTechAnnotationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const variantStyles = {
    default: "text-primary/20",
    highlight: "text-primary/30",
    muted: "text-primary/10"
  };

  return (
    <div
      ref={ref}
      className={`absolute ${position === "left" ? "left-2 md:left-4" : "right-2 md:right-4"} hidden lg:flex items-center gap-2 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ top: `${offsetY}%` }}
      aria-hidden="true"
    >
      {position === "left" && (
        <>
          <span className={`font-mono text-[8px] tracking-[0.2em] ${variantStyles[variant]}`}>
            {text}
          </span>
          <div className={`w-4 h-px ${variant === "highlight" ? "bg-primary/20" : "bg-primary/10"}`} />
        </>
      )}
      {position === "right" && (
        <>
          <div className={`w-4 h-px ${variant === "highlight" ? "bg-primary/20" : "bg-primary/10"}`} />
          <span className={`font-mono text-[8px] tracking-[0.2em] ${variantStyles[variant]}`}>
            {text}
          </span>
        </>
      )}
    </div>
  );
};

/**
 * A collection of floating annotations for a section.
 */
interface SectionAnnotationsProps {
  sectionId: string;
}

export const SectionAnnotations = ({ sectionId }: SectionAnnotationsProps) => {
  const annotations: Record<string, Array<{ text: string; position: "left" | "right"; offsetY: number; variant?: "default" | "highlight" | "muted" }>> = {
    intro: [
      { text: "OVERVIEW", position: "left", offsetY: 20, variant: "highlight" },
      { text: "SEC.00", position: "right", offsetY: 30, variant: "muted" },
    ],
    philosophy: [
      { text: "APPROACH", position: "left", offsetY: 15, variant: "default" },
      { text: "SEC.01", position: "right", offsetY: 25, variant: "muted" },
      { text: "PRINCIPLES", position: "left", offsetY: 70, variant: "muted" },
    ],
    layers: [
      { text: "STRUCTURE", position: "left", offsetY: 10, variant: "highlight" },
      { text: "SEC.02", position: "right", offsetY: 20, variant: "muted" },
      { text: "10 LAYERS", position: "right", offsetY: 80, variant: "default" },
    ],
    roadmap: [
      { text: "PROGRESS", position: "left", offsetY: 30, variant: "default" },
      { text: "SEC.03", position: "right", offsetY: 40, variant: "muted" },
    ],
  };

  const sectionAnnotations = annotations[sectionId] || [];

  return (
    <>
      {sectionAnnotations.map((annotation, i) => (
        <FloatingTechAnnotation
          key={`${sectionId}-${i}`}
          text={annotation.text}
          position={annotation.position}
          offsetY={annotation.offsetY}
          variant={annotation.variant}
        />
      ))}
    </>
  );
};

export default FloatingTechAnnotation;
