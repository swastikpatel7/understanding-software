import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DataStructures from "./pages/chapters/DataStructures";
import WebDevelopment from "./pages/chapters/WebDevelopment";
import Databases from "./pages/chapters/Databases";
import Algorithms from "./pages/chapters/Algorithms";
import Cryptography from "./pages/chapters/Cryptography";
import Memory from "./pages/chapters/Memory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chapters/data-structures" element={<DataStructures />} />
          <Route path="/chapters/web" element={<WebDevelopment />} />
          <Route path="/chapters/databases" element={<Databases />} />
          <Route path="/chapters/algorithms" element={<Algorithms />} />
          <Route path="/chapters/cryptography" element={<Cryptography />} />
          <Route path="/chapters/memory" element={<Memory />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
