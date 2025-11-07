import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutWithAtlas from './components/layout/LayoutWithAtlas';
import AdminLayout from './components/admin/AdminLayout';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import WhyUsPage from './pages/WhyUsPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import ThanksPage from './pages/ThanksPage';
import OwnerQuestionnairePage from './pages/OwnerQuestionnairePageNew';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ExecutiveDashboard from './pages/admin/ExecutiveDashboard';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import FinancialDashboard from './pages/admin/FinancialDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Chat Widget */}
        <Route path="/" element={<LayoutWithAtlas><HomePage /></LayoutWithAtlas>} />
        <Route path="/about" element={<LayoutWithAtlas><AboutPage /></LayoutWithAtlas>} />
        <Route path="/services" element={<LayoutWithAtlas><ServicesPage /></LayoutWithAtlas>} />
        <Route path="/why-us" element={<LayoutWithAtlas><WhyUsPage /></LayoutWithAtlas>} />
        <Route path="/blog" element={<LayoutWithAtlas><BlogPage /></LayoutWithAtlas>} />
        <Route path="/contact" element={<LayoutWithAtlas><ContactPage /></LayoutWithAtlas>} />
        <Route path="/thanks" element={<LayoutWithAtlas><ThanksPage /></LayoutWithAtlas>} />
        <Route path="/erik" element={<LayoutWithAtlas><OwnerQuestionnairePage /></LayoutWithAtlas>} />
        
        {/* Admin Dashboard - Client Management */}
        <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/executive" element={<AdminLayout><ExecutiveDashboard /></AdminLayout>} />
        <Route path="/admin/analytics" element={<AdminLayout><AnalyticsPage /></AdminLayout>} />
        <Route path="/admin/financial" element={<AdminLayout><FinancialDashboard /></AdminLayout>} />
        
        {/* Catch-all route */}
        <Route path="*" element={<LayoutWithAtlas><HomePage /></LayoutWithAtlas>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
