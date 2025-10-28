// src/App.jsx
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';

import { useAccount } from 'wagmi';
import { HomePage } from './pages/HomePage';
import { SubmitPage } from './pages/SubmitPage';
import { Navbar } from './components/layout/Navbar';
import { ProfilePage } from './pages/ProfilePage';
import { Toaster } from './components/ui/toaster';
import { ExplorePage } from './pages/ExplorePage';
import { VotingHistoryPage } from './pages/VotingHistoryPage';

const AppLayout = () => {
  const { isConnected } = useAccount();
  const location = useLocation();

  const protectedPaths = ["/submit", "/profile"];
  const requiresConnection = protectedPaths.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col"> {/* Changed: Removed bg-gray-900 */}
      <Navbar />
      {/* Add padding-top to account for fixed navbar height */}
      <main className="flex-grow"> {/* Changed: Added pt-16 */}
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8"> {/* Changed: Use container and standard padding */}
          {(requiresConnection && !isConnected) ? (
            <p className="text-white text-center">Please connect your wallet to access this page.</p>
          ) : (
            <Outlet />
          )} 
        </div>
      </main>
      <Toaster /> {/* Ensure Toaster is here */}
    </div>
  );
}


function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* All routes inside here will share the AppLayout (Navbar, etc.) */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path='/explore' element={<ExplorePage />} />
          <Route path="/submit" element={<SubmitPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/voting-history' element={<VotingHistoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;