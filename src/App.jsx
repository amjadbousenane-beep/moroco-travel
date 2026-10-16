import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from '@/components/ScrollToTop';
import { LangProvider } from '@/lib/i18n';
import { FavProvider } from '@/lib/favorites';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Cities from '@/pages/Cities';
import CityDetail from '@/pages/CityDetail';
import AttractionDetail from '@/pages/AttractionDetail';
import Places from '@/pages/Places';
import Activities from '@/pages/Activities';
import Food from '@/pages/Food';
import MapPage from '@/pages/MapPage';
import Discover from '@/pages/Discover';
import Planner from '@/pages/Planner';
import Compare from '@/pages/Compare';
import Favorites from '@/pages/Favorites';
import HiddenGems from '@/pages/HiddenGems';
import Info from '@/pages/Info';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/explore/:city" element={<CityDetail />} />
        <Route path="/explore/:city/:slug" element={<AttractionDetail />} />
        <Route path="/places" element={<Places />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/food" element={<Food />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/hidden-gems" element={<HiddenGems />} />
        <Route path="/privacy" element={<Info kind="privacy" />} />
        <Route path="/terms" element={<Info kind="terms" />} />
        <Route path="/contact" element={<Info kind="contact" />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <LangProvider>
          <FavProvider>
            <Router>
              <ScrollToTop />
              <AuthenticatedApp />
            </Router>
          </FavProvider>
        </LangProvider>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App