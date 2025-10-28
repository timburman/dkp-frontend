// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { TooltipProvider } from './components/ui/tooltip.jsx';

// 1. Import the providers and config
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig, queryClient } from './wagmi.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <App />
        </TooltipProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);