# DeFi-Wallet
DeFi Wallet Tracker
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export default function DeFiWalletTracker() {
  const [account, setAccount] = useState(null);
  const [balances, setBalances] = useState({});
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
    } else {
      alert('MetaMask is required to use this app.');
    }
  }, []);

  const connectWallet = async () => {
    try {
      if (!provider) throw new Error('Please install MetaMask');
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);
      fetchBalances(accounts[0]);
    } catch (error) {
      console.error('Wallet connection failed:', error);
      alert(error.message);
    }
  };

  const fetchBalances = async (walletAddress) => {
    try {
      // Example API call (Replace with a real API like Covalent, Moralis, or DefiLlama)
      const response = await fetch(`https://api.defillama.com/stablecoin-balances/${walletAddress}`);
      const data = await response.json();
      setBalances(data.balances || {});
    } catch (error) {
      console.error('Error fetching balances:', error);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">DeFi Wallet Tracker</h1>
      {account ? (
        <>
          <p className="mb-2">Connected Wallet: {account}</p>
          <h2 className="text-lg font-semibold mt-4">Stablecoin Balances</h2>
          <ul>
            {Object.entries(balances).map(([token, balance]) => (
              <li key={token}>{token}: {balance}</li>
            ))}
          </ul>
        </>
      ) : (
        <button onClick={connectWallet} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Connect Wallet
        </button>
      )}
    </div>
  );
}


