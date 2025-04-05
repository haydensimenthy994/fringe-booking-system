import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useEffect } from 'react';

import LoginPage from './pages/public/LoginPage';
import EventsPage from './pages/public/Events';
import AllEventsPage from './pages/public/allEvents';
import ContactPage from './pages/public/ContactPage';
import EventDetailPage from './pages/public/event-detail-page';
import PaymentPage from './pages/public/PaymentPage';
import ResetPasswordPage from './pages/public/ResetPasswordPage';

// 👇 This component handles Supabase redirect when it sends users to /#access_token...
function AuthRedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hash = location.hash;

    // If there's an access_token in the URL hash, redirect to /reset-password
    if (hash.includes('access_token')) {
      navigate(`/reset-password${hash}`);
    }
  }, [location, navigate]);

  return null;
}

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <AuthRedirectHandler /> {/* 👈 This handles redirect from Supabase */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<EventsPage />} />
        <Route path="/events" element={<AllEventsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </div>
  );
}

export default App;
