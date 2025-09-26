// src/App.jsx
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import { useAccount } from 'wagmi';
import { HomePage } from './pages/HomePage';
import { SubmitPage } from './pages/SubmitPage';
import { Navbar } from './components/layout/Navbar';

const AppLayout = () => {
  const { isConnected } = useAccount();

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Outlet is a placeholder where the current page's content will be rendered */}
          {isConnected ? <Outlet /> : <p className="text-white text-center">Please connect your wallet to continue.</p>}
        </div>
      </main>
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
          <Route path="/submit" element={<SubmitPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;