// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import EventsPage from './pages/public/Events';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import DashboardContent from './components/dashboard/DashboardContent';
import EventsContent from './components/dashboard/EventsContent';
import VenuesContent from './components/dashboard/VenuesContent';
import BookingsContent from './components/dashboard/BookingsContent';
import { ThemeProvider } from './components/ui/ThemeProvider';
import SystemConfigContent from './components/dashboard/SystemConfigContent';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="fringe-admin-theme">
      <div className="min-h-screen bg-gray-950 text-white">
        <Routes>
          <Route path="/" element={<EventsPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />}>
            <Route index element={<DashboardContent />} />
            <Route path="events" element={<EventsContent />} />
            <Route path="venues" element={<VenuesContent />} />
            <Route path="bookings" element={<BookingsContent />} />
            <Route
              path="ticket-types"
              element={<div className="p-6">Ticket Types Content</div>}
            />
            <Route
              path="reports"
              element={<div className="p-6">Reports Content</div>}
            />
            <Route path="system-config" element={<SystemConfigContent />} />{' '}
            {/* Added route */}
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
