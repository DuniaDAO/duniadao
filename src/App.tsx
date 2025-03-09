import React from 'react';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { WagmiProvider } from 'wagmi';
import { polygonMumbai } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Building2, Search, Briefcase, Users } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import JobList from './components/JobList';
import CreateJob from './components/CreateJob';
import SkillVerification from './components/SkillVerification';
import JobDashboard from './components/JobDashboard';
import JobSearch from './components/JobSearch';
import { JobFilters } from './components/JobSearch';
import { useNotificationStore } from './store/notifications';

const projectId = 'YOUR_WC_PROJECT_ID';

const metadata = {
  name: 'DuniaDAO',
  description: 'Web3 Freelance Marketplace',
  url: 'https://duniadao.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [polygonMumbai];
const config = defaultWagmiConfig({ chains, projectId, metadata });
const queryClient = new QueryClient();

createWeb3Modal({ wagmiConfig: config, projectId, chains });

const features = [
  {
    title: 'Secure Payments',
    description: 'Smart contract escrow ensures safe transactions',
    icon: Building2
  },
  {
    title: 'Global Talent',
    description: 'Connect with skilled professionals worldwide',
    icon: Users
  },
  {
    title: 'Verified Skills',
    description: 'On-chain verification of expertise',
    icon: Briefcase
  },
  {
    title: 'Easy Discovery',
    description: 'Find the perfect match for your project',
    icon: Search
  }
];

function App() {
  const handleSearch = (filters: JobFilters) => {
    console.log('Searching with filters:', filters);
    // Implement search logic here
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
          <Navbar />
          <Hero />
          <Features features={features} />
          <JobSearch onSearch={handleSearch} />
          <JobList />
          <CreateJob />
          <SkillVerification />
          <JobDashboard />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;