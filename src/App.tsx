// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import EventsPage from './pages/public/Events';
import AdminLogin from './pages/admin/Login'; // adjust path if needed

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Routes>
        <Route path="/" element={<EventsPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </div>
  );
}

export default App;
