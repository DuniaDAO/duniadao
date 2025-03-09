import React from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';
import { Globe } from 'lucide-react';
import NotificationCenter from './NotificationCenter';

const Navbar = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Globe className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">DuniaDAO</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-gray-700 hover:text-gray-900">Find Work</button>
            <button className="px-4 py-2 text-gray-700 hover:text-gray-900">Post Job</button>
            <NotificationCenter />
            <button
              onClick={() => open()}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Connect Wallet'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;