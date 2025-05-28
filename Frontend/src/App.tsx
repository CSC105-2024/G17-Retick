import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as React from 'react';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Profile from './pages/Profile';
import CreateListing from './pages/CreateListing';
import Layout from './components/Layout';
import HowItWorks from './pages/HowItWorks';
import TicketsPage from './pages/TicketsPage';
import TicketDetails from './pages/TicketDetails'; // Add this import

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/tickets' element={<TicketsPage />} />
          {/* Add the new ticket details route */}
          <Route path='/tickets/:id' element={<TicketDetails />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/sell' element={<CreateListing />} />
          <Route path='*' element={<NotFound />} />
          <Route
            path='/how-it-works'
            element={
              <Layout>
                <HowItWorks />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
