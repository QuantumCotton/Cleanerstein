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
import Dashboard from './pages/Dashboard';
import PressureWashingGuidePage from './pages/PressureWashingGuidePage';
import LandingPagesDashboard from './pages/LandingPagesDashboard';

// Landing Pages for Affluent Areas
import DatawIslandPressureWashing from './pages/landing/DatawIslandPressureWashing';
import DatawIslandMobileDetailing from './pages/landing/DatawIslandMobileDetailing';
import DatawIslandResidentialCleaning from './pages/landing/DatawIslandResidentialCleaning';
import DatawIslandCommercialCleaning from './pages/landing/DatawIslandCommercialCleaning';
import DatawIslandEpoxyServices from './pages/landing/DatawIslandEpoxyServices';
import CallawassieIslandPressureWashing from './pages/landing/CallawassieIslandPressureWashing';
import CallawassieIslandMobileDetailing from './pages/landing/CallawassieIslandMobileDetailing';
import CallawassieIslandResidentialCleaning from './pages/landing/CallawassieIslandResidentialCleaning';
import CallawassieIslandCommercialCleaning from './pages/landing/CallawassieIslandCommercialCleaning';
import CallawassieIslandEpoxyServices from './pages/landing/CallawassieIslandEpoxyServices';
import BraysIslandPressureWashing from './pages/landing/BraysIslandPressureWashing';
import BraysIslandMobileDetailing from './pages/landing/BraysIslandMobileDetailing';
import BraysIslandResidentialCleaning from './pages/landing/BraysIslandResidentialCleaning';
import BraysIslandCommercialCleaning from './pages/landing/BraysIslandCommercialCleaning';
import BraysIslandEpoxyServices from './pages/landing/BraysIslandEpoxyServices';

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
        <Route path="/dashboard" element={<LayoutWithAtlas><Dashboard /></LayoutWithAtlas>} />
        <Route path="/pressure-washing-guide" element={<LayoutWithAtlas><PressureWashingGuidePage /></LayoutWithAtlas>} />
        <Route path="/landing-pages" element={<LayoutWithAtlas><LandingPagesDashboard /></LayoutWithAtlas>} />
        
        {/* Dataw Island Landing Pages */}
        <Route path="/dataw-island/pressure-washing" element={<LayoutWithAtlas><DatawIslandPressureWashing /></LayoutWithAtlas>} />
        <Route path="/dataw-island/mobile-detailing" element={<LayoutWithAtlas><DatawIslandMobileDetailing /></LayoutWithAtlas>} />
        <Route path="/dataw-island/residential-cleaning" element={<LayoutWithAtlas><DatawIslandResidentialCleaning /></LayoutWithAtlas>} />
        <Route path="/dataw-island/commercial-cleaning" element={<LayoutWithAtlas><DatawIslandCommercialCleaning /></LayoutWithAtlas>} />
        <Route path="/dataw-island/epoxy-services" element={<LayoutWithAtlas><DatawIslandEpoxyServices /></LayoutWithAtlas>} />
        
        {/* Callawassie Island Landing Pages */}
        <Route path="/callawassie-island/pressure-washing" element={<LayoutWithAtlas><CallawassieIslandPressureWashing /></LayoutWithAtlas>} />
        <Route path="/callawassie-island/mobile-detailing" element={<LayoutWithAtlas><CallawassieIslandMobileDetailing /></LayoutWithAtlas>} />
        <Route path="/callawassie-island/residential-cleaning" element={<LayoutWithAtlas><CallawassieIslandResidentialCleaning /></LayoutWithAtlas>} />
        <Route path="/callawassie-island/commercial-cleaning" element={<LayoutWithAtlas><CallawassieIslandCommercialCleaning /></LayoutWithAtlas>} />
        <Route path="/callawassie-island/epoxy-services" element={<LayoutWithAtlas><CallawassieIslandEpoxyServices /></LayoutWithAtlas>} />
        
        {/* Brays Island Landing Pages */}
        <Route path="/brays-island/pressure-washing" element={<LayoutWithAtlas><BraysIslandPressureWashing /></LayoutWithAtlas>} />
        <Route path="/brays-island/mobile-detailing" element={<LayoutWithAtlas><BraysIslandMobileDetailing /></LayoutWithAtlas>} />
        <Route path="/brays-island/residential-cleaning" element={<LayoutWithAtlas><BraysIslandResidentialCleaning /></LayoutWithAtlas>} />
        <Route path="/brays-island/commercial-cleaning" element={<LayoutWithAtlas><BraysIslandCommercialCleaning /></LayoutWithAtlas>} />
        <Route path="/brays-island/epoxy-services" element={<LayoutWithAtlas><BraysIslandEpoxyServices /></LayoutWithAtlas>} />
        
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
