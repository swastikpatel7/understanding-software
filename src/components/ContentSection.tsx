interface ContentSectionProps {
  children: React.ReactNode;
  className?: string;
}

const ContentSection = ({ children, className = '' }: ContentSectionProps) => {
  return (
    <section className={`relative z-10 py-12 md:py-20 ${className}`}>
      {children}
    </section>
  );
};

export default ContentSection;
