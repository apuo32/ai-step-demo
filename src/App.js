import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import InquiriesList from './pages/InquiriesList';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import AITrainingInterface from './pages/AITrainingInterface';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inquiries" element={<InquiriesList />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="/support" element={<AITrainingInterface />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
