import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionDivider from '@/components/SectionDivider';
import ContentSection from '@/components/ContentSection';
import InteractiveSVGWrapper from '@/components/illustrations/InteractiveSVGWrapper';
import SortingAlgorithmSVG from '@/components/illustrations/SortingAlgorithmSVG';

const Algorithms = () => {
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
            Chapter 05
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary mb-6">
            ALGORITHMS
          </h1>
          <p className="font-body text-xl text-muted-foreground leading-relaxed">
            Step-by-step procedures for solving problems – the recipes that 
            transform inputs into outputs with mathematical precision.
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
                <span className="text-4xl font-body float-left mr-2 leading-none text-primary">A</span>
                n algorithm is a precise sequence of steps to solve a problem. 
                From sorting your playlist to finding the fastest route home, 
                algorithms are the invisible engines of computation.
              </p>
              <p className="font-body leading-relaxed text-muted-foreground">
                The study of algorithms is about finding the most efficient solution – 
                minimizing time, memory, or other resources. A good algorithm can 
                make the difference between seconds and centuries of computation.
              </p>
            </div>
            <InteractiveSVGWrapper>
              <SortingAlgorithmSVG />
            </InteractiveSVGWrapper>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Big O */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Section 5.1
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-primary mt-2">
              BIG O NOTATION
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="font-body leading-relaxed">
                Big O notation describes how an algorithm's performance scales with 
                input size. It answers: "If I double my data, how much longer will 
                this take?"
              </p>
              <p className="font-body leading-relaxed text-muted-foreground">
                We focus on the worst-case scenario and ignore constants – O(2n) 
                simplifies to O(n). This gives us a language to compare algorithms 
                regardless of hardware.
              </p>
            </div>
            <div className="space-y-3">
              <div className="bg-card/50 border border-border rounded-lg p-4 flex justify-between items-center">
                <span className="font-mono text-primary">O(1)</span>
                <span className="font-body text-sm text-muted-foreground">Constant – instant</span>
              </div>
              <div className="bg-card/50 border border-border rounded-lg p-4 flex justify-between items-center">
                <span className="font-mono text-primary">O(log n)</span>
                <span className="font-body text-sm text-muted-foreground">Logarithmic – very fast</span>
              </div>
              <div className="bg-card/50 border border-border rounded-lg p-4 flex justify-between items-center">
                <span className="font-mono text-primary">O(n)</span>
                <span className="font-body text-sm text-muted-foreground">Linear – proportional</span>
              </div>
              <div className="bg-card/50 border border-border rounded-lg p-4 flex justify-between items-center">
                <span className="font-mono text-primary">O(n log n)</span>
                <span className="font-body text-sm text-muted-foreground">Linearithmic – efficient</span>
              </div>
              <div className="bg-card/50 border border-border rounded-lg p-4 flex justify-between items-center">
                <span className="font-mono text-primary">O(n²)</span>
                <span className="font-body text-sm text-muted-foreground">Quadratic – slow</span>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Sorting */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Section 5.2
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-primary mt-2">
              SORTING ALGORITHMS
            </h2>
          </div>
          
          <div className="space-y-6">
            <p className="font-body text-lg leading-relaxed">
              Sorting is one of the most studied problems in computer science. 
              The choice of algorithm depends on your data size, memory constraints, 
              and whether stability matters.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card/50 border border-border rounded-lg p-6">
                <h3 className="font-mono text-sm text-primary mb-3">Bubble Sort</h3>
                <p className="font-body text-sm text-muted-foreground mb-3">
                  Compare adjacent elements and swap if needed. Simple but O(n²).
                </p>
                <div className="font-mono text-xs text-muted-foreground">
                  Best: O(n) | Worst: O(n²)
                </div>
              </div>
              <div className="bg-card/50 border border-border rounded-lg p-6">
                <h3 className="font-mono text-sm text-primary mb-3">Merge Sort</h3>
                <p className="font-body text-sm text-muted-foreground mb-3">
                  Divide and conquer. Split, sort halves, merge. Always O(n log n).
                </p>
                <div className="font-mono text-xs text-muted-foreground">
                  Best: O(n log n) | Worst: O(n log n)
                </div>
              </div>
              <div className="bg-card/50 border border-border rounded-lg p-6">
                <h3 className="font-mono text-sm text-primary mb-3">Quick Sort</h3>
                <p className="font-body text-sm text-muted-foreground mb-3">
                  Pick pivot, partition around it. Usually fastest in practice.
                </p>
                <div className="font-mono text-xs text-muted-foreground">
                  Best: O(n log n) | Worst: O(n²)
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Searching */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Section 5.3
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-primary mt-2">
              SEARCHING ALGORITHMS
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="font-body leading-relaxed">
                Finding a specific element is fundamental. Linear search checks 
                every element – O(n). But if data is sorted, binary search cuts 
                the problem in half each step – O(log n).
              </p>
              <p className="font-body leading-relaxed text-muted-foreground">
                In a phone book of 1 million names, linear search might check 
                500,000 entries on average. Binary search? Just 20 comparisons, 
                guaranteed.
              </p>
            </div>
            <div className="bg-card/50 border border-border rounded-lg p-6 font-mono text-sm">
              <div className="text-muted-foreground mb-2">// Binary search</div>
              <div className="text-foreground">function binarySearch(arr, target) {"{"}</div>
              <div className="text-foreground pl-4">let left = 0, right = arr.length - 1;</div>
              <div className="text-foreground pl-4">while (left {"<="} right) {"{"}</div>
              <div className="text-foreground pl-8">let mid = Math.floor((left + right) / 2);</div>
              <div className="text-foreground pl-8">if (arr[mid] === target) return mid;</div>
              <div className="text-foreground pl-8">if (arr[mid] {"<"} target) left = mid + 1;</div>
              <div className="text-foreground pl-8">else right = mid - 1;</div>
              <div className="text-foreground pl-4">{"}"}</div>
              <div className="text-foreground pl-4">return -1;</div>
              <div className="text-foreground">{"}"}</div>
            </div>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Navigation */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link 
            to="/chapters/databases" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Chapter 04: Databases
          </Link>
          <Link 
            to="/chapters/cryptography" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-mono text-sm"
          >
            Chapter 06: Cryptography
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </ContentSection>

      <Footer />
    </div>
  );
};

export default Algorithms;
