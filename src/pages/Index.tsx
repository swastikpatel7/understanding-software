import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import SectionDivider from '@/components/SectionDivider';
import ContentSection from '@/components/ContentSection';
import TopicCard from '@/components/TopicCard';
import Footer from '@/components/Footer';
import TableOfContents from '@/components/TableOfContents';
import InteractiveSVGWrapper from '@/components/illustrations/InteractiveSVGWrapper';
import CPUArchitectureSVG from '@/components/illustrations/CPUArchitectureSVG';
import HashTableSVG from '@/components/illustrations/HashTableSVG';
import NetworkPacketSVG from '@/components/illustrations/NetworkPacketSVG';
import LayeredStackSVG from '@/components/illustrations/LayeredStackSVG';
import DiskStorageSVG from '@/components/illustrations/DiskStorageSVG';
import BTreeIndexSVG from '@/components/illustrations/BTreeIndexSVG';
import EncryptionFlowSVG from '@/components/illustrations/EncryptionFlowSVG';
import MemoryLayoutSVG from '@/components/illustrations/MemoryLayoutSVG';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <Header />
      <TableOfContents />
      
      <SectionDivider />

      {/* Hero Introduction */}
      <ContentSection id="intro" className="container mx-auto px-8 md:px-16 scroll-mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left column - Intro text */}
          <div className="space-y-6">
            <p className="font-body text-lg leading-relaxed">
              <span className="text-4xl font-body float-left mr-2 leading-none text-primary">H</span>
              ave you ever wondered how a neural network learns? Well, it's not magic – it's mathematics. Each connection between nodes carries a weight, and during training, these weights are adjusted thousands of times.
            </p>
            
            <p className="font-body leading-relaxed text-muted-foreground">
              The network learns by making predictions, comparing them to the expected output, and then adjusting the weights to reduce the error. This process, called backpropagation, is at the heart of modern AI.
            </p>

            <InteractiveSVGWrapper>
              <CPUArchitectureSVG />
            </InteractiveSVGWrapper>

            <p className="font-body leading-relaxed">
              Understanding these fundamentals isn't just academic – it changes how you think about the software you use every day.
            </p>
          </div>

          {/* Right column - Main illustration */}
          <div className="space-y-8">
            <InteractiveSVGWrapper>
              <LayeredStackSVG />
            </InteractiveSVGWrapper>
            
            <div className="space-y-4 mt-8">
              <p className="font-body text-lg font-semibold text-foreground">
                If you've ever wondered about any of these things or if they've sparked your curiosity, then this is for you.
              </p>
              
              <p className="font-body leading-relaxed text-muted-foreground">
                This won't teach you how to actually make software – it's not a tutorial or a guide but rather something more interesting than that. It's a manual that explains how the things you use everyday actually work.
              </p>
              
              <p className="font-body leading-relaxed text-muted-foreground">
                As everything around us has become more complicated our understanding of technology has diminished. It used to be that we needed to understand our tools deeply but today we understand them in a shallow, abstracted way.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Data Structures Section */}
      <ContentSection id="data-structures" className="container mx-auto px-8 md:px-16 scroll-mt-8">
        <TopicCard
          title="DATA STRUCTURES"
          figureNumber="CHAPTER 02"
          description={`Maybe you've always wanted to know how data is organized in memory. Binary trees, for instance, are elegant structures that allow for incredibly fast searching.

Each node can have at most two children – a left child with a smaller value and a right child with a larger value. This simple rule creates a powerful searching mechanism.`}
          illustration={
            <InteractiveSVGWrapper>
              <HashTableSVG />
            </InteractiveSVGWrapper>
          }
        />
      </ContentSection>

      <SectionDivider />

      {/* Web Development Section */}
      <ContentSection id="web" className="container mx-auto px-8 md:px-16 scroll-mt-8">
        <TopicCard
          title="HOW THE WEB WORKS"
          figureNumber="CHAPTER 03"
          description={`Or perhaps you've wondered what happens when you type a URL into your browser. The request travels through cables and routers, finds its way to a server, and returns with the data you requested.

Every interaction you have with a website involves this dance of requests and responses – GET, POST, PUT, DELETE – each with its own purpose and protocol.`}
          illustration={
            <InteractiveSVGWrapper>
              <NetworkPacketSVG />
            </InteractiveSVGWrapper>
          }
          isReversed
        />
      </ContentSection>

      <SectionDivider />

      {/* Databases Section */}
      <ContentSection id="databases" className="container mx-auto px-8 md:px-16 scroll-mt-8">
        <TopicCard
          title="DATABASES & STORAGE"
          figureNumber="CHAPTER 04"
          description={`Where does your data actually live? Databases are the backbone of every application, storing everything from your profile picture to your banking transactions.

Relational databases organize data into tables with rows and columns, using SQL to query information. Each query is optimized, indexed, and executed in milliseconds.`}
          illustration={
            <InteractiveSVGWrapper>
              <DiskStorageSVG />
            </InteractiveSVGWrapper>
          }
        />
      </ContentSection>

      <SectionDivider />

      {/* Algorithms Section */}
      <ContentSection id="algorithms" className="container mx-auto px-8 md:px-16 scroll-mt-8">
        <TopicCard
          title="ALGORITHMS"
          figureNumber="CHAPTER 05"
          description={`Algorithms are the recipes that computers follow. Sorting a list, searching for a value, or finding the shortest path – each problem has elegant solutions discovered over decades.

Bubble sort is simple but slow. Quick sort is fast but complex. Understanding these trade-offs is fundamental to writing efficient code.`}
          illustration={
            <InteractiveSVGWrapper>
              <BTreeIndexSVG />
            </InteractiveSVGWrapper>
          }
          isReversed
        />
      </ContentSection>

      <SectionDivider />

      {/* Cryptography Section */}
      <ContentSection id="cryptography" className="container mx-auto px-8 md:px-16 scroll-mt-8">
        <TopicCard
          title="CRYPTOGRAPHY"
          figureNumber="CHAPTER 06"
          description={`How do you send a secret message over the internet where anyone can listen? Cryptography transforms readable text into unbreakable ciphertext.

Modern encryption like AES-256 is so strong that even with every computer on Earth working together, it would take longer than the age of the universe to crack.`}
          illustration={
            <InteractiveSVGWrapper>
              <EncryptionFlowSVG />
            </InteractiveSVGWrapper>
          }
        />
      </ContentSection>

      <SectionDivider />

      {/* Memory Section */}
      <ContentSection id="memory" className="container mx-auto px-8 md:px-16 scroll-mt-8">
        <TopicCard
          title="MEMORY MANAGEMENT"
          figureNumber="CHAPTER 07"
          description={`Every variable you create, every object you instantiate – they all need a place to live in memory. Understanding how memory is allocated and freed is crucial for writing performant applications.

From the stack to the heap, from pointers to garbage collection, memory management is the invisible force that makes your programs run.`}
          illustration={
            <InteractiveSVGWrapper>
              <MemoryLayoutSVG />
            </InteractiveSVGWrapper>
          }
          isReversed
        />
      </ContentSection>

      <SectionDivider />

      {/* Call to Action */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="font-display text-2xl md:text-3xl text-primary">
            START EXPLORING
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            It won't make you a better designer or programmer tomorrow – there's nothing actionable in here. But knowing how things work comes in handy when you find yourself out of your depth.
          </p>
          <p className="font-body italic text-muted-foreground">
            Or at the very least, you can pretend to be smart in front of your friends.
          </p>
          
          <Link 
            to="/chapters" 
            className="mt-8 inline-block px-8 py-3 border-2 border-primary text-primary font-mono text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Begin Reading
          </Link>
        </div>
      </ContentSection>

      <Footer />
    </div>
  );
};

export default Index;
