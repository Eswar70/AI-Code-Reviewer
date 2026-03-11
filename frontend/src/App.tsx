import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { ReviewPage } from './pages/ReviewPage';
import { Toaster, toast } from 'sonner';

function App() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      // Ignore Monaco editor internal cancellation errors
      if (event.message?.includes('Canceled: Canceled')) return;
      toast.error(`System Error: ${event.message}`);
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return (
    <Router>
      <Toaster position="top-center" richColors theme="dark" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/review" element={<ReviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
