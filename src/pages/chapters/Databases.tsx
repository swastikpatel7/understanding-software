import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionDivider from '@/components/SectionDivider';
import ContentSection from '@/components/ContentSection';
import InteractiveSVGWrapper from '@/components/illustrations/InteractiveSVGWrapper';
import DatabaseSVG from '@/components/illustrations/DatabaseSVG';

const Databases = () => {
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
            Chapter 04
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary mb-6">
            DATABASES & STORAGE
          </h1>
          <p className="font-body text-xl text-muted-foreground leading-relaxed">
            The persistent layer of every application – where your data lives, 
            how it's organized, and the systems that keep it safe and accessible.
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
                very application needs to remember things. Your profile, your posts, 
                your transaction history – all of this lives in databases. Without 
                them, every refresh would be a fresh start.
              </p>
              <p className="font-body leading-relaxed text-muted-foreground">
                Modern databases have evolved from simple file systems to distributed, 
                fault-tolerant systems that can handle millions of queries per second 
                while maintaining perfect data integrity.
              </p>
            </div>
            <InteractiveSVGWrapper>
              <DatabaseSVG />
            </InteractiveSVGWrapper>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Relational */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Section 4.1
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-primary mt-2">
              RELATIONAL DATABASES
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="font-body leading-relaxed">
                Relational databases organize data into tables with rows and columns. 
                Each table represents an entity (users, orders, products), and 
                relationships connect them through foreign keys.
              </p>
              <p className="font-body leading-relaxed text-muted-foreground">
                SQL (Structured Query Language) is the standard way to interact with 
                relational databases. It's declarative – you tell the database what 
                you want, not how to get it.
              </p>
            </div>
            <div className="bg-card/50 border border-border rounded-lg p-6 font-mono text-sm">
              <div className="text-muted-foreground mb-2">// Find all orders for a user</div>
              <div className="text-foreground">SELECT orders.*, users.name</div>
              <div className="text-foreground">FROM orders</div>
              <div className="text-foreground">JOIN users ON orders.user_id = users.id</div>
              <div className="text-foreground">WHERE users.email = 'alice@example.com'</div>
              <div className="text-primary mt-2">// PostgreSQL, MySQL, SQLite</div>
            </div>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* NoSQL */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Section 4.2
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-primary mt-2">
              NOSQL: BEYOND TABLES
            </h2>
          </div>
          
          <div className="space-y-6">
            <p className="font-body text-lg leading-relaxed">
              Not all data fits neatly into tables. NoSQL databases offer flexible 
              schemas, horizontal scaling, and specialized data models for different 
              use cases.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/50 border border-border rounded-lg p-6">
                <h3 className="font-mono text-sm text-primary mb-3">Document Stores</h3>
                <p className="font-body text-sm text-muted-foreground mb-3">
                  Store data as JSON-like documents. Perfect for content management 
                  and user profiles.
                </p>
                <span className="font-mono text-xs text-muted-foreground">MongoDB, CouchDB</span>
              </div>
              <div className="bg-card/50 border border-border rounded-lg p-6">
                <h3 className="font-mono text-sm text-primary mb-3">Key-Value Stores</h3>
                <p className="font-body text-sm text-muted-foreground mb-3">
                  Simple key-to-value mapping. Extremely fast, used for caching and 
                  session storage.
                </p>
                <span className="font-mono text-xs text-muted-foreground">Redis, DynamoDB</span>
              </div>
              <div className="bg-card/50 border border-border rounded-lg p-6">
                <h3 className="font-mono text-sm text-primary mb-3">Graph Databases</h3>
                <p className="font-body text-sm text-muted-foreground mb-3">
                  Optimized for connected data. Social networks, recommendation 
                  engines, fraud detection.
                </p>
                <span className="font-mono text-xs text-muted-foreground">Neo4j, Amazon Neptune</span>
              </div>
              <div className="bg-card/50 border border-border rounded-lg p-6">
                <h3 className="font-mono text-sm text-primary mb-3">Time Series</h3>
                <p className="font-body text-sm text-muted-foreground mb-3">
                  Optimized for time-stamped data. Metrics, IoT sensors, financial 
                  data.
                </p>
                <span className="font-mono text-xs text-muted-foreground">InfluxDB, TimescaleDB</span>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* ACID */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Section 4.3
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-primary mt-2">
              ACID: GUARANTEEING DATA INTEGRITY
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card/50 border border-border rounded-lg p-5">
              <h3 className="font-mono text-lg text-primary mb-2">A</h3>
              <h4 className="font-body font-semibold mb-2">Atomicity</h4>
              <p className="font-body text-sm text-muted-foreground">
                All or nothing. Transactions complete fully or not at all.
              </p>
            </div>
            <div className="bg-card/50 border border-border rounded-lg p-5">
              <h3 className="font-mono text-lg text-primary mb-2">C</h3>
              <h4 className="font-body font-semibold mb-2">Consistency</h4>
              <p className="font-body text-sm text-muted-foreground">
                Data always remains valid according to defined rules.
              </p>
            </div>
            <div className="bg-card/50 border border-border rounded-lg p-5">
              <h3 className="font-mono text-lg text-primary mb-2">I</h3>
              <h4 className="font-body font-semibold mb-2">Isolation</h4>
              <p className="font-body text-sm text-muted-foreground">
                Concurrent transactions don't interfere with each other.
              </p>
            </div>
            <div className="bg-card/50 border border-border rounded-lg p-5">
              <h3 className="font-mono text-lg text-primary mb-2">D</h3>
              <h4 className="font-body font-semibold mb-2">Durability</h4>
              <p className="font-body text-sm text-muted-foreground">
                Committed data survives system failures.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      <SectionDivider />

      {/* Navigation */}
      <ContentSection className="container mx-auto px-8 md:px-16">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link 
            to="/chapters/web" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Chapter 03: How the Web Works
          </Link>
          <Link 
            to="/chapters/algorithms" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-mono text-sm"
          >
            Chapter 05: Algorithms
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </ContentSection>

      <Footer />
    </div>
  );
};

export default Databases;
