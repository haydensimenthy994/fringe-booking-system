import { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import type { ReactNode } from 'react';

import { supabase } from './lib/supabaseClient';

import LoginPage from './pages/public/LoginPage';
import EventsPage from './pages/public/Events';
import AllEventsPage from './pages/public/allEvents';
import ContactPage from './pages/public/ContactPage';
import EventDetailPage from './pages/public/event-detail-page';
import PaymentPage from './pages/public/PaymentPage';
import ResetPasswordPage from './pages/public/ResetPasswordPage';

// 🔁 Redirect handler for Supabase OAuth/session recovery
function AuthRedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hash = location.hash;
    if (hash.includes('access_token')) {
      navigate(`/reset-password${hash}`);
    }
  }, [location, navigate]);

  return null;
}

// 🔐 Wrapper to protect specific routes
function RequireAuth({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate('/login');
      }
      setChecking(false);
    };
    check();
  }, [navigate]);

  if (checking) return null;
  return children;
}

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <AuthRedirectHandler />

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<EventsPage />} />
        <Route path="/events" element={<AllEventsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* 🔒 Protected route */}
        <Route
          path="/payment"
          element={
            <RequireAuth>
              <PaymentPage />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
