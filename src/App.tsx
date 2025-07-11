import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PersonaLibrary from "./pages/PersonaLibrary";
import SimulationPage from "./pages/SimulationPage";
import InsightsDashboard from "./pages/InsightsDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="h-12 flex items-center border-b border-border px-4 bg-background">
                <SidebarTrigger className="mr-4" />
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded bg-gradient-primary flex items-center justify-center">
                    <span className="text-white font-bold text-xs">RP</span>
                  </div>
                  <span className="font-semibold text-foreground">Razorpay Personas</span>
                </div>
              </header>
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<PersonaLibrary />} />
                  <Route path="/simulation" element={<SimulationPage />} />
                  <Route path="/insights" element={<InsightsDashboard />} />
                  <Route path="/history" element={<div className="p-6"><h1 className="text-2xl font-bold">Scenario History</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
                  <Route path="/settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
