import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionDivider from '@/components/SectionDivider';
import ContentSection from '@/components/ContentSection';
import InteractiveSVGWrapper from '@/components/illustrations/InteractiveSVGWrapper';
import HTTPRequestSVG from '@/components/illustrations/HTTPRequestSVG';

const WebDevelopment = () => {
  return (
    <div className="min-h-screen relative">
      <Header />
      <SectionDivider />

      {/* Chapter Header */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-mono text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Overview
          </Link>
          
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block mb-4">
            Chapter 03
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary mb-6">
            HOW THE WEB WORKS
          </h1>
          <p className="font-body text-xl text-muted-foreground leading-relaxed">
            From typing a URL to seeing a webpage – the intricate dance of 
            protocols, servers, and data that powers the internet.
          </p>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Introduction */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="font-body text-lg leading-relaxed">
                <span className="text-4xl font-body float-left mr-2 leading-none text-primary">W</span>
                hen you type "google.com" into your browser, you initiate one of the 
                most remarkable processes in modern technology. In milliseconds, your 
                request travels through cables, routers, and servers across the world.
              </p>
              <p className="font-body leading-relaxed text-muted-foreground">
                Understanding this journey demystifies the internet and reveals the 
                elegant protocols that make global communication possible.
              </p>
            </div>
            <InteractiveSVGWrapper>
              <HTTPRequestSVG />
            </InteractiveSVGWrapper>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* DNS */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Section 3.1
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-primary mt-2">
              DNS: THE INTERNET'S PHONE BOOK
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="font-body leading-relaxed">
                Computers don't understand "google.com" – they need IP addresses like 
                142.250.80.46. The Domain Name System (DNS) translates human-readable 
                names into these numerical addresses.
              </p>
              <p className="font-body leading-relaxed text-muted-foreground">
                Your request first goes to a DNS resolver, then to root servers, TLD 
                servers, and finally the authoritative nameserver. This hierarchy 
                enables the entire internet to be navigated by name.
              </p>
            </div>
            <div className="bg-card/50 border border-border rounded-lg p-6 font-mono text-sm space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-primary">1.</span>
                <span className="text-muted-foreground">Browser checks cache</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary">2.</span>
                <span className="text-muted-foreground">Query DNS resolver</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary">3.</span>
                <span className="text-muted-foreground">Root server → .com TLD</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary">4.</span>
                <span className="text-muted-foreground">TLD → Authoritative NS</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary">5.</span>
                <span className="text-foreground">Return IP: 142.250.80.46</span>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* HTTP */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Section 3.2
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-primary mt-2">
              HTTP: THE LANGUAGE OF THE WEB
            </h2>
          </div>
          
          <div className="space-y-6">
            <p className="font-body text-lg leading-relaxed">
              HTTP (HyperText Transfer Protocol) is the foundation of data exchange 
              on the web. Every image, every video, every webpage you see is delivered 
              through HTTP requests and responses.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card/50 border border-border rounded-lg p-5">
                <h3 className="font-mono text-sm text-primary mb-2">GET</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Retrieve data. Safe and idempotent.
                </p>
              </div>
              <div className="bg-card/50 border border-border rounded-lg p-5">
                <h3 className="font-mono text-sm text-primary mb-2">POST</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Submit data. Creates new resources.
                </p>
              </div>
              <div className="bg-card/50 border border-border rounded-lg p-5">
                <h3 className="font-mono text-sm text-primary mb-2">PUT</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Update or replace existing data.
                </p>
              </div>
              <div className="bg-card/50 border border-border rounded-lg p-5">
                <h3 className="font-mono text-sm text-primary mb-2">DELETE</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Remove a resource from the server.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* TLS */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Section 3.3
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-primary mt-2">
              HTTPS & TLS: SECURE COMMUNICATION
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="font-body leading-relaxed">
                That little padlock in your browser bar represents TLS (Transport 
                Layer Security) – the encryption layer that keeps your data private.
              </p>
              <p className="font-body leading-relaxed text-muted-foreground">
                TLS uses asymmetric encryption for the initial handshake and symmetric 
                encryption for the actual data transfer. This combination provides 
                both security and speed.
              </p>
              <p className="font-body leading-relaxed text-muted-foreground">
                When you enter your password on a website, TLS ensures that even if 
                someone intercepts your traffic, they see only encrypted gibberish.
              </p>
            </div>
            <div className="bg-card/50 border border-border rounded-lg p-6 font-mono text-sm">
              <div className="text-muted-foreground mb-3">TLS Handshake:</div>
              <div className="space-y-2 text-sm">
                <div className="text-foreground">1. Client Hello (supported ciphers)</div>
                <div className="text-foreground">2. Server Hello (chosen cipher)</div>
                <div className="text-foreground">3. Server sends certificate</div>
                <div className="text-foreground">4. Key exchange</div>
                <div className="text-primary">5. Encrypted communication begins</div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Navigation */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link 
            to="/chapters/data-structures" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Chapter 02: Data Structures
          </Link>
          <Link 
            to="/chapters/databases" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-mono text-sm"
          >
            Chapter 04: Databases
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </ContentSection>

      <Footer />
    </div>
  );
};

export default WebDevelopment;
