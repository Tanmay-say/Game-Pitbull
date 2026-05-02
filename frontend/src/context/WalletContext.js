/* eslint-disable no-undef */
import React, { createContext, useContext, useState, useCallback } from 'react';

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  const truncatedAddress = account
    ? `${account.slice(0, 6)}...${account.slice(-4)}`
    : null;

  const connectWallet = useCallback(async () => {
    if (typeof window.ethereum === 'undefined') {
      setError('MetaMask not installed, bhai. Install karo pehle 😤');
      return;
    }
    setIsConnecting(true);
    setError(null);
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (!accounts || accounts.length === 0) {
        setError('No accounts found. Please unlock MetaMask.');
        return;
      }
      setAccount(accounts[0]);

      // Listen for account changes
      if (!window.__pitbullListenersAttached) {
        window.__pitbullListenersAttached = true;
        window.ethereum.on('accountsChanged', (newAccounts) => {
          if (!newAccounts || newAccounts.length === 0) {
            setAccount(null);
          } else {
            setAccount(newAccounts[0]);
          }
        });
      }
    } catch (err) {
      if (err && err.code === 4001) {
        setError('User ne reject kar diya. Shy mat ho yaar 🥲');
      } else {
        setError('Failed to connect wallet. Try again.');
      }
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setAccount(null);
    setError(null);
  }, []);

  const value = {
    account,
    truncatedAddress,
    isConnecting,
    isConnected: !!account,
    error,
    connectWallet,
    disconnectWallet,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
