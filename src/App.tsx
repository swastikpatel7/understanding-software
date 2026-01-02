import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/_Index";
import NotFound from "./pages/_NotFound";
import LayerPage from "./pages/_LayerPage";
import ChapterPage from "./pages/_ChapterPage";
import ChaptersOverview from "./pages/_ChaptersOverview";
import TopicPage from "./pages/_TopicPage";
import About from "./pages/_About";
import Health from "./pages/_Health";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* New layer-based routes */}
          <Route path="/layer/:layerSlug" element={<LayerPage />} />
          <Route path="/layer/:layerSlug/:chapterSlug" element={<ChapterPage />} />
          <Route path="/layer/:layerSlug/:chapterSlug/:topicSlug" element={<TopicPage />} />
          {/* Legacy routes - keeping for backwards compatibility */}
          <Route path="/chapters" element={<ChaptersOverview />} />
          <Route path="/about" element={<About />} />
          <Route path="/health" element={<Health />} />
          <Route path="/read/:chapterSlug/:topicSlug" element={<TopicPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
