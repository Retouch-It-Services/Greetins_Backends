import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import CategoryPage from './pages/CategoryPage';
import CardsPage from './pages/CardsPage';
import TemplateSelection from './pages/TemplateSelection';
import PersonalizeCard from './pages/PersonalizeCard';
import SendGreeting from './pages/SendGreeting';
import AIGreeting from './pages/AIGreeting';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import CustomPhotoUpload from './pages/CustomPhotoUpload';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/cards" element={<CardsPage />} />
        <Route path="/templates" element={<TemplateSelection />} />
        <Route path="/personalize/:templateId" element={<PersonalizeCard />} />
        <Route path="/send-greeting" element={<SendGreeting />} />
        <Route path="/send/:templateId" element={<SendGreeting />} />
        <Route path="/ai-greeting" element={<AIGreeting />} />
        <Route path="/custom-upload" element={<CustomPhotoUpload />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;