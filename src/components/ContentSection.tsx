interface ContentSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const ContentSection = ({ children, className = '', id }: ContentSectionProps) => {
  return (
    <section id={id} className={`relative z-10 py-12 md:py-20 ${className}`}>
      {children}
    </section>
  );
};

export default ContentSection;
