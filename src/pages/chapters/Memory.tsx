import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionDivider from '@/components/SectionDivider';
import ContentSection from '@/components/ContentSection';
import InteractiveSVGWrapper from '@/components/illustrations/InteractiveSVGWrapper';
import MemoryAllocationSVG from '@/components/illustrations/MemoryAllocationSVG';

const Memory = () => {
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
            Chapter 07
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary mb-6">
            MEMORY MANAGEMENT
          </h1>
          <p className="font-body text-xl text-muted-foreground leading-relaxed">
            Every variable, every object, every function call needs a place to 
            live. Understanding memory is understanding the very fabric of computation.
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
                <span className="text-4xl font-body float-left mr-2 leading-none text-primary">M</span>
                emory is your program's workspace. Every number, string, and 
                object occupies space in RAM. How that space is allocated, used, 
                and freed determines whether your app runs smoothly or crashes 
                spectacularly.
              </p>
              <p className="font-body leading-relaxed text-muted-foreground">
                Memory management has evolved from manual allocation (and the bugs 
                that came with it) to sophisticated garbage collectors that 
                automatically clean up after you.
              </p>
            </div>
            <InteractiveSVGWrapper>
              <MemoryAllocationSVG />
            </InteractiveSVGWrapper>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Stack vs Heap */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Section 7.1
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-primary mt-2">
              STACK VS HEAP
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card/50 border border-border rounded-lg p-6 space-y-4">
              <h3 className="font-mono text-lg text-primary">The Stack</h3>
              <p className="font-body text-sm text-muted-foreground">
                Fast, automatic, limited. Function calls, local variables, and 
                return addresses live here. LIFO (Last In, First Out) – like a 
                stack of plates.
              </p>
              <ul className="space-y-2 font-body text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Allocation is instant (just move a pointer)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Automatically cleaned up when function returns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Limited size (typically 1-8 MB)</span>
                </li>
              </ul>
            </div>
            <div className="bg-card/50 border border-border rounded-lg p-6 space-y-4">
              <h3 className="font-mono text-lg text-primary">The Heap</h3>
              <p className="font-body text-sm text-muted-foreground">
                Flexible, manual (or garbage collected), vast. Objects, arrays, 
                and data that outlives function calls live here.
              </p>
              <ul className="space-y-2 font-body text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Allocation is slower (must find free space)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Must be explicitly freed or garbage collected</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Can grow as needed (limited by system RAM)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Garbage Collection */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Section 7.2
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-primary mt-2">
              GARBAGE COLLECTION
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="font-body leading-relaxed">
                In languages like JavaScript, Java, and Python, you don't 
                manually free memory. A garbage collector (GC) automatically 
                identifies and reclaims memory that's no longer reachable.
              </p>
              <p className="font-body leading-relaxed text-muted-foreground">
                The most common algorithm is "mark and sweep" – the GC marks 
                all reachable objects starting from root references, then 
                sweeps away everything unmarked.
              </p>
              <p className="font-body leading-relaxed text-muted-foreground">
                This convenience comes at a cost: GC pauses can cause stuttering 
                in real-time applications. Modern GCs use concurrent and 
                generational strategies to minimize these pauses.
              </p>
            </div>
            <div className="bg-card/50 border border-border rounded-lg p-6 font-mono text-sm">
              <div className="text-muted-foreground mb-3">Generational Hypothesis:</div>
              <div className="space-y-4 text-sm">
                <div className="space-y-1">
                  <div className="text-primary">Young Generation</div>
                  <div className="text-muted-foreground">Short-lived objects, collected frequently</div>
                </div>
                <div className="space-y-1">
                  <div className="text-primary">Old Generation</div>
                  <div className="text-muted-foreground">Long-lived objects, collected rarely</div>
                </div>
                <div className="text-foreground mt-4 pt-4 border-t border-border">
                  "Most objects die young"
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Memory Leaks */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Section 7.3
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-primary mt-2">
              MEMORY LEAKS
            </h2>
          </div>
          
          <div className="space-y-6">
            <p className="font-body text-lg leading-relaxed">
              A memory leak occurs when your program holds onto memory it no 
              longer needs. Over time, this can exhaust available RAM and crash 
              your application.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/50 border border-border rounded-lg p-6">
                <h3 className="font-mono text-sm text-primary mb-3">Common Causes</h3>
                <ul className="space-y-2 font-body text-sm text-muted-foreground">
                  <li>• Forgotten event listeners</li>
                  <li>• Closures holding references</li>
                  <li>• Circular references</li>
                  <li>• Timers not cleared</li>
                  <li>• Growing caches without limits</li>
                </ul>
              </div>
              <div className="bg-card/50 border border-border rounded-lg p-6">
                <h3 className="font-mono text-sm text-primary mb-3">Prevention</h3>
                <ul className="space-y-2 font-body text-sm text-muted-foreground">
                  <li>• Always remove event listeners</li>
                  <li>• Use WeakMap/WeakSet when appropriate</li>
                  <li>• Clear intervals and timeouts</li>
                  <li>• Set cache size limits</li>
                  <li>• Profile memory usage regularly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Pointers */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Section 7.4
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-primary mt-2">
              POINTERS & REFERENCES
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="font-body leading-relaxed">
                A pointer is simply a variable that holds a memory address. 
                Instead of storing the actual data, it stores where to find 
                the data.
              </p>
              <p className="font-body leading-relaxed text-muted-foreground">
                In high-level languages, you work with references – pointers 
                with training wheels. You can't do pointer arithmetic, but 
                you still pass objects by reference, not by value.
              </p>
              <p className="font-body leading-relaxed text-muted-foreground">
                This is why modifying an object in a function affects the 
                original – you're not working with a copy, you're working 
                with the same memory location.
              </p>
            </div>
            <div className="bg-card/50 border border-border rounded-lg p-6 font-mono text-sm">
              <div className="text-muted-foreground mb-2">// Reference behavior in JS</div>
              <div className="text-foreground">const obj = {"{ count: 1 }"};</div>
              <div className="text-foreground mt-2">function increment(ref) {"{"}</div>
              <div className="text-foreground pl-4">ref.count++;</div>
              <div className="text-foreground">{"}"}</div>
              <div className="text-foreground mt-2">increment(obj);</div>
              <div className="text-primary mt-2">console.log(obj.count); // 2</div>
              <div className="text-muted-foreground mt-2">// Same memory location!</div>
            </div>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Navigation */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link 
            to="/chapters/cryptography" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Chapter 06: Cryptography
          </Link>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-mono text-sm border border-primary px-4 py-2 rounded"
          >
            Back to Overview
          </Link>
        </div>
      </ContentSection>

      <Footer />
    </div>
  );
};

export default Memory;
