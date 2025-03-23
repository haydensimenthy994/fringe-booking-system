// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import EventsPage from './pages/public/Events';

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Routes>
        <Route path="/" element={<EventsPage />} />
        {/* Add more routes here if needed */}
      </Routes>
    </div>
  );
}

export default App;
