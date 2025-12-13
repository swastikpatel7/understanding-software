import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionDivider from '@/components/SectionDivider';
import ContentSection from '@/components/ContentSection';
import InteractiveSVGWrapper from '@/components/illustrations/InteractiveSVGWrapper';
import EncryptionSVG from '@/components/illustrations/EncryptionSVG';

const Cryptography = () => {
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
            Chapter 06
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary mb-6">
            CRYPTOGRAPHY
          </h1>
          <p className="font-body text-xl text-muted-foreground leading-relaxed">
            The art and science of secret communication – transforming messages 
            so only intended recipients can read them.
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
                <span className="text-4xl font-body float-left mr-2 leading-none text-primary">F</span>
                rom ancient ciphers to quantum-resistant algorithms, cryptography 
                has been the guardian of secrets throughout history. Today, it 
                protects your passwords, secures your transactions, and enables 
                private communication across the globe.
              </p>
              <p className="font-body leading-relaxed text-muted-foreground">
                Modern cryptography is built on mathematical problems so hard that 
                even with all the world's computing power, solving them would take 
                longer than the age of the universe.
              </p>
            </div>
            <InteractiveSVGWrapper>
              <EncryptionSVG />
            </InteractiveSVGWrapper>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Symmetric */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Section 6.1
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-primary mt-2">
              SYMMETRIC ENCRYPTION
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="font-body leading-relaxed">
                In symmetric encryption, the same key encrypts and decrypts the 
                message. It's fast and efficient – the workhorse of modern 
                cryptography.
              </p>
              <p className="font-body leading-relaxed text-muted-foreground">
                AES-256 (Advanced Encryption Standard) is the gold standard. Used 
                by governments, banks, and every secure website. A 256-bit key 
                has 2²⁵⁶ possible combinations – a number with 78 digits.
              </p>
              <p className="font-body leading-relaxed text-muted-foreground">
                The challenge? Key distribution. How do you share a secret key 
                securely if you can't communicate privately yet?
              </p>
            </div>
            <div className="bg-card/50 border border-border rounded-lg p-6 font-mono text-sm">
              <div className="text-muted-foreground mb-3">Symmetric Encryption Flow:</div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-primary">1.</span>
                  <span className="text-foreground">Plaintext: "Hello World"</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-primary">2.</span>
                  <span className="text-foreground">Key: 256 random bits</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-primary">3.</span>
                  <span className="text-muted-foreground">AES-256 encryption...</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-primary">4.</span>
                  <span className="text-foreground">Ciphertext: "x9K#mP..."</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Asymmetric */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Section 6.2
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-primary mt-2">
              ASYMMETRIC ENCRYPTION
            </h2>
          </div>
          
          <div className="space-y-6">
            <p className="font-body text-lg leading-relaxed">
              Asymmetric encryption solves the key distribution problem with a 
              revolutionary idea: two keys. A public key anyone can see, and a 
              private key only you possess.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/50 border border-border rounded-lg p-6">
                <h3 className="font-mono text-sm text-primary mb-3">Public Key</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Share it freely. Others use it to encrypt messages meant for you. 
                  Like a mailbox slot – anyone can drop mail in.
                </p>
              </div>
              <div className="bg-card/50 border border-border rounded-lg p-6">
                <h3 className="font-mono text-sm text-primary mb-3">Private Key</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Keep it secret. Only you can decrypt messages. Like the key to 
                  your mailbox – only you can retrieve the mail.
                </p>
              </div>
            </div>
            
            <p className="font-body leading-relaxed text-muted-foreground">
              RSA, named after Rivest, Shamir, and Adleman, relies on the 
              difficulty of factoring large prime numbers. Multiplying two 1024-bit 
              primes takes milliseconds; finding those primes from the product 
              would take millions of years.
            </p>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Hashing */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Section 6.3
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-primary mt-2">
              CRYPTOGRAPHIC HASHING
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="font-body leading-relaxed">
                A hash function takes any input and produces a fixed-size output 
                – a digital fingerprint. Change one bit of input, and the entire 
                hash changes unpredictably.
              </p>
              <p className="font-body leading-relaxed text-muted-foreground">
                This is how passwords are stored. Websites don't keep your password 
                – they keep its hash. When you log in, they hash your input and 
                compare. Even if hackers steal the database, they get useless hashes.
              </p>
            </div>
            <div className="bg-card/50 border border-border rounded-lg p-6 font-mono text-xs">
              <div className="text-muted-foreground mb-3">SHA-256 Examples:</div>
              <div className="space-y-3">
                <div>
                  <div className="text-foreground">"Hello"</div>
                  <div className="text-primary break-all">185f8db32271fe25f561a...</div>
                </div>
                <div>
                  <div className="text-foreground">"hello"</div>
                  <div className="text-primary break-all">2cf24dba5fb0a30e26e83...</div>
                </div>
                <div className="text-muted-foreground text-xs mt-2">
                  One character change = completely different hash
                </div>
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
            to="/chapters/algorithms" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Chapter 05: Algorithms
          </Link>
          <Link 
            to="/chapters/memory" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-mono text-sm"
          >
            Chapter 07: Memory Management
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </ContentSection>

      <Footer />
    </div>
  );
};

export default Cryptography;
