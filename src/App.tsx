import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import TestSelection from './pages/TestSelection';
import ExamSimulator from './pages/ExamSimulator';
import Results from './pages/Results';
import Guide from './pages/Guide';
import { Toaster } from './components/common/Toaster';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen bg-background text-text-primary">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/select" element={<TestSelection />} />
          <Route path="/exam/:testId" element={<ExamSimulator />} />
          <Route path="/results/:testId" element={<Results />} />
          <Route path="/guide" element={<Guide />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
