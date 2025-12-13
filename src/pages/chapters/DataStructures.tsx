import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionDivider from '@/components/SectionDivider';
import ContentSection from '@/components/ContentSection';
import InteractiveSVGWrapper from '@/components/illustrations/InteractiveSVGWrapper';
import BinaryTreeSVG from '@/components/illustrations/BinaryTreeSVG';

const DataStructures = () => {
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
            Chapter 02
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary mb-6">
            DATA STRUCTURES
          </h1>
          <p className="font-body text-xl text-muted-foreground leading-relaxed">
            The fundamental building blocks that organize and store data in efficient, 
            meaningful ways. Understanding data structures is the key to writing 
            performant software.
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
                <span className="text-4xl font-body float-left mr-2 leading-none text-primary">E</span>
                very piece of software you use relies on data structures. When you search 
                for a file, scroll through a playlist, or send a message – data structures 
                are working behind the scenes to make it fast and efficient.
              </p>
              <p className="font-body leading-relaxed text-muted-foreground">
                A data structure is simply a way of organizing data so that it can be 
                used effectively. The right choice of data structure can mean the 
                difference between an app that responds instantly and one that freezes.
              </p>
            </div>
            <InteractiveSVGWrapper>
              <BinaryTreeSVG />
            </InteractiveSVGWrapper>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Arrays */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Section 2.1
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-primary mt-2">
              ARRAYS
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="font-body leading-relaxed">
                The simplest and most fundamental data structure. An array stores 
                elements in contiguous memory locations, making access incredibly fast 
                – O(1) to be precise.
              </p>
              <p className="font-body leading-relaxed text-muted-foreground">
                Think of an array like a row of mailboxes. Each box has a number, and 
                you can jump directly to any box if you know its number. No need to 
                check each one sequentially.
              </p>
            </div>
            <div className="bg-card/50 border border-border rounded-lg p-6 font-mono text-sm">
              <div className="text-muted-foreground mb-2">// Array access is instant</div>
              <div className="text-foreground">const fruits = ["apple", "banana", "cherry"];</div>
              <div className="text-foreground mt-2">fruits[1]; <span className="text-primary">// "banana" - O(1)</span></div>
              <div className="text-muted-foreground mt-4">// But insertion can be slow</div>
              <div className="text-foreground">fruits.splice(1, 0, "blueberry");</div>
              <div className="text-primary">// O(n) - must shift elements</div>
            </div>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Binary Trees */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Section 2.2
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-primary mt-2">
              BINARY TREES
            </h2>
          </div>
          
          <div className="space-y-6">
            <p className="font-body text-lg leading-relaxed">
              Binary trees are hierarchical structures where each node has at most 
              two children. The beauty lies in their recursive nature – every subtree 
              is itself a binary tree.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card/50 border border-border rounded-lg p-6">
                <h3 className="font-mono text-sm text-primary mb-3">Binary Search Tree</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Left children are smaller, right children are larger. Enables O(log n) 
                  search operations.
                </p>
              </div>
              <div className="bg-card/50 border border-border rounded-lg p-6">
                <h3 className="font-mono text-sm text-primary mb-3">AVL Tree</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Self-balancing BST that maintains height difference ≤ 1 between subtrees.
                </p>
              </div>
              <div className="bg-card/50 border border-border rounded-lg p-6">
                <h3 className="font-mono text-sm text-primary mb-3">Red-Black Tree</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Another self-balancing tree used in many language libraries like Java's TreeMap.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Hash Tables */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Section 2.3
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-primary mt-2">
              HASH TABLES
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="font-body leading-relaxed">
                Hash tables are perhaps the most important data structure in computer 
                science. They provide average O(1) time for insertions, deletions, and 
                lookups.
              </p>
              <p className="font-body leading-relaxed text-muted-foreground">
                The magic happens through a hash function that converts any key into 
                an array index. When you look up "user_123", the hash function instantly 
                tells you exactly where to find it.
              </p>
              <p className="font-body leading-relaxed text-muted-foreground">
                Collisions – when two keys hash to the same index – are handled through 
                chaining (linked lists) or open addressing (probing).
              </p>
            </div>
            <div className="bg-card/50 border border-border rounded-lg p-6 font-mono text-sm">
              <div className="text-muted-foreground mb-2">// Hash table in action</div>
              <div className="text-foreground">const users = new Map();</div>
              <div className="text-foreground mt-2">users.set("alice", {"{ age: 30 }"});</div>
              <div className="text-foreground">users.set("bob", {"{ age: 25 }"});</div>
              <div className="text-foreground mt-4">users.get("alice");</div>
              <div className="text-primary">// O(1) average lookup!</div>
            </div>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Navigation */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Overview
          </Link>
          <Link 
            to="/chapters/web" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-mono text-sm"
          >
            Chapter 03: How the Web Works
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </ContentSection>

      <Footer />
    </div>
  );
};

export default DataStructures;
