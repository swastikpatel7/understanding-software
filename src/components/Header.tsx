const Header = () => {
  return (
    <header className="relative z-10 flex justify-between items-start px-8 md:px-16 pt-12 pb-8">
      <h1 className="text-2xl md:text-4xl font-display text-primary tracking-wider">
        UNDERSTANDING SOFTWARE
      </h1>
      <p className="max-w-sm text-right text-sm md:text-base text-muted-foreground font-body italic">
        A visual guide for curious minds who want to understand how software really works.
      </p>
    </header>
  );
};

export default Header;
